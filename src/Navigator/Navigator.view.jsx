import React from 'react';
import { makeContainer, makeCacheable } from 'pastate';
import { initState, actions } from './Navigator.model';
import { Route, NavLink, withRouter, Redirect, Switch } from 'react-router-dom'
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
                        <NavLink 
                            className="nav-item"
                            activeClassName="nav-item-active"
                            to="/student"
                        >
                            学生({this.props.count.student})
                        </NavLink>
                        <NavLink 
                            className="nav-item"
                            activeClassName="nav-item-active"
                            to="/class"
                        >
                            课程({this.props.count.class})
                        </NavLink>
                    </div>
                </div>
                <div className="main-panel">
                    <Switch>
                        <Redirect exact from='/' to='/student'/>
                        <Route path="/student" component={StudentPanel.view}/>
                        <Route path="/class" component={ClassPanel.view}/>
                    </Switch>
                </div>
            </div>
        )
    }
}


// export default withRouter(makeContainer(Navigator, state => ({
//     state: state.nav,
//     studentsCount: state.student.students.length,
//     classesCount: state.class.classes.length
// })))

const getCount = makeCacheable((studentLength, classLength) => ({
    student: studentLength,
    class: classLength
}))

// export default withRouter(makeContainer(Navigator, state => ({
//     state: state.nav,
//     count: {
//         student: state.student.students.length,
//         class: state.class.classes.length
//     }
// })))

export default withRouter(makeContainer(Navigator, state => ({
    state: state.nav,
    count: getCount(
        state.student.students.length, 
        state.class.classes.length
    )
})))