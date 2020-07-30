import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import BookPdfView from "./pages/BookPdfView";
import Header from "./components/Header";

const AppStack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="screen"
        screenOptions={{
          cardStyle: {
            backgroundColor: "#EEECFF",
          },
          header: () => <Header />,
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="BookDetails" component={BookDetails} />
        <AppStack.Screen name="BookPdfView" component={BookPdfView} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
