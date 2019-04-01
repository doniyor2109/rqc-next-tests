// core
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Media from 'react-media';
import cookies from 'next-cookies';

// actions
import { RichText } from 'prismic-reactjs';
import Prismic from 'prismic-javascript';
import * as peopleActions from '../redux/actions/people';
import * as langActions from '../redux/actions/lang';

// components
import { Loading } from '../components/shared/loading';
import PrismicConfig from '../prismic-configuration';
import Persona from '../components/people/Persona';
import PeopleHead from '../components/people/PeopleHead';

class People extends React.Component {
    state = {
      intMobileNumber: 3,
      trusteesMobileNumber: 3,
      more_info_button1_is_active: true,
      more_info_button2_is_active: true,
      more_info_button3_is_active: true,
    }

    static contextTypes = {
      t: PropTypes.func,
    }

    static async getInitialProps(ctx) {
      // получаем все необходимое для рендеринга компонента от сервера
      const { reduxStore } = ctx;

      // получаем настройки языка из кукис
      const { language } = cookies(ctx);

      // запрос к Prismic через redux actons с добавлением контента в redux store
      reduxStore.dispatch(peopleActions.fetchPeopleRequest());
      const api = await Prismic.getApi(PrismicConfig.apiEndpoint);
      await api.query(Prismic.Predicates.at('document.type', 'people'), { lang: language })
        .then(response => reduxStore.dispatch(peopleActions.fetchPeopleSuccess(response)))
        .catch(error => reduxStore.dispatch(peopleActions.fetchPeopleError(error)));

      return {};
    }

    componentDidUpdate(prevProps) {
      if (this.props.lang !== prevProps.lang) {
        this.props.fetchPeople(this.props.lang);
      }
    }

    boardClick = (e) => {
      e.preventDefault();
      this.setState({
        more_info_button1_is_active: !this.state.more_info_button1_is_active,
        boardMobileNumber: this.props.people.page.data.body[0].items.length,
      });
    }


      intClick = (e) => {
        e.preventDefault();
        this.setState({
          more_info_button2_is_active: !this.state.more_info_button2_is_active,
          intMobileNumber: this.props.people.page.data.body1[0].items.length,
        });
      }


      trusteesClick = (e) => {
        e.preventDefault();
        this.setState({
          more_info_button3_is_active: !this.state.more_info_button3_is_active,
          trusteesMobileNumber: this.props.people.page.data.body2[0].items.length,
        });
      }

      render() {
        const { phone, tablet, fb_locale } = this.props;

        console.log('people', this.props);
        const { isFetching, page } = this.props.people;
        if (isFetching) return <Loading />;
        return (
          <section className="peoplepage">

            <PeopleHead fbLocale={fb_locale} />

            <div className="container">


              {/* РУКОВОДСТВО */}
              <Media
                query="(min-width: 416px)"
                defaultMatches={phone === null}
                render={() => (
                  <div id="board" className="people-section">
                    {page.data && RichText.render(page.data.body[0].primary.team_section, PrismicConfig.linkResolver)}
                    <div className="columns is-multiline">
                      {page.data && page.data.body[0].items.map((persona, index) => <Persona item={persona} key={index} />)}
                    </div>
                  </div>
                )
                                }
              />
              <Media
                query="(max-width: 415px)"
                defaultMatches={phone !== null}
                render={() => (
                  <div id="board" className="people-section">
                    {page.data && RichText.render(page.data.body[0].primary.team_section, PrismicConfig.linkResolver)}
                    <div className="columns is-multiline">
                      {page.data && page.data.body[0].items.map((persona, index) => <Persona item={persona} key={index} />)}
                    </div>
                    {page.data && (page.data.body[0].items.length > 3) && this.state.more_info_button1_is_active
                                                && (
                                                <div className="button-wraper">
                                                  <img src="/static/more.svg" onClick={this.boardClick} />
                                                </div>
                                                )
                                            }
                  </div>
                )
                                }
              />

              {/* МЕЖДУНАРОДНЫЙ СОВЕТ */}

              <Media
                query="(min-width: 416px)"
                defaultMatches={phone === null}
                render={() => (
                  <div id="international-board" className="people-section">
                    {page.data && RichText.render(page.data.body1[0].primary.team_section, PrismicConfig.linkResolver)}
                    <div className="columns is-multiline">
                      {page.data && page.data.body1[0].items.map((persona, index) => <Persona item={persona} key={index} onClick={this.popupOn} />)}
                    </div>
                  </div>
                )
                                }
              />
              <Media
                query="(max-width: 415px)"
                defaultMatches={phone !== null}
                render={() => (
                  <div id="international-board" className="people-section">
                    {page.data && RichText.render(page.data.body1[0].primary.team_section, PrismicConfig.linkResolver)}
                    <div className="columns is-multiline">
                      {page.data && page.data.body1[0].items.slice(0, this.state.intMobileNumber).map((persona, index) => <Persona item={persona} key={index} onClick={this.popupOn} />)}
                    </div>
                    {page.data && (page.data.body1[0].items.length > 3) && this.state.more_info_button2_is_active
                                                && (
                                                <div className="button-wraper">
                                                  <img src="/static/more.svg" onClick={this.intClick} />
                                                </div>
                                                )
                                            }
                  </div>
                )
                                }
              />


              {/* ПОПЕЧИТЕЛЬСКИЙ СОВЕТ */}

              <Media
                query="(min-width: 416px)"
                defaultMatches={phone === null}
                render={() => (
                  <div id="board-of-trustees" className="people-section">
                    {page.data && RichText.render(page.data.body2[0].primary.team_section, PrismicConfig.linkResolver)}
                    <div className="columns is-multiline">
                      {page.data && page.data.body2[0].items.map((persona, index) => <Persona item={persona} key={index} />)}
                    </div>
                  </div>
                )
                                }
              />
              <Media
                query="(max-width: 415px)"
                defaultMatches={phone !== null}
                render={() => (
                  <div id="board-of-trustees" className="people-section">
                    {page.data && RichText.render(page.data.body2[0].primary.team_section, PrismicConfig.linkResolver)}
                    <div className="columns is-multiline">
                      {page.data && page.data.body2[0].items.slice(0, this.state.trusteesMobileNumber).map((persona, index) => <Persona item={persona} key={index} />)}
                    </div>
                    {page.data && (page.data.body2[0].items.length > 3) && this.state.more_info_button3_is_active
                                                && (
                                                <div className="button-wraper">
                                                  <img src="/static/more.svg" onClick={this.trusteesClick} />
                                                </div>
                                                )
                                            }
                  </div>
                )
                                }
              />
            </div>
          </section>

        );
      }
}


const mapStateToProps = (state) => {
  const { people } = state;
  const { lang } = state.i18nState;
  return { people, lang };
};


const mapDispatchToProps = dispatch => bindActionCreators(Object.assign({},
  peopleActions,
  langActions), dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(People);
