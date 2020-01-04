import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Image } from 'react-native'

import Search from '../components/Search.Component'
import FilmDetail from '../components/FilmDetail.Component'
import Favorites from '../components/Favorites.Component'
import Test from '../components/Test.Component'

import styles from './Navigation.Styles';

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const FavoriteStackNavigator = createStackNavigator({
  Search: {
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      // eslint-disable-next-line react/display-name
      tabBarIcon: (): JSX.Element => {
        return <Image
          source={require('../images/ic_search.png')}
          style={styles.icon} />
      }
    }
  },
  Favorites: {
    screen: FavoriteStackNavigator,
    navigationOptions: {
      // eslint-disable-next-line react/display-name
      tabBarIcon: (): JSX.Element => {
        return <Image
          source={require('../images/ic_favorite.png')}
          style={styles.icon} />
      }
    }
  },
  Test: {
    screen: Test
  }
},
  {
    tabBarOptions: {
      activeBackgroundColor: '#DDDDDD', // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: '#FFFFFF', // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
)

export default createAppContainer(MoviesTabNavigator)
