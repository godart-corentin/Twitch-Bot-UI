import { FC, createContext, useState, useEffect } from "react";
import { User } from "../lib/types";

type UserContextType = {
  user: User | null;
  setUser?: (user: User | null) => void;

  authenticated: boolean;
  setAuthenticated?: (is: boolean) => void;
};

const defaultState: UserContextType = {
  user: null,
  authenticated: false,
};

export const UserContext = createContext<UserContextType>(defaultState);

const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(defaultState.user);
  const [authenticated, setAuthenticated] = useState<boolean>(
    defaultState.authenticated
  );

  useEffect(() => {
    console.log(authenticated);
  }, [authenticated]);

  return (
    <UserContext.Provider
      value={{ user, setUser, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
