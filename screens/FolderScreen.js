import React, { useState, useEffect } from 'react';
import { View, Button, Text, FlatList, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AntDesign } from '@expo/vector-icons';
import { updateData, dataListener } from '../database';
import { ScrollView } from 'react-native-gesture-handler';
import File from '../components/File';
import { launchImageLibrary } from 'react-native-image-picker';


const fileTypes = [
    'text',
    'photo',
    'video'
]

const FileForm = (props) => {
    const [name, setName] = useState("");
    const [selectedType, setSelectedType] = useState(fileTypes[0]);

    return (
        <View>
            <Text>Enter file name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                clearButtonMode='always'
            />
            <Text>Choose file type:</Text>
            <Picker
                selectedValue={selectedType}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedType(itemValue)
                }>
                {fileTypes.map((item, index) => <Picker.Item key={index} label={item} value={item} />)}
            </Picker>
            <Button title="Submit" onPress={() => props.returnFunc(name, selectedType)} />
        </View>);

}


const FolderScreen = ({ route, navigation }) => {
    const [showForm, setShowForm] = useState(false);
    const [files, setFiles] = useState([]); // array for files in the folder


    useEffect(() => {
        dataListener('folders/' + route.params.index + '/files', async (snapshot) => {
            if (snapshot.exists()) setFiles((Object.values(snapshot.val())))
        })
    }, []);


    const openTextEditor = () => {

    }


    const checkFileName = (fileName) => {
        if (files.length < 1) return true;
        if (files.filter(item => item.name === fileName).length > 0) return false;
        return true;
    }

    const addFile = (newName, type) => {
        if (checkFileName(newName)) {
            setShowForm(false);
            const file = new File(newName, type);
            if (type === 'photo') launchImageLibrary((img) => file.content = img);
            else if (type === 'video') launchImageLibrary((vid) => file.content = vid);
            else openTextEditor();
            files.push(file);
            updateData('folders/' + route.params.index, { files });
        }
        else {
            alert("File with this name already exists.")
        }
    }

    return (
        <View>
            <FlatList
                data={files}
                renderItem={({ item, index }) =>
                    <View>
                        <AntDesign name="file1" size={24} color="black" />
                        <Text>{item.name}</Text>
                    </View>}
            />
            <ScrollView>
                <Button title='Add file' onPress={() => setShowForm(true)} />
                {showForm && <FileForm returnFunc={(name, type) => addFile(name, type)} />}
            </ScrollView>
        </View>
    );
};

export default FolderScreen;