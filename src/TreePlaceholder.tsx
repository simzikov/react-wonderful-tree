import React, { useEffect, useRef, FC } from 'react';
import { TreeData, PlaceholderRefProps } from './types';

interface TreePlaceholderProps {
  tree: TreeData;
  flatTree: string[];
  itemHeight: number;
  placeholder: PlaceholderRefProps;
}

const TreePlaceholder: FC<TreePlaceholderProps> = ({ tree, flatTree, itemHeight, placeholder }) => {
  const ref = useRef(null);

  //
  // Style
  //

  const style = {
    height: itemHeight,
  };

  //
  // Effects
  //

  useEffect(() => {
    const rect = {
      top: ref.current.offsetTop,
      right: ref.current.offsetLeft + ref.current.offsetWidth,
      bottom: ref.current.offsetTop + ref.current.offsetHeight,
      left: ref.current.offsetLeft,
      width: ref.current.offsetWidth,
      height: ref.current.offsetHeight,
    };

    placeholder.current = { ref, pid: tree.rootId, index: tree.items[tree.rootId].children.length, order: flatTree.length, level: 0, rect };
    return () => (placeholder.current = null);
  }, [flatTree]);

  //
  // Return
  //

  return <div ref={ref} style={style} />;
};

export default TreePlaceholder;
