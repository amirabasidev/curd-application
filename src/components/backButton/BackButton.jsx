import {useNavigate} from 'react-router-dom'

import classes from "./backButton.module.css";

const BackButton = ({ marginBottom }) => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return <span onClick={goBack} className={classes.back} style={{ marginBottom }}></span>;
};

export default BackButton;
