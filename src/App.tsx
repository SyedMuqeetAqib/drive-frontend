import "./App.scss";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";
import DeviceForm from "./components/DeviceForm/DeviceForm";

function App() {
  const [currentForm, setCurrentForm] = useState<"subscription" | "device">(
    "subscription"
  );

  const handleSubscriptionNext = () => {
    setCurrentForm("device");
  };

  const handleDeviceNext = () => {
    // Handle navigation to next form (Easy Access)
    console.log("Navigate to Easy Access form");
  };

  return (
    <>
      <Navbar />
      <main className="main-content">
        {currentForm === "subscription" ? (
          <SubscriptionForm onNext={handleSubscriptionNext} />
        ) : (
          <DeviceForm onNext={handleDeviceNext} />
        )}
      </main>
    </>
  );
}

export default App;
