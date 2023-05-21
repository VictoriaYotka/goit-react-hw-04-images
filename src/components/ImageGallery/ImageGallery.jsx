import {ImageGalleryList} from './ImageGallery.styled'

export default function ImageGallery ({children}) {
    return (
        <>
        <ImageGalleryList>{children}</ImageGalleryList>
        </>
    )
}