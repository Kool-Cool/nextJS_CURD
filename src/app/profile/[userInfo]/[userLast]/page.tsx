// app/profile/[userName]/[userLast]/page.tsx
import { useParams } from 'next/navigation';

const UserProfile = () => {
  const { userName, userLast } = useParams(); // Extract userName and id from the URL

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page for User: <span className="p-2 ml-2 rounded bg-orange-500 text-black">{userName}</span>
        <br />
        with userLast: <span className="p-2 ml-2 rounded bg-orange-500 text-black">{userLast}</span>
      </p>
    </div>
  );
};

export default UserProfile;
