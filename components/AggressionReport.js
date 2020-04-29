import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, Picker, View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Switch,
  Paragraph,
  Button,
  TextInput,
  Title,
  Divider,
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { Slider } from 'react-native';

import CampusMap from './CampusMap';
import EmotionSlider from './EmotionSlider';
import { saveAggressionReport, addAggressionReport } from '../actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

const placeholder = {
  label: '_',
  value: null,
  color: '#9EA0A4',
};

class AggressionReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDateTimePicker: false,
      dateTimePickerMode: '',
      description: '', 
      show: false,
      date: (new Date),
      selectedLocation: '',
    };
  }

  showMode = currentMode => {
    this.setState({show: true});
    this.setState({dateTimePickerMode: currentMode});
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  onReportChange = (key, value) => {
    this.props.saveAggressionReport(key, value);
  }

  handleSubmit = () => {
    this.props.addAggressionReport(this.props.report);
    // this.props.navigation.navigate('HomeScreen');
  };

  onDateChange = () => {
    console.log('date changed');
  }

  onLocationChange = (key, value) => {
    this.setState({ selectedLocation: value });
    this.onReportChange(key, value);
  }

  render() {
    return (
      <View
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
                <Button onPress={this.showDatepicker} title="Date">
                  Date
                </Button>
              </View>
              <View>
                <Button onPress={this.showTimepicker} title="Time">
                  Time
                </Button>
              </View>
            </View>
            {this.state.show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={this.state.date}
                mode={this.state.mode}
                is24Hour={true}
                display="default"
                onChange={this.onDateChange}
              />
            )}
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.reportComponent}>
            <TextInput
              value={this.props.report['description']}
              onChangeText={(value) => this.onReportChange('description', value)}
              label='Describe what happened...'
              multiline={true}
              mode='outlined'
              style={{
                minHeight: 150,
                textAlignVertical: "top",
              }}
              numberOfLines={8} />
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={{ marginVertical: 10 }}>
            <Text>
              <Bold>What was it related to?</Bold>
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginVertical: 5 }}>
              <Switch
                onValueChange={(value) => this.onReportChange('relatedTo', { race: value })}
                value={this.props.report.relatedTo.race}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Race</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginVertical: 5 }}>
              <Switch
                onValueChange={(value) => this.onReportChange('relatedTo', { culture: value })}
                value={this.props.report.relatedTo.culture}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Culture</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginVertical: 5 }}>
              <Switch
                onValueChange={(value) => this.onReportChange('relatedTo', { gender: value })}
                value={this.props.report.relatedTo.gender}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Gender</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginVertical: 5 }}>
              <Switch
                onValueChange={(value) => this.onReportChange('relatedTo', { sexualOrientation: value })}
                value={this.props.report.relatedTo.sexualOrientation}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Sexual Orientation</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5, marginVertical: 5 }}>
              <Switch
                onValueChange={(value) => this.onReportChange('relatedTo', { other: value })}
                value={this.props.report.relatedTo.other}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Other</Text>
              <TextInput
                style={{ marginLeft: 10, flexGrow: 1 }}
                mode='outlined'
                value={this.props.report.relatedTo.otherDescription}
                onChangeText={(value) => this.onReportChange('relatedTo', { otherDescription: value })}
              />
            </View>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.pickerContainer}>
            <View paddingVertical={20} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              height: '100%',
            }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{ flex: 1 }}>
                <Bold>Where did this happen?</Bold>
                </View>
                <RNPickerSelect
                  placeholder={placeholder}
                  items={campusOptions}
                  onValueChange={(value) => this.onReportChange('campus', value)}
                  style={pickerSelectStyles}
                  value={this.props.report.campus}
                  useNativeAndroidPickerStyle={false}
                  textInputProps={{ underlineColorAndroid: 'cyan' }}
                  // InputAccessoryView={() => null}
                  Icon={() => {
                    return (
                      <Icon
                        name="md-arrow-dropdown"
                        color="#000"
                        size={30}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </View>

          <Text style={{ fontStyle: 'italic', paddingVertical: 20 }}>
            Click the pencil under the map to select a location.
          </Text>

          <CampusMap 
            location={this.state.selectedLocation} 
            onMarkerPress={(value) => this.onLocationChange('location', value)}
          />

          <View style={styles.pickerContainer}>
            <View paddingVertical={20} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              height: '100%',
            }}>
              <View style={{flexDirection: 'row'}}>
                <View style={{ flex: 1 }}>
                  <Text>Choose a location</Text>
                </View>
                <RNPickerSelect
                  placeholder={placeholder}
                  items={sfsuLocations}
                  onValueChange={(value) => this.onLocationChange('location', value)}
                  style={pickerSelectStyles}
                  value={this.props.report.location}
                  useNativeAndroidPickerStyle={false}
                  textInputProps={{ underlineColorAndroid: 'cyan' }}
                  // InputAccessoryView={() => null}
                  Icon={() => {
                    return (
                      <Icon
                        name="md-arrow-dropdown"
                        color="#000"
                        size={30}
                      />
                    );
                  }}
                />
              </View>
            </View>
          </View>         

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.sliders}>

            <View key='bother' style={{ marginBottom: 20 }}>
              {/* <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} /> */}
              <EmotionSlider 
                key='bother'
                containerStyle={styles.sliders}
                titleStyle={{
                    ...styles.aggressionText, 
                    color: '#000', 
                }}
                title='How much did it bother you?'
                value={this.props.report['bother']}
                onChange={value => this.onReportChange('bother', value)}
                sliderStyle={styles.sliderStyle}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
                imageSrc={require('../assets/images/scale1.png')}
              />            
            </View>

            <Divider style={{ marginVertical: 10 }} />

            <Text 
              style={{
                  ...styles.aggressionText, 
                  color: '#000', 
              }}>
                At this moment, how intensely do you feel the following?
            </Text>

            {aggressionEmotionSliders.map((emotion, i) => {
              return (
                <View key={i}>
                  <EmotionSlider 
                    key={emotion.key}
                    containerStyle={styles.sliders}
                    titleStyle={styles.aggressionText}
                    title={emotion.title}
                    value={this.props.report[emotion.key]}
                    onChange={value => this.onReportChange(emotion.key, value)}
                    sliderStyle={styles.sliderStyle}
                    minimumValue={0}
                    maximumValue={5}
                    minimumTrackTintColor="#b16d65"
                    maximumTrackTintColor="#EFEFEF"
                    imageSrc={require('../assets/images/scale2.png')}
                  />
                  <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
                </View>
              );
            })}

            <View style={{...styles.sliders, flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="md-add" style={{color:'#74b783', marginRight: 15}} size={35} />
              <Text>Add another emotion (optional)</Text>
            </View>

          </View>

          <Divider style={{ marginVertical: 10 }} />
          <Button
            onPress={this.handleSubmit}
            style={{ marginVertical: 35, backgroundColor: '#74b783' }}
            icon="send"
            mode="contained">
            Submit
          </Button>
        </ScrollView>
      </View>
    );
  }

}

