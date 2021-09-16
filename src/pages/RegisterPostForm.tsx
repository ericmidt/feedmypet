import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert,
    Dimensions
} from 'react-native';

import { Button } from '../components/Button';
import { ButtonBack } from '../components/ButtonBack';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export function RegisterPostForm() {

    const navigation = useNavigation();


    function handleReturn() {
        navigation.navigate('Register');
    }

    async function handleSubmit() {
        try {
            navigation.navigate('RegisterModule');
        } catch {
            return Alert.alert('Aconteceu algum erro...')
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <ButtonBack
                            title={'<'}
                            style={styles.button}
                            activeOpacity={0.7}
                            onPress={handleReturn}
                        />
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <View style={styles.footer}>

                                </View>
                                <Text style={styles.text}>
                                    Perfeito!
                                    Agora vamos cadastrar o seu módulo!
                                </Text>
                            </View>

                        </View>
                    </View>

                </TouchableWithoutFeedback>
                <View style={styles.footer}>
                    <Button
                        title={'Começar'}
                        onPress={handleSubmit}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    button: {
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 50,
        marginLeft: 25,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        paddingHorizontal: 10,
        color: colors.heading,
        fontFamily: fonts.text
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 10,
        color: colors.heading,
        fontFamily: fonts.text
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center'
    },
    emoji: {
        fontSize: 44
    },
    image: {
        height: Dimensions.get('window').width * 0.55
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },
    footer: {
        width: '100%',
        marginBottom: 40,
        paddingHorizontal: 20
    }
});