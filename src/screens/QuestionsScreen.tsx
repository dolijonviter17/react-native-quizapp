import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RootStackParams } from "../stack/RootStackScreen";
const { height, width } = Dimensions.get("window");

import { useTheme } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { AnswersOptions, ScoreBoardModal } from "../components";
import { ButtonComponent } from "../components/global";
import Loading from "../components/global/Loading";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypeSelectors";
import { QuestionsScreenProps, Quiz } from "../state/actions";

// export type Props = NativeStackScreenProps<RootStackParams, "Questions">;

interface CategoryQuestionProps {
  title: string;
  param: string;
}

export const CategoryQuestionItem: CategoryQuestionProps[] = [
  {
    title: "Music",
    param: "music",
  },
  {
    title: "Sport and Leisure",
    param: "sport_and_leisure",
  },
  {
    title: "Film and TV",
    param: "film_and_tv",
  },
  {
    title: "Arts and Literature",
    param: "arts_and_literature",
  },
  {
    title: "History",
    param: "history",
  },
  {
    title: "Society and Culture",
    param: "society_and_culture",
  },
  {
    title: "Science",
    param: "science",
  },
  {
    title: "Geography",
    param: "geography",
  },
  {
    title: "Food and Drink",
    param: "food_and_drink",
  },
  {
    title: "General Knowledge",
    param: "general_knowledge",
  },
];

const QuestionsScreen: React.FC<QuestionsScreenProps> = ({
  navigation,
  route,
}) => {
  const { category } = route.params;
  const { colors } = useTheme();
  const {
    fetchQuestionByCategory,
    selectedAnswerQuestion,
    fetchQuestionReport,
  } = useActions();
  const { data, error, loading } = useTypedSelector((state) => state.quiz);
  const [modal, setModal] = useState<boolean>(false);
  const [scorBoard, setScoreBoard] = useState<number>(0);
  useEffect(() => {
    fetchQuestionByCategory(category);
  }, []);

  const handleAnswerChecked = useCallback(
    async (id: string, answer: string) => {
      await selectedAnswerQuestion(data, id, answer);
    },
    [data]
  );
  const handleSendAnswer = async () => {
    // e.preventDefault();
    const checkedAnswer: Quiz[] = data.filter(
      (e: Quiz) => e.status === undefined
    );
    if (checkedAnswer.length > 0) {
      Alert.alert(`${checkedAnswer.length} unanswered questions`);
    } else {
      const answerCorrect: Quiz[] = data.filter(
        (e: Quiz) => e.status === "correct"
      );
      var score: number = answerCorrect.length * 10;
      await setScoreBoard(score);
      console.log("answerCorrect", data);

      setModal(true);
    }
  };

  const handleReport = async () => {
    // await fetchQuestionReport(category, data);
    navigation.push("Report", {
      category: category,
      questions: data,
    });
    setModal(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: Platform.OS ? 70 : 20,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 15,
          paddingBottom: 20,
          //   zIndex: 1,
          //   borderWidth: 0.2,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <AntDesign size={30} color={colors.text} name="arrowleft" />
          <Text
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            {category.title}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          paddingTop: 25,
        }}
      >
        {loading ? <Loading /> : null}
        {!loading && data.length > 0
          ? data.map((item: Quiz, key: number) => {
              return (
                <View
                  key={item.id}
                  style={{
                    paddingHorizontal: 20,
                    marginBottom: 15,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Montserrat-Medium",
                      color: colors.text,
                    }}
                  >
                    <Text>{key + 1}. </Text>
                    {item.question}
                  </Text>

                  <AnswersOptions
                    answer={item.answers}
                    id={item.id}
                    handleAnswerChecked={handleAnswerChecked}
                  />
                </View>
              );
            })
          : null}
        {!loading ? (
          <ButtonComponent
            title="Save"
            style={{ marginBottom: 45 }}
            onPress={handleSendAnswer}
          />
        ) : null}
      </ScrollView>
      <ScoreBoardModal
        handleReport={handleReport}
        isVisible={modal}
        category={category}
        scorBoard={scorBoard}
        onBackdropPress={() => setModal(false)}
      />
    </View>
  );
};

export default QuestionsScreen;
