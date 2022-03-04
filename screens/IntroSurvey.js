import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Paragraph } from 'react-native-paper';


class IntroSurvey extends Component {
    handleSubmit = values => {
        this.props.navigation.navigate('AppendixA', {});
    }

    render() {
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <Paragraph style={{fontSize: 22}}>
                    Hello!{'\n\n'}
                    Before you can continue using the app, please complete a survey
                    by clicking the button below.
                </Paragraph>
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
};


const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#fff',
        padding: 10,
        fontSize: 22,
        alignContent: 'center',
        alignSelf: 'center',
    },
    contentContainer: {
        paddingTop: 30,
        alignItems: 'center',
    },
    button: {
        marginTop: 30,
        marginBottom: 100,
        backgroundColor: '#74b783',
        paddingVertical: 6
    },
});


export default IntroSurvey;