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

type PostCaseSideBarFormValidityState = "valid" | "invalid" | "unknown";
type AutosaveState = "initial" | "saving" | "error" | "successful";

interface PostCaseSideBarStore {
  sideBarSectionStates: { [key: string]: PostCaseSideBarFormValidityState };
  updateSideBarSectionState: (
    title: string,
    newState: PostCaseSideBarFormValidityState
  ) => void;
  isPageValid: () => boolean;
  autosaveState: () => AutosaveState;
  formsAutosaving: string[];
  startAutosavingForm: (formName: string) => void;
  finishAutosavingForm: (formName: string, success: boolean) => void;
  formSaveStates: { [key: string]: AutosaveState };
  resetFormSaveStates: () => void;
}

export const usePostCaseSideBarStore = create<PostCaseSideBarStore>(
  (set, get) => ({
    sideBarSectionStates: {
      patient: "unknown",
      case: "unknown",
      disease: "unknown",
    },
    updateSideBarSectionState: (
      title: string,
      newState: PostCaseSideBarFormValidityState
    ) =>
      set((state) => ({
        sideBarSectionStates: {
          ...state.sideBarSectionStates,
          [title]: newState,
        },
      })),
    isPageValid: () => {
      const { sideBarSectionStates: sideBarStates } = get();
      return Object.values(sideBarStates).every((state) => state === "valid");
    },
    autosaveState: () => {
      const { formsAutosaving } = get();
      if (formsAutosaving.length > 0) {
        return "saving";
      }
      if (
        Object.values(get().formSaveStates).some((state) => state === "error")
      ) {
        return "error";
      }

      if (
        Object.values(get().formSaveStates).some(
          (state) => state === "successful"
        )
      ) {
        return "successful";
      }

      return "initial";
    },
    formsAutosaving: [],
    startAutosavingForm: (formName: string) => {
      set({
        formSaveStates: { ...get().formSaveStates, [formName]: "saving" },
      });
      set({ formsAutosaving: [...get().formsAutosaving, formName] });
    },
    finishAutosavingForm: (formName: string, success: boolean) => {
      set({
        formsAutosaving: get().formsAutosaving.filter(
          (name) => name !== formName
        ),
      });
      if (success) {
        set({
          formSaveStates: { ...get().formSaveStates, [formName]: "successful" },
        });
      } else {
        set({
          formSaveStates: { ...get().formSaveStates, [formName]: "error" },
        });
      }
    },
    formSaveStates: {},
    resetFormSaveStates: () => {
      set({ formSaveStates: {} });
      set({ formsAutosaving: [] });
    },
  })
);

export const usePostCaseSideBar = () => {
  const sideBarSectionStates = usePostCaseSideBarStore(
    (state) => state.sideBarSectionStates
  );
  const updateSideBarSectionState = usePostCaseSideBarStore(
    (state) => state.updateSideBarSectionState
  );
  const isPageValid = usePostCaseSideBarStore((state) => state.isPageValid);

  const autosaveState = usePostCaseSideBarStore((state) => state.autosaveState);
  const startAutosavingForm = usePostCaseSideBarStore(
    (state) => state.startAutosavingForm
  );
  const finishAutosavingForm = usePostCaseSideBarStore(
    (state) => state.finishAutosavingForm
  );
  const formsAutosaving = usePostCaseSideBarStore(
    (state) => state.formsAutosaving
  );
  const resetFormSaveStates = usePostCaseSideBarStore(
    (state) => state.resetFormSaveStates
  );

  return {
    sideBarSectionStates,
    updateSideBarSectionState,
    isPageValid,
    autosaveState,
    startAutosavingForm,
    finishAutosavingForm,
    formsAutosaving,
    resetFormSaveStates,
  };
};
