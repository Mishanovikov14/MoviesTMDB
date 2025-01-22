import { Dimensions, StyleSheet, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors } from "../constants/Colors";

export default function YoutubeVideo({ videoId }: { videoId: string }) {
  const screenWidth = Dimensions.get("window").width - 40;
  const playerHeight = (screenWidth * 9) / 16 + 12;

  return (
    <View style={styles.container}>
      <YoutubePlayer height={playerHeight} videoId={videoId} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.DARK,
    borderRadius: 5,
    marginBottom: 24,
  },
});
