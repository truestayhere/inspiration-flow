import React, { useState, useEffect } from 'react';
import { View, Button, Text, FlatList, TextInput, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { updateData, dataListener, removeData } from '../database';
import File from '../components/File';
import { paper, screen, folderListItem } from '../styles';
import TextEditor from '../components/TextEditior';
import FileContent from '../components/FileContent';


const FileForm = (props) => {
    const [name, setName] = useState(""); // state for the file name 

    return (
        <View style={{ ...paper, minWidth: '100%', marginTop: 30 }}>
            <Text style={{ fontSize: 15, alignSelf: 'center' }}>Enter file name:</Text>
            <TextInput
                value={name}
                onChangeText={setName}
                clearButtonMode='always'
                style={{ borderWidth: 1, borderRadius: 8, fontSize: 15, padding: 8, marginVertical: 10, minWidth: '60%' }}
            />
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Button title="Submit" onPress={() => props.returnFunc(name)} />
                <Button title="Cancel" onPress={() => props.closeFunc()} />
            </View>
        </View>);

}


const FolderScreen = ({ route, navigation }) => {
    const [showForm, setShowForm] = useState(false);
    const [files, setFiles] = useState([]); // array for files in the folder
    const [fileIndex, setFileIndex] = useState(); // state for the index of the file 
    const [showEditor, setShowEditor] = useState(false);
    const [showContent, setShowContent] = useState(false);


    useEffect(() => {
        dataListener('folders/' + route.params.index + '/files', async (snapshot) => {
            if (snapshot.exists()) setFiles((Object.values(snapshot.val())))
        })
    }, []);


    const deleteFile = (fileIndex) => {
        let path = 'folders/' + route.params.index + '/files/' + fileIndex;
        removeData(path);
    }


    const checkFileName = (fileName) => {
        if (files.length < 1) return true;
        if (files.filter(item => item.name === fileName).length > 0) return false;
        return true;
    }

    const addFile = (newName) => {
        if (checkFileName(newName)) {
            setShowForm(false);
            const file = new File(newName);
            files.push(file);
            updateData('folders/' + route.params.index, { files });
        }
        else {
            alert("File with this name already exists.")
        }
    }

    const editFile = (index) => {
        setFileIndex(index);
        setShowEditor(true);
    }

    const saveChanges = (text) => {
        setShowEditor(false);
        files[fileIndex].content = text;
        updateData('folders/' + route.params.index, { files });
    }

    const showFileContent = (index) => {
        setFileIndex(index);
        setShowContent(true);
    }


    return (
        <View style={screen}>
            <View>
                {!showForm && !showEditor && !showContent &&
                    <TouchableHighlight style={{ marginTop: 20 }} onPress={() => setShowForm(true)}>
                        <AntDesign name="addfile" size={50} color="black" />
                    </TouchableHighlight>}
                {showForm && !showEditor && <FileForm returnFunc={(name, type) => addFile(name, type)} closeFunc={() => setShowForm(false)} />}
            </View>
            {showEditor && !showContent &&
                <View style={{ alignItems: 'center' }}>
                    <TextEditor returnFunc={(text) => saveChanges(text)} content={files[fileIndex].content} />
                    <Button title='Cancel'
                        onPress={() => setShowEditor(false)} />
                </View>
            }
            {showContent && !showEditor &&
                < View style={{ alignItems: 'center' }}>
                    <FileContent content={files[fileIndex].content} />
                    <Button title='Cancel'
                        onPress={() => setShowContent(false)} />
                </View>}
            <FlatList
                data={files}
                style={{ padding: 10, minWidth: '100%', marginLeft: 40, marginBottom: 40 }}
                renderItem={({ item, index }) =>
                    <View style={folderListItem}>
                        <TouchableHighlight onPress={() => showFileContent(index)}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AntDesign name="file1" size={50} color="black" />
                                <Text style={{ fontSize: 15 }}> {item.name}</Text>
                            </View>
                        </TouchableHighlight>
                        <View style={{ justifyContent: 'center', position: 'absolute', right: 10, top: '30%', flexDirection: 'row' }}>
                            <TouchableHighlight
                                onPress={() => editFile(index)}
                            >
                                <AntDesign name="edit" size={30} color="black" />
                            </TouchableHighlight>
                            <TouchableHighlight
                                onPress={() => deleteFile(index)}
                            >
                                <AntDesign name="close" size={30} color="black" />
                            </TouchableHighlight>
                        </View>
                    </View>}
            />
        </View >
    );

};

export default FolderScreen;