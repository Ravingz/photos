import React from 'react';
import ModalCard from './ModalCard.jsx';
import ModalSideBar from './ModalSideBar.jsx';
import styles from '../css/ModalCarousel.css';
class ModalCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPhoto: 0,
    };
    this.prevPhoto = this.prevPhoto.bind(this);
    this.nextPhoto = this.nextPhoto.bind(this);
  }

  prevPhoto() {
    const { photos } = this.props;
    if (this.state.selectedPhoto <= 1) {
      this.setState({
        selectedPhoto: 0,
      });
    }
    this.setState({
      selectedPhoto: this.state.selectedPhoto - 1 || 0,
    });
  }

  nextPhoto() {
    const { photos } = this.props;
    if (this.state.selectedPhoto <= photos.length - 1) {
      this.setState({
        selectedPhoto: photos.length - 1,
      })
    }
    this.setState({
      selectedPhoto: this.state.selectedPhoto + 1,
    });
  }

  render() {
    const { selectedPhoto } = this.state;
    const { photos, show, handleClose } = this.props;
    const showHideClassName = show ? 'model display-block' : 'model display-none';
    return (
      <div>
        <div className={showHideClassName}>
          <div className={styles.overlay}>
            <div className={styles.button}> 
            <button onClick={handleClose}>close X</button>
              </div>
        
              <div className={styles.fullModalContainer}>
              <div className={styles.sideBarContainer}>
              <div className={styles.title} >
                Photos for Restaurant Kitchen
              <div className={styles.subtitle}>
                See All {photos.length}
                </div>
            <ModalSideBar photos={photos} />
            </div>
            </div>
            <ModalCard
              photos={photos} selectedPhotoIndex={selectedPhoto} />
         
          <div className="arrows">
          <div
            type="click"
            className={styles.arrowLeft}
            onClick={this.prevPhoto}/>
          <div
            type="click"
            className={styles.arrowRight}
            onClick={this.nextPhoto}/>
             </div>
        </div>
        </div>
        </div>
      </div>
    );
  }
}

export default ModalCarousel;
