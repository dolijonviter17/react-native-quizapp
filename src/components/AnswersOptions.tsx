import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
const { height, width } = Dimensions.get("window");

import { useTheme } from "@react-navigation/native";
import { Quiz } from "../state/actions";
import { generateAbjad } from "../utils/Utilities";

interface AnswerProps {
  answer: Quiz["answers"];
  id: Quiz["id"];
  handleAnswerChecked: (id: string, answer: string) => void;
}
const AnswersOptions = ({ answer, handleAnswerChecked, id }: AnswerProps) => {
  const { colors } = useTheme();
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const handleCorrect = (value: string): void => {
    setCorrectAnswer(value);
    handleAnswerChecked(id, value);
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
          <TouchableOpacity
            onPress={() => handleCorrect(item)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
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
                  correctAnswer === item ? colors.primary : "white",
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
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default AnswersOptions;
