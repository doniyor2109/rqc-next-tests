import React from 'react'
import styled from 'styled-components'
import TeamHead from './TeamHead'
import TeamDescription from './TeamDescription'
import Topics from './Topics'
import Milestones from './Milestones'
import Gallery from './Gallery'
import TeamType from './TeamPropType'

const StyledPage = styled.div`
  overflow: visible;
  color: #040303;
  padding: 10rem 0 0 0;
  margin-bottom: -4px;
  @media (max-width: 415px) {
    padding: 10rem 0 7rem;
  }
`

const TeamMainComponent = ({ team, phone, tablet, lang }) => (
  <StyledPage>
    <TeamHead item={team.item} />
    <TeamDescription team={team} />
    <Topics topics={team.item.data.topics} phone={phone} tablet={tablet} />
    <Milestones
      milestones={team.item.data.milestones}
      phone={phone}
      tablet={tablet}
      lang={lang}
    />
    <Gallery
      images={team.item.data.image_gallery}
      groupname={team.item.data.groupname}
    />
  </StyledPage>
)

TeamMainComponent.propTypes = TeamType

export default TeamMainComponent
