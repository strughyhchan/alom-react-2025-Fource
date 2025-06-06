import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StationBoxContainer, ArrivalBox, ArrivalText } from "./styles/StyledComponents";

function StationBox({ station }) {
    const [arrival, setArrival] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArrivalData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/station?stSrch=${station}`);
                const data = await response.json();

                const rows = data.realtimeStationArrival?.row;
                if (Array.isArray(rows) && rows.length > 0) {
                    setArrival(rows[0]); // 가장 빠른 도착 정보 1개만
                } else if (rows) {
                    setArrival(rows); // 단일 객체일 경우
                } else {
                    setArrival(null);
                }
            } catch (err) {
                console.error("도착 정보 불러오기 실패:", err);
                setError("도착 정보를 불러오는 중 오류가 발생했습니다.");
            }
        };

        fetchArrivalData();
    }, [station]);

    const handleClick = () => {
        navigate(`/station/${encodeURIComponent(station)}`); // 상세 페이지 이동
    };

    return (
        <StationBoxContainer onClick={handleClick}>
            <h2>🚇 {station}역</h2>
            {error && <ArrivalText>{error}</ArrivalText>}
            {!arrival ? (
                <ArrivalText>도착 정보를 불러오는 중...</ArrivalText>
            ) : (
                <ArrivalBox>
                    <ArrivalText>
                        [{arrival.subwayId?._text}] {arrival.trainLineNm?._text} - {arrival.arvlMsg2?._text}
                    </ArrivalText>
                </ArrivalBox>
            )}
        </StationBoxContainer>
    );
}

export default StationBox;
