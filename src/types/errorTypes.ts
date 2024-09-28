// src/types/errorTypes.ts
export type TErrorResponse = {
  status: number; 
  success: boolean;
  message : string
  data: {
    errorMessages?: Array<{ message: string }>; 
    [key: string]: any; 
  };
};
