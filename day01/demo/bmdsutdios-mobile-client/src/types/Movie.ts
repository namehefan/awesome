// src/types/Movie.ts
interface Movie {
  id: number,
  category_id: number,
  cover: string,
  description: string,
  duration: number,
  score: string,
  showingon: string,
  star_actor: string,
  title: string,
  type: string
}

export default Movie;