import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    ScrollView,
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
import RNPickerSelect from 'react-native-picker-select';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



// interface Params {
//     plant: PlantProps
// }

export function RegisterFood() {
    const [refeicoes, setRefeicoes] = useState<string>();
    const [porcoes, setPorcoes] = useState<string>();

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
        navigation.navigate('RegisterModule');
    }

    async function handleSave() {
        try {
            // await savePlant({
            //     // ...plant,
            //     dateTimeNotification: selectedDateTime
            // });

            navigation.navigate('RegisterFoodTime');
        } catch {
            Alert.alert('Não foi possível salvar.');
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
                        <View style={styles.controller}>

                            <Text style={styles.text}>
                                Escolha a quantidade de refeições por dia e suas porções.
                            </Text>
                            <Text style={styles.subtext}>
                                Uma porção = 10g
                            </Text>

                            <Text style={styles.dropdownTitle}>
                                Quantidade de refeições
                            </Text>

                            <View style={styles.Dropdown}>
                                <RNPickerSelect
                                    placeholder={{ label: "Selecione a quantidade", value: null }}
                                    pickerProps={{ style: { height: 40, overflow: 'hidden', justifyContent: 'center' } }}
                                    onValueChange={(value) => handleRefeicoesChange(value)}
                                    items={[
                                        { label: "1", value: "1" },
                                        { label: "2", value: "2" },
                                        { label: "3", value: "3" },
                                        { label: "4", value: "4" },
                                        { label: "5", value: "5" }
                                    ]}
                                />
                                <Text>

                                </Text>
                                <Text style={styles.dropdownTitle}>
                                    Porções por refeição
                                </Text>
                                <RNPickerSelect
                                    placeholder={{ label: "Selecione a quantidade", value: null }}
                                    pickerProps={{ style: { height: 40, overflow: 'hidden' } }}
                                    onValueChange={(value) => handlePorcoes(value)}
                                    items={[
                                        { label: "1", value: "1" },
                                        { label: "2", value: "2" },
                                        { label: "3", value: "3" },
                                        { label: "4", value: "4" },
                                        { label: "5", value: "5" }
                                    ]}
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
        textAlign: 'left',
        fontSize: 20,
        paddingHorizontal: 10,
        color: colors.heading,
        fontFamily: fonts.text,
        marginTop: 40
    },
    Dropdown: {
        backgroundColor: "#fff",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "100%"
    },
    footer: {
        width: '100%',
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