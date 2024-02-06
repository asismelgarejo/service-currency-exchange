import { ReasonPhrases } from "http-status-codes";
export class ErrorNotFound extends Error {
    constructor(message) {
        super(`${ReasonPhrases.NOT_FOUND}: ${message}`);
    }
}
export class ErrorNotAuthorized extends Error {
    constructor(message) {
        super(`${ReasonPhrases.UNAUTHORIZED}: ${message}`);
    }
}
export class ErrorBadRequest extends Error {
    constructor(message) {
        super(`${ReasonPhrases.BAD_REQUEST}: ${message}`);
    }
}
