import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { ScoreBoardProps } from "../state/actions";
const { height, width } = Dimensions.get("window");
const { colors } = useTheme();

const ScoreBoardModal = ({
  isVisible,
  onBackdropPress,
  category,
  scorBoard,
  handleReport,
}: ScoreBoardProps) => {
  // const { colors } = useTheme();
  const difficulty = category.difficulty ? category.difficulty : "Easy";
  const amount = category.amount ? category.amount : 3;

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackdropPress}>
      <View
        style={{
          width: "100%",
          height: 300,
          backgroundColor: colors.background,
          borderRadius: 5,
          alignItems: "center",
          paddingHorizontal: 10,
          paddingTop: 15,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Montserrat-Bold",
            paddingBottom: 10,
            color: colors.text,
          }}
        >
          {"Quiz App - " + category.title}
        </Text>
        <FontAwesome5 size={30} name={category.icon} color={colors.text} />

        <View style={{ width: "95%", marginTop: 25 }}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: "Montserrat-Bold",
              paddingBottom: 10,
              textAlign: "center",
              color: colors.text,
            }}
          >
            Congratulations, you have successfully answered the question
          </Text>
          <View
            style={{
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <View>
              <Text style={styles.textLable}>Category </Text>
              <Text style={styles.textLable}>Difficulty </Text>
              <Text style={styles.textLable}>Number of Questions </Text>
              <Text style={styles.textLable}>Score Board </Text>
            </View>
            <View>
              <Text style={styles.textValue}>{" : " + category.title}</Text>
              <Text style={styles.textValue}>{" : " + difficulty}</Text>
              <Text style={styles.textValue}>{" : " + amount}</Text>
              <Text style={styles.textValue}>{" : " + scorBoard}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleReport}
          style={{
            position: "absolute",
            bottom: 10,
            alignSelf: "center",
            width: 180,
            height: 40,
            backgroundColor: colors.primary,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: colors.border,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ScoreBoardModal;

const styles = StyleSheet.create({
  textLable: {
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
    paddingBottom: 10,
    color: colors.text,
  },
  textValue: {
    fontSize: 12,
    fontFamily: "Montserrat-Bold",
    paddingBottom: 10,
    color: colors.text,
  },
});
