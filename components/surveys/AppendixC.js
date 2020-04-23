import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, Picker } from 'react-native';
import { RadioButton, Text, DefaultTheme, Button, Paragraph } from 'react-native-paper';

import { saveSurveyC, saveSurvey } from '../../actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;
const U = ({ children }) => <Text style={{ textDecorationLine: 'underline' }}>{children}</Text>;


class AppendixC extends Component {

    onSurveyChange(key, value) {
        this.props.saveSurveyC(key, (value != 0 ? value : null));;
    }

    handleSubmit = values => {
        // TODO: update redux state to survey complete, 
        // then allow App to go to Home nav stack
        // this.props.navigation.navigate('Root', {});
        this.props.saveSurvey(true);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Paragraph style={{ marginBottom: 15 }}>
                        Thinking about your current life, please read each of these 
                        statements and rate to what extent you feel this is true for 
                        you at SF State, on a scale of 1 (Never) to 10 (Always):
                    </Paragraph>
                </View>
                {surveyQsAppendixC.map((prop, key) => {
                    key++;
                    return (
                        <View key={prop.key}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text><Bold>{prop.key}. </Bold> </Text>
                                {prop.content}
                            </View>
                            <Picker
                                mode='dropdown'
                                selectedValue={this.props.surveyC[key].value}
                                onValueChange={this.onSurveyChange.bind(this, key)}>
                                <Picker.Item label='-' value='0' />
                                {answerScale.map((answer, i) => {
                                    return (
                                        <Picker.Item label={answer.text} value={answer.key} />
                                    ); 
                                })}
                            </Picker>
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
                        Done
                    </Text>
                </Button>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    return { surveyC: state.surveyC };
}

export default connect(
    mapStateToProps,
    { saveSurveyC, saveSurvey }
)(AppendixC);



const answerScale = [
    { key: 1, text: '1 (Never)' },
    { key: 2, text: '2' },
    { key: 3, text: '3' },
    { key: 4, text: '4' },
    { key: 5, text: '5' },
    { key: 6, text: '6' },
    { key: 7, text: '7' },
    { key: 8, text: '8' },
    { key: 9, text: '9' },
    { key: 10, text: '10 (Always)' },
];


surveyQsAppendixC = [
    {
        key: 1,
        content: (<Text>I feel my <Bold>identity</Bold> is <Bold>accepted</Bold>.</Text>),
    },
    {
        key: 2,
        content: (<Text>I feel <Bold>recognized</Bold> for my good efforts, thoughfulness, and talents.</Text>)
    },
    {
        key: 3,
        content: (<Text> I feel <Bold>acknowledged</Bold> (seen, heard, listened to, validated and responded to about my concern).</Text>)
    },
    {
        key: 4,
        content: (<Text>I feel <Bold>included</Bold> (a sense of belonging).</Text>)
    },
    {
        key: 5,
        content: (<Text>I feel <Bold>safe</Bold> (both physically and psychologically).</Text>)
    },
    {
        key: 6,
        content: (<Text>I feel <Bold>treated fairly</Bold>.</Text>)
    },
    {
        key: 7,
        content: (<Text>I feel <Bold>autonomous</Bold> (free to make my own decisions and act on my own behalf).</Text>)
    },
    {
        key: 8,
        content: (<Text>I feel <Bold>understood</Bold>.</Text>)
    },
    {
        key: 9,
        content: (<Text>I feel I am given the <Bold>benefit of the doubt</Bold>.</Text>)
    },
    {
        key: 10,
        content: (<Text>I feel <Bold>apologized to</Bold> when someone violates my dignity.</Text>)
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
