import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, Picker, View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Switch, Paragraph, Button, TextInput, Title, Snackbar } from 'react-native-paper';

import * as actions from '../actions';
import { useSelector, useDispatch } from 'react-redux';

const Stack = createStackNavigator();

const AggressionReport = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [description, setDescription] = useState('');
    const [campus, setCampus] = useState('');

    const aggressionReports = useSelector(state => state.aggressionReports);
    const dispatch = useDispatch();
    const saveAggressionReport = aggression => dispatch(saveAggressionReport(aggression));

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    function onSaveNote() {
        navigation.state.params.addNote({ noteTitle, noteValue })
        navigation.goBack()
    }

    return (
        // <View style={styles.container}>
        <KeyboardAvoidingView 
            behavior="padding" 
            style={styles.container} 
            keyboardVerticalOffset={500}> 
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>

                <View style={styles.reportComponent}>
                    <Title style={styles.aggressionText}>
                        MICROAGGRESSION REPORT
                    </Title>
                </View>

                <View style={styles.reportComponent}>
                    <Text>
                        Time of incident
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Button onPress={showDatepicker} title="Date">
                                Date
                            </Button>
                            {/* <TextInput onPress={showDatepicker} style={{}} /> */}
                        </View>
                        <View>
                            <Button onPress={showTimepicker} title="Time">
                                Time
                            </Button>
                        </View>
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onDateChange}
                        />
                    )}
                </View>

                <View style={styles.reportComponent}>
                    <TextInput
                        value={description}
                        onChangeText={description => setDescription(description)}
                        label='Description'
                        placeholder="Describe what happened..."
                        multiline={true}
                        mode='outlined'
                        style={{
                            // alignSelf: 'stretch',
                            // borderWidth: 1,
                            // borderColor: '#000',
                            // borderRadius: 5,
                            height: 150,
                            textAlignVertical: "top",
                            // paddingVertical: 20,
                            // paddingHorizontal: 5,
                            // minHeight: 100,
                            // fontSize: 18,
                        }}
                        numberOfLines={8} />
                </View>

                <View style={styles.reportComponent}>
                    <Text style={{ marginBottom: 0, paddingBottom: 0 }}>
                        Campus
                    </Text>
                    <Picker
                        mode='dropdown'
                        style={{ marginTop: 0, paddingTop: 0 }}
                        selectedValue={campus}
                        onValueChange={(itemValue, itemIndex) => setCampus(itemValue)}>
                        <Picker.Item label="SF State" value="sfsu" />
                        <Picker.Item label="SJSU" value="sjsu" />
                    </Picker>
                </View>

                <View
                    style={{
                        borderBottomColor: '#e3e3e3',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                        justifyContent: 'space-evenly',
                    }}
                />

                <View >
                    <View >
                        <Text>
                            Toggle theme
                        </Text>
                        <Switch
                            // onValueChange={
                            //   this.toggleTheme
                            // }
                            // value={ this.state.darkTheme }
                            trackColor='#DEDEDE'
                        />
                    </View>
                    <Title>
                        Sign up to our newsletter!
                    </Title>
                    <Paragraph>
                        Get a monthly dose of fresh React Native Paper news straight to your mailbox. Just sign up to our newsletter and enjoy!
                    </Paragraph>
                    <TextInput
                        style={{ marginTop: 15 }}
                        label='Outlined input'
                        mode='outlined'
                    />
                    <TextInput
                        style={{ marginTop: 15 }}
                        label='Flat input'
                        mode='flat'
                    />
                </View>


                <Button
                    onPress={() => saveAggressionReport()}
                    style={{ marginVertical: 35, backgroundColor: '#74b783' }}
                    icon="send"
                    mode="contained">
                    Submit
                </Button>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    reportComponent: {
        width: '100%',
        marginVertical: 15,
    },
    aggressionText: {
        color: '#b16d65',
        fontSize: 20,
        marginBottom: 15,
    },
    aggressionButton: {
        marginVertical: 40,
        borderWidth: 3,
        borderRadius: 5,
        borderColor: '#b16d65',
        color: '#b16d65',
        padding: 30,
        paddingVertical: 40,
        fontSize: 18,
        fontWeight: '600',
    },
    affirmationButton: {
        marginVertical: 40,
        borderWidth: 3,
        borderRadius: 5,
        borderColor: '#74b783',
        color: '#74b783',
        padding: 30,
        paddingVertical: 40,
        fontSize: 18,
        fontWeight: '600',
    },
});


export default AggressionReport;