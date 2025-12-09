import "./App.scss";
import Navbar from "./components/Navbar";
import SubscriptionForm from "./components/SubscriptionForm";

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
