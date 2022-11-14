import React from 'react';
import { useQuery } from '@apollo/client';
import {QUERY_REVIEWS, QUERY_ME_BASIC} from '../src/utils/queries';
import ReviewList from '../src/components/ReviewList'
import Auth from '../src/utils/auth';
import ReviewForm from '../src/components/ReviewForm';

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
                {loggedIn &&(
                    <div>
                        <ReviewForm />
                    </div>
                )}
            </div>
            <div className={`${loggedIn}`}>
                    {
                        loading ? (
                            <div>
                                Loading...
                            </div>                        
                        ): (
                            <ReviewList  reviews={reviews} title="here are some reviews..."/>
                        )}
            </div>
            {/* insert friends list here once it's done. */}
        </main>
    )
}