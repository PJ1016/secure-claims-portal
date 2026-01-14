import { useEffect, useState } from "react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "./auth/msalConfig";
import "./App.css";
import { InteractionType } from "@azure/msal-browser";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { login, logout } from "./store/slices/userSlice";

function App() {
  const [count, setCount] = useState(0);
  const { accounts } = useMsal();
  console.log(accounts);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);

  // Sync MSAL authentication state with Redux store
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
    <MsalAuthenticationTemplate
      authenticationRequest={loginRequest}
      interactionType={InteractionType.Redirect}
    >
      <h1>Secure Claims Portal</h1>
      <h2>Welcome {user?.name || ""}</h2>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </MsalAuthenticationTemplate>
  );
}

export default App;
