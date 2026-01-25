/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getNotification } from "../graphql/queries";
import { updateNotification } from "../graphql/mutations";
const client = generateClient();
export default function NotificationUpdateForm(props) {
  const {
    id: idProp,
    notification: notificationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userId: "",
    type: "",
    title: "",
    message: "",
    relatedJobId: "",
    relatedUserId: "",
    relatedApplicationId: "",
    relatedMessageId: "",
    isRead: false,
    readAt: "",
    actionUrl: "",
    createdAt: "",
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [type, setType] = React.useState(initialValues.type);
  const [title, setTitle] = React.useState(initialValues.title);
  const [message, setMessage] = React.useState(initialValues.message);
  const [relatedJobId, setRelatedJobId] = React.useState(
    initialValues.relatedJobId
  );
  const [relatedUserId, setRelatedUserId] = React.useState(
    initialValues.relatedUserId
  );
  const [relatedApplicationId, setRelatedApplicationId] = React.useState(
    initialValues.relatedApplicationId
  );
  const [relatedMessageId, setRelatedMessageId] = React.useState(
    initialValues.relatedMessageId
  );
  const [isRead, setIsRead] = React.useState(initialValues.isRead);
  const [readAt, setReadAt] = React.useState(initialValues.readAt);
  const [actionUrl, setActionUrl] = React.useState(initialValues.actionUrl);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = notificationRecord
      ? { ...initialValues, ...notificationRecord }
      : initialValues;
    setUserId(cleanValues.userId);
    setType(cleanValues.type);
    setTitle(cleanValues.title);
    setMessage(cleanValues.message);
    setRelatedJobId(cleanValues.relatedJobId);
    setRelatedUserId(cleanValues.relatedUserId);
    setRelatedApplicationId(cleanValues.relatedApplicationId);
    setRelatedMessageId(cleanValues.relatedMessageId);
    setIsRead(cleanValues.isRead);
    setReadAt(cleanValues.readAt);
    setActionUrl(cleanValues.actionUrl);
    setCreatedAt(cleanValues.createdAt);
    setErrors({});
  };
  const [notificationRecord, setNotificationRecord] = React.useState(
    notificationModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getNotification.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getNotification
        : notificationModelProp;
      setNotificationRecord(record);
    };
    queryData();
  }, [idProp, notificationModelProp]);
  React.useEffect(resetStateValues, [notificationRecord]);
  const validations = {
    userId: [{ type: "Required" }],
    type: [{ type: "Required" }],
    title: [{ type: "Required" }],
    message: [{ type: "Required" }],
    relatedJobId: [],
    relatedUserId: [],
    relatedApplicationId: [],
    relatedMessageId: [],
    isRead: [],
    readAt: [],
    actionUrl: [],
    createdAt: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          userId,
          type,
          title,
          message,
          relatedJobId: relatedJobId ?? null,
          relatedUserId: relatedUserId ?? null,
          relatedApplicationId: relatedApplicationId ?? null,
          relatedMessageId: relatedMessageId ?? null,
          isRead: isRead ?? null,
          readAt: readAt ?? null,
          actionUrl: actionUrl ?? null,
          createdAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateNotification.replaceAll("__typename", ""),
            variables: {
              input: {
                id: notificationRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "NotificationUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={true}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              type,
              title,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <SelectField
        label="Type"
        placeholder="Please select an option"
        isDisabled={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              type: value,
              title,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      >
        <option
          children="New application"
          value="NEW_APPLICATION"
          {...getOverrideProps(overrides, "typeoption0")}
        ></option>
        <option
          children="Application status"
          value="APPLICATION_STATUS"
          {...getOverrideProps(overrides, "typeoption1")}
        ></option>
        <option
          children="New message"
          value="NEW_MESSAGE"
          {...getOverrideProps(overrides, "typeoption2")}
        ></option>
        <option
          children="New review"
          value="NEW_REVIEW"
          {...getOverrideProps(overrides, "typeoption3")}
        ></option>
        <option
          children="Job match"
          value="JOB_MATCH"
          {...getOverrideProps(overrides, "typeoption4")}
        ></option>
        <option
          children="Profile view"
          value="PROFILE_VIEW"
          {...getOverrideProps(overrides, "typeoption5")}
        ></option>
        <option
          children="System"
          value="SYSTEM"
          {...getOverrideProps(overrides, "typeoption6")}
        ></option>
      </SelectField>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title: value,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Message"
        isRequired={true}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message: value,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Related job id"
        isRequired={false}
        isReadOnly={false}
        value={relatedJobId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message,
              relatedJobId: value,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.relatedJobId ?? value;
          }
          if (errors.relatedJobId?.hasError) {
            runValidationTasks("relatedJobId", value);
          }
          setRelatedJobId(value);
        }}
        onBlur={() => runValidationTasks("relatedJobId", relatedJobId)}
        errorMessage={errors.relatedJobId?.errorMessage}
        hasError={errors.relatedJobId?.hasError}
        {...getOverrideProps(overrides, "relatedJobId")}
      ></TextField>
      <TextField
        label="Related user id"
        isRequired={false}
        isReadOnly={false}
        value={relatedUserId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message,
              relatedJobId,
              relatedUserId: value,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.relatedUserId ?? value;
          }
          if (errors.relatedUserId?.hasError) {
            runValidationTasks("relatedUserId", value);
          }
          setRelatedUserId(value);
        }}
        onBlur={() => runValidationTasks("relatedUserId", relatedUserId)}
        errorMessage={errors.relatedUserId?.errorMessage}
        hasError={errors.relatedUserId?.hasError}
        {...getOverrideProps(overrides, "relatedUserId")}
      ></TextField>
      <TextField
        label="Related application id"
        isRequired={false}
        isReadOnly={false}
        value={relatedApplicationId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId: value,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.relatedApplicationId ?? value;
          }
          if (errors.relatedApplicationId?.hasError) {
            runValidationTasks("relatedApplicationId", value);
          }
          setRelatedApplicationId(value);
        }}
        onBlur={() =>
          runValidationTasks("relatedApplicationId", relatedApplicationId)
        }
        errorMessage={errors.relatedApplicationId?.errorMessage}
        hasError={errors.relatedApplicationId?.hasError}
        {...getOverrideProps(overrides, "relatedApplicationId")}
      ></TextField>
      <TextField
        label="Related message id"
        isRequired={false}
        isReadOnly={false}
        value={relatedMessageId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId: value,
              isRead,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.relatedMessageId ?? value;
          }
          if (errors.relatedMessageId?.hasError) {
            runValidationTasks("relatedMessageId", value);
          }
          setRelatedMessageId(value);
        }}
        onBlur={() => runValidationTasks("relatedMessageId", relatedMessageId)}
        errorMessage={errors.relatedMessageId?.errorMessage}
        hasError={errors.relatedMessageId?.hasError}
        {...getOverrideProps(overrides, "relatedMessageId")}
      ></TextField>
      <SwitchField
        label="Is read"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isRead}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead: value,
              readAt,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.isRead ?? value;
          }
          if (errors.isRead?.hasError) {
            runValidationTasks("isRead", value);
          }
          setIsRead(value);
        }}
        onBlur={() => runValidationTasks("isRead", isRead)}
        errorMessage={errors.isRead?.errorMessage}
        hasError={errors.isRead?.hasError}
        {...getOverrideProps(overrides, "isRead")}
      ></SwitchField>
      <TextField
        label="Read at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={readAt && convertToLocal(new Date(readAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt: value,
              actionUrl,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.readAt ?? value;
          }
          if (errors.readAt?.hasError) {
            runValidationTasks("readAt", value);
          }
          setReadAt(value);
        }}
        onBlur={() => runValidationTasks("readAt", readAt)}
        errorMessage={errors.readAt?.errorMessage}
        hasError={errors.readAt?.hasError}
        {...getOverrideProps(overrides, "readAt")}
      ></TextField>
      <TextField
        label="Action url"
        isRequired={false}
        isReadOnly={false}
        value={actionUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl: value,
              createdAt,
            };
            const result = onChange(modelFields);
            value = result?.actionUrl ?? value;
          }
          if (errors.actionUrl?.hasError) {
            runValidationTasks("actionUrl", value);
          }
          setActionUrl(value);
        }}
        onBlur={() => runValidationTasks("actionUrl", actionUrl)}
        errorMessage={errors.actionUrl?.errorMessage}
        hasError={errors.actionUrl?.hasError}
        {...getOverrideProps(overrides, "actionUrl")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              userId,
              type,
              title,
              message,
              relatedJobId,
              relatedUserId,
              relatedApplicationId,
              relatedMessageId,
              isRead,
              readAt,
              actionUrl,
              createdAt: value,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || notificationModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || notificationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
