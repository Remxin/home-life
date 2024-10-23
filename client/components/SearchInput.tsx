import {
  View,
  Text,
  TextInput,
  NativeSyntheticEvent,
  TextInputTextInputEventData,
} from "react-native";
import { useState, useMemo, useRef, useEffect } from "react";

type SearchInputT<R> = {
  searchDelay: number;
  placeholder: string;
  searchFunc: (text: string) => Promise<R[]>;
  OutputComponent: React.ComponentType<{ data: R }>;
  minTextLen?: number;
};

const SearchInput = <R,>({
  searchDelay,
  placeholder,
  searchFunc,
  OutputComponent,
  minTextLen = 0,
}: SearchInputT<R>) => {
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [response, setResponse] = useState<R[]>([])
  let delayTImeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const searchFor = async () => {
        console.log(searchText)
        const res = await searchFunc(searchText)
        setResponse(res)
    }
    if (searchText.length >= minTextLen) searchFor()
  }, [searchText])
 

  function onTextInput(e: string) {
    setInputText(e)
    if (e.length < minTextLen) {
        setResponse([])
        setSearchText("")
        return
    }
    if (delayTImeout.current) clearTimeout(delayTImeout.current);
    delayTImeout.current = setTimeout(() => {
      setSearchText(e);
    }, searchDelay * 1000);
  }
  return (
    <View>
      <TextInput autoCapitalize="none" placeholder={placeholder} onChangeText={onTextInput} value={inputText} />
      <View>
        {response.map((e, i) => (<OutputComponent key={i +""} data={e}/>))}
      </View>
    </View>
  );
};

export default SearchInput;
