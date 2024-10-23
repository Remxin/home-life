import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import PageView from "@/components/PageView";
import SimpleButton from "@/components/SimpleButton";
import Circle from "@/components/Circle";
import SearchInput from "@/components/SearchInput";
import Modal from "@/components/Modal";

import GrpcGatewayClient from "@/utils/grpcClient";

import { useStoreSelector } from "@/redux/store";
import { horizontalScale } from "@/utils/metrics";
import { Colors } from "@/constants/colors";
import { User } from "@/types/db.t";

function UserComponent({data}: {data: User}) {
  return (
    <View key={data.id} style={styles.memberCard}>
      <Circle
        size={horizontalScale(35)}
        color="brightWhite"
        style={styles.memberCircle}
      >
        <Ionicons name="person" size={horizontalScale(20)} />
      </Circle>
      <View>
        <Text style={styles.memberName}>{data.name}</Text>
        <Text style={styles.memberEmail}>{data.email}</Text>
      </View>
    </View>
  );
}

export default function TabTwoScreen() {
  const family_details = useStoreSelector((state) => state.family);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);

  async function userSearchFunction(text: string) {
    const [error, response] = await GrpcGatewayClient.getUsersByEmail(text)
    console.log(error, response)
    if (error || !response.users) return []
    return response.users
  }

  return (
    <PageView color="brightWhite">
      <View style={styles.familyContainer}>
        <View style={styles.familyName}>
          <Circle
            size={horizontalScale(200)}
            color="brightWhite"
            style={styles.circle}
          >
            <Text style={styles.familyNameText}>
              {family_details.family.name}
            </Text>
            <Image
              source={require("@/assets/images/penguin_family.png")}
              style={styles.familyImage}
            />
          </Circle>
          <View key="member count" style={styles.infoContainer}>
            <View style={styles.infoCard}>
              <Circle
                size={horizontalScale(40)}
                color="brightWhite"
                style={styles.infoCircle}
              >
                <Ionicons name="people" size={horizontalScale(24)} />
              </Circle>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoTitle}>Members</Text>
                <Text style={styles.infoDescription}>
                  {family_details.members.length}
                </Text>
              </View>
            </View>
            <View key="owner" style={styles.infoCard}>
              <Circle
                size={horizontalScale(40)}
                color="brightWhite"
                style={styles.infoCircle}
              >
                <Ionicons name="person" size={horizontalScale(24)} />
              </Circle>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoTitle}>Owner</Text>
                <Text style={styles.infoDescription}>
                  {
                    family_details.members.find(
                      (e) => e.id === family_details.family.owner_id
                    )?.name
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.manage}>
        <Text style={styles.manageTitle}>Members</Text>
        <ScrollView
          horizontal={false}
          showsVerticalScrollIndicator={false}
          style={styles.membersScroll}
        >
          {family_details.members.map((member) => (
            <UserComponent data={member}/>
          ))}
        </ScrollView>
        <View style={styles.actions}>
          <SimpleButton
            text="Add members"
            onPress={() => setShowAddMembersModal(true)}
            buttonStyle={styles.addButton}
            textStyle={styles.addButtonText}
          />
        </View>
      </View>
      <Modal
        style={{ width: "80%", height: "80%" }}
        visible={showAddMembersModal}
        setVisible={setShowAddMembersModal}
      >
        <View>
          <Text>Add members</Text>
          <Text>type member email to search for a member</Text>
          <Text>*user must be verified to appear in the search</Text>
        </View>
        <View>
          <SearchInput
            placeholder="email"
            minTextLen={3}
            searchDelay={0.5}
            searchFunc={userSearchFunction}
            OutputComponent={UserComponent}
          />
        </View>
      </Modal>
    </PageView>
  );
}

const styles = StyleSheet.create({
  familyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  familyName: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(14),
    marginTop: "5%",
    width: "95%",
    backgroundColor: Colors.mediumLight + "aa",
    borderColor: Colors.mediumLight + "cc",
    shadowColor: Colors.mediumLight,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderRadius: horizontalScale(10),
  },
  familyImage: {
    width: horizontalScale(80),
    height: horizontalScale(80),
  },
  familyNameText: {
    fontSize: horizontalScale(30),
    fontWeight: "bold",
  },
  membersCount: {
    fontSize: horizontalScale(20),
    color: Colors.lightGray,
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: horizontalScale(10),
    flexDirection: "row",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: horizontalScale(150),
    height: horizontalScale(50),
    fontSize: horizontalScale(20),
    borderRadius: horizontalScale(8),
    backgroundColor: Colors.mediumLight + "ff",
    padding: horizontalScale(5),
    shadowColor: Colors.mediumDark,
    shadowOpacity: 0.2,
  },
  infoCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  infoTextWrapper: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 2,
  },
  infoTitle: {
    color: Colors.darkGray,
    fontSize: horizontalScale(16),
  },
  infoDescription: {
    flex: 1,
    fontSize: horizontalScale(12),
    color: Colors.dark,
  },
  manage: {
    flex: 1,
    padding: horizontalScale(35),
    justifyContent: "center",
    paddingBottom: 10,
  },
  manageTitle: {
    color: Colors.mediumDark,
    fontSize: horizontalScale(30),
  },
  membersScroll: {
    flex: 1,
    padding: horizontalScale(2),
    gap: horizontalScale(2),
  },
  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    height: horizontalScale(50),
    gap: horizontalScale(10),
    backgroundColor: Colors.white + "77",
    padding: horizontalScale(8),
  },
  memberCircle: {
    alignItems: "center",
    justifyContent: "center",
  },
  memberName: {
    fontSize: horizontalScale(16),
  },
  memberEmail: {
    fontSize: horizontalScale(12),
    color: Colors.dark,
  },
  actions: {
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    width: horizontalScale(200),
    height: horizontalScale(40),
    backgroundColor: Colors.mediumDark,
  },
  addButtonText: {
    fontSize: horizontalScale(18),
    color: Colors.brightWhite,
  },
});
