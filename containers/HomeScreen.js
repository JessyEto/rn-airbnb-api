import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';

// Theme import
import appTheme, { COLORS, SIZES } from '../assets/styles/theme';
import axios from 'axios';

// function
import ratingCalcul from '../components/rating';
export default function HomeScreen({ navigation }) {
  // states
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  // retriev data
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://express-airbnb-api.herokuapp.com/rooms'
      );
      setData(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return loading ? (
    <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />
  ) : (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => String(item._id)}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Room', { id: item._id });
            }}
            style={styles.homeContainer}
          >
            <ImageBackground
              style={styles.pictureRoom}
              source={{ uri: `${item.photos[0].url}` }}
            >
              <View style={styles.priceBox}>
                <Text style={{ color: 'white' }}>{item.price}€</Text>
              </View>
            </ImageBackground>
            <View style={styles.detailRoom}>
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1} style={styles.titleRoom}>
                  {item.title}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#FFB100', marginRight: 10 }}>
                    {ratingCalcul(item.ratingValue)}
                  </Text>
                  <Text style={{ color: 'grey' }}>{item.reviews} reviews</Text>
                </View>
              </View>
              <View>
                <Image
                  style={styles.profilePicture}
                  source={{ uri: `${item.user.account.photo.url}` }}
                />
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 10,
  },

  pictureRoom: {
    // resizeMode: 'cover',
    // flex: 1,
    // aspectRatio: 3 / 2, // Your aspect ratio
    width: Dimensions.get('window').width * 0.9,
    height: 200,
    justifyContent: 'flex-end',
  },

  priceBox: {
    backgroundColor: COLORS.priceBcgc,
    color: COLORS.textColorWhite,
    width: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  titleRoom: {
    fontSize: SIZES.h2,
    flex: 1,
  },

  detailRoom: {
    width: Dimensions.get('window').width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  profilePicture: {
    height: 60,
    width: 60,
    flex: 1,
    borderRadius: 50,
    marginLeft: 5,
  },
});
