import React, { createContext, useState } from 'react';

interface TabStateContextInterface {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}

export const TabContext = createContext<TabStateContextInterface>({
  tab: '/',
  setTab: () => undefined
});

const TabContextProvider = TabContext.Provider;
export const TabContextConsumer = TabContext.Consumer;

const AppTabContext = (props: { children: React.ReactNode }) => {
  const [tab, setTab] = useState<string>('/');

  return (
    <TabContextProvider
      value={{
        tab,
        setTab
      }}>
      {props.children}
    </TabContextProvider>
  );
};

export default AppTabContext;
