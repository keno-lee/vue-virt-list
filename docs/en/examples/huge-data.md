# Huge Data

## Example

300,000 rows of data

For huge amounts of data, please use `ShallowRef !!!`, `otherwise memory will explode!!!` If you need reactivity, please use `virtListRef.value?.forceUpdate();`. Or, add your own `renderKey` to control rendering.

<!<< @/demos/huge-data/Main.vue
