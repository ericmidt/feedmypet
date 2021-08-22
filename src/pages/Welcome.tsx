import React from 'react';
import {
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    View
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import tofuSleeping from '../../assets/splash.png';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useNavigation } from '@react-navigation/native';

export function Welcome() {
    const navigation = useNavigation();
    function handleStart() {
        navigation.navigate('UserIdentification');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>

                <Image
                    source={tofuSleeping}
                    style={styles.image}
                    resizeMode="contain"
                />

                <Text style={styles.title}>
                    Alimente seu pet{'\n'}
                    sem stress
                </Text>

                <Text style={styles.subtitle}>
                    Não precisa mais se preocupar com as refeições do seu pet. Nós cuidamos disso por você.
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.7}
                    onPress={handleStart}
                >
                    <Feather
                        name="chevron-right"
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 38,
        fontFamily: fonts.heading,
        lineHeight: 34
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    image: {
        height: Dimensions.get('window').width * 0.55
    },
    button: {
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    buttonIcon: {
        fontSize: 32,
        color: colors.white
    }
});