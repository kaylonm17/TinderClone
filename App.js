import 'react-native-gesture-handler';
import React, {useState} from "react";
import {View, StyleSheet, Text, SafeAreaView, Pressable} from 'react-native';
import { GestureHandlerRootView, } from 'react-native-gesture-handler';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';

const App = () => {
  const [activeScreen, setActiveScreen] = useState('HOME');

const color = "#b5b5b5";
const activeColor = '#F76C6B';
 return (
  <GestureHandlerRootView>
    <SafeAreaView style={styles.root}>
    <View style={styles.pageContainer}>
      <View style={styles.topNavigation}>
        <Pressable onPress={() => setActiveScreen('HOME')}>
          <Fontisto name="tinder" size={30} color={activeScreen == 'HOME' ? activeColor : color} />
        </Pressable>
        <Pressable onPress={() => setActiveScreen('LIKES')}>
          <MaterialCommunityIcons name="star-four-points" size={30} color={activeScreen == 'LIKES' ? activeColor : color} />
        </Pressable>
        <Pressable onPress={() => setActiveScreen('CHAT')}>
          <Ionicons name="chatbubbles" size={30} color={activeScreen == 'CHAT' ? activeColor : color} />
        </Pressable>
        <Pressable onPress={() => setActiveScreen('USER')}>
          <FontAwesome name="user" size={30} color={activeScreen == 'USER' ? activeColor : color} />
        </Pressable>
      </View>
      { activeScreen == 'HOME' && <HomeScreen/> }
      { activeScreen == 'CHAT' && <MatchesScreen/>}
    </View>
    </SafeAreaView>
  </GestureHandlerRootView>
 );
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  pageContainer: {
    justifyContent: 'center',
     alignItems: 'center',
      flex: 1,
    },
    topNavigation: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      padding: 10 ,
    }
});

export default App;
