import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './component/Styles/GlobalStyles';
import ResponsiveStyles from './component/Styles/ResponsiveStyles';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StoreProvider } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId="178164329166-edcqs8fqm33egmvh578c8d3f5f225f7j.apps.googleusercontent.com">
            <GlobalStyles>
                <ResponsiveStyles>
                    <StoreProvider>
                        <App />
                    </StoreProvider>
                </ResponsiveStyles>
            </GlobalStyles>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
