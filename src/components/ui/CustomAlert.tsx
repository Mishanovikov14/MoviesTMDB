import { Colors } from "@/src/constants/Colors";
import { MainStyles } from "@/src/constants/Style";
import { hideModal } from "@/src/store/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/src/store/store";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";

export default function CustomAlert() {
  const dispatch = useAppDispatch();
  const { isVisible, title, message, borderColor } = useAppSelector((state) => state.modal);

  const closeModal = () => {
    dispatch(hideModal());
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onBackButtonPress={closeModal}
      animationIn="fadeIn"
      animationOut="fadeOut"
      backdropColor="rgba(0, 0, 0, 0.7)"
      backdropOpacity={0.7}
      style={styles.modal}
    >
      <View style={[styles.contentContainer, {borderColor: borderColor}]}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.messageText}>{message}</Text>
        <Button onPress={closeModal} style={styles.button}>Ok</Button>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  contentContainer: {
    backgroundColor: Colors.DARK,
    padding: 24,
    width: "80%",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
  },

  titleText: {
    fontSize: MainStyles.BIG_FONTSIZE,
    color: Colors.PRIMARY,
    marginBottom: 12,
  },

  messageText: {
    fontSize: MainStyles.FONTSIZE,
    color: Colors.LIGHT_GREY,
    marginBottom: 24,
  },

  button: {
    width: "100%"
  },
});
