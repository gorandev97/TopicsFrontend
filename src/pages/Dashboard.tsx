import { useState } from "react";
import { Button } from "../components/Button";
import { AllTopics } from "../components/topics/AllTopics";
import { HotTopics } from "../components/topics/HotTopics";
import { MostActiveUsers } from "../components/user/MostActiveUsers";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const renderTabContent = () => {
    switch (activeTab) {
      case "allTopics":
        return <AllTopics />;
      case "hotTopics":
        return <HotTopics />;
      case "activeUsers":
        return <MostActiveUsers />;
      default:
        return <div>Select a Tab</div>;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full relative">
        <div className="flex gap-2 pt-5 pl-5">
          <Button
            title={"All topics"}
            onClick={() => setActiveTab("allTopics")}
          />
          <Button
            title={"Hot Topics"}
            onClick={() => setActiveTab("hotTopics")}
          />
          <Button
            title={"Most Active Users"}
            onClick={() => setActiveTab("activeUsers")}
          />
        </div>
      </div>

      <h2 className="flex-1 text-center text-4xl font-bold text-grey-800 my-4">
        {activeTab === "allTopics"
          ? "All topics"
          : activeTab === "hotTopics"
          ? "Hot topics"
          : "Most active users"}
      </h2>

      <div style={{ marginTop: "20px" }}>{renderTabContent()}</div>
    </div>
  );
};
