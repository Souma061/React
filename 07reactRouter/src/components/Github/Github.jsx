import { useLoaderData } from 'react-router-dom';

export default function Github() {
  const profile = useLoaderData();

  return (
    <div className="p-4 m-4">
      <p className="text-lg font-semibold">GitHub Account Details</p>
      <div>
        <ul className="mt-2 space-y-1 text-gray-700">
          <li>Followers: {profile.followers}</li>
          <li>Following: {profile.following}</li>
          <li>Public repos: {profile.public_repos}</li>
        </ul>
        <img
          src={profile.avatar_url}
          alt="GitHub Avatar"
          className="mt-4 w-32 h-32 rounded-full border"
        />
      </div>
    </div>
  );
}

export async function githubInfoLoader() {
  const res = await fetch('https://api.github.com/users/Souma061');
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  return res.json();
}
