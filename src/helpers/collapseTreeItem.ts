import { TreeData } from '../types';

export default function collapseTree(tree: TreeData, id: string): TreeData {
  const clone = { ...tree };
  const item = clone.items[id];

  item.isExpanded = false;
  return clone;
}
