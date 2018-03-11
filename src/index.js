import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import container from './MyPastateApp';
import { view } from './InfoPanel';
import './index.css'

ReactDOM.render(view, document.getElementById('root'));

registerServiceWorker();
