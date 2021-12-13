import { FC, createContext, useState } from "react";

type UserContextType = {
  username: string;
  setUsername?: (username: string) => void;
};

const defaultState: UserContextType = {
  username: "",
};

export const UserContext = createContext<UserContextType>(defaultState);

const UserProvider: FC = ({ children }) => {
  const [username, setUsername] = useState<string>("");

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
