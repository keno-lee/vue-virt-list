import { type TreeProps } from './useTree';
import type { ITreeNode } from './type';

export const useFocus = (props: TreeProps) => {
  const hasFocused = (node: ITreeNode) => props.focusKey === node.key;
  return {
    hasFocused,
  };
};
