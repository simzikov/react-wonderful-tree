import { TreeData, SourceItemProps, TargetItemProps } from '../types';

export default function updateTreeItems(tree: TreeData, source: SourceItemProps, target: TargetItemProps): TreeData {
  const clone = JSON.parse(JSON.stringify(tree));
  const sourceArr = source.pid ? clone.items[source.pid].children : clone.children;
  const targetArr = target.pid ? clone.items[target.pid].children : clone.children;

  targetArr.splice(target.index, 0, sourceArr.splice(source.index, 1)[0]);
  return clone;
}
