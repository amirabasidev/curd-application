import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Header from "./components/UI/header/Header";
import Spinner from "./components/UI/spinner/Spinner";

const Home = lazy(() => import("./pages/home/Home"));
const UserForm = lazy(() => import("./components/userForm/UserForm"));

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
      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <div className="container">
        <Suspense fallback={<Spinner minHeight="70vh" />}>
          <Routes>
            <Route
              path="/"
              element={<Home users={users} loading={loading} />}
            />
            <Route
              path="/createuser"
              element={<UserForm getUsers={getUsers} />}
            />
            <Route
              path="/edit/:id"
              element={
                <UserForm
                  isEdit
                  users={users}
                  getUsers={getUsers}
                />
              }
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
