
import {LoadMoreButton} from './Button.styled'
export default function Button ({handleLoadMore}) {
    return (
        <LoadMoreButton onClick={handleLoadMore} type="button" className="button">Load more</LoadMoreButton>
    )
}