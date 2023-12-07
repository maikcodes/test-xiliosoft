import { Image, StyleSheet } from 'react-native';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import EmployeesList from './EmployeesList';
import TaskList from './TasksList';

const Tab = createBottomTabNavigator();

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                },
                tabBarActiveBackgroundColor: '#a799ec'
            }}
        >
            <Tab.Screen name='Home' component={EmployeesList}
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../../assets/employee.png')} style={styles.icon} ></Image>
                    ),
                    tabBarShowLabel: false,
                }}
            />
            <Tab.Screen name='TaskList' component={TaskList}
                options={{
                    tabBarIcon: () => (
                        <Image source={require('../../assets/task.png')} style={styles.icon} ></Image>
                    ),
                    tittle: 'Tasks',
                    tabBarShowLabel: false,
                }}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30,
    },
});

export default Tabs;