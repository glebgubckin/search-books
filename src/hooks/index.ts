import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/stores";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useSearchQuery = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get("search") ?? "";
};
