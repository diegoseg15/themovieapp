import { View, Text } from 'react-native';
import React from 'react';
import { IconButton } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

export default function StackNavigation(props) {
  // console.log(props);
  const { navigation } = props;
  const buttonLeft = screen => {
    // console.log(screen);
    switch (screen) {
      case 'search':
      case 'movie':
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );
      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };

  const buttonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate('search')}
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName="app">
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'TheMovieApp',
          headerLeft: () => buttonLeft('home'),
          headerRight: () => buttonRight(),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => buttonLeft('movie'),
          headerRight: () => buttonRight(),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: 'Nuevas Peliculas',
          headerLeft: () => buttonLeft('news'),
          headerRight: () => buttonRight(),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{
          title: 'Peliculas Populares',
          headerLeft: () => buttonLeft('popular'),
          headerRight: () => buttonRight(),
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: 'Buscador',
          headerLeft: () => buttonLeft('search'),
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
}
