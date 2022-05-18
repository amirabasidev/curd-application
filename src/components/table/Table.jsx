import Spinner from "../UI/spinner/Spinner";

import classes from "./table.module.css";

const Table = ({ headData, bodyData, renderBody, loading }) => {
  return (
    <div className={classes.table__wrapper}>
      <table className={classes.table}>
        {headData && (
          <thead>
            <tr>
              {headData.map((item, key) => (
                <th key={key}>{item}</th>
              ))}
            </tr>
          </thead>
        )}
        {bodyData && renderBody && !loading && (
          <tbody>
            {bodyData.map((item, index) => renderBody(item, index))}
          </tbody>
        )}
      </table>
        {loading && <Spinner minHeight="180px"/>}
    </div>
  );
};

export default Table;
