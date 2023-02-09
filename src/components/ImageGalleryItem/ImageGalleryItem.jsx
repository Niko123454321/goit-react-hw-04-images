import css from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ imgUrl, title, id, showModal }) {
  return (
    <li key={id} onClick={showModal} className={css.ImageGalleryItem}>
      <img className={css.ImageGalleryItemImage} src={imgUrl} alt={title} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
