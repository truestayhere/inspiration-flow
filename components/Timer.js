import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

// https://upmostly.com/tutorials/how-to-react-native-timer - followed tutorual

export default function Timer(props) {
    // 1 sec = 1000
    // 20 min = 1200000 
    // 5 min = 300000 
    const time = (props.isTask === true) ? 1200000 : 300000;
    const [curTime, setCurTime] = useState(moment.utc(0).format("mm:ss"));
    let pomodoroInterval;
    let count = 1000;


    useEffect(() => {
        pomodoroInterval = setInterval(() => {
            setCurTime(moment.utc(count).format("mm:ss"))
            count += 1000;

            if (count > time) {
                clearInterval(pomodoroInterval);
                alert("Timer has ended!")
            }
        }, 1000);
    }, []);


    return (<View>
        <View>
            <Text style={{ fontSize: 40 }}>{curTime}</Text>
        </View>
    </View>);

};