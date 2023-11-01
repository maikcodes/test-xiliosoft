import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const TodoList = () => {
    const [task, setTask] = useState('');
    const [editTask, setEditTask] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddTask = () => {
        if (task) {
            setTaskList([...taskList, task]);
            setTask('');
        }
    };

    const handleSaveEditTask = () => {
        if (editTask && editIndex !== null) {
            const updatedTaskList = [...taskList];
            updatedTaskList[editIndex] = editTask;
            setTaskList(updatedTaskList);
            setEditIndex(null);
            setEditTask('');
        }
    };

    const handleEditTask = (index) => {
        setEditTask(taskList[index]);
        setEditIndex(index);
    };

    const handleDeleteTask = (index) => {
        const updatedTaskList = [...taskList];
        updatedTaskList.splice(index, 1);
        setTaskList(updatedTaskList);
    };

    const renderTask = ({ item, index }) => (
        <View key={index} style={styles.containerTask}>
            <Text style={styles.taskItem}>{item}</Text>
            {editIndex === index ? (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Task Name"
                        value={editTask}
                        onChangeText={(text) => setEditTask(text)}
                    />
                    <Button
                        title="Save"
                        onPress={handleSaveEditTask}
                        color="#886fe3" />
                </View>
            ) : null}
            <Button title="Edit" onPress={() => handleEditTask(index)} color="#886fe3" />
            <Button title="Delete" onPress={() => handleDeleteTask(index)} color="#f34040" />
        </View>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="New task"
                value={task}
                onChangeText={(text) => setTask(text)}
            />
            <Button title="Save task" onPress={handleAddTask} color="#886fe3" />

            <FlatList
                data={taskList}
                renderItem={renderTask}
                ItemSeparatorComponent={() => (
                    <View
                        style={styles.separator}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5fd',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#663ec3',
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderColor: '#dddbf9',
    },
    taskItem: {
        fontSize: 18,
        marginBottom: 5,
    },
    containerTask: {
        borderWidth: 1,
        borderColor: '#c4bef4',
        padding: 20,
        backgroundColor: '#f5f5fd',
    },
    separator: {
        borderBottomColor: '#c4bef4',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 10,
    },
});

export default TodoList;
