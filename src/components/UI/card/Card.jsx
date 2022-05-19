import classes from "./card.module.css";

const Card = ({ children, padding }) => {
  return (
    <div className={classes.card} style={{ padding: padding }}>
      {children}
    </div>
  );
};

export default Card;
