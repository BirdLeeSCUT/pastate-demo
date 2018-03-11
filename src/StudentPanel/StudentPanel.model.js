import { Pastore, logActions } from 'pastate'
import axios from 'axios'

const initState = {
    initialized: false,
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
    init(){
        if(!state.initialized){
            state.initialized = true
            // actions.loadStudents()
        }
    },
    loadStudents(){
        state.status = 'loading'
        axios.get('/mocks/getStudents.json')
            .then(res => {
                if(res.data.result == 'ok'){
                    state.status = 'ok'
                    state.selected = 0
                    state.students = res.data.students;
                }else{
                    throw new Error()
                }
            })
            .catch(() => {
                state.status = 'error'
            })
    },
    switchEditting(){
        state.isEditting = !state.isEditting
    },
    selectStudent(index){
        state.selected = index
        state.isEditting && (state.isEditting = false)
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
store.name = 'StudentPanel';
store.actions = actions;

// 在需要调试时开启即可
// store.actionMiddlewares = [logActions()]

export {store, actions, initState}