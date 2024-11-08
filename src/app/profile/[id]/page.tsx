// app/profile/[id]/page.tsx
import { useParams } from 'next/navigation';

const UserProfileById = () => {
  const { id } = useParams(); // Extract id from the URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page for ID: <span className="p-2 ml-2 rounded bg-orange-500 text-black">{id}</span>
      </p>
    </div>
  );
};

export default UserProfileById;
