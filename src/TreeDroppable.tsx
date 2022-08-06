import React, { useEffect, useRef, useState, FC } from 'react';
import {
  DragSourceProps,
  DragSourceRefProps,
  DragTargetProps,
  DroppableProps,
  Rect,
  RenderedItemProps,
  RenderedItemsRefProps,
} from './types';

const TreeDroppable: FC<DroppableProps> = ({
  tree,
  flatTree,
  itemHeight,
  itemOffset,
  nestFiles,
  replaceFiles,
  disableItemDrop,
  disableFileDrop,
  onItemDrop,
  onFileDrop,
  onNestError,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRef<Rect>(null);
  const items = useRef<RenderedItemProps[]>([]);
  const source = useRef<DragSourceProps>(null);
  const target = useRef<DragTargetProps>(null);
  const initialOrder = useRef<number[]>([]);
  const currentOrder = useRef<number[]>([]);
  const dropOrder = useRef<number>(null);
  const placeholder = useRef<RenderedItemProps>(null);
  const isDragInProgress = useRef<boolean>(false);
  const previousClientY = useRef<number>(0);
  const scrollInterval = useRef<ReturnType<typeof setInterval>>(null);
  const dragEnterLeaveCount = useRef<number>(0);

  // States
  const [currentOrderState, setCurrentOrderState] = useState<number[]>([]);
  const [dropOrderState, setDropOrderState] = useState<number>(null);
  const [isDragInProgressState, setDragInProgressState] = useState<boolean>(false);

  // Constants
  const DURATION_SM = 100;
  const DURATION_BASE = 200;

  // Styles
  const style = { position: 'relative' } as React.CSSProperties;

  // Props
  const draggableProps = {
    droppableRef: ref,
    rect,
    items,
    source,
    target,
    currentOrderState,
    setCurrentOrderState,
    dropOrderState,
    isDragInProgress,
    isDragInProgressState,
    setDragInProgressState,
    handleMove,
    handleEnd,
    disableItemDrop,
  };

  const placeholderProps = {
    placeholder,
  };

  //
  // Effects
  //

  useEffect(() => {
    initialOrder.current = Object.keys(flatTree).map((index) => parseInt(index));
    initialOrder.current.push(initialOrder.current.length);
    currentOrder.current = initialOrder.current;

    // Update items order
    setCurrentOrderState(initialOrder.current);
  }, [flatTree]);

  useEffect(() => {
    document.addEventListener('dragenter', handleStart);

    return () => {
      document.removeEventListener('dragenter', handleStart);
    };
  }, [flatTree]);

  //
  // Handle
  //

  function adjustScrollPosition(e) {
    if (e.type === 'mousemove' || e.type === 'dragover') {
      e.preventDefault();
    }

    // Quit if drag is not in progress
    if (!source.current || !isDragInProgress.current) {
      return;
    }

    // Get current client position
    const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;

    // Quit if idle
    if (previousClientY.current === clientY) {
      return;
    }

    // Quit if there's nowhere to scroll
    const direction = previousClientY.current - clientY > 0 ? 'top' : 'bottom';

    if (direction === 'top' && window.scrollY <= 0) {
      clearScrollInterval();
      return;
    }

    if (direction === 'bottom' && window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      clearScrollInterval();
      return;
    }

    // Scroll document if close enough to top/bottom edges of screen
    const step = 1;
    const interval = 4;
    const overlap = Math.max(window.innerHeight * 0.1, itemHeight);
    const overTop = clientY < overlap;
    const overBottom = window.innerHeight - clientY < overlap;

    if (scrollInterval.current) {
      clearScrollInterval();
    }

    if (direction === 'top' && overTop) {
      scrollInterval.current = setInterval(() => scrollBy(e, step, direction), interval);
    }

    if (direction === 'bottom' && overBottom) {
      scrollInterval.current = setInterval(() => scrollBy(e, step, direction), interval);
    }

    // Update clientY
    previousClientY.current = clientY;
  }

  function sortItems(e, disableOnScroll = true) {
    if (e.type === 'mousemove' || e.type === 'dragover') {
      e.preventDefault();
    }

    // Quit if drag is not in progress
    if (!source.current || !isDragInProgress.current) {
      return;
    }

    // Quit if scrolling
    if (disableOnScroll && scrollInterval.current) {
      return;
    }

    // Source item should follow mouse movement
    const sourceItem = items.current[source.current.order];

    if (sourceItem) {
      const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
      const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
      const translateX = clientX + window.scrollX - source.current.mouse.x;
      const translateY = clientY + window.scrollY - source.current.mouse.y;

      sourceItem.ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }

    // Update target
    const { order: targetOrder, hover: targetHover } = getTarget(e, source, items);

    // Quit if over the same item as before
    if (targetOrder === target.current.order && targetHover === target.current.hover) {
      return;
    }

    target.current = { order: targetOrder, hover: targetHover };

    // Quit if left droppable area
    if (target.current === undefined) {
      return;
    }

    // Update current order
    currentOrder.current = getCurrentOrder(e);

    // Update items order
    setCurrentOrderState(currentOrder.current);
  }

  function handleStart(e) {
    e.preventDefault();

    // Quit if file dropping is disabled
    if (disableFileDrop) {
      return;
    }

    // Quit if already entered
    if (source.current) {
      return;
    }

    // Set rect
    const clientRect = ref.current.getBoundingClientRect();
    rect.current = { ...clientRect, top: clientRect.top + window.scrollY, left: clientRect.left + window.scrollX };

    // Set source & target
    source.current = { order: placeholder.current.order };
    target.current = { order: placeholder.current.order };

    // Set drag in progress
    isDragInProgress.current = true;
    setDragInProgressState(true);

    // Attach event listeners
    document.addEventListener('dragenter', handleEnter);
    document.addEventListener('dragleave', handleExit);
    document.addEventListener('dragover', handleMove);
    document.addEventListener('drop', handleEnd);
  }

  function handleMove(e) {
    if (!rect.current) {
      return;
    }

    adjustScrollPosition(e);
    sortItems(e);
  }

  async function handleEnd(e) {
    if (e.type === 'mouseup' || e.type === 'drop' || e.type === 'dragleave') {
      e.preventDefault();
    }

    // Quit if rect is not set
    if (!rect.current) {
      return;
    }

    // Quit if there is no source or target
    if (!source.current || !target.current) {
      return;
    }

    // Reset scroll interval
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }

    // Reset drag in progress
    isDragInProgress.current = false;

    // Quit and reset if left droppable area
    if (target.current.order === null) {
      cancelEnd(e);
      return;
    }

    // Get source & target items
    const clientX = e.clientX !== undefined ? e.clientX : e.changedTouches[0].clientX;

    const sourceItem = e.type === 'drop' ? placeholder.current : items.current[source.current.order];
    const targetItem =
      e.type === 'drop' && target.current.order === placeholder.current.order && dropOrder.current === null
        ? placeholder.current
        : dropOrder.current !== null
        ? items.current[dropOrder.current]
        : items.current[target.current.order];
    const parentItem = targetItem.pid ? items.current.filter((item) => item.id === targetItem.pid)[0] : null;
    const prevItem = items.current[currentOrder.current.indexOf(source.current.order) - 1];

    const parentLeft = parentItem ? rect.current.left + parentItem.rect.left + parentItem.level * itemOffset : null;
    const prevLeft = prevItem ? rect.current.left + prevItem.rect.left + prevItem.level * itemOffset : null;
    const left =
      e.type === 'drop'
        ? clientX
        : clientX - (source.current.mouse.x - rect.current.left - sourceItem.rect.left - sourceItem.level * itemOffset);

    // Update tree
    const sourcePid = sourceItem.pid;
    const sourceIndex = sourceItem.index;

    let targetPid = targetItem.pid;
    let targetIndex = targetItem.index;

    if (
      dropOrder.current !== null &&
      targetItem.children &&
      (!targetItem.isExpanded || targetItem.children.length === 0)
    ) {
      targetPid = targetItem.id;
      targetIndex = 0;
    }

    if (sourceItem.order < targetItem.order && sourceItem.pid !== targetItem.pid && dropOrder.current === null) {
      targetIndex = targetItem.index + 1;
    }

    if (sourceItem.order < targetItem.order && targetItem.children && targetItem.isExpanded) {
      targetPid = targetItem.id;
      targetIndex = 0;
    }

    if (
      parentItem &&
      sourceItem.order <= targetItem.order &&
      targetItem.index === parentItem.children.length - 1 &&
      sourceItem.pid !== parentItem.pid &&
      parentLeft > left
    ) {
      targetPid = parentItem.pid;
      targetIndex = parentItem.index + 1;
    }

    if (
      parentItem &&
      sourceItem.order <= targetItem.order &&
      targetItem.index === parentItem.children.length - 1 &&
      sourceItem.pid === parentItem.pid &&
      parentLeft > left
    ) {
      targetPid = parentItem.pid;
      targetIndex = parentItem.index;
    }

    if (
      prevItem &&
      prevItem.id !== targetItem.pid &&
      sourceItem.order >= targetItem.order &&
      prevItem.level !== targetItem.level &&
      left > prevLeft
    ) {
      targetPid = prevItem.pid;
      targetIndex = prevItem.index + 1;
    }

    // Quit and reset if dropping into root folder when it's forbidden
    if (nestFiles && targetPid === tree.rootId && !sourceItem.children) {
      onNestError();
      cancelEnd(e);
      return;
    }

    // Animate drop
    if (e.type !== 'drop') {
      const sourceLevel = sourceItem.level;
      const targetLevel = items.current.filter((item) => item.id === targetPid)[0]
        ? items.current.filter((item) => item.id === targetPid)[0].level + 1
        : 0;

      // Calculate final position
      const x = (targetLevel - sourceLevel) * itemOffset;
      const y = items.current[target.current.order].rect.top - sourceItem.rect.top;

      // Calculate transition duration
      const duration =
        dropOrder.current !== null
          ? DURATION_BASE
          : (x + y) / 2 > (itemHeight + itemOffset) / 2
          ? DURATION_BASE
          : DURATION_SM;

      // Add transition styles
      sourceItem.ref.current.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;

      // Animate drop into new position
      if (dropOrder.current === null) {
        sourceItem.ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      // Animate drop into folder
      if (dropOrder.current !== null) {
        sourceItem.ref.current.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
        sourceItem.ref.current.style.opacity = '0';
      }

      // Wait for animation to complete
      await new Promise((resolve) => setTimeout(resolve, duration));

      // Reset transition styles
      sourceItem.ref.current.style.transition = null;
      sourceItem.ref.current.style.transform = null;
    }

    // Update tree
    if (e.type !== 'drop') {
      onItemDrop({ pid: sourcePid, index: sourceIndex }, { pid: targetPid, index: targetIndex });
    }

    if (e.type === 'drop') {
      onFileDrop(e.dataTransfer, {
        pid: targetPid,
        index: targetIndex,
        replace: replaceFiles && targetItem.order === dropOrder.current,
      });
    }

    // Clean up
    reset();

    // Remove event listeners
    removeEventListeners(e);
  }

  function handleEnter() {
    dragEnterLeaveCount.current += 1;
  }

  function handleExit(e) {
    dragEnterLeaveCount.current -= 1;

    // We have to emulate dragend event here because
    // it's not fired when dragging items from computer
    if (dragEnterLeaveCount.current < 0) {
      target.current.order = null;
      handleEnd(e);
    }
  }

  //
  // Helpers
  //

  function getCurrentOrder(e) {
    const item = items.current[currentOrder.current[target.current.order]];

    if (
      item &&
      item.order !== source.current.order &&
      source.current.order <= target.current.order &&
      target.current.order >= currentOrder.current[target.current.order] &&
      target.current.hover === 'top' &&
      ((item.children && !item.isExpanded) ||
        item.children?.length === 0 ||
        (replaceFiles && e.type === 'dragover' && item.isExpanded !== true))
    ) {
      dropOrder.current = item.order;
      setDropOrderState(dropOrder.current);
      return currentOrder.current;
    }

    if (
      item &&
      item.order !== source.current.order &&
      source.current.order <= target.current.order &&
      target.current.order < currentOrder.current[target.current.order] &&
      target.current.hover === 'bottom' &&
      ((item.children && !item.isExpanded) ||
        item.children?.length === 0 ||
        (replaceFiles && e.type === 'dragover' && item.isExpanded !== true))
    ) {
      dropOrder.current = item.order;
      setDropOrderState(dropOrder.current);
      return currentOrder.current;
    }

    if (
      item &&
      item.order !== source.current.order &&
      source.current.order >= target.current.order &&
      target.current.order <= currentOrder.current[target.current.order] &&
      target.current.hover === 'bottom' &&
      ((item.children && !item.isExpanded) ||
        item.children?.length === 0 ||
        (replaceFiles && e.type === 'dragover' && item.isExpanded !== true))
    ) {
      dropOrder.current = item.order;
      setDropOrderState(dropOrder.current);
      return currentOrder.current;
    }

    if (
      item &&
      item.order !== source.current.order &&
      source.current.order >= target.current.order &&
      target.current.order > currentOrder.current[target.current.order] &&
      target.current.hover === 'top' &&
      ((item.children && !item.isExpanded) ||
        item.children?.length === 0 ||
        (replaceFiles && e.type === 'dragover' && item.isExpanded !== true))
    ) {
      dropOrder.current = item.order;
      setDropOrderState(dropOrder.current);
      return currentOrder.current;
    }

    dropOrder.current = null;
    setDropOrderState(dropOrder.current);

    const arr = [...initialOrder.current];
    const from = arr.indexOf(source.current.order);
    const to = target.current.order === null ? arr.length : arr.indexOf(target.current.order);

    arr.splice(to, 0, arr.splice(from, 1)[0]);
    return arr;
  }

  function getTarget(e, source: DragSourceRefProps, items: RenderedItemsRefProps) {
    const sourceItem = items.current[source.current.order];
    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;

    let x = window.scrollX - rect.current.left + clientX;
    let y = window.scrollY - rect.current.top + clientY;

    if (sourceItem) {
      x += rect.current.left + sourceItem.rect.left + sourceItem.rect.width / 2 - source.current.mouse.x;
      y += rect.current.top + sourceItem.rect.top + sourceItem.rect.height / 2 - source.current.mouse.y;
    }

    let order = null;
    let hover = null;

    // Get the hovered item
    const item = items.current.filter((item: RenderedItemProps) => {
      return item.rect.top <= y && item.rect.bottom >= y && item.rect.left <= x && item.rect.right >= x;
    })[0];

    // Update order & hover
    if (item) {
      order = item.order;
      hover = y < item.rect.top + item.rect.height / 2 ? 'top' : 'bottom';
    }

    // Check against placeholder coordinates if dragging new file
    if (
      e.type === 'dragover' &&
      placeholder.current.rect.top <= y &&
      placeholder.current.rect.bottom >= y &&
      placeholder.current.rect.left <= x &&
      placeholder.current.rect.right >= x
    ) {
      order = placeholder.current.order;
      hover = y < placeholder.current.rect.top + placeholder.current.rect.height / 2 ? 'top' : 'bottom';
    }

    return { order, hover };
  }

  function reset() {
    source.current = null;
    target.current = null;

    // Reset rect
    rect.current = null;

    // Reset drop order
    dropOrder.current = null;
    setDropOrderState(dropOrder.current);

    // Reset drag in progress
    isDragInProgress.current = false;
    setDragInProgressState(false);

    // Reset drag enter/leave count
    dragEnterLeaveCount.current = 0;
  }

  function scrollBy(e: React.MouseEvent | React.TouchEvent, step: number, direction: 'top' | 'bottom') {
    if (direction === 'top' && window.scrollY <= 0) {
      clearScrollInterval();
      return;
    }

    if (direction === 'bottom' && window.scrollY + window.innerHeight >= document.body.offsetHeight) {
      clearScrollInterval();
      return;
    }

    window.scrollBy(0, step * (direction === 'top' ? -1 : 1));
    sortItems(e, false);
  }

  function clearScrollInterval() {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  }

  async function cancelEnd(e) {
    const sourceItem = items.current[source.current.order];

    // Animate source item back to initial position
    if (sourceItem) {
      sourceItem.ref.current.style.transition = `transform ${DURATION_BASE}ms ease-out`;
      sourceItem.ref.current.style.transform = `translate(0, 0)`;
    }

    // Reset to initial order
    currentOrder.current = initialOrder.current;
    setCurrentOrderState(currentOrder.current);

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, DURATION_BASE));

    // Reset transition styles
    if (sourceItem) {
      sourceItem.ref.current.style.transition = null;
      sourceItem.ref.current.style.transform = null;
    }

    // Clean up
    reset();

    // Remove event listeners
    removeEventListeners(e);
  }

  function removeEventListeners(e) {
    if (e.type === 'mouseup') {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleEnd);
    }

    if (e.type === 'touchend') {
      document.removeEventListener('touchmove', handleMove);
      document.removeEventListener('touchend', handleEnd);
    }

    if (e.type === 'drop' || e.type === 'dragleave') {
      document.removeEventListener('dragenter', handleEnter);
      document.removeEventListener('dragleave', handleExit);
      document.removeEventListener('dragover', handleMove);
      document.removeEventListener('drop', handleEnd);
    }
  }

  //
  // Return
  //

  return (
    <div ref={ref} style={style}>
      {props.children({ provided: { draggableProps, placeholderProps } })}
    </div>
  );
};

export default TreeDroppable;
