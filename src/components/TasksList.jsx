import { Button, RefreshControl, StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TaskServices } from '../services/TaskServices.js';
import { FlatList } from 'react-native-gesture-handler';

import TaskItem from './TaskItem.jsx';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);


    const getTasks = async () => {
        try {
            const tasksJson = await TaskServices.getAll()
            setTasks(tasksJson)
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getTasks()
    }, []);

    const [refreshing, setRefreshing] = useState(false);

    const handleRefreshing = useCallback(async () => {
        setRefreshing(true);
        getTasks()
        setRefreshing(false);
    })

    const navigation = useNavigation();

    const handleTaskClick = (taskItem) => {
        navigation.navigate('TaskForm', { task: taskItem });
    };

    const handleDeleteTask = useCallback(async (task) => {
        await TaskServices.delete({ taskId: task.id })
    }, [])

    const scrollReference = useRef(null)

    return (
        <View style={styles.container}>
            <View style={styles.containerList}>
                <FlatList
                    ref={scrollReference}
                    data={tasks}
                    ItemSeparatorComponent={() => (
                        <View
                            style={styles.separator}
                        />
                    )}
                    renderItem={({ item: taskItem }) => (
                        <TaskItem
                            task={taskItem}
                            goTo={() => handleTaskClick(taskItem)
                            }
                            handleDelete={handleDeleteTask}
                            simultaneousHandlers={scrollReference}
                        />
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefreshing}
                            colors={["#72f072"]}
                            progressBackgroundColor="#023d62"
                        />
                    }
                    style={{
                        paddingRight: 5,
                    }}
                />
                {/* <ScrollView style={{ flex: 1 }} ref={scrollReference}>
                    {tasks.map((task) =>
                        <TaskItem
                            task={task}
                            goTo={() => handleTaskClick(task)}
                            handleDelete={handleDeleteTask}
                            simultaneousHandlers={scrollReference}
                        />
                    )}
                </ScrollView> */}
            </View>

            <View style={styles.buttonContainer}>
                <Button title="Add Task" color="#886fe3" onPress={handleTaskClick} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        // backgroundColor: 'red',
    },
    containerList: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 0,
        paddingLeft: 10
    },
    separator: {
        // marginVertical: 10,
    },
    primaryButton: {
        borderRadius: 20,
    },
});

export default TaskList;
