export interface Movie {
    isOpen: boolean;
    onClose: () => void;
    trailerUrl: string;
    title: string;
    rating: string;
    genre: number;
    cast: string;
    director: string;
    descr: string;
    imageUrl: string; // Change property name to imageUrl
    producer: string;
    reviews: string;
    shows: Show[];
  }
  

interface Show {
    showId: number;
    showroom: Showroom;
    date: string;
    time: string;
}

interface Showroom {
    capacity: number;
    showroomId: number;
}

const MovieInfo: React.FC<Movie> = ({ isOpen, onClose, trailerUrl, title, rating, genre, cast, director, descr, imageUrl, producer, reviews, shows}) => {
    
    // Creates url string with movie info
    const handleBookClick = () => {
        const queryString = `?title=${encodeURIComponent(title)}&imageUrl=${encodeURIComponent(imageUrl)}&show1Date=${encodeURIComponent(shows[0].date)}&show2Date=${encodeURIComponent(shows[1].date)}
                            &show3Date=${encodeURIComponent(shows[2].date)}&show1Time=${encodeURIComponent(shows[0].time)}&show2Time=${encodeURIComponent(shows[1].time)}&show3Time=${encodeURIComponent(shows[2].time)}
                            &show1ShowId=${encodeURIComponent(shows[0].showId)}&show2ShowId=${encodeURIComponent(shows[1].showId)}&show3ShowId=${encodeURIComponent(shows[2].showId)}
                            &show1ShowRoom=${encodeURIComponent(shows[0].showroom.showroomId)}&show2ShowRoomId=${encodeURIComponent(shows[1].showroom.showroomId)}&show3ShowRoomId=${encodeURIComponent(shows[2].showroomId)}`;
        window.location.href = `/select-show-time${queryString}`;
        onClose(); // Close the modal after navigating to the booking page
    };

    var movie_genre = null;

    // Gets genre according to genre id
    if (genre == 1) {
        movie_genre = "Comedy"
    }

    if (genre == 2) {
        movie_genre = "Drama"
    }

    if (genre == 3) {
        movie_genre = "Action"
    }

    if (genre == 4) {
        movie_genre = "Romance"
    }

    if (genre == 5) {
        movie_genre = "Adventure"
    }

    if (!isOpen) return null;

    return (
        <div>
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
            onClick={onClose}>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '70%',
                height: '60%',
                borderRadius: '25px'
                
            }} onClick={e => e.stopPropagation()} // Prevent click inside the modal from closing it
            >

                <iframe
                src={trailerUrl}
                frameBorder="0"
                title="Movie Trailer"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                    width: '60%',
                    height: '85%',
                    padding: '40px'
                }}
                ></iframe>

                <div >
                    <h2 className="descr">{title}</h2>
                    <h4 className="descr">Rated {rating}</h4>
                    <h4 className="descr">Director: {director}</h4>
                    <h4 className="descr">Producer: {producer}</h4>
                    <h4 className="descr">Cast: {cast}</h4>
                    <h4 className="descr">Sypnosis: {descr}</h4>
                    <h4 className="descr">Reviews: {reviews}</h4>

                    <div className="select-time block">
                        <button className="left-button block" onClick={handleBookClick}>Click to Book Movie</button>
                    </div>
                </div>
            </div>
        </div>    
    </div>
  );
};

export default MovieInfo;
