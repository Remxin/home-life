import { View, Text, StyleSheet, TouchableHighlight, Modal } from 'react-native'
import React, { Dispatch} from 'react'
import colors from '../../constants/colors'
import { TouchableOpacity } from 'react-native-gesture-handler'


type ComponentT = {
    children: React.ReactNode | React.ReactNode[]
    visible: boolean
    setVisible: Dispatch<boolean>
}

const FullScreenModal = ({ children, visible, setVisible }: ComponentT) => {
    if (!visible) return <></>
  return (
    <Modal presentationStyle="fullScreen" animationType="fade" onDismiss={() => setVisible(false)} onRequestClose={() => setVisible(false)}>
        <View style={styles.background}>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
    background: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        width: "100%",
        height: "100%",  
        backgroundColor: colors.beige,
        opacity: 0.7
    
    },
    button: {
        flex: 1,
        backgroundColor: colors.shadedWhite
    },
    content: {
        width: "80%",
        aspectRatio: 1 / 1.2,
        backgroundColor: colors.darkBeige,
        borderRadius: 6
    }
})

export default FullScreenModal