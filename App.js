import { SafeAreaView, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Navigation from "./Navigation"

export default function App() {
  return (
    // <GestureHandlerRootView style = {{ flex: 1}}>
    //   <PanGestureHandler onGestureEvent={() => console.log('Gesture detected!')}>
    //     <View style ={styles.box}/>
    //   </PanGestureHandler>
    // </GestureHandlerRootView>
    <SafeAreaView style = {styles.container}>
      <Navigation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(191, 201, 201)"
  }
});
