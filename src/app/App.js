import { Global } from '@emotion/react';
import global from 'styles/global';
import Router from 'routes';
import { BrowserRouter } from 'react-router-dom';
function App() {
    return (
        <BrowserRouter>
            <Global styles={global} />
            <Router />
        </BrowserRouter>
    );
}

export default App;
