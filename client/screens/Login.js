import React, { useState, useLayoutEffect } from "react";
import {
	Text,
	SafeAreaView,
	View,
	Pressable,
	Alert,
	TouchableOpacity
} from "react-native";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import socket from "../utils/socket";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
	const [email, setEmail] = useState({ value: "", error: "" });
	const [password, setPassword] = useState({ value: "", error: "" });

	const storeUsername = async () => {
		try {
			await AsyncStorage.setItem("useremail", email.value);
			window.location.reload()
			console.log("login success")
		} catch (e) {
			Alert.alert("Error! While saving useremail");
		}
	};

	const onLoginPressed = async () => {

		const emailError = emailValidator(email.value);
		const passwordError = passwordValidator(password.value);
		if (emailError || passwordError) {
			setEmail({ ...email, error: emailError });
			setPassword({ ...password, error: passwordError });
			return;
		} else {
			await fetch('http://localhost:4000/api/auth/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					password: password.value,
					email: email.value,
				})
			})
				.then(async (responseJson) => {
					alert("User signin success");
					socket.emit("join", email.value);
					await storeUsername();
				})
				.catch((error) => {
					console.error(error);
				});

		}
		await storeUsername();

	};

	return (
		<SafeAreaView style={styles.loginscreen}>
			<View style={styles.loginscreen}>
				<Text style={styles.loginheading}>Sign in</Text>
				<View style={styles.logininputContainer}>
					<TextInput
						label="Email"
						returnKeyType="next"
						value={email.value}
						onChangeText={(text) => setEmail({ value: text, error: "" })}
						error={!!email.error}
						errorText={email.error}
						autoCapitalize="none"
						autoCompleteType="email"
						textContentType="emailAddress"
						keyboardType="email-address"
					/>
					<TextInput
						label="Password"
						returnKeyType="done"
						value={password.value}
						onChangeText={(text) => setPassword({ value: text, error: "" })}
						error={!!password.error}
						errorText={password.error}
						secureTextEntry
					/>
					<Button mode="contained" onPress={onLoginPressed}>
						Log in
					</Button>
					<View style={styles.row}>
						<Text>You do not have an account yet?</Text>
					</View>
					<View style={styles.row}>
						<TouchableOpacity onPress={() => navigation.navigate("Register")}>
							<Text style={styles.link}>Create !</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Login;