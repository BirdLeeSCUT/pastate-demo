import { Pastore, logActions } from 'pastate'

const initState = {
    /** @type { "loading" | "ok" | "error" } */
    status: 'loading', // 加载状态
    isEditting: false, // 是否在编辑中
    selected: 0, // 选中的学生
    /** @type {studentType[]} */
    students: [] // 学生数组
}

const studentType = {
    name: '张小明',
    studentNumber: '2018123265323',
    age: 22,
    isBoy: true,
    introduction: '我是简介'
}

/***** MOCK AREA *****/
initState.status = 'ok'
// initState.isEditting = true
initState.students = [studentType, studentType]
initState.selected = 0


const actions = {
    switchEditting(){
        state.isEditting = !state.isEditting
    },
    selectStudent(index){
        state.selected = index
    },
    increaseAge(){
        state.students[state.selected].age += 1
    },
    decreaseAge(){
        state.students[state.selected].age -= 1
    }
}

/** @type {Pastore<initState>} */
const store = new Pastore(initState);
let state = store.state;
store.actions = actions;

// 在需要调试时开启即可
// store.actionMiddlewares = [logActions()]

export {store, actions, initState}