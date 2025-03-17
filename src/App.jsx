import { useState, useEffect } from "react";
import { fetchPhotos } from "./integration/unsplash_api";
import ErrorMessages from "./components/ErrorMessages";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import LoadMore from "./components/LoadMore";
import SearchBar from "./components/SearchBar";
import ImageModal from "./components/ImageModal";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (!searchQuery) return;
    const getPhotos = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchPhotos(searchQuery, page);
        setPhotos((prevState) => [...prevState, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error(error.message, error.response?.data);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getPhotos();
  }, [page, searchQuery]);

  const handleUpdateQuery = (query) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      toast("Please enter a query", {
        type: "error",
        position: "bottom-right",
      });
      return;
    } else if (trimmedQuery === searchQuery) {
      toast("You entered the same query.", {
        type: "blank",
        position: "bottom-right",
      });
    } else {
      setSearchQuery(trimmedQuery);
      setPage(1);
      setTotalPages(0);
      setPhotos([]);
      closeModal();
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    openModal();
  };

  return (
    <>
      <Toaster />
      <SearchBar onUpdateQuery={handleUpdateQuery} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} onImageClick={handleImageClick} />
      )}
      {error && <ErrorMessages />}
      {photos.length > 0 && (
        <p>
          Page: {page}/{totalPages}
        </p>
      )}
      {page < totalPages && (
        <LoadMore onLoadMore={() => setPage((prevState) => prevState + 1)}>
          Load {isLoading ? <Loader /> : " more"}
        </LoadMore>
      )}
      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
}

export default App;
