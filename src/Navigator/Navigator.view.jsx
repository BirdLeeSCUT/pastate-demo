import React from 'react';
import { makeContainer } from 'pastate';
import { initState, actions } from './Navigator.model';
import './Navigator.css';

import * as StudentPanel from '../StudentPanel';
import * as ClassPanel from '../ClassPanel';

class Navigator extends React.PureComponent{
    render(){
        /** @type {initState} */
        const state = this.props.state;

        return (
            <div>
                <div className="nav">
                    <div className="nav-title">班级信息管理系统</div>
                    <div className="nav-bar">
                        <span 
                            className={"nav-item" + (state.selected == 'student' ? " nav-item-active" : "" )}
                            onClick={() => actions.selectTab('student')}
                        >
                            学生({this.props.studentsCount})
                        </span>
                        <div 
                            className={"nav-item" + (state.selected == 'class' ? " nav-item-active" : "" )}
                            onClick={() => actions.selectTab('class')}
                        >
                            课程({this.props.classesCount})
                        </div>
                    </div>
                </div>
                <div className="main-panel">
                {
                    state.selected == 'student' ?
                        <StudentPanel.view />
                        :
                        <ClassPanel.view />
                }
                </div>
            </div>
        )
    }
}

export default makeContainer(Navigator, state => ({
    state: state.nav,
    studentsCount: state.student.students.length,
    classesCount: state.class.classes.length
}))