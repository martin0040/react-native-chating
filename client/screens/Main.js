import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // If using Expo
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

import Chat from './Chat';

const Tab = createBottomTabNavigator();


function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings Screen</Text>
            <Button
                title="Go to Home"
            />
        </View>
    );
}

function Main() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="PROFILE"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="id-card" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="SCAN"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="scan" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="CHATS"
                    component={Chat}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="chatbubble" size={size} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="LIKES"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="heart" size={size} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>

        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',

    },
    main_box: {
        minHeight: '70vh'
    },
    footer: {

    }
})
export default Main;


