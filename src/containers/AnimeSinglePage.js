import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'underscore';

import AnimeReact from 'api/AnimeReact';
import HeroImage from 'components/HeroImage';
import AnimeMainInfo from 'components/AnimeMainInfo';

import ImageNotFound from 'img/poster-not-found.jpg';

const SinglePageContainer = styled.div``;

const CircularProgressStyle = styled(CircularProgress)`
  margin: 0 auto;
`;

const ColumnAnimeinfo = styled.div`
  margin-left: 15px;
`;

class AnimeSinglePage extends React.Component {
  state = {
    anime: {},
  }

  componentWillMount() {
    const animeId = this.props.match.params.id;
    AnimeReact.fetchAnimeById(animeId)
      .then(anime => this.setState({ anime: anime.data }));
  }

  render = () => {
    if (!_.isEmpty(this.state.anime)) {
      const {
        coverImage,
        canonicalTitle,
        posterImage,
        showType,
        episodeCount,
        status,
        startDate,
        endDate,
        averageRating,
        episodeLength,
      } = this.state.anime.attributes;

      const animeDetails = {
        type: showType,
        episodes: episodeCount,
        status,
        start: startDate,
        end: endDate,
        rating: averageRating,
        duraction: `${episodeLength} mins`,
      };

      const largePorterImg = posterImage ? posterImage.large : ImageNotFound;
      const largeConverIMage = coverImage ? coverImage.large : '';

      return (
        <SinglePageContainer>
          <HeroImage
            src={largeConverIMage}
            title={canonicalTitle}
          />
          <ColumnAnimeinfo>
            <AnimeMainInfo
              posterImage={largePorterImg}
              animeDetails={animeDetails}
            />
          </ColumnAnimeinfo>
        </SinglePageContainer>
      );
    }
    return (
      <SinglePageContainer>
        <CircularProgressStyle />
      </SinglePageContainer>
    );
  }
}

AnimeSinglePage.propTypes = {
  match: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ])).isRequired,
};

export default AnimeSinglePage;
