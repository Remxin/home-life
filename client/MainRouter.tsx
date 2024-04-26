import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Home/HomeScreen';
import AppRouter from './AppRouter';

// Auth
import RegisterScreen from './screens/Auth/Register';
import LoginScreen from './screens/Auth/Login';

const Stack = createStackNavigator();



function MainRouter() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="app_router" component={AppRouter} options={{ headerShown: false }}/>
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="register" component={RegisterScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainRouter