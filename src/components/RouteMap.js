// components/RouteMap.js
import React from "react";
import { MapWrapper, MapImage, BackButton } from "./styles/StyledComponents";
import { useNavigate } from "react-router-dom";

function RouteMap() {
    const navigate = useNavigate();

    return (
        <MapWrapper>
            <MapImage
                src="/images/seoul_subway_map.png"
                alt="서울 지하철 노선도"
            />
            <BackButton onClick={() => navigate("/")}>
                홈으로 돌아가기
            </BackButton>
        </MapWrapper>
    );
}

export default RouteMap;
