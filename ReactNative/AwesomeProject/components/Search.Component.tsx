import React from 'react'
import { View, TextInput, Button, ActivityIndicator } from 'react-native'
import { getFilmsFromApiWithSearchedText, IFilm } from '../api/TMDBApi'
import { NavigationStackProp } from 'react-navigation-stack'
import { IFavoriteState } from '../store/reducers/favoriteTypes'
import { connect } from 'react-redux'
import FilmList from './FilmList.Component'

import styles from './Search.Styles';

interface IState {
    films: IFilm[];
    isLoading: boolean;
}

type Props = {
    navigation: NavigationStackProp<void>;
    favoritesFilm: IFilm[];
};

class Search extends React.Component<Props, IState> {
  constructor (props: Props) {
    super(props)
    this.state = {
      films: [],
      isLoading: false
    }
    this._searchedText = ''
    this.page = 0
    this.totalPages = 0
  }

    private _searchedText: string;
    private page: number;
    private totalPages: number;

    private _searchFilms (): void {
      this.page = 0
      this.totalPages = 0
      this.setState(
        {
          films: []
        },
        () => { this._loadFilms() })
    }

    private _loadFilms (): void {
      if (this._searchedText.length > 0) {
        this.setState({ isLoading: true })
        getFilmsFromApiWithSearchedText(this._searchedText, this.page + 1).then(data => {
          this.page = data.page
          this.totalPages = data.total_pages
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false
          })
        })
      }
    }

    private _searchTextInputChanged (text: string): void {
      this._searchedText = text
    }

    _displayLoading (): JSX.Element | undefined {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
            {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
          </View>
        )
      }
    }

    render (): JSX.Element {
      console.log('RENDER')
      console.log(this.props)
      return (
        <View style={styles.view}>
          <TextInput
            style={styles.textinput}
            placeholder='Titre du film'
            onChangeText={(text): void => this._searchTextInputChanged(text)}
            onSubmitEditing={(): void => this._searchFilms()}
          />
          <Button title='Rechercher' onPress={(): void => { this._searchFilms() }} />
          <FilmList
            navigation = {this.props.navigation}
            films ={this.state.films}
            loadFilms={(): void => this._loadFilms()}
            page={this.page}
            totalPages={this.totalPages} />
          {this._displayLoading()}
        </View>
      )
    }
}

const mapStateToProps = (state: IFavoriteState): IFavoriteState => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Search)
