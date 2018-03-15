import { createStore } from 'pastate';

const initState = {
    /** @type { "loading" | "ok" | "error" } */
    status: 'loading', // 加载状态
    /** @type {classType[]} */
    classes: []
}

const classType = {
    id: 'class01',
    name: '高等数学',
    credit: 4,
    teacher: '李老师',
    isRequired: true
}

/**** MOCK AREA *****/
initState.status = 'ok'
initState.classes = [classType]

const actions = {

}

const store = createStore({
    name: 'ClassPanel',
    initState,
    actions
})
const { state } = store
export { initState, actions, store }