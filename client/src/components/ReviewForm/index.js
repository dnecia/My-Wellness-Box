import React, {useState} from'react';
import {useMutation} from '@apollo/client';
import {ADD_REVIEW} from '../../utils/mutations'
import { QUERY_REVIEWS, QUERY_ME} from '../../utils/queries'

const ReviewForm=()=>{
    //sets initial state of text to an empty string.
    const[reviewText, setText] =useState('');
    //sets initial state of of characterCount to 0
    const[characterCount, setCharcterCount] = useState(0);

    const [addReview, {error}] = useMutation(ADD_REVIEW,{
        
    });

}

export default ReviewForm