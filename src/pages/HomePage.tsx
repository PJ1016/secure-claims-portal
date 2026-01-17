import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../auth/msalConfig";

const HomePage = () => {
  const { user } = useAppSelector((state) => state.users);
  const [greetMessage, setGreetMessage] = useState("");
  console.log(greetMessage);
  const { instance, accounts } = useMsal();
  const handleTestBackendApi = async () => {
    const token = await instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });
    const accessToken = token.accessToken;

    console.log("token", token);
    const response = await fetch("http://localhost:5099/api/hello", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.text();
    setGreetMessage(data);
  };

  return (
    <>
      <h1>Secure Claims Portal</h1>
      <h2>Welcome {user?.name || ""}</h2>
      <div className="card">
        <button onClick={handleTestBackendApi}>Test Backend API</button>
      </div>
      <p>{greetMessage}</p>
    </>
  );
};

export default HomePage;
