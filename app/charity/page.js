// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabaseClient"

// export default function Charity() {
//   const [userId, setUserId] = useState(null)
//   const [selected, setSelected] = useState(null)

//   // 🔹 Fake charity list (for demo)
//   const charities = [
//     { id: "1", name: "Save Children" },
//     { id: "2", name: "Clean Water Initiative" },
//     { id: "3", name: "Education For All" },
//   ]

//   useEffect(() => {
//     const getUser = async () => {
//       const { data } = await supabase.auth.getUser()
//       if (data.user) setUserId(data.user.id)
//     }
//     getUser()
//   }, [])

//   // 🔹 Save charity
//   const handleSelect = async (charityId) => {
//     if (!userId) return

//     await supabase
//       .from("profiles")
//       .update({ charity_id: charityId })
//       .eq("id", userId)

//     setSelected(charityId)
//     alert("Charity selected!")
//   }

//   return (
//     <div style={{ padding: "40px", color: "white" }}>
//       <h1>Select a Charity ❤️</h1>

//       <ul>
//         {charities.map((c) => (
//           <li key={c.id} style={{ marginTop: "10px" }}>
//             {c.name}

//             <button
//               onClick={() => handleSelect(c.id)}
//               style={{ marginLeft: "10px" }}
//             >
//               Select
//             </button>
//           </li>
//         ))}
//       </ul>

//       {selected && (
//         <p style={{ marginTop: "20px" }}>
//           Selected Charity ID: {selected}
//         </p>
//       )}
//     </div>
//   )
// }

"use client"

export default function Charity() {
  const charities = [
    "Save Children",
    "Clean Water Initiative",
    "Education For All"
  ]

  const handleSelect = (name) => {
    alert(`${name} selected`)
  }

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>

      {/* 🔥 BACKGROUND */}
      <div style={bg} />
      <div style={overlay} />

      <div style={container}>

        <h1 style={title}>Select a Charity ❤️</h1>

        <div style={grid}>
          {charities.map((charity, i) => (
            <div key={i} style={card}>
              <h3 style={{ marginBottom: "10px" }}>{charity}</h3>

              <button
                style={button}
                onClick={() => handleSelect(charity)}
              >
                Select
              </button>
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
  backgroundPosition: "center",
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
  textAlign: "center"
}

const title = {
  fontSize: "32px",
  marginBottom: "30px"
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  maxWidth: "800px",
  margin: "auto"
}

const card = {
  padding: "25px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.15)",
  transition: "0.3s"
}

const button = {
  marginTop: "10px",
  padding: "10px 20px",
  borderRadius: "12px",
  border: "none",
  background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer"
}