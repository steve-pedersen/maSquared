import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RadioButton, Text, Button } from 'react-native-paper';

import { getSurveyA, saveSurveyA } from '../../redux/actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

class AppendixA extends Component {

  onSurveyChange(value, key) {
    // console.log('onSurveyChange: ', value, key);
    this.props.saveSurveyA(value, key);
  }

  handleSubmit = values => {
    // console.log('submitting form', values);
    // saveSurveyA(surveyA);
    this.props.navigation.navigate('AppendixB', {});
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {surveyQsAppendixA.map((prop, key) => {
          key = key + 1;
          let that = this;
          return (
            <View key={key} style={{ marginVertical: 15 }}>
              <View>
                <Text><Bold>{key}.</Bold> {prop.label}</Text>
              </View>
              <RadioButton.Group
                key={prop.key}
                onValueChange={this.onSurveyChange.bind(this, key)}
                value={this.props.surveyA[key].value}
              >
                {surveyAsAppendixA.map(function (answer) {
                  let isChecked = that.props.surveyA[prop.key].value === answer.key;
                  return (
                    <View key={answer.key}>
                      <RadioButton.Item
                        label={answer.label}
                        value={answer.key}
                        status={isChecked ? 'checked' : 'unchecked'}
                      />
                    </View>
                  );
                })}
              </RadioButton.Group>
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
    )
  }
}

// error: can't find variable surveyA
function mapStateToProps(state) {
  // console.log('in mapStateToProps: ', state);
  return {
    surveyA: state.surveyA
  }
}


export default connect(
  mapStateToProps,
  { saveSurveyA, getSurveyA }
)(AppendixA);


const surveyQsAppendixA = [
  {
    key: 1,
    label: 'I feel close to people at this school.',
  },
  {
    key: 2,
    label: 'I feel like I am part of this school.',
  },
  {
    key: 3,
    label: 'I am happy to be at this school.',
  },
  {
    key: 4,
    label: 'The teachers at this school treat students fairly.',
  },
  {
    key: 5,
    label: 'I feel safe in my school.',
  },
];
const surveyAsAppendixA = [
  {
    key: 1,
    label: 'Strongly Agree',
  },
  {
    key: 2,
    label: 'Agree'
  },
  {
    key: 3,
    label: 'Neutral'
  },
  {
    key: 4,
    label: 'Disagree'
  },
  {
    key: 5,
    label: 'Strongly Disagree'
  }
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
});


// function Appendix(props) {

//     const surveyAnswers = useSelector(state => state.surveyAnswers);
//     const dispatch = useDispatch();
//     const saveSurveyA = surveyA => dispatch(saveSurveyA(surveyA));

//     const [surveyA, setSurveyA] = useState({
//         1: {
//             value: null,
//         },
//         2: {
//             value: null,
//         },
//         3: {
//             value: null,
//         },
//         4: {
//             value: null,
//         },
//         5: {
//             value: null,
//         },
//     });

//     const { handleSubmit } = props;

//     const submit = values => {
//         console.log('submitting form');
//         saveSurveyA(surveyA);
//         props.navigation.navigate('AppendixB', {
//             setSurveyA
//         });
//     }

//     const onRadioButtonPress = (key, value) => {
//         surveyA[key].value = value;
//         setSurveyA(surveyA);
//         console.log(surveyA);
//     };

//     return (
//         <ScrollView style={styles.container}>
//             {surveyQsAppendixA.map((prop, key) => {
//                 key = key + 1;
//                 return (
//                     <View key={key}>
//                         <View>
//                             <Text>{key}. {prop.label}</Text>
//                         </View>
//                         <RadioButton.Group
//                             key={prop.key}
//                             onValueChange={value => onRadioButtonPress(key, value)}
//                             value={surveyA[key].value}
//                         >
//                             {surveyAsAppendixA.map(function (item) {
//                                 return (
//                                     <View key={item.key} style={styles.buttonContainer}>
//                                         <Text>{item.label}</Text>
//                                         <RadioButton.Item
//                                             // style={DefaultTheme}
//                                             label={item.label}
//                                             value={item.key}
//                                             status={surveyA[key].value == item.key ? 'checked' : 'unchecked'}
//                                         />
//                                     </View>
//                                 );
//                             })}
//                         </RadioButton.Group>
//                     </View>
//                 );
//             })}
//             {/* <Text>Email:</Text>
//             <Field name="email" component={renderInput} /> */}
//             <Button
//                 onPress={handleSubmit(submit)}
//                 style={styles.button}
//                 mode="contained"
//                 title="Next"
//             >
//                 <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
//                     Next
//                 </Text>
//             </Button>
//         </ScrollView>
//     );
// };