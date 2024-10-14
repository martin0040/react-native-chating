import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../utils/styles";

const ChatComponent = ({ item, setPartner, setVisible }) => {
	const [messages, setMessages] = useState({});
	console.log(item)
	useLayoutEffect(() => {
		setMessages(item.messages[item.messages.length - 1]);
	}, []);

	const handleNavigation = () => {
		setPartner(item);
		setVisible(true);
	};

	return (
		<Pressable style={styles.cchat} onPress={handleNavigation}>
			<Ionicons
				name='person-circle-outline'
				size={45}
				color='black'
				style={styles.cavatar}
			/>

			<View style={styles.crightContainer}>
				<View>
					<Text style={styles.cusername}>{item.email}</Text>

					<Text style={styles.cmessage}>
						{messages?.text ? messages.text : "Tap to start chatting"}
					</Text>
				</View>
				<View>
					<Text style={styles.ctime}>
						{messages?.time ? messages.time : "now"}
					</Text>
				</View>
			</View>
		</Pressable>
	);
};

export default ChatComponent;
