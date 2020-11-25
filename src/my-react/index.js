import { createDom } from '../react-dom/index'
import { diff } from '../react-dom/diff'
import { patch } from '../react-dom/patch'

export class Element {
  constructor(tag,props,children) {
    this.tag = tag
    this.props = props
    this.children = children
  }
}

class Component {
  constructor(props = {}) {
    this.props = props,
    this.state = {}
  }
  /**
   * 
   * @param {传入的需要更新的数据} updatedState 
   */
  setState(updatedState) {
    //合并对象  将新的state合并到旧的state上
    Object.assign(this.state,updatedState)
    //再调用render方法重新生成新的虚拟DOM
    const newVdom = this.render()
    //根据diff算法找出新旧虚拟DOM的区别
    const patches = diff(this.vdom,newVdom)
    //根据不同，更新DOM节点
    patch(this.dom,patches)
    this.vdom = newVdom
  }
}

function createElement(tag,props,...children) {
  return new Element(tag,props,children)
}

const React = {
  createElement,
  Component
}

export default React
export { Component }