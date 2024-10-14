import React, { useLayoutEffect, useState } from "react";

//👇🏻 app screens
import Login from "./screens/Login";
import Register from "./screens/Register";
import Main from "./screens/Main";
import socket from "./utils/socket";

//👇🏻 React Navigation configurations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Chat from './screens/Chat';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

export default function App() {
	const [isLogin, setIsLogin] = useState(false);

	useLayoutEffect(() => {
		const getUsername = async () => {
			try {
				const value = await AsyncStorage.getItem("useremail");
				if (value !== null) {
					socket.emit("join", value);
					setIsLogin(true);
				}
			} catch (e) {
				console.error("Error while loading useremail!", e);
			}
		};
		getUsername();
	}, []);

	if (isLogin) return <Main />
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Login'
					component={Login}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Register'
					component={Register}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>

	)
}
