import React, { useState, useRef, FC } from 'react';
import TreeCollapse from './TreeCollapse';
import TreeDraggable from './TreeDraggable';
import { getChildrenCount } from './helpers';
import { BlockProps } from './types';

const TreeBlock: FC<BlockProps> = ({
  tree,
  flatTree,
  id,
  pid,
  index,
  level,
  itemHeight,
  itemOffset,
  renderItem,
  onCollapse,
  onExpand,
  draggableProps,
  ...props
}) => {
  const item = tree.items[id];
  const order = flatTree.indexOf(id);
  const isCollapseSmooth = useRef(null);

  // States
  const [isExpanded, setExpanded] = useState(item.isExpanded);

  // Constants
  const COLLAPSE_DURATION = 300;

  //
  // Handlers
  //

  function handleCollapse(id: string, isSmooth = true) {
    isCollapseSmooth.current = isSmooth;
    setExpanded(false);
    setTimeout(() => onCollapse(id), isSmooth ? COLLAPSE_DURATION : 0);
  }

  function handleExpand(id: string, isSmooth = true) {
    isCollapseSmooth.current = isSmooth;
    setExpanded(true);

    // We need to update things two times to make sure
    // items positioning is updated once animaiton is finished
    onExpand(id);
    setTimeout(() => onExpand(id), isSmooth ? COLLAPSE_DURATION : 0);
  }

  //
  // Return
  //

  // Quit if item is not visible
  if (order === -1) return null;

  return (
    <div {...props}>
      <TreeDraggable
        flatTree={flatTree}
        item={item}
        id={id}
        pid={pid}
        index={index}
        order={order}
        level={level}
        itemHeight={itemHeight}
        itemOffset={itemOffset}
        onCollapse={handleCollapse}
        onExpand={handleExpand}
        isExpanded={isExpanded}
        tabIndex={order + 1}
        {...draggableProps}
      >
        {({ provided, snapshot }) => renderItem({ item, level, order, provided, snapshot })}
      </TreeDraggable>
      {item.children?.length > 0 && (
        <TreeCollapse
          height={getChildrenCount(tree, item.id) * itemHeight}
          isSmooth={isCollapseSmooth.current}
          isExpanded={isExpanded}
        >
          {item.children.map((cid: string, index: number) => (
            <TreeBlock
              tree={tree}
              flatTree={flatTree}
              id={cid}
              pid={id}
              index={index}
              level={level + 1}
              itemHeight={itemHeight}
              itemOffset={itemOffset}
              renderItem={renderItem}
              onCollapse={onCollapse}
              onExpand={onExpand}
              draggableProps={draggableProps}
              key={cid}
            />
          ))}
        </TreeCollapse>
      )}
    </div>
  );
};

export default TreeBlock;
