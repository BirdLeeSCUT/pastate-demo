import { createStore } from 'pastate';

const initState = {
    /** @type {'student' | 'class'} */
    selected: 'student'
}

/**** MOCK AREA ****/
// initState.selected = 'class'

const actions = {
    /** @param {'student' | 'class'} tab */
    selectTab(tab){
        state.selected = tab
    }
}

const store = createStore({
    name: 'Navigator',
    initState,
    actions
})
const { state } = store
export { initState, actions, store }