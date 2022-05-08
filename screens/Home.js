import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Title from './Title';
import Directory from './Directory';
import Pomodoro from './Pomodoro';



const Home = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Title" component={Title} />
            <Tab.Screen name="Directory" component={Directory} />
            <Tab.Screen name="Pomodoro" component={Pomodoro} />
        </Tab.Navigator>
    );
}

export default Home;
