import React from 'react';
import { Link } from 'react-router-dom';

const ReviewList=({reviews, title})=>{
    //if no reviews, throw a message.
    if(!reviews.length){
        return <h3>No Reviews Yet</h3>
    }
    return(
        <div>
        </div>
    )   
}

export default ReviewList;