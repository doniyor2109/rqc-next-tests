import styled from 'styled-components';

const MediaKitPage = styled.div`
  padding: 10rem 0;
  @media (max-width: 415px) {
    padding: 8rem 0 10rem 0;
  }
  .title {
    margin: 0;
  }
  section {
    margin-top: 9rem;
  }

  .img-wrap {
    height: 35rem;
    position: relative;
    @media (min-width: 416px) and (max-width: 768px) {
      height: 33rem;
    }
    @media (max-width: 415px) {
      height: 32rem;
      .photo,
      .presentation_thumbnail {
        height: 32rem;
        width: calc(100%);
      }
    }
  }
`;

export const Card = styled.div`
margin-bottom: 3rem;
color: #040303;
h1 {
  font-size: 2.2rem;
  line-height: 2.5rem;
  font-weight: bold;
  margin-top:3rem;
}
.date {
  font-size: 1.4rem;
  margin-top: 1.3rem;
  color: rgba(4,3,3,0.7)
}
p {
    font-size: 1.4rem;
    margin-top: 1.3rem;
    font-weight: bold;
    margin-top:3rem;
  }
`;

export default MediaKitPage;
