

// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabaseClient"

// export default function Dashboard() {
//   const [userId, setUserId] = useState(null)
//   const [scores, setScores] = useState([])
//   const [inputScore, setInputScore] = useState("")
//   const [editId, setEditId] = useState(null)
//   const [editValue, setEditValue] = useState("")
//   const [inputDate, setInputDate] = useState("")
//   const [drawResult, setDrawResult] = useState(null)

//   // 🔹 Get logged in user
//   const getUser = async () => {
//     const { data } = await supabase.auth.getUser()

//     if (data.user) {
//       setUserId(data.user.id)
//     } else {
//       alert("Not logged in")
//     }
//   }

//   // 🔹 Fetch scores
//   const fetchScores = async () => {
//     if (!userId) return

//     const { data } = await supabase
//       .from("scores")
//       .select("*")
//       .eq("user_id", userId)
//       .order("date", { ascending: false })

//     setScores(data || [])
//   }

//   useEffect(() => {
//     getUser()
//   }, [])

//   useEffect(() => {
//     if (userId) fetchScores()
//   }, [userId])

//   // 🔹 Add score
//   const addScore = async () => {
//     if (!userId) {
//       alert("User not loaded yet")
//       return
//     }
//     if (!inputDate) {
//     alert("Select a date")
//     return
//     }
//     const selectedDate = new Date(inputDate)
// const today = new Date()

// today.setHours(0,0,0,0)
// selectedDate.setHours(0,0,0,0)

// if (selectedDate > today) {
//   alert("Future dates are not allowed")
//   return
// }

//     const newScore = parseInt(inputScore)

//     // ✅ Validation
//     if (!inputScore) {
//       alert("Enter a score")
//       return
//     }

//     if (isNaN(newScore)) {
//       alert("Invalid number")
//       return
//     }

//     if (newScore < 1 || newScore > 45) {
//       alert("Score must be between 1 and 45")
//       return
//     }

//     const { data: existingScores } = await supabase
//       .from("scores")
//       .select("*")
//       .eq("user_id", userId)
//       .order("date", { ascending: true })

//     // delete oldest if 5 exist
//     if (existingScores.length === 5) {
//       await supabase
//         .from("scores")
//         .delete()
//         .eq("id", existingScores[0].id)
//     }

//     // insert new score
//     await supabase.from("scores").insert([
//   {
//     user_id: userId,
//     score: newScore,
//     date: inputDate,
//   },
// ])
//     setInputDate("")
//     setInputScore("")
//     await fetchScores()
//   }
  

//   // 🔹 Delete score
//   const deleteScore = async (id) => {
//     await supabase
//       .from("scores")
//       .delete()
//       .eq("id", id)

//     await fetchScores()
//   }

//   const drawWinner = () => {
//   if (scores.length === 0) {
//     alert("No scores available")
//     return
//   }

//   const randomIndex = Math.floor(Math.random() * scores.length)
//   const selected = scores[randomIndex]

//   // simple match simulation
//   let matchType = ""

//   if (selected.score >= 40) matchType = "5-Match 🏆"
//   else if (selected.score >= 30) matchType = "4-Match"
//   else matchType = "3-Match"

//   setDrawResult({
//     score: selected.score,
//     type: matchType
//   })
// }

//   // 🔹 Update score
//   const updateScore = async (id) => {
//     const value = parseInt(editValue)

//     if (isNaN(value) || value < 1 || value > 45) {
//       alert("Score must be between 1 and 45")
//       return
//     }

//     await supabase
//       .from("scores")
//       .update({ score: value })
//       .eq("id", id)

//     setEditId(null)
//     setEditValue("")
//     await fetchScores()
//   }

//   return (
//   <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
    
//     <h1 style={{ marginBottom: "10px" }}>
//       Golf Score Draw System ⛳
//     </h1>

//     <p style={{ color: "gray", marginBottom: "20px" }}>
//       Enter score (1–45) and select a date
//     </p>

//     {/* INPUT SECTION */}
//     <div style={{ marginBottom: "20px" }}>
//       <input
//         type="number"
//         placeholder="Score (1-45)"
//         value={inputScore}
//         onChange={(e) => setInputScore(e.target.value)}
//         style={{ marginRight: "10px", padding: "5px" }}
//       />

//       <input
//         type="date"
//         value={inputDate}
//         max={new Date().toISOString().split("T")[0]}
//         onChange={(e) => setInputDate(e.target.value)}
//         style={{ marginRight: "10px", padding: "5px" }}
//       />

//       <button onClick={addScore} style={{ padding: "5px 10px" }}>
//         Add
//       </button>
//     </div>

//     {/* DRAW SECTION */}
//     <div style={{ marginBottom: "20px" }}>
//       <button onClick={drawWinner} style={{ padding: "6px 12px" }}>
//         Run Draw 🎯
//       </button>

//       {drawResult && (
//         <h2 style={{ marginTop: "10px", color: "lightgreen" }}>
//           Winner: {drawResult.score} ({drawResult.type})
//         </h2>
//       )}
//     </div>

//     {/* SCORES LIST */}
//     <h2>Your Scores</h2>

