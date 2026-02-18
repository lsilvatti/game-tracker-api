export interface IApiError extends Error {
    statusCode: number;
    isApiError: boolean;
}

function apiError(message: string, statusCode: number): IApiError {
    const error = new Error(message) as IApiError;
   
    error.statusCode = statusCode;
    error.isApiError = true;
    error.name = 'ApiError';

    return error;
}

export default apiError;