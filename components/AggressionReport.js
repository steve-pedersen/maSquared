import React, { Component, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Text, Picker, View, StyleSheet, ScrollView, Button } from 'react-native';

const Stack = createStackNavigator();

const AggressionReport = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
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

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>

                <View style={styles.reportComponent}>
                    <Text style={styles.aggressionText}>
                        MICROAGGRESSION REPORT
                    </Text>
                </View>

                <View style={styles.reportComponent}>
                    <Text>
                        Time of incident
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Button onPress={showDatepicker} title="Date" />
                            {/* <TextInput onPress={showDatepicker} style={{}} /> */}
                        </View>
                        <View>
                            <Button onPress={showTimepicker} title="Time" />
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
                            onChange={onChange}
                        />
                    )}
                </View>

                <View style={styles.reportComponent}>
                    <TextInput
                        placeholder="Describe what happened..."
                        multiline={true}
                        style={{
                            alignSelf: 'stretch',
                            borderWidth: 1,
                            borderColor: '#000',
                            borderRadius: 5,
                            textAlignVertical: "top",
                            paddingVertical: 20,
                            paddingHorizontal: 5,
                            minHeight: 100,
                            fontSize: 18,
                        }}
                        numberOfLines={4} />
                </View>

                <View style={styles.reportComponent}>
                    <Text style={{marginBottom:0, paddingBottom: 0}}>
                        Campus
                    </Text>
                    <Picker
                        style={{ marginTop:0, paddingTop:0 }}
                        onValueChange={console.log('picked')}>
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
            </ScrollView>
        </View>
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