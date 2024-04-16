import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/Home';

const Tab = createBottomTabNavigator();

function AppRouter() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="home" component={HomeScreen}/>
    </Tab.Navigator>
  );
}

export default AppRouter