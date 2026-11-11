export interface ErrorModel {
    baseError: BaseError;
}
export interface BaseError {
    exceptionCategory: string;
    exceptionCode:     string;
    exceptionMessage:  string;
    exceptionDetail:   string;
    exceptionSeverity: string;
}
