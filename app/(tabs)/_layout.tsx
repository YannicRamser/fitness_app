import {Tabs} from 'expo-router';
import React from 'react';

import {HapticTab} from '@/components/haptic-tab';
import {IconSymbol} from '@/components/ui/icon-symbol';
import {Colors} from '@/constants/theme';
import {useColorScheme} from '@/hooks/use-color-scheme';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'MyHome',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="myWorkouts"
                options={{
                    title: 'MyWorkouts',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="figure.strengthtraining.traditional" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="myGoals"
                options={{
                    title: 'MyGoals',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="target" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="myProfile"
                options={{
                    title: 'MyProfile',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="person.circle.fill" color={color}/>,
                }}
            />
        </Tabs>
    );
}
