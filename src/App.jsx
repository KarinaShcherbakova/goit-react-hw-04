import { useState, useEffect } from 'react'; 
import { fetchImages } from './services/api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import styles from './App.module.css';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setNoResults(false);

      try {
        const data = await fetchImages(query, page);
        if (data.results.length === 0 && page === 1) {
          setNoResults(true);
        }

        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
        }
      } catch (error) {
        setError(`Failed to fetch images. Please try again later: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setNoResults(false);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      {noResults && !loading && <ErrorMessage message="No results found for your search." />}
      {images.length > 0 && <ImageGallery images={images} onImageClick={handleImageClick} />}
      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <div className={styles.loadMoreBtnWrapper}>
          <LoadMoreBtn onClick={handleLoadMore} />
        </div>
      )}
      <ImageModal image={selectedImage} onClose={handleCloseModal} />
      <Toaster />
    </div>
  );
};

export default App;