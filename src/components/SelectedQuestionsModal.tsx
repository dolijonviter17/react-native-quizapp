import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { SelectItemPickerComponent, TextInputComponent } from "./global";
import { CategoryQuestionProps, ModalProps } from "../state/actions";
const { height, width } = Dimensions.get("window");

const SelectedQuestionsModal = ({
  isVisible,
  onBackdropPress,
  handleSelectQuestions,
  category,
}: ModalProps) => {
  const { colors } = useTheme();
  const [amountQuiz, setAmountQuiz] = useState<string>("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryQuestionProps>({
      ...category,
    });
  const handleSelectedCategory = (): void => {
    setSelectedCategory({
      ...category,
      title: category.title,
      param: category.param,
      icon: category.icon,
    });
    handleSelectQuestions(selectedCategory);
    setAmountQuiz("");
  };

  const handleAmount = (data: string) => {
    setAmountQuiz(data);
    setSelectedCategory({
      ...selectedCategory,
      amount: Number(data),
    });
  };

  const onSelectCategory = (level: string) => {
    setSelectedCategory({
      ...selectedCategory,
      difficulty: level,
    });
  };

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
          }}
        >
          {"Quiz App - " + category.title}
        </Text>

        <View style={{ width: "95%", marginTop: 25 }}>
          <SelectItemPickerComponent
            label="Difficulty"
            onSelect={onSelectCategory}
          />
          <TextInputComponent
            placeholder="Select Amount of Question"
            value={amountQuiz}
            keyboardType="numeric"
            label="Amount of Question"
            onChangeText={(e) => handleAmount(e)}
          />
          <TouchableOpacity
            onPress={handleSelectedCategory}
            style={{
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
            <Text>Start</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectedQuestionsModal;
