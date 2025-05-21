import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import reportWebVitals from './reportWebVitals.js';
import { QuotesContextProvider } from './QuotesContextProvider.tsx';
import { QuoteIndexContextProvider } from './QuoteIndexContextProvider.tsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuotesContextProvider>
      <QuoteIndexContextProvider>
        <App />
      </QuoteIndexContextProvider>
    </QuotesContextProvider>
  </React.StrictMode >
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
