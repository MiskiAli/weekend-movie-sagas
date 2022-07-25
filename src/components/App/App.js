import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails';
import MoviePage from '../MoviePage/MoviePage';


function App() {
  return (
    <div className="App">
      <h1 className="AppHeader">The Movies Saga!</h1>
      <Router>        
        <Route path="/" exact>
        <MoviePage />
          <MovieList />
        </Route>
        {/* Details page */}
        <Route path="/Details" exact>
          <MovieDetails />
        </Route>
        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
