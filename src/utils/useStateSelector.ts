import { ApplicationState } from "@types";
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const useStateSelector: TypedUseSelectorHook<ApplicationState> = useSelector;
export default useStateSelector;
