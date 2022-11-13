import React from "react";
import { useParams } from "react-router-dom";

//importing the query
import {useQuery} from "@apollo/client";
import { QUERY_REVIEW } from "..utils/queries";

// import comment
import CommentList from "../components/CommentList";

//import comment form
import Auth from "../utils/auth";
import CommentForm from "../components/ReactionForm";

const SingleReview = (props) => {
    //get id from the url
    const { id: reviewId } = useParams();

    const { loading, data } =useQuery(QUERY_REVIEW, {
        variables: {id: reviewId }, 
    });

    const review = data?.review || {};
    if(loading) {
        return <div> Loading... </div>;
    }

    return (
        <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {review.username}
          </span>{" "}
          Review on {review.createdAt}
        </p>
        <div className="card-body">
          <p>{review.reviewText}</p>
        </div>
      </div>

      {review.commentCount > 0 && (
        <CommentList comments={review.comments} />
      )}

      {Auth.loggedIn() && <CommentForm reviewId={review._id} />}
    </div>

    )
}
