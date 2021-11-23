import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './containers/HomeScreen';
import ProfileScreen from './containers/ProfileScreen';
import SignInScreen from './containers/SignInScreen';
import SignUpScreen from './containers/SignUpScreen';
import SettingsScreen from './containers/SettingsScreen';
import SplashScreen from './containers/SplashScreen';
import axios from 'axios';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  // States for email and password during signin
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle the long in Send request for signin
  const handleSigninRequest = async () => {
    try {
      if (!email || !password) {
        alert('Please fill email and password');
      } else {
        const response = await axios.post(
          'https://express-airbnb-api.herokuapp.com/user/log_in',
          {
            email: email,
            password: password,
          }
        );
        setToken(response.data.token);
      }
    } catch (error) {
      // inform user if signup is failed
      alert(error.message);
    }
  };

  // Handle the signup and send request for signup

  const handleSignupRequest = async () => {
    try {
      if (email && username && description && password && confirmPassword) {
        if (password !== confirmPassword) {
          setErrorMessage('Passwords must be the same');
        } else {
          const response = await axios.post(
            'https://express-airbnb-api.herokuapp.com/user/sign_up',
            {
              email: email,
              username: username,
              description: description,
              password: password,
            }
          );
          setToken(response.data.token);
        }
      } else {
        alert('Missing fields');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const setToken = async (token) => {
    if (token) {
      await AsyncStorage.setItem('userToken', token);
    } else {
      await AsyncStorage.removeItem('userToken');
    }

    setUserToken(token);
    console.log(userToken);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem('userToken');

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setUserToken(userToken);

      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  if (isLoading === true) {
    // We haven't finished checking for the token yet
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {userToken === null ? (
          // No token found, user isn't signed in
          <>
            <Stack.Screen name="SignIn">
              {() => (
                <SignInScreen
                  setToken={setToken}
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  handleSigninRequest={handleSigninRequest}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
              {() => (
                <SignUpScreen
                  setToken={setToken}
                  handleSignupRequest={handleSignupRequest}
                  email={email}
                  username={username}
                  description={description}
                  password={password}
                  confirmPassword={confirmPassword}
                  setEmail={setEmail}
                  setUsername={setUsername}
                  setDescription={setDescription}
                  setPassword={setPassword}
                  setConfirmPassword={setConfirmPassword}
                  errorMessage={errorMessage}
                />
              )}
            </Stack.Screen>
          </>
        ) : (
          // User is signed in ! 🎉
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
                }}
              >
                <Tab.Screen
                  name="TabHome"
                  options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={'ios-home'} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          title: 'My App',
                          headerStyle: { backgroundColor: 'red' },
                          headerTitleStyle: { color: 'white' },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: 'User Profile',
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="TabSettings"
                  options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={'ios-options'}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{
                          title: 'Settings',
                        }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
