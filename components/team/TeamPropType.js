import PropTypes from 'prop-types';

const TeamType = {
  item: PropTypes.shape({
    data: PropTypes.shape({
      description: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      group_leader: PropTypes.shape({
        name: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        position: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        photo: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
      groupname: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      image_gallery: PropTypes.arrayOf(PropTypes.shape({
        labimage: PropTypes.shape({
          dimensions: PropTypes.shape({
            width: PropTypes.number,
            height: PropTypes.number,
          }),
          url: PropTypes.string,
          photo_title: PropTypes.arrayOf(PropTypes.string),
        }),
      })),
      leader_position: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      leader_quote: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      milestones: PropTypes.arrayOf(PropTypes.shape({
        date: PropTypes.string,
        milestone: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
      })),
      team_list: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
      })),
      topics: PropTypes.arrayOf(PropTypes.shape({
        research_topic: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
        topics_list: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string,
        })),
      })),
    }),
    uid: PropTypes.string,
  }),
};

export default TeamType;
