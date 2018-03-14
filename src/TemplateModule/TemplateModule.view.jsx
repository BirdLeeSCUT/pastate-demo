import React from 'react';
import { makeContainer } from 'pastate';
import './TemplateModule.css'

class TemplateModule extends React.PureComponent{
    render(){
        return (
            <div>
                TemplateModule
            </div>
        )
    }
}

export default makeContainer(TemplateModule, 'template')