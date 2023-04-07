export const fetchUsers = async () => {
  const res = await fetch("db.json");
  const users = await res.json();

  return new Promise((res) => {
    setTimeout(() => {
      res(users);
    }, 2000);
  });
};
