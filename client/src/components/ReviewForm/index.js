import React, {useState} from'react';
import {useMutation} from '@apollo/client';
import {ADD_REVIEW} from '../../utils/mutations'
import { QUERY_REVIEWS, QUERY_ME} from '../../utils/queries'

const ReviewForm=()=>{
    //sets initial state of text to an empty string.
    const[reviewText, setText] =useState('');
    //sets initial state of of characterCount to 0
    const[characterCount, setCharacterCount] = useState(0);

    const [addReview, {error}] = useMutation(ADD_REVIEW,{
        update(cache, {data: {addReview}}){
            //review data might not be there yet.
            try{
                //update me array's cache.
                const {me} = cache.readQuery({ query: QUERY_ME});
                cache.writeQuery({
                    query: QUERY_ME,
                    data:{me: {...me, reviews: [...me.reviews,addReview]}}
                })
            } catch (e){
                console.warn("first review by user!")
            }
            //read what's in cache.
            const {reviews}=cache.readQuery({ query: QUERY_REVIEWS});

            //prepend the newest review to the front of array.
            cache.writeQuery({
                query: QUERY_REVIEWS,
                data: {reviews: [addReview,...reviews]}

            })
        }
    });
    
    //changes character count state, it also sets text state to whatever is written in field.
    const handleChange = event =>{
        if(event.target.value.length<=300){
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }
    //submits data in the form. and also clears fields.
    const handleFormSubmit = async event =>{
        event.preventDefault();

        try{
            await addReview({
                variables:{reviewText}
            })
        } catch (e){
            console.log(e)
        }
    }
    
    return(
        <div>
            <form onSubmit={handleFormSubmit}>
            <textarea
                placeholder="Write a review here"
                value={reviewText}
                onChange={handleChange}
            ></textarea>
            <p className={`${characterCount === 300 || error ? 'text-error': ''}`}>
                character count: {characterCount}/300
                {error && <span>something went wrong</span>}
            </p>
            <button type="submit">
                submit!
            </button>
            </form>
        </div>
    )

}

export default ReviewForm