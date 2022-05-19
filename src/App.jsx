import { Suspense } from "react";
import { BrowserRouter, Routes } from "react-router-dom";

import Header from "./components/UI/header/Header";
import Spinner from "./components/UI/spinner/Spinner";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Suspense fallback={<Spinner minHeight="70vh"/>}>
          <Routes>
            {/* Pages */}
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
