# 特殊说明

## 百万级数据

目前受限于浏览器最高高度限制，导致滚动条超出一定高度后无法继续滚动。在示例中，大约上线为38万行数据。后续作者计划通过自己模拟滚动条来实现百万级数据的展示

## 滚动性能

本虚拟列表支持满帧渲染，但在大数据或复杂dom场景下应当由使用者自行避免2个问题：

1. 列表数据应当使用非响应式数据 ShallowRef 替换 响应式数据 Ref
2. 复杂dom应当使渲染层和交互层分离，渲染层dom要极简。

## 修复滚动selection问题

仅修复vue2下diff算法的bug(列表在向下滚动过程中，vue2-diff算法会导致整个列表重新挂载)

## shallowRef

无论是使用VirtList还是使用VirtGrid，一旦使用了shallowRef，就需要使用提供的forceUpdate方法来更新list长度变化。对于item内容变化，需要自行使用renderKey来进行相应更新。
具体demo请参考: https://kolarorz.github.io/vue-virt-list/examples/huge-data/
