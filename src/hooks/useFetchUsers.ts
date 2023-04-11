import { useState, useEffect } from "react";
import { fetchUsers } from "../API";
import { User } from "../types/user.types";

type Statuses = "init" | "error" | "success" | "loading";

export const useFetchUsers = () => {
  const [status, setStatus] = useState<Statuses>("init");
  const [users, setUsers] = useState<User[]>([]);

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

  return { status, users };
};
