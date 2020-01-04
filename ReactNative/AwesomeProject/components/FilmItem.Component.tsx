// Components/FilmItem.js

import React from 'react'
import { TouchableOpacity, View, Text, Image } from 'react-native'
import { getImageFromApi, IFilm } from '../api/TMDBApi'

import styles from './FilmItem.Styles';

interface IFilmItemProps {
    film: IFilm;
    isFavorite: boolean;
    displayDetailForFilm: (filmId: number) => void;
}

class FilmItem extends React.Component<IFilmItemProps> {
  private _displayFavorite (): JSX.Element | undefined {
    if (this.props.isFavorite) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const sourceImage = require('../images/ic_favorite.png')

      return (
        <Image
          style={styles.favorite_image}
          source={sourceImage}
        />
      )
    }
  }

  render (): JSX.Element {
    const { film, displayDetailForFilm } = this.props
    return (
      <TouchableOpacity
        style={styles.main_container}
        onPress={(): void => displayDetailForFilm(film.id)}>
        <Image
          style={styles.image}
          source={{ uri: getImageFromApi(film.poster_path) }}
        />
        <View style={styles.content_container}>
          <View style={styles.header_container}>
            { this._displayFavorite() }
            <Text style={styles.title_text}>{film.title}</Text>
            <Text style={styles.vote_text}>{film.vote_average}</Text>
          </View>
          <View style={styles.description_container}>
            <Text style={styles.description_text} numberOfLines={6}>
              {film.overview}
            </Text>
            {/* La propriété numberOfLines permet de couper un texte si celui-ci est trop long, il suffit de définir un nombre maximum de ligne */}
          </View>
          <View style={styles.date_container}>
            <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default FilmItem
