"use client"

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure CSS is imported

export default function Home() {
    
    const initialFormData = {
        title: '',
        description: '',
        duration: '',
        release_date: '',
        genre: '',
        rating: '',
        category: '',
        cast: '',
        director: '',
        movie_image: '',
        movie_trailer: '',
        producer: '',
        reviews: ''
    };
    
    const [formData, setFormData] = useState(initialFormData);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/unauth-page'); // Redirect to login using Next.js router
        }
    }, [router]);

    const handleBack = () => {
        router.push('/manage-movies');  // Use `router.back()` to go back in history
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/api/admin/add-movie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    genre: parseInt(formData.genre),
                    duration: parseInt(formData.duration),
                })
            });
    
            const responseText = await response.text();
            if (response.ok) {
                // Assume the response is a success message
                toast.success(responseText || 'Movie added successfully');
                setFormData(initialFormData);
            } else {
                // Assume the response is an error message
                toast.error(`Error adding movie: ${responseText}`);
            }
        } catch (error) {
            console.error("An error occurred:", error);
            toast.error('Error adding movie. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <form className="container" onSubmit={handleSubmit}>
            <h1>Add Movie</h1> 
            <div className="movie-name block">
                <label htmlFor="frm-movie">Movie Name</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="category block">
                <label htmlFor="frm-category">Category</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="genre block">
                <label htmlFor="frm-genre">Genre</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="cast block">
                <label htmlFor="frm-cast">Cast</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="cast"
                    value={formData.cast}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="director block">
                <label htmlFor="frm-cast">Director</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="producer block">
                <label htmlFor="frm-cast">Producer</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="producer"
                    value={formData.producer}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="reviews block">
                <label htmlFor="frm-cast">Reviews</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="reviews"
                    value={formData.reviews}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="summary block">
                <label htmlFor="frm-description">Description</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div> 
            <div className="duration block">
                <label htmlFor="frm-duration">Duration</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="rating block">
                <label htmlFor="frm-rating">Rating</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="rating block">
                <label htmlFor="frm-rating">Release Date</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="release_date"
                    value={formData.release_date}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="release-date block">
                <label htmlFor="frm-release-date">Movie Image</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="movie_image"
                    value={formData.movie_image}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <div className="movie-trailer block">
                <label htmlFor="frm-trailer">Trailer Link</label>
                <input
                    id="frm-movie"
                    type="text"
                    name="movie_trailer"
                    value={formData.movie_trailer}
                    onChange={handleChange}
                    autoComplete="movie-name"
                    required
                />
            </div>
            <button type="submit" className='seats' disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button type="submit" className="seats" onClick={handleBack}>
                Back
            </button>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true}
            newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </form>
    )
}