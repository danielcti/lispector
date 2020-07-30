import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const InputContainer = styled.View`
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

export const BookInput = styled.TextInput`

    background-color: #fff;
    color: #333;
    font-size: 16px;
    height: 50px;
    border-radius: 10px ;
    border-bottom-right-radius: ${props => props.totalBorder ? '10px' : '0px'};
    border-bottom-left-radius: ${props => props.totalBorder ? '10px' : '0px'};
    padding: 0 15px;
    width: 100%;
    border-style: solid;
    border-color: #333;
    border-bottom-width: ${props => props.totalBorder ? '0px' : '1px'};
    padding: 0 10px 0 50px;
`;

export const SearchBarContainer = styled.View`
    background-color: #fff;
    border-radius: 10px;
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
`;

export const SearchBarBook = styled.TouchableOpacity`
    padding: 15px;
    border-style: solid;
    border-color: #333;
    border-bottom-width: ${props => props.index === 4 ? '0px' : '1px'};
    width: 100%;
`;

export const SearchBarBookTitle = styled.Text`
    color: #333;
    font-size: 16px;
`;

export const BooksContainer = styled.View`
    margin-top: 10px;
`;

export const BookContainer = styled.TouchableOpacity`
    flex-direction: row;
    margin: 20px 0;
    padding: 20px;
    background-color: #fff;
    box-shadow: 10px 5px 5px black;
    border-radius: 10px;
    justify-content: space-between;
`;

export const BookContentContainer = styled.View`
    justify-content: space-between;
    align-items: flex-start;
    flex: 1;
    margin-left: 30px;
`;

export const BookTitle = styled.Text`
    font-weight: bold;
    font-size: 18px;
    font-family:"Ubuntu_700Bold";
    color: #384F7D;
`;

export const BookAuthor = styled.Text`
    font-size: 16px;
    color: #384F7D;
    font-family: "Roboto_400Regular";
`;

export const BookDate = styled.Text`
    font-size: 16px;
    color: #384F7D;
    font-family: "Roboto_400Regular";
`;