import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useRoute } from '@react-navigation/core';
import { Button } from '../components/Button';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { format, isBefore } from 'date-fns';
import { PlantProps, savePlant } from '../libs/storage';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonBack } from '../components/ButtonBack';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// email and password validator
import * as yup from 'yup';
import api from '../services/api';

// interface Params {
//     plant: PlantProps
// }

export function RegisterFood() {
    const [refeicoes, setRefeicoes] = useState<string>();
    const [porcoes, setPorcoes] = useState<string>();

    // food limitations
    const inputSchema = yup.object().shape({
        refeicoes: yup
            .number()
            .defined()
            .min(1,'Numero de refeições inválido, escolha entre 1 e 5')
            .max(5, 'Numero de refeições inválido, escolha entre 1 e 5'),
        porcoes: yup
            .number()
            .min(1,'Numero de porções inválido, escolha entre 1 e 5')
            .max(5, 'Numero de porções inválido, escolha entre 1 e 5')
            .defined(),
        
    });
    

    const route = useRoute();

    // const { plant } = route.params as Params;

    const navigation = useNavigation();

    function handleRefeicoesChange(value: string) {
        setRefeicoes(value);

    }

    function handlePorcoes(value: string) {
        setPorcoes(value);
    }

    function handleReturn() {
        navigation.goBack();
    }

    function isNumeric(num: any){
        return !isNaN(num)
    }

    async function handleSave() {
        const refeicaoQuantity  = await AsyncStorage.getItem('@plantmanager:refeicao_quantity');
        if (!(refeicoes && porcoes))
        return Alert.alert('Preencha todos os dados por favor!')
        try {
            // await savePlant({
            //     // ...plant,
            //     dateTimeNotification: selectedDateTime
            // });
            // refeicoes validation
        if(!isNumeric(refeicoes) ||  !isNumeric(porcoes))
        return Alert.alert('Apenas números são aceitos')
        inputSchema
        .validate({
            porcoes: porcoes,
            refeicoes: refeicoes
        }).then(function(valid){
            // SALVAR INFORMAÇÕES DE COMIDA NA API
            console.log('')
            
            /*
            try {
                let credentials = { name, petName, email, password };
                console.log(credentials);
                const url = "http://192.168.18.31:3000/user/signup";
                axios
                    .post(url, credentials)
                    .then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;
                        console.log(message);
                        if (status !== "SUCCESS") {
                            console.log(response.data.message);
                            Alert.alert(response.data.message);
                        } else {
                            console.log(response.data.message);
                            navigation.navigate("RegisterPostForm", { ...data[0] });
                        }
                    }).catch(error => {
                        console.log(error);
                        console.log(error.response.data);
                    })

                //navigation.navigate('RegisterPostForm');
            } catch {
                return Alert.alert('Não foi possível realizar o cadastro...')
            }
            */


            navigation.navigate('RegisterFoodTime');
          })
          .catch(function (err) {
            alert(err.errors );
            //err.errors; 
          });
        } catch {
            Alert.alert('Não foi possível salvar.');
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset = {-300} // adjust the value here if you need more padding: ;
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
                        <View style={styles.controller}>

                            <Text style={styles.text}>
                                Escolha a quantidade de refeições por dia e suas porções.
                            </Text>
                            <Text style={styles.subtext}>
                                Uma porção = 10g
                            </Text>
                            <View style={styles.Dropdown}>
                                <Text style={styles.dropdownTitle}>
                                Quantidade de refeições
                                </Text>
                                <TextInput
                                    style={[
                                    styles.input,
                                    // (isFocused || isFilled) &&
                                    // { borderColor: colors.green }
                                 ]}
                                    placeholder="Refeições (1-5)"
                                    // onBlur={handleInputBlur}
                                    // onFocus={handleInputFocus}
                                    onChangeText={(value) => handleRefeicoesChange(value)}
                                    />

                                <Text style={styles.dropdownTitle}>
                                    Porções por refeição
                                </Text>
                                <TextInput
                                    style={[
                                    styles.input,
                                    // (isFocused || isFilled) &&
                                    // { borderColor: colors.green }
                                    ]}
                                    placeholder="Porções (1-5)"
                                    // onBlur={handleInputBlur}
                                    // onFocus={handleInputFocus}
                                    onChangeText={(value) => handlePorcoes(value)}
                                />
                            </View>
                        </View>
                        <View style={styles.footer}>
                            <Button
                                title={'Confirmar'}
                                onPress={handleSave}
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
        justifyContent: 'center'
    },
    content: {
        flex: 1,
        width: '100%'
        
    },
    dropdownTitle: {
        textAlign: 'center',
        fontSize: 20,
        paddingHorizontal: 10,
        color: colors.heading,
        fontFamily: fonts.text,
        marginTop: 40
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 30,
        padding: 10,
        textAlign: 'center',
        maxWidth: 250
    },
    Dropdown: {
        backgroundColor: "#fff",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
        width: "100%",
        marginVertical: 20
        
    },
    footer: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 300,
        marginBottom: 40,
        paddingHorizontal: 20
    },
    scrollListContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    controller: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    text: {
        textAlign: 'center',
        fontSize: 25,
        paddingHorizontal: 10,
        color: colors.heading,
        fontFamily: fonts.text
    },
    subtext: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 20,
        marginBottom: 10
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
        width: 56
    },
    timeTitle: {
        textAlign: 'left',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 20
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dateTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dateTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    }
});