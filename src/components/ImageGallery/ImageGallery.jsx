import css from './imageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export function ImageGallery({ images, showModal }) {
  return (
    <ul className={css.ImageGallery}>
      {console.log(images)}
      {images.map(image => (
        <ImageGalleryItem
          showModal={() => showModal(image.webformatURL)}
          key={image.id}
          id={image.id}
          imgUrl={image.webformatURL}
          title={image.tags}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      showModal: PropTypes.func,
    })
  ).isRequired,
};
