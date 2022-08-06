import { TreeData } from '../types';

export default function getChildrenCount(tree: TreeData, id: string, counter = 0): number {
  const item = tree.items[id];

  if (item.children && item.children.length > 0 && item.isExpanded === true) {
    counter += item.children.length;

    item.children.forEach((cid) => {
      counter += getChildrenCount(tree, cid);
    });
  }

  return counter;
}
