import React, { useEffect, useState } from "react";
import StationBox from "./components/StationBox";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [station, setStation] = useState("어린이대공원");
  const [arrivals, setArrivals] = useState([]);
  const [error, setError] = useState(null);
  const [gunjaLine, setGunjaLine] = useState("5");

  useEffect(() => {
    const fetchArrivalData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/station?stSrch=${station}`);
        const data = await response.json();

        const rows = data.realtimeStationArrival?.row;

        if (rows && Array.isArray(rows)) {
          setArrivals(rows);
        } else if (rows) {
          // 단일 객체일 경우 배열로 변환
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
  }, [station]);

  return (
    <Router>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", padding: "20px" }}>
        <Routes>
          {/* 메인 페이지 – 박스 2개 렌더링 */}
          <Route
            path="/"
            element={
              <>
                <StationBox station="어린이대공원(세종대)" lines={["7"]} />
                <StationBox station="군자(능동)" lines={["5", "7"]} />
              </>
            }
          />

          {/* (선택) 상세 페이지 라우팅 
        <Route path="/station/:name" element={<StationDetail />} /> 
        */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
