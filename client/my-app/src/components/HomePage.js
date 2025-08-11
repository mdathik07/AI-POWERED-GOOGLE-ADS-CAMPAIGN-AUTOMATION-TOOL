import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../config/api";
import "../HomePage.css";

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const sessionId = localStorage.getItem("sessionId");
    if (token && sessionId) {
      navigate("/chat");
    }
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isSignup
      ? API_ENDPOINTS.AUTH.SIGNUP
      : API_ENDPOINTS.AUTH.LOGIN;

    const payload = isSignup
      ? { username, email, password }
      : { email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (isSignup) {
          // After successful signup, switch to login mode
          setIsSignup(false);
          alert("Signup successful! Please login with your credentials.");
          // Clear the form
          setEmail("");
          setPassword("");
          setUsername("");
        } else {
          // For login, store token and create chat session
          localStorage.setItem("token", data.token);
          localStorage.setItem("sessionId", data.sessionId);
          localStorage.setItem("userId", data.userId);
          
          // Create a new chat session
          try {
            const sessionResponse = await fetch(API_ENDPOINTS.CHAT.SESSION, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data.token}`
              },
              body: JSON.stringify({
                sessionId: data.sessionId,
                userId: data.userId
              })
            });

            if (!sessionResponse.ok) {
              throw new Error("Failed to create chat session");
            }

            // Navigate to chat page only after successful session creation
            navigate("/chat");
          } catch (error) {
            console.error("Error creating chat session:", error);
            // Even if session creation fails, still navigate to chat
            // as the user is authenticated
            navigate("/chat");
          }
        }
      } else {
        alert(data.error || "Authentication failed!");
      }
    } catch (error) {
      console.error("Auth error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="ai-homepage">
      <div className="ai-card">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712100.png"
          alt="AI Logo"
          className="ai-logo"
        />
        <h1>AdNova AI</h1>
        <p className="ai-subtext">
          {isSignup
            ? "Create your account and start generating high-performing ad campaigns"
            : "Login to your AI ad assistant dashboard"}
        </p>
        <form onSubmit={handleAuth}>
          {isSignup && (
            <input
              type="text"
              placeholder="Your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p className="toggle-auth">
          {isSignup ? "Already have an account?" : "New here?"}{" "}
          <span onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Login" : "Create Account"}
          </span>
        </p>
      </div>

      <div className="ai-illustration">
        <img
          src="https://cdn.dribbble.com/users/1615584/screenshots/15701736/media/0eae1d496dd5d589151594ee51ea3ae1.png"
          alt="AI Ad Assistant"
        />
        <p className="tagline">Your Smart Partner in Ad Campaign Generation</p>
      </div>
    </div>
  );
};

export default HomePage;
