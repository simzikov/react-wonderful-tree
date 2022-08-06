import React, { useEffect, useRef, FC } from 'react';
import { DraggableProps } from './types';

const TreeDraggable: FC<DraggableProps> = ({
  flatTree,
  item,
  id,
  pid,
  index,
  order,
  level,
  itemHeight,
  itemOffset,
  onCollapse,
  onExpand,
  isExpanded,

  // Droppable props
  droppableRef,
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

  // Rest
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isDragging = isDragInProgressState && source.current && source.current.order === order ? true : false;
  const isDropping = dropOrderState === order ? true : false;

  //
  // Props & style
  //

  const style = {
    transform: getTransformStyle(),
    transition: getTransitionStyle(),
    pointerEvents: isDragInProgressState && !isDragging ? 'none' : 'auto',
    paddingLeft: `${level * itemOffset}px`,
    position: isDragging ? 'sticky' : isDropping ? 'relative' : null,
    zIndex: isDragging ? 999999 : isDropping ? 1 : null,
    outline: 'none',
  } as React.CSSProperties;

  const dragHandleStyle = {
    cursor: isDragging ? 'grabbing' : 'grab',
    touchAction: 'none',
  };

  const dragHandleProps = { style: dragHandleStyle, onMouseDown: handleStart, onTouchStart: handleStart };
  const collapseProps = { onClick: handleCollapse, isExpanded: isExpanded };
  const snapshot = { isDragging, isDropping };

  //
  // Effects
  //

  // Update list of current items and their order
  // Item position is calculated against its droppable parent

  useEffect(() => {
    const current = items.current;

    const rect = {
      top: ref.current.offsetTop,
      right: ref.current.offsetLeft + ref.current.offsetWidth,
      bottom: ref.current.offsetTop + ref.current.offsetHeight,
      left: ref.current.offsetLeft,
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    };

    current[order] = {
      ref,
      id,
      pid,
      index,
      order,
      level,
      children: item.children,
      isExpanded: item.isExpanded,
      rect: rect,
    };

    return () => {
      current.splice(order);
    };
  }, [flatTree]);

  //
  // Handlers
  //

  function handleStart(e) {
    if (e.type === 'mousedown') {
      e.preventDefault();
    }

    // Quit if item dropping is disabled
    if (disableItemDrop) {
      return;
    }

    // Avoid right click
    if (e.type === 'mousedown' && e.button !== 0) {
      return;
    }

    // Update rect
    const droppableRect = droppableRef.current.getBoundingClientRect();
    rect.current = {
      ...droppableRect,
      top: droppableRect.top + window.scrollY,
      left: droppableRect.left + window.scrollX,
    };

    // Update source & target items
    const clientX = e.clientX !== undefined ? e.clientX : e.touches[0].clientX;
    const clientY = e.clientY !== undefined ? e.clientY : e.touches[0].clientY;
    const mouse = { x: clientX + window.scrollX, y: clientY + window.scrollY };

    // Update source & target
    source.current = { order, mouse };
    target.current = { order };

    // Set drag in progress
    isDragInProgress.current = true;
    setDragInProgressState(true);

    // Collapse if expanded
    onCollapse(id, false);

    // Attach event listeners
    if (e.type === 'mousedown') {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleEnd);
    }

    if (e.type === 'touchstart') {
      document.addEventListener('touchmove', handleMove);
      document.addEventListener('touchend', handleEnd);
    }
  }

  function handleCollapse(e) {
    if (e.type === 'click') e.preventDefault();
    item.isExpanded ? onCollapse(id) : onExpand(id);
  }

  //
  // Helpers
  //

  function getTransformStyle() {
    const index = currentOrderState.indexOf(order);

    if (!source.current) return;
    if (source.current.order === order) return null;
    if (index > order) return 'translateY(100%)';
    if (index < order) return 'translateY(-100%)';

    return null;
  }

  function getTransitionStyle() {
    if (!source.current) return null;
    if (source.current.order === order) return null;

    return 'transform 0.2s ease-in-out';
  }

  //
  // Return
  //

  return (
    <div ref={ref} style={style} {...props}>
      {props.children({ provided: { dragHandleProps, collapseProps }, snapshot })}
    </div>
  );
};

export default TreeDraggable;
