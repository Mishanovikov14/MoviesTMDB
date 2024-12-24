import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { Colors } from "../constants/Colors";
import { useState } from "react";

export default function YoutubeVideo({ videoId }: { videoId: string }) {
  const [playing, setPlaying] = useState(false);
  const screenWidth = Dimensions.get("window").width - 40;
  const playerHeight = (screenWidth * 9) / 16;

  return (
    <Pressable
      onPress={() => {
        if (!playing) {
          setPlaying(true);
        }
      }}
    >
      <View pointerEvents={playing ? undefined : "none"} style={styles.container}>
        <YoutubePlayer
          height={playerHeight}
          videoId={videoId}
          play={playing}
          onChangeState={(event) => {
            if (event === "paused") {
              setPlaying(false);
            }
          }}
        />
      </View>
    </Pressable>
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
