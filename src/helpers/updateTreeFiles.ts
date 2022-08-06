import { TreeData, ItemProps, TargetItemProps } from '../types';

export default function updateTreeFiles(tree: TreeData, files: ItemProps[], target: TargetItemProps): TreeData {
  if (target.replace === true && files.length > 1) {
    return tree;
  }

  const clone = JSON.parse(JSON.stringify(tree));
  const children = target.pid ? clone.items[target.pid].children : clone.children;

  files.forEach((item) => (clone.items[item.id] = item));
  files.reverse().forEach((item) => (target.replace ? children.splice(target.index, 1, item.id) : children.splice(target.index, 0, item.id)));

  return clone;
}
