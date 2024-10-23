import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import GrpcGatewayClient from "@/utils/grpcClient";
import HomeLifeAsyncStorage from "@/utils/asyncStorage";

import { horizontalScale, verticalScale } from "@/utils/metrics";
import { Colors } from "@/constants/colors";
import { validateFamilyName } from "@/validations/val";

// components
import PageView from "@/components/PageView";
import SimpleButton from "@/components/SimpleButton";
import TopInfoModal from "@/components/TopInfoModal";
import Modal from "@/components/Modal";

// forms
import { Form } from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Button from "@/components/forms/Button";

// redux
import { useDispatch } from "react-redux";
import { setFamily, setMembers } from "@/redux/familySlice";
import { useStoreSelector } from "@/redux/store";

const GetFamily = () => {
  const user = useStoreSelector((state) => state.user);
  const [loaded, setLoaded] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [warningText, setWarningText] = useState("");
  const [createFamilyVisible, setCreateFamilyVisible] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getFamily() {
      const [error, response] = await GrpcGatewayClient.getFamily();
      if (error) {
        setWarningText(error.message);
        setLoaded(true);
        return;
      }

      dispatch(setFamily(response?.family));
      dispatch(setMembers(response?.members));
      router.replace("/(tabs)");
    }
    getFamily();
  }, []);

  async function createFamily([family_name]: string[]) {
    const [error, response] = await GrpcGatewayClient.createFamily(family_name);
    if (error) {
      setErrorText(error.message);
      return error.getFieldViolations();
    }

    await HomeLifeAsyncStorage.setData(
      "permission_token",
      response?.permission_token
    );
    dispatch(setFamily(response?.family));
    dispatch(setMembers([user]));
    setCreateFamilyVisible(false);
    
    router.replace(`/(tabs)/`);
    return null;
  }

  if (!loaded)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <PageView color="mediumLight">
      <TopInfoModal
        text={warningText}
        type="warning"
        visible={!!warningText}
        setVisible={(v: boolean) => setWarningText("")}
      />
      <TopInfoModal
        text={errorText}
        type="error"
        visible={!!errorText}
        setVisible={(v: boolean) => setErrorText("")}
      />
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
          onPress={() => setCreateFamilyVisible(true)}
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
      <Modal
        visible={createFamilyVisible}
        setVisible={(v: any) => setCreateFamilyVisible(false)}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Create family</Text>
        </View>
        <View style={styles.modalForm}>
          <Form values={["family_name"]} submit={createFamily}>
            <Input
              name="family_name"
              placeholder="family name"
              inputStyle={styles.input}
              validationFunction={validateFamilyName}
            />
            <Button
              text="create family"
              buttonStyle={styles.modalButton}
              textStyle={styles.buttonText}
            />
          </Form>
        </View>
      </Modal>
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
  input: {
    width: horizontalScale(240),
    height: horizontalScale(40),
    backgroundColor: Colors.lightGray,
  },
  modalTitle: {
    fontSize: horizontalScale(28),
  },
  modalButton: {
    width: horizontalScale(200),
    height: horizontalScale(40),
  },
  modalHeader: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modalForm: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },
});

export default GetFamily;
