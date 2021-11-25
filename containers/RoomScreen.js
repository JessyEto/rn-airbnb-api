import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

import {
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

// import to allow call request to server
import axios from 'axios';
// Theme import
import { COLORS, SIZES } from '../assets/styles/theme';
// function to calculate star rating
import ratingCalcul from '../components/rating';

export default function ProfileScreen({ route }) {
  const [dataFetch, setDataFetch] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  // call specific id

  useEffect(() => {
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );
        setDataFetch(data);
        setLongitude(data.location[0]);
        setLatitude(data.location[1]);
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
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
      >
        <MapView.Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title="hee"
          description="dd"
        />
      </MapView>
    </View>
  );
}

//  const askPermission = async () => {
//   console.log('coucpu');
//   let { status } = await Location.requestForegroundPermissionsAsync();
//   if (status === 'granted') {
//     let location = await Location.getCurrentPositionAsync();
//     const obj = {
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude,
//     };

//     setCoords(obj);
//   } else {
//     setError(true);
//   }
//   setIsLoading(false);
// };

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

  map: {
    marginTop: 20,
    width: Dimensions.get('window').width,
    height: 300,
  },
});
