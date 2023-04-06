//Context, Reducer, Provider, Hook

import { createContext, useContext, useReducer, ReactNode } from "react";
import { State } from "../types/State";
// import { Action } from "../types/Action";

type Action = {
  type: FormAction;
  payload: any;
};

type ContextType = {
  state: State;
  dispatch: (action: Action) => void;
};

const initialData: State = {
  currentStep: 0,
  name: "",
  level: 0,
  email: "",
  github: "",
};

type FormProviderProps = {
  children: ReactNode;
};

//Context
const FormContext = createContext<ContextType | undefined>(undefined);

//reducer
export enum FormAction {
  setCurrentStep,
  setName,
  setLevel,
  setEmail,
  setGithub,
}
const FormReducer = (state: State, action: Action) => {
  switch (action.type) {
    case FormAction.setCurrentStep:
      //pass the initial state (...state) to the action and return the state after the action
      return { ...state, currentStep: action.payload };

    case FormAction.setName:
      return { ...state, name: action.payload };

    case FormAction.setLevel:
      return { ...state, level: action.payload };

    case FormAction.setEmail:
      return { ...state, email: action.payload };

    case FormAction.setGithub:
      return { ...state, github: action.payload };

    default:
      return state;
  }
};

//Provider
export const FormProvider = ({ children }: FormProviderProps) => {
  const [state, dispatch] = useReducer(FormReducer, initialData);
  const value = { state, dispatch };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

//context Hook
export const useForm = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useForm needs to be used into a FormProvider");
  }
  return context;
};
