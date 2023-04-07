import { useState } from "react";
import "./App.css";
import VirtualList from "./VirtualList/VirtualList";
import { useEffect } from "react";
import { fetchUsers } from "./API";
import { useMemo } from "react";

const App = () => {
  const [status, setStatus] = useState("init");
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
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
  }, [query]);

  useEffect(() => {
    setStatus("loading");

    fetchUsers()
      .then((users) => {
        setStatus("success");
        setUsers(users);
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  }, []);

  if (status === "loading" || status === "init") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error!</div>;
  }

  const rowRenderer = ({ style, index }) => {
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
