import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '../../components/ui/Button'
import { FIREBASE_AUTH } from '../../lib/FirebaseConfig'
import { ThemeColors } from '../../constants/Colors'
import { useAppSelector } from '@/src/store/store'

export default function HomeScreen() {
  const authInfo = useAppSelector((state) => state.auth);
  console.log("Store data: ", JSON.stringify(authInfo, null , 3));
  //FIREBASE_AUTH.signOut() is used for signOut
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button onPress={() => FIREBASE_AUTH.signOut()}>Sign Out</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: ThemeColors.dark.background,
  },
})