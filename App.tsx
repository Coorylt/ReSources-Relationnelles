import React from 'react';
import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Home from './src/screens/Home/Home';
import FAQ from './src/screens/FAQ/FAQ';
import Login from './src/screens/Login/Login';
import Profile from './src/screens/Profile/Profile';
import Category from './src/screens/Category/Category';
import './src/i18n/i18n.config'
import About from './src/screens/About/About';
import Resources from './src/screens/Resources/Resources';
import FindResources from './src/screens/FindResources/FindResources';
const Drawer = createDrawerNavigator();


if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}


interface DrawerItem {
  name: string;
  icon: JSX.Element;
  screen: any;
}

interface CustomDrawerContentProps {
  navigation: any;
}

const drawerItems: DrawerItem[] = [
  { name: "home", icon: <MaterialIcons name="home" size={34} color="white" />, screen: Home },
  { name: "my_account", icon: <MaterialCommunityIcons name="account" size={34} color="white" />, screen: Profile},
  { name: "message", icon: <MaterialCommunityIcons name="message-outline" size={34} color="white" />, screen: Login },
  { name: "search_resources", icon: <MaterialIcons name="search" size={34} color="white" />, screen: FindResources },
  { name: "new_resources", icon: <MaterialIcons name="add" size={34} color="white" />, screen: Resources },
  { name: "Categories", icon: <MaterialCommunityIcons name="format-list-bulleted" size={34} color="white" />, screen: Category },
  { name: "about", icon: <MaterialCommunityIcons name="information-outline" size={34} color="white" />, screen: About },
  { name: "faq", icon: <Ionicons name="help-circle-outline" size={34} color="white" />, screen: FAQ },
];

function CustomDrawerContent({ navigation }: CustomDrawerContentProps) {
  const { t } = useTranslation();

  const renderItem = (item: DrawerItem, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.drawerItem}
      onPress={() => navigation.navigate(item.name)}
    >
      {item.icon}
      <Text style={styles.drawerItemText}>{t(item.name)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.drawerHeader}>
          <Image
            source={require('./public/img/logo.png')}
            style={{ width: 137, height: 80, alignSelf: 'center' }}
            resizeMode="contain"
          />
      </View>
      <View style={styles.drawerItemsContainer}>
        {drawerItems.map((item, index) => renderItem(item, index))}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Accueil"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: '#03989E' },
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {drawerItems.map((item, index) => (
          <Drawer.Screen
            key={index}
            name={item.name}
            component={item.screen}
            options={{
              drawerIcon: ({ focused, size }) => item.icon,
              headerTitle: () => (
                
                <Image
                  source={require('./public/img/logo.png')}
                  style={{ width: 137, height: 80, alignSelf: 'center' }}
                  resizeMode="contain"
                />
              ),
              headerStyle: {
                height: 150,
                backgroundColor: '#03989E',
              },
              headerRight: () => (
                <TouchableOpacity
                  style={{ marginRight: 10 }}
                  onPress={() => console.log("Ceci est un bouton à droite dans la barre supérieure")}
                >
                    <MaterialCommunityIcons name="account" size={35} color="white" />
                </TouchableOpacity>
              ),
            }}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#03989E',
  },
  drawerHeader: {
    marginBottom: 20,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  drawerItemsContainer: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawerItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'white'
  },
});
