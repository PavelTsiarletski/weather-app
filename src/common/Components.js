import styled from 'styled-components';

export const Header = styled.header`
  background-color: #72aaff;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  color: #fafafa;
`;

export const HeaderContent = styled.div`
  max-width: 1024px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.div`
  margin-top: 20px;
  min-height: 300px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: #fafafa;
  border-radius: 8px;
  max-width: 1024px;
  width: 100%;
`;

export const WidgetBody = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  align-items: center;
  margin: 10px 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const NorthArrow = styled.img`
  width: 40px;
  height: 40px;
  transform: rotate(${(props) => props.direction}deg);
`;


export const WidgetActions = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

export const ExtremumWidgetBody = styled.div`
  display: flex;
`;

export const ExtremumWeather = styled.div`  
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding-left: 10px;
`;
