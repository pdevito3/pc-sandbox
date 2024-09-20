// import React, { ReactNode, createContext, useContext, useState } from 'react';

// // Define the possible states for the PostCaseSideBar
// type PostCaseSideBarState = 'valid' | 'invalid' | 'unknown';

// // Define the context state structure
// interface PostCaseSideBarContextProps {
//   sideBarStates: { [key: string]: PostCaseSideBarState };
//   updateSideBarState: (title: string, newState: PostCaseSideBarState) => void;
// }

// // Create the context with an initial value of undefined
// const PostCaseSideBarContext = createContext<PostCaseSideBarContextProps | undefined>(undefined);

// // Define the provider props type
// interface PostCaseSideBarProviderProps {
//   children: ReactNode;
// }

// // Define the provider component
// export const PostCaseSideBarProvider: React.FC<PostCaseSideBarProviderProps> = ({ children }) => {
//   const [sideBarStates, setSideBarStates] = useState<{ [key: string]: PostCaseSideBarState }>({
//     patient: 'unknown',
//     case: 'unknown',
//     disease: 'unknown',
//   });

//   const updateSideBarState = (title: string, newState: PostCaseSideBarState) => {
//     setSideBarStates((prevState) => ({
//       ...prevState,
//       [title]: newState,
//     }));
//   };

//   return (
//     <PostCaseSideBarContext.Provider value={{ sideBarStates, updateSideBarState }}>
//       {children}
//     </PostCaseSideBarContext.Provider>
//   );
// };

// // Custom hook to access the PostCaseSideBar state context
// export const usePostCaseSideBar = (): PostCaseSideBarContextProps => {
//   const context = useContext(PostCaseSideBarContext);
//   if (!context) {
//     throw new Error('usePostCaseSideBar must be used within a PostCaseSideBarProvider');
//   }
//   return context;
// };

import { create } from "zustand";

type PostCaseSideBarState = "valid" | "invalid" | "unknown";

interface PostCaseSideBarStore {
  sideBarStates: { [key: string]: PostCaseSideBarState };
  updateSideBarState: (title: string, newState: PostCaseSideBarState) => void;
  isPageValid: () => boolean;
}

export const usePostCaseSideBarStore = create<PostCaseSideBarStore>(
  (set, get) => ({
    sideBarStates: {
      patient: "unknown",
      case: "unknown",
      disease: "unknown",
    },
    updateSideBarState: (title: string, newState: PostCaseSideBarState) =>
      set((state) => ({
        sideBarStates: {
          ...state.sideBarStates,
          [title]: newState,
        },
      })),
    isPageValid: () => {
      const { sideBarStates } = get();
      return Object.values(sideBarStates).every((state) => state === "valid");
    },
  })
);

export const usePostCaseSideBar = () => {
  const sideBarStates = usePostCaseSideBarStore((state) => state.sideBarStates);
  const updateSideBarState = usePostCaseSideBarStore(
    (state) => state.updateSideBarState
  );
  const isPageValid = usePostCaseSideBarStore((state) => state.isPageValid);

  return { sideBarStates, updateSideBarState, isPageValid };
};
