import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieDetails from '../MovieDetails/MovieDetails';
import './MovieList.css'
import { useHistory, useParams} from "react-router-dom";

function MovieList() {

    const history = useHistory()
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    // const params = useParams()

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

const handleSubmit = (id) => {
    console.log('poster is clicked', id);
    const details = id 
    dispatch({
        type: 'FETCH_MOVIE_DETAILS',
        payload: details,
    })
    history.push('/Details')
}


    return (
        <main className='movieSaga'>
            <h1 className='movieHead' >MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return(
                        <div className='div' onClick = {()=>handleSubmit(movie.id)} key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;