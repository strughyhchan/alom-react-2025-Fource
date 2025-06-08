import React, { useEffect, useState } from "react";
import {
    LineIcon,
    StationBoxContainer,
    ArrivalBox,
    ArrivalText,
} from "./styles/StyledComponents";

function GunjaStation() {
    const station = "군자(능동)";
    const lines = ["5", "7"];
    const [arrivals, setArrivals] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchArrivalData = async () => {
        try {
        const response = await fetch(`http://localhost:5000/api/station?stSrch=${station}`);
        const data = await response.json();
        const rows = data.realtimeStationArrival?.row;

        if (Array.isArray(rows)) {
            setArrivals(rows);
        } else if (rows) {
            setArrivals([rows]);
        } else {
            setArrivals([]);
        }
        } catch (err) {
        console.error("도착 정보 불러오기 실패:", err);
        setError("도착 정보를 불러오는 중 오류가 발생했습니다.");
        }
    };

    fetchArrivalData();
    }, []);

    const isUp = (txt) => txt === "상행" || txt === "내선" || txt === "0";
    const isDown = (txt) => txt === "하행" || txt === "외선" || txt === "1";

    const renderLineBox = (line) => {
    const subwayCode = `100${line}`;
    const icon = `/images/line_${line}.png`;

    const filtered = arrivals.filter(
        (item) => item.subwayId?._text === subwayCode
    );

    const up = filtered.find((item) => isUp(item.updnLine?._text));
    const down = filtered.find((item) => isDown(item.updnLine?._text));

    return (
        <div key={line} style={{ marginTop: "12px" }}>
        <h3>
            <LineIcon src={icon} alt={`${line}호선 아이콘`} />
            {line}호선
        </h3>
        {!up && !down ? (
            <ArrivalText>도착 정보 없음</ArrivalText>
        ) : (
        <>
            {up && (
                <ArrivalBox>
                <ArrivalText>
                    ⬆️ {up.trainLineNm?._text} - {up.arvlMsg2?._text}
                </ArrivalText>
                </ArrivalBox>
            )}
            {down && (
                <ArrivalBox>
                <ArrivalText>
                    ⬇️ {down.trainLineNm?._text} - {down.arvlMsg2?._text}
                </ArrivalText>
                </ArrivalBox>
            )}
            </>
        )}
        </div>
    );
    };

    return (<StationBoxContainer>
        <h2>{station} 상세 도착 정보</h2>
        {error && <ArrivalText>{error}</ArrivalText>}
        {arrivals.length === 0 && !error && (
        <ArrivalText>도착 정보가 없습니다.</ArrivalText>
        )}
        {lines.map((line) => renderLineBox(line))}
    </StationBoxContainer>
    );
}

export default GunjaStation;
