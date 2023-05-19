import React, { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./src/Index";
import { createRoot } from "react-dom/client";
import "./dist/output.css";

const App: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
const container: any = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

export default App;
