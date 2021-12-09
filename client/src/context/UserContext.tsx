import { FC, createContext, useState, useEffect } from "react";

type UserContextType = {
  code: string;
  saveCode?: (newCode: string) => void;
};

const defaultState: UserContextType = {
  code: "",
};

export const UserContext = createContext<UserContextType>(defaultState);

const UserProvider: FC = ({ children }) => {
  const [code, setCode] = useState<string>(defaultState.code);

  useEffect(() => {
    const storedCode = localStorage.getItem("twibot-ui/code");
    if (storedCode) {
      setCode(storedCode);
    }
  }, []);

  const saveCode = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem("twibot-ui/code", newCode);
  };

  return (
    <UserContext.Provider value={{ code, saveCode }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
