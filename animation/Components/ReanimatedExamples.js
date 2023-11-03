//shared value
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
} from "react-native-reanimated";
import React from "react";
import { Button, SafeAreaView, ScrollView } from "react-native";

function SharedValue() {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      with: withTiming(randomWidth.value, config),
    };
  });

  return (
    <>
      <Animated.View
        style={[
          { height: 30, backgroundColor: "yellow", marginTop: 80, margin: 10 },
          style,
        ]}
      />
      <Button
        title="Toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </>
  );
}

function Box() {
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value * 255, {
            damping: 40,
            stiffness: 90,
          }),
        },
      ],
    };
  });
  return (
    <>
      <Animated.View
        style={[
          { width: 100, height: 100, backgroundColor: "purple" },
          animatedStyles,
        ]}
      />
      <Button
        title="Move"
        onPress={() => (offset.value = withSpring(Math.random()))}
      />
    </>
  );
}

function Wooble (){
const rotation = useSharedValue(0);

const animatedStyle= useAnimatedStyle(()=>{
  return{
    transform:[{rotateZ: `${rotation.value}deg`}]
  }

})

 
  return(
    <>
    <Animated.View
    style= 
    {[
      { width: 100, height: 100, backgroundColor: "purple" },
      animatedStyle,
    ]}
    
    />
    <Button
    title="move"
    onPress={()=>
    rotation.value=withSequence(
      withTiming(-10, { duration:20}),
      withRepeat(withTiming(85, {duration:115})),
      withTiming(0, {duration:50})
    )
    
    }
    />
    </>
  )
}

const ReanimatedExamples = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {/* <SharedValue /> */}
        <Box />
        <Wooble/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ReanimatedExamples;