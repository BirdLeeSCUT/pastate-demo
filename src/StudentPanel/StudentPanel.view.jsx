import React from 'react'
import { makeContainer, Input, Select} from 'pastate'
import { store, initState, actions } from './StudentPanel.model'
import { Route, NavLink, withRouter, Redirect, Switch } from 'react-router-dom'
import './StudentPanel.css'

const isBoyOptions = [{
    value: true,
    tag: '男'
},{
    value: false,
    tag: '女'
}]

class StudentPanel extends React.PureComponent {

    componentDidMount(){
        actions.init()
    }

    render() {
        let state = this.props.state
        return (
            <div className="info-panel">
                {this['view_' + state.status](state)}
            </div>
        )
    }

    view_loading() {
        return (
            <div className="info-panel-tip-loading">
                加载中...
            </div>
        )
    }

    view_error() {
        return (
            <div className="info-panel-tip-error">
                加载失败, 请刷新重试
            </div>
        )
    }

    /** @param {initState} state */
    view_ok(state) {
        if (state.students.length == 0) {
            return (
                <div className="info-panel-tip-info">
                    没有学生
                </div>
            )
        }
        
        // let selected = this.props.match.params.id;
        let selected = state.selected;

        let selectedStudent = state.students[selected];

        return (
            <div className="info-panel-ok">
                <div className="info-panel-list">
                    {state.students.map((student, index) => (
                        <div 
                            key={index} 
                            className={"info-panel-list-item" + (selected == index ? " active" : "")}
                            onClick={() => actions.selectStudent(index)}
                            >
                            {student.name}
                        </div>
                    ))}
                </div>
                <div className="info-panel-detail">
                    {state.isEditting == true ?
                        <div className="info-panel-editting">
                            <div className="info-panel-detail-name">
                                {selectedStudent.name}
                            </div>
                            <div className="info-panel-detail-item">
                                姓名：<Input value={selectedStudent.name} className='input-text'/>
                            </div>
                            <div className="info-panel-detail-item">
                                学号：<Input value={selectedStudent.studentNumber} className='input-text'/>
                            </div>
                            <div className="info-panel-detail-item">
                                年龄：
                                <button 
                                    className="info-panel-detail-btn btn-change-age" 
                                    onClick={actions.decreaseAge}
                                >
                                    -
                                </button>
                                <Input value={selectedStudent.age} type="number" className='input-text input-age' />
                                <button 
                                    className="info-panel-detail-btn btn-change-age" 
                                    onClick={actions.increaseAge}
                                >
                                    +
                                </button>
                            </div>
                            <div className="info-panel-detail-item">
                                性别：<Select 
                                        value={selectedStudent.isBoy} 
                                        options={isBoyOptions} 
                                        className='input-is-boy'
                                    />
                            </div>
                            <div className="info-panel-detail-item">
                                简介：<Input value={selectedStudent.introduction} className='input-text'/>
                            </div>
                            <div className="info-panel-detail-btn-div">
                                <button className="info-panel-detail-btn" onClick={actions.switchEditting}>
                                    确定
                                </button>
                            </div>
                        </div>
                        :
                        <div className="info-panel-display">
                            <div className="info-panel-detail-name">
                                {selectedStudent.name}
                            </div>
                            <div className="info-panel-detail-item">
                                学号：{selectedStudent.studentNumber}
                            </div>
                            <div className="info-panel-detail-item">
                                年龄：{selectedStudent.age}
                            </div>
                            <div className="info-panel-detail-item">
                                性别：{selectedStudent.isBoy == true ? '男' : '女'}
                            </div>
                            <div className="info-panel-detail-item">
                                简介：{selectedStudent.introduction}
                            </div>
                            <div className="info-panel-detail-btn-div">
                                <button className="info-panel-detail-btn btn-bootom" onClick={actions.switchEditting}>
                                    修改
                                </button>
                                <button className="info-panel-detail-btn btn-bootom" onClick={actions.deleteSelectedStudent}>
                                    删除
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default makeContainer(StudentPanel, 'student')