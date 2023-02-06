import css from './app.module.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { Component } from 'react';

export class App extends Component {
  state = {
    search: '',
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('this.state ', this.state);
    console.log('prevState ', prevState);
  }

  handlSearch = value => {
    this.setState({
      search: value,
    });
  };

  render() {
    const { handlSearch } = this;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={handlSearch} />
      </div>
    );
  }
}
