import { StyleSheet, Text, View } from 'react-native';
import { Title } from 'react-native-paper';
import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  getNewsMoviesApi,
  getAllGenresApi,
  getGenreMoviesApi,
} from '../api/movie';
import { ScrollView } from 'react-native-gesture-handler';
import CarouselVertical from '../components/CarouselVertical';
import CarouselMulti from '../components/CarouselMulti';

export default function Home(props) {
  const { navigation } = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setGenreList] = useState([]);
  const [genreSelected, setGenreSelected] = useState(28);
  const [genreMovies, setGenreMovies] = useState(null);

  // useEffect(async () => {
  //   const data = await getNewsMoviesApi();
  //   console.log(data);
  // }, []);

  // console.log(newMovies);

  useEffect(() => {
    getNewsMoviesApi().then(response => {
      setNewMovies(response.results);
    });
  }, []);

  useEffect(() => {
    getAllGenresApi().then(response => {
      // console.log(response);
      setGenreList(response.genres);
    });
  }, []);

  useEffect(() => {
    getGenreMoviesApi(genreSelected).then(response => {
      // console.log(response);
      setGenreMovies(response.results);
    });
  }, [genreSelected]);

  const onChangeGenre = newGenreId => {
    setGenreSelected(newGenreId);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}>Nuevas Peliculas</Title>
          <CarouselVertical data={newMovies} navigation={navigation} />
        </View>
      )}

      <View style={styles.genres}>
        <Title style={styles.genresTitle}>Peliculas Por Genero</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}>
          {map(genreList, genre => (
            <Text
              key={genre.id}
              style={[
                styles.genre,
                { color: genre.id !== genreSelected ? '#8697a5' : '#fff' },
              ]}
              onPress={() => onChangeGenre(genre.id)}>
              {genre.name}
            </Text>
          ))}
        </ScrollView>
        {genreMovies && (
          <CarouselMulti data={genreMovies} navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genresTitle: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    paddingHorizontal: 20,
    padding: 10,
  },
  genre: {
    marginRight: 20,
    fontSize: 16,
  },
});
