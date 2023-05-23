import { useState, useEffect } from "react";
import { Report } from 'notiflix/build/notiflix-report-aio';
import searchImages from "services";
import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGalleryItem/ImageGalleryItem";
import Loader from './Loader/Loader'
import Button from "./Button/Button";
import Modal from "./Modal/Modal";

Report.init({
  backOverlayClickToClose: true,
  info: {
    svgColor: '#303f9f',
    buttonBackground: '#303f9f',
    backOverlayColor: 'rgba(255,255,255,0.2)',
  },
});

export function App () {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if(query.trim() === '') return

    setIsLoading(true)
    setLoadMore(false);
    
    searchImages(query, page)
      .then(res => {
        const {hits} = res;
        
        if(page === 1 && hits.length === 0) {
          setIsLoading(false);
          setLoadMore(false);

          Report.info("Oops,we've found no images :(", " ", 'Try another search query');
          return 
        }
        const newImages = hits.map(({id, webformatURL, largeImageURL}) => {return {id, webformatURL, largeImageURL}})
    
        setImages(prevState => {
          if((prevState.length + newImages.length) < res.totalHits) {
            setLoadMore(true);
          } else {
            setLoadMore(false);
          }   
          return [...prevState, ...newImages]}) 
    })
      .catch(error => Report.info('Oops, something went wrong =(', ' ', 'Try again!'))
      .finally(() => setIsLoading(false))
  }, [page, query])
  
  const handleSubmit = (e) => {
    const NewQuery = e.target.elements.searchFormInput.value;

    e.preventDefault();

    if(NewQuery.trim() === '') {return}

    if(query !== NewQuery) {
      setQuery(NewQuery);
      setPage(1);
      setImages([]);
    } else {
      Report.info("you are already viewing images ", "for this request", 'Return');
    }
    
    e.target.reset()
  }

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1)
  }

  const openModal = (key) => {
    const image = images.find(image => image.id === key).largeImageURL;
    setIsModalOpen(true);
    setLargeImage(image)
  }

  const closeModal = (e) => {
    if(e.key === 'Escape' || e.currentTarget === e.target) {
      setIsModalOpen(false)
    }  
  }

  return (
    <>
    <Searchbar handleSubmit={handleSubmit}/>
    
    <ImageGallery>
      {images.map(({id, webformatURL}) => 
        <ImageGalleryItem handleImageClick={()=>openModal(id)} key={id} webformatURL={webformatURL} alt={query}/>
        )}
    </ImageGallery>
    
    {isLoading && <Loader />}
    
    {loadMore && <Button handleLoadMore={handleLoadMore}/>}
    
    {isModalOpen &&  
    <Modal src={largeImage} alt={query} closeModal={closeModal}/>}
    </>
  )
}