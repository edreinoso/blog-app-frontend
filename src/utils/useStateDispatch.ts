import { StateAction } from "@types";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

const useStateDispatch: () => Dispatch<StateAction> = useDispatch;
export default useStateDispatch;
