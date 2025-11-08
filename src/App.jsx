import { AllRouters } from "./routes/AllRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        <AllRouters />
        <Toaster
          position="bottom-center"
          reverseOrder={false}
        />
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default App;
