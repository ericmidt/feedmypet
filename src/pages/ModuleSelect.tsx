import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityProps,
    FlatList,
    TextInput,
    ActivityIndicator,
    Alert
} from 'react-native';

import { Header } from '../components/Header';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { useEffect } from 'react';
import api from '../services/api';
import { Load } from '../components/Load';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
//import { ModuleProps } from '../libs/storage';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';



interface ModulesProps {
    id: Number,
    petName: string,
    mealQuantity: Number,
    portionsPerMeal: Number,
    mealTime1: Date,
    mealTime2: Date,
    mealTime3: Date,
    mealTime4: Date,
    mealTime5: Date

}

export function ModuleSelect() {
    const [refeicoes, setRefeicoes] = useState<string>();
    const [porcoes, setPorcoes] = useState<string>();
    const [modules, setModules] = useState<ModulesProps[]>([]);
    const [plants, setPlants] = useState<ModulesProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<ModulesProps[]>([]);
    const [moduleSelected, setModuleSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    // extra Input
    const [petName, setPetName] = useState<string>();

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();


    function handleModuleSelect(module: ModulesProps) {
        navigation.navigate('ModuleEdit', { module });
    }


    useEffect(() => {
        async function fetchModules() {
            const user_email = await AsyncStorage.getItem('@plantmanager:user');
            let credentials = { email: user_email };
            console.log('email', user_email)
            try {
                const url = api + "/user/modules";

                axios
                    .post(url, credentials)
                    .then((response) => {
                        const result = response.data;
                        const { message, status, data } = result;
                        if (status !== "SUCCESS") {
                            console.log(response.data.message);
                        } else {
                            console.log(response.data.message);
                            let { petName, mealQuantity, portionsPerMeal, mealTime1, mealTime2, mealTime3, mealTime4, mealTime5, pesoComida, pesoAgua } = response.data.data[0].modules[0];

                            let { name } = response.data.data[0];
                            AsyncStorage.setItem('@plantmanager:name', name);


                            console.log('module select dados:', response.data.data[0].modules)
                            setModules(response.data.data[0].modules);
                            if (mealQuantity && portionsPerMeal && petName && mealTime1 && mealTime2 && mealTime3 && mealTime4 && mealTime5 && pesoComida && pesoAgua) {
                                AsyncStorage.setItem('@plantmanager:refeicao_quantity', mealQuantity);
                                AsyncStorage.setItem('@plantmanager:porcoes', portionsPerMeal);
                                AsyncStorage.setItem('@plantmanager:petName', petName);
                                AsyncStorage.setItem('@plantmanager:mealTime1', mealTime1);
                                AsyncStorage.setItem('@plantmanager:mealTime2', mealTime2);
                                AsyncStorage.setItem('@plantmanager:mealTime3', mealTime3);
                                AsyncStorage.setItem('@plantmanager:mealTime4', mealTime4);
                                AsyncStorage.setItem('@plantmanager:mealTime5', mealTime5);
                                AsyncStorage.setItem('@plantmanager:pesoComida', pesoComida.toString());
                                AsyncStorage.setItem('@plantmanager:pesoAgua', pesoAgua.toString());
                                AsyncStorage.setItem('@petmanager:petName', petName);
                            }


                        }
                    }).catch(error => {
                        console.log('erro:', error)
                        console.log(error.response.data);
                    })
                // await AsyncStorage.setItem('@plantmanager:user', name);
                // await AsyncStorage.setItem('@plantmanager:password', password);
                // navigation.navigate('ModuleSelect');

            } catch {
                return Alert.alert('erro ao buscar módulos')
            }

        }
        fetchModules();
        setLoading(false);
        setLoadingMore(false);
    }, [])

    if (loading)
        return <Load />

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Escolha seu módulo
                </Text>
            </View>

            <View>
                {/* essa library ajuda a criar varios componentes repetidos, dependendo do objeto que recebe */}
                <FlatList
                    data={modules}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <View>
                            <EnvironmentButton
                                title={item.petName}
                                onPress={() => handleModuleSelect(item)}
                            />
                        </View>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    environmentList: {
        height: 500,
        width: 500,
        justifyContent: 'center'
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    button: {
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginTop: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 10,
        height: 56,
        width: 56,
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
    plus: {
        fontSize: 32,
        fontWeight: '500',
        color: 'white'

    }
});