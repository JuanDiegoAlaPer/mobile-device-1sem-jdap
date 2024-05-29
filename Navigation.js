import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Screen1 } from "./src/screens/Screen1";
import { Screen2 } from "./src/screens/Screen2";
import { Screen3 } from "./src/screens/Screen3";
import { Screen4 } from "./src/screens/Screen4";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Screen1"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'rgb(242, 242, 247)',
          borderTopWidth: 0,
          shadowOffset: { width: 0, height: 0 },
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Screen1"
        component={Screen1}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Screen2"
        component={Screen2}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'map' : 'map-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Screen3"
        component={Screen3}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'camera' : 'camera-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Screen4"
        component={Screen4}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <AntDesign name={focused ? 'github' : 'github'} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
