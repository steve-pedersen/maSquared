import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RadioButton, Text, Button, Paragraph } from 'react-native-paper';

import { getConsent, saveConsent } from '../actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

class ConsentForm extends Component {

    onConsentChange(value) {
        // console.log('onConsentChange: ', value);
        this.props.saveConsent(value);
    }

    handleSubmit = values => {
        // console.log('submitting form', values);
        // saveConsent(surveyA);
        if (this.props.consentGranted) {
            this.props.navigation.navigate('IntroSlideshow', {});
        }
    }

    render() {

        return (
            <ScrollView style={styles.container}>

                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim 
                    id est laborum.
                </Paragraph>

                <RadioButton.Group
                    onValueChange={this.onConsentChange.bind(this)}
                    value={this.props.consentGranted}
                >
                    <View>
                        <RadioButton.Item
                            label='No, I do not agree'
                            value={false}
                            status={this.props.consentGranted ? 'unchecked' : 'checked'}
                        />
                        <RadioButton.Item
                            label='Yes, I agree'
                            value={true}
                            status={this.props.consentGranted ? 'checked' : 'unchecked'}
                        />
                    </View>
                </RadioButton.Group>

                <Button
                    onPress={this.handleSubmit}
                    style={styles.button}
                    mode="contained"
                    title="Submit"
                >
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                        Submit
                    </Text>
                </Button>
            </ScrollView>
        )
    }
}


function mapStateToProps(state) {
    return { consentGranted: state.consent.value }
}


export default connect(
    mapStateToProps, 
    { getConsent, saveConsent }
)(ConsentForm);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        backgroundColor: '#fff',
        padding: 10,
        paddingBottom: 100,
    },
    button: {
        marginTop: 30,
        marginBottom: 100,
        backgroundColor: '#74b783',
        paddingVertical: 6
    },
});
