import React, { useEffect, useState } from 'react';
import { View, Button, Text } from 'react-native';
import { paper, screen } from './styles';



const Title = ({ navigation }) => {
    const [quote, setQuote] = useState("Loading...");


    const getQuote = () => {
        fetch('https://quotes.rest/qod?category=inspire&language=en') // get the quote of the day 
            .then(response => response.json())
            .then(data => setQuote(data.contents.quotes.quote))
            .catch(error => { alert('Error', error); })
        console.log(quote);
    }

    return (
        <View style={screen}>
            <View style={paper}>
                <Text style={{ fontSize: 18, fontWeight: '600', }}>Welcome to InspirationFlow!</Text>
            </View>
            <View style={paper}>
                <Button title="load quote" onPress={() => { getQuote() }} />
                <Text>{quote}</Text>
            </View>
        </View>
    );
};

export default Title;
