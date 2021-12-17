import { FC, createContext, useState } from "react";
import { User } from "../lib/types";

type UserContextType = {
  user: User | null;
  setUser?: (user: User | null) => void;
};

const defaultState: UserContextType = {
  user: null,
};

export const UserContext = createContext<UserContextType>(defaultState);

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
