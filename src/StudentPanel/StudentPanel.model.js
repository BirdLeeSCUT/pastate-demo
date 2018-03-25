import { Pastore, logActions, dispalyActionNamesInReduxTool, createStore } from 'pastate'
import axios from 'axios'

const initState = {
    initialized: false, // 初始化状态
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
// initState.status = 'ok'
// initState.isEditting = true
// initState.students = [studentType, studentType]
// initState.selected = 0

const actions = {
    init(){
        if(!state.initialized){
            state.initialized = true
            actions.loadStudents()
        }
    },
    loadStudents(){
        state.status = 'loading'
        axios.get('/pastate-demo/mocks/getStudents.json')
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
    /** @param {number} index 学生数组索引号 */
    selectStudent(index){
        state.selected = index
        state.isEditting && (state.isEditting = false)

        // **** 使用 react-router ****
        // console.log(history.location);
        // history.push(index+'')
        // history.push('/student/' + index)
        // history.goBack() // or .go(-1)

        // console.log(window.location)

    },
    increaseAge(){
        state.students[state.selected].age += 1
    },
    /** 减少年龄 */
    decreaseAge(){
        state.students[state.selected].age -= 1
    },
    deleteSelectedStudent(){
        if(state.selected == state.students.length - 1){
            state.selected = state.students.length - 2
        }
        state.students.splice(state.selected, 1)
    }
}

// /** @type {Pastore<initState>} */
// const store = new Pastore(initState);
// let state = store.state;
// store.name = 'StudentPanel';
// store.actions = actions;
// store.actionMiddlewares = [logActions(), dispalyActionNamesInReduxTool(true)]

const store = createStore({
    name: 'StudentPanel',
    initState: initState,
    actions: actions,
    middlewares: [logActions(), dispalyActionNamesInReduxTool()]
})

const { state } = store


export {store, actions, initState}