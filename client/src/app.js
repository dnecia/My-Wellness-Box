import React from 'react';
import { BRowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
//connecting to the components 
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import SingleReview from './components/SingleReview'

//connecting to the pages 

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import SingleReview from './pages/SingleReview';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default App; 