import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HealthcareSearch from "./components/FormPage.tsx";
import ChatInterface from "./components/ChatInterface.tsx";
import SignIn from "./components/signin/SignIn.tsx";

import '../src/styles/global.css'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HealthcareSearch />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default App;
