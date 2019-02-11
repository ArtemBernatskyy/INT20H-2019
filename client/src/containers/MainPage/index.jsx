import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import Select from 'react-select';

import { getPhotos } from 'redux/actions/photoActions';
import { getEmotions } from 'redux/actions/emotionActions';
import Header from 'components/Header';
import LoadingIcon from 'mdi-react/LoadingIcon';
import { resultsToOptions } from 'utils/misc';


class MainPage extends Component {
  componentDidMount() {
    this.props.getPhotos();
    this.props.getEmotions();
  }

  handleEmotionChange = async (emotions) => {
    // emotions have unique names so we can easily filter by name
    await this.props.getPhotos({ emotions: emotions.map(emotion => emotion.label).join(', ') });
    return resultsToOptions(this.props.emotions.results, 'name') || [];
  }

  render() {
    const { photos, emotions } = this.props;
    const isPhotosLoading = photos.loading;
    const isEmotionsLoading = emotions.loading;

    return (
      <React.Fragment>
        <Header />
        {(isPhotosLoading || isEmotionsLoading) && <div className="loader"><LoadingIcon /></div>}
        <div className="album py-5 bg-light">
          <div className="container">

            <Row className="mb-3 filter">
              <div className="filter__container">
                <Select
                  isMulti
                  onChange={this.handleEmotionChange}
                  options={resultsToOptions(emotions.results, 'name') || []}
                />
              </div>
            </Row>

            <div className="row">

              {photos.results.map(image => (
                <div key={image.id} className="col-md-4">
                  <div className="card mb-4 shadow-sm">
                    <img className="card-img-top" data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" alt={image.title} src={image.url_m} data-holder-rendered="true" />
                    <div className="card-body">
                      <p className="card-text">{image.title}</p>
                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}


export default connect(
  state => ({
    photos: state.photos,
    emotions: state.emotions,
  }),
  { getPhotos, getEmotions },
)(MainPage);
