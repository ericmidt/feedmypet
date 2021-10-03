import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
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
import AsyncStorage from '@react-native-async-storage/async-storage';

// form validation library import
import { useForm } from "react-hook-form";

export function RegisterForm() {
    // const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const [petName, setPetName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordConfirm, setPasswordConfirm] = useState<string>();

    const navigation = useNavigation();

    //
    const { register, handleSubmit } = useForm();

    // function handleInputBlur() {
    //     setIsFocused(false);
    //     setIsFilled(!!name);
    // }

    // function handleInputFocus() {
    //     setIsFocused(true);
    // }

    function handleInputName(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    function handleInputPetName(value: string) {
        setIsFilled(!!value);
        setPetName(value);
    }

    function handleInputEmail(value: string) {
        setIsFilled(!!value);
        setEmail(value);
    }

    function handleInputPassword(value: string) {
        setIsFilled(!!value);
        setPassword(value);
    }

    function handleInputPasswordConfirm(value: string) {
        setIsFilled(!!value);
        setPasswordConfirm(value);
    }

    function handleReturn() {
        navigation.navigate('UserIdentification');
    }

    async function submitHandler() {
        if (!(name && petName && email && password && passwordConfirm))
            return Alert.alert('Preencha todos os dados por favor!')
        if (password != passwordConfirm)
            return Alert.alert('As senhas são diferentes!')
        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            await AsyncStorage.setItem('@plantmanager:pet', petName);
            await AsyncStorage.setItem('@plantmanager:email', email);
            await AsyncStorage.setItem('@plantmanager:password', password);

            navigation.navigate('RegisterPostForm');
        } catch {
            return Alert.alert('Não foi possível realizar o cadastro...')
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
                                    Precisamos de alguns dados para começar.
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    // (isFocused || isFilled) &&
                                    // { borderColor: colors.green }
                                ]}
                                placeholder="Seu nome"
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleInputName}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    // (isFocused || isFilled) &&
                                    // { borderColor: colors.green }
                                ]}
                                placeholder="Nome do seu pet"
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleInputPetName}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    // (isFocused || isFilled) &&
                                    // { borderColor: colors.green }
                                ]}
                                placeholder="nome@email.com"
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleInputEmail}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    // (isFocused || isFilled) &&
                                    // { borderColor: colors.green }
                                ]}
                                placeholder="senha"
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleInputPassword}
                                secureTextEntry={true}
                            />
                            <TextInput
                                style={[
                                    styles.input,
                                    // (isFocused || isFilled) &&
                                    // { borderColor: colors.green }
                                ]}
                                placeholder="Confirmar senha"
                                // onBlur={handleInputBlur}
                                // onFocus={handleInputFocus}
                                onChangeText={handleInputPasswordConfirm}
                                secureTextEntry={true}
                            />

                        </View>
                        <View style={styles.footer}>
                            <Button
                                title={'Confirmar'}
                                onPress={submitHandler}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
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
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
        marginBottom: 40
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