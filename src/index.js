import React from 'react';
import ReactDOM from 'react-dom';
import { makeApp, combineStores } from 'pastate';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import * as StudentPanel from './StudentPanel';
import * as Navigator from './Navigator';
import * as ClassPanel from './ClassPanel';

const storeTree = {
    nav: Navigator.store,
    student: StudentPanel.store,
    class: ClassPanel.store
}

ReactDOM.render(
    makeApp(
        <BrowserRouter basename="/pastate-demo">
            <Navigator.view />
        </BrowserRouter>,
        storeTree
    ),
    document.getElementById('root')
);

registerServiceWorker();
