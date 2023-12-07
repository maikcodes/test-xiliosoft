import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native"
import { CheckBox } from '@rneui/themed';
import { useEffect, useState } from "react";
import { TaskServices } from '../services/TaskServices.js';
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * .3

function TaskItem({ task, goTo, handleDelete, simultaneousHandlers }) {
    const [taskCompleted, setTaskCompleted] = useState(false);
    const sharedTranslateX = useSharedValue(0)
    const sharedItemHeight = useSharedValue(80)
    const sharedMarginVertical = useSharedValue(10)
    const sharedOpacity = useSharedValue(1)

    useEffect(() => {
        const taskChanged = () => {
            setTaskCompleted(task.status === 'complete')
        }
        taskChanged()
    }, []);

    const handleChangeStatus = (task) => {
        setTaskCompleted(!taskCompleted)
        const taskChanged = {
            ...task,
            status: taskCompleted ? 'incomplete' : 'complete'
        }
        TaskServices.save(taskChanged)
    }

    const panGesture = useAnimatedGestureHandler({
        onActive: (event) => {
            sharedTranslateX.value = event.translationX
        },
        onEnd: () => {
            const shouldBeDismissed = sharedTranslateX.value < TRANSLATE_X_THRESHOLD

            if (shouldBeDismissed) {
                sharedTranslateX.value = withTiming(-SCREEN_WIDTH)
                sharedItemHeight.value = withTiming(0)
                sharedMarginVertical.value = withTiming(0)
                sharedOpacity.value = withTiming(0, undefined, (isFinished) => {
                    if (isFinished) {
                        runOnJS(handleDelete)(task)
                    }
                })
            } else {
                sharedTranslateX.value = withTiming(0)
            }

        }
    })

    const rStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: sharedTranslateX.value,
            },
        ],
    }));


    const rIconContainerStyle = useAnimatedStyle(() => {
        const opacity = withTiming(sharedTranslateX.value < TRANSLATE_X_THRESHOLD ? 1 : 0)
        return { opacity }
    })

    const rTaskContainerStyle = useAnimatedStyle(() => ({
        height: sharedItemHeight.value,
        marginVertical: sharedMarginVertical.value,
        opacity: sharedOpacity.value
    }))


    return (
        <Animated.View key={task.id} style={[styles.taskContainer, rTaskContainerStyle]}>
            <Animated.View style={[styles.iconContainer, rIconContainerStyle]}>
                <Image source={require('../../assets/delete.png')} style={styles.icon} />
            </Animated.View>

            <PanGestureHandler onGestureEvent={panGesture} simultaneousHandlers={simultaneousHandlers}>
                <Animated.View style={[styles.task, rStyle, (taskCompleted ? styles.taskCompleted : styles.taskIncomplete)]}>
                    <TouchableOpacity onPress={goTo} style={styles.rowJustifyBetween}>
                        <CheckBox
                            containerStyle={styles.checkBox}
                            checked={taskCompleted}
                            onPress={() => handleChangeStatus(task)}
                            checkedColor="#454545"
                            uncheckedColor="#7b34ff"
                        />
                        <View style={styles.taskInfo}>
                            <Text style={taskCompleted ? styles.taskTextCompleted : styles.taskText} numberOfLines={2} ellipsizeMode="tail">{task.task}</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </PanGestureHandler>
        </Animated.View>
    );
}



const styles = StyleSheet.create({
    taskContainer: {
        width: '100%',
    },
    rowAlignedRight: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    rowJustifyBetween: {
        flex: 1,
        paddingLeft: 0,
        marginLeft: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    taskInfo: {
        flex: 1,
    },
    taskText: {
        flex: 1,
        textAlignVertical: 'center',
        paddingHorizontal: 10,
        fontSize: 14,
        // color: '#F4F5FB',
    },
    taskTextCompleted: {
        flex: 1,
        textAlignVertical: 'center',
        paddingHorizontal: 10,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        fontStyle: 'italic'
    },
    checkBox: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
        paddingRight: 0,
        margin: 0,
        // marginStart: 0,
        marginEnd: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 40,
        maxWidth: 40,
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
    },
    task: {
        width: '98%',
        height: 80,
        borderRadius: 10,
        // Shadow for iOS
        shadowOpacity: 0.08,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowRadius: 10,
        // Shadow for Android
        elevation: 5,
    },
    taskCompleted: {
        borderWidth: 2,
        paddingRight: 10,
        backgroundColor: '#dcdcdc',
        // backgroundColor: 'red',
        borderColor: '#454545',
    },
    taskIncomplete: {
        borderWidth: 2,
        paddingRight: 10,
        backgroundColor: '#eadeff',
        borderColor: '#7b34ff',
    },
    iconContainer: {
        height: 81,
        width: 81,
        // backgroundColor: 'red',
        position: 'absolute',
        right: '2%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopEndRadius: 10,
        borderBottomEndRadius: 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
});


export default TaskItem