import css from './app.module.css';
import { Searchbar } from '../Searchbar/Searchbar';

export const App = () => {
  return (
    <div className={css.App}>
      <Searchbar />
    </div>
  );
};
