import React, { useState, useLayoutEffect, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import Modal from "../components/Modal";
import ChatComponent from "../components/ChatComponent";
import Footer from '../components/Footer'
import socket from "../utils/socket";
import { styles } from "../utils/styles";
import Messaging from "./Messaging";

const Chat = () => {
	const [visible, setVisible] = useState(false);
	const [users, setUsers] = useState([]);
	const [partner, setPartner] = useState(null)

	useLayoutEffect(() => {
		function fetchGroups() {
			fetch("http://localhost:4000/api")
				.then((res) => res.json())
				.then((data) => setUsers(data))
				.catch((err) => console.error(err));
		}
		fetchGroups();
	}, []);

	useEffect(() => {
		socket.on("userlist", (users) => {
			setUsers(users);
		});
	}, [socket]);


	return (
		<SafeAreaView style={styles.chatscreen}>

			<View style={styles.chatlistContainer}>
				{users.length > 0 ? (
					<FlatList
						data={users}
						renderItem={({ item }) => <ChatComponent setPartner={setPartner} setVisible={setVisible} item={item} />}
						keyExtractor={(item) => item.id}
					/>
				) : (
					<View style={styles.chatemptyContainer}>
						<Text style={styles.chatemptyText}>No users joined!</Text>
					</View>
				)}
			</View>
			{visible
				&&
				<Modal setVisible={setVisible} >
					<Messaging partner={partner} />
				</Modal>}
		</SafeAreaView>
	);
};

export default Chat;
