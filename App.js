import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import FolderScreen from './screens/FolderScreen';

// https://reactnavigation.org/docs/nesting-navigators/ - followed tutorial 

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Folder" component={FolderScreen} />
      </Stack.Navigator>
    </NavigationContainer >
  );
}



export default App;
