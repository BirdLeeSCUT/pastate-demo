import React, { PureComponent, Component } from 'react';
import { Pastore, makeOnlyContainer, Input, Checkbox, RadioGroup, Select, Bind, makeBindable } from 'pastate';

import Rate from 'antd/lib/rate';
import 'antd/lib/rate/style/css';

import AntdCheckbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/css';

const MyRate = makeBindable(Rate)
const MyAntdCheckbox = makeBindable(AntdCheckbox, 'checked')

const initState = {
    basicInfo: {
        name: 'Peter',
        isBoy: true,
        age: 10
    },
    address: {
        country: 'China',
        city: 'Guangzhou'
    },
    /** @type {[pet]} */
    pets: []
}
const pet = {
    id: 'id01',
    name: 'Kitty',
    age: 2
}

const nameOptions = ['Peter', 'Tom', 'Allen']

const nameOptionsChinese = [{
    value: 'Peter',
    tag: '彼得'
}, {
    value: 'Tom',
    tag: '汤姆'
}, {
    value: 'Allen',
    tag: '艾伦'
}]

const nameOptionsChinese_select = [{
    value: 'DEFAULT',
    tag: '请选择',
    disabled: true
},{
    value: 'Peter',
    tag: '彼得'
}, {
    value: 'Tom',
    tag: '汤姆'
}, {
    value: 'Allen',
    tag: '艾伦'
}]

const store = new Pastore(initState)
/** @type {initState} */
const state = store.state

class AppView extends PureComponent {
    render() {
        /** @type {initState} */
        let state = this.props.state;
        return (
            <div style={{ padding: 10, margin: 10, display: "inline-block" }}>
                <BasicInfoView state={state.basicInfo} />
                <AddressView state={state.address} />
                <PetsView state={state.pets} />
            </div>
        )
    }
}

class BasicInfoView extends PureComponent {

    increaseAge() {
        state.basicInfo.age += 1
    }

    decreaseAge() {
        state.basicInfo.age -= 1
    }

    onNameChange(e) {
        state.basicInfo.name = e.target.value
        store.sync()
    }

    onNameChange_uppercase(e) {
        state.basicInfo.name = e.target.value.toUpperCase()
        store.sync()
    }

    onNameChange_limitedLength(e) {
        if (e.target.value.length > 10) return;

        state.basicInfo.name = e.target.value
        store.sync()
    }

    onIsBoyChange(e) {
        state.basicInfo.isBoy = e.target.checked
    }

    handleTextBeforeChange(newValue, oldValue) {
        return newValue.toUpperCase()
    }

    render() {
        /** @type {initState['basicInfo']} */
        let state = this.props.state;
        return (
            <div style={{ padding: 10, margin: 10 }}>
                <div>
                    <strong>Basic info:</strong> <br />
                    My name is {state.name}. <br />
                    I am a {state.isBoy == true ? "boy" : "girl"}. <br />
                    I am {state.age} years old. <br />
                </div>
                <div>
                    <button onClick={this.decreaseAge}> decrease age </button>
                    <button onClick={this.increaseAge}> increase age </button>
                </div>
                <div>

                    Name: 
                    <Input
                        value={state.name}
                        useComposedValue={true}
                        type="text"
                    />
                    <br />

                    年龄(Bind): <Bind value={state.age} count={10} afterChange={v => console.log('b',v)}> <Rate /> </Bind> <br />
                    年龄(makeBindable)：<MyRate count={10} value={state.age} afterChange={v => console.log('a',v)}/> <br/>
                    
                    <br />

                    I am a boy:
                        <Checkbox value={state.isBoy} /> <MyAntdCheckbox value={state.isBoy}/> <br />
                    Choose a name:
                        <RadioGroup options={nameOptions} value={state.name} /> <br />
                    选择一个名字:
                        <RadioGroup options={nameOptionsChinese} value={state.name} /> <br />
                    Choose a name:
                        <Select options={nameOptions} value={state.name} /> <br />
                    选择一个名字:
                        <Select options={nameOptionsChinese_select} value={state.name} /> <br /><br /><br /><br />
                </div>
            </div>
        )
    }
}

