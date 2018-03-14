import React from 'react';
import { makeContainer } from 'pastate';
import './Navigator.css'

class Navigator extends React.PureComponent{
    render(){
        return (
            <div>
                Navigator
            </div>
        )
    }
}

export default makeContainer(Navigator, 'nav')