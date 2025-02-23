import AddressBook from "src/components/AddressBook";
import classes from "./index.module.css";

export const Home = () => {
  return (
    <div className={classes.home}>
      <h1>Home page</h1>

      <AddressBook />
    </div>
  );
};

export default Home;
