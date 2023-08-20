import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LoginStackParams } from "../../stack/LoginStackScreen";
import { useTheme } from "@react-navigation/native";
import { TextInputComponent } from "../../components/global";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppContext } from "../../context/AppContext";

type Props = NativeStackScreenProps<LoginStackParams, "Login">;
const LoginScreen: React.FC<Props> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { loginStatus, setLoginStatus } = useContext(AppContext);

  const [userLogin, setUserLogin] = useState({
    fullname: "",
    username: "",
    gender: "",
    address: "",
  });

  const handleLoginUser = () => {
    setLoginStatus(!loginStatus);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: "90%",
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Ionicons size={80} color={colors.text} name="person-circle" />

          <Text
            style={{
              fontSize: 32,
              color: colors.text,
              fontFamily: "Montserrat-Bold",
            }}
          >
            {"Log In"}
          </Text>
        </View>
        <TextInputComponent
          label="Full Name"
          placeholder="Write Full Name"
          value={userLogin.fullname}
          borderColor={colors.border}
          onChangeText={(e) =>
            setUserLogin({
              ...userLogin,
              fullname: e,
            })
          }
        />
        <TextInputComponent
          label="Username"
          placeholder="Write Username"
          value={userLogin.username}
          borderColor={colors.border}
          onChangeText={(e) =>
            setUserLogin({
              ...userLogin,
              username: e,
            })
          }
        />
        <TextInputComponent
          label="Address"
          placeholder="Write Address"
          value={userLogin.address}
          borderColor={colors.border}
          onChangeText={(e) =>
            setUserLogin({
              ...userLogin,
              address: e,
            })
          }
        />
        <TouchableOpacity onPress={handleLoginUser}>
          <View
            style={{
              height: 50,
              width: "90%",
              borderRadius: 7,
              marginTop: 10,
              backgroundColor: colors.primary,
              alignSelf: "center",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                paddingRight: 20,
                color: colors.text,
                textAlign: "center",
                fontFamily: "Montserrat-Bold",
              }}
            >
              Login
            </Text>
            <FontAwesome size={25} color={colors.text} name="unlock-alt" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
