import { IFilm } from "../../api/TMDBApi";
import { Action } from "redux";

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export interface IFavoriteState {
    favoritesFilm: IFilm[];
}

export interface IToggleFavoriteAction extends Action<typeof TOGGLE_FAVORITE> {
    value: IFilm;
}

export type FavoriteActionTypes = IToggleFavoriteAction;