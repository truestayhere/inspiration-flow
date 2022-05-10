import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { paper, screen } from '../styles';



const Title = ({ navigation }) => {
    const [quote, setQuote] = useState("Loading..."); // state for the quote 
    const [showQuote, setShowQuote] = useState(false);

    const setQuoteArr = (arr) => {
        setQuote(`${arr[0].quote}  ${arr[0].author}`);
    }

    const getQuote = () => {
        setShowQuote(true);
        fetch('https://quotes.rest/qod?category=inspire&language=en') // get the quote of the day 
            .then(response => response.json())
            .then(data => setQuoteArr(data.contents.quotes))
            .catch(error => { alert('Error', error); })
    }

    return (
        <View style={screen}>
            <View style={paper}>
                <Text style={{ fontSize: 18, fontWeight: '600', }}>Welcome to InspirationFlow!</Text>
            </View>
            <View style={paper}>
                {!showQuote && <Button title="load quote" onPress={() => { getQuote() }} />}
                {showQuote && <Text>{quote}</Text>}
            </View>
        </View>
    );
};

export default Title;
