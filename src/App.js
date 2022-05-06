import "./App.css";
import { TopBar } from "./components";
import Router from "./router/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="colored"
        limit={2}
      />
      <TopBar />
      <Router />
    </div>
  );
}

export default App;
