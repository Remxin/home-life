import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home';
import LoginScreen from './screens/Login';
import AppRouter from './AppRouter';

const Stack = createStackNavigator();



function MainRouter() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="app_router" component={AppRouter} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainRouter