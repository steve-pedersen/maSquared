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
// import Slider from '@react-native-community/slider';
import { Slider } from 'react-native';


import { saveAggressionReport } from '../actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

class AggressionReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDateTimePicker: false,
      dateTimePickerMode: '',
      description: ''
    };
  }

  showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  showDatepicker = () => {
    showMode('date');
  };

  showTimepicker = () => {
    showMode('time');
  };

  onReportChange = (key, value) => {
    // console.log('onReportChange: ', key, value);

    this.props.saveAggressionReport(key, value);
  }

  render() {
    // console.log(this.props.report);

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

          {/* <View style={styles.reportComponent}>
            <Text>
              Time of incident
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <View>
                <Button onPress={showDatepicker} title="Date">
                  Date
                </Button>
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
          </View> */}

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.reportComponent}>
            <TextInput
              value={this.props.report['description']}
              onChangeText={(value) => this.onReportChange('description', value)}
              label='Describe what happened...'
              // placeholder="Describe what happened..."
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

          <View style={styles.reportComponent}>
            <Text style={{ marginBottom: 0, paddingBottom: 0 }}>
              <Bold>Where did this happen?</Bold>
            </Text>
            <Picker
              mode='dropdown'
              style={{ marginTop: 0, paddingTop: 0 }}
              selectedValue={this.props.report.campus}
              onValueChange={(value) => this.onReportChange('campus', value)}
            >
              <Picker.Item label="SF State" value="sfsu" />
              <Picker.Item label="SJSU" value="sjsu" />
            </Picker>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.sliders}>
            <Text><Bold>How much did it bother you?</Bold></Text>
            <Slider
              style={{ width: '90%', alignSelf: 'center' }}
              value={this.props.report.bother}
              onValueChange={value => this.onReportChange('bother', value)}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#b16d65"
              maximumTrackTintColor="#EFEFEF"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Not at all</Text>
              <Text>Very much</Text>
            </View>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.sliders}>
            <Text><Bold>At this moment, how intensely do you feel the following?</Bold></Text>
            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <Text style={styles.aggressionText}>Angry</Text>
            <Slider
              value={this.props.report.anger}
              onValueChange={value => this.onReportChange('anger', value)}
              style={{ width: '90%', alignSelf: 'center' }}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor="#b16d65"
              maximumTrackTintColor="#EFEFEF"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Not at all</Text>
              <Text>Extremely</Text>
            </View>
          </View>

          <Divider style={{ marginVertical: 10 }} />

          <View style={styles.sliders}>
            <Text><Bold>At this moment, how intensely do you feel the following?</Bold></Text>
            
            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Angry</Text>
              <Slider
                value={this.props.report.anger}
                onValueChange={value => this.onReportChange('anger', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Sad</Text>
              <Slider
                value={this.props.report.sad}
                onValueChange={value => this.onReportChange('sad', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Shame</Text>
              <Slider
                value={this.props.report.shame}
                onValueChange={value => this.onReportChange('shame', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Surprise</Text>
              <Slider
                value={this.props.report.surprise}
                onValueChange={value => this.onReportChange('surprise', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Fear</Text>
              <Slider
                value={this.props.report.fear}
                onValueChange={value => this.onReportChange('fear', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Contempt</Text>
              <Slider
                value={this.props.report.contempt}
                onValueChange={value => this.onReportChange('contempt', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Happy</Text>
              <Slider
                value={this.props.report.happy}
                onValueChange={value => this.onReportChange('happy', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Disgust</Text>
              <Slider
                value={this.props.report.disgust}
                onValueChange={value => this.onReportChange('disgust', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Pride</Text>
              <Slider
                value={this.props.report.pride}
                onValueChange={value => this.onReportChange('pride', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />
            <View style={styles.sliders}>
              <Text style={styles.aggressionText}>Disgust</Text>
              <Slider
                value={this.props.report.disgust}
                onValueChange={value => this.onReportChange('disgust', value)}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={0}
                maximumValue={10}
                minimumTrackTintColor="#b16d65"
                maximumTrackTintColor="#EFEFEF"
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>

            <Divider style={{ marginVertical: 10, alignSelf: 'center', width: '60%' }} />

            <View style={{...styles.sliders, flexDirection: 'row', alignItems: 'center'}}>
              <Icon name="md-add" style={{color:'#74b783', marginRight: 15}} size={35} />
              <Text>Add another emotion (optional)</Text>
            </View>

          </View>



          <Divider style={{ marginVertical: 10 }} />
          <Button
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
  // console.log(state);

  return {
    report: state.aggressions
  };
}

export default connect(
  mapStateToProps,
  { saveAggressionReport }
)(AggressionReport);




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  sliders: {
    marginVertical: 15,
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






// const OLDAggressionReport = ({ navigation }) => {
//   const [date, setDate] = useState(new Date());
//   const [mode, setMode] = useState('date');
//   const [show, setShow] = useState(false);
//   const [description, setDescription] = useState('');
//   const [campus, setCampus] = useState('');

//   const aggressionReports = useSelector(state => state.aggressionReports);
//   const dispatch = useDispatch();
//   const saveAggressionReport = aggression => dispatch(saveAggressionReport(aggression));

//   const onDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || date;
//     setShow(Platform.OS === 'ios');
//     setDate(currentDate);
//   };

//   const showMode = currentMode => {
//     setShow(true);
//     setMode(currentMode);
//   };

//   const showDatepicker = () => {
//     showMode('date');
//   };

//   const showTimepicker = () => {
//     showMode('time');
//   };

//   function onSaveNote() {
//     navigation.state.params.addNote({ noteTitle, noteValue })
//     navigation.goBack()
//   }

// };