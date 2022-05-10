
import { View, ScrollView } from 'react-native';
import { viewFileContent } from '../styles';


const FileContent = (props) => {
    const text = props.content;

    return (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
            <ScrollView
                style={viewFileContent}
            >{text}</ScrollView>
        </View >
    )


}


export default FileContent;