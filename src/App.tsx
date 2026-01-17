import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { loginRequest } from "./auth/msalConfig";
import HomePage from "./pages/HomePage";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { login, logout } from "./store/slices/userSlice";
import "./App.css";

function App() {
  const { accounts } = useMsal();
  const dispatch = useAppDispatch();

  // Sync MSAL authentication state with Redux store globally
  useEffect(() => {
    if (accounts.length > 0) {
      // User is authenticated, store user info in Redux
      dispatch(login(accounts[0]));
    } else {
      // User is not authenticated
      dispatch(logout());
    }
  }, [accounts, dispatch]);

  return (
    <Router>
      <MsalAuthenticationTemplate
        authenticationRequest={loginRequest}
        interactionType={InteractionType.Redirect}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Add more routes here as needed */}
        </Routes>
      </MsalAuthenticationTemplate>
    </Router>
  );
}

export default App;
