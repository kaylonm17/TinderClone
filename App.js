import 'react-native-gesture-handler';
import React, {useState, useEffect,} from "react";
import {View, StyleSheet, Text, Pressable, useWindowDimensions, Image,} from 'react-native';
import Card from './src/components/TinderCard';
import users from './assets/data/users';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, useAnimatedGesture, withDecay, useDerivedValue, interpolate, runOnJS, } from  'react-native-reanimated'
import { Gesture, GestureDetector, GestureHandlerRootView, } from 'react-native-gesture-handler';
import { AnimatedView } from 'react-native-reanimated/lib/typescript/component/View';
import Like from './assets/images/LIKE.png';
import Nope from './assets/images/nope.png';
 
const SIZE = 120;

const ROTATION = 60;
const SWIPE_VELOCITY = 800;

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(currentIndex + 1);

  const currentProfile = users[currentIndex];
  const nextProfile =  users[nextIndex];

  const {width: screenWidth} = useWindowDimensions();

  const hiddenTranslateX = 2 * screenWidth;

  const translateX = useSharedValue(0);
  const rotate = useDerivedValue(() => interpolate(translateX.value, [0, hiddenTranslateX], [0, ROTATION])+ 'deg',);


  const pan = Gesture.Pan()
  .onChange((event) => {
    translateX.value += event.changeX;
  })
  .onFinalize((event) => {
      if (Math.abs(event.velocityX) < SWIPE_VELOCITY) {
        translateX.value = withSpring(0);
        return;
      }
      translateX.value = withSpring(
          hiddenTranslateX * Math.sign(event.velocityX),
          {},
          () => runOnJS(setCurrentIndex)(currentIndex+1)
        );
        

  });

  useEffect(() => {
    translateX.value = 0
    setNextIndex(currentIndex+1);
  }, [currentIndex]);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value, },
    { rotate: rotate.value, },
    ],
  })); 

  const nextCardStyle = useAnimatedStyle(() => ({
    transform: [ 
      {scale: interpolate(translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.8, 1])},
    ],
      opacity: interpolate(
        translateX.value, [-hiddenTranslateX, 0, hiddenTranslateX], [1, 0.5, 1],
      ),
  })); 

   const likeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value, [ 0, -hiddenTranslateX / 5], [0, 1],
    ),
   }));

   const nopeStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateX.value, [ 0, hiddenTranslateX / 5], [0, 1],
    ),
   }));


  const gesture = Gesture.Tap().onBegin(() => {
    console.log(_WORKLET);
  });

 return (
  <GestureHandlerRootView>
    <View style={styles.pageContainer}>
    {nextProfile && ( 
      <View style={styles.nextCardContainer}>
      <Animated.View style={[styles.animatedCard, nextCardStyle]}>
        <Card user={nextProfile}/> 
      </Animated.View>
      </View>
      )}

      {currentProfile && (
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.animatedCard, cardStyle]}>
            <Animated.Image source={Like} style={[styles.like, {left: 10}, likeStyle]} resizeMode="contain"/>
            <Animated.Image source={Nope} style={[styles.like, {right: 10}, nopeStyle]}/> 
            <Card user={currentProfile}/>
          </Animated.View>
        </GestureDetector>
        )}
    </View>
  </GestureHandlerRootView>
 );
};
const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: 'center',
     alignItems: 'center',
      flex: 1,
    },
    animatedCard: {
      width: '90%',
      height: '70%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nextCardContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    like: {
      width: 150,
      height: 150,
      position: 'absolute',
      top: 10,
      zIndex: 1,
      elevation: 1,
    },
});

export default App;
