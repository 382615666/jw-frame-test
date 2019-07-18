export default {
  loadFile (tagName, options) {
    options = Object.assign({
      attrs: {},
      src: 'src',
      parent: document.body
    }, options)

    return function (src, func) {
      // 避免开发时，热加载会新增重复路由
      const tags = document.querySelectorAll(tagName)
      const index = Array.from(tags).findIndex(item => item[options.src].indexOf(src.split('?')[0]) > -1)
      if (~index) {
        return
      }
      const tag = document.createElement(tagName)
      for(let key in options.attrs) {
        tag[key] = options.attrs[key]
      }
      tag[options.src] = src
      tag.onload = typeof func === 'function' ? func : null
      options.parent.appendChild(tag)
    }
  },
  mergeRoute(source = [], target = []) {
    let stack = {}
    source.forEach(item => stack[item.path] = item)
    let result = target.map(item => {
      if (item.path in stack) {
        let temp = {...stack[item.path], ...item}
        const sourceChildren = stack[item.path].children
        const targetChildren = item.children
        if (sourceChildren && sourceChildren.length && targetChildren && targetChildren.length) {
          temp.children = this.mergeRoute(sourceChildren, targetChildren)
        }
        delete stack[item.path]
        return temp
      }
      return item
    })
    for (let key in stack) {
      result.push(stack[key])
    }
    return result
  },
  mergeArrayRoute (array = []) {
    let i = 0
    let result = []
    while (array.length > 1) {
      if (i === array.length - 1) {
        array.push([])
      }
      result[i / 2] = this.mergeRoute(array[i], array[i + 1])
      i += 2
      if (i >= array.length) {
        array = result
        i = 0
        result = []
      }
    }
    return array[0]
  },
  formatRoute(array = [], parentPath = '') {
    return array.map(item => {
      const meta = item.meta || {}
      let temp = {
        ...meta,
        component: item.component,
        path: `${parentPath}/${item.path}`.replace(/\/\//g, '/')
      }
      temp.children = this.formatRoute(item.children, temp.path)
      return temp
    })
  }
}
