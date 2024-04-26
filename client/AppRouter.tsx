import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/AntDesign"

import HomeScreen from './screens/Home/HomeScreen';
import AddRecipe from './screens/AddRecipe';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();

const ICON_SIZE = 24

function AppRouter() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, tabBarIcon: () => <Icon name="home" size={ICON_SIZE}/>}}/>
        <Tab.Screen name="New recipe" component={AddRecipe} options={{ headerShown: false, tabBarIcon: () => <Icon name="book" size={ICON_SIZE}/> }}/>
        <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false, tabBarIcon: () => <Icon name="user" size={ICON_SIZE}/> }}/>
    </Tab.Navigator>
  );
}

export default AppRouter