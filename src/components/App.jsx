import { Component } from "react";
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

export class App extends Component  {
  state = {
    query: '',
    page: 1,
    images: [],
    largeImage:'',
    isLoading: false,
    loadMore: false,
    isModalOpen: false,
  }

  componentDidUpdate (_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || (prevState.query === query && prevState.page !== page)) {
      this.fetchImages();
    }
  }

  fetchImages = () => {
    const { query, page, images } = this.state;
    this.setState({isLoading: true})
    
    searchImages(query, page)
      .then(res => {
        const {hits} = res;
        
        if(page === 1 && hits.length === 0) {
          this.setState({isLoading: false, loadMore: false});
          Report.info("Oops,we've found no images :(", " ", 'Try another search query');
          return 
        }
        const newImages = hits.map(({id, webformatURL, largeImageURL}) => {return {id, webformatURL, largeImageURL}})
    
        this.setState(prevState => 
          ({images: [...prevState.images, ...newImages]}))

        if((images.length + newImages.length) < res.totalHits) {
          this.setState({loadMore: true})
        } else {
          this.setState({loadMore: false})
        }   
    })
      .catch(error => Report.info('Oops, something went wrong =(', ' ', 'Try again!'))
      .finally(() => this.setState({isLoading: false}))
  }
  
  handleSubmit = (e) => {
    const { query } = this.state;
    const NewQuery = e.target.elements.searchFormInput.value;

    e.preventDefault();

    if(query !== NewQuery) {
      this.setState({query: NewQuery, page: 1, images: []});
    } else {
      Report.info("you are already viewing images ", "for this request", 'Return');

    }
    
    e.target.reset()
  }

  handleLoadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1})); 
  }

  openModal = (key) => {
    const largeImage = this.state.images.find(image => image.id === key).largeImageURL;

    this.setState({isModalOpen: true, largeImage});
  }

  closeModal = (e) => {
    if(e.key === 'Escape' || e.currentTarget === e.target) {
      this.setState({isModalOpen: false});
    }  
  }

  render () {
    const {query, images, largeImage, isLoading, loadMore, isModalOpen} = this.state;
    
    return (
      <>
      <Searchbar handleSubmit={this.handleSubmit}/>
      
      <ImageGallery>
        {images.map(({id, webformatURL}) => 
          <ImageGalleryItem handleImageClick={()=>this.openModal(id)} key={id} webformatURL={webformatURL} alt={query}/>
          )}
      </ImageGallery>
      
      {isLoading && <Loader />}
      
      {loadMore && <Button handleLoadMore={this.handleLoadMore}/>}
      
      {isModalOpen &&  
      <Modal src={largeImage} alt={query} closeModal={this.closeModal}/>}
      </>
    )
  }
};
