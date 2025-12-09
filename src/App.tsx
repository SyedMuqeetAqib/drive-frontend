import "./App.scss";
import Navbar from "./components/Navbar/Navbar";
import SubscriptionForm from "./components/SubscriptionForm/SubscriptionForm";

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <SubscriptionForm />
      </main>
    </>
  );
}

export default App;
