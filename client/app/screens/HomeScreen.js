import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // If using Expo
import { View, Text, Button, StyleSheet } from 'react-native';
import Header from './Header';

const Tab = createBottomTabNavigator();


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings Screen</Text>
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function App() {
  return (
    <View>
      <View style={styles.header}><Header /></View>
      <View style={styles.main_box}>Main</View>
      <Tab.Navigator>
        <Tab.Screen
          name="PROFILE"
          component={HomeScreen}
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
          component={SettingsScreen}
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

    </View>
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
export default App;


