import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getMovieByidApi } from '../api/movie';
import { BASE_PATH_IMG } from '../utils/constats';
import { ScrollView } from 'react-native-gesture-handler';

export default function Movie(props) {
  const { route } = props;
  const { id } = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieByidApi(id).then(response => {
      console.log(response);
      setMovie(response);
    });
  }, [id]);

  if (movie === null) return null;

  return (
    <>
      <ScrollView>
        <MovieImage posterPath={movie.poster_path} />
      </ScrollView>
    </>
  );
}

function MovieImage(props) {
  const { posterPath } = props;

  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{
          uri: `${BASE_PATH_IMG}/w500${posterPath}`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 500,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
