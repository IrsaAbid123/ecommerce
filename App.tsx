import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Navigation from './src/Frontend/navigation/Navigation'
// import ModalPortal from 'react-native-modal'

interface AppProps {}

const App = (props: AppProps) => {
  return (
    <>
    <Navigation/>
    {/* <ModalPortal/> */}
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {}
});
