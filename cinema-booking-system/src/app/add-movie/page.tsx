import React from 'react';
import LeftThirdContent from '../../../components/LeftThirdContent';


export default function Home() {
    return (
        <form className="container">
            <h1>Add Movie</h1> 
            <div className="movie-name block">
                <label htmlFor="frm-movie">Movie Name</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="movie-name"
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="category block">
                <label htmlFor="frm-category">Category</label>
                <input
                    id="frm-category"
                    type="text"
                    name="category"
                    autoComplete="category"
                    required
                />
            </div>
            <div className="genre block">
                <label htmlFor="frm-genre">Genre</label>
                <input
                    id="frm-genre"
                    type="text"
                    name="genre"
                    autoComplete="genre"
                    required
                />
            </div>
            <div className="cast block">
                <label htmlFor="frm-cast">Cast</label>
                <input
                    id="frm-cast"
                    type="text"
                    name="cast"
                    autoComplete="cast"
                    required
                />
            </div>
            <div className="director block">
                <label htmlFor="frm-cast">Director</label>
                <input
                    id="frm-director"
                    type="text"
                    name="director"
                    autoComplete="director"
                    required
                />
            </div>
            <div className="summary block">
                <label htmlFor="frm-description">Description</label>
                <input
                    id="frm-description"
                    type="text"
                    name="description"
                    autoComplete="description"
                    required
                />
            </div> 
            <div className="duration block">
                <label htmlFor="frm-duration">Duration</label>
                <input
                    id="frm-duration"
                    type="text"
                    name="duration"
                    autoComplete="duration"
                    required
                />
            </div>
            <div className="rating block">
                <label htmlFor="frm-rating">Rating</label>
                <input
                    id="frm-rating"
                    type="text"
                    name="rating"
                    autoComplete="rating"
                    required
                />
            </div>
            <div className="movie-image block">
                <label htmlFor="frm-movieimage">Movie Poster</label>
                <input
                    id="frm-movieimage"
                    type="text"
                    name="movieimage"
                    autoComplete="movieimage"
                    required
                />
            </div>
            <div className="movie-trailer block">
                <label htmlFor="frm-trailer">Trailer Link</label>
                <input
                    id="frm-trailer"
                    type="text"
                    name="trailer"
                    autoComplete="trailer"
                    required
                />
            </div>
            <div>
                <button className='seats'>Save</button>
            </div>
            
        </form>
    )
}
