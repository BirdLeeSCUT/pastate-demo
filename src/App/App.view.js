import React, { Component } from 'react';
import { makeContainer } from 'pastate';
import { actions, initState } from './App.model';

class App extends Component {
  render() {
    /** @type initState */
    let state = this.props.state;

    return (
      <div className="App">
        {state.name}<br/>
        {state.pets.map((pet,index) => <div key={index}> {pet.name} {index} </div> )}
        <button onClick={actions.addOne}>加一</button>
        <button onClick={actions.pushPet}>加宠物</button>
        <button onClick={actions.popPet}>减宠物</button>
      </div>
    )
  }
}

export default makeContainer(App, 'app')