import { useEffect, useState } from "react";

import { SearchBar } from "./SearchBar/SearchBar.jsx";
import { ImageGallery } from "./ImageGallery/ImageGallery.jsx";
import { ErrorMessage } from "./ErrorMessage/ErrorMessage.jsx";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn.jsx";
import { Loader } from "./Loader/Loader.jsx";
import { ImageModal } from "./ImageModal/ImageModal.jsx";
import { fetchImages } from "./service/unsplashAPI.js";

import "./App.css";

export const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataForModal, setDataForModal] = useState(null);

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
