"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function TrackScores() {
  const [userId, setUserId] = useState(null)
  const [scores, setScores] = useState([])
  const [inputScore, setInputScore] = useState("")
  const [loading, setLoading] = useState(false)

  // 🔹 Get user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) setUserId(data.user.id)
    }
    getUser()
  }, [])

  // 🔹 Fetch scores
  const fetchScores = async () => {
    if (!userId) return

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })

    setScores(data || [])
  }

  useEffect(() => {
    if (userId) fetchScores()
  }, [userId])

  // 🔹 Add score
  const addScore = async () => {
    const value = parseInt(inputScore)

    if (!value || value < 1 || value > 45) {
      alert("Score must be between 1 and 45")
      return
    }

    setLoading(true)

    const { data: existing } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: true })

    if (existing && existing.length === 5) {
      await supabase
        .from("scores")
        .delete()
        .eq("id", existing[0].id)
    }

    await supabase.from("scores").insert([
      {
        user_id: userId,
        score: value,
        date: new Date().toISOString(), // ✅ FIXED
      },
    ])

    setInputScore("")
    await fetchScores()
    setLoading(false)
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

      {/* BACKGROUND */}
      <div style={bgStyle} />
      <div style={overlayStyle} />

      <div style={container}>
        <h1 style={title}>Track Scores</h1>

        {/* INPUT */}
        <div style={card}>
          <input
            type="number"
            placeholder="Enter score (1-45)"
            value={inputScore}
            onChange={(e) => setInputScore(e.target.value)}
            style={inputStyle}
          />

          <button onClick={addScore} style={buttonStyle}>
            {loading ? "Adding..." : "Add Score"}
          </button>
        </div>

        {/* LIST */}
        <div style={card}>
          <h3 style={{ marginBottom: "15px" }}>Your Last 5 Scores</h3>

          {scores.length === 0 ? (
            <p style={{ color: "#94a3b8" }}>No scores yet</p>
          ) : (
            <ul style={list}>
              {scores.map((s) => (
                <li key={s.id} style={listItem}>
                  Score: {s.score}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

const bgStyle = {
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
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  zIndex: -1
}

const container = {
  padding: "40px",
  color: "white",
  maxWidth: "600px",
  margin: "auto"
}

const title = {
  fontSize: "32px",
  marginBottom: "30px",
  textAlign: "center"
}

const card = {
  padding: "25px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.15)",
  marginBottom: "20px"
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.1)",
  color: "white"
}

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
}

const list = {
  listStyle: "none",
  padding: 0
}

const listItem = {
  padding: "10px",
  borderBottom: "1px solid rgba(255,255,255,0.1)"
}