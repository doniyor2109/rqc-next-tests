import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Media from 'react-media';

// components
import MediaKitHead from './MediaKitHead';
import PhotoGalleries from './PhotoGalleries';
import Videos from './Videos';
import Presentations from './Presentations';
import MainCategory from '../shared/styled/MainCategory';
import MediaKitPage from './styled';
import Identity from './Identity';

const MediaKitMainComponent = ({
  fb_locale,
  photos,
  videos,
  presentations,
  isFetchingPhoto,
  isFetchingVideo,
  isFetchingPresentations,
  fetchPhotoGalleries,
  fetchVideo,
  fetchPresentations,
  photosNextpage,
  videosNextpage,
  presentationsNextpage,
  lang,
  phone,
  tablet,
}, { t }) => (
  <MediaKitPage>
    <MediaKitHead fb_locale={fb_locale} />
    <section className="title">
      <div className="container">
        <h1 className="page-main-heading">{t('Медиа-кит')}</h1>
      </div>
    </section>
    <section className="photo-galleries">
      <div className="container">
        <MainCategory>
          {t('Фотогалереи')}
        </MainCategory>
        <Media
          query="(min-width: 769px)"
          defaultMatches={phone === null && tablet === null}
          render={() => (
            <Fragment>
              <PhotoGalleries
                items={photos}
                isFetching={isFetchingPhoto}
                fetchItems={fetchPhotoGalleries}
                lang={lang}
                initialItems={6}
                morenews={3}
                nextPage={photosNextpage}
              />
            </Fragment>
          )
            }
        />
        <Media
          query="(min-width: 416px) and (max-width: 768px)"
          defaultMatches={tablet !== null}
          render={() => (
            <Fragment>
              <PhotoGalleries
                items={photos}
                isFetching={isFetchingPhoto}
                fetchItems={fetchPhotoGalleries}
                lang={lang}
                initialItems={6}
                morenews={2}
                nextPage={photosNextpage}
              />
            </Fragment>
          )
          }
        />
        <Media
          query="(max-width: 415px)"
          defaultMatches={phone !== null}
          render={() => (
            <Fragment>
              <PhotoGalleries
                items={photos}
                isFetching={isFetchingPhoto}
                fetchItems={fetchPhotoGalleries}
                lang={lang}
                initialItems={3}
                morenews={3}
                nextPage={photosNextpage}
              />
            </Fragment>
          )
          }
        />
      </div>
    </section>
    <section className="videoclips">
      <div className="container">
        <MainCategory>
          {t('Видео')}
        </MainCategory>
        <Media
          query="(min-width: 416px)"
          defaultMatches={phone === null}
          render={() => (
            <Fragment>
              <Videos
                items={videos}
                isFetching={isFetchingVideo}
                fetchItems={fetchVideo}
                lang={lang}
                initialItems={4}
                morenews={2}
                nextPage={videosNextpage}
              />
            </Fragment>
          )
          }
        />
        <Media
          query="(max-width: 415px)"
          defaultMatches={phone !== null}
          render={() => (
            <Fragment>
              <Videos
                items={videos}
                isFetching={isFetchingVideo}
                fetchItems={fetchVideo}
                lang={lang}
                initialItems={3}
                morenews={2}
                nextPage={videosNextpage}
              />
            </Fragment>
          )
            }
        />
      </div>
    </section>
    {(presentations.length > 0)
      && (
      <section className="presentations">
        <div className="container">
          <MainCategory>
            {t('Презентации')}
          </MainCategory>
          <Media
            query="(min-width: 769px)"
            defaultMatches={phone === null && tablet === null}
            render={() => (
              <Fragment>
                <Presentations
                  items={presentations}
                  isFetching={isFetchingPresentations}
                  fetchItems={fetchPresentations}
                  lang={lang}
                  initialItems={3}
                  morenews={3}
                  nextPage={presentationsNextpage}
                />
              </Fragment>
            )
            }
          />
          <Media
            query="(min-width: 416px) and (max-width:768px)"
            defaultMatches={tablet !== null}
            render={() => (
              <Fragment>
                <Presentations
                  items={presentations}
                  isFetching={isFetchingPresentations}
                  fetchItems={fetchPresentations}
                  lang={lang}
                  initialItems={4}
                  morenews={3}
                  nextPage={presentationsNextpage}
                />
              </Fragment>
            )
          }
          />
          <Media
            query="(max-width: 415px)"
            defaultMatches={phone !== null}
            render={() => (
              <Fragment>
                <Presentations
                  items={presentations}
                  isFetching={isFetchingPresentations}
                  fetchItems={fetchPresentations}
                  lang={lang}
                  initialItems={3}
                  morenews={3}
                  nextPage={presentationsNextpage}
                />
              </Fragment>
            )
            }
          />
        </div>
      </section>
      )}
      <Identity />
  </MediaKitPage>
);

MediaKitMainComponent.propTypes = {
  fb_locale: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string,
    data: PropTypes.shape({
      photo_set: PropTypes.arrayOf(PropTypes.shape({
        photo: PropTypes.shape({
          thumbnail: PropTypes.shape({
            url: PropTypes.string,
          }),
          alt: PropTypes.string,
        }),
      })),
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  })),
  videos: PropTypes.arrayOf(PropTypes.shape({
    uid: PropTypes.string,
    data: PropTypes.shape({
      youtube_link: PropTypes.shape({
        html: PropTypes.string,
      }),
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
    }),
  })),
  presentations: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.shape({
      presentation_link: PropTypes.string,
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      author_name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      thumbnail: PropTypes.shape({
        url: PropTypes.string,
        alt: PropTypes.string,
      }),
    }),
  })),
  isFetchingPhoto: PropTypes.bool,
  isFetchingVideo: PropTypes.bool,
  isFetchingPresentations: PropTypes.bool,
  fetchPhotoGalleries: PropTypes.func.isRequired,
  fetchVideo: PropTypes.func.isRequired,
  fetchPresentations: PropTypes.func.isRequired,
  photosNextpage: PropTypes.string,
  videosNextpage: PropTypes.string,
  presentationsNextpage: PropTypes.string,
  lang: PropTypes.string,
  phone: PropTypes.string,
  tablet: PropTypes.string,
};

MediaKitMainComponent.defaultProps = {
  fb_locale: 'ru_RU',
  photos: [],
  videos: [],
  presentations: [],
  isFetchingPhoto: false,
  isFetchingVideo: false,
  isFetchingPresentations: false,
  photosNextpage: null,
  videosNextpage: null,
  presentationsNextpage: null,
  lang: 'ru',
  phone: null,
  tablet: null,
};

MediaKitMainComponent.contextTypes = {
  t: PropTypes.func,
};

export default MediaKitMainComponent;
