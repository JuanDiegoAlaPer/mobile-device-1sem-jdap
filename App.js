import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style = {{ flex: 1}}>
      <PanGestureHandler onGestureEvent={() => console.log('Gesture detected!')}>
        <View style ={styles.box}/>
      </PanGestureHandler>
    </GestureHandlerRootView>
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
