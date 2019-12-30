import React from "react";
import { StyleSheet, View, TextInput, Button, FlatList, ActivityIndicator } from "react-native";
import FilmItem from "./FilmItem";
import { getFilmsFromApiWithSearchedText, IFilm } from '../api/TMDBApi';
import { NavigationStackProp } from 'react-navigation-stack';
import { IFavoriteState } from "../store/reducers/favoriteTypes";
import { connect } from "react-redux";

interface IState {
    films: IFilm[];
    isLoading: boolean;
}

type Props = {
    navigation: NavigationStackProp<void>;
    favoritesFilm: IFilm[];
};

class Search extends React.Component<Props, IState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            films: [],
            isLoading: false
        };
        this._searchedText = "";
        this.page = 0;
        this.totalPages = 0;
    }

    private _searchedText: string;
    private page: number;
    private totalPages: number;

    private _searchFilms() {
        this.page = 0;
        this.totalPages = 0;
        this.setState(
            {
                films: []
            },
            () => { this._loadFilms() });

    }

    private _displayDetailForFilm = (idFilm: number) => {
        console.log("Display film with id " + idFilm);
        this.props.navigation.navigate(
            "FilmDetail",
            { idFilm: idFilm});
    }

    private _loadFilms() {
        if (this._searchedText.length > 0) {
            this.setState({ isLoading: true });
            getFilmsFromApiWithSearchedText(this._searchedText, this.page + 1).then(data => {
                this.page = data.page;
                this.totalPages = data.total_pages;
                this.setState({
                    films: [...this.state.films, ...data.results],
                    isLoading: false
                });
            });
        }
    }

    private _searchTextInputChanged(text: string) {
        this._searchedText = text;
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                    {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
                </View>
            )
        }
    }

    private _isFavorite(film: IFilm): boolean {
        return this.props.favoritesFilm.findIndex(item => item.id === film?.id) >= 0;
    }

    render() {
        console.log("RENDER");
        console.log(this.props);
        return (
            <View style={styles.view}>
                <TextInput
                    style={styles.textinput}
                    placeholder='Titre du film'
                    onChangeText={(text) => this._searchTextInputChanged(text)}
                    onSubmitEditing={() => this._searchFilms()}
                />
                <Button title='Rechercher' onPress={() => { this._searchFilms() }} />
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item: any) => item.id.toString()}
                    renderItem={({ item }) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} isFavorite={this._isFavorite(item)} />}
                    extraData={this.props.favoritesFilm}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) { // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
                            this._loadFilms()
                        }
                    }}
                />
                {this._displayLoading()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    textinput: {
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


const mapStateToProps = (state: IFavoriteState) => {
    return {
        favoritesFilm: state.favoritesFilm
    };
};

export default connect(mapStateToProps)(Search);