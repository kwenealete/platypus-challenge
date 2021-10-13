import styled from 'styled-components';


const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  background: skyblue;
  transform: skew(-7deg);
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-around;
    align-items: center;
  };

  h1 {
      text-align: center;
      margin-bottom:0;
      color: blue;
      font-weight: bolder

  }

`;

export default function Header() {
  return (
    <HeaderStyles>
      <div className="bar">
        <Logo>
          <a href="/">Platypus</a>
        </Logo>
      </div>
      <h1>DISPLAYING USER PROFILES FETCHED FROM AN API </h1>      
    </HeaderStyles>
  );
}