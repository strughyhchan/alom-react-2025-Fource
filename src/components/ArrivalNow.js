import React, { useEffect, useState } from 'react';

export const ArrivalNow = () => {
  const [arrivals, setArrivals] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const stationName = '어린이대공원(세종대)';
  const encodedName = encodeURIComponent(stationName);

  useEffect(() => {
    const fetchArrivalInfo = async () => {
      try {
        const response = await fetch(
          `http://swopenAPI.seoul.go.kr/api/subway/${API_KEY}/json/realtimeStationArrival/0/10/${encodedName}/`,
        );
        const data = await response.json();
        if (data.realtimeArrivalList) {
          setArrivals(data.realtimeArrivalList);
        } else {
          console.error('API 오류:', data);
        }
      } catch (error) {
        console.error('불러오기 실패:', error);
      }
    };

    fetchArrivalInfo();
    const interval = setInterval(fetchArrivalInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {arrivals.length > 0 ? (
        <ul>
          {arrivals.map((item, index) => (
            <li key={index}>
              <strong>{item.trainLineNm}</strong> - {item.arvlMsg2}
            </li>
          ))}
        </ul>
      ) : (
        <p>도착 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
}