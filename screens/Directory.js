
import React, { useEffect, useState } from 'react';
import { View, Button, Text, TouchableHighlight, FlatList, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { addData, dataListener, removeData } from '../database';
import Folder from '../components/Folder';
import { paper, screen, folderListItem } from './styles';


const FolderForm = (props) => {
    const [name, setName] = useState("");

    return (
        <View style={{ ...paper, minWidth: '85%', marginTop: 30 }} >
            <Text style={{ fontSize: 15, alignSelf: 'center' }}>Enter folder name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                clearButtonMode='always'
                style={{ borderWidth: 1, borderRadius: 8, fontSize: 15, padding: 8, marginVertical: 10, minWidth: '60%' }}
            />
            <View style={{ flexDirection: 'row' }}>
                <Button title="Submit" onPress={() => props.returnFunc(name)} />
                <Button title="Cancel" onPress={() => props.closeFunc()} />
            </View>
        </View >);

}


const Directory = ({ navigation }) => {
    const [showForm, setShowForm] = useState(false);
    const [folders, setFolders] = useState([]); // array for folders in the root directory

    useEffect(() => {
        dataListener('folders', async (snapshot) => {
            if (snapshot.exists()) setFolders((Object.values(snapshot.val())))
        })
    }, []);


    const checkFolderName = (folderName) => {
        if (folders.filter(item => item.name === folderName).length > 0) return false;
        return true;
    }

    const addFolder = (newName) => {

        if (checkFolderName(newName)) {
            setShowForm(false);
            const folder = new Folder(newName);
            folders.push(folder);
            addData('/', { folders });
        }
        else {
            alert("Folder with this name already exists.")
        }
    }

    const deleteFolder = (index) => {
        let path = 'Folders/' + index;
        removeData(path);
    }

    return (
        <View style={screen}>
            <View>
                {!showForm &&
                    <TouchableHighlight style={{ marginTop: 20 }} onPress={() => setShowForm(true)}>
                        <AntDesign name="addfolder" size={50} color="black" />
                    </TouchableHighlight>}
                {showForm && <FolderForm returnFunc={(name) => addFolder(name)} closeFunc={() => setShowForm(false)} />}
            </View>
            <FlatList
                data={folders}
                style={{ padding: 10, minWidth: '100%', marginLeft: 40, marginBottom: 40 }}
                renderItem={({ item, index }) =>
                    <View style={folderListItem}>
                        <TouchableHighlight onPress={(event) => navigation.navigate("Folder", { item, index })}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="folder1" size={50} color="black" />
                                <Text style={{ fontSize: 15 }}> {item.name}</Text>
                            </View>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ justifyContent: 'center', position: 'absolute', right: 10, marginTop: '5%' }}
                            onPress={() => deleteFolder(index)}
                        >
                            <AntDesign name="close" size={30} color="black" />
                        </TouchableHighlight>
                    </View>}
            />
        </View >
    );
};

export default Directory;