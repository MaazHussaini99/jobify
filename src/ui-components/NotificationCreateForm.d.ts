/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type NotificationCreateFormInputValues = {
    userId?: string;
    type?: string;
    title?: string;
    message?: string;
    relatedJobId?: string;
    relatedUserId?: string;
    relatedApplicationId?: string;
    relatedMessageId?: string;
    isRead?: boolean;
    readAt?: string;
    actionUrl?: string;
    createdAt?: string;
};
export declare type NotificationCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    title?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    relatedJobId?: ValidationFunction<string>;
    relatedUserId?: ValidationFunction<string>;
    relatedApplicationId?: ValidationFunction<string>;
    relatedMessageId?: ValidationFunction<string>;
    isRead?: ValidationFunction<boolean>;
    readAt?: ValidationFunction<string>;
    actionUrl?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type NotificationCreateFormOverridesProps = {
    NotificationCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    relatedJobId?: PrimitiveOverrideProps<TextFieldProps>;
    relatedUserId?: PrimitiveOverrideProps<TextFieldProps>;
    relatedApplicationId?: PrimitiveOverrideProps<TextFieldProps>;
    relatedMessageId?: PrimitiveOverrideProps<TextFieldProps>;
    isRead?: PrimitiveOverrideProps<SwitchFieldProps>;
    readAt?: PrimitiveOverrideProps<TextFieldProps>;
    actionUrl?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type NotificationCreateFormProps = React.PropsWithChildren<{
    overrides?: NotificationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: NotificationCreateFormInputValues) => NotificationCreateFormInputValues;
    onSuccess?: (fields: NotificationCreateFormInputValues) => void;
    onError?: (fields: NotificationCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: NotificationCreateFormInputValues) => NotificationCreateFormInputValues;
    onValidate?: NotificationCreateFormValidationValues;
} & React.CSSProperties>;
export default function NotificationCreateForm(props: NotificationCreateFormProps): React.ReactElement;
