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
import { emailValidator } from "../helpers/emailValidator";
import { nameValidator } from "../helpers/nameValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { styles } from "../utils/styles";

const Register = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({
        name: { value: "", error: "" },
        password: { value: "", error: "" },
        email: { value: "", error: "" },
        gender: { value: "", error: "" },
        phone: { value: "", error: "" },
        age: { value: "", error: "" },
        lookfor: { value: "", error: "" },
        bio: { value: "", error: "" }
    })

    const onSignUpPressed = async () => {
        const nameError = nameValidator(userInfo.name.value);
        const emailError = emailValidator(userInfo.email.value);
        const passwordError = passwordValidator(userInfo.password.value);

        if (emailError || passwordError || nameError) {
            setUserInfo({
                ...userInfo,
                name: { ...userInfo.name, error: nameError },
                password: { ...userInfo.password, error: passwordError },
                email: { ...userInfo.email, error: emailError }
            })
            return;
        } else {
            await fetch('http://localhost:4000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userInfo.name.value,
                    password: userInfo.password.value,
                    email: userInfo.email.value,
                    gender: userInfo.gender.value,
                    phone: userInfo.phone.value,
                    age: userInfo.age.value,
                    lookfor: userInfo.lookfor.value,
                    bio: userInfo.bio.value
                })
            })
                .then((responseJson) => {
                    console.log(responseJson);

                    navigation.reset({
                        index: 0,
                        routes: [{ name: "HomeScreen" }],
                    });
                })
                .catch((error) => {
                    console.error(error);
                });

        }
    };

    return (
        <SafeAreaView style={styles.loginscreen}>
            <View style={styles.loginscreen}>
                <Text style={styles.loginheading}>Sign Up</Text>
                <View style={styles.logininputContainer}>
                    <TextInput
                        label="Name"
                        returnKeyType="next"
                        value={userInfo.name.value}
                        onChangeText={(text) => setUserInfo({ ...userInfo, name: { value: text, error: "" } })}
                        error={!!userInfo.name.error}
                        errorText={userInfo.name.error}
                    />
                    <TextInput
                        label="Bio"
                        returnKeyType="done"
                        value={userInfo.bio.value}
                        onChangeText={(text) => setUserInfo({ ...userInfo, bio: { value: text } })}
                    />
                    <TextInput
                        label="Age"
                        returnKeyType="done"
                        value={userInfo.age.value}
                        onChangeText={(text) => setUserInfo({ ...userInfo, age: { value: text } })}
                    />
                    <TextInput
                        label="Gender"
                        returnKeyType="done"
                        value={userInfo.age.gender}
                        onChangeText={(text) => setUserInfo({ ...userInfo, gender: { value: text, } })}
                    />
                    <TextInput
                        label="lookfor"
                        returnKeyType="done"
                        value={userInfo.lookfor.value}
                        onChangeText={(text) => setUserInfo({ ...userInfo, lookfor: { value: text } })}
                    />
                    <TextInput
                        label="Email"
                        returnKeyType="next"
                        value={userInfo.email.value}
                        onChangeText={(text) => setUserInfo({ ...userInfo, email: { value: text, error: "" } })}
                        error={!!userInfo.email.error}
                        errorText={userInfo.email.error}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={userInfo.password.value}
                        onChangeText={(text) => setUserInfo({ ...userInfo, password: { value: text, error: "" } })}
                        error={!!userInfo.password.error}
                        errorText={userInfo.password.error}
                        secureTextEntry
                    />
                </View>

                <Button
                    mode="contained"
                    onPress={onSignUpPressed}
                    style={{ marginTop: 24 }}
                >
                    Register
                </Button>
                <View style={styles.row}>
                    <Text>I already have an account !</Text>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.replace("Login")}>
                        <Text style={styles.link}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

export default Register;