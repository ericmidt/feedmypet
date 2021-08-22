import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from '../../styles/colors';
import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { RegisterForm } from '../pages/RegisterForm';
import { RegisterPostForm } from '../pages/RegisterPostForm';

import { PlantSave } from '../pages/PlantSave';
import { MyPlants } from '../pages/MyPlants';
import AuthRoutes from './tab.routes';
import { RegisterModule } from '../pages/RegisterModule';
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
            name="Confirmation"
            component={Confirmation}
        />

        <stackRoutes.Screen
            name="PlantSelect"
            component={AuthRoutes}
        />

        <stackRoutes.Screen
            name="PlantSave"
            component={PlantSave}
        />

        <stackRoutes.Screen
            name="MyPlants"
            component={AuthRoutes}
        />

        <stackRoutes.Screen
            name="RegisterForm"
            component={RegisterForm}
        />
        <stackRoutes.Screen
            name="RegisterPostForm"
            component={RegisterPostForm}
        />
        <stackRoutes.Screen
            name="RegisterModule"
            component={RegisterModule}
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
