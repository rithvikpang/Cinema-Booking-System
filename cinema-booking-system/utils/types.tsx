export interface Movie {
    title: string;
    description: string;
    duration: number; // Assuming duration is in minutes
    release_date: string; // Or Date, if you want to convert the string to a Date object
    genre_id: number;
    rating: string;
    category: string;
    cast: string;
    director: string;
    image_url: string;
    trailer_url: string;
    producer: string
    reviews: string
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
