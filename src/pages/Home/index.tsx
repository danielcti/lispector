import React, { useState, useEffect } from "react";
import { Image, ScrollView, Keyboard, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import api, { apiKey } from "../../services/api";
import {
  Container,
  InputContainer,
  BookInput,
  SearchBarContainer,
  SearchBarBook,
  SearchBarBookTitle,
  BooksContainer,
  BookContainer,
  BookContentContainer,
  BookTitle,
  BookAuthor,
  BookDate,
} from "./styles";

interface Params {
  id: string;
}

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: [string];
    publisher: string;
    publishedDate: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

const Home: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [booksPreview, setBooksPreview] = useState<Book[]>([]);
  const [booksList, setBooksList] = useState<Book[]>([]);
  const navigation = useNavigation();
  const [isSearching, setIsSearching] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const debouncedSearchTerm = useDebounce(searchInput, 1000);
  const route = useRoute();
  const routeParams = route.params as Params;

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCharacters(debouncedSearchTerm).then((results) => {
        if (typeof results === "undefined") {
          setIsSearching(false);
          setBooksPreview([]);
        } else {
          setIsSearching(false);
          setBooksPreview(results);
        }
      });
    } else {
      setBooksPreview([]);
    }
  }, [debouncedSearchTerm]);

  function handleNavigateToBookDetails(id: string) {
    navigation.navigate("BookDetails", { id });
  }

  async function searchCharacters(search: string) {
    const params = {
      q: search,
      key: apiKey,
      maxResults: 5,
    };
    try {
      let { data } = await api.get("/", { params });
      return data.items;
    } catch (err) {
      return new Error(err);
    }
  }

  function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
    return debouncedValue;
  }

  useEffect(() => {
    if (routeParams) {
      const newList = booksList.filter((book) => book.id !== routeParams.id);
      setBooksList(newList);
    }
  }, [routeParams]);

  async function handleAddBook(id: string) {
    let choosenBook: Book = booksPreview.find((book) => book.id === id)!;
    const newBooksList = booksList;
    newBooksList.push(choosenBook);
    setBooksList(newBooksList);
    setBooksPreview([]);
    const jsonValue = JSON.stringify(newBooksList);
    await AsyncStorage.setItem("books", jsonValue);
    Keyboard.dismiss();
  }

  useEffect(() => {
    async function restoreData() {
      const jsonValue = await AsyncStorage.getItem("books");
      if (jsonValue != "{}" && jsonValue != null) {
        setBooksList(JSON.parse(jsonValue));
      } else {
      }
    }
    // restoreData();
  }, [booksList]);

  return (
    <ScrollView
      persistentScrollbar
      keyboardShouldPersistTaps="handled"
      style={{ opacity: isModalOpen ? 0.5 : 1 }}
    >
      <Container>
        <InputContainer>
          <Icon
            name="book-open"
            color="#333"
            size={20}
            style={{
              position: "absolute",
              left: 15,
              zIndex: 2,
              top: "50%",
              transform: [{ translateY: -10 }],
            }}
          />
          <BookInput
            placeholder="Digite o livro desejado"
            onChangeText={setSearchInput}
            totalBorder={booksPreview.length > 1 ? false : true}
          />
        </InputContainer>
        <SearchBarContainer>
          {booksPreview.length > 0 &&
            booksPreview.map((book, i) => (
              <SearchBarBook
                key={book.id}
                index={i}
                onPress={() => handleAddBook(book.id)}
              >
                <SearchBarBookTitle numberOfLines={1} ellipsizeMode="tail">
                  {book.volumeInfo.title}
                </SearchBarBookTitle>
              </SearchBarBook>
            ))}
        </SearchBarContainer>
        <BooksContainer>
          {booksList.length > 0 &&
            booksList.map((book) => (
              <View key={String(book.id)}>
                <BookContainer
                  onPress={() => handleNavigateToBookDetails(book.id)}
                >
                  <Image
                    source={
                      book.volumeInfo.imageLinks
                        ? { uri: book.volumeInfo.imageLinks.thumbnail }
                        : require("../../assets/default-book.jpg")
                    }
                    resizeMode="stretch"
                    style={{
                      width: 95,
                      height: 120,
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
                </BookContainer>
              </View>
            ))}
        </BooksContainer>
      </Container>
    </ScrollView>
  );
};

export default Home;
