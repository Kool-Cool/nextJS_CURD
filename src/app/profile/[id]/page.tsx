// src/app/profile/[id]/page.tsx

'use client'  // Make this a client-side component if you use `useRouter`

import { useRouter } from 'next/navigation';  // Correct for client-side navigation

export default function UserProfile({ params }: { params: { id: string } }) {
  const router = useRouter();  // useRouter for navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className="p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id} {/* Directly accessing params */}
        </span>
      </p>
      <button onClick={() => router.push('/home')}>Go to Home</button> {/* Example of navigation */}
    </div>
  );
}
