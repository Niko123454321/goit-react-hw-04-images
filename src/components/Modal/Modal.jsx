import css from './modal.module.css';
// import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, close }) => {
  const closeModalOnClick = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      close();
    }
  };

  useEffect(() => {
    const closeModalOnEsc = ({ code }) => {
      if (code === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', closeModalOnEsc);

    return () => {
      window.removeEventListener('keydown', closeModalOnEsc);
    };
  }, [close]);

  return createPortal(
    <div className={css.Overlay} onClick={closeModalOnClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="largeImageURL" />
      </div>
    </div>,
    modalRoot
  );
};

// export class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeModal);
//   }
//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModal);
//   }
//   closeModal = ({ target, currentTarget, code }) => {
//     if (target === currentTarget || code === 'Escape') {
//       this.props.close();
//     }
//   };

//   render() {
//     const { largeImageURL } = this.props;
//     const { closeModal } = this;
//     return createPortal(
//       <div className={css.Overlay} onClick={closeModal}>
//         <div className={css.Modal}>
//           <img src={largeImageURL} alt="largeImageURL" />
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
