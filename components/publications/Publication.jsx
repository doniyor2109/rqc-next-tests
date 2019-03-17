import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'prismic-reactjs';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PrismicConfig from '../../prismic-configuration';
import { simpleSearch } from '../search/searchComplex';

// STYLES

const Result = styled.div`
    margin-bottom: ${props => (props.search ? 4 : 3)}rem;
`;

const Title = styled.a`
    font-size: ${props => (props.big ? 2.2 : 1.6)}rem;
    line-height: 3rem;
    color: #3998D1;
    margin-top:0.5rem;
    text-decoration: ${props => (props.big ? 'none' : 'underline')};
    :hover {
        text-decoration: underline;
        color: #3998D1;
    }
    h1 {
        font-weight: 500;
        .bold {
            font-weight: 900;
        }
    }
`;

const Authors = styled.p`
  display: flex;
  flex-wrap: wrap;
`;

const Author = styled.span`
    font-weight: bold;
    margin-right: 0.5rem;
    font-size: 1.6rem;
    line-height: 2.3rem;
    color: rgba(4,3,3,0.7);
    :not(:last-child)::after {
        content: ","
    }
`;
const Journal = styled.div`
    font-size: 1.4rem;
    line-height: 2.3rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const JournalName = styled.a`
    margin-right: 0.5rem;
    color: #3998D1;
    p, span {
        font-size: 1.4rem;
        line-height: 2.3rem;
    }
    .bold {
        font-weight: 700;
    }
    :hover {
        text-decoration: underline;
        color: #3998D1;
    }
`;

const Number = styled.div`
    margin-right: 0.5rem;
`;

const Article = styled.div`
    margin-right: 0.5rem;
`;

const Pages = styled.div`
`;

const Arxiv = styled.a`
    color: #3998D1;
    font-size: 1.4rem;
    line-height: 2.3rem;
    :hover {
        text-decoration: underline;
    }
`;

const PubDate = styled.div`
    font-size: 1.4rem;
    line-height: 2.3rem;

`;

const HR = styled.hr`
    width:16rem;
    height: 1px;
    margin: 1rem auto 1rem 0;
    background: rgba(4,3,3,0.5);
`;

const Publication = (props) => {
  const { item, searchRequest, searchPage } = props;
  const resultInTitle = searchRequest && simpleSearch(item.data.title[0], searchRequest, false);
  const resultInJournal = searchRequest && simpleSearch(item.data.journal_name[0], searchRequest, false);

  return (
    <Result search={!searchRequest}>
      <Authors>
        {item.data.authors.map(author => (
          <Author key={author.text + Math.random().toString(36)}>
            {author.text.replace(/\s/g, '\xa0')}
          </Author>
        ))}
      </Authors>
      <Title
        href={item.data.eprint[0]
          ? `https://arxiv.org/pdf/${item.data.eprint[0].text}`
          : item.data.doi.url}
        target="_blank"
        rel="noopener noreferer"
        className="title-link"
        highlighted={!!resultInTitle}
        search={!searchRequest}
        big={!searchPage}
      >
        <h1>
          {resultInTitle
            ? resultInTitle.map((res, index) => (
              <span key={res} className={index === 1 ? 'bold' : undefined}>
                {res}
              </span>
            ))
            : item.data.title[0].text
            }
        </h1>
      </Title>
      {!searchPage && <HR />}
      <Journal>
        <JournalName href={Link.url(item.data.journal_url, PrismicConfig.linkResolver)}>
          {resultInJournal
            ? resultInJournal.map((res, index) => (
              <span key={Math.random().toString(36)} className={index === 1 ? 'bold' : undefined}>
                {res}
              </span>
            ))
            : item.data.journal_name[0].text
          }
        </JournalName>
        {item.data.volume
        && (
        <div>
          №&nbsp;
          {item.data.volume}
        </div>
        )
        }
        <Number>
          {item.data.number && `(${item.data.number})`}
          {(item.data.article_number > 0 || item.data.pages.length > 0) && (',')}
        </Number>
        {item.data.article_number
        && (
        <Article>
          article №
          {' '}
          {item.data.article_number}
          {item.data.pages.length > 0 && (',')}
        </Article>
        )
        }
        {item.data.pages.length > 0
        && (
        <Pages>
          pp.:
          {' '}
          {item.data.pages[0].text}
        </Pages>
        )
        }
      </Journal>
      {item.data.eprint.length > 0
      && (
      <Arxiv href={`https://arxiv.org/pdf/${item.data.eprint[0].text}`} target="_blank" rel="noopener noreferer">
          Arxiv:
        {' '}
        {item.data.eprint[0].text}
      </Arxiv>
      )

      }
      {item.data.date
      && (
      <PubDate>
        {dayjs(item.data.date).format('DD MMMM YYYY')}
      </PubDate>
      )
      }
    </Result>
  );
};


Publication.propTypes = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      article_number: PropTypes.number,
      authors: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      belongs_to_group: PropTypes.arrayOf(PropTypes.shape({
        sci_group: PropTypes.shape({
          id: PropTypes.string,
          data: PropTypes.shape({
            groupname: PropTypes.arrayOf(PropTypes.shape({
              text: PropTypes.string,
            })),
          }),
        }),
      })),
      date: PropTypes.string,
      doi: PropTypes.shape({
        url: PropTypes.string,
      }),
      eprint: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      journal_name: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      journal_url: PropTypes.shape({
        url: PropTypes.string,
      }),
      number: PropTypes.number,
      pages: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      title: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      volume: PropTypes.number,
    }),
    id: PropTypes.string,
    lang: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  searchRequest: PropTypes.string,
  searchPage: PropTypes.bool,
};

Publication.defaultProps = {
  searchRequest: '',
  searchPage: false,
};

export default Publication;
