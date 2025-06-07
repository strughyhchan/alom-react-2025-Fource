import express from "express";
import fetch from "node-fetch";
import convert from "xml-js";

const app = express();
const port = 5000;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/api/station", async (req, res) => {
    const { stSrch } = req.query;

    if (!stSrch) {
        return res.status(400).json({ error: "검색어 (stSrch) 파라미터가 필요합니다." });
    }

    const apiKey = "7769455a5163686938395669547458"; // ✅ 실제 API 키
    const apiUrl = `http://swopenapi.seoul.go.kr/api/subway/${apiKey}/xml/realtimeStationArrival/1/5/${encodeURIComponent(stSrch)}`;

    try {
        const response = await fetch(apiUrl);
        const xml = await response.text(); // ✅ xml 그대로 받기

        // xml → json으로 변환
        const json = convert.xml2json(xml, { compact: true, spaces: 2 });
        const parsed = JSON.parse(json);

        res.json(parsed);
    } catch (error) {
        console.error("API 요청 실패:", error);
        res.status(500).json({ error: "API 호출 실패" });
    }
});

app.listen(port, () => {
    console.log(`🚀 프록시 서버가 http://localhost:${port} 에서 실행 중`);
});
