import React, { useState } from "react";
import "./App.css";
import VirtualList from "./VirtualList/VirtualList";
import { useMemo } from "react";
import { RowRendererProps } from "./VirtualList/VirtualList.types";
import { useFetchUsers } from "./hooks/useFetchUsers";

const App = () => {
  const [query, setQuery] = useState("");
  const { status, users } = useFetchUsers();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filtredUsers = useMemo(() => {
    if (query.trim() === "") {
      return users;
    }

    return users.filter((user) => {
      const name = user.name.toLowerCase();
      return name.includes(query.toLowerCase());
    });
  }, [query, users.length]);

  if (status === "loading" || status === "init") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error!</div>;
  }

  const rowRenderer = ({ style, index }: RowRendererProps) => {
    return (
      <div key={filtredUsers[index]?.id} style={style}>
        <div className="user">{filtredUsers[index]?.name}</div>
      </div>
    );
  };

  return (
    <div className="App">
      <form className="form">
        <input
          placeholder="Enter a username"
          value={query}
          onChange={handleChange}
        />
        <div className="users_list">
          <VirtualList
            rowRenderer={rowRenderer}
            itemsCount={filtredUsers?.length}
            itemHeight={100}
          />
        </div>
      </form>
    </div>
  );
};

export default App;
