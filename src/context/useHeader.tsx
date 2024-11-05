import { createContext, useContext, useState } from "react";

interface HeaderContextProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  titleColor: string;
  setTitleColor: React.Dispatch<React.SetStateAction<string>>
  isSticky: boolean;
  setIsSticky: React.Dispatch<React.SetStateAction<boolean>>
}

export const HeaderContext = createContext<HeaderContextProps>({
  isSidebarOpen: true,
  setIsSidebarOpen: () => null,
  titleColor: '#000000',
  setTitleColor: () => null,
  isSticky: true,
  setIsSticky: () => null
});

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [titleColor, setTitleColor] = useState('#000000')
  const [isSticky, setIsSticky] = useState(true)


  return (
    <HeaderContext.Provider value={{ isSidebarOpen, setIsSidebarOpen, titleColor, setTitleColor, isSticky, setIsSticky }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => useContext(HeaderContext);
