import { Element } from '../my-react/index'

/**
 * //根据传入的虚拟DOM，返回真实DOM节点
 * @param {虚拟DOM} vdom 
 */
export function createDom(vdom) {
  if (vdom == 'undefined') return
  //普通文本的处理
  if (typeof vdom == 'string' || typeof vdom == 'number') {
    return document.createTextNode(vdom)
  }
  //jsx对象处理
  else if (typeof vdom.tag == 'string') {
    const dom = document.createElement(vdom.tag)
    if (vdom.props) {
      //给dom添加属性
      for (let key in vdom.props) {
        setProperty(dom,key,vdom.props[key])
      }
    }
    //递归处理子节点
    if (vdom.children && vdom.children.length > 0) {
      vdom.children.forEach(item => render(item,dom))
    }
    return dom
  }
  //组件的处理
  else if (typeof vdom.tag == 'function') {
    //创建组件的实例
    const instance = createComponentInstance(vdom.tag,vdom.props)
    //生成实例对应的DOM节点
    createDomForComponentInstance(instance)
    return instance.dom
  }
}

/**
 * 
 * @param {属性名} key 
 * @param {属性值} value 
 * @param {DOM节点} dom 
 */
export function setProperty(dom,key,value) {
  //事件的处理 如果属性名以on开头则是事件，再将事件的key全变小写
  if (key.startsWith('on')) {
    key = key.toLowerCase()
  }
  //样式的处理
  if (key == 'style' && value) {
    if (typeof value == 'string') {
      //如果value是字符串
      dom.style.cssText = value
    } else if (typeof value == 'object') {
      //如果value是对象
      for (let attr in value) {
        dom.style[attr] = value[attr]
      }
    }
  } else {
    //样式以外的处理
    dom[key] = value
  }
}

function createComponentInstance(comp,props) {
  let instance = null
  if (comp.prototype.render) {
    //组件的原型对象上有render方法，则是类组件
    //类组件 直接用new生成一个组件实例
    instance = new comp(props)
    
  } else {
    //是函数组件
    instance = new Element(comp)
    instance.constructor = comp
    instance.render = function (props) {
      return comp(props)
    }
  }
  return instance
}
/**
 * 
 * @param {组件实例} instance 
 */
function createDomForComponentInstance(instance) {
  //获取到虚拟DOM并挂载到实例上 因为类组件的render方法中return的就是jsx对象
  //所以直接调用render方法获取获取虚拟DOM
  instance.vdom = instance.render()

  //如果实例上没有挂载过DOM，则是第一次创建
  //之后再发生更新，则不会进入到该判断分支，就不会执行componentDidMount方法
  if (!instance.dom) {
    typeof instance.componentDidMount == 'function' && instance.componentDidMount()
  }

  //生成真实的DOM节点，并且也挂载到实例上
  instance.dom = createDom(instance.vdom)
}

/**
 * 
 * @param {虚拟DOM} vdom 
 * @param {容器} container 
 */
function render(vdom,container) {
  //根据虚拟DOM转换为真实DOM
  const dom = createDom(vdom)
  //将真实DOM添加到容器DOM中
  container.appendChild(dom)
}

const ReactDOM = {
  render
}

export default ReactDOM