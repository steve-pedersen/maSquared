import React, { Component } from 'react';
import { Text, View, Slider, Image, StyleSheet } from 'react-native';
import Layout from '../constants/Layout';


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
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={this.props.minimumValue}
                maximumValue={this.props.maximumValue}
                minimumTrackTintColor={this.props.minimumTrackTintColor}
                maximumTrackTintColor={this.props.maximumTrackTintColor}
                step={1}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  image: {
      // height: (Layout.window.height / 3),
      // width: (Layout.window.width / 2),
      // marginTop: (Layout.window.height / 8 - 40),
      // width: '100%', 
      alignSelf: 'center',
      marginBottom: 5,
  },
  exampleImage: {
      // height: (Layout.window.height / 2),
      width: (Layout.window.width / 1.25),
      justifyContent: 'center',
      marginVertical: -(Layout.window.height / 15),     
  },
  text: {
      color: '#000',
      textAlign: 'center',
      fontSize: 16,
  },
});

export default EmotionSlider;