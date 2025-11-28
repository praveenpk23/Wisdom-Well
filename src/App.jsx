// import { AllRouters } from "./routes/AllRoutes";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import { Toaster } from "react-hot-toast";
// function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <Header />

//       {/* Main Content */}
//       <main className="flex-1">
//         <AllRouters />
//         <Toaster
//           position="bottom-center"
//           reverseOrder={false}
//         />
//       </main>

//       {/* Footer stays at bottom */}
//       <Footer />
//     </div>
//   );
// }

// export default App;


import { AllRouters } from "./routes/AllRoutes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AIcon from "./Images/AI.png";
function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1 relative">
        <AllRouters />

        {/* ✅ Floating AI Chat Button */}
        <button
          onClick={() => navigate("/aichat")}
          className="
            fixed bottom-5 right-5 
            w-16 h-16 rounded-full
             text-primary-content
            shadow-xl hover:scale-105 active:scale-95
            transition-all flex items-center justify-center
            z-50 cursor-pointer 
          "
        >
          <img
            src={AIcon}
            alt="AI"
            className="w-16 h-16"
          />
        </button>

        <Toaster position="bottom-center" />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
