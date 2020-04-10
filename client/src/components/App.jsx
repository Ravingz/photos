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
    // ajax({
    //   type: 'GET',
    //   url: '/seeAllPhotos',
    //   success: (photos) => this.setState({ photos: [ ] }),
    //   error: (error) => console.log('error', error),
    // });

    this.setState({
      ...this.state,
      photos: [{ id: 5,
        dateAdded: '3/5/2019',
        userName: 'Karry',
        photoTitle: 'National Gallery',
        comment:
         'Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.',
        url_address: 'https://photos4foods.s3-us-west-1.amazonaws.com/4.jpeg',
        reviewStars: 'client-server',
        personEmote: 'Miboo',
        userthumbnail: 'Yak' },
      { id: 6,
        dateAdded: '3/5/2019',
        userName: 'Gawen',
        photoTitle: 'After Tiller',
        comment:
         'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
        url_address: 'https://photos4foods.s3-us-west-1.amazonaws.com/5.jpeg',
        reviewStars: 'Innovative',
        personEmote: 'Eamia',
        userthumbnail: 'Pie, indian tree' },
        { id: 7,
          dateAdded: '3/5/2019',
          userName: 'Gawen',
          photoTitle: 'After Tiller',
          comment:
           'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
          url_address: 'https://photos4foods.s3-us-west-1.amazonaws.com/5.jpeg',
          reviewStars: 'Innovative',
          personEmote: 'Eamia',
          userthumbnail: 'Pie, indian tree' },
          { id: 8,
            dateAdded: '3/5/2019',
            userName: 'Gawen',
            photoTitle: 'After Tiller',
            comment:
             'Fusce consequat. Nulla nisl. Nunc nisl.\n\nDuis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.\n\nIn hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.',
            url_address: 'https://photos4foods.s3-us-west-1.amazonaws.com/5.jpeg',
            reviewStars: 'Innovative',
            personEmote: 'Eamia',
            userthumbnail: 'Pie, indian tree' }
      ]
    })
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
    if(photos.length) {
      console.log(this.state)
    }
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
