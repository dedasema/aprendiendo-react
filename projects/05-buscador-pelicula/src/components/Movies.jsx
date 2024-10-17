import PropTypes from "prop-types";

function ListOfMovies({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li key={movie.id} className="movie">
          <img src={movie.image} alt={movie.title} />
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
        </li>
      ))}
    </ul>
  );
}

function NoMoviesResults() {
  return (<p>No movies found</p>);
}

export function Movies({ movies }) {
  const hasMovies = movies?.length > 0;

  return(
    hasMovies 
    ? <ListOfMovies movies={movies} /> 
    : <NoMoviesResults />
  );
}

ListOfMovies.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
    })
  ),
};
