import { View, Button, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TaskServices } from '../services/TaskServices';

const TaskForm = ({ navigation, route }) => {
  const [task, setTask] = useState({
    id: '',
    task: '',
    status: ''
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {

    if (route.params && route.params.task.id) {
      setEditing(true);

      const loadTask = (taskToLoad) => {
        setTask({ id: taskToLoad.id, task: taskToLoad.task, status: taskToLoad.status });
      }

      loadTask(route.params.task)
    }

  }, []);

  const handleDataChange = (value, field) => {
    setTask({ ...task, [field]: value });
  }

  const handleSave = async (task) => {
    await TaskServices.save(task)
    navigation.navigate('TaskList')
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          placeholder='Write your task here'
          value={task.task}
          onChangeText={(text) => handleDataChange(text, 'task')}
          style={styles.input}
          multiline
          numberOfLines={4}
          autoFocus={true}
        />
      </View>
      <View style={styles.formActions}>
        <View style={styles.formActionButton}>
          <Button title={editing ? 'Save' : 'Create task'} color="#886fe3" onPress={() => handleSave(task)} />
        </View>
        <View style={styles.formActionButton}>
          <Button title="Cancel" color="#886fe3" onPress={() => handleSave(task)} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ededed',
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderColor: '#dddbf9',
  },
  form: {
    flex: 1,
    // backgroundColor: 'red'
  },
  formActions: {
    paddingBottom: 10,
    paddingTop: 20,
  },
  formActionButton: {
    paddingVertical: 5,
  }
})

export default TaskForm