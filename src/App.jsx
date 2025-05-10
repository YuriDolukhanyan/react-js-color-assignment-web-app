import React from "react";
import "./styles/App.css";
import ContentContainer from "./components/ContentContainer";
import { ResultProvider } from "./contexts/ResultContext";
import { AvailableColorProvider } from "./contexts/AvailableColorContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <h1>(Random) Color Assignment - React WEB APP</h1>
      <ResultProvider>
        <AvailableColorProvider>
          <AuthProvider>
            <ContentContainer />
          </AuthProvider>
        </AvailableColorProvider>
      </ResultProvider>
    </div>
  );
}

export default App;
