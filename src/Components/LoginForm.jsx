import React from "react";

const LoginForm = ({ email, setEmail, password, setPassword, handleLoginClick, handleRegisterClick, error}) => {
  return (
    <div className="container_left">
      <div>
        <h2 className="custom-heading">
            <span>
                To-Do List
            </span>
        </h2>
      </div>
      <div>
        <form>

          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
          
          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
        </form>
      </div>
      <div>
        <div>
          <button className="button" onClick={handleLoginClick}>
            <span>Login</span>
          </button>
        </div>
        <div>
          <button className="button"onClick={handleRegisterClick}>
            <span>Register</span>
          </button>
        </div>
      </div>
      <div className="items-center">
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
