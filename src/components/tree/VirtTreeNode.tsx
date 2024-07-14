import {
  defineComponent,
  type ExtractPropTypes,
  type PropType,
} from 'vue-demi';
import type { ITreeNode } from './type';
import { _h, _h2Slot, getSlot } from '../../util';
import './tree.css';

export const treeNodeProps = {
  node: {
    type: Object as PropType<ITreeNode>,
    default: () => ({}),
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
  indent: {
    type: Number,
    default: 16,
    required: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
  isIndeterminate: {
    type: Boolean,
    default: false,
  },
  hiddenExpandIcon: {
    type: Boolean,
    default: false,
  },

  isFocused: {
    type: Boolean,
    default: false,
  },
  selectable: {
    type: Boolean,
    default: false,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
  disableCheckbox: {
    type: Boolean,
    default: false,
  },
  checkOnClickNode: {
    type: Boolean,
    default: false,
  },
  showLine: {
    type: Boolean,
    default: false,
  },
  itemHeight: {
    type: Number,
    default: 32,
  },
};

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps>;

export default defineComponent({
  name: 'VirtTreeNode',
  props: treeNodeProps,
  // inheritAttrs: false,
  emits: ['check', 'select', 'toggle'],
  setup(props: TreeNodeProps, { emit }) {
    const handleClick = (e: Event) => {
      e.stopPropagation();
      if (props.checkOnClickNode) {
        emit('check', props.node, !props.isChecked);
      }
      emit('select', props.node, e);
    };

    const handleToggle = (e: Event) => {
      e.stopPropagation();
      emit('toggle', props.node);
    };

    const onChange = (e: Event) => {
      e.stopPropagation();
      emit('check', props.node, !props.isChecked);
    };

    return {
      handleClick,
      onChange,
      handleToggle,
    };
  },
  render() {
    const { handleClick, onChange, handleToggle } = this;
    const {
      indent,
      isChecked,
      checkable,
      isIndeterminate,
      expanded,
      node,
      hiddenExpandIcon,
      isSelected,
      disableCheckbox,
      isFocused,
      showLine,
      itemHeight,
    } = this.$props as TreeNodeProps;

    const defaultIcon = _h(
      'svg',
      {
        width: '20',
        height: '20',
        viewBox: '0 0 20 20',
        fill: 'none',
        xmlns: 'http://www.w3.org/2000/svg',
      },
      _h('path', {
        d: 'M14.5632 7.72544L10.539 13.2587C10.2728 13.6247 9.72696 13.6247 9.46073 13.2587L5.43658 7.72544C5.11611 7.28479 5.43088 6.66666 5.97573 6.66666L14.024 6.66666C14.5689 6.66666 14.8837 7.28479 14.5632 7.72544Z',
        fill: 'var(--virt-tree-icon-color)',
      }),
    );

    const slotIcon = _h(
      'div',
      {
        class: {
          'virt-tree-icon-wrapper': true,
          'is-expanded': expanded,
        },
        style: {
          opacity: node.isLeaf || hiddenExpandIcon ? 0 : 1,
        },
        attrs: {
          onClick: handleToggle,
        },
      },
      [
        _h(
          'div',
          {
            class: 'virt-tree-icon',
          },
          getSlot(this, 'icon')
            ? getSlot(this, 'icon')?.(node, expanded)
            : defaultIcon,
        ),
      ],
    );

    const slotCheckbox = checkable
      ? _h('div', {
          class: `checkbox ${isChecked ? 'is-checked' : ''} ${isIndeterminate ? 'is-indeterminate' : ''} ${disableCheckbox ? 'is-disabled' : ''}`,
          onClick: onChange,
        })
      : null;

    const slotContent = getSlot(this, 'content')
      ? getSlot(this, 'content')?.(node)
      : _h(
          'div',
          {
            class: 'virt-tree-node-content',
          },
          node.title,
        );

    const generateChildren = () => {
      const childrenList = [slotIcon, slotCheckbox, slotContent];
      if (node.level <= 1) {
        return childrenList;
      }
      Array.from({ length: node.level - 1 }).forEach((_, index) =>
        childrenList.unshift(
          _h('div', {
            class: {
              'virt-tree-node-block': true,
              'virt-tree-node-block__line': showLine,
              'vit-tree-node-block--vertical': index === 0 && showLine,
              'vit-tree-node-block--half':
                !!node.isLast && index === 0 && !expanded && showLine,
            },
            style: { width: `${indent}px` },
          }),
        ),
      );
      return childrenList;
    };

    return getSlot(this, 'default')
      ? getSlot(this, 'default')?.(node, node!.data, expanded)
      : _h(
          'div',
          {
            class: {
              'virt-tree-node': true,
              'is-selected': isSelected,
              'is-disabled': node.disabled,
              'is-focused': isFocused,
            },
            style: {
              height: `${itemHeight}px`,
            },
            attrs: {
              onClick: handleClick,
            },
          },
          generateChildren(),
        );
  },
});
