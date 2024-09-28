import { Dispatch } from "@reduxjs/toolkit";

export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T, S = unknown> = TResponse<T> & {
  signal?: AbortSignal; // Optional properties for better type alignment
  abort?: () => void;
  dispatch?: Dispatch;
  getState?: () => S; // Changed from `any` to a generic type S
};

// This TQueryParam type needs to be aligned with your API query parameters.
export type TQueryParam = {
  name: string;
  value: string | boolean | React.Key; // Adjusted to allow for strings
};
