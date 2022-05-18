import classes from './header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
        <h1 className={classes.logo}>Curd Application</h1>
    </header>
  )
}

export default Header;