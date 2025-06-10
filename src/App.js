import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import StationBox from "./components/StationBox";
import GunjaStation from "./components/GunjaStation";
import ChildrensGrandParkStation from "./components/Children'sGrandParkStation";
import RouteMap from "./components/RouteMap";

import {
  TitleBox,
  AppContainer,
  RouteMapLink,
} from "./components/styles/StyledComponents";

function HomePage({ activeStation, setActiveStation }) {
  const navigate = useNavigate();

  return (
    <>
      <TitleBox>
        <img src="/images/sejong-logo.png" alt="세종대 로고" />
        <h1>세종 지하철</h1>
      </TitleBox>

      <StationBox
        station="어린이대공원(세종대)"
        lines={["7"]}
        activeStation={activeStation}
        setActiveStation={setActiveStation}
      />
      <StationBox
        station="군자(능동)"
        lines={["5", "7"]}
        activeStation={activeStation}
        setActiveStation={setActiveStation}
      />
      <RouteMapLink onClick={() => navigate("/routemap")}>
        🚇 서울 지하철 노선도 보기
      </RouteMapLink>
    </>
  );
}

function App() {
  const [station, setStation] = useState("어린이대공원");
  const [arrivals, setArrivals] = useState([]);
  const [error, setError] = useState(null);
  const [gunjaLine, setGunjaLine] = useState("5");
  const [activeStation, setActiveStation] = useState(null);

  useEffect(() => {
    const fetchArrivalData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/station?stSrch=${station}`
        );
        const data = await response.json();
        const rows = data.realtimeStationArrival?.row;
        if (rows && Array.isArray(rows)) {
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
  }, [station]);

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                activeStation={activeStation}
                setActiveStation={setActiveStation}
              />
            }
          />
          <Route path="/routemap" element={<RouteMap />} />
          <Route path="/station/gunja" element={<GunjaStation />} />
          <Route path="/station/childrensgp" element={<ChildrensGrandParkStation />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;
