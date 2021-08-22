import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator
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
import { PlantProps } from '../libs/storage';

interface EnvironmentProps {
    key: string;
    title: string;
}

export function ModuleSelect() {
    const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();


    function handleEnvironmentSelected(environment: string) {
        setEnvironmentSelected(environment);

        if (environment == 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered);
    }

    function handleModuleSelect(plant: PlantProps) {
        navigation.navigate('ModuleEdit', { plant });
    }


    useEffect(() => {
        async function fetchEnvironment() {
            const { data } = await api.get('plants_environments?_sort=title&_order=asc');
            setEnvironments([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);
        }
        fetchEnvironment();
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
                    data={environments}
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={() => handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal
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
    subtitle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },
    environmentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }
});