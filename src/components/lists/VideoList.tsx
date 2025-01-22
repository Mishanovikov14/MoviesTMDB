import { StyleSheet, Text, View } from "react-native";
import { MainStyles } from "../../constants/Style";
import YoutubeVideo from "../YoutubeVideo";
import { Colors } from "../../constants/Colors";
import { Video } from "../../constants/Types";

export default function VideoList({ title, videos }: {title: string, videos: Video[]}) {
  return (
    <View>
      <Text style={styles.sectionTitleText}>{title}</Text>
      {videos.map((video: Video) => <YoutubeVideo key={video.id} videoId={video.key} />)}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitleText: {
    color: Colors.PRIMARY,
    fontSize: MainStyles.FONTSIZE,
    marginBottom: 10,
  },

  separator: {
    height: 10,
  },
});
