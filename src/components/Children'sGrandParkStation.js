import React, { useEffect, useState } from "react";
import {
    LineIcon,
    StationBoxContainer,
    ArrivalBox,
    ArrivalText,
} from "./styles/StyledComponents";

function ChildrensGrandParkStation() {
    const station = "어린이대공원(세종대)";
    const lines = ["7"];
    const [arrivals, setArrivals] = useState([]);
    const [error, setError] = useState(null);
    const API_KEY = "7769455a5163686938395669547458"; // API 키

    useEffect(() => {
        const fetchArrivalData = async () => {
            try {
                const response = await fetch(
                    `http://swopenapi.seoul.go.kr/api/subway/${API_KEY}/json/realtimeStationArrival/1/5/${encodeURIComponent(station)}`
                );
                const data = await response.json();

                const rows = data.realtimeArrivalList;
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
        const interval = setInterval(fetchArrivalData, 30000); // 30초마다 갱신
        return () => clearInterval(interval);
    }, []);

    const isUp = (txt) => txt === "상행" || txt === "내선" || txt === "0";
    const isDown = (txt) => txt === "하행" || txt === "외선" || txt === "1";

    const renderLineBox = (line) => {
        const subwayCode = `100${line}`;
        const icon = `/images/line_${line}.png`;

        const filtered = arrivals.filter(
            (item) => item.subwayId === subwayCode
        );

        const up = filtered.find((item) => isUp(item.updnLine));
        const down = filtered.find((item) => isDown(item.updnLine));

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
                                    ⬆️ {up.trainLineNm} - {up.arvlMsg2}
                                </ArrivalText>
                            </ArrivalBox>
                        )}
                        {down && (
                            <ArrivalBox>
                                <ArrivalText>
                                    ⬇️ {down.trainLineNm} - {down.arvlMsg2}
                                </ArrivalText>
                            </ArrivalBox>
                        )}
                    </>
                )}
            </div>
        );
    };

    return (
        <StationBoxContainer>
            <h2>{station} 상세 도착 정보</h2>
            {error && <ArrivalText>{error}</ArrivalText>}
            {arrivals.length === 0 && !error && (
                <ArrivalText>도착 정보가 없습니다.</ArrivalText>
            )}
            {lines.map((line) => renderLineBox(line))}
        </StationBoxContainer>
    );
}

export default ChildrensGrandParkStation;
