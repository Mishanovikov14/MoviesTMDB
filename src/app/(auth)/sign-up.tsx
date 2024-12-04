import { StyleSheet, Text, View } from 'react-native'
import { ThemeColors } from '@/src/constants/Colors'
import Button from '@/src/components/ui/Button';
import { router } from 'expo-router';

export default function signUpPage() {
    return (
        <View style={styles.container}>
          <Button onPress={() => router.push("/sign-in")}>Sign Up</Button>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ThemeColors.dark.background
      },
})