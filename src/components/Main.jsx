import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { View, Image, StyleSheet } from 'react-native';

import EmployeesList from './EmployeesList';
import TodoList from './TodoList';

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <View style={{ flexGrow: 1 }}>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Employees List"
                        component={EmployeesList}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/employee.png')} style={styles.icon} ></Image>
                            ),
                        }}
                    />
                    <Tab.Screen
                        name="Todo List"
                        component={TodoList}
                        options={{
                            tabBarIcon: () => (
                                <Image source={require('../../assets/task.png')} style={styles.icon} ></Image>
                            ),
                        }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </View >
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
});

export default Main