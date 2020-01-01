import React from 'react';
import { StyleSheet, FlatList } from "react-native";
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from "react-redux";
import { IFilm } from '../api/TMDBApi';
import { IFavoriteState } from "../store/reducers/favoriteTypes";
import FilmItem from "./FilmItem";



interface IState {
}

type Props = {
    navigation: NavigationStackProp<void>;
    films: IFilm[];
    favoritesFilm: IFilm[];
    loadFilms: () => void;
    page: number;
    totalPages: number;
};

class FilmList extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);

        this.state = {
        }
    }

    private _displayDetailForFilm = (idFilm: number) => {
        console.log("Display film with id " + idFilm);
        this.props.navigation.navigate(
            "FilmDetail",
            { idFilm: idFilm});
    }    

    private _isFavorite(film: IFilm): boolean {
        return this.props.favoritesFilm.findIndex(item => item.id === film?.id) >= 0;
    }

    public render() {
        return (
            <FlatList
                style={styles.list}
                data={this.props.films}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={({ item }) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} isFavorite={this._isFavorite(item)} />}
                extraData={this.props.favoritesFilm}
                onEndReachedThreshold={0.5}
                onEndReached={() => {
                    if (this.props.page < this.props.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                        this.props.loadFilms()
                    }
                }}
        />
        );
    }

}


const styles = StyleSheet.create({
    list: {
      flex: 1
    }
  })

const mapStateToProps = (state: IFavoriteState) => {
    return {
        favoritesFilm: state.favoritesFilm
    };
};

export default connect(mapStateToProps)(FilmList);