import { AllRouters } from "./routes/AllRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <AllRouters />
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default App;
