// Components/FilmDetail.js

import React from 'react'
import moment from 'moment'
import numeral from 'numeral'
import { View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { connect } from 'react-redux'
import { IFilm, getFilmDetailFromApi, getImageFromApi } from '../api/TMDBApi'
import { IFavoriteState, IToggleFavoriteAction, TOGGLE_FAVORITE } from '../store/reducers/favoriteTypes'
import { Dispatch } from 'redux'

import styles from './FilmDetail.Styles';

interface INavigationParameters {
  idFilm: number;
}

interface IProps {
  navigation: NavigationStackProp<INavigationParameters>;
  dispatch: Dispatch;
  favoritesFilm: IFilm[];
}

interface IState {
  film?: IFilm;
  isLoading: boolean;
}

class FilmDetail extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      film: undefined,
      isLoading: true
    }
  }

  _shareFilm(): void {
    const { film } = this.state;

    if (film) {
      Share.share({ title: film.title, message: film.overview });
    }
  }

  _displayFloatingActionButton(): JSX.Element | undefined {
    const { film } = this.state;

    if (film != undefined && Platform.OS === 'android') { // Uniquement sur Android et lorsque le film est chargé
      return (
        <TouchableOpacity
          style={styles.share_touchable_floatingactionbutton}
          onPress={(): void => this._shareFilm()}>
          <Image
            style={styles.share_image}
            source={require('../images/ic_share.png')} />
        </TouchableOpacity>
      )
    }
  }

  private _displayLoading(): JSX.Element | undefined {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  private _toggleFavorite(): void {
    if (this.state.film) {
      const action: IToggleFavoriteAction = {
        type: TOGGLE_FAVORITE,
        value: this.state.film
      }
      this.props.dispatch(action)
    }
  }

  private _displayFilm(): JSX.Element | undefined {
    const { film } = this.state

    if (film !== undefined) {
      return (
        <ScrollView style={styles.scrollview_container}>
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path) }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          <TouchableOpacity
            style={styles.favorite_container}
            onPress={(): void => this._toggleFavorite()}>
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
          <Text style={styles.default_text}>Note : {film.vote_average} / 10</Text>
          <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
          <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
          <Text style={styles.default_text}>Genre(s) : {film.genres.map(function (genre) {
            return genre.name
          }).join(' / ')}
          </Text>
          <Text style={styles.default_text}>Companie(s) : {film.production_companies.map(function (company) {
            return company.name
          }).join(' / ')}
          </Text>
        </ScrollView>
      )
    }
  }

  _displayFavoriteImage(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    let sourceImage = require('../images/ic_favorite_border.png')
    if (this.props.favoritesFilm.findIndex(item => this.state.film && item.id === this.state.film.id) !== -1) {
      // Film dans nos favoris
      sourceImage = require('../images/ic_favorite.png')
    }
    return (
      <Image
        style={styles.favorite_image}
        source={sourceImage}
      />
    )
  }

  public componentDidMount(): void {
    if (this.props.navigation.state.params) {
      getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
        this.setState({
          film: data,
          isLoading: false
        })
      })
    }
  }

  componentDidUpdate(): void {
    console.log('componentDidUpdate : ')
    console.log(this.props.favoritesFilm)
  }

  public render(): JSX.Element {
    console.log('Component FilmDetail rendu')
    console.log(this.props)

    return (
      <View style={styles.main_container}>
        {this._displayLoading()}
        {this._displayFilm()}
        {this._displayFloatingActionButton()}
      </View>
    )
  }
}

const mapStateToProps = (state: IFavoriteState): IFavoriteState => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(FilmDetail)
