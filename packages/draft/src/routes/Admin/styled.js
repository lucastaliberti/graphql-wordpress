import { css } from 'emotion';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

export const PageWrapper = styled.div`
  background: ${p => p.theme.colors.white};
  margin: 0 auto;
  min-height: calc(100vh - ${p => p.theme.padding * 2}px);
  padding: ${p => p.theme.padding}px;
`;

export const Header = styled.header`
  padding: ${p => p.theme.padding}px 0;
`;

export const Title = styled.h1`
  display: block;
  font-family: ${p => p.theme.fonts.futura};
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 0.3px;
  line-height: 1.3;

  a {
    color: ${p => p.theme.colors.black};
    text-decoration: none;
  }
`;

export const Heading = styled.h1`
  display: inline-block;
  font-family: ${p => p.theme.fonts.futura};
  font-size: 23px;
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 1.3;
  margin: 0 9px 0 0;
  padding: 9px 0 4px 0;
`;

export const HeaderAdd = styled(Link)`
  background: ${p => p.theme.colors.detail};
  border: 1px solid ${p => p.theme.colors.background};
  border-radius: 2px;
  color: ${p => p.theme.colors.pink};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  line-height: normal;
  outline: 0;
  padding: 4px 8px;
  position: relative;
  text-decoration: none;
  text-shadow: none;
  top: -3px;
`;

export const Flex = styled.section``;

export const Content = styled.section`
  height: 100%;
  margin-left: 160px;
  padding: 0 20px 65px;
`;

export const foldedNavClass = css`
  margin-left: 36px;
`;

export const Button = styled.button`
  appearance: none;
  background: ${p => p.theme.colors.detail};
  cursor: pointer;
  display: block;
  padding: 4px 10px;
  font-size: 15px;
`;

export const RowActions = styled.nav`
  color: ${p => p.theme.colors.subnav.details};
  font-size: 13px;

  a {
    text-decoration: none;
  }
`;

export const Filters = styled.section`
  overflow: hidden;
`;

export const Pagination = styled.nav`
  float: right;
  font-size: 13px;
  margin: 0 3px;
  user-select: none;

  strong {
    display: inline-block;
    font-weight: 400;
    margin: 0 3px;
    min-width: 65px;
    text-align: center;
    user-select: none;
  }

  span,
  a {
    display: inline-block;
    font-size: 16px;
    font-weight: 400;
    height: 16px;
    line-height: 1;
    margin: 0 2px;
    min-width: 17px;
    padding: 3px 5px 7px;
    text-align: center;
    user-select: none;
  }

  span {
    border: 1px solid #ddd;
    background: #f7f7f7;
    color: #a0a5aa;
  }

  a {
    border: 1px solid #ccc;
    background: #e5e5e5;
    text-decoration: none;
  }
`;

export const SearchBox = styled.div`
  float: right;
`;
