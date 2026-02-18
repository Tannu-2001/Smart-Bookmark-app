"use client"

import { useState } from "react"
import { supabase } from "@/src/lib/supabaseClient"

export default function AddBookmark({
  user,
  onBookmarkAdded
}: {
  user: any
  onBookmarkAdded?: () => void
}) {

  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)

  async function addBookmark() {

    if (!title || !url) {
      alert("Please fill both fields")
      return
    }

    setLoading(true)

    const { error } = await supabase
      .from("bookmarks")
      .insert([
        {
          title,
          url,
          user_id: user.id
        }
      ])

    setLoading(false)

    if (error) {
      alert("Error adding bookmark")
      return
    }

    setTitle("")
    setUrl("")

    if (onBookmarkAdded) {
      onBookmarkAdded()
    }

  }

  return (

    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">

      <div className="flex flex-col md:flex-row gap-3">

        {/* Title Input */}
        <input
          type="text"
          placeholder="Bookmark Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            flex-1
            px-4 py-2
            border border-gray-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            focus:border-transparent
            transition
          "
        />


        {/* URL Input */}
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="
            flex-1
            px-4 py-2
            border border-gray-300
            rounded-lg
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
            focus:border-transparent
            transition
          "
        />


        {/* Add Button */}
        <button
          onClick={addBookmark}
          disabled={loading}
          className="
            bg-gradient-to-r
            from-blue-500
            to-purple-600
            text-white
            px-6
            py-2
            rounded-lg
            shadow
            hover:scale-105
            hover:shadow-lg
            active:scale-95
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Adding..." : "Add"}
        </button>

      </div>

    </div>

  )

}
