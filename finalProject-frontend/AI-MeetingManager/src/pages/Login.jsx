import { useState } from "react";
import { loginUser } from "../api/authApi";

function Login({ onLogin, goToSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {

    event.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {

const result = await loginUser({
    email: email,
    password: password
});

if (result.message === "Login successful") {

     const loggedInUser = {
    name: result.name,
    email: result.email
};

      localStorage.setItem(
        "jwtToken",
       result.token
);  

    localStorage.setItem(
        "isLoggedIn",
        "true"
    );

    localStorage.setItem(
        "meetingUser",
        JSON.stringify(loggedInUser)
    );

    onLogin(loggedInUser);

} else {

    alert(result.message);
}

    } catch (error) {

      console.error("Login error:", error);

      alert(
        "Unable to connect to server. Please make sure Spring Boot is running."
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left">

        <div className="auth-brand">

          <div className="auth-logo">
            🤖
          </div>

          <div>

            <h2>AI Meeting</h2>

            <span>Task Manager</span>

          </div>

        </div>


        <div className="auth-content">

          <h1>
            Turn meetings into
            <span> action.</span>
          </h1>

          <p>
            Transform your meeting discussions into
            organized tasks using AI.
          </p>


          <div className="auth-feature">

            <div>✨</div>

            <div>

              <strong>
                AI Meeting Analysis
              </strong>

              <p>
                Extract important action items automatically.
              </p>

            </div>

          </div>


          <div className="auth-feature">

            <div>✓</div>

            <div>

              <strong>
                Smart Task Management
              </strong>

              <p>
                Manage your team's tasks in one place.
              </p>

            </div>

          </div>

        </div>

      </div>


      <div className="auth-right">

        <div className="auth-form-container">

          <div className="mobile-auth-logo">
            🤖
          </div>

          <h1>
            Welcome back
          </h1>

          <p className="auth-subtitle">
            Sign in to continue to your workspace
          </p>


          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

            </div>


            <div className="forgot-password">
              Forgot password?
            </div>


            <button
              type="submit"
              className="auth-button"
            >
              Sign In
            </button>

          </form>


          <div className="auth-divider">

            <span>OR</span>

          </div>


          <p className="signup-text">

            Don't have an account?

            <button
              onClick={goToSignup}
              className="auth-link"
            >
              Create account
            </button>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;