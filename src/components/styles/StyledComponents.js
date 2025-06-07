import styled from "styled-components";

export const LineIcon = styled.img`
  width: 24px;
  height: 24px;
  vertical-align: middle;
  margin-right: 8px;
`;

export const StationBoxContainer = styled.div`
  background: #f0f8ff;
  border: 2px solid #4682b4;
  border-radius: 10px;
  padding: 20px;
  margin: 16px;
  width: 360px;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.02);
  }
`;

export const ArrivalBox = styled.div`
  background: #ffffff;
  padding: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

export const ArrivalText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 0;
  font-weight: 500;
`;