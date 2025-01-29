import Router from "./components/Router";
import { Toaster } from "sonner";

function App() {
  return (
    // <div className='flex items-center justify-center min-h-screen bg-gray-100 text-white '>
    <div className="relative h-screen overflow-y-scroll rounded-lg bg-black text-white shadow-lg">
      <Toaster position="top-center" />
      <Router />
    </div>
    // </div>
  );
}

export default App;
