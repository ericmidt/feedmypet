import React, { useState, useEffect, } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    TextInput,
    Keyboard,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView
} from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import { useRoute } from '@react-navigation/core';
import { Button } from '../components/Button';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import api from '../services/api';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { format, isBefore, isDate } from 'date-fns';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonBack } from '../components/ButtonBack';
import { Load } from '../components/Load';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

interface Horario {
    nome: string,
    id: number
}

export function ModuleEdit() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const [selectedDateTime2, setSelectedDateTime2] = useState(new Date());
    const [showDatePicker2, setShowDatePicker2] = useState(Platform.OS == 'ios');

    const [selectedDateTime3, setSelectedDateTime3] = useState(new Date());
    const [showDatePicker3, setShowDatePicker3] = useState(Platform.OS == 'ios');

    const [selectedDateTime4, setSelectedDateTime4] = useState(new Date());
    const [showDatePicker4, setShowDatePicker4] = useState(Platform.OS == 'ios');

    const [selectedDateTime5, setSelectedDateTime5] = useState(new Date());
    const [showDatePicker5, setShowDatePicker5] = useState(Platform.OS == 'ios');

    const route = useRoute();

    const [quantity, setQuantity] = useState<any | null>(null);
    const [horarios, setHorarios] = useState<Horario[]>([])
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [horario1, setHorario1] = useState(true);
    const [horario2, setHorario2] = useState(true);
    const [horario3, setHorario3] = useState(true);
    const [horario4, setHorario4] = useState(true);
    const [horario5, setHorario5] = useState(true);
    // const { plant } = route.params as Params;
    // extra Input
    const [petName, setPetName] = useState<string>();
    const [refeicoes, setRefeicoes] = useState<string>();
    const [porcoes, setPorcoes] = useState<string>();

    const [pesoComida, setPesoComida] = useState<number>();
    const [pesoAgua, setPesoAgua] = useState<number>();
    const [petName2, setPetName2] = useState<string>();


    //handler inputs
    //extra inputs
    function handleInputPetName(value: string) {
        setPetName(value);
    }

    function handleRefeicoesChange(value: string) {
        setRefeicoes(value);

    }

    function handlePorcoes(value: string) {
        setPorcoes(value);
    }

    function handleAgua(value: number) {
        setPesoAgua(value);
    }


    function handleComida(value: number) {
        setPesoComida(value);
    }


    function handlePetName2(value: string) {
        setPetName2(value);
    }


    useEffect(() => {
        async function fetchRefeicoes() {
            const refeicaoQuantity = await AsyncStorage.getItem('@feedmypet:refeicao_quantity');
            const porcoes = await AsyncStorage.getItem('@feedmypet:porcoes');
            const petName = await AsyncStorage.getItem('@feedmypet:petName');
            const mealTime1 = await AsyncStorage.getItem('@feedmypet:mealTime1');
            const mealTime2 = await AsyncStorage.getItem('@feedmypet:mealTime2');
            const mealTime3 = await AsyncStorage.getItem('@feedmypet:mealTime3');
            const mealTime4 = await AsyncStorage.getItem('@feedmypet:mealTime4');
            const mealTime5 = await AsyncStorage.getItem('@feedmypet:mealTime5');
            const pesoComida = await AsyncStorage.getItem('@feedmypet:pesoComida');
            const pesoAgua = await AsyncStorage.getItem('@feedmypet:pesoAgua');



            const moduleData = {
                refeicaoQuantity,
                porcoes,
                petName,
                mealTime1,
                mealTime2,
                mealTime3,
                mealTime4,
                mealTime5
            }

            if (mealTime1 && mealTime2 && mealTime3 && mealTime4 && mealTime5 && petName && porcoes && refeicaoQuantity && pesoComida && pesoAgua) {
                let time1 = new Date(mealTime1);
                let time2 = new Date(mealTime2);
                let time3 = new Date(mealTime3);
                let time4 = new Date(mealTime4);
                let time5 = new Date(mealTime5);

                console.log('This is petName: ', petName);
                setPetName(petName);
                setRefeicoes(refeicaoQuantity);
                setPorcoes(porcoes);
                setSelectedDateTime(time1);
                setSelectedDateTime2(time2);
                setSelectedDateTime3(time3);
                setSelectedDateTime4(time4);
                setSelectedDateTime5(time5);
                setPesoComida(Number(pesoComida));
                setPesoAgua(Number(pesoAgua));
            }

            console.log('refeicao', refeicaoQuantity)
            let data = [];
            if (refeicaoQuantity) {
                setQuantity(refeicaoQuantity);

                for (let i = 0; i < Number(refeicaoQuantity); i++) {
                    data.push(
                        {
                            nome: 'Horário ' + (i + 1),
                            id: (i + 1)
                        }
                    )
                }
                horarios.forEach((element) => {
                })
                setHorarios(data);


                // filtrar componentes do horario
                if (Number(refeicaoQuantity) === 5) {
                    setHorario1(false);
                    setHorario2(false);
                    setHorario3(false);
                    setHorario4(false);
                    setHorario5(false);
                } else if (Number(refeicaoQuantity) === 4) {
                    setHorario1(false);
                    setHorario2(false);
                    setHorario3(false);
                    setHorario4(false);
                } else if (Number(refeicaoQuantity) === 3) {
                    setHorario1(false);
                    setHorario2(false);
                    setHorario3(false);
                } else if (Number(refeicaoQuantity) === 2) {
                    setHorario1(false);
                    setHorario2(false);
                }
                else if (Number(refeicaoQuantity) === 1) {
                    setHorario1(false);
                }
            }

        }



        fetchRefeicoes();
        setLoading(false);
        setLoadingMore(false);
    }, [])


    const navigation = useNavigation();

    function handleReturn() {
        navigation.goBack();
    }

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleChangeTime2(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker2(oldState => !oldState);
        }

        if (dateTime)
            setSelectedDateTime2(dateTime);
    }

    function handleChangeTime3(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker3(oldState => !oldState);
        }

        if (dateTime)
            setSelectedDateTime3(dateTime);
    }

    function handleChangeTime4(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker4(oldState => !oldState);
        }

        if (dateTime)
            setSelectedDateTime4(dateTime);
    }

    function handleChangeTime5(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker5(oldState => !oldState);
        }

        if (dateTime)
            setSelectedDateTime5(dateTime);
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)

    }

    function handleOpenDateTimePickerForAndroid2() {
        setShowDatePicker2(oldState => !oldState)

    }

    function handleOpenDateTimePickerForAndroid3() {
        setShowDatePicker3(oldState => !oldState)

    }

    function handleOpenDateTimePickerForAndroid4() {
        setShowDatePicker4(oldState => !oldState)

    }

    function handleOpenDateTimePickerForAndroid5() {
        setShowDatePicker5(oldState => !oldState)

    }

    async function handleSave() {
        const user_email = await AsyncStorage.getItem('@feedmypet:user');


        try {
            // SALVAR INFORMAÇÕES DE COMIDA NA API
            console.log('email do usuario: ', user_email)

            try {
                console.log('ref', refeicoes)
                console.log('por', porcoes)
                let data = {
                    petName,
                    id: 0,
                    mealQuantity: refeicoes,
                    portionsPerMeal: porcoes,
                    email: user_email,
                    mealTime1: selectedDateTime,
                    mealTime2: selectedDateTime2,
                    mealTime3: selectedDateTime3,
                    mealTime4: selectedDateTime4,
                    mealTime5: selectedDateTime5,
                    pesoComida: pesoComida,
                    pesoAgua: pesoComida
                };

                console.log('data construido para envio ao db', data);
                const url = api + "/user/registerschedule";
                axios
                    .post(url, data)
                    .then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;
                        console.log(message);
                        if (status !== "SUCCESS") {
                            console.log(response.data.message);
                            Alert.alert(response.data.message);
                        } else {
                            //atualizando sync storage

                            if (refeicoes && porcoes && petName && selectedDateTime && selectedDateTime2 && selectedDateTime3 && selectedDateTime4 && selectedDateTime5) {
                                AsyncStorage.setItem('@feedmypet:refeicao_quantity', refeicoes);
                                AsyncStorage.setItem('@feedmypet:porcoes', porcoes);
                                AsyncStorage.setItem('@feedmypet:petName', petName);
                            }

                            console.log(' edit module data: ', data)
                            console.log(response.data.message);
                            navigation.navigate("UserIdentification");
                        }
                    }).catch(error => {
                        console.log(error);
                        console.log(error.response.data);
                    })

                //navigation.navigate('RegisterPostForm');
            } catch {
                return Alert.alert('Não foi possível salvar as informações...')
            }
        } catch {
            Alert.alert('Não foi possível salvar.');
        }


    }



    if (loading)
        return <Load />

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.container}
                >

                    <ScrollView style={styles.content}>
                        <ButtonBack
                            title={'<'}
                            style={styles.button}
                            activeOpacity={0.7}
                            onPress={handleReturn}
                        />
                        <View style={styles.controller}>

                            <Text style={styles.text}>
                                Aqui você pode atualizar os dados do seu alimentador!
                            </Text>


                            <View style={styles.horarioBorder2} >
                                <Text style={styles.dropdownTitle}>
                                    Nome do Pet
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={petName}

                                    onChangeText={handleInputPetName}
                                />
                            </View>

                            <View style={styles.horarioBorder2} >
                                <Text style={styles.dropdownTitle}>
                                    Quantidade de refeições
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={refeicoes}
                                    onChangeText={(value) => handleRefeicoesChange(value)}
                                />
                            </View>
                            <View style={styles.horarioBorder2} >
                                <Text style={styles.dropdownTitle}>
                                    Porções por refeição
                                </Text>
                                <TextInput
                                    style={styles.input}
                                    value={porcoes}
                                    onChangeText={(value) => handlePorcoes(value)}
                                />
                            </View>

                            {/* HORARIO 1*/}
                            {!horario1 && <View style={styles.horarioBorder} >
                                <Text style={styles.timeTitle}>
                                    Horário 1
                                </Text>
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={selectedDateTime}
                                        mode="time"

                                        onChange={handleChangeTime}
                                    />
                                )}
                                {
                                    Platform.OS === 'android' && (
                                        <TouchableOpacity
                                            style={styles.dateTimePickerButton}
                                            onPress={handleOpenDateTimePickerForAndroid}
                                        >
                                            <Text style={styles.dateTimePickerText}>
                                                {`${format(selectedDateTime, 'HH:mm')}`}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View >
                            }
                            {/* HORARIO 2*/}
                            {!horario2 && <View style={styles.horarioBorder}>
                                <Text style={styles.timeTitle}>
                                    Horário 2
                                </Text>
                                {showDatePicker2 && (
                                    <DateTimePicker
                                        value={selectedDateTime2}
                                        mode="time"

                                        onChange={handleChangeTime2}
                                    />
                                )}
                                {
                                    Platform.OS === 'android' && (
                                        <TouchableOpacity
                                            style={styles.dateTimePickerButton}
                                            onPress={handleOpenDateTimePickerForAndroid2}
                                        >
                                            <Text style={styles.dateTimePickerText}>
                                                {`${format(selectedDateTime2, 'HH:mm')}`}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }

                            </View >
                            }
                            {/* HORARIO 3*/}
                            {!horario3 && <View style={styles.horarioBorder}>
                                <Text style={styles.timeTitle}>
                                    Horário 3
                                </Text>
                                {showDatePicker3 && (
                                    <DateTimePicker
                                        value={selectedDateTime3}
                                        mode="time"

                                        onChange={handleChangeTime3}
                                    />
                                )}
                                {
                                    Platform.OS === 'android' && (
                                        <TouchableOpacity
                                            style={styles.dateTimePickerButton}
                                            onPress={handleOpenDateTimePickerForAndroid3}
                                        >
                                            <Text style={styles.dateTimePickerText}>
                                                {`${format(selectedDateTime3, 'HH:mm')}`}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                            }
                            {/* HORARIO 4*/}
                            {!horario4 && <View style={styles.horarioBorder}>
                                <Text style={styles.timeTitle}>
                                    Horário 4
                                </Text>
                                {showDatePicker4 && (
                                    <DateTimePicker
                                        value={selectedDateTime4}
                                        mode="time"

                                        onChange={handleChangeTime4}
                                    />
                                )}
                                {
                                    Platform.OS === 'android' && (
                                        <TouchableOpacity
                                            style={styles.dateTimePickerButton}
                                            onPress={handleOpenDateTimePickerForAndroid4}
                                        >
                                            <Text style={styles.dateTimePickerText}>
                                                {`${format(selectedDateTime4, 'HH:mm')}`}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                            }
                            {/* HORARIO 5*/}
                            {!horario5 && <View style={styles.horarioBorder}>
                                <Text style={styles.timeTitle}>
                                    Horário 5
                                </Text>
                                {showDatePicker5 && (
                                    <DateTimePicker
                                        value={selectedDateTime5}
                                        mode="time"

                                        onChange={handleChangeTime5}
                                    />
                                )}
                                {
                                    Platform.OS === 'android' && (
                                        <TouchableOpacity
                                            style={styles.dateTimePickerButton}
                                            onPress={handleOpenDateTimePickerForAndroid5}
                                        >
                                            <Text style={styles.dateTimePickerText}>
                                                {`${format(selectedDateTime5, 'HH:mm')}`}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>
                            }

                            <View style={styles.horarioBorder2} >
                                <Text style={styles.text}>
                                    Peso da água: {pesoComida}g
                                </Text>
                            </View>

                            <View style={styles.horarioBorder2} >
                                <Text style={styles.text}>
                                    Peso da ração: {pesoAgua}ml
                                </Text>

                            </View>

                        </View>

                    </ScrollView>
                </ScrollView>
                <View style={styles.footer}>
                    <Button
                        title="Salvar"
                        onPress={handleSave}
                    />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 800,
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        width: '100%'
    },
    scrollListContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 10,
        color: colors.heading,
        fontFamily: fonts.text
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
    input: {

        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 30,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 10,
        textAlign: 'center',
        maxWidth: 250
    },
    timeTitle: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 18,
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
    },
    footer: {
        width: '100%',
        marginBottom: 40,
        paddingHorizontal: 20
    },
    dropdownTitle: {
        textAlign: 'center',
        fontSize: 20,
        paddingHorizontal: 10,
        color: colors.heading,
        fontFamily: fonts.text,
        marginTop: 40
    },
    horarioBorder: {
        padding: 0,
        borderBottomWidth: 1,
        borderColor: '#eeeeee'
    },
    horarioBorder2: {
        padding: 0,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#eeeeee'
    }
});