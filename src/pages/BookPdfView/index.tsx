import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import PDFReader from "rn-pdf-reader-js";

interface Params {
  url: string;
}

const BookPdfView: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as Params;

  console.log(routeParams.url);

  return <PDFReader source={{ uri: routeParams.url }} />;
};

export default BookPdfView;
