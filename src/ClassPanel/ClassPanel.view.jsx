import React from 'react';
import { makeContainer } from 'pastate';
import { initState, actions } from './ClassPanel.model';
import './ClassPanel.css';

class ClassPanel extends React.PureComponent{

    render(){
        /** @type {initState} */
        const state = this.props.state;
        // 其他 status 略
        return (
            <div className="class-panel">
                {
                    state.classes.map((classObj, index) => (
                        <div className="class-item" key={index}>
                            <div className="class-name">{classObj.name}</div>
                            <div className="class-info">
                                <span className="class-info-item">{classObj.credit}学分</span>
                                <span className="class-info-item">{classObj.teacher}</span>
                                <span className="class-info-item">{classObj.isRequired ? '必修课':'选修课'}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default makeContainer(ClassPanel, 'class')