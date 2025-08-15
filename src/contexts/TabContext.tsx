import { useSegments } from "expo-router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TabContextType = {
  activeParentTab: string;
  setActiveParentTab: Dispatch<SetStateAction<string>>;
  isOnUserProfile: boolean;
};

const TabContext = createContext<TabContextType>({
  activeParentTab: "index",
  setActiveParentTab: () => {},
  isOnUserProfile: false,
});

export const useTabContext = () => useContext(TabContext);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const segments = useSegments();
  const [activeParentTab, setActiveParentTab] = useState("index");

  const isOnUserProfile = segments.some((segment) => segment === "user");

  useEffect(() => {
    if (!isOnUserProfile) {
      const currentTab = segments[segments.length - 1] || "index";

      if (["index", "matches", "chats", "profile"].includes(currentTab)) {
        setActiveParentTab(currentTab);
      }
    }
  }, [segments, isOnUserProfile]);

  return (
    <TabContext.Provider
      value={{
        activeParentTab,
        setActiveParentTab,
        isOnUserProfile,
      }}
    >
      {children}
    </TabContext.Provider>
  );
};
