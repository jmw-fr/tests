import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from "./navigation/Navigation";
import { Provider } from "react-redux";
import Store from "./store/configureStore";

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
