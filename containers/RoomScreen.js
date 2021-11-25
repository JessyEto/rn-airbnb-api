import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import {
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import axios from 'axios';

// Theme import
import appTheme, { COLORS, SIZES } from '../assets/styles/theme';

// function to calculate star rating
import ratingCalcul from '../components/rating';

export default function ProfileScreen({ route }) {
  const [dataFetch, setDataFetch] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // call specific id

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setDataFetch(data);
        setIsLoading(false);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, [route.params.id]);

  return isLoading ? (
    <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />
  ) : (
    <View style={styles.roomContainer}>
      <ImageBackground
        style={styles.roomPic}
        source={{ uri: `${dataFetch.photos[0].url}` }}
      >
        <View style={styles.pricebox}>
          <Text style={{ color: 'white' }}>{dataFetch.price}€</Text>
        </View>
      </ImageBackground>
      <View style={styles.detailsInfoBlock}>
        <View style={styles.titleBlock}>
          <View style={styles.titleRating}>
            <Text>{dataFetch.title}</Text>
            <Text style={{ color: 'grey', marginTop: 10 }}>
              {ratingCalcul(dataFetch.ratingValue)} {dataFetch.reviews} reviews
            </Text>
          </View>
          <Image
            resizeMode="cover"
            style={styles.profilePic}
            source={{ uri: `${dataFetch.user.account.photo.url}` }}
          />
        </View>
        <View style={styles.descripBlock}>
          <Text numberOfLines={3}>{dataFetch.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  roomContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  roomPic: {
    width: Dimensions.get('window').width,
    height: 250,
    justifyContent: 'flex-end',
  },
  pricebox: {
    backgroundColor: COLORS.priceBcgc,
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  detailsInfoBlock: {
    width: Dimensions.get('window').width * 0.9,
  },

  titleBlock: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },

  titleRating: {},

  descripBlock: {},

  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginLeft: 5,
  },
});
