import firebase from "firebase/compat/app";
import { createContext } from "react";

export const AuthContext = createContext<firebase.User | null>(null);
