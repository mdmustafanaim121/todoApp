import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, ColorPropType, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function App() {

  const [todos, setTodo] = useState([
    { id: '1', task: "First Work", completed: true },
    { id: '2', task: "Second Work", completed: true },
    { id: '3', task: "Third Work", completed: false }
  ]);

  const [taskInput, setTaskInput] = useState('');

  const renderItem = ({ item }) => <Item task={item} />;


  const taskCompleted = taskId => {
    const newTodos = todos.map((item) => {
      if (item.id == taskId) {
        return { ...item, completed: true };
      }
      return item
    });
    setTodo(newTodos)
  }

  const taskDelete = taskId => {
    const newTodos = todos.filter(item => item.id != taskId);
    setTodo(newTodos)
  }


  const addTask = () => {

    if (taskInput == '') {
      Alert.alert("Error", "Please enter a task todo");
    }
    else {
      const newTask = {
        id: toString(Math.random()),
        task: taskInput,
        completed: false
      };
      setTodo([...todos, newTask]); //using a spread operator to add a new element to the list
      setTaskInput('');
    }
  }

  const clearAllTask = () => {
    Alert.alert('Warning', "Do you really want to clear All Tasks?", [{
      text: 'Yes',
      onPress: () => setTodo([])

    },
    { text: 'No' }
    ])
  }

  const Item = ({ task }) =>
  (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title, { textDecorationLine: task?.completed ? 'line-through' : 'none' }}>
          {task.task}</Text>
      </View>
      {
        !task?.completed && (<TouchableOpacity style={[styles.actionIcon]}>
          <Icon name="done" size={20} color={Colors.white} onPress={() => taskCompleted(task?.id)} />
        </TouchableOpacity>)
      }
      <TouchableOpacity style={[styles.actionIcon], { backgroundColor: 'red' }}>
        <Icon name="delete" size={20} color={Colors.white} onPress={() => taskDelete(task?.id)} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={styles.header}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: Colors.primary }}>ToDo App</Text>
        <Icon name="delete" size={25} color="red" onPress={clearAllTask} />
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem} />

      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Add ToDo"
            onChangeText={text => setTaskInput(text)}
            value={taskInput}
          />
        </View>
        <TouchableOpacity onPress={addTask} >
          <View style={styles.iconContainer}>
            <Icon name="add" color={Colors.white} size={30} />
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const Colors = { primary: '#1f145c', white: '#fff' };
const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      padding: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    footer: {
      position: 'absolute',
      bottom: 0,
      color: Colors.white,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20
    },
    inputContainer: {
      backgroundColor: Colors.white,
      elevation: 40,
      flex: 1,
      height: 50,
      marginVertical: 20,
      borderRadius: 30,
      paddingHorizontal: 20,
    },
    iconContainer: {
      height: 50,
      width: 50,
      backgroundColor: Colors.primary,
      borderRadius: 25,
      elevation: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    actionIcon: {
      height: 25,
      width: 25,
      backgroundColor: '#00ff00',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    item: {
      backgroundColor: '#D3D3D3',
      padding: 20,
      flexDirection: 'row',
      elevation: 12,
      borderRadius: 7,
      marginVertical: 10
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: Colors.primary,
    },
  });
