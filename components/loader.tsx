
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Loader({type}:{type: "loader" | "empty"}) {

  return (
    <View style={styles.animationContainer}>
      {type === "loader" && <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
         
        }}
        source={require("../assets/loader.json")}
      />}
      {type === "empty" && <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
         
        }}
        source={require("../assets/empty.json")}
      />}
      
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
});
