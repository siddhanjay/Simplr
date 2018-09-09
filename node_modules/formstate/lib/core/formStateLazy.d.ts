import { Validatable, Validator } from './types';
/** Each item in the array is a validatable */
export declare type ValidatableArray = Validatable<any>[];
/**
 * Makes it easier to work with dynamically maintained array
 */
export declare class FormStateLazy<TValue extends ValidatableArray> implements Validatable<TValue> {
    /** It is a function as fields can change over time */
    protected getFields: () => TValue;
    readonly $: TValue;
    constructor(
        /** It is a function as fields can change over time */
        getFields: () => TValue);
    validating: boolean;
    protected _validators: Validator<TValue>[];
    validators: (...validators: Validator<TValue>[]) => this;
    validate(): Promise<{
        hasError: true;
    } | {
        hasError: false;
        value: TValue;
    }>;
    enableAutoValidation: () => void;
    protected _error: string | null | undefined;
    /**
     * Does any field or form have an error
     */
    readonly hasError: boolean;
    /**
     * Does any field have an error
     */
    readonly hasFieldError: boolean;
    /**
     * Does form level validation have an error
     */
    readonly hasFormError: boolean;
    /**
     * Call it when you are `reinit`ing child fields
     */
    clearFormError(): void;
    /**
     * Error from some sub field if any
     */
    readonly fieldError: string | null | undefined;
    /**
     * Error from form if any
     */
    readonly formError: string | null | undefined;
    /**
     * The first error from any sub (if any) or form error
     */
    readonly error: string | null | undefined;
    /**
     * You should only show the form error if there are no field errors
     */
    readonly showFormError: boolean;
}
