import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'


const cache = new InMemoryCache()

const client  = new ApolloClient({
  uri:"https://music-o-pedia.herokuapp.com",
  cache
})

ReactDOM.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

