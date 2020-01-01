/* eslint-disable camelcase */
const API_TOKEN = 'ee6e3cf39f198095ea7d2981eab7f9ba'

export interface INamedElement {
    id: number,
    name: string;
}

export interface IFilm {
    id: number;
    vote_average: number;
    title: string;
    poster_path: string;
    original_title : string;
    overview: string;
    release_date : string;
    backdrop_path: string;
    budget: number;
    vote_count: number;
    genres: INamedElement[];
    production_companies : INamedElement[];
}
export interface IResult<T> {
    page: number;
    total_results: number;
    total_pages: number;
    results: T[];
}

export function getFilmsFromApiWithSearchedText (text: string, page: number) : Promise<IResult<IFilm>> {
  const url = 'https://api.themoviedb.org/3/search/movie?api_key=' +
                    API_TOKEN +
                    '&language=fr&query=' + text +
                    '&page=' + page

  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export function getImageFromApi (name: string): string {
  return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi (id: number) : Promise<IFilm> {
  return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr')
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
