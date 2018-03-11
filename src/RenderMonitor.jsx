import React, { Component, PureComponent } from 'react';
import { XStore, makeOnlyContainer } from 'pastate';

const initState = {
    line0:{
        value: 0,
        children: [{
            value: 0,
            children:[{
                value: 0
            },{
                value: 0
            }]
        },{
            value: 0,
            children:[{
                value: 0
            },{
                value: 0
            }]
        }]
    },
    line1: {
        value: 0,
        children: [{
            value: 0,
            children:[{
                value: 0
            },{
                value: 0
            }]
        },{
            value: 0,
            children:[{
                value: 0
            },{
                value: 0
            }]
        }]
    }
}

const store = new XStore(initState)
/** @type {initState} */
const state = store.state;


// 在复用的非容器组件中，可以很好的体现用 imState 更新方法的便捷性
// 如果用 “把动作提交给父级组件” 的模式，代码会变得复杂很多
// onClick={() => store.set(state.value, state.value + 1)
// store.update(state.value, v => v + 1 )
class UnitElement extends Component {

    render() {
        /** @type {initState} */
        let state = this.props.state;

        return (
            <div className="element-block">
                <div className="element-circle" onClick={() => store.set(state.value, state.value + 1) }>{state.value}</div>
            </div>
        )
    }
}

class UnitElement_Pure extends PureComponent {

    render() {
        /** @type {initState} */
        let state = this.props.state;

        return (
            <div className="element-block">
                <div className="element-circle" onClick={() => store.update(state.value, v => v + 1 ) }>{state.value}</div>
            </div>
        )
    }
}

class Pack0 extends Component {

    render() {
        /** @type {initState} */
        let state = this.props.state;

        return (
            <div className="element-block">
                <UnitElement state={state.children[0]}/>
                <UnitElement state={state.children[1]}/>
                <div className="element-circle" onClick={() => store.set(state.value, state.value + 1)}>{state.value}</div>
            </div>
        )
    }
}

class Pack0_Pure extends PureComponent {

    render() {
        /** @type {initState} */
        let state = this.props.state;

        return (
            <div className="element-block">
                <UnitElement_Pure state={state.children[0]}/>
                <UnitElement_Pure state={state.children[1]}/>
                <div className="element-circle" onClick={() => store.set(state.value, state.value + 1)}>{state.value}</div>
            </div>
        )
    }
}

class Pack1 extends Component {

    render() {
        /** @type {initState} */
        let state = this.props.state;

        return (
            <div className="element-block">
                <div>React.Component</div>
                <Pack0 state={state.children[0]}/>
                <Pack0 state={state.children[1]}/>
                <div className="element-circle" onClick={() => store.set(state.value, state.value + 1)} >{state.value}</div>
            </div>
        )
    }
}

class Pack1_Pure extends PureComponent {

    render() {
        /** @type {initState} */
        let state = this.props.state;

        return (
            <div className="element-block">
                <div>React.PureComponent</div>
                <Pack0_Pure state={state.children[0]}/>
                <Pack0_Pure state={state.children[1]}/>
                <div className="element-circle" onClick={() => store.set(state.value, state.value + 1)} >{state.value}</div>
            </div>
        )
    }
}

class RenderMonitor extends Component {

    render() {
        /** @type {initState} */
        let state = this.props.state;

        return (
            <div className="RenderMonitor">
                <div>点击蓝色按钮，其数值会增加1。</div>
                <div>打开 chrome 的 react 插件，勾选 Highlight Updates， 可以查看组件重新渲染的情况。</div>
                <Pack1 state={state.line0}/>
                <Pack1_Pure state={state.line1}/>
            </div>
        )
    }
}


export default makeOnlyContainer(RenderMonitor, store)