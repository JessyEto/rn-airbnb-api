import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import Constants from 'expo-constants';

export default function SignInScreen({
  setToken,
  email,
  setEmail,
  password,
  setPassword,
  handleSigninRequest,
}) {
  // windows dimenssion
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView>
      <View style={styles.signinContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.signinPicture}
            source={require('../assets/Airbnb-Embleme.jpeg')}
          />

          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7B7B7B' }}>
            Sign in
          </Text>

          <View style={styles.signinInputBox}>
            <TextInput
              style={styles.signinInput}
              placeholder="email"
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            />
            <TextInput
              style={styles.signinInput}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
          </View>
          <View style={{ marginTop: 200, marginBottom: 50 }}>
            <TouchableOpacity
              onPress={async () => {
                const userToken = 'secret-token';
                setToken(userToken);
                handleSigninRequest();
              }}
            >
              <Text style={styles.signinButton}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}
            >
              <Text style={{ textAlign: 'center', color: '#7B7B7B' }}>
                No account ? Register
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

// -------- SIGNIN --------

const styles = StyleSheet.create({
  signinContainer: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
    backgroundColor: 'white',
  },

  signinInputBox: {
    height: 100,
    width: 300,
    marginVertical: 50,
  },

  signinPicture: {
    width: 90,
    height: 90,
    marginTop: 100,
    marginBottom: 20,
  },

  signinInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#FFBFC4',
    marginVertical: 15,
    paddingBottom: 5,
  },

  signinButton: {
    color: '#7B7B7B',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 2,
    width: 160,
    paddingVertical: 15,
    marginBottom: 20,
    borderColor: 'red',
    borderRadius: 25,
  },
});
