
import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";

export default function RegisterScreen({ navigation }) {
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
      await fetch('http://localhost:8080/api/auth/signup', {
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
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Register</Header>
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
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Log in</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
