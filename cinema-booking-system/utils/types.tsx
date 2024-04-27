
export interface Movie {
    title: string;
    description: string;
    duration: number; // Assuming duration is in minutes
    releaseDate: string; // Or Date, if you want to convert the string to a Date object
    genre_id: number;
    rating: string;
    category: string;
    cast: string;
    director: string;
    imageUrl: string;
    trailerUrl: string;
    producer: string;
    reviews: string;
    movie_id: number;
    shows: Show[];
  }

export interface Show {
    show_id: number;
    date: string;
    time: string;
    duration: number;
}
  
 export interface FormData {
    firstname: string;
    lastname: string;
    age: string; // Assuming age is a string; adjust types as necessary
    email: string;
    password: string;
    confirmPassword: string;
    // Add any other fields as needed
}

export interface FormErrors {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    // Corresponding fields for errors
}
