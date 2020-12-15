import { useState, useEffect } from "react";
import axios from "axios";
import CampaignCard from "../Components/CampaignCard";

function MainPage() {
  const [campaignData, setCampaignData] = useState([]);

  // gets all the data from the server
  const fetchData = async () => {
    const { data: dataFromServer } = await axios.get(`/api/campaign`);
    setCampaignData(dataFromServer);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "6%",
        gap: 10,
      }}
    >
      <h1>Welcome to My Campaign Manager</h1>
      {Array.isArray(campaignData) && campaignData.length > 0 ? (
        campaignData.map((element) => {
          return (
            <CampaignCard
              key={element.id}
              data={element}
              fetchData={fetchData}
            />
          );
        })
      ) : (
        <div>
          <h2>No campaigns found</h2>
        </div>
      )}
    </div>
  );
}

export default MainPage;
