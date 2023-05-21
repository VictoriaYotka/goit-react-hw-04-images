import { ThreeDots } from  'react-loader-spinner'

 export default function Loader () {
    return (
        <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#303f9f" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{marginRight: 'auto', marginLeft: 'auto', display: 'block'}}
            wrapperClassName=""
            visible={true}
            />
    )
 }