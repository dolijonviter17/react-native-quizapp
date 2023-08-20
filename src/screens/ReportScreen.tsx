import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
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
import { AnswersReport } from "../components";
import { ButtonComponent } from "../components/global";
import Loading from "../components/global/Loading";
import { useTypedSelector } from "../hooks/useTypeSelectors";
import { Quiz } from "../state/actions";

type Props = NativeStackScreenProps<RootStackParams, "Report">;

const ReportScreen: React.FC<Props> = ({ navigation, route }) => {
  const { category, questions } = route.params;
  const { colors } = useTheme();
  const { loading } = useTypedSelector((state) => state.quiz);

  const checkedAnswer = (answer: Quiz) => {
    return (
      <View>
        {answer.status === "uncorrect" ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Montserrat-Medium",
                paddingBottom: 5,
                color: colors.text,
              }}
            >
              Correct Answer :
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Montserrat-Bold",
                paddingBottom: 5,
                color: colors.text,
              }}
            >
              {"  " + answer.correctAnswer}
            </Text>
          </View>
        ) : null}
      </View>
    );
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
          onPress={() => navigation.navigate("Categories")}
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
        {!loading && questions.length > 0
          ? questions.map((item: Quiz, key: number) => {
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
                    }}
                  >
                    <Text>{key + 1}. </Text>
                    {item.question}
                  </Text>

                  <AnswersReport
                    answer={item.answers}
                    status={item.status}
                    answerSelected={item.answerSelected}
                  />
                  {checkedAnswer(item)}
                </View>
              );
            })
          : null}
        {!loading ? (
          <ButtonComponent
            title="Back"
            style={{ marginBottom: 45 }}
            onPress={() => navigation.navigate("Categories")}
          />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default ReportScreen;
