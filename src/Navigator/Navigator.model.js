import { createStore } from 'pastate';

const initState = {

}

const actions = {

}

const store = createStore({
    name: 'Navigator',
    initState,
    actions
})
const { state } = store
export { initState, actions, store }