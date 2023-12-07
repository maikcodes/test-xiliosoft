import { View, Text, Modal, Pressable, Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { TaskContext } from '../context/TaskContext';
import { useContext } from 'react';


function CustomModal({ modalVisible, closeModal}) {
    const { task, setTask } = useContext(TaskContext)

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    closeModal();
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput placeholder={task.task} onPress={() => { }}></TextInput>
                        <TouchableOpacity><Text>Status</Text></TouchableOpacity>
                        <View style={styles.separator} />
                        <View style={styles.separator} />
                        <View style={styles.separator} />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={closeModal}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    separator: {
        borderBottomColor: '#ececfb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 5,
        marginBottom: 5,
    },
});


export default CustomModal