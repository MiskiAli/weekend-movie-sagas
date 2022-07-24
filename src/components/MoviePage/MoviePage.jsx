import React, { useEffect } from 'react';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function MoviePage(){
    const dispatch = useDispatch();
    const history = useHistory()
    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [poster, setPoster] = useState('')

    const getMovie = event =>{
        event.preventDefault();
        dispatch({
            type: 'ADD_MOVIE',    // fix this !!
            payload: { title: title, description: description, poster: poster}
        })
    }

    return(
        <>
        <div>
            <h2> Add Movies Here </h2>
            
        </div>
        </>
    )
}

export default MoviePage;