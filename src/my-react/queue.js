//保存需要更新的数据和组件的对象的队列
const stateQueue = []
//保存需要更新的组件的队列
const compQueue = []

//入列方法
export function enqueue(updatedState, comp) {
  //如果任务队列为0， 进行出列操作
  if (stateQueue.length == 0) {
    //当第一次进入，必定会进入到该判断分支里
    //但是因为是异步，所以不会执行
    //当所有同步执行完成后，也就是所有需要更新的数据都入列了
    //再执行出列操作，并对所有要更新的数据做一个合并

    //异步的调用出列函数
    setTimeout(flush,0)
  }
  stateQueue.push({
    updatedState,
    comp
  })
  //判断组件队列中是否已经有该组件
  const hasComp = compQueue.some(item => item == comp)
  //如果组件队列中没有，才push进去
  if (!hasComp) {
    compQueue.push(comp)
  }
}

//出列函数
function flush() {
  let item, comp
  //循环出列 并合并对象
  while (item = stateQueue.shift()) {
    const { updatedState, comp } = item
    //合并对象 将所有需要更新的数据都合并到组件实例的state属性上
    Object.assign(comp.state, updatedState)
  }
  //拿到需要更新的组件
  while (comp = compQueue.shift()) {
    //调用组件自身的update方法，更新数据及虚拟DOM
    comp.update()
  }
}