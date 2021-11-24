import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  Button,
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

// Theme import
import appTheme, { COLORS, SIZES } from '../assets/styles/theme';
import axios from 'axios';

// function
import ratingCalcul from '../components/rating';
export default function HomeScreen() {
  const navigation = useNavigation();

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

  return (
    <SafeAreaView style={styles.homeContainer}>
      {loading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Room', { id: item.user.rooms });
              }}
              style={styles.roomBlock}
            >
              <Image
                style={styles.pictureRoom}
                source={{ uri: `${item.photos[0].url}` }}
              />
              <View style={styles.detailRoom}>
                <View style={{ width: 250 }}>
                  <Text style={styles.priceBox}>{item.price}€</Text>
                  <Text numberOfLines={1} style={styles.titleRoom}>
                    {item.title}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#FFB100', marginRight: 10 }}>
                      {ratingCalcul(item.ratingValue)}
                    </Text>
                    <Text style={{ color: 'grey' }}>
                      {item.reviews} reviews
                    </Text>
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
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: COLORS.mainColor,
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  pictureRoom: {
    resizeMode: 'cover',
    flex: 1,
    aspectRatio: 3 / 2, // Your aspect ratio
  },

  roomBlock: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 5,
  },

  priceBox: {
    backgroundColor: COLORS.priceBcgc,
    color: COLORS.textColorWhite,
    borderWidth: 1,
    width: 50,
    height: 30,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    bottom: 80,
  },

  titleRoom: {
    fontSize: SIZES.h2,
    flex: 1,
  },

  detailRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },

  profilePicture: {
    height: 60,
    width: 60,
    flex: 1,
    borderRadius: 50,
  },
});
