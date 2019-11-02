import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RichText } from 'prismic-reactjs';
import PrismicConfig from '../../prismic-configuration';

import H3 from '../shared/styled/H3';
import PageHeading from '../shared/PageHeading';
import Leader from './Leader';
import TeamList from './TeamList';
import LeaderQuote from './LeaderQuote';

import TeamType from './TeamPropType';

const Styled = styled.section`

    .description {
        margin-top: 8rem;
        @media (max-width: 415px) {
            margin-top: 6rem;
        }

        p {
            font-size: 1.6rem;
            line-height: 2rem;
            margin-bottom: 1rem;
            @media (max-width: 415px) {
                line-height: 2.3rem;
            }
        }
    }

`;

const TeamDescription = ({ team }, { t }) => (
  <Styled>
    <div className="container">
      <div className="columns is-multiline">
        <div className="column is-12-desktop is-12-tablet">
          <H3>
            {t('Группа')}
          </H3>
          <PageHeading title={team.item.data.groupname[0].text} />
        </div>
        <div className="column is-3-desktop is-4-tablet">
          <Leader
            leaderdata={team.item.data.group_leader.data}
            position={team.item.data.leader_position}
          />
          <TeamList
            list={team.item.data.team_list}
            name={team.item.data.groupname[0].text}
          />
        </div>
        <div className="column is-9-desktop">
          <LeaderQuote
            quote={team.item.data.leader_quote}
          />
          <div className="description">
            {RichText.render(team.item.data.description, PrismicConfig.linkResolver)}
          </div>
        </div>
      </div>
    </div>
  </Styled>
);

TeamDescription.propTypes = TeamType;

TeamDescription.contextTypes = {
  t: PropTypes.func,
};

export default TeamDescription;
