
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './component/Styles/GlobalStyles';
import ResponsiveStyles from './component/Styles/ResponsiveStyles';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
    document.getElementById('root')
);

root.render(
    <React.StrictMode>
        <BrowserRouter
            future={{
                v7_startTransition: true,
            }}
        >
            <GlobalStyles>
                <ResponsiveStyles>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </ResponsiveStyles>
            </GlobalStyles>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
