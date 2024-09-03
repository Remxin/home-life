import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import PageView from "@/components/PageView";
import { horizontalScale, verticalScale } from "@/utils/metrics";
import { Colors } from "@/constants/Colors";
import GrpcGatewayClient from "@/utils/grpcClient";
import { useRouter } from "expo-router";

import SimpleButton from "@/components/SimpleButton";


const GetFamily = () => {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  useEffect(() => {
    async function getFamily() {
      const [error, response] = await GrpcGatewayClient.getFamily()
      if (error) {
        console.log(error)
        // TODO: error handling
        setLoaded(true)
        return
      }
      console.log(response?.family)
      router.replace(`/(tabs)/?family=${JSON.stringify(response?.family)}&members=${JSON.stringify(response?.members)}`)

    }
    getFamily()
  }, [])

  if (!loaded) return (
    <View><Text>Loading...</Text></View>
  )
  return (
    <PageView>
      <View style={styles.buttonsContainer}>
        <Text style={styles.title}>Get family</Text>
        <SimpleButton
          text="Join family"
          onPress={() => null}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
        <SimpleButton
          text="Create family"
          onPress={() => null}
          buttonStyle={styles.button}
          textStyle={styles.buttonText}
        />
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.snow}></View>
        <Image
          source={require("@/assets/images/penguin_family.png")}
          style={styles.familyImage}
        />
      </View>
    </PageView>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(10),
  },
  title: {
    color: Colors.dark,
    fontWeight: "bold",
    fontSize: horizontalScale(36),
    marginBottom: 30,
  },
  button: {
    width: horizontalScale(240),
    height: horizontalScale(50),
    borderRadius: horizontalScale(8),
  },
  buttonText: {
    fontSize: horizontalScale(15),
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    margin: 0,
    padding: 0,
  },
  familyImage: {
    position: "absolute",
    width: verticalScale(350),
    height: verticalScale(350),
  },
  snow: {
    width: "100%",
    height: verticalScale(45),
    backgroundColor: Colors.white,
  },
});

export default GetFamily;
