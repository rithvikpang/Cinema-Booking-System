import React from 'react';
import LeftThirdContent from '../../../components/LeftThirdContent';


export default function Home() {
    return (
        <form className="container">
            <h1>Edit Movies</h1> 
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className='combobox'> 
                    <button className="seats">Select Movie</button>
                    <ul className='dropdown'>
                        <li>Wonka</li>
                        <li>Dune: Part Two</li>
                        <li>Oppenheimer</li>
                    </ul>
                </div>
                <div className="edit-movie-button">
                    <button className="seats">Add Movie</button>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img src="/wonka.jpg" alt="movie poster" style={{width: '200px', height: '250px'}}/>
            </div>
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
            <div className="save-button block">
                <button className="save-button block">Save</button>
            </div>
            
        </form>
    )
}

/*
export default function Home() {
    return (
        <form className="container">
            <div className = 'leftThirdContent'>
                <div className="combobox">
                    <input type="text" placeholder="Select Movie to Edit"/>
                    <ul className="dropdown">
                        <li>Wonka</li>
                        <li>Dune: Part Two</li>
                        <li>Oppenheimer</li>
                    </ul>
                </div>
                <div className="add button">
                    <button type="submit">Add</button>
                </div>
            </div>
        </form>
    )

}
*/

/*
const Home = () => {
    return (
      <div className="grid-container">
        <LeftThirdContent>
          
            <div className = 'leftThirdContent'>
                <div className="combobox">
                    <input type="text" placeholder="Select Movie to Edit"/>
                    <ul className="dropdown">
                        <li>Wonka</li>
                        <li>Dune: Part Two</li>
                        <li>Oppenheimer</li>
                    </ul>
                </div>
                <div className="add button">
                    <button type="submit">Add</button>
                </div>
            </div>
        </LeftThirdContent>
      </div>
    );
  };
  
  export default Home;
  */