import React from "react";
import { render } from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Header from "./Components/Header";
import Todos from "./Components/Todos";
import GraficoHertz from "./Components/Graf";
import './styles.css'; // Importe o arquivo CSS

function App() {
  return (
    <ChakraProvider>
      <div className="container">
        <div className="graph">
          <GraficoHertz />
        </div>
        <div className="header">
          <Header />
        </div>
        <div className="todos">
          <Todos />
        </div>
      </div>
    </ChakraProvider>
  )
}

const rootElement = document.getElementById("root")
render(<App />, rootElement)
