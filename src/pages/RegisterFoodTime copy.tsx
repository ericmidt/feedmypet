import React, { useState, useEffect, } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Platform,
    Keyboard,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView
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

import AsyncStorage from '@react-native-async-storage/async-storage';



interface Horario {
    nome: string,
    id: number
}

export function RegisterFoodTime() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
    const route = useRoute();

    const [refeicoes, setRefeicoes] = useState<any | null>(null);
    const [horarios, setHorarios] = useState<Horario[]>([])
    // const { plant } = route.params as Params;
    async function loadStorageRefeicao() {
        const refeicaoQuantity  = await AsyncStorage.getItem('@plantmanager:refeicao_quantity');
        
        if(refeicaoQuantity)
        setRefeicoes(refeicaoQuantity.valueOf());

        console.log('horarios',horarios);
        console.log('refeicoes', refeicoes);
        console.log('refeicaoQuantity', refeicaoQuantity.valueOf());

        for( let i = 0 ; i < refeicoes; i++){
            console.log('index: ', i)
            setHorarios(previous => [
                 ...previous,{nome: ('Horário: ' + i), id: i}
            ])
        }
        console.log('HELLOOOOO')
        horarios.forEach((element , index) => {
            console.log('element: ', element.nome)
        })
    }

    

    const navigation = useNavigation();

    function handleReturn() {
        navigation.navigate('RegisterFood');
    }

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }

        if (dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDateTimePickerForAndroid() {
        setShowDatePicker(oldState => !oldState)
    }

    async function handleSave() {
        try {
            // await savePlant({
            //     // ...plant,
            //     dateTimeNotification: selectedDateTime
            // });

            navigation.navigate('RegisterSuccess');
        } catch {
            Alert.alert('Não foi possível salvar.');
        }
    }


    useEffect(() => {
        loadStorageRefeicao()
    }, [refeicoes])

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
                                Chegou a hora de agendar a primeira refeição do seu pet!

                                Escolha o(s) horário(s) desejado(s) abaixo.
                            </Text>
                            {
                            horarios.map(item => (
                                <>
                                    <Text key={item.id} style={styles.timeTitle}>
                                        Horário {item.id}
                                    </Text>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={selectedDateTime}
                                            mode="time"
                                            display="spinner"
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
                                </>
                            ))}
                            
                            
                        </View>

                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Button
                        title="Cadastrar horário"
                        onPress={handleSave}
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
        fontSize: 25,
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
    timeTitle: {
        textAlign: 'left',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 20,
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
    }
});