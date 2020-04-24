import React, { Component } from 'react';
import { Text, View, Slider } from 'react-native';


class EmotionSlider extends Component {
    render() {
        return (
            <View style={this.props.containerStyle}>
              <Text style={this.props.titleStyle}>{this.props.title}</Text>
              <Slider
                value={this.props.value}
                onValueChange={this.props.onChange}
                style={{ width: '90%', alignSelf: 'center' }}
                minimumValue={this.props.minimumValue}
                maximumValue={this.props.maximumValue}
                minimumTrackTintColor={this.props.minimumTrackTintColor}
                maximumTrackTintColor={this.props.maximumTrackTintColor}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Not at all</Text>
                <Text>Extremely</Text>
              </View>
            </View>
        );
    }
}

export default EmotionSlider;