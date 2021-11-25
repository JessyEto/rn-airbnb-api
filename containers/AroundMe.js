import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

// Theme import
import { COLORS, SIZES } from '../assets/styles/theme';
// import to allow call request to server
import axios from 'axios';

export default function AroundMe() {
  // states to get perssion from user
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState({});

  // retrieve data
  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync();
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setCoords(obj);
      } else {
        setError(true);
      }
      fetchData();
    };

    const fetchData = async () => {
      const { data } = await axios.get(
        'https://express-airbnb-api.herokuapp.com/rooms'
      );
      console.log(data);
      setCoords(data);
      setIsLoading(false);
    };

    askPermission();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : error ? (
    <Text>Erreur</Text>
  ) : (
    <MapView
      initialRegion={{
        latitude: 48.862725,
        longitude: 2.287592,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      showsUserLocation={true}
      style={styles.aroundMeContainer}
    >
      {coords.map((item, index) => {
        return (
          <MapView.Marker
            key={index}
            coordinate={{
              latitude: item.location[1],
              longitude: item.location[0],
            }}
          />
        );
      })}
    </MapView>
  );
}

const styles = StyleSheet.create({
  aroundMeContainer: {
    flex: 1,
  },
});
