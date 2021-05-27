import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, ScrollView, SafeAreaView } from 'react-native';
import { Button, Title } from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { AppText } from '../components/StyledText';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import { saveConsent, saveSlideshow, resetApp } from '../redux/actions';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>;

class IntroSlideshow extends Component {

  _keyExtractor = (item) => item.title;

  _renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
            padding: wp('12%')
          },
        ]}>
        {item.content}
      </View>
    );
  }

  _renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-back"
          size={30}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <Button
        style={styles.button}
        mode="contained"
        title="Next"
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: hp('2%') }}>
          Next
        </Text>
      </Button>
    );
  };

  _onDone = () => {
    if (this.props.route.params && this.props.route.params.returnRoute) {
      this.props.navigation.goBack();
    }
    this.props.saveSlideshow(true);
  }

  _onReset = () => {
    this.props.saveSlideshow(false);
    this.props.saveConsent(false);
    this.props.navigation.navigate('ConsentForm', {});
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        {this.props.route.params && this.props.route.params.returnRoute ?
          <Icon
            name="md-arrow-back"
            color="gray"
            size={40}
            style={{ marginTop: 15, marginLeft: 20 }}
            onPress={this._onDone}
          /> :
          undefined
        }
        {/* <Button
            style={{ backgroundColor: '#efefef', width: '50%' }}
            mode="contained"
            onPress={this._onReset}>
            <Text style={{color: '#000'}}>Reset App</Text>
        </Button> */}
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          style={{ marginBottom: 100 }}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          data={slides}
          onDone={this._onDone}
          // dotStyle={{ backgroundColor: '#8e8e8e' }}
          activeDotStyle={{ backgroundColor: '#74b783' }}
          renderDoneButton={this._renderDoneButton}
        />
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return { isComplete: state.complete };
}

export default connect(
  mapStateToProps,
  { saveConsent, saveSlideshow, resetApp }
)(IntroSlideshow);

