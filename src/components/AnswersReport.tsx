import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
const { height, width } = Dimensions.get("window");

import { useTheme } from "@react-navigation/native";
import { Quiz } from "../state/actions";
import { generateAbjad } from "../utils/Utilities";
import AntDesign from "react-native-vector-icons/AntDesign";

interface AnswerProps {
  answer: Quiz["answers"];
  answerSelected?: string;
  status?: string;
}
const AnswersReport = ({ answer, answerSelected, status }: AnswerProps) => {
  const { colors } = useTheme();

  const handleCheckedAnswer = () => {
    return (
      <View
        style={{
          position: "absolute",
          left: 10,
          zIndex: 1,
        }}
      >
        <AntDesign
          size={30}
          color={status === "correct" ? "blue" : "red"}
          name={status === "correct" ? "checkcircle" : "closecircle"}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        paddingHorizontal: 10,
        marginTop: 7,
      }}
    >
      {answer.map((item, key) => {
        return (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            {item === answerSelected ? handleCheckedAnswer() : null}
            <View
              style={{
                height: 25,
                width: 25,
                borderRadius: 20,
                borderWidth: 4,
                borderColor: colors.border,
                marginRight: 10,
                padding: 10,
                backgroundColor:
                  answerSelected === item ? colors.primary : "white",
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Montserrat-Medium",
                paddingBottom: 5,
                color: colors.text,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Montserrat-Bold",
                }}
              >
                {generateAbjad(key)}{" "}
              </Text>
              {item}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default AnswersReport;
