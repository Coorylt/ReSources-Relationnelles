import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategorysPage from '../components/Category/CategoryPage';
import Resources from '../screens/Resources/Resources';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Categories">
                <Stack.Screen name="Categories" component={CategorysPage} />
                <Stack.Screen name="Resources" component={Resources} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
