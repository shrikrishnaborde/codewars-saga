export type Movie = {
  title: string;
  release_date: string;
  director: string;
  episode_id: string;
  producer: string;
  opening_crawl: string;
  rating?: number;
};

export type Rating = {
  Source: string;
  Value: string;
};
