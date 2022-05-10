import { useState } from 'react';
import { View, Button } from 'react-native';
import { paper } from '../styles';
import { AutoGrowingTextInput } from 'react-native-autogrow-textinput';


const TextEditor = (props) => {
    const [text, setText] = useState(props.content);

    return (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Button title='Save' onPress={() => { props.returnFunc(text) }} />
            <AutoGrowingTextInput
                style={{ ...paper, fontSize: 15, minWidth: '150%', minHeight: 300 }}
                placeholder={'INSERT YOUR TEXT'}
                value={text}
                onChangeText={setText}
            />
        </View>
    )


}


export default TextEditor;