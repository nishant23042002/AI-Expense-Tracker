import { useContext } from "react";
import { CountAnimationContext } from "../context/countAnimationContext";

export const useCountAnimation = () => useContext(CountAnimationContext);