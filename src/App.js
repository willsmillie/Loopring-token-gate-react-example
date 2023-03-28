import ThemeProvider from "./theme";
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