class AddressView extends PureComponent {

    changeCity() {
        state.address.city += '!'
    }

    render() {
        /** @type {initState['address']} */
        let state = this.props.state;
        return (
            <div style={{ padding: 10, margin: 10 }}>
                <strong>Address:</strong><br />
                My country is {state.country}.<br />
                My city is {state.city}.<br />
                <button onClick={this.changeCity}> change city </button>
            </div>
        )
    }
}

class PetsView extends PureComponent {
    pushPet() {
        state.pets.push({
            id: Date.now() + '',
            name: 'Puppy',
            age: 1
        })
    }
    popPet() {
        state.pets.pop()
    }
    render() {
        /** @type {initState['pets']} */
        let state = this.props.state;
        return (
            <div style={{ padding: 10, margin: 10 }}>
                <div><strong>My pets:</strong></div>
                {state.map((pet, index) =>
                    <PetView
                        state={pet}
                        key={pet.id}
                    />
                )}
                <div>
                    <button onClick={this.pushPet}>push pet</button>
                    <button onClick={this.popPet}>pop pet</button>
                </div>
            </div>
        )
    }
}

class PetView extends PureComponent {
    addAge = () => {
        /** @type {initState['pets'][0]} */
        let state = store.getResponsiveState(this.props.state);
        state.age += 1
    }
    reduceAge = () => {
        /** @type {initState['pets'][0]} */
        let state = store.getResponsiveState(this.props.state);
        state.age -= 1
    }
    render() {
        /** @type {initState['pets'][0]} */
        let state = this.props.state;
        return (
            <div >
                <li> {state.name}:
                    <button onClick={this.reduceAge}> - </button>
                    {state.age}
                    <button onClick={this.addAge}> + </button>
                    years old.
                </li>
            </div>
        )
    }
}

// class Text extends PureComponent {

//     onChange = e => {
//         let store = this.props.value.__store__
//         if(!store){
//             throw new Error('[pastate] You can only give state node from this.props to pastate two-ways binding HOC component')
//             return
//         }
//         store.setSync(this.props.value, e.target.value)
//     }

//     render() {
//         let props = Object.assign( {
//             onChange: this.onChange,
//             type: "text" 
//         }, this.props);
//         return this.props.textarea == true ?
//             <textarea {...props} />
//             :
//             <input {...props} /> 
//     }
// }

// class Checkbox extends PureComponent {

//     onChange = e => {
//         let store = this.props.checked.__store__
//         if(!store){
//             throw new Error('[pastate] You can only give state node from this.props to pastate two-ways binding HOC component')
//             return
//         }
//         store.setSync(this.props.checked, e.target.checked)
//     }

//     render() {
//         let props = Object.assign( {
//             onChange: this.onChange,
//         }, this.props, {
//             checked: this.props.checked == true
//         });
//         return <input type="checkbox" {...props} />
//     }
// }

// class Radiobox extends PureComponent {

//     onChange = (e) => {
//         let store = this.props.value.__store__
//         if(!store){
//             throw new Error('[pastate] You can only give state node from this.props to pastate two-ways binding HOC component')
//             return
//         }
//         store.setSync(this.props.value, e.target.value)
//     }

//     render() {
//         return (
//             <span style={this.props.style} className={this.props.className} id={this.props.id}>
//                 {
//                     this.props.options.map((option, index) => 
//                     <span key={index} style={{marginRight: 6, display: this.props.vertical == true ? "block" : "inline-bock"}}>
//                         <input 
//                             type="radio"
//                             checked={this.props.value == option}
//                             value={option}
//                             onChange={this.onChange}
//                             {...this.props.radioProps}
//                             />
//                         {option}
//                     </span>)
//                 }
//             </span>
//         )
//     }
// }


export default makeOnlyContainer(AppView, store)