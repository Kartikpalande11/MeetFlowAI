import { useState } from "react";
import { registerUser } from "../api/authApi";

function Signup({ onSignup, goToLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (event) => {

    event.preventDefault();

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!name || !email || !password || !confirmPassword) {

      alert("Please fill all fields.");

      return;
    }

    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;
    }

    if (password.length < 6) {

      alert("Password must contain at least 6 characters.");

      return;
    }

    // -----------------------------
    // CREATE USER
    // -----------------------------

    const user = {
      name: name,
      email: email,
      password: password
    };

    try {

      console.log("Registering user:", user);

      // Send user to Spring Boot backend
      const result = await registerUser(user);

      console.log(
        "Registration response:",
        result
      );

      // -----------------------------
      // CHECK BACKEND RESPONSE
      // -----------------------------

      if (result === "Registration successful") {

        alert("Registration successful! Please login.");

        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        // Go to Login page
        goToLogin();

      } else {

        // Example:
        // Email already registered

        alert(result);
      }

    } catch (error) {

      console.error(
        "Registration error:",
        error
      );

      alert(
        "Registration failed. Please make sure the backend is running."
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

            <h2>
              AI Meeting
            </h2>

            <span>
              Task Manager
            </span>

          </div>

        </div>


        <div className="auth-content">

          <h1>

            Work smarter,
            <span> not harder.</span>

          </h1>


          <p>

            Let AI turn your meeting conversations
            into clear and actionable tasks.

          </p>


          <div className="auth-feature">

            <div>
              🎯
            </div>

            <div>

              <strong>
                Stay Organized
              </strong>

              <p>

                Keep every meeting action item
                in one place.

              </p>

            </div>

          </div>


          <div className="auth-feature">

            <div>
              ⚡
            </div>

            <div>

              <strong>
                Save Time
              </strong>

              <p>

                Automatically identify tasks from
                meeting discussions.

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
            Create account
          </h1>


          <p className="auth-subtitle">

            Start managing your meetings with AI

          </p>


          <form onSubmit={handleSignup}>


            <div className="form-group">

              <label>
                Full Name
              </label>


              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Email
              </label>


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

              <label>
                Password
              </label>


              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

            </div>


            <div className="form-group">

              <label>
                Confirm Password
              </label>


              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
              />

            </div>


            <button
              type="submit"
              className="auth-button"
            >

              Create Account

            </button>


          </form>


          <p className="signup-text">

            Already have an account?


            <button
              onClick={goToLogin}
              className="auth-link"
            >

              Sign in

            </button>

          </p>


        </div>

      </div>

    </div>
  );
}


export default Signup;