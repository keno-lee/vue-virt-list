import { shallowRef, computed, triggerRef } from "vue-demi";
const isFunction = (value) => typeof value === "function" || value instanceof Function || Object.prototype.toString.call(value) === "[object Function]";
const useFilter = ({
  props,
  treeInfo
}) => {
  const hiddenNodeKeySet = shallowRef(/* @__PURE__ */ new Set([]));
  const hiddenExpandIconKeySet = shallowRef(/* @__PURE__ */ new Set([]));
  const filterable = computed(() => {
    return isFunction(props.filterMethod);
  });
  function doFilter(query) {
    if (!filterable.value) {
      return;
    }
    const expandKeySet = /* @__PURE__ */ new Set();
    const hiddenExpandIconKeys = hiddenExpandIconKeySet.value;
    const hiddenKeys = hiddenNodeKeySet.value;
    const family = [];
    const nodes = treeInfo.treeNodes || [];
    const filter = props.filterMethod;
    hiddenKeys.clear();
    function traverse(nodes2) {
      nodes2.forEach((node) => {
        var _a;
        const searchedIndex = query === "" ? -1 : (_a = node.title) == null ? void 0 : _a.toLowerCase().indexOf(query.toLowerCase());
        node.searchedIndex = searchedIndex;
        family.push(node);
        if (filter == null ? void 0 : filter(query, node)) {
          family.forEach((member) => {
            expandKeySet.add(member.key);
          });
        } else if (node.isLeaf) {
          hiddenKeys.add(node.key);
        }
        const children = node.children;
        if (children) {
          traverse(children);
        }
        if (!node.isLeaf) {
          if (!expandKeySet.has(node.key)) {
            hiddenKeys.add(node.key);
          } else if (children) {
            let allHidden = true;
            for (const childNode of children) {
              if (!hiddenKeys.has(childNode.key)) {
                allHidden = false;
                break;
              }
            }
            if (allHidden) {
              hiddenExpandIconKeys.add(node.key);
            } else {
              hiddenExpandIconKeys.delete(node.key);
            }
          }
        }
        family.pop();
      });
    }
    traverse(nodes);
    triggerRef(hiddenNodeKeySet);
    triggerRef(hiddenExpandIconKeySet);
    return expandKeySet;
  }
  function isForceHiddenExpandIcon(node) {
    return hiddenExpandIconKeySet.value.has(node.key);
  }
  return {
    hiddenExpandIconKeySet,
    hiddenNodeKeySet,
    doFilter,
    isForceHiddenExpandIcon
  };
};
export {
  useFilter
};
