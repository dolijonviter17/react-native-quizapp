/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from "react";
import "react-native-gesture-handler";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MyArchiveItem from "../screens/MyArchiveItem";
import MyProfilesScreen from "../screens/MyProfilesScreen";
import QuestionCategoriesScreen from "../screens/QuestionCategoriesScreen";
import QuestionsScreen from "../screens/QuestionsScreen";
import ReportScreen from "../screens/ReportScreen";
import SettingMode from "../screens/SettingMode";
import { CategoryQuestionProps, Quiz } from "../state/actions";
import ProfilesScreen from "../screens/profiles/ProfilesScreen";
import EditProfileScreen from "../screens/profiles/EditProfileScreen";

export type RootStackParams = {
  Categories: undefined;
  Questions: { category: CategoryQuestionProps };
  Report: { category: CategoryQuestionProps; questions: Quiz[] };
  // =====
  Profile: undefined;
  Archive: undefined;
  Mode: undefined;
  Profiles: undefined;
  EditProfiles: undefined;

  // old
};
const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <RootStack.Screen name="TabsStack" component={TabStackScreen} /> */}
      <RootStack.Screen
        name="Categories"
        component={QuestionCategoriesScreen}
      />
      <RootStack.Screen name="Questions" component={QuestionsScreen} />
      <RootStack.Screen name="Report" component={ReportScreen} />
      <RootStack.Screen name="Profile" component={MyProfilesScreen} />
      <RootStack.Screen name="Archive" component={MyArchiveItem} />
      <RootStack.Screen name="Mode" component={SettingMode} />
      <RootStack.Screen name="Profiles" component={ProfilesScreen} />
      <RootStack.Screen name="EditProfiles" component={EditProfileScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackScreen;
