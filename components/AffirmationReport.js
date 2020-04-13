import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput, Text, Picker, View } from 'react-native';

const Stack = createStackNavigator();

class AffirmationReport extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // userId: 1,            // TODO: change
            // incidentTime: '',     // datetime
            description: '',
            // relatedTo: new Map(),   // list of strings
            campus: '',
            // location: null,
            // TODO: rating sliders
        }

        // this.handleIncidentTimeChange = this.handleIncidentTimeChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange(this);
        this.handleCampusChange = this.handleCampusChange(this);
    }

    // handleIncidentTimeChange(e) {
    //     this.setState({ incidentTime: e.target.value });
    // }

    handleDescriptionChange(e) {
        // this.setState({ descrption: e.target.value });
    }

    handleCampusChange(e) {
        // this.setState({ campus: e.target.value });
    }

    render() {
        return (
            <View>
                {/* <form> */}

                    {/* <label>Time of Incident</label> */}

                    <TextInput
                        placeholder="Describe what happened..."
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(text) => this.setState({text})}
                        value={this.state.text}/>

                    <Picker
                        style={{ height: 50, width: 150 }}
                        onValueChange={console.log('picked')}
                    >
                        <Picker.Item label="SF State" value="sfsu" />
                        <Picker.Item label="SJSU" value="sjsu" />
                    </Picker>

                {/* </form> */}
            </View>
        );
    }
}

export default AffirmationReport;