import React from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// Import theme
import appTheme, { COLORS } from '../assets/styles/theme';

export default function SignUpScreen({
  handleSignupRequest,
  email,
  username,
  description,
  password,
  confirmPassword,
  setEmail,
  setUsername,
  setDescription,
  setPassword,
  setConfirmPassword,
  errorMessage,
}) {
  const navigation = useNavigation();
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: 'white' }}
    >
      <View style={styles.signupContainer}>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={styles.signupPicture}
            source={require('../assets/img/Airbnb-Embleme.jpeg')}
          />

          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#7B7B7B' }}>
            Sign up
          </Text>

          <View style={styles.signupInputBox}>
            <TextInput
              style={styles.signupInput}
              placeholder="email"
              onChangeText={(text) => {
                setEmail(text);
              }}
              value={email}
            />
            <TextInput
              style={styles.signupInput}
              placeholder="username"
              onChangeText={(text) => {
                setUsername(text);
              }}
              value={username}
            />
            <TextInput
              style={styles.signupInputDescription}
              placeholder="describe yourself in a few words..."
              multiline={true}
              numberOfLines={5}
              onChangeText={(text) => {
                setDescription(text);
              }}
              value={description}
            />
            <TextInput
              style={styles.signupInput}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setPassword(text);
              }}
              value={password}
            />
            <TextInput
              style={styles.signupInput}
              placeholder="confirm password"
              secureTextEntry={true}
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              value={confirmPassword}
            />
          </View>
          {errorMessage ? (
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}
              >
                {errorMessage}
              </Text>
              <TouchableOpacity
                style={styles.signupButton}
                title="Sign up"
                onPress={async () => {
                  // const userToken = 'secret-token';
                  // setToken(userToken);
                  handleSignupRequest();
                }}
              >
                <Text style={{ textAlign: 'center' }}>Sign up</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.signupButton}
              title="Sign up"
              onPress={async () => {
                // const userToken = 'secret-token';
                // setToken(userToken);
                handleSignupRequest();
              }}
            >
              <Text style={{ textAlign: 'center' }}>Sign up</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <Text style={{ textAlign: 'center', color: '#7B7B7B' }}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

// -------- SIGNUP --------

const styles = StyleSheet.create({
  signupContainer: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 30,
    backgroundColor: COLORS.mainColor,
    height: Dimensions.get('window').height + 50,
  },

  signupInputBox: {
    width: 300,
    marginBottom: 50,
    marginTop: 30,
  },

  signupPicture: {
    width: 90,
    height: 90,
    marginTop: 40,
    marginBottom: 40,
  },

  signupInput: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
    marginVertical: 15,
    paddingBottom: 5,
  },

  signupInputDescription: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    marginVertical: 15,
    paddingTop: 3,
    paddingBottom: 5,
    paddingLeft: 5,
    textAlignVertical: 'top',
    height: 70,
  },

  signupButton: {
    color: COLORS.buttonBorder,
    fontWeight: 'bold',
    borderWidth: 2,
    width: 160,
    paddingVertical: 15,
    marginBottom: 20,
    borderColor: 'red',
    borderRadius: 25,
  },
});
