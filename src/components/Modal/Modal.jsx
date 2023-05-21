import { useEffect } from "react"
import { Overlay, ModalDiv } from "./Modal.styled"

export default function Modal ({src, alt, closeModal}) {
useEffect(() => {
  window.addEventListener('keydown', closeModal)

  return () => {
    window.removeEventListener('keydown', closeModal)
  }
}, [closeModal])

    return (
      <Overlay  onClick={closeModal}>
      <ModalDiv >
        <img src={src} alt={alt} />
      </ModalDiv>
    </Overlay>
  )
}
