import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled'

export default function ImageGalleryItem ({webformatURL, alt, handleImageClick}) {
    return (
        <GalleryItem>
  <GalleryItemImage onClick={handleImageClick} src={webformatURL} alt={alt}/>
</GalleryItem>
    )
}