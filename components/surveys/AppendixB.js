import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Picker } from 'react-native';
import { Text, Button, Paragraph } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';

import { getSurveyB, saveSurveyB } from '../../actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
const U = ({ children }) => <Text style={{ textDecorationLine: 'underline' }}>{children}</Text>;


class AppendixB extends Component {

    onSurveyChange(key, value) {
        // console.log('onSurveyChange: ', key, value);
        this.props.saveSurveyB(key, (value != 0 ? value : null));
    }

    handleSubmit = values => {
        // console.log('submitting form', values);
        // saveSurveyA(surveyA);
        this.props.navigation.navigate('AppendixC', {});
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Paragraph style={{ marginBottom: 15 }}>
                        Assuming you were motivated to do your best, on a scale 1
                        (Completely Unsure) to 10 (Completely Sure), please indicate
                        whether or not you could <U>successfully</U> do each of the following:
                    </Paragraph>
                </View>
                {surveyQsAppendixB.map((prop, key) => {
                    key++;
                    return (
                        <View>
                            <View style={{ flexDirection: 'row', fontSize: 16 }}>
                                <Text><Bold>{prop.key}. </Bold> </Text>
                                <Text>{prop.text}</Text>
                            </View>
                            <View style={{ marginLeft: 80, marginRight: 80 }}>
                                {/* iOS & cross platform alternatives to Picker:
                                https://github.com/sohobloo/react-native-modal-dropdown
                                https://reactnative.dev/docs/actionsheetios.html */}
                                <Picker
                                    iosIcon={
                                        <Icon
                                            name="md-arrow-dropdown"
                                            color="rgba(255, 255, 255, .9)"
                                            size={24}
                                        />
                                    }
                                    mode='dropdown'
                                    selectedValue={this.props.surveyB[key].value}
                                    onValueChange={this.onSurveyChange.bind(this, key)}>
                                    <Picker.Item label='-' value='0' />
                                    {answerScale.map((answer, i) => {
                                        return (
                                            <Picker.Item label={answer.text} value={answer.key} />
                                        );
                                    })}
                                </Picker>
                            </View>
                        </View>
                    );
                })}
                <Button
                    onPress={this.handleSubmit}
                    style={styles.button}
                    mode="contained"
                    title="Next"
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                        Next
                    </Text>
                </Button>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { surveyB: state.surveyB };
}

export default connect(
    mapStateToProps,
    { getSurveyB, saveSurveyB }
)(AppendixB);


const answerScale = [
    { key: 1, text: '1 (Completely Unsure)' },
    { key: 2, text: '2' },
    { key: 3, text: '3' },
    { key: 4, text: '4' },
    { key: 5, text: '5' },
    { key: 6, text: '6' },
    { key: 7, text: '7' },
    { key: 8, text: '8' },
    { key: 9, text: '9' },
    { key: 10, text: '10 (Completely Sure)' },
];


const surveyQsAppendixB = [
    {
        key: 1,
        text: 'Complete the mathematics requirements for most science, math, or engineering majors.',
    },
    {
        key: 2,
        text: 'Complete the chemistry requirements for most science, math, or engineering majors',
    },
    {
        key: 3,
        text: 'Complete the physics requirements for most science, math, or engineering majors.',
    },
    {
        key: 4,
        text: 'Complete some science, math, or engineering degree.',
    },
    {
        key: 5,
        text: 'Perform competently in some math, science, or engineering career field.',
    },
    {
        key: 6,
        text: 'Remain in science, math, or engineering over the next semester.',
    },
    {
        key: 7,
        text: 'Remain in science, math, or engineering over the next two semesters.',
    },
    {
        key: 8,
        text: 'Remain in science, math, or engineering over the next three semesters.',
    },
    {
        key: 9,
        text: 'Excel in science, math, or engineering over the next semester.',
    },
    {
        key: 10,
        text: 'Excel in science, math, or engineering over the next two semesters.',
    },
    {
        key: 11,
        text: 'Excel in science, math, or engineering over the next three semesters.',
    },
    {
        key: 12,
        text: 'Be accepted into a science math, or engineering graduate program, law school, or medical school.',
    },
    {
        key: 13,
        text: 'Successfully obtain a science, math, or engineering graduate degree, a law degree, or a medical degree.',
    },
    {
        key: 14,
        text: 'Excel in a science, math, or engineering graduate program, a law program, or a medical school program.',
    }
];


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingBottom: 100,
    },
    button: {
        marginTop: 30,
        marginBottom: 100,
        backgroundColor: '#74b783',
        paddingVertical: 6
    },
});