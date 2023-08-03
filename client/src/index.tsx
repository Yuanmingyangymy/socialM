import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import { AuthModeContextProvider } from './context/authContext';
import { PostSetContextProvider } from './context/PostsContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <AuthModeContextProvider>
        <PostSetContextProvider>
          <App />
        </PostSetContextProvider>
      </AuthModeContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

