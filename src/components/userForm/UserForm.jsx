import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import BackButton from "../backButton/BackButton";
import Card from "../UI/card/Card";

import classes from "./userForm.module.css";

const UserForm = ({ isEdit, users, getUsers }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isDisabled, setIsDisabled] = useState(false);
  const [values, setValues] = useState({
    name: "",
    family: "",
    mobile: "",
  });

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (formVaild()) {
      setIsDisabled(true);
      if (!isEdit) {
        const response = await createUser();
        if (response.status === 201) {
          navigate("/");
          getUsers();
          toast.success("Created User Successfully!");
        }
      } else {
        const response = await editUser();
        if (response.status === 200) {
          navigate("/");
          getUsers();
          toast.success("Edit User Successfully!");
        }
      }
    }
  };

  const createUser = async () => {
    try {
      const res = await fetch(
        "https://627e6af6271f386ceff7c4c8.mockapi.io/abasidev/users",
        {
          method: "POST",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify(values),
        },
      );
      return res;
    } catch (error) {
      throw `Error: ${error}`;
    } finally {
      setIsDisabled(false);
    }
  };

  const editUser = async () => {
    try {
      const res = await fetch(
        `https://627e6af6271f386ceff7c4c8.mockapi.io/abasidev/users/${values.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "Application/json",
          },
          body: JSON.stringify(values),
        },
      );
      return res;
    } catch (error) {
      throw `Error: ${error}`;
    } finally {
      setIsDisabled(false);
    }
  };

  const formVaild = () => {
    if (values.name === "") {
      toast.error("Name User Empty!");
      return false;
    } else if (values.family === "") {
      toast.error("Name Family Empty!");
      return false;
    } else if (values.mobile === "") {
      toast.error("Name Mobile Empty!");
      return false;
    } else if (values.mobile.length !== 10) {
      toast.error("Phone Number Must Be 10 Digits!");
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (isEdit) {
      const user = users.find((user) => user.id == id);
      setValues({ ...user });
    }
  }, [users]);

  return (
    <Card padding="20px">
      <div className={classes.userform__head}>
        <BackButton />
        <h2 className={classes.userform__title}>
          {isEdit ? "Edit User" : "Create User"}
        </h2>
      </div>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Name User"
            id="name"
            value={values.name}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="family">Family</label>
          <input
            type="text"
            placeholder="Enter Family User"
            id="family"
            value={values.family}
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="number"
            placeholder="Enter Mobile User"
            id="mobile"
            value={values.mobile}
            onChange={onChangeHandler}
          />
        </div>
        <button className="btn btn-success" disabled={isDisabled}>
          {isEdit ? "Edit" : "Add"} User
        </button>
      </form>
    </Card>
  );
};

export default UserForm;
