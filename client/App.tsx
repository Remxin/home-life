import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import MainRouter from './MainRouter';
import AppRouter from './AppRouter';

export default function App() {
  return (
    <MainRouter/>
  );
}

