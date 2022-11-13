import React from 'react';
import { useQuery } from '@apollo/client';
import {QUERY_REVIEWS, QUERY_ME_BASIC} from 'src/utils/queries';
import Auth from 'src/utils/auth';

const Home = ()=>{
    //useQuery hook to make request.
    const{ loading, data}= useQuery(QUERY_REVIEWS)
    //destructure from useQuery hook's response, and rename it userData.
    const {data: userData} = useQuery(QUERY_ME_BASIC)

    const loggedIn=Auth.loggedIn();
}