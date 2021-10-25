import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert,
    Dimensions
} from 'react-native';

import { Button } from '../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export function UserIdentification() {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [message, setMessage] = useState<string>()
    const [messageType, setMessageType] = useState<string>();

    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true);
    }

    const handleMessage = (message: string, type = "FAILED") => {
        setMessage(message);
        setMessageType(type);
    }

    function handleInputChangeName(value: string) {
        setIsFilled(!!value);
        setName(value);
    }
    function handleInputChangePassword(value: string) {
        setIsFilled(!!value);
        setPassword(value);
    }

    async function handleLogin() {
        if (!name)
            return Alert.alert('Insira seu email')
        if (!password)
            return Alert.alert('Insira sua senha')
        let credentials = { name, password };
       
        try {
            handleMessage("");
            const url = "http://192.168.18.31:3000/user/signin";
            axios
                .post(url, credentials)
                .then((response) => {
                    const result = response.data;
                    const { message, status, data } = result;
                    if (status !== "SUCCESS") {
                        console.log(response.data.message);
                        Alert.alert(response.data.message);
                    } else {
                        console.log(response.data.message);
                        //salvar email
                        AsyncStorage.setItem('@plantmanager:user', name);
                        navigation.navigate("ModuleSelect", { ...data[0] });
                    }
                }).catch(error => {
                    console.log('erro:', error)
                    console.log(error.response.data);
                })
            // await AsyncStorage.setItem('@plantmanager:user', name);
            // await AsyncStorage.setItem('@plantmanager:password', password);
            // navigation.navigate('ModuleSelect');
            
        } catch {
            return Alert.alert('Não foi possível efetuar o login')
        }
        
        /*
        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            await AsyncStorage.setItem('@plantmanager:password', password);
            navigation.navigate('ModuleSelect');
        } catch {
            return Alert.alert('Não foi possível salvar nome do pet')
        }
        */

    }

    function handleRegister() {
        navigation.navigate('RegisterForm');
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.title}>
                                    Login
                                </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.green }
                                ]}
                                placeholder="nome@email.com"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChangeName}
                            />
                            <TextInput
                                style={[
                                    styles.inputPass,
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.green }
                                ]}
                                placeholder="senha"
                                secureTextEntry={true}
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChangePassword}
                            />
                            <View style={styles.footer}>
                                <Button
                                    title={'Confirmar'}
                                    onPress={handleLogin}
                                />
                            </View>
                            <View style={styles.footer}>
                                <Text style={styles.subtitle}>
                                    Ainda não tem uma conta? Aperte o botão abaixo para fazer o seu cadastro!
                                </Text>
                            </View>

                        </View>
                        <View style={styles.footer2}>
                            <Button
                                title={'Quero me cadastrar!'}
                                onPress={handleRegister}
                            />
                            <Text style={styles.subtitle2}>
                                    Suporte: support@feedmypet.com
                                </Text>
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
    subtitle: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 10,
        color: colors.heading,
        fontFamily: fonts.text
    },
    subtitle2: {
        textAlign: 'center',
        marginTop:15,
        fontSize: 14,
        color: '#b4b4b4',
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
    inputPass: {
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
        marginTop: 40,
        paddingHorizontal: 20
    },
    footer2: {
        width: '100%',
        marginBottom: 40,
        marginTop: 40,
        paddingHorizontal: 75
    }

});