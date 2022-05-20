import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import BackButton from "../../components/backButton/BackButton";
import Card from "../../components/UI/card/Card";
import Spinner from "../../components/UI/spinner/Spinner";
import formatDate from "../../utils/formatDate";

import classes from "./user.module.css";

const User = ({ getUser, user, loading }) => {
  const { id } = useParams();

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <div className={classes.user__wrapper}>
      <Card padding="15px 30px">
        <BackButton />
        {loading ? (
          <Spinner minHeight="270px" />
        ) : (
          <div className={classes.user}>
            <div className={classes.user__avatar}>
              <img src={user.avatar} alt={user.name} />
            </div>
            <div className={classes.user__details}>
              <h3>
                Name : <span>{user.name}</span>
              </h3>
              <h3>
                Family : <span>{user.family}</span>
              </h3>
              <h3>
                Mobile : <span>{user.mobile}</span>
              </h3>
              <h3>
                CreatedAt : <span>{formatDate(user.createdAt)}</span>
              </h3>
              <div className="btn-group">
                <Link to={`/edit/${user.id}`} className="btn btn-warning">
                  Edit
                </Link>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default User;
