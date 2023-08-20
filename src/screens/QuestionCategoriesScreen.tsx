import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import { CategoryItem, SelectedQuestionsModal } from "../components";
import Container from "../components/global/Container";
import { RootStackParams } from "../stack/RootStackScreen";
import { CategoryQuestionProps } from "../state/actions";
const { height, width } = Dimensions.get("window");

type Props = NativeStackScreenProps<RootStackParams, "Categories">;
export const CategoryQuestionItem: CategoryQuestionProps[] = [
  {
    title: "Music",
    param: "music",
    icon: "music",
  },
  {
    title: "Sport and Leisure",
    param: "sport_and_leisure",
    icon: "baseball-ball",
  },
  {
    title: "Film and TV",
    param: "film_and_tv",
    icon: "film",
  },
  {
    title: "Arts and Literature",
    param: "arts_and_literature",
    icon: "person-booth",
  },
  {
    title: "History",
    param: "history",
    icon: "history",
  },
  {
    title: "Society and Culture",
    param: "society_and_culture",
    icon: "chalkboard-teacher",
  },
  {
    title: "Science",
    param: "science",
    icon: "graduation-cap",
  },
  {
    title: "Geography",
    param: "geography",
    icon: "digital-tachograph",
  },
  {
    title: "Food and Drink",
    param: "food_and_drink",
    icon: "user-secret",
  },
  {
    title: "General Knowledge",
    param: "general_knowledge",
    icon: "laptop-code",
  },
];
const QuestionCategoriesScreen: React.FC<Props> = ({ navigation }) => {
  const { colors } = useTheme();
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryQuestionProps>({
      title: "",
      param: "",
      icon: "",
    });
  const handleSelectCategory = (category: CategoryQuestionProps): void => {
    setSelectedCategory({
      ...selectedCategory,
      title: category.title,
      param: category.param,
      icon: category.icon,
    });
    setModal(true);
  };
  const handleSelectQuestions = (category: CategoryQuestionProps): void => {
    setModal(false);
    navigation.push("Questions", {
      category: {
        ...selectedCategory,
        difficulty: category.difficulty,
        amount: category.amount,
      },
    });
  };

  return (
    <Container onPress={() => navigation.navigate("Profile")}>
      <View
        style={{
          height: 3,
          width: width - 15,
          backgroundColor: colors.border,
          alignSelf: "center",
          marginVertical: 20,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          paddingLeft: 25,
          fontFamily: "Montserrat-Bold",
          paddingVertical: 15,
        }}
      >
        Select Categories
      </Text>
      <ScrollView>
        {CategoryQuestionItem.map((item, key) => (
          <CategoryItem
            key={key}
            handleSelectCategory={handleSelectCategory}
            category={item}
          />
        ))}
      </ScrollView>
      <SelectedQuestionsModal
        isVisible={modal}
        category={selectedCategory}
        onBackdropPress={() => setModal(false)}
        handleSelectQuestions={handleSelectQuestions}
      />
    </Container>
  );
};

export default QuestionCategoriesScreen;
