import ThemeProvider from "./theme";
import logo from "./logo.svg";
import { Button } from "@mui/material";
import Assets from "./pages/Assets";
import "./App.css";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <Assets />
      </ThemeProvider>
    </div>
  );
}

export default App;
