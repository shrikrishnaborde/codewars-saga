export type Movie = {
  title: string;
  release_date: string;
  director: string;
  episode_id: string;
  opening_crawl: string;
  ratings?: {
    rtRating: number;
    imdbRating: number;
    metaRating: number;
  };
  averageRating: number;
  poster: string;
};

export type Rating = {
  Source: string;
  Value: string;
};
