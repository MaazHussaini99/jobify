/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type UserProfileCreateFormInputValues = {
    userId?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    headline?: string;
    bio?: string;
    profilePicture?: string;
    coverPhoto?: string;
    location?: string;
    phone?: string;
    website?: string;
    linkedIn?: string;
    github?: string;
    userType?: string;
    companyName?: string;
    companySize?: string;
    industry?: string;
    hourlyRate?: number;
    preferredJobTypes?: string[];
    totalJobsCompleted?: number;
    averageRating?: number;
    totalReviews?: number;
    createdAt?: string;
    updatedAt?: string;
};
export declare type UserProfileCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    headline?: ValidationFunction<string>;
    bio?: ValidationFunction<string>;
    profilePicture?: ValidationFunction<string>;
    coverPhoto?: ValidationFunction<string>;
    location?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    website?: ValidationFunction<string>;
    linkedIn?: ValidationFunction<string>;
    github?: ValidationFunction<string>;
    userType?: ValidationFunction<string>;
    companyName?: ValidationFunction<string>;
    companySize?: ValidationFunction<string>;
    industry?: ValidationFunction<string>;
    hourlyRate?: ValidationFunction<number>;
    preferredJobTypes?: ValidationFunction<string>;
    totalJobsCompleted?: ValidationFunction<number>;
    averageRating?: ValidationFunction<number>;
    totalReviews?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
    updatedAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserProfileCreateFormOverridesProps = {
    UserProfileCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    headline?: PrimitiveOverrideProps<TextFieldProps>;
    bio?: PrimitiveOverrideProps<TextFieldProps>;
    profilePicture?: PrimitiveOverrideProps<TextFieldProps>;
    coverPhoto?: PrimitiveOverrideProps<TextFieldProps>;
    location?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    website?: PrimitiveOverrideProps<TextFieldProps>;
    linkedIn?: PrimitiveOverrideProps<TextFieldProps>;
    github?: PrimitiveOverrideProps<TextFieldProps>;
    userType?: PrimitiveOverrideProps<SelectFieldProps>;
    companyName?: PrimitiveOverrideProps<TextFieldProps>;
    companySize?: PrimitiveOverrideProps<TextFieldProps>;
    industry?: PrimitiveOverrideProps<TextFieldProps>;
    hourlyRate?: PrimitiveOverrideProps<TextFieldProps>;
    preferredJobTypes?: PrimitiveOverrideProps<SelectFieldProps>;
    totalJobsCompleted?: PrimitiveOverrideProps<TextFieldProps>;
    averageRating?: PrimitiveOverrideProps<TextFieldProps>;
    totalReviews?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    updatedAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserProfileCreateFormProps = React.PropsWithChildren<{
    overrides?: UserProfileCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: UserProfileCreateFormInputValues) => UserProfileCreateFormInputValues;
    onSuccess?: (fields: UserProfileCreateFormInputValues) => void;
    onError?: (fields: UserProfileCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserProfileCreateFormInputValues) => UserProfileCreateFormInputValues;
    onValidate?: UserProfileCreateFormValidationValues;
} & React.CSSProperties>;
export default function UserProfileCreateForm(props: UserProfileCreateFormProps): React.ReactElement;
