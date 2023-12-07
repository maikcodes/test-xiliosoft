import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import TaskForm from '../screens/TaskForm.jsx';
import Tabs from './Tabs.jsx';


const Stack = createStackNavigator();


const Main = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: "#886fe3",
                },
                headerTintColor: 'white',
                headerBackTitle: 'Back',
            }}>
                <Stack.Screen name='App' component={Tabs} />
                <Stack.Screen name='TaskForm' component={TaskForm} options={{ title: 'Task' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Main