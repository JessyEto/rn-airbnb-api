import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
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
    <View>
      <Text>{dataFetch.price}</Text>
      <Image
        style={{ width: 300, height: 200 }}
        source={{ uri: `${dataFetch.photos[0].url}` }}
      />
    </View>
  );
}
