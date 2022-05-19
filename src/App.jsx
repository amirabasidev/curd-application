import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/UI/header/Header";
import Spinner from "./components/UI/spinner/Spinner";

const Home = lazy(() => import("./pages/home/Home"));

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://627e6af6271f386ceff7c4c8.mockapi.io/abasidev/users",
      );
      const users = await res.json();

      setUsers(users);
    } catch (error) {
      throw `Error: ${error}`;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className="container">
        <Suspense fallback={<Spinner minHeight="70vh" />}>
          <Routes>
            <Route
              path="/"
              element={<Home users={users} loading={loading} />}
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
