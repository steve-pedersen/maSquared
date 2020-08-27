import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Title, TextInput } from 'react-native-paper';
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import { postFeedback } from '../components/util/Api';

class MoreScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      feedback: ''
    }
  }

  sendFeedback = () => {
    const feedback = {
      user: this.props.user,
      text: this.state.feedback
    };
    console.log('posted feedback: ', )
    postFeedback(feedback)
      .then(res => {
        console.log('feedback response: ', res);
      })
      .finally(() => {
        this.setState({ feedback: '' });
        this.setModalVisible(false);
      });
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  getPostMeasureSurvey = () => {
    let pending = null;
    this.props.pendingSurveys.forEach(survey => {
      if (survey[Object.keys(survey)[0]].complete === false) {
        pending = survey;
      }
    });
    // pending = this.props.pendingSurveys.filter(survey => {
    //   if (survey) {
    //     return survey[Object.keys(survey)[0]].complete === false;
    //   }
    //   return true;
    // });

    if (!pending) {
      return <Text>To be completed upon announcement.</Text>;
    } else {
      return (
        <TouchableOpacity onPress={() => console.log('clicked post measure')}>
          {pending.dateNotified}
        </TouchableOpacity>
      );
    }
  }

  render() {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Title style={styles.titleText}>More</Title>

        <View>
          <Text>ACCOUNT</Text>
          <Text>User ID: {this.props.user.userId}</Text>
          <Text>Last Synced on: {this.props.user.lastSyncDate ?? this.props.user.createdDate}</Text>
        </View>

        <View>
          <Text>Post-Measure Survey</Text>
          <Text>{this.getPostMeasureSurvey()}</Text>
        </View>

        <OptionButton
          icon="md-school"
          label="Send Feedback"
          description="Tell us about your experiences of using this app."
          onPress={() => this.setModalVisible(!this.state.modalVisible)}
          isLastOption
        />

        
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible(false)}
          >
          <TouchableOpacity 
            style={styles.modalContainer} 
            activeOpacity={1} 
            onPressOut={() => this.setModalVisible(false)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View>
                  <Title>
                    Send Feedback
                </Title>
                </View>

                <View style={{width: '100%', marginVertical: hp('2%')}}>
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <TextInput
                      value={this.state.feedback}
                      onChangeText={value => this.setState({ feedback: value })}
                      label='Feedback'
                      multiline={true}
                      mode='outlined'
                      style={{
                        textAlignVertical: "top",
                      }}
                      numberOfLines={8} />
                  </TouchableWithoutFeedback>
                </View>

                <View>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: '#74b783' }}
                    onPress={() => this.sendFeedback()}
                  >
                    <Text style={styles.textStyle}>Submit</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
            </TouchableOpacity>
          </Modal>
        
      </ScrollView>
    );
  }
}

function OptionButton({ icon, label, onPress, isLastOption, description }) {
  return (
    <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
      {description ? (
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{description}</Text>
        </View>
      ) : undefined}
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: 10,
  },

  modalContainer: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: wp('90%')
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

function mapStateToProps(state) {
  return {
    user: state.user,
    pendingSurveys: state.pendingSurveys
  };
}

export default connect(
  mapStateToProps
)(MoreScreen);