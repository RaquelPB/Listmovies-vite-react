import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import{ 
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsCameraReelsFill 
} from 'react-icons/bs'

import MovieCard from "../components/MovieCard";

import './Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;


const Movie = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  const getMovie = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovie(data);
  };

  const getTrailer = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    const trailer = data.results.find((result) => result.type === "Trailer");
    if (trailer) {
      setTrailerUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
    }
  };

  const formatCurrency = (nunber) => {
    return nunber.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    const trailerUrl = `${moviesURL}${id}/videos?${apiKey}`;

    getMovie(movieUrl);
    getTrailer(trailerUrl);
  }, []);
 
  return <div className="movie-page">
    {movie && <>
      <MovieCard movie={movie} showLink={false} />
      <p className="tagline">{movie.tagline}</p>
      <div className="info">
        <h3>
          <BsWallet2 /> Orçamento:
        </h3>
        <p>{formatCurrency(movie.budget)}</p>
      </div>

      <div className="info">
        <h3>
          <BsGraphUp /> Receita:
        </h3>
        <p>{formatCurrency(movie.revenue)}</p>
      </div>

      <div className="info">
        <h3>
          <BsHourglassSplit /> Duração:
        </h3>
        <p>{movie.runtime} minutos </p>
      </div>

      <div className="info description">
        <h3>
          <BsFillFileEarmarkTextFill /> Descrição:
        </h3>
        <p>{movie.overview}</p>
      </div>

    </>}

    {trailerUrl && (
      <div className="trailer">
        <h3>
          <BsCameraReelsFill /> Trailer:
        </h3>
        <iframe
          src={trailerUrl}
          title="Trailer"
          allowFullScreen
        ></iframe>
      </div>
    )}

  </div>;

};
  
export default Movie;