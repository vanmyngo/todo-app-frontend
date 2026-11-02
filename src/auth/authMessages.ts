export const nextStepMessages: Record<string, string> = {
    CONFIRM_SIGN_UP: "Please confirm your account before logging in.",
    RESET_PASSWORD: "You must reset your password before logging in.",
    CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED: "You must set a new password before logging in.",
};

export const errorMessages: Record<string, string> = {
    NotAuthorizedException: "Invalid email or password.",
    UserNotFoundException: "Invalid email or password.",
};

export const confirmSignUpErrorMessages: Record<string, string> = {
    CodeMismatchException: "Incorrect code. Try again.",
    ExpiredCodeException: "Code expired. Request a new one.",
    LimitExceededException: "Limit reached. Try again later.",
    NotAuthorizedException: "Can't confirm account. Sign in or request a new code.",
    TooManyRequestsException: "Too many requests. Try again later.",
    UserNotFoundException: "Account not found. Check the email or sign up.",
    EmptyConfirmSignUpCode: "Please provide email or confirmation code.",
    EmptyConfirmSignUpUsername: "Please provide email or confirmation code.",
};

export const resendSignUpCodeErrorMessages: Record<string, string> = {
  CodeDeliveryFailureException: "Couldn’t send a new code. Please try again.",
  InvalidParameterException: "Check the email and try again.",
  LimitExceededException: "Too many requests. Please wait and try again.",
  TooManyRequestsException: "Too many requests. Please wait and try again.",
  UserNotFoundException: "Invalid email.",
  EmptySignUpUsername: "Please provide an email.",
};