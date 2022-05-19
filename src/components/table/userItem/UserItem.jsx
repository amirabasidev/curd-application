import React from "react";
import { Link } from "react-router-dom";

import formatDate from "../../../utils/formatDate";

import classes from './userItem.module.css';

const UserItem = ({user}) => {
  return (
    <tr className={classes.userItem}>
      <td>{user.name}</td>
      <td>{user.family}</td>
      <td>{user.mobile}</td>
      <td>{formatDate(user.createdAt)}</td>
      <td className="btn-group">
        <Link to={`/user/${user.id}`} className="btn btn-primary">View User</Link>
        <Link to={`/edit/${user.id}`} className="btn btn-warning">Edit</Link>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  );
};

export default UserItem;
