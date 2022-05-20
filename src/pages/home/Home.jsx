import { Link } from "react-router-dom";

import Table from "../../components/table/Table";
import UserItem from "../../components/table/userItem/UserItem";

import userHead from "../../config/userHead";

const Home = ({ users, loading, deleteUser }) => {
  return (
    <>
      <Link className="btn btn-primary" to="/createuser">
        Create User
      </Link>
      <Table
        headData={userHead}
        bodyData={users}
        renderBody={(user) => (
          <UserItem key={user.id} user={user} deleteUser={deleteUser} />
        )}
        loading={loading}
      />
    </>
  );
};

export default Home;
