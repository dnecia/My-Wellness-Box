import React from 'react';
import { useQuery } from '@apollo/client';
import {QUERY_REVIEWS, QUERY_ME_BASIC} from '../utils/queries';
import ReviewList from '../components/ReviewList';
import FriendList from '../components/FriendList'
import Auth from '../utils/auth';
import ReviewForm from '../components/ReviewForm';


const Home = ()=>{
    //useQuery hook to make request.
    const{ loading, data}= useQuery(QUERY_REVIEWS)
    //destructure from useQuery hook's response, and rename it userData.
    const {data: userData} = useQuery(QUERY_ME_BASIC)

    const reviews= data?.reviews || [];
    console.log(reviews);

    const loggedIn=Auth.loggedIn();
    
    return(
        <main>
          <center>
          <h5>Restaurant Reviews</h5>
          <h1>Finding a new restauarnt just got easier </h1>
          </center>
          
          
          
        
     </main>
    );
};

export default Home;
