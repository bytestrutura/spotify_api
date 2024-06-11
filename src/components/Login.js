import "./Login.css";
import { useEffect, useState } from "react";

function Login() {
  const CLIENT_ID = "87e99a5d3e164831a297159ca8e5ae23";
  const REDIRECT_URI = "https://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");

  /* salvar token no armazenamenro local*/
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    /* separar o hash onde houver & e  =*/
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((e) => e.startsWith("access_token"))
        .split("=")[1];

      console.log(token);

      window.location.hash = "";
      window.localStorage.setItem("token", token);
      setToken(token);
    }
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div className="box">
      <header className="navbar">
        <img className="icon" src="/icon.png" alt="icon" />
        <a href="Spotify">Spotify </a>
      </header>
      <div className="login">
        <h1>Login</h1> <br />
        {!token ? (
          <a
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Entrar com Spotify
          </a>
        ) : (
          <button onClick={logout}>Sair</button>
        )}
      </div>
    </div>
  );
}

export default Login;
