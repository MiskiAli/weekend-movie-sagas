import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";


function Details(){
    const dispatch = useDispatch();
    const history = useHistory()
    const details = useSelector(store => store.movieDeets)
    const { id } = useParams()


    useEffect(()=> {
        dispatch({
            type: 'FETCH_MOVIE_DETAILS',
            payload: id
        })
    },[])


const homePage = ()=>{
    history.push('/')
}

return(
    <div>
            <h2>Movie view</h2>
            <ul>
                {details.genres && details.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
                {/* <div key={fetchAllDetails.id}> */}
            <h3>{details.title}'s details</h3>
            <img src={details.poster} alt = {details.title} />
            <p>{details.description}</p>
            <button type="submit" onClick={homePage}>Home page</button>
        </div>
)
}


export default Details;



