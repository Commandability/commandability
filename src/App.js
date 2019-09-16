import React from "react";
import { Button, Text, View, Dimensions } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import firebase from "@react-native-firebase/app";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import configureStore from "./modules/configureStore";
import { Login } from "./components";
import { IncidentScreen } from "./screens";
import COLORS from "./modules/Colors";

const { persistor, store } = configureStore();
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  _signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
      })
      .catch(function(error) {
        // An error happened.
      });
  };

  render() {
    if (!this.state.user) {
      return <Login />;
    } else {
      return (
        <PersistGate loading={null} persistor={persistor}>
          <View>
            <Text>Welcome to CommandAbility {this.state.user.email}!</Text>
            <Button
              onPress={() => this.props.navigation.navigate("Incident")}
              title={"Start Incident"}
            ></Button>
            <Button onPress={this._signOut} title="Sign out" />
          </View>
        </PersistGate>
      );
    }
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Incident: IncidentScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: COLORS.secondary.dark,
        height: SCREEN_HEIGHT/12,
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}
