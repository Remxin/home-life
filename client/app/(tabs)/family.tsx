import { StyleSheet, View, Text } from 'react-native';

import PageView from '@/components/PageView';
import SimpleButton from '@/components/SimpleButton';

import { useStoreSelector } from '@/redux/store';


export default function TabTwoScreen() {
  const family_details = useStoreSelector(state => state.family)
  console.log(family_details)

  return (
    <PageView>
      <View style={styles.members}>
        <Text>{family_details.family.name}</Text>
        <Text>Members</Text>
      </View>
      <View style={styles.manage}>
        <SimpleButton text="Add members" onPress={() => null}/>
      </View>
    </PageView>
  );
}

const styles = StyleSheet.create({
  members: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  manage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
