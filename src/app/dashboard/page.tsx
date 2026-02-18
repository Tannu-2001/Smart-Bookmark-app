"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/src/lib/supabaseClient"
import AddBookmark from "@/src/components/AddBookmark"

export default function Dashboard() {

  const [user, setUser] = useState<any>(null)
  const [bookmarks, setBookmarks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUser()
  }, [])

  async function getUser() {

    const { data } = await supabase.auth.getUser()

    if (data.user) {
      setUser(data.user)
      fetchBookmarks(data.user.id)
    }

    setLoading(false)
  }

  async function fetchBookmarks(userId: string) {

    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }

  async function logout() {

    await supabase.auth.signOut()
    window.location.href = "/"

  }

  async function deleteBookmark(id: string) {

    await supabase
      .from("bookmarks")
      .delete()
      .eq("id", id)

    setBookmarks(prev => prev.filter(b => b.id !== id))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-xl bg-gradient-to-br from-blue-500 to-purple-600">
        Loading...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex justify-center items-start pt-16 px-4">

      <div className="w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl rounded-xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Dashboard
            </h1>

            <p className="text-gray-600 text-sm">
              {user.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
          >
            Logout
          </button>

        </div>


        {/* Add Bookmark */}
        <div className="mb-6">
          <AddBookmark
            user={user}
            onBookmarkAdded={() => fetchBookmarks(user.id)}
          />
        </div>


        {/* Bookmark List */}
        <h2 className="text-lg font-semibold mb-3 text-gray-700">
          Your Bookmarks
        </h2>

        {bookmarks.length === 0 && (

          <p className="text-gray-500">
            No bookmarks yet
          </p>

        )}

        <div className="space-y-3">

          {bookmarks.map((bookmark) => (

            <div
              key={bookmark.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition flex justify-between items-center"
            >

              <div>
                <p className="font-semibold text-gray-800">
                  {bookmark.title}
                </p>

                <a
                  href={bookmark.url}
                  target="_blank"
                  className="text-blue-500 text-sm hover:underline"
                >
                  {bookmark.url}
                </a>
              </div>

              <button
                onClick={() => deleteBookmark(bookmark.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:scale-105 transition"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}
