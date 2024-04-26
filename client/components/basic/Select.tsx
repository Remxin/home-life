import { View, Text, TouchableNativeFeedback, Touchable } from 'react-native'
import React, { useState } from 'react'

import FullScreenModal from './FullScreenModal'
import { TextStyle } from 'react-native'

type ComponentT = {
    placeHolder: string
    items: {
        label: string
        value: string
    }[],
    onValueChange: (value: string) => any,
    style?: TextStyle

}

const Select = ({ items, placeHolder, onValueChange, style }: ComponentT) => {
    const [clicked, setClicked] = useState(false)
  return (
    <>
      <FullScreenModal visible={clicked} setVisible={setClicked}>
        <Text>
            {items.map((item, i) => (
                <TouchableNativeFeedback key={i} onPress={() => {
                    onValueChange(item.value)
                    setClicked(false)
                }}><Text>{item.label}</Text></TouchableNativeFeedback>
            ))}
        </Text> 
      </FullScreenModal>
    <TouchableNativeFeedback onPress={() => setClicked(true)} style={style}>
      <Text>{placeHolder}</Text>
    </TouchableNativeFeedback>
    
    </>
  )
}


export default Select