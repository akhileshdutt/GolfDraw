
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    if (!email || !password) {
      alert("Enter email and password")
      return
    }

    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    // 🔥 CREATE PROFILE MANUALLY
    if (data.user) {
      await supabase.from("profiles").insert([
        {
          id: data.user.id,
        },
      ])
    }

    setLoading(false)
    alert("Signup successful! You can login now.")
    router.push("/login")

    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Signup successful! You can login now.")
      router.push("/login")
    }
  }

  return (
  <div style={{ position: "relative", minHeight: "100vh" }}>

    {/* 🔥 BLURRED BACKGROUND */}
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage: "url('/green.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "blur(10px)",
      zIndex: -2
    }} />

    {/* 🔥 DARK OVERLAY */}
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.4)",
      zIndex: -1
    }} />

    {/* 🔥 CONTENT */}
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      zIndex: 1
    }}>

      {/* 🔥 YOUR CARD */}
      <div style={cardStyle}>
        <h1 style={{ marginBottom: "20px" }}>Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button onClick={handleSignup} style={buttonStyle}>
          {loading ? "Creating..." : "Signup"}
        </button>

        <p style={{ marginTop: "10px", color: "#aaa" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#38bdf8" }}>
            Login
          </a>
        </p>
      </div>

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

  backgroundImage: "url('/green.jpg')", // 👈 your image
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}

const cardStyle = {
  width: "340px",
  padding: "35px",
  borderRadius: "20px",

  // 🔥 glass effect
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",

  border: "1px solid rgba(255, 255, 255, 0.15)",

  // 🔥 depth
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",

  textAlign: "center",
  color: "white",
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "10px",
  placeholderTextColor: "#cbd5f5",

  background: "rgba(255,255,255,0.1)",
  border: "1px solid rgba(255,255,255,0.2)",
  color: "white",

  outline: "none",
}

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",

  background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
  color: "white",
  fontWeight: "600",

  cursor: "pointer",
  marginTop: "10px",

  boxShadow: "0 0 20px rgba(56,189,248,0.4)"
}

