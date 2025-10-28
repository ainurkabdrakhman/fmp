import { useNavigate } from "react-router-dom";
import { useState } from "react";
import './login.css'

function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/users/login?username=${username}&password=${password}`
    );
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("userRole", data.role);
      navigate("/dashboard");
    } else {
      setError(data.error);
    }
  } catch (e) {
    setError("Server error");
  }
};


    return(
        <div className="login-container">
            <div className="login-box">
                <h2 className='welcome'>Добро пожаловать в Flantrixx</h2>
                <h3>Войдите в аккаунт чтобы продолжить</h3>
                
                <input 
                  type="text" 
                  placeholder="Имя пользователя" 
                  className="input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                /><br />

                <input 
                  type="password" 
                  placeholder="Введите пароль" 
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /><br /><br />

                {error && <p style={{color: "red"}}>{error}</p>}
                <button className="btn" onClick={handleLogin}>Войти</button>
            </div>
        </div>
    );
}

export default Login;
