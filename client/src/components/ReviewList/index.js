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
                        <span> created on {review.createdAt}</span>
                    </p>
                    <div>
                        <Link to={`/review/${review._id}`}>
                            <p>{review.reviewText}</p>
                            <p>
                                comments: {review.commentCount} || click to { ' '}
                                {review.commentCount ? 'see': 'start'} the discussion!
                            </p>
                        </Link>
                    </div>
                </div>
             })

            }
        </div>
    )   
};

export default ReviewList;