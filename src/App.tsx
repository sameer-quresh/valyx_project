import React from "react";
import "./App.css";
import useFetchData from "./hooks/useFetchData.ts";

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

const App: React.FC = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useFetchData({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <div>  
      <h1>User List</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error?.message}</p>}
      <button onClick={refetch} disabled={isRefetching}>
        {isRefetching ? "Refreshing..." : "Refetch Data"}
      </button>
      <ul>
        {data?.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <p>Made by Sameer Qureshi</p>
    </div>
   

  );
};

export default App;
