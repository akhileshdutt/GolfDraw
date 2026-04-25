"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Draw() {
  const [userId, setUserId] = useState(null)
  const [scores, setScores] = useState([])
  // const [winner, setWinner] = useState(null)
  const [winner, setWinner] = useState(null)
const [lastDraw, setLastDraw] = useState(null)

  // 🔹 Get user
  useEffect(() => {
  if (userId) {
    fetchScores()
    fetchLastDraw()
  }
}, [userId])

  // 🔹 Fetch scores
  const fetchScores = async () => {
    if (!userId) return

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)

    setScores(data || [])
  }

  useEffect(() => {
    if (userId) fetchScores()
  }, [userId])

  // 🔹 Draw winner
  const handleDraw = async () => {
  if (scores.length < 5) {
    alert("You need 5 scores to enter draw")
    return
  }

  const randomIndex = Math.floor(Math.random() * scores.length)
  const selected = scores[randomIndex]

  let type = ""
  if (selected.score >= 40) type = "5-Match 🏆"
  else if (selected.score >= 30) type = "4-Match"
  else type = "3-Match"

  // 🔥 SAVE RESULT
  await supabase.from("draws").insert([
    {
      user_id: userId,
      score: selected.score,
      match_type: type,
    }
  ])
  const fetchLastDraw = async () => {
  const { data } = await supabase
    .from("draws")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)

  if (data && data.length > 0) {
    setLastDraw(data[0])
  }
}

  setWinner({
    score: selected.score,
    type
  })
}

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Monthly Draw 🎯</h1>

      <button onClick={handleDraw}>
        Draw Winner
      </button>

      

      {lastDraw && (
  <div style={{ marginTop: "20px" }}>
    <h3>Last Draw Result</h3>
    <p>
      Score: {lastDraw.score} <br />
      Type: {lastDraw.match_type}
    </p>
  </div>
)}

      <h3 style={{ marginTop: "30px" }}>Your Scores:</h3>

      <ul>
        {scores.map((s) => (
          <li key={s.id}>
            {s.score}
          </li>
        ))}
      </ul>
    </div>
  )
}