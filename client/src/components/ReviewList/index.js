import React from 'react';
import { Link } from 'react-router-dom';

const ReviewList=({reviews, title})=>{
    //if no reviews, throw a message.
    if(!reviews.length){
        return <h3>No Reviews Yet</h3>
    }
    return(
        <div>
            <h3>{title}</h3>
            {/* loops through reviews and renders them */}
            {reviews &&
             reviews.map(review=>{
                <div key={review._id}>
                    <p>
                        <Link 
                            to={`profile/${review.username}`}
                        >
                        {review.username}
                        </Link>
                    </p>
                </div>
             })

            }
        </div>
    )   
}

export default ReviewList;