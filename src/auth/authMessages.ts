export const nextStepMessages: Record<string, string> = {
    CONFIRM_SIGN_UP: "Please confirm your account before logging in.",
    CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE: "Complete the required sign-in challenge.",
    CONTINUE_SIGN_IN_WITH_MFA_SELECTION: "Select a multi-factor authentication method.",
    CONFIRM_SIGN_IN_WITH_SMS_CODE: "Enter the verification code sent to your phone.",
    CONFIRM_SIGN_IN_WITH_TOTP_CODE: "Enter the code from your authenticator app.",
    CONTINUE_SIGN_IN_WITH_TOTP_SETUP: "Set up an authenticator app to continue.",
    CONTINUE_SIGN_IN_WITH_EMAIL_SETUP: "Set up email authentication to continue.",
    RESET_PASSWORD: "You must reset your password before logging in.",
    CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED: "You must set a new password before logging in.",
};

export const errorMessages: Record<string, string> = {
    NotAuthorizedException: "Invalid email or password.",
};
