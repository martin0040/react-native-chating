import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import socket from "../utils/socket";
import MessageComponent from "../components/MessageComponent";
import { styles } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Messaging = ({ route, navigation, partner }) => {
	const [user, setUser] = useState("");
	const { name, id } = partner;

	const [chatMessages, setChatMessages] = useState([]);
	const [message, setMessage] = useState("");

	const getUsername = async () => {
		try {
			const value = await AsyncStorage.getItem("useremail");
			if (value !== null) {
				setUser(value);
			}
		} catch (e) {
			console.error("Error while loading useremail!");
		}
	};

	const handleNewMessage = () => {
		const hour =
			new Date().getHours() < 10
				? `0${new Date().getHours()}`
				: `${new Date().getHours()}`;

		const mins =
			new Date().getMinutes() < 10
				? `0${new Date().getMinutes()}`
				: `${new Date().getMinutes()}`;

		if (user) {
			socket.emit("new_message", {
				message,
				receiver: id,
				sender: user,
				timestamp: { hour, mins },
			});
		}
	};

	useLayoutEffect(() => {
		// navigation.setOptions({ title: name });
		getUsername();
	}, []);

	useEffect(() => {
		socket.on("new_message", ({ message, receiver, sender, timestamp }) => {
			setChatMessages(chatMessages => {
				return [...chatMessages, { message, receiver, sender, timestamp }]
			})
		});
	}, [socket]);

	return (
		<View style={styles.messagingscreen}>
			<View
				style={[
					styles.messagingscreen,
					{ paddingVertical: 15, paddingHorizontal: 10 },
				]}
			>
				{chatMessages[0] && (
					<FlatList
						data={chatMessages}
						renderItem={({ item }, idx) => (
							<MessageComponent key={idx} item={item} user={user} />
						)}
						keyExtractor={(item, idx) => idx}
					/>
				)}
			</View>

			<View style={styles.messaginginputContainer}>
				<TextInput
					style={styles.messaginginput}
					onChangeText={(value) => setMessage(value)}
				/>
				<Pressable
					style={styles.messagingbuttonContainer}
					onPress={handleNewMessage}
				>
					<View>
						<Text style={{ color: "#f2f0f1", fontSize: 20 }}>SEND</Text>
					</View>
				</Pressable>
			</View>

		</View>
	);
};

export default Messaging;
