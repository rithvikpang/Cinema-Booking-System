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
        // Construct an array of show information strings
        const showInfoArray = shows.map((show, index) => {
            // Check if showroom and showroomId are defined before accessing them
            const showroomId = show.showroom ? show.showroom.showroomId : null;
            return `show${index + 1}Id=${encodeURIComponent(show.showId)}&show${index + 1}Date=${encodeURIComponent(show.date)}&show${index + 1}Time=${encodeURIComponent(show.time)}&show${index + 1}ShowroomId=${encodeURIComponent(showroomId)}`;
        });
    
        // Join the show information strings with '&'
        const showInfoQueryString = showInfoArray.join('&');
    
        // Construct the final query string with movie info and show info
        const queryString = `?title=${encodeURIComponent(title)}&imageUrl=${encodeURIComponent(imageUrl)}&${showInfoQueryString}`;
    
        // Redirect to the booking page with the constructed query string
        window.location.href = `/select-show-time${queryString}`;
    
        onClose(); // Close the modal after navigating to the booking page
    };
    
    
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
