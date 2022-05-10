
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import Timer from '../components/Timer';
import { paper, screen } from '../styles';




const Pomodoro = () => {
    const [isTask, setIsTask] = useState(false);
    const [startTimer, setStartTimer] = useState(false);


    return (
        <View style={screen}>
            <View style={{ ...paper, minHeight: '20%' }}>
                <Text style={{ fontSize: 18, fontWeight: '600', }}>Set your Pomodoro Timer</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button
                        onPress={() => {
                            setIsTask(true);
                            setStartTimer(true);
                        }}
                        title="Task" />
                    <Button
                        onPress={() => {
                            setIsTask(false);
                            setStartTimer(true);
                        }}
                        title="Break" />
                </View>
            </View>
            {startTimer && (
                <View style={paper}>
                    <Timer isTask={isTask} />
                    <Button title="Close" onPress={() => setStartTimer(false)} />
                </View>
            )}
        </View >
    );
};

export default Pomodoro;