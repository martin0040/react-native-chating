import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import socket from "../utils/socket";
import { styles } from "../utils/styles";

const Modal = ({ setVisible, children }) => {
	return (
		<View style={styles.modalContainer}>
			<Pressable
				onPress={() => setVisible(false)}
			>
				<Text style={styles.closeButton}>X</Text>
			</Pressable>
			{children}
		</View>
	);
};

export default Modal;
