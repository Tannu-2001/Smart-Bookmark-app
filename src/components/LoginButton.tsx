"use client"

import { supabase } from "@/src/lib/supabaseClient"

export default function LoginButton() {

  const handleLogin = async () => {

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
        queryParams: {
          prompt: "select_account",
        },
      },
    })

  }

  return (
    <button
      onClick={handleLogin}
      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow hover:scale-105 transition"
    >
      Login with Google
    </button>
  )
}
