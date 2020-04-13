import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const Bold = ({ children }) => <Text style={{ fontWeight: 'bold' }}>{children}</Text>

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
    },
    image: {
        width: 320,
        height: 320,
        marginVertical: 32,
    },
    text: {
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
    },
});

const slides = [
    {
        key: 1,
        title: '1',
        content: <View><Text style={styles.text}>
            In this app, we would like you to log{"\n"}<Bold>microaggressions</Bold> and <Bold>microaffirmations</Bold> that{"\n"}you encounter in real time at SF State.
        </Text></View>,
        bg: '#59b2ab',
    },
    {
        key: 2,
        title: '2',
        content: (
            <View>
                <Text style={styles.title}>Title 2</Text>
                <Text style={styles.text}>Other cool stuff</Text>
            </View>
        ),
        bg: '#febe29',
    },
    {
        key: 3,
        title: '3',
        content: (
            <View>
                <Text style={styles.title}>Title 3</Text>
                <Text style={styles.text}>Some other text</Text>
            </View>
        ),
        bg: '#22bcb5',
    }
];

class IntroSlideshow extends React.Component {
    _keyExtractor = (item) => item.title;

    _renderItem = ({ item }) => {
        return (
            <View
                style={[
                    styles.slide,
                    {
                        backgroundColor: item.bg,
                    },
                ]}>
                {item.content}
            </View>
        );
    }
    _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        this.setState({ showRealApp: true });
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar translucent backgroundColor="transparent" />
                <AppIntroSlider
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    data={slides}
                />
            </View>
        );
    }
}



export default IntroSlideshow;