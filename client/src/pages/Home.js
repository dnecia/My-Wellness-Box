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
          <div>
          <h1 class="center">Restaurant Reviews</h1>
          </div>
          
          
          
        
     </main>
    );
};

export default Home;
