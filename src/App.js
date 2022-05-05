import "./App.css";
import { TopBar, LogoutButton } from "./components";
import Router from "./router/Router";

function App() {
  return (
    <div className="App">
      <TopBar />
      <Router />
    </div>
  );
}

export default App;
