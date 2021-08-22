import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    TouchableOpacityProps
} from 'react-native';

import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

//interface define o que o componente vai receber quando for instanciado
interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function ButtonBack({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            {...rest}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.red,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderRadius: 16,
        marginBottom: 10,
        height: 56,
        width: 56,
    },
    text: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading
    }
});
