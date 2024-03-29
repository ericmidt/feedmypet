import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { RegisterForm } from '../pages/RegisterForm';

import { RegisterFood } from '../pages/RegisterFood';
import { RegisterFoodTime } from '../pages/RegisterFoodTime';
import { RegisterSuccess } from '../pages/RegisterSuccess';
import { ModuleSelect } from '../pages/ModuleSelect';
import { ModuleEdit } from '../pages/ModuleEdit';

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode="none"
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            },
        }}
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
        />

        <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
        />

        <stackRoutes.Screen
            name="RegisterForm"
            component={RegisterForm}
        />
        <stackRoutes.Screen
            name="RegisterFood"
            component={RegisterFood}
        />
        <stackRoutes.Screen
            name="RegisterFoodTime"
            component={RegisterFoodTime}
        />
        <stackRoutes.Screen
            name="RegisterSuccess"
            component={RegisterSuccess}
        />
        <stackRoutes.Screen
            name="ModuleSelect"
            component={ModuleSelect}
        />
        <stackRoutes.Screen
            name="ModuleEdit"
            component={ModuleEdit}
        />

    </stackRoutes.Navigator>
)
export default AppRoutes;
