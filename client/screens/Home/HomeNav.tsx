import { View, Text } from 'react-native'
import { useState } from 'react'
import { StyleSheet } from 'react-native'

// components
// import Select from 'react-native-picker-select';
import Select from '../../components/basic/Select';
import FullScreenModal from '../../components/basic/FullScreenModal';

// icons
import Icon from 'react-native-vector-icons/AntDesign';

// constants 
import colors from '../../constants/colors'
import Button from '../../components/basic/Button';

const HomeNav = () => {
  const [addTask, setAddTask] = useState(false)
  const [displayMode, setDisplayMode] = useState("month")
  return (
    <>
    <View style={styles.navbar}>
      <Select placeHolder={displayMode} onValueChange={setDisplayMode} items={[ { label: "Month", value: "month"}, { label: "Week", value: "week" }]}/>
      <Button onPress={() => setAddTask(true)} styles={styles.addTaskButton}>
        <Icon name="pluscircleo"/>
      </Button>
    </View>

    <FullScreenModal visible={addTask} setVisible={setAddTask}>
      <Text>Modal</Text>
    </FullScreenModal>
    </>
  )
}

const styles = StyleSheet.create({
    navbar: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 25,
        height: 80,
        backgroundColor: colors.pink
    },

    displaySelect: {
      flex: 3
    },

    addTaskButton: {
      flex: 1
    }

})

export default HomeNav