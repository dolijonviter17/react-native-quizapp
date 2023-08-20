import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { RootStackParams } from "../stack/RootStackScreen";

import { useSharedValue } from "react-native-reanimated";
import { NoteProps } from "../model/NoteModel";

const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParams, "Archive">;

const MyArchiveItem: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const handleBack = (): void => {
    navigation.goBack();
  };
  const [dataNotes, setDataNotes] = useState([]);
  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: Platform.OS == "android" ? 10 : 70,
          paddingHorizontal: 15,
          paddingBottom: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleBack}>
            <AntDesign size={30} name="arrowleft" />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Arsip Saya
          </Text>
        </View>
        <TouchableOpacity>
          <AntDesign size={30} name="questioncircle" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color={colors.primary} size="small" />
      ) : null}
      {dataNotes.length === 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Arsip tersimpan belum ada</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    height: 45,
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    borderRadius: 5,
    zIndex: 1,
  },
});

export default MyArchiveItem;
