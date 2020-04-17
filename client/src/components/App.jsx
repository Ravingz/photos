import React from 'react';
import PhotoCarousel from './PhotoCarousel.jsx';
import ModalCarousel from './ModalCarousel.jsx';
import styles from '../css/app.css';
import axios from 'axios';
import faker from 'faker';

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
  }

  componentDidMount() {
    const id = faker.random.number({min: 999990, max: 1000000})
    axios.get(`/api/restaurants/${id}/images`)
      .then(({ data: { rows, count } }) => {
        this.setState({
          ...this.state,
          photos: rows,
          count
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
    const { photos, show, count, showCarousel } = this.state;
    const showHideClassName = showCarousel ? `${styles.displayAll}` : `${styles.displayFade}`;

    return (
      <div id="app">
        <div className={styles.container}>
            <ModalCarousel
              photos={photos}
              show={show}
              count={count}
              handleClose={this.hideModal}/>
          </div>

          <div className={showHideClassName}>
          <PhotoCarousel
          photos={photos}
          showCarousel={showCarousel}/>
          
          <div className={styles.button}>
            <button type="button" onClick={this.showModal} >
              See All {count}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
