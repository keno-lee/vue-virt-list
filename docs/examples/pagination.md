# Pagination

- 分页: 列表数据采用上下分页的形式，永远只缓存当前页数据和缓冲数据（例如：pageSize为20时，缓存数据为40）
- 虚拟列表 VirtList : 缓存的数据渲染仍然采取虚拟列表渲染

## Example

<!<< @/demos/pagination/Main.vue
