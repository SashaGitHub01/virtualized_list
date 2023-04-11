import { User } from "../types/user.types";

export const fetchUsers = async () => {
  const res = await fetch("db.json");
  const users = await res.json() as User[];

  return new Promise<User[]>((res) => {
    setTimeout(() => {
      res(users);
    }, 2000);
  });
};
