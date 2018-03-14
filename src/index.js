import React from 'react';
import ReactDOM from 'react-dom';
import { makeApp } from 'pastate';
import registerServiceWorker from './registerServiceWorker';
import './index.css'

import * as StudentPanel from './StudentPanel';
// import * as Navigator from './Navigator'

const rootStore = {
    student: StudentPanel.store
}

ReactDOM.render(
    makeApp(<StudentPanel.view />, StudentPanel.store),
    document.getElementById('root')
);

registerServiceWorker();