//     <ul style={{ listStyle: "none", padding: 0 }}>
//       {scores.map((s) => (
//         <li key={s.id} style={{ marginBottom: "12px" }}>
//           {editId === s.id ? (
//             <>
//               <input
//                 value={editValue}
//                 onChange={(e) => setEditValue(e.target.value)}
//                 style={{ marginRight: "10px" }}
//               />
//               <button onClick={() => updateScore(s.id)}>Save</button>
//             </>
//           ) : (
//             <>
//               <strong>{s.score}</strong>{" "}
//               <span style={{ color: "gray" }}>
//                 ({new Date(s.date).toLocaleDateString("en-GB")})
//               </span>

//               <button
//                 style={{ marginLeft: "10px" }}
//                 onClick={() => {
//                   setEditId(s.id)
//                   setEditValue(s.score)
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 style={{ marginLeft: "5px" }}
//                 onClick={() => deleteScore(s.id)}
//               >
//                 Delete
//               </button>
//             </>
//           )}
//         </li>
//       ))}
//     </ul>
//   </div>
// )
// }

"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Dashboard() {
  const [userId, setUserId] = useState(null)
  const [scores, setScores] = useState([])
  const [inputScore, setInputScore] = useState("")
  const [editId, setEditId] = useState(null)
  const [editValue, setEditValue] = useState("")
  const [inputDate, setInputDate] = useState("")
  const [drawResult, setDrawResult] = useState(null)

  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (data.user) setUserId(data.user.id)
  }

  const fetchScores = async () => {
    if (!userId) return

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })

    setScores(data || [])
  }

  useEffect(() => { getUser() }, [])
  useEffect(() => { if (userId) fetchScores() }, [userId])

  const addScore = async () => {
    if (!inputDate) return alert("Select a date")

    const selectedDate = new Date(inputDate)
    const today = new Date()
    today.setHours(0,0,0,0)
    selectedDate.setHours(0,0,0,0)

    if (selectedDate > today) return alert("Future date not allowed")

    const value = parseInt(inputScore)
    if (!value || value < 1 || value > 45)
      return alert("Score must be 1–45")

    const { data: existing } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: true })

    if (existing.length === 5) {
      await supabase.from("scores").delete().eq("id", existing[0].id)
    }

    await supabase.from("scores").insert([
      { user_id: userId, score: value, date: inputDate }
    ])

    setInputScore("")
    setInputDate("")
    fetchScores()
  }

  const deleteScore = async (id) => {
    await supabase.from("scores").delete().eq("id", id)
    fetchScores()
  }

  const updateScore = async (id) => {
    const value = parseInt(editValue)
    if (!value || value < 1 || value > 45)
      return alert("Score must be 1–45")

    await supabase.from("scores").update({ score: value }).eq("id", id)

    setEditId(null)
    setEditValue("")
    fetchScores()
  }

  const drawWinner = () => {
    if (!scores.length) return alert("No scores")

    const selected = scores[Math.floor(Math.random() * scores.length)]

    let type = ""
    if (selected.score >= 40) type = "5-Match 🏆"
    else if (selected.score >= 30) type = "4-Match"
    else type = "3-Match"

    setDrawResult({ score: selected.score, type })
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

      {/* 🔥 BACKGROUND */}
      <div style={bg}/>
      <div style={overlay}/>

      <div style={container}>

        <h1 style={title}>Golf Dashboard</h1>

        {/* INPUT */}
        <div style={card}>
          <input
            type="number"
            placeholder="Score (1-45)"
            value={inputScore}
            onChange={(e) => setInputScore(e.target.value)}
            style={input}
          />

          <input
            type="date"
            value={inputDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setInputDate(e.target.value)}
            style={input}
          />

          <button onClick={addScore} style={button}>
            Add Score
          </button>
        </div>

        {/* DRAW */}
        <div style={card}>
          <button onClick={drawWinner} style={button}>
            Run Monthly Draw
          </button>

          {drawResult && (
            <h2 style={{ color: "#4ade80", marginTop: "10px" }}>
              Winner: {drawResult.score} ({drawResult.type})
            </h2>
          )}
        </div>

        {/* SCORES */}
        <div style={card}>
          <h3>Your Last 5 Scores</h3>

          {scores.map((s) => (
            <div key={s.id} style={row}>
              {editId === s.id ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    style={smallInput}
                  />
                  <button onClick={() => updateScore(s.id)}>Save</button>
                </>
              ) : (
                <>
                  <span>
                    <strong>{s.score}</strong> —{" "}
                    {new Date(s.date).toLocaleDateString("en-GB")}
                  </span>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => {
                      setEditId(s.id)
                      setEditValue(s.score)
                    }}>Edit</button>

                    <button onClick={() => deleteScore(s.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

const bg = {
  position: "fixed",
  width: "100%",
  height: "100%",
  backgroundImage: "url('/green.jpg')",
  backgroundSize: "cover",
  filter: "blur(10px)",
  zIndex: -2
}

const overlay = {
  position: "fixed",
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  zIndex: -1
}

const container = {
  padding: "40px",
  color: "white",
  maxWidth: "700px",
  margin: "auto"
}

const card = {
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  padding: "20px",
  borderRadius: "15px",
  marginBottom: "20px"
}

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px"
}

const button = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  background: "#38bdf8",
  border: "none",
  cursor: "pointer"
}

const row = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "10px"
}

const smallInput = {
  width: "80px"
}

const title = {
  textAlign: "center",
  marginBottom: "20px"
}