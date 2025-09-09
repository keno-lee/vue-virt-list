# Keep-Alive

组件内部已针对keep-alive进行支持，内部代码：

```js
onActivated(() => {
  scrollToOffset(reactiveData.offset);
});
```

## 示例

<!<< @/demos/keep-alive/Main.vue
