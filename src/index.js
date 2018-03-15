import React from 'react';
import ReactDOM from 'react-dom';
import { makeApp, combineStores } from 'pastate';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';

import * as StudentPanel from './StudentPanel';
import * as Navigator from './Navigator';
import * as ClassPanel from './ClassPanel';

const rootStore = {
    nav: Navigator.store,
    student: StudentPanel.store,
    class: ClassPanel.store
}

ReactDOM.render(
    makeApp(<Navigator.view />, rootStore),
    document.getElementById('root')
);

registerServiceWorker();
