import React from "react";

const Albums = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // Adding cache: 'no-store' to fetch options to disable caching for this request
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch albums");
  }
  const albums = await response.json();
  console.log("Albums:", albums);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {albums.map((album: { id: number; title: string; userId: string }) => (
        <div key={album.id} className="border p-4 m-2 rounded shadow">
          <h2 className="text-xl font-bold mb-2">{album.title}</h2>
          <p className="text-gray-600">Album ID: {album.id}</p>
          <p className="text-gray-600">User ID: {album.userId}</p>
        </div>
      ))}
    </div>
  );
};

export default Albums;
