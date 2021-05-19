import React, { useState, useEffect } from "react";
import { ScrollView, Image } from "react-native";
import { AppLoading } from "expo";
import * as Linking from "expo-linking";
import { useNavigation, useRoute } from "@react-navigation/native";
import HTML from "react-native-render-html";

import api from "../../services/api";
import apiKey from "../../services/secret";

import {
  Container,
  BookTopContainer,
  BookContentContainer,
  BookTitle,
  BookAuthor,
  BookDate,
  BookBottomContainer,
  BookDescription,
  BookDescriptionText,
  BookDescriptionButton,
  BookDescriptionButtonText,
  BuyBookInfo,
  BuyBookPrice,
  BuyBookButton,
  BuyBookButtonText,
  BackArrow,
} from "./styles";
import { TouchableOpacity, Text } from "react-native";

interface Params {
  id: string;
}

interface Book {
  selfLink: string;
  id: string;
  volumeInfo: {
    title: string;
    authors: [string];
    publisher: string;
    publishedDate: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
    previewLink: string;
  };
  saleInfo: {
    buyLink: string;
    saleability: string;
    listPrice: {
      amount: number;
      currencyCode: string;
    };
  };
  accessInfo: {
    pdf: {
      isAvailable: boolean;
      downloadLink: string;
    };
    webReaderLink: string;
  };
}

const BookDetails: React.FC = () => {
  const [book, setBook] = useState<Book>({} as Book);
  const [fullDescription, setFullDescription] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    const params = {
      key: apiKey,
    };

    api.get<Book>(routeParams.id, { params }).then((response) => {
      const { selfLink, volumeInfo, saleInfo, accessInfo, id } = response.data;
      setBook({
        selfLink,
        volumeInfo,
        saleInfo,
        accessInfo,
        id,
      });
    });
  }, []);

  function handleNavigateBack(removeBook: boolean) {
    if (removeBook) {
      navigation.navigate("Home", { id: book.id });
    } else {
      navigation.goBack();
    }
  }

  function handleBuyBook() {
    Linking.openURL(book.saleInfo.buyLink);
  }

  if (Object.keys(book).length === 0 && book.constructor === Object) {
    return <AppLoading />;
  }
  return (
    <>
      <BackArrow
        name="arrow-left"
        color="#333"
        size={25}
        onPress={() => handleNavigateBack(false)}
      />
      <ScrollView persistentScrollbar keyboardShouldPersistTaps="handled">
        <Container>
          <BookTopContainer>
            <Image
              source={
                book.volumeInfo.imageLinks
                  ? { uri: book.volumeInfo.imageLinks.thumbnail }
                  : require("../../assets/default-book.jpg")
              }
              resizeMode="stretch"
              style={{
                width: 130,
                height: 190,
                borderRadius: 5,
              }}
            />
            <BookContentContainer>
              <BookTitle numberOfLines={2} ellipsizeMode="tail">
                {book.volumeInfo.title}
              </BookTitle>
              <BookAuthor numberOfLines={2} ellipsizeMode="tail">
                {book.volumeInfo.publisher}
              </BookAuthor>
              <BookDate>{book.volumeInfo.publishedDate}</BookDate>
            </BookContentContainer>
          </BookTopContainer>
          <BookBottomContainer>
            {book.volumeInfo.description && (
              <BookDescription>
                <BookDescriptionText
                  numberOfLines={fullDescription ? 0 : 5}
                  ellipsizeMode="tail"
                >
                  {book.volumeInfo.description}
                </BookDescriptionText>
                <BookDescriptionButton>
                  <BookDescriptionButtonText
                    onPress={() => setFullDescription(!fullDescription)}
                  >
                    {fullDescription ? "Ler menos" : "Ler mais"}
                  </BookDescriptionButtonText>
                </BookDescriptionButton>
              </BookDescription>
            )}
            {book.saleInfo.saleability === "FOR_SALE" && (
              <BuyBookInfo>
                <BuyBookPrice>
                  {String(book.saleInfo.listPrice.amount)}
                  {book.saleInfo.listPrice.currencyCode}
                </BuyBookPrice>
                <BuyBookButton onPress={handleBuyBook}>
                  <BuyBookButtonText>Comprar livro</BuyBookButtonText>
                </BuyBookButton>
              </BuyBookInfo>
            )}
            <TouchableOpacity
            style={{marginVertical: 10}}
            onPress={() => handleNavigateBack(true)}>
              <Text>Remover livro dos favoritos</Text>
            </TouchableOpacity>
          </BookBottomContainer>
        </Container>
      </ScrollView>
    </>
  );
};

export default BookDetails;
