"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReset = async () => {
    if (!email) {
      alert("Enter your email")
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password",
    })

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Reset link sent! Check your email.")
    }
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h2>Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleReset} style={buttonStyle}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p style={{ marginTop: "10px" }}>
          <a href="/login" style={{ color: "#38bdf8" }}>
            Back to Login
          </a>
        </p>
      </div>
    </div>
  )
}

/* styles */
const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #020617)",
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "30px",
  borderRadius: "12px",
  backdropFilter: "blur(10px)",
  width: "300px",
  textAlign: "center",
  color: "white",
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "none",
}

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#38bdf8",
  border: "none",
  borderRadius: "6px",
  fontWeight: "bold",
  cursor: "pointer",
}