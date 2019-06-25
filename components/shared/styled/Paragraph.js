import styled from 'styled-components';

const Paragraph = styled.div`
    font-size: 1.6rem;
    line-height: 2.3rem;
    p:not(:last-child) {
        margin-bottom: 2.3rem;
    }
    a {
        color: #3998D1;
    }
    ul {
        list-style: disc;
        padding-left: 3rem;
    }
`;

export default Paragraph;
