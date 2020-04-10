import React from 'react';
import PhotoCarousel from './PhotoCarousel.jsx';
import ModalCarousel from './ModalCarousel.jsx';
import styles from '../css/app.css';
import axios from 'axios';

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
    axios.get('/api/restaurants/1000000/images')
      .then(({ data }) => {

        const images = data.reduce((acc, next) => {
          if(next.imageurls) {
            acc = [...acc, ...next.imageurls];
          }

          return acc;
        }, [])

        this.setState({
          ...this.state,
          photos: images
        });
        
      })
      .catch(err => console.log(err));
  }

  showModal() {
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
