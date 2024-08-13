import {HashRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import './index.css';
import App from './components/App/App';
import {store} from "./services/store";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <HashRouter>
            <DndProvider backend={HTML5Backend}>
                <App/>
            </DndProvider>
        </HashRouter>
    </Provider>
);

reportWebVitals();
