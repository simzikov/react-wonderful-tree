import React, { FC } from 'react';
import TreeBlock from './TreeBlock';
import TreeDroppable from './TreeDroppable';
import TreePlaceholder from './TreePlaceholder';
import { flattenTree } from './helpers';
import { DroppableChildrenFunctionProps, TreeProps } from './types';

const Tree: FC<TreeProps> = ({
  tree,
  itemHeight,
  itemOffset = 16,
  renderItem,
  nestFiles = false,
  replaceFiles = false,
  disableItemDrop = false,
  disableFileDrop = false,
  onItemDrop,
  onFileDrop = () => {},
  onCollapse = () => {},
  onExpand = () => {},
  onNestError = () => {},
}) => {
  const root = tree.items[tree.rootId];
  const flatTree = flattenTree(tree, root.children);

  return (
    <TreeDroppable
      tree={tree}
      flatTree={flatTree}
      itemHeight={itemHeight}
      itemOffset={itemOffset}
      nestFiles={nestFiles}
      replaceFiles={replaceFiles}
      disableItemDrop={disableItemDrop}
      disableFileDrop={disableFileDrop}
      onItemDrop={onItemDrop}
      onFileDrop={onFileDrop}
      onNestError={onNestError}
    >
      {({ provided }: DroppableChildrenFunctionProps) => (
        <>
          {root.children.map((id, index) => (
            <TreeBlock
              tree={tree}
              flatTree={flatTree}
              id={id}
              pid={tree.rootId}
              index={index}
              level={0}
              itemHeight={itemHeight}
              itemOffset={itemOffset}
              renderItem={renderItem}
              onCollapse={onCollapse}
              onExpand={onExpand}
              draggableProps={provided.draggableProps}
              key={id}
            />
          ))}
          <TreePlaceholder tree={tree} flatTree={flatTree} itemHeight={itemHeight} {...provided.placeholderProps} />
        </>
      )}
    </TreeDroppable>
  );
};

export default Tree;
