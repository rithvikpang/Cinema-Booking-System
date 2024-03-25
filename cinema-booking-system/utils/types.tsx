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
  }
  