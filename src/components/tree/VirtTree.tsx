import { defineComponent, type SetupContext } from 'vue-demi';
import {
  useTree,
  customFieldNames,
  type TreeProps,
  TreeEmits,
} from './useTree';
import TreeNode from './VirtTreeNode';
import { VirtList } from '../../VirtList';
import { _h, _h2Slot, getSlot } from '../../util';
import type { ITreeNode, TreeNodeData } from './type';

export default defineComponent({
  name: 'VirtTree',
  props: customFieldNames,
  setup(props: TreeProps, context: SetupContext) {
    const emits = context.emit as SetupContext<typeof TreeEmits>['emit'];
    return useTree(props, emits);
  },
  render() {
    const {
      flattenList,
      isExpanded,
      onScroll,

      isChecked,
      isIndeterminate,
      onCheckChange,
      toggleExpand,
      isForceHiddenExpandIcon,

      onSelect,
      isSelected,
    } = this;

    const { minSize, showCheckbox, selectable, indent } = this
      .$props as TreeProps;

    const renderTreeNode = ({
      itemData,
    }: {
      itemData: ITreeNode;
      index: number;
    }) => {
      return _h2Slot(
        TreeNode,
        {
          attrs: {
            node: itemData,
            indent,
            showCheckbox,
            hiddenExpandIcon: isForceHiddenExpandIcon(itemData),
            expanded: isExpanded(itemData),
            isChecked: isChecked(itemData),
            selectable,
            isSelected: isSelected(itemData),
            indeterminate: isIndeterminate(itemData),
            onSelect: onSelect,
            onCheck: onCheckChange,
            onToggle: (node: ITreeNode) => toggleExpand(node),
          },
        },
        {
          default: getSlot(this, 'default')
            ? (node: ITreeNode, data: TreeNodeData, expand: boolean) =>
                getSlot(
                  this,
                  'default',
                )?.({
                  node,
                  data,
                  expand,
                })
            : null,
          content: getSlot(this, 'content')
            ? (node: ITreeNode) => getSlot(this, 'content')?.({ node })
            : null,
          icon: getSlot(this, 'icon')
            ? (node: ITreeNode, expanded: boolean) =>
                getSlot(this, 'icon')?.({ node, expanded })
            : null,
        },
      );
    };

    return _h2Slot(
      VirtList,
      {
        ref: 'virtListRef',
        attrs: {
          list: flattenList,
          minSize: minSize,
          itemKey: 'key',
          onScroll: onScroll,
          ...this.$attrs,
        },
      },
      {
        default: renderTreeNode,
        stickyHeader: getSlot(this, 'stickyHeader'),
        stickyFooter: getSlot(this, 'stickyFooter'),
        header: getSlot(this, 'header'),
        footer: getSlot(this, 'footer'),
        empty: getSlot(this, 'empty'),
      },
    );
  },
});
