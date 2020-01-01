// Components/Favorites.js

import React from 'react'
import { StyleSheet, View } from 'react-native'
import { NavigationStackProp } from 'react-navigation-stack'
import { IFilm } from '../api/TMDBApi'
import { connect } from 'react-redux'
import { IFavoriteState } from '../store/reducers/favoriteTypes'
import FilmList from './FilmList'

type Props = {
  navigation: NavigationStackProp<void>;
  favoritesFilm: IFilm[];
};

class Favorites extends React.Component<Props> {
  render (): JSX.Element {
    return (
      <View style={styles.view}>
        <FilmList
          navigation = {this.props.navigation}
          films ={this.props.favoritesFilm}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          loadFilms={(): void => {}}
          page={1}
          totalPages={1} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  }
})

const mapStateToProps = (state: IFavoriteState): IFavoriteState => {
  return {
    favoritesFilm: state.favoritesFilm
  }
}

export default connect(mapStateToProps)(Favorites)
