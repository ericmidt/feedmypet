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

// interface ModulesProps {
//     key: string;
//     user: string;
//     pet_name: string;
//     frequency: number;
//     portions_per_meal: number;
//     times: [
//         number,
//         number
//     ]
// }

export function ModuleSelect() {
    const [modules, setModules] = useState<ModuleProps[]>([]);
    const [plants, setPlants] = useState<ModuleProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<ModuleProps[]>([]);
    const [moduleSelected, setModuleSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();


    function handleModuleSelect(module: ModuleProps) {
        navigation.navigate('ModuleEdit', { module });
    }


    useEffect(() => {
        async function fetchModules() {
            const { data } = await api.get('modules?_sort=pet_name&_order=asc');
            setModules(data);
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
                <FlatList
                    data={modules}
                    // keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.pet_name}
                            onPress={() => handleModuleSelect(item)}
                        />
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
    }
});