import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert
} from 'react-native';

import { Header } from '../components/Header';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { EnvironmentButton } from '../components/EnvironmentButton';
import { useEffect } from 'react';
import api from '../services/api';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';
import { useNavigation } from '@react-navigation/native';
import { ModuleProps } from '../libs/storage';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ModuleInterface {
    pet_name: String,
    mealQuantity: Number,
    portionsPerMeal: Number,
    mealTime1: Date,
    mealTime2: Date,
    mealTime3: Date,
    mealTime4: Date,
    mealTime5: Date,
}

interface StorageModule {
    [id: string]: {
        data: ModuleProps;
        notificationId: string;
    }
}

export function ModuleSelect() {
    const [modules, setModules] = useState<ModuleInterface[]>([]);
    //const [plants, setPlants] = useState<ModuleInterface[]>([]);
    //const [filteredPlants, setFilteredPlants] = useState<ModuleInterface[]>([]);
    const [moduleSelected, setModuleSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();


    function handleModuleSelect(module: ModuleInterface) {
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
                            console.log(response.data);
                            let { name, petName, mealQuantity, portionsPerMeal, mealTime1, mealTime2, mealTime3, mealTime4, mealTime5 } = response.data.data[0];
                            let data = {
                                petName,
                                mealQuantity: Number(mealQuantity),
                                portionsPerMeal: Number(portionsPerMeal),
                                mealTime1,
                                mealTime2,
                                mealTime3,
                                mealTime4,
                                mealTime5
                            }

                            setModules(response.data);
                            console.log(response.data)
                            console.log('dasds')
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
                <Text>hello World</Text>
                {/* essa library ajuda a criar varios componentes repetidos, dependendo do objeto que recebe 
                <FlatList
                    data={modules}
                    keyExtractor={(item) => String(item.key.toString())}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.pet_name}
                            onPress={() => handleModuleSelect(item)}
                        />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
                */}
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
    }
});