import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'underscore';

import HeroImage from 'components/HeroImage';
import AnimeMainInfo from 'components/AnimeMainInfo';
import AnimeCard from 'components/AnimeCard';
import YoutubeVideo from 'components/YoutubeVideo';

import ImageNotFound from 'img/poster-not-found.jpg';

const SinglePageContainer = styled.div``;

const CircularProgressStyle = styled(CircularProgress)`
  margin: 0 auto;
`;

const ColumnAnimeinfo = styled.div`
  margin-left: 15px;
  display: inline-block;
`;

const ColumnBodyPage = ColumnAnimeinfo.extend`
  margin-left: 50px;
  vertical-align: top;
`;

class SingleAnimePage extends React.Component {
  static propTypes = {
    match: PropTypes.objectOf(PropTypes.any).isRequired,
    actions: PropTypes.objectOf(PropTypes.func).isRequired,
    anime: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  componentWillMount() {
    const animeId = this.props.match.params.id;
    this.props.actions.fetchSingleAnime(animeId);
  }

  render = () => {
    console.log(this.props.anime);

    if (!_.isEmpty(this.props.anime)) {
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
        synopsis,
        youtubeVideoId,
      } = this.props.anime.attributes;

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

          <ColumnBodyPage>
            <AnimeCard title="Description">
              {synopsis}
            </AnimeCard>

            <AnimeCard title="Video">
              <YoutubeVideo videoId={youtubeVideoId} />
            </AnimeCard>
          </ColumnBodyPage>

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

export default SingleAnimePage;
