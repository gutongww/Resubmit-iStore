import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {QueryClient, QueryClientProvider} from 'react-query';
import { ApolloProvider } from '@apollo/client';
import graphQLClient from './GraphQLClient';
import { BrowserRouter } from "react-router-dom";

const client = new QueryClient();


ReactDOM.render(
  <QueryClientProvider client = {client}>
  <ApolloProvider client={graphQLClient}>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </ApolloProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
