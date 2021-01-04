//左侧菜单显示
const leftmenus = [{
  path: '/',
  name: 'index'
}]
//右侧菜单显示
const rightmenus = [{
  path: '/',
  name: 'index'
}]

export const leftShow = () => {
  if (process.server) return;
  const { name, path } = $nuxt.$route;
  return leftmenus.find(m => m.name == name || m.path == path);
}
export const rightShow = () => {
  if (process.server) return;
  const { name, path } = $nuxt.$route;
  return rightmenus.find(m => m.name == name || m.path == path);
}