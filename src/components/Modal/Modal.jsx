import { Component } from "react"
import { Overlay, ModalDiv } from "./Modal.styled"

export default class Modal extends Component {

  componentDidMount () {
    window.addEventListener('keydown', this.props.closeModal)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.props.closeModal)
  }

  render () {
    const { closeModal, src, alt } = this.props

    return (
      <Overlay  onClick={closeModal}>
      <ModalDiv >
        <img src={src} alt={alt} />
      </ModalDiv>
    </Overlay>
  )
  }
}
