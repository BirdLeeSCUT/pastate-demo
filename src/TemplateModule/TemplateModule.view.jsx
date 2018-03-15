import React from 'react';
import { makeContainer } from 'pastate';
import { initState, actions } from './TemplateModule.model';
import './TemplateModule.css';

class TemplateModule extends React.PureComponent{
    render(){
        /** @type {initState} */
        const state = this.props.state;
        return (
            <div>
                TemplateModule
            </div>
        )
    }
}

export default makeContainer(TemplateModule, 'template')