import React from 'react';
import { ajax } from 'jquery';
import PhotoCarousel from './PhotoCarousel.jsx';
import ModalCarousel from './ModalCarousel.jsx';
import styles from '../css/app.css';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      show: false,
      showCarousel: true,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    // this.showPhotoCarousel = this.showPhotoCarousel.bind(this);
    // this.hidePhotoCarousel = this.hidePhotoCarousel.bind(this);
  }

  componentDidMount() {
    ajax({
      type: 'GET',
      url: '/seeAllPhotos',
      success: (photos) => this.setState({ photos }),
      error: (error) => console.log('error', error),
    });
  }

  showModal() {
    console.log('show modal was invoked');
    this.setState({ 
      show: true,
      showCarousel: false,
    });
  }

  hideModal() {
    this.setState({ 
      show: false,
      showCarousel: true,
    });
  }

  render() {
    const { photos, show, showCarousel } = this.state;
    const showHideClassName = showCarousel ? `${styles.displayAll}` : `${styles.displayFade}`;
    return (
      <div id="app">
        <div className={styles.container}>
            <ModalCarousel
              photos={photos}
              show={show}
              handleClose={this.hideModal}/>
          </div>

          <div className={showHideClassName}>
          <PhotoCarousel
          photos={photos}
          showCarousel={showCarousel}/>
          
          <div className={styles.button}>
            <button type="button" onClick={this.showModal} >
              See All {photos.length-1}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
