import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import Layout from '../constants/Layout';
import {
  widthPercentageToDP as wp, 
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class EmotionSlider extends Component {
    render() {
        return (
            <View style={this.props.containerStyle}>
              <Text style={this.props.titleStyle}>{this.props.title}</Text>
              <Image
                    style={styles.image}
                    source={this.props.imageSrc}
                    resizeMode="contain"
                />
              <Slider
                value={this.props.value}
                onValueChange={this.props.onChange}
                style={{ width: wp('90%'), alignSelf: 'center' }}
                minimumValue={this.props.minimumValue}
                maximumValue={this.props.maximumValue}
                minimumTrackTintColor={this.props.minimumTrackTintColor}
                maximumTrackTintColor={this.props.maximumTrackTintColor}
                step={1}
                tapToSeek={true}
                thumbTintColor={this.props.minimumTrackTintColor}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.text}>Not at all</Text>
                <Text style={styles.text}>Extremely</Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  image: {
      alignSelf: 'center',
      width: wp('89%'),
      height: hp('6%')
  },
  exampleImage: {
      width: wp('90%'),
      justifyContent: 'center',
      marginVertical: -(Layout.window.height / 15),     
  },
  text: {
      color: '#000',
      textAlign: 'center',
      fontSize: hp('1.75%'),
  },
});

export default EmotionSlider;