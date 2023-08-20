import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CategoryItemProps, CategoryQuestionProps } from "../state/actions";
import { getRandomColor } from "../utils/Utilities";
const { height, width } = Dimensions.get("window");

const CategoryItem = ({
  category,
  handleSelectCategory,
}: CategoryItemProps) => {
  const { colors } = useTheme();

  var bgItem = getRandomColor();

  const handleSelectItem = (category: CategoryQuestionProps): void => {
    handleSelectCategory(category);
  };
  return (
    <>
      <View
        style={{
          width: "90%",
          minHeight: 100,
          borderRadius: 10,
          alignSelf: "center",
          marginBottom: 10,
          backgroundColor: bgItem,
          paddingHorizontal: 15,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            // alignItems: "center",
          }}
        >
          <View
            style={{
              height: 60,
              width: 70,
              borderRadius: 5,
              borderWidth: 4,
              borderColor: colors.border,
              marginRight: 10,
              padding: 10,
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome5 size={30} name={category.icon} color={bgItem} />
          </View>
          <View
            style={{
              width: "80%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Montserrat-Bold",
                paddingBottom: 10,
              }}
            >
              {category.title}
            </Text>
            <TouchableOpacity
              onPress={() => handleSelectItem(category)}
              style={{
                position: "absolute",
                right: 10,
                top: 25,
                width: 120,
                height: 30,
                backgroundColor: bgItem,
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
      </View>
    </>
  );
};

export default CategoryItem;
