// https://ant.design/docs/spec/layout
// Layout => https://ant.design/components/layout
import MainContent from "./routes/MainContent.tsx";
import { DisplayProvider } from "./context/DisplayContext";

function App() {
  return (
    <DisplayProvider>
      <MainContent />
    </DisplayProvider>
  );
}

export default App;
