import { FC, createContext, useState } from "react";

import { User } from "../lib/types";

type UserState = {
  user: User | null;
  setUser?: (user: User | null) => void;

  authenticated: boolean;
  setAuthenticated?: (isAuth: boolean) => void;
};

const defaultState: UserState = {
  user: null,
  authenticated: false,
};

export const UserContext = createContext<UserState>(defaultState);

const UserProvider: FC<{}> = ({ children }) => {
  const [user, setUser] = useState(defaultState.user);
  const [authenticated, setAuthenticated] = useState(
    defaultState.authenticated
  );

  return (
    <UserContext.Provider
      value={{ user, setUser, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
