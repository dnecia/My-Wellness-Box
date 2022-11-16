import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
//connecting to the components 
import Header from './components/Header';
import Footer from './components/Footer';

//connecting to the pages 

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/profile';
import Signup from './pages/Signup';
import SingleReview from './pages/SingleReview';
import SearchReviews from './pages/SearchReviews';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); 
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
            <Route 
                path="/" 
                element={<Home />} 
              />
               <Route 
                path="/searchreviews" 
                element={<SearchReviews />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route 
                path="/profile" 
                element={<Profile />} 
              />
              <Route 
                path="/review/:id" 

                element={<SingleReview />} 
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App; 