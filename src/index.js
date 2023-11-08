import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AppThemeProvider from './styles/AppThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './utils/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Provider store={store}>
      <AppThemeProvider>
        <CssBaseline />
        <App />
      </AppThemeProvider>
    </Provider>
  </LocalizationProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
