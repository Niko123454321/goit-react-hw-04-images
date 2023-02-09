import css from './button.module.css';
import PropTypes from 'prop-types';

export function LoadBtn({ loadMoreHendler }) {
  return (
    <button onClick={loadMoreHendler} className={css.button}>
      <span>Load more</span>
    </button>
  );
}

LoadBtn.propTypes = {
  loadMoreHendler: PropTypes.func,
};
