import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/core';
import { Text, View, Image } from 'react-native';
import axios from 'axios';
export default function ProfileScreen() {
  const { params } = useRoute();
  const [dataFetch, setDataFetch] = useState({});

  // call specific id

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id[0]}`
        );
        // console.log(response.data);
        setDataFetch(response.data);
      };

      fetchData();
    } catch (error) {
      console.log(error.message);
    }
  }, params.id);

  return (
    <View>
      <Text>{dataFetch.price}</Text>
      <Image
        style={{ width: 300, height: 200 }}
        source={{ uri: `${dataFetch.photos[0].url}` }}
      />
      <Text></Text>
    </View>
  );
}
