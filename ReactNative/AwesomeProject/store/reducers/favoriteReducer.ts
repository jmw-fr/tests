
import { IFavoriteState, FavoriteActionTypes, TOGGLE_FAVORITE } from "./favoriteTypes";

const initialState: IFavoriteState = { favoritesFilm: [] }

export default function toggleFavorite(state: IFavoriteState = initialState, action: FavoriteActionTypes): IFavoriteState {
    let nextState
    switch (action.type) {
        case TOGGLE_FAVORITE:
            {
                const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id);

                if (favoriteFilmIndex !== -1) {
                    nextState = {
                        ...state,
                        favoritesFilm: state.favoritesFilm.filter((item, index) => index !== favoriteFilmIndex)
                    }
                } else {
                    // Le film n'est pas dans les films favoris, on l'ajoute à la liste
                    nextState = {
                        ...state,
                        favoritesFilm: [...state.favoritesFilm, action.value]
                    }
                }
                return nextState || state;
            }
        default:
            return state
    }
}