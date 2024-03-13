import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen'
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ProductInfo from '../screens/ProductInfo';
import AddAddressScreen from '../screens/AddAddressScreen';
import Address from '../screens/Address';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UpperCatagory from '../screens/UpperCatagory';

interface NavigationProps { }

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()

const Navigation = (props: NavigationProps) => {
  // Function that controls tab navigators
  function BottomTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="home" size={30} color="#008E97" />
              ) : (
                <Ionicons name="home-outline" size={25} color="gray" />
              )
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={30} color="#008E97" />
              ) : (
                <Ionicons name="person-outline" size={25} color="gray" />
              )
          }}
          name="ProfileScreen"
          component={ProfileScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <FontAwesome name="shopping-cart" size={30} color="#008E97" />
              ) : (
                <EvilIcons name="cart" size={30} color="gray" />
              )
          }}
          name="CartScreen"
          component={CartScreen}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegisterScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={BottomTabs} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Info"
          component={ProductInfo} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddAddress"
          component={AddAddressScreen} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Address"
          component={Address} />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UpperCatagory"
          component={UpperCatagory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  container: {}
});
