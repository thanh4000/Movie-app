import { useState, useEffect} from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';



const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=3ab395df'

const movie1 = {
    "Title": "End Game",
    "Year": "2018",
    "imdbID": "tt7879350",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjZiYmMxZjctZjRhZi00ZGY1LTk4YzYtOTY3MTdhMTE2OTU4XkEyXkFqcGdeQXVyNTAyMjE2Njc@._V1_SX300.jpg"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    //thêm 1 cái state nx
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
        console.log(movies);
    }

    useEffect(() => {
        searchMovies('End Game');
    }, []);

    return (
        <div className='app'>
            <h1>Movie Land</h1>

            <div className='search'>
                <input
                    placeholder='Search for movies'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt = 'search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0 ? 
                (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                    ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No Moive Found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;