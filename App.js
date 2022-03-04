import React from "react";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import {
  createStackNavigator,
  CardStyleInterpolators,
  TransitionSpecs,
} from "@react-navigation/stack";

//Screens
import AskScreen from "./screens/AskScreen";
import ComposeRequestScreen from "./screens/ComposeRequestScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import CustomScreen from "./screens/CustomScreen";
import DemoScreen from "./screens/DemoScreen";
import DetailScreen from "./screens/DetailScreen";
import HelpScreen from "./screens/HelpScreen";
import HomeScreen from "./screens/HomeScreen";
import InteractionsScreen from "./screens/InteractionsScreen";
import ListRequestScreen from "./screens/ListRequestScreen";

import MoreInfoScreen from "./screens/MoreInfoScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SignInScreen from "./screens/SignInScreen";

import TinderScreen from "./screens/TinderScreen";
import TransactionScreen from "./screens/TransactionScreen";
import UserRequestScreen from "./screens/UserRequestScreen";
import UserScreen from "./screens/UserScreen";
import ErrorScreen from "./screens/ErrorScreen";

//components
import LoadFonts from "./components/LoadFonts";
import CustomButton from "./components/CustomButton";

//Redux
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
//Reducers
import requestsReducer from "./reducers/requests.reducer";
import userReducer from "./reducers/user.reducer";
import willingReducer from "./reducers/willing.reducer";
import userDetailsReducer from "./reducers/userDetails.reducer";

const store = createStore(
  combineReducers({
    requestsReducer,
    userReducer,
    willingReducer,
    userDetailsReducer,
  })
);

//Navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            return <Feather name={iconName} size={24} color={color} />;
          } else if (route.name === "Exchange") {
            iconName = "chatbubbles-outline";
            return <Ionicons name={iconName} size={24} color={color} />;
          }
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "#FFF",
          paddingBottom: 10,
          height: 70,
          fontFamily: "Poppins_500Medium",
        },
        activeTintColor: "#F7CE46",
        inactiveTintColor: "#000",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Middle"
        component={CustomScreen}
        options={{
          tabBarButton: (props) => (
            <CustomButton navigation={props.navigation} {...props} />
          ),
        }}
      />
      <Tab.Screen name="Exchange" component={InteractionsScreen} />
      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="HelpScreen"
        component={HelpScreen}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="AskScreen"
        component={AskScreen}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="DetailScreen"
        component={DetailScreen}
      />
      <Tab.Screen
        options={{
          tabBarButton: () => null,
          tabBarVisible: true,
        }}
        name="UserRequestScreen"
        component={UserRequestScreen}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="ComposeRequestScreen"
        component={ComposeRequestScreen}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="InteractionsScreen"
        component={InteractionsScreen}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="ListRequestScreen"
        component={ListRequestScreen}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="UserScreen"
        component={UserScreen}
      />
      <Tab.Screen
        options={{ tabBarButton: () => null, tabBarVisible: true }}
        name="ErrorScreen"
        component={ErrorScreen}
      />
    </Tab.Navigator>
  );
}

function App() {
  const config = {
    animation: "spring",
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <Provider store={store}>
      <LoadFonts>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DemoScreen" component={DemoScreen} />
            <Stack.Screen name="MyTabs" component={MyTabs} />

            {/* <Stack.Screen name="ConnexionScreen" component={ConnexionScreen} /> */}

            <Stack.Screen name="MoreInfoScreen" component={MoreInfoScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />

            {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

            <Stack.Screen
              name="TinderScreen"
              options={{
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
              }}
              component={TinderScreen}
            />
            <Stack.Screen
              name="TransactionScreen"
              component={TransactionScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LoadFonts>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
