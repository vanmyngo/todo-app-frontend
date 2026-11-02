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
    AliasExistsException: "This email is already linked to another account.",
    CodeMismatchException: "That confirmation code is incorrect. Check it and try again.",
    ExpiredCodeException: "That confirmation code has expired. Request a new one.",
    ForbiddenException: "We couldn't verify the request. Please try again later.",
    InternalErrorException: "A service error prevented verification. Please try again later.",
    InvalidLambdaResponseException: "Verification is temporarily unavailable. Please try again later.",
    InvalidParameterException: "Some confirmation details are invalid. Check your email and code.",
    LimitExceededException: "You've reached a verification limit. Please wait before trying again.",
    NotAuthorizedException: "This account can't be confirmed with this request. Try signing in or request another code.",
    OperationNotEnabledException: "Sign-up confirmation isn't available right now. Please contact support.",
    ResourceNotFoundException: "Verification is temporarily unavailable. Please try again later.",
    TooManyFailedAttemptsException: "There have been too many incorrect attempts. Please wait before trying again.",
    TooManyRequestsException: "There have been too many requests. Please wait and try again.",
    UnexpectedLambdaException: "Verification is temporarily unavailable. Please try again later.",
    UserLambdaValidationException: "We couldn't verify the account details. Check them and try again.",
    UserNotFoundException: "We couldn't confirm that account. Check the email address or sign up again.",
    EmptyConfirmSignUpCode: "Please provide a confirmation code.",
    EmptyConfirmSignUpUsername: "Please provide an email.",
};

export const resendSignUpCodeErrorMessages: Record<string, string> = {
  CodeDeliveryFailureException: "Couldn’t send a new code. Please try again.",
  InvalidParameterException: "Check the email and try again.",
  LimitExceededException: "Too many requests. Please wait and try again.",
  TooManyRequestsException: "Too many requests. Please wait and try again.",
  UserNotFoundException: "Invalid email.",
  EmptySignUpUsername: "Please provide an email.",
};