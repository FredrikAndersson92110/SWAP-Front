import { Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
//Redux
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import CustomButton from "./components/CustomButton";
//components
import LoadFonts from "./components/LoadFonts";
//Reducers
import categoriesReducer from "./reducers/categories.reducer";
import requestsReducer from "./reducers/requests.reducer";
import userReducer from "./reducers/user.reducer";
import userDetailsReducer from "./reducers/userDetails.reducer";
import locationReducer from "./reducers/location.reducer";
import transactionInfos from "./reducers/transaction.reducer";
import willingReducer from "./reducers/willing.reducer";
import composeRequestReducer from "./reducers/composeRequest.reducer";
import selectedReducer from "./reducers/selected.reducer";
//Screens
import AskScreen from "./screens/AskScreen";
import ComposeRequestScreen from "./screens/ComposeRequestScreen";
import CustomScreen from "./screens/CustomScreen";
import DemoScreen from "./screens/DemoScreen";
import DetailScreen from "./screens/DetailScreen";
import ErrorScreen from "./screens/ErrorScreen";
import HelpScreen from "./screens/HelpScreen";
import HomeScreen from "./screens/HomeScreen";
import InteractionsScreen from "./screens/InteractionsScreen";
import ListRequestScreen from "./screens/ListRequestScreen";
import MoreInfoScreen from "./screens/MoreInfoScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SplashScreen from "./screens/SplashScreen";
import TinderScreen from "./screens/TinderScreen";
import TransactionScreen from "./screens/TransactionScreen";
import UserRequestScreen from "./screens/UserRequestScreen";
import UserScreen from "./screens/UserScreen";
import { LogBox } from "react-native";
LogBox.ignoreLogs([""]);
const store = createStore(
  combineReducers({
    requestsReducer,
    userReducer,
    willingReducer,
    userDetailsReducer,
    categoriesReducer,
    locationReducer,
    composeRequestReducer,
    transactionInfos,
    selectedReducer,
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
        options={{
          tabBarButton: () => null,
          tabBarVisible: true,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
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
            <Stack.Screen name="SplashScreen" component={SplashScreen} />

            <Stack.Screen name="DemoScreen" component={DemoScreen} />
            <Stack.Screen name="MyTabs" component={MyTabs} />

            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
            <Stack.Screen name="MoreInfoScreen" component={MoreInfoScreen} />

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
