import css from './searchbar.module.css';
import { Component } from 'react';
import { CiSearch } from 'react-icons/ci';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    // console.log(target.value);
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handlSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    onSubmit(this.state.search);
    // this.reset();
  };

  reset() {
    this.setState({ search: '' });
  }

  render() {
    const { search } = this.state;
    const { handleChange, handlSubmit } = this;
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handlSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <CiSearch />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            onChange={handleChange}
            value={search}
            name="search"
            className={css.SearchFormInput}
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};
