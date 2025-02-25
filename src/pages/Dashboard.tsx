import { useState } from "react";
import { Button } from "../components/Button";
import { AllTopics } from "../components/topics/AllTopics";
import { HotTopics } from "../components/topics/HotTopics";
import { MostActiveUsers } from "../components/user/MostActiveUsers";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("allTopics");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const renderTabContent = () => {
    switch (activeTab) {
      case "allTopics":
        return <AllTopics />;
      case "hotTopics":
        return <HotTopics />;
      case "activeUsers":
        return <MostActiveUsers />;
      default:
        return <AllTopics />;
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full relative mt-10 ml-3 md:justfy-between">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="block md:hidden text-gray-700"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-2">
          <Button
            title={"All Topics"}
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

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col gap-2 p-4 md:hidden z-10">
            <Button
              title={"All Topics"}
              onClick={() => {
                setActiveTab("allTopics");
                setIsMenuOpen(false);
              }}
            />
            <Button
              title={"Hot Topics"}
              onClick={() => {
                setActiveTab("hotTopics");
                setIsMenuOpen(false);
              }}
            />
            <Button
              title={"Most Active Users"}
              onClick={() => {
                setActiveTab("activeUsers");
                setIsMenuOpen(false);
              }}
            />
          </div>
        )}
      </div>

      <h2 className="flex-1 text-center text-4xl font-bold text-grey-800 mt-10 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] ">
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
