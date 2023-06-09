import styled from 'styled-components'

const StarredButton = styled.button`
  color: ${props => (props.isClicked ? '#ffffff' : '#8b5cf6')};
  background-color: ${props => (props.isClicked ? '#8b5cf6' : '#ffffff')};
  border-radius: 25px;
  padding: 4px 16px;
  border: ${props => (props.isClicked ? 'none' : '1px solid #8b5cf6')};
  outline: none;
  font: 500 12px 'Verdana';
  @media screen and (width > 768px) {
    font-size: 16px;
  }
`
export default StarredButton
