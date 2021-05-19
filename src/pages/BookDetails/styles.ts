import styled from "styled-components/native";
import { Feather as Icon } from "@expo/vector-icons";

export const BackArrow = styled(Icon)`
  top: -45px;
  position: absolute;
  z-index: 9;
  left: 10px;
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const BookTopContainer = styled.View`
  flex-direction: row;
  margin: 20px 0;
  border-radius: 10px;
  justify-content: space-between;
`;

export const BookContentContainer = styled.View`
  justify-content: space-around;
  align-items: flex-start;
  flex: 1;
  margin-left: 30px;
`;

export const BookTitle = styled.Text`
  font-weight: bold;
  font-size: 24px;
  font-family: "Ubuntu_700Bold";
  color: #384f7d;
`;

export const BookAuthor = styled.Text`
  font-size: 18px;
  color: #384f7d;
  font-family: "Roboto_400Regular";
`;

export const BookDate = styled.Text`
  font-size: 18px;
  color: #384f7d;
  font-family: "Roboto_400Regular";
`;

export const BookBottomContainer = styled.View``;

export const BookDescription = styled.View``;
export const BookDescriptionText = styled.Text`
  font-family: "Roboto_400Regular";
  line-height: 22px;
  font-size: 16px;
  color: #384f7d;
`;
export const BookDescriptionButton = styled.TouchableOpacity`
  margin-top: 20px;

`;
export const BookDescriptionButtonText = styled.Text`
  font-family: "Ubuntu_700Bold";
  color: #384f7d;
  font-size: 16px;
  text-decoration: underline;
`;

export const BuyBookInfo = styled.View``;
export const BuyBookPrice = styled.Text`
margin: 10px 0;
`;
export const BuyBookButton = styled.TouchableOpacity`
margin-bottom: 10px;
`;
export const BuyBookButtonText = styled.Text``;