import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextStyle,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from "react-native";
import React, { useMemo, useState } from "react";
import { useForm } from "@/components/forms/Form";

import { Colors } from "@/constants/colors";
import { horizontalScale } from "@/utils/metrics";

type ComponentT = {
  name: string;
  placeholder?: string;
  secure?: boolean;
  inputStyle?: TextStyle;
  containerStyle?: TextStyle;
  validationFunction?: (arg1: string, ...args: any[]) => string;
};

const Input = ({
  name,
  inputStyle,
  containerStyle,
  secure = false,
  placeholder = "",
  validationFunction = () => "",
}: ComponentT) => {
  const { getValue, setValue, setError, errors } = useForm();
  const [selected, setSelected] = useState(false);

  const inputStateStyles = useMemo(() => {
    const ret = {
      borderColor: "",
      borderWidth: 2,
    };
    if (errors[name]) {
      ret.borderColor = Colors.red;
      return ret;
    }

    if (selected) {
      ret.borderColor = Colors.mediumDark;
      return ret;
    }
    ret.borderWidth = 0;
    return ret;
  }, [errors, selected]);

  function onBlur() {
    setSelected(false);
    const currentValue = getValue(name);
    if (!currentValue) {
      setError(name, "");
      return;
    }
    let err = validationFunction(currentValue);
    if (err) {
      setError(name, err);
    } else {
      setError(name, "");
    }
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {errors[name] ? (
        <Text style={styles.inputError}>{errors[name]}</Text>
      ) : null}
      {selected && !errors[name] ? (
        <Text style={styles.inputSelectedPlaceholder}>{placeholder}</Text>
      ) : null}
      <TextInput
        autoCapitalize="none"
        placeholder={placeholder}
        onChangeText={(e) => setValue(name, e)}
        secureTextEntry={secure}
        style={[inputStyle, styles.input, inputStateStyles]}
        onFocus={() => setSelected(true)}
        onBlur={() => onBlur()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  error: {},
  input: {
    borderRadius: 10,
    fontSize: 10,
    paddingLeft: 10,
  },

  inputError: {
    color: Colors.red,
    position: "absolute",
    top: horizontalScale(-14),
    fontSize: horizontalScale(8),
  },
  inputSelectedPlaceholder: {
    color: Colors.mediumDark,
    position: "absolute",
    top: horizontalScale(-14),
    fontSize: horizontalScale(8),
  },

  secureIconButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    right: 10,
  },
});

export default Input;
