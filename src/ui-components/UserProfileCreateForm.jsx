/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createUserProfile } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UserProfileCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    email: "",
    firstName: "",
    lastName: "",
    headline: "",
    bio: "",
    profilePicture: "",
    coverPhoto: "",
    location: "",
    phone: "",
    website: "",
    linkedIn: "",
    github: "",
    userType: "",
    companyName: "",
    companySize: "",
    industry: "",
    hourlyRate: "",
    preferredJobTypes: [],
    totalJobsCompleted: "",
    averageRating: "",
    totalReviews: "",
    createdAt: "",
    updatedAt: "",
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [email, setEmail] = React.useState(initialValues.email);
  const [firstName, setFirstName] = React.useState(initialValues.firstName);
  const [lastName, setLastName] = React.useState(initialValues.lastName);
  const [headline, setHeadline] = React.useState(initialValues.headline);
  const [bio, setBio] = React.useState(initialValues.bio);
  const [profilePicture, setProfilePicture] = React.useState(
    initialValues.profilePicture
  );
  const [coverPhoto, setCoverPhoto] = React.useState(initialValues.coverPhoto);
  const [location, setLocation] = React.useState(initialValues.location);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [website, setWebsite] = React.useState(initialValues.website);
  const [linkedIn, setLinkedIn] = React.useState(initialValues.linkedIn);
  const [github, setGithub] = React.useState(initialValues.github);
  const [userType, setUserType] = React.useState(initialValues.userType);
  const [companyName, setCompanyName] = React.useState(
    initialValues.companyName
  );
  const [companySize, setCompanySize] = React.useState(
    initialValues.companySize
  );
  const [industry, setIndustry] = React.useState(initialValues.industry);
  const [hourlyRate, setHourlyRate] = React.useState(initialValues.hourlyRate);
  const [preferredJobTypes, setPreferredJobTypes] = React.useState(
    initialValues.preferredJobTypes
  );
  const [totalJobsCompleted, setTotalJobsCompleted] = React.useState(
    initialValues.totalJobsCompleted
  );
  const [averageRating, setAverageRating] = React.useState(
    initialValues.averageRating
  );
  const [totalReviews, setTotalReviews] = React.useState(
    initialValues.totalReviews
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUserId(initialValues.userId);
    setEmail(initialValues.email);
    setFirstName(initialValues.firstName);
    setLastName(initialValues.lastName);
    setHeadline(initialValues.headline);
    setBio(initialValues.bio);
    setProfilePicture(initialValues.profilePicture);
    setCoverPhoto(initialValues.coverPhoto);
    setLocation(initialValues.location);
    setPhone(initialValues.phone);
    setWebsite(initialValues.website);
    setLinkedIn(initialValues.linkedIn);
    setGithub(initialValues.github);
    setUserType(initialValues.userType);
    setCompanyName(initialValues.companyName);
    setCompanySize(initialValues.companySize);
    setIndustry(initialValues.industry);
    setHourlyRate(initialValues.hourlyRate);
    setPreferredJobTypes(initialValues.preferredJobTypes);
    setCurrentPreferredJobTypesValue("");
    setTotalJobsCompleted(initialValues.totalJobsCompleted);
    setAverageRating(initialValues.averageRating);
    setTotalReviews(initialValues.totalReviews);
    setCreatedAt(initialValues.createdAt);
    setUpdatedAt(initialValues.updatedAt);
    setErrors({});
  };
  const [currentPreferredJobTypesValue, setCurrentPreferredJobTypesValue] =
    React.useState("");
  const preferredJobTypesRef = React.createRef();
  const getDisplayValue = {
    preferredJobTypes: (r) => {
      const enumDisplayValueMap = {
        FULL_TIME: "Full time",
        PART_TIME: "Part time",
        CONTRACT: "Contract",
        FREELANCE: "Freelance",
        INTERNSHIP: "Internship",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    userId: [{ type: "Required" }],
    email: [{ type: "Required" }],
    firstName: [{ type: "Required" }],
    lastName: [{ type: "Required" }],
    headline: [],
    bio: [],
    profilePicture: [],
    coverPhoto: [],
    location: [],
    phone: [],
    website: [],
    linkedIn: [],
    github: [],
    userType: [{ type: "Required" }],
    companyName: [],
    companySize: [],
    industry: [],
    hourlyRate: [],
    preferredJobTypes: [],
    totalJobsCompleted: [],
    averageRating: [],
    totalReviews: [],
    createdAt: [{ type: "Required" }],
    updatedAt: [{ type: "Required" }],
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
          email,
          firstName,
          lastName,
          headline,
          bio,
          profilePicture,
          coverPhoto,
          location,
          phone,
          website,
          linkedIn,
          github,
          userType,
          companyName,
          companySize,
          industry,
          hourlyRate,
          preferredJobTypes,
          totalJobsCompleted,
          averageRating,
          totalReviews,
          createdAt,
          updatedAt,
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
            query: createUserProfile.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UserProfileCreateForm")}
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
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
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
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email: value,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="First name"
        isRequired={true}
        isReadOnly={false}
        value={firstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName: value,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.firstName ?? value;
          }
          if (errors.firstName?.hasError) {
            runValidationTasks("firstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("firstName", firstName)}
        errorMessage={errors.firstName?.errorMessage}
        hasError={errors.firstName?.hasError}
        {...getOverrideProps(overrides, "firstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={true}
        isReadOnly={false}
        value={lastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName: value,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.lastName ?? value;
          }
          if (errors.lastName?.hasError) {
            runValidationTasks("lastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("lastName", lastName)}
        errorMessage={errors.lastName?.errorMessage}
        hasError={errors.lastName?.hasError}
        {...getOverrideProps(overrides, "lastName")}
      ></TextField>
      <TextField
        label="Headline"
        isRequired={false}
        isReadOnly={false}
        value={headline}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline: value,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.headline ?? value;
          }
          if (errors.headline?.hasError) {
            runValidationTasks("headline", value);
          }
          setHeadline(value);
        }}
        onBlur={() => runValidationTasks("headline", headline)}
        errorMessage={errors.headline?.errorMessage}
        hasError={errors.headline?.hasError}
        {...getOverrideProps(overrides, "headline")}
      ></TextField>
      <TextField
        label="Bio"
        isRequired={false}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio: value,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
      ></TextField>
      <TextField
        label="Profile picture"
        isRequired={false}
        isReadOnly={false}
        value={profilePicture}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture: value,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.profilePicture ?? value;
          }
          if (errors.profilePicture?.hasError) {
            runValidationTasks("profilePicture", value);
          }
          setProfilePicture(value);
        }}
        onBlur={() => runValidationTasks("profilePicture", profilePicture)}
        errorMessage={errors.profilePicture?.errorMessage}
        hasError={errors.profilePicture?.hasError}
        {...getOverrideProps(overrides, "profilePicture")}
      ></TextField>
      <TextField
        label="Cover photo"
        isRequired={false}
        isReadOnly={false}
        value={coverPhoto}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto: value,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.coverPhoto ?? value;
          }
          if (errors.coverPhoto?.hasError) {
            runValidationTasks("coverPhoto", value);
          }
          setCoverPhoto(value);
        }}
        onBlur={() => runValidationTasks("coverPhoto", coverPhoto)}
        errorMessage={errors.coverPhoto?.errorMessage}
        hasError={errors.coverPhoto?.hasError}
        {...getOverrideProps(overrides, "coverPhoto")}
      ></TextField>
      <TextField
        label="Location"
        isRequired={false}
        isReadOnly={false}
        value={location}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location: value,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.location ?? value;
          }
          if (errors.location?.hasError) {
            runValidationTasks("location", value);
          }
          setLocation(value);
        }}
        onBlur={() => runValidationTasks("location", location)}
        errorMessage={errors.location?.errorMessage}
        hasError={errors.location?.hasError}
        {...getOverrideProps(overrides, "location")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone: value,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <TextField
        label="Website"
        isRequired={false}
        isReadOnly={false}
        value={website}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website: value,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.website ?? value;
          }
          if (errors.website?.hasError) {
            runValidationTasks("website", value);
          }
          setWebsite(value);
        }}
        onBlur={() => runValidationTasks("website", website)}
        errorMessage={errors.website?.errorMessage}
        hasError={errors.website?.hasError}
        {...getOverrideProps(overrides, "website")}
      ></TextField>
      <TextField
        label="Linked in"
        isRequired={false}
        isReadOnly={false}
        value={linkedIn}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn: value,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.linkedIn ?? value;
          }
          if (errors.linkedIn?.hasError) {
            runValidationTasks("linkedIn", value);
          }
          setLinkedIn(value);
        }}
        onBlur={() => runValidationTasks("linkedIn", linkedIn)}
        errorMessage={errors.linkedIn?.errorMessage}
        hasError={errors.linkedIn?.hasError}
        {...getOverrideProps(overrides, "linkedIn")}
      ></TextField>
      <TextField
        label="Github"
        isRequired={false}
        isReadOnly={false}
        value={github}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github: value,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.github ?? value;
          }
          if (errors.github?.hasError) {
            runValidationTasks("github", value);
          }
          setGithub(value);
        }}
        onBlur={() => runValidationTasks("github", github)}
        errorMessage={errors.github?.errorMessage}
        hasError={errors.github?.hasError}
        {...getOverrideProps(overrides, "github")}
      ></TextField>
      <SelectField
        label="User type"
        placeholder="Please select an option"
        isDisabled={false}
        value={userType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType: value,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.userType ?? value;
          }
          if (errors.userType?.hasError) {
            runValidationTasks("userType", value);
          }
          setUserType(value);
        }}
        onBlur={() => runValidationTasks("userType", userType)}
        errorMessage={errors.userType?.errorMessage}
        hasError={errors.userType?.hasError}
        {...getOverrideProps(overrides, "userType")}
      >
        <option
          children="Professional"
          value="PROFESSIONAL"
          {...getOverrideProps(overrides, "userTypeoption0")}
        ></option>
        <option
          children="Employer"
          value="EMPLOYER"
          {...getOverrideProps(overrides, "userTypeoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Company name"
        isRequired={false}
        isReadOnly={false}
        value={companyName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName: value,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.companyName ?? value;
          }
          if (errors.companyName?.hasError) {
            runValidationTasks("companyName", value);
          }
          setCompanyName(value);
        }}
        onBlur={() => runValidationTasks("companyName", companyName)}
        errorMessage={errors.companyName?.errorMessage}
        hasError={errors.companyName?.hasError}
        {...getOverrideProps(overrides, "companyName")}
      ></TextField>
      <TextField
        label="Company size"
        isRequired={false}
        isReadOnly={false}
        value={companySize}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize: value,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.companySize ?? value;
          }
          if (errors.companySize?.hasError) {
            runValidationTasks("companySize", value);
          }
          setCompanySize(value);
        }}
        onBlur={() => runValidationTasks("companySize", companySize)}
        errorMessage={errors.companySize?.errorMessage}
        hasError={errors.companySize?.hasError}
        {...getOverrideProps(overrides, "companySize")}
      ></TextField>
      <TextField
        label="Industry"
        isRequired={false}
        isReadOnly={false}
        value={industry}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry: value,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.industry ?? value;
          }
          if (errors.industry?.hasError) {
            runValidationTasks("industry", value);
          }
          setIndustry(value);
        }}
        onBlur={() => runValidationTasks("industry", industry)}
        errorMessage={errors.industry?.errorMessage}
        hasError={errors.industry?.hasError}
        {...getOverrideProps(overrides, "industry")}
      ></TextField>
      <TextField
        label="Hourly rate"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={hourlyRate}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate: value,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.hourlyRate ?? value;
          }
          if (errors.hourlyRate?.hasError) {
            runValidationTasks("hourlyRate", value);
          }
          setHourlyRate(value);
        }}
        onBlur={() => runValidationTasks("hourlyRate", hourlyRate)}
        errorMessage={errors.hourlyRate?.errorMessage}
        hasError={errors.hourlyRate?.hasError}
        {...getOverrideProps(overrides, "hourlyRate")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes: values,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            values = result?.preferredJobTypes ?? values;
          }
          setPreferredJobTypes(values);
          setCurrentPreferredJobTypesValue("");
        }}
        currentFieldValue={currentPreferredJobTypesValue}
        label={"Preferred job types"}
        items={preferredJobTypes}
        hasError={errors?.preferredJobTypes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "preferredJobTypes",
            currentPreferredJobTypesValue
          )
        }
        errorMessage={errors?.preferredJobTypes?.errorMessage}
        getBadgeText={getDisplayValue.preferredJobTypes}
        setFieldValue={setCurrentPreferredJobTypesValue}
        inputFieldRef={preferredJobTypesRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Preferred job types"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentPreferredJobTypesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.preferredJobTypes?.hasError) {
              runValidationTasks("preferredJobTypes", value);
            }
            setCurrentPreferredJobTypesValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "preferredJobTypes",
              currentPreferredJobTypesValue
            )
          }
          errorMessage={errors.preferredJobTypes?.errorMessage}
          hasError={errors.preferredJobTypes?.hasError}
          ref={preferredJobTypesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "preferredJobTypes")}
        >
          <option
            children="Full time"
            value="FULL_TIME"
            {...getOverrideProps(overrides, "preferredJobTypesoption0")}
          ></option>
          <option
            children="Part time"
            value="PART_TIME"
            {...getOverrideProps(overrides, "preferredJobTypesoption1")}
          ></option>
          <option
            children="Contract"
            value="CONTRACT"
            {...getOverrideProps(overrides, "preferredJobTypesoption2")}
          ></option>
          <option
            children="Freelance"
            value="FREELANCE"
            {...getOverrideProps(overrides, "preferredJobTypesoption3")}
          ></option>
          <option
            children="Internship"
            value="INTERNSHIP"
            {...getOverrideProps(overrides, "preferredJobTypesoption4")}
          ></option>
        </SelectField>
      </ArrayField>
      <TextField
        label="Total jobs completed"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalJobsCompleted}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted: value,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.totalJobsCompleted ?? value;
          }
          if (errors.totalJobsCompleted?.hasError) {
            runValidationTasks("totalJobsCompleted", value);
          }
          setTotalJobsCompleted(value);
        }}
        onBlur={() =>
          runValidationTasks("totalJobsCompleted", totalJobsCompleted)
        }
        errorMessage={errors.totalJobsCompleted?.errorMessage}
        hasError={errors.totalJobsCompleted?.hasError}
        {...getOverrideProps(overrides, "totalJobsCompleted")}
      ></TextField>
      <TextField
        label="Average rating"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={averageRating}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating: value,
              totalReviews,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.averageRating ?? value;
          }
          if (errors.averageRating?.hasError) {
            runValidationTasks("averageRating", value);
          }
          setAverageRating(value);
        }}
        onBlur={() => runValidationTasks("averageRating", averageRating)}
        errorMessage={errors.averageRating?.errorMessage}
        hasError={errors.averageRating?.hasError}
        {...getOverrideProps(overrides, "averageRating")}
      ></TextField>
      <TextField
        label="Total reviews"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalReviews}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews: value,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.totalReviews ?? value;
          }
          if (errors.totalReviews?.hasError) {
            runValidationTasks("totalReviews", value);
          }
          setTotalReviews(value);
        }}
        onBlur={() => runValidationTasks("totalReviews", totalReviews)}
        errorMessage={errors.totalReviews?.errorMessage}
        hasError={errors.totalReviews?.hasError}
        {...getOverrideProps(overrides, "totalReviews")}
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
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt: value,
              updatedAt,
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
      <TextField
        label="Updated at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={updatedAt && convertToLocal(new Date(updatedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              userId,
              email,
              firstName,
              lastName,
              headline,
              bio,
              profilePicture,
              coverPhoto,
              location,
              phone,
              website,
              linkedIn,
              github,
              userType,
              companyName,
              companySize,
              industry,
              hourlyRate,
              preferredJobTypes,
              totalJobsCompleted,
              averageRating,
              totalReviews,
              createdAt,
              updatedAt: value,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
