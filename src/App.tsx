import { lazy, Suspense } from "react";
import "./index.scss";
import Icon from "./utils/icon";

//router
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn"

//pages
const Home = lazy(() => import("./pages/Home"));
// const ProtectedLayout = lazy(() => import("./components/ProtectedLayout"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon src="loader" />
          </div>
        }
      >
        <Routes>
          <Route path="/*" element={<SignUp />} />
          <Route path="Home" element={<Home />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </Suspense>
      {/* Toast */}
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
