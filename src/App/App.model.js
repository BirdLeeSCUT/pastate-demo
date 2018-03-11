import { Pastore } from 'pastate';

// 定义 state 格式
const initState = {
    name: 'Peter',
    age: 10,
    isMale: true,
    /** @type {[pets_ele]} */
    pets: []
}
const pets_ele = {
    name: 'good',
    age: 2,
    isMale: true,
}

// 定义相关 actions 
const actions = {

    addOne(){
        state.name += '好'
        state.age += 1
    },

    pushPet(){
        state.pets.push({
            name: 'good',
            age: 10,
            isMale: false
        })
    },

    popPet(){
        state.pets.pop()
    }
}

const store = new Pastore(initState);
/** @type initState */
const state = store.rstate;
export { store, actions, initState }