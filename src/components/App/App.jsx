import css from './app.module.css';
import { Searchbar } from '../Searchbar/Searchbar';
import { Component } from 'react';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { searchPhoto } from '../services/post_api';
import { LoadBtn } from '../Button/Button';
import Loader from '../Loader/Loader';
import { Modal } from '../Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    images: [],
    imgDetails: null,
    isModalVisible: false,
    page: 1,
    loading: false,
    error: null,
    isMoreBtnVisible: false,
    // isModalVisible: false,
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log('this.state ', this.state);
    // console.log('prevState ', prevState);
    console.log('componentDidUpdate');
    const { search, page } = this.state;
    if (prevState.search !== search || prevState.page !== page) {
      this.fethImg();
    }
  }

  handlSearch = value => {
    if (this.state.search !== value) {
      this.setState({
        search: value,
        images: [],
        page: 1,
        isModalVisible: false,
      });
    }
  };

  showModal = largeImageURL => {
    this.setState({
      imgDetails: largeImageURL,
      isModalVisible: true,
    });
  };

  closeModal = () => {
    this.setState({
      imgDetails: null,
      isModalVisible: false,
    });
  };

  loadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  async fethImg() {
    try {
      this.setState({ loading: true });
      const { search, page } = this.state;
      const data = await searchPhoto(search, page);
      if (data.totalHits > 0) {
        this.setState(({ images }) => ({
          images: [...images, ...data.hits],
          isMoreBtnVisible: page < Math.ceil(data.totalHits / 12),
          isModalVisible: false,
        }));
      }
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const {
      images,
      loading,
      error,
      isMoreBtnVisible,
      isModalVisible,
      imgDetails,
    } = this.state;
    const { handlSearch, showModal, closeModal, loadMore } = this;
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
  }
}