function mapStateToProps(state) {
  return {
    report: state.aggressions
  };
}

export default connect(
  mapStateToProps,
  { saveAggressionReport, addAggressionReport }
)(AggressionReport);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfafa',
    padding: 10,
  },
  sliders: {
    marginVertical: 15,
  },
  sliderStyle: {
    width: '90%', 
    alignSelf: 'center' 
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
  pickerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  scrollContentContainer: {
    paddingTop: 40,
    paddingBottom: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  flex: 1,
  iconContainer: {
    width: 30,
    height: 30,
    right: 12,
    top: -5,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const aggressionEmotionSliders = [
  { key: 'angry', title: 'Angry' },
  { key: 'sad', title: 'Sad' },
  { key: 'shame', title: 'Shame' },
  { key: 'surprise', title: 'Surprise' },
  { key: 'fear', title: 'Fear' },
  { key: 'contempt', title: 'Contempt' },
  { key: 'happy', title: 'Happy' },
  { key: 'disgust', title: 'Disgust' },
  { key: 'pride', title: 'Pride' },
  { key: 'guilt', title: 'Guilt' },
];

const campusOptions = [
  { key: 1, value: 'sfsu', label: 'SF State', displayValue: false },
  { key: 2, value: 'sjsu', label: 'SJSU', displayValue: false },
  { key: 3, value: 'csus', label: 'CSU Stanislaus', displayValue: false },
];

const sfsuLocations = [
  {
    key: 'lib',
    value: 'lib',
    label: 'J. Paul Leonard Library (LIB)',
  },
  {
    key: 'shs',
    value: 'shs',
    label: 'Student Health Center (SHS)',
  },
  {
    key: 'hh',
    value: 'hh',
    label: 'Hensill Hall (HH)',
  },
  {
    key: 'hss',
    value: 'hss',
    label: 'Health and Social Sciences (HSS)',
  },
  {
    key: 'hum',
    value: 'hum',
    label: 'Humanities (HUM)',
  },
  {
    key: 'parking',
    value: 'parking',
    label: 'Parking Garage',
  },
  {
    key: 'quad',
    value: 'quad',
    label: 'Quad',
  },
  {
    key: 'sci',
    value: 'sci',
    label: 'Science (SCI)',
  },
  {
    key: 'ssb',
    value: 'ssb',
    label: 'Student Services (SSB)',
  },
  {
    key: 'th',
    value: 'th',
    label: 'Thornton Hall (TH)',
  },
];