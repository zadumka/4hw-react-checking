import { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import toast, { Toaster } from 'react-hot-toast';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { Loader } from './Loader/Loader';
import { ImageModal } from './ImageModal/ImageModal';

export const App = () => {
  const [unsplash, setUnsplash] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [regular, setRegular] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [alt, setAlt] = useState(null);

  const SearchValue = searchValue => {
    setQuery(`${Date.now()}/${searchValue}`);
    setUnsplash([]);
    setPage(1);
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function ApiData() {
      try {
        setLoader(true);
        const data = await fetchData(query.split('/')[1], page);

        setUnsplash(prevData => [...prevData, ...data.results]);
        console.log(data);
        setShow(data.total_pages !== page);
        if (query.split('/')[1].length === 0) {
          toast('There are no images for this request');
        }
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setTimeout(() => {
          setError(false);
        }, 2000);
        setLoader(false);
      }
    }
    ApiData();
  }, [query, page]);
  const handleClickLoadMore = () => {
    setPage(page + 1);
  };

  const handleOpenModal = (regular, alt) => {
    setShowModal(true);
    setRegular(regular);
    setAlt(alt);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <SearchBar onSubmit={SearchValue} />
      <Toaster />
      <ImageGallery items={unsplash} handleClickImage={handleOpenModal} />
      {loader && <Loader />}
      {show && <LoadMoreBtn onLoadMore={handleClickLoadMore} />}
      {error && <ErrorMessage />}
      {showModal && (
        <ImageModal alt={alt} src={regular} closetModal={handleCloseModal} value={showModal} />
      )}
    </div>
  );
};
