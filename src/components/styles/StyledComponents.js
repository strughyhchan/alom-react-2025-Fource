import styled, { keyframes } from "styled-components";
export const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: url('/images/Background.png') 40% 10% / cover no-repeat fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 16px;

  @media (orientation: portrait) {
    background: url('/images/BackgroundMobile.png') center / cover no-repeat fixed;
  }

  @media (orientation: landscape) {
    background: url('/images/Background.png') 40% 10% / cover no-repeat fixed;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-40px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-40px);
    opacity: 0;
  }
`;

export const MetroIcon = styled.img`
  height: 32px;
  margin-right: 8px;
  animation: ${({ $isOpen }) => ($isOpen ? slideIn : slideOut)} 0.3s ease forwards;
  transition: opacity 0.3s;
`;
export const TitleBox = styled.div`
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px 32px;
  background-color:rgb(252, 225, 225);
  border-bottom: 2px solid #ccc;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 32px;

  h1 {
    font-size: 2.5rem;
    color: black;
    font-weight: 700;
    margin: 0;

    @media (max-width: 500px) {
      font-size: 1.8rem;
    }
  }

  img {
    height: 48px;
    @media (max-width: 500px) {
      height: 36px;
    }
  }
`;

export const LineIcon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
`;

export const StationBoxContainer = styled.div`
  background: rgb(247, 251, 255);
  border: 2px solid #4682b4;
  border-radius: 10px;
  padding: 20px;
  margin: 16px;
  width: 360px;
  cursor: pointer;
  transition: max-height 0.5s ease-in-out, transform 0.3s ease;
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? "500px" : "70px")};

  &:hover {
    transform: scale(1.02);
  }
`;

export const ArrivalBox = styled.div`
  background-color: #e6f7ff;
  border-left: 4px solid #1890ff;
  padding: 10px;
  margin: 8px 0;
  border-radius: 6px;
  
`;


export const ArrivalText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: 500;
  &:hover {
    color:rgb(55, 84, 104);
    transform: scale(1.02);
    cursor: pointer;
  }
`;


export const RouteMapLink = styled.div`
  background: rgb(247, 251, 255);
  border: 2px solid #4682b4;
  border-radius: 10px;
  padding: 20px;
  margin: 16px auto;
  width: 360px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  color: #4682b4;
  font-size: 18px;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
    background: #f0f8ff;
  }
`;

export const MapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;           // 가로 중앙 정렬
  justify-content: flex-start;   // 세로 상단 정렬
  padding: 32px 16px;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  box-sizing: border-box;
`;

export const MapImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-bottom: 24px;
`;

export const BackButton = styled.button`
  padding: 12px 20px;
  background-color: white;
  border: 2px solid #4682b4;
  color: #4682b4;
  border-radius: 8px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f8ff;
  }
`;