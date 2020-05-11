import React, { Component } from 'react';
import { connect } from 'react-redux';
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from './DateTimePicker';
import { Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity ,
  SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Switch,
  Button,
  TextInput,
  Title,
  Divider,
} from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';

import CampusMap from './CampusMap';
import EmotionSlider from './EmotionSlider';
import { saveAggressionReport, addAggressionReport, resetAggressionReport } from '../actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

const placeholder = {
  label: 'Select an option...',
  value: null,
  color: '#9EA0A4',
};

class AggressionReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: '',
      selectedDate: '',
      selectedTime: '',
      otherEmotionAdded: (
        this.props.report.otherEmotionValue || this.props.report.otherEmotionText
      ),
    };
  }

  onReportChange = (key, value) => {
    this.props.saveAggressionReport(key, value);
  }

  handleSubmit = () => {
    this.props.addAggressionReport(this.props.report);
    this.props.resetAggressionReport({});
    this.props.navigation.navigate('Root');
  };

  onLocationChange = (key, value) => {
    this.setState({ selectedLocation: value });
    this.onReportChange(key, value);
  }

  addOtherEmotion = () => {
    this.setState({ otherEmotionAdded: true });
  }

  onDateTimeChange = (value) => {
    let incidentDateTime = this.formatDate(new Date(value - 86400 * 1000));
    this.props.saveAggressionReport('incidentTime', incidentDateTime);
  }

  formatDate = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
        <SafeAreaView>
          <Title style={styles.aggressionText}>
            MICROAGGRESSION REPORT
          </Title>

          <View>
            <Text style={styles.label}>Time of incident</Text>
            <View style={{
              ...styles.reportComponent, 
              borderWidth: 1, 
              borderRadius: 4,
              borderColor: '#787878',
              backgroundColor: '#f7f7f7',
              padding: 9,
              textAlign: 'left',
            }}>
              <DateTimePicker 
                style={{flexGrow: 1}} 
                mode='datetime' 
                currentDateTime={this.props.report.incidentTime ?
                  new Date(this.props.report.incidentTime) :
                  new Date
                }
                text={this.props.report.incidentTime ? 
                  this.props.report.incidentTime : 'Choose Date & Time'
                }
                callbackHandler={this.onDateTimeChange} /> 
              {/* <Text style={{ fontSize: 16, padding: 5 }}>
                {this.props.report.incidentTime}
              </Text> */}
            </View>      
          </View>

          <Divider style={{ marginVertical: 10 }} />
              
          <View style={styles.reportComponent}>
            <Text style={styles.label}>Describe what happened...</Text>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <TextInput
                value={this.props.report['description']}
                onChangeText={(value) => this.onReportChange('description', value)}
                label='Description'
                multiline={true}
                mode='outlined'
                style={{
                  // minHeight: 150,
                  textAlignVertical: "top",
                }}
                numberOfLines={8} />
            </TouchableWithoutFeedback>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={{ marginVertical: 10 }}>
          <Text style={styles.label}>What was it related to?</Text>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={
                  value => this.onReportChange('relatedToRace', value)
                }
                value={this.props.report.relatedToRace}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Race</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={
                  value => this.onReportChange('relatedToCulture', value)
                }
                value={this.props.report.relatedToCulture}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Culture</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={
                  value => this.onReportChange('relatedToGender', value)
                }
                value={this.props.report.relatedToGender}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Gender</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={
                  value => this.onReportChange('relatedToSexualOrientation', value)
                }
                value={this.props.report.relatedToSexualOrientation}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Sexual Orientation</Text>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                onValueChange={
                  value => this.onReportChange('relatedToOther', value)
                }
                value={this.props.report.relatedToOther}
                trackColor='#DEDEDE'
              />
              <Text style={{ marginLeft: 10 }}>Other</Text>
              {this.props.report.relatedToOther ? 
                (
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                      style={{ marginLeft: 10, flexGrow: 1 }}
                      mode='outlined'
                      value={this.props.report.relatedToOtherDescription}
                      onChangeText={
                        value => this.onReportChange('relatedToOtherDescription', value)
                      }
                    />
                  </TouchableWithoutFeedback>
                ) :
                undefined
              }
            </View>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.pickerContainer}>
            <View style={{ marginBottom: 15 }}>
              <Text style={styles.label}>Where did this happen?</Text>
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

          <Text style={{ fontStyle: 'italic', paddingVertical: 10, textAlign: 'center' }}>
            Click the pencil under the map to select a location.
          </Text>

          <View style={{ paddingHorizontal: 50 }}>
            <CampusMap 
              location={this.state.selectedLocation} 
              onMarkerPress={(value) => this.onLocationChange('location', value)}
            />
          </View>

          <View style={styles.pickerContainer}>
            <RNPickerSelect
              placeholder={{
                label: 'Choose a location',
                value: null,
                color: '#9EA0A4',
              }}
              items={sfsuLocations}
              onValueChange={(value) => this.onLocationChange('location', value)}
              style={pickerSelectStyles}
              value={this.props.report.location}
              useNativeAndroidPickerStyle={false}
              textInputProps={{ underlineColorAndroid: 'cyan' }}
              Icon={() => {
                return (
                  <Icon
                    name="md-create"
                    color="#74b783"
                    size={25}
                  />
                );
              }}
            />
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.sliders}>

            <View key='bother' style={{ marginBottom: 20 }}>
              {/* <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} /> */}
              <EmotionSlider 
                key='bother'
                containerStyle={styles.sliders}
                titleStyle={styles.label}
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
              style={styles.label}>
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

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

              {!this.state.otherEmotionAdded ? 
                (
                  <TouchableOpacity
                    style={{...styles.sliders, flexDirection: 'row', alignItems: 'center'}}
                    onPress={this.addOtherEmotion}>
                    <Icon name="md-add" style={{color:'#74b783', marginRight: 15}} size={35} />
                    <Text>Add another emotion (optional)</Text>
                  </TouchableOpacity>
                ) :
                (
                  <View key='other' style={{ marginBottom: 20 }}>
                    <TextInput
                      value={this.props.report.otherEmotionText}
                      onChangeText={(value) => this.onReportChange('otherEmotionText', value)}
                      label='Name of emotion'
                      mode='outlined'
                    />
                    <EmotionSlider 
                      key='other'
                      containerStyle={styles.sliders}
                      titleStyle={styles.aggressionText}
                      title={this.props.report.otherEmotionText ?? ''}
                      value={this.props.report.otherEmotionValue}
                      onChange={value => this.onReportChange('otherEmotionValue', value)}
                      sliderStyle={styles.sliderStyle}
                      minimumValue={0}
                      maximumValue={10}
                      minimumTrackTintColor="#b16d65"
                      maximumTrackTintColor="#EFEFEF"
                      imageSrc={require('../assets/images/scale2.png')}
                    />            
                  </View>
                )
              
              }

            </TouchableWithoutFeedback>

          </View>

          <Divider style={{ marginVertical: 10 }} />
          <Button
            onPress={this.handleSubmit}
            style={styles.button}
            icon="send"
            mode="contained">
            Submit
          </Button>

          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
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
  { saveAggressionReport, addAggressionReport, resetAggressionReport }
)(AggressionReport);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfafa',
    padding: 10,
  },
  label: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 5, 
    marginVertical: 5 
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
  button: {
    marginTop: 30,
    marginBottom: 100,
    backgroundColor: '#74b783',
    paddingVertical: 6,
    width: '90%',
    alignSelf: 'center',
  },
  pickerContainer: {
    flex: 1,
    paddingVertical: 20,
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
  flexGrow: 1,
  iconContainer: {
    top: 16,
    right: 20,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 18,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
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
  // { key: 2, value: 'sjsu', label: 'SJSU', displayValue: false },
  // { key: 3, value: 'csus', label: 'CSU Stanislaus', displayValue: false },
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