const styles = StyleSheet.create({
  slide: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  image: {
    height: hp('33%'),
    width: wp('90%'),
    alignSelf: 'center',
  },
  exampleImage: {
    width: wp('75%'),
    height: hp('25%'),
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginVertical: hp('3%'),
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: hp('2%'),
  },
  title: {
    fontSize: hp('2.5%'),
    paddingBottom: hp('1.5%'),
    color: '#000',
    textAlign: 'center',
  },
  button: {
    // marginTop: -30,
    // marginBottom: hp('25%'),
    backgroundColor: '#74b783',
    paddingVertical: 6
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const slides = [
  {
    key: 1,
    title: '1',
    content: (
      <View style={{ alignSelf: 'center', flex: 0 }}>
        <Image
          style={styles.image}
          source={require('../assets/images/1024.imageset/1024.png')}
          resizeMode="contain"
        />
        <Text style={styles.text}>
          In this app, we would like you to log <Bold> microaggressions</Bold> and
          <Bold> microaffirmations</Bold> that you encounter in real time at SF State.
        </Text>
      </View>
    ),
    bg: '#fff',
  },
  {
    key: 2,
    title: '2',
    content: (
      <ScrollView style={{ flex: 0 }}>
        <Title style={[
          styles.title,
          {
            // paddingBottom: 20,
            textAlign: 'left',
          },
        ]}>
          What are <Bold>microaggressions?</Bold>
        </Title>
        <Text style={[
          styles.text,
          {
            textAlign: 'left',
          },
        ]}>
          Microaggressions are subtle, often unintentional insults due to an aspect of
          your identity (most commonly ethnicity, gender, and sexual orientation).{"\n\n"}
          They can lead you to question if you're overreacting or reading into the situation
          too much. They can also make you feel invisible and/or unimportant.{"\n\n"}
          Microaggressions can be expressed verbally, through someone's behavior, or
          simply present in the environment.
      </Text>
      </ScrollView>
    ),
    bg: '#fff',
  },
  {
    key: 3,
    title: '3',
    content: (
      <ScrollView style={{ flex: 0 }}>
        <Title style={[
          styles.title,
          {
            // paddingBottom: 20,
            textAlign: 'left',
          },
        ]}>
          Microaggression Example #1
                </Title>
        <Image
          style={styles.exampleImage}
          source={require('../assets/images/m_ag_1.imageset/m_ag_1.jpg')}
          resizeMode="contain"
        />
        <Text style={[
          styles.text,
          {
            textAlign: 'left',
          },
        ]}>
          A math professor giving verbal praise and encouragement to the male
          students in their class, but not to the female students.
                </Text>
      </ScrollView>
    ),
    bg: '#fff',
  },
  {
    key: 4,
    title: '4',
    content: (
      <ScrollView style={{ flex: 0 }}>
        <Title style={[
          styles.title,
          {
            // paddingBottom: 20,
            textAlign: 'left',
          },
        ]}>
          Microaggression Example #2
                </Title>
        <Image
          style={styles.exampleImage}
          source={require('../assets/images/m_ag_2.imageset/m_ag_2.jpg')}
          resizeMode="contain"
        />
        <Text style={[
          styles.text,
          {
            textAlign: 'left',
          },
        ]}>
          When instructed to break into small groups, someone makes a face in
          your direction and turns away to avoid being in your group.
                </Text>
      </ScrollView>
    ),
    bg: '#fff',
  },
  {
    key: 5,
    title: '5',
    content: (
      <ScrollView style={{ flex: 0 }}>
        <Title style={[
          styles.title,
          {
            // paddingBottom: 20,
            textAlign: 'left',
          },
        ]}>
          Microaggression Example #3
                </Title>
        <Image
          style={styles.exampleImage}
          source={require('../assets/images/m_ag_3.imageset/m_ag_3.jpg')}
          resizeMode="contain"
        />
        <Text style={[
          styles.text,
          {
            textAlign: 'left',
          },
        ]}>
          Posters in your department only picturing white, male scientists and scholars.
                </Text>
      </ScrollView>
    ),
    bg: '#fff',
  },
  {
    key: 6,
    title: '6',
    content: (
      <ScrollView style={{ flex: 0 }}>
        <Title style={[
          styles.title,
          {
            // paddingBottom: 20,
            textAlign: 'left',
          },
        ]}>
          What are <Bold>microaffirmations?</Bold>
        </Title>
        <Text style={[
          styles.text,
          {
            textAlign: 'left',
          },
        ]}>
          Microaffirmations are subtle ways of valuing and acknowledging your identity.{"\n\n"}
                    Because they're subtle, microaffirmations generally are not large, obvious gestures.
                    However, they can still make you feel seen and important.{"\n\n"}Even someone
                    acknowledging or recognizing that a microaggression occurred is a microaffirmation.
                    {"\n\n"}Microaffirmations can also be expressed verbally, through someone's behavior,
                    or simply present in the environment.
                </Text>
      </ScrollView>
    ),
    bg: '#fff',
  },
  {
    key: 7,
    title: '7',
    content: (
      <ScrollView style={{ flex: 0 }}>
        <Title style={[
          styles.title,
          {
            // paddingBottom: 20,
            textAlign: 'left',
          },
        ]}>
          Microaffirmation Example #1
                </Title>
        <Image
          style={styles.exampleImage}
          source={require('../assets/images/m_af_1.imageset/m_af_1.jpg')}
          resizeMode="contain"
        />
        <Text style={[
          styles.text,
          {
            textAlign: 'left',
          },
        ]}>
          A math professor giving verbal praise and encouragement to their female students
          as well as their male students.
                </Text>
      </ScrollView>
    ),
    bg: '#fff',
  },
  {
    key: 8,
    title: '8',
    content: (
      <ScrollView style={{ flex: 0 }}>
        <Title style={[
          styles.title,
          {
            // paddingBottom: 20,
            textAlign: 'left',
          },
        ]}>
          Microaffirmation Example #2
                </Title>
        <Image
          style={styles.exampleImage}
          source={require('../assets/images/m_af_2.imageset/m_af_2.jpg')}
          resizeMode="contain"
        />
        <Text style={[
          styles.text,
          {
            textAlign: 'left',
          },
        ]}>
          When instructed to break into small groups, someone smiles and scoots
          toward you to be in your group.
                </Text>
      </ScrollView>
    ),
    bg: '#fff',
  },
  {
    key: 9,
    title: '9',
    content: (
      <ScrollView style={{ flex: 0 }}>
        <Title style={[
          styles.title,
          {
            // paddingBottom: 20,
            textAlign: 'left',
          },
        ]}>
          Microaffirmation Example #3
                </Title>
        <Image
          style={styles.exampleImage}
          source={require('../assets/images/m_af_3.imageset/m_af_3.jpg')}
          resizeMode="contain"
        />
        <Text style={[
          styles.text,
          {
            textAlign: 'left',
          },
        ]}>
          Posters in your department picturing a diverse representation of scientists and scholars.
                </Text>
      </ScrollView>
    ),
    bg: '#fff',
  },
  {
    key: 10,
    title: '10',
    content: (
      <ScrollView style={{ flex: 0, width: wp('80%'), paddingRight: 10}}>
        <SafeAreaView style={{ paddingBottom: 100 }}>
          <Text style={[
            styles.title,
            {
              // paddingBottom: 20,
              textAlign: 'left',
            },
          ]}>
            <Bold>Emotion reporting</Bold>
          </Text>
          <Text style={[
            styles.text,
            {
              textAlign: 'left',
            },
          ]}>
            Each time you report a microaggression or microaffirmation, we will ask you to
            rate how intensely you feel the following emotions:{"\n\n"}

            1. <Bold>Angry</Bold> - a strong feeling of hostility{"\n\n"}
            2. <Bold>Contempt</Bold> - the feeling that something is worthless{"\n\n"}
            3. <Bold>Disgust</Bold> - a feeling of distaste or profound disapproval{"\n\n"}
            4. <Bold>Fear</Bold> - distress prompted by a real or imagined threat{"\n\n"}
            5. <Bold>Guilt</Bold> - a feeling of remorse for some offense{"\n\n"}
            6. <Bold>Happy</Bold> - feeling pleasure or contentment{"\n\n"}
            7. <Bold>Pride</Bold> - satisfaction associated with one{"\n\n"}
            8. <Bold>Sad</Bold> - feeling sorrow or unhappiness{"\n\n"}
            9. <Bold>Shame</Bold> - a feeling of shame following one{"\n\n"}
            10. <Bold>Surprise</Bold> - astonishment due to an unexpected event
          </Text>
        </SafeAreaView>
      </ScrollView>
    ),
    bg: '#fff',
  },
];
