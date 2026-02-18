"use client"

import LoginButton from "@/src/components/LoginButton"

export default function Home() {

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-100
      via-purple-100
      to-pink-100
    ">

      <div className="
        bg-white
        p-10
        rounded-xl
        shadow-xl
        text-center
        w-[400px]
      ">

        <h1 className="
          text-3xl
          font-bold
          text-gray-800
          mb-3
        ">
          Smart Bookmark App
        </h1>

        <p className="
          text-gray-500
          mb-6
        ">
          Save and manage your bookmarks securely
        </p>

        <LoginButton />

      </div>

    </div>

  )

}
