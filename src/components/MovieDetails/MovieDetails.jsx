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
            <h2 className="movieview">Movie view</h2>
            <div className="description">
                {details.genres && details.genres.map(genre => (
                <p key={genre.id}>{genre.name}</p>
                ))}
            </div>
            
            <h3 className="movieview" >{details.title}'s Details</h3>
            <img src={details.poster} alt = {details.title} />
            <p className="description" >{details.description}</p>
            <button className="button-64" role="button" type="submit" onClick={homePage}>Home page</button>
        </div>
)
}


export default Details;



