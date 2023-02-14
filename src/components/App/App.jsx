import css from './app.module.css';
import { Searchbar } from '../Searchbar/Searchbar';
// import { Component } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { searchPhoto } from '../services/post_api';
import { LoadBtn } from '../Button/Button';
import Loader from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { useState, useEffect } from 'react';

export const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [imgDetails, setIimgDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);

  useEffect(() => {
    if (search) {
      const fethImg = async () => {
        try {
          setLoading(true);

          const data = await searchPhoto(search, page);
          if (data.totalHits > 0) {
            setImages(prevState => {
              return [...prevState, ...data.hits];
            });
            setIsMoreBtnVisible(page < Math.ceil(data.totalHits / 12));
            setIsModalVisible(false);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fethImg();
    }
  }, [page, search]);

  const handlSearch = value => {
    if (search !== value) {
      setSearch(value);
      setImages([]);
      setPage(1);
      setIsModalVisible(false);
    }
  };

  const showModal = largeImageURL => {
    setIimgDetails(largeImageURL);
    isModalVisible(true);
  };

  const closeModal = () => {
    setIimgDetails(null);
    isModalVisible(false);
  };

  const loadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handlSearch} />
      <ImageGallery images={images} showModal={showModal} />
      {error && (
        <p className={css.error}>
          Something went wrong. Please, try again later!
        </p>
      )}
      {loading && <Loader />}
      {isMoreBtnVisible && <LoadBtn loadMoreHendler={loadMore} />}
      {isModalVisible && (
        <Modal largeImageURL={imgDetails} close={closeModal} />
      )}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     search: '',
//     images: [],
//     imgDetails: null,
//     isModalVisible: false,
//     page: 1,
//     loading: false,
//     error: null,
//     isMoreBtnVisible: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     // console.log('this.state ', this.state);
//     // console.log('prevState ', prevState);
//     // console.log('componentDidUpdate');
//     const { search, page } = this.state;
//     if (prevState.search !== search || prevState.page !== page) {
//       this.fethImg();
//     }
//   }

//   handlSearch = value => {
//     if (this.state.search !== value) {
//       this.setState({
//         search: value,
//         images: [],
//         page: 1,
//         isModalVisible: false,
//       });
//     }
//   };

//   showModal = largeImageURL => {
//     this.setState({
//       imgDetails: largeImageURL,
//       isModalVisible: true,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       imgDetails: null,
//       isModalVisible: false,
//     });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => ({ page: page + 1 }));
//   };

//   async fethImg() {
//     try {
//       this.setState({ loading: true });
//       const { search, page } = this.state;
//       const data = await searchPhoto(search, page);
//       if (data.totalHits > 0) {
//         this.setState(({ images }) => ({
//           images: [...images, ...data.hits],
//           isMoreBtnVisible: page < Math.ceil(data.totalHits / 12),
//           isModalVisible: false,
//         }));
//       }
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ loading: false });
//     }
//   }

//   render() {
//     const {
//       images,
//       loading,
//       error,
//       isMoreBtnVisible,
//       isModalVisible,
//       imgDetails,
//     } = this.state;
//     const { handlSearch, showModal, closeModal, loadMore } = this;
//     return (
//       <div className={css.App}>
//         <Searchbar onSubmit={handlSearch} />
//         <ImageGallery images={images} showModal={showModal} />
//         {error && (
//           <p className={css.error}>
//             Something went wrong. Please, try again later!
//           </p>
//         )}
//         {loading && <Loader />}
//         {isMoreBtnVisible && <LoadBtn loadMoreHendler={loadMore} />}
//         {isModalVisible && (
//           <Modal largeImageURL={imgDetails} close={closeModal} />
//         )}
//       </div>
//     );
//   }
// }
