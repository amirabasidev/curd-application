import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import Header from "./components/UI/header/Header";
import Spinner from "./components/UI/spinner/Spinner";

const Home = lazy(() => import("./pages/home/Home"));
const UserForm = lazy(() => import("./components/userForm/UserForm"));
const User = lazy(() => import("./pages/user/User"));

const App = () => {
  const [user, setUser] = useState({});
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

  const getUser = async(id) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://627e6af6271f386ceff7c4c8.mockapi.io/abasidev/users/${id}`,
      );

      const user = await res.json();
      setUser(user);
    } catch (error) {
      throw `Error: ${error}`;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const res = await fetch(
        `https://627e6af6271f386ceff7c4c8.mockapi.io/abasidev/users/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "Application/json",
          },
        },
      );
      if(res.status === 200){
        toast.success("Delete User Successfully!");
        getUsers();
      }
    } catch (error) {
      throw `Error: ${error}`;
    }
  };

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
              element={<Home users={users} loading={loading} deleteUser={deleteUser}/>}
            />
            <Route
              path="/createuser"
              element={<UserForm getUsers={getUsers} />}
            />
            <Route
              path="/edit/:id"
              element={<UserForm isEdit users={users} getUsers={getUsers} />}
            />
            <Route
              path="/user/:id"
              element={<User getUser={getUser} user={user} loading={loading}/>}
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
};

export default App;
