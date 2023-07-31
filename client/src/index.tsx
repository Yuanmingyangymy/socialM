import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthModeContextProvider } from './context/authContext';
import { StateContextProvider } from './context/stateChange';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthModeContextProvider>
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </AuthModeContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

