// defind api types with axios 
//
// Date: 8/17/2021
// ------------------------------------------------------------------------------------------------

import { AxiosResponse } from "axios";


export type BaseApiErrorType = {
    message: string;
    code: number;
};

// all api response type on success and error   
export type BaseApiResponse<T> = AxiosResponse<T>

// success response type
export type BaseApiSuccessResponse<T> = BaseApiResponse<T> & {
    data: T;
};

// error response type
export type BaseApiErrorResponse = BaseApiResponse<null> & {
    error: BaseApiErrorType;
};





export type BaseApiPaginationResponse<T> = BaseApiResponse<{
    data: T[];
    total: number;
    meta: {
        total: number;
        page: number;
        perPage: number;
    };
}>
