import { TreeData } from '../types';

export default function flattenTree(tree: TreeData, children: string[]): string[] {
  return children.flatMap((id) => (tree.items[id].children && tree.items[id].isExpanded ? [...[id], ...flattenTree(tree, tree.items[id].children)] : id));
}
