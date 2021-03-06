const responseStatus = {
  http: {
    request_not_found: {
      status: 404,
      error_message: "Request not found",
    },
    format_json: {
      status: 400,
      error_message: "Format data request must be JSON type",
    },
    validate: {
      status: 400,
      missing_field: {
        error_message: "Missing field: %s",
      },
      is_empty: {
        error_message: "Data of %s field is empty",
      },
      max_length_100: {
        error_message: "%s field can not be more than 100 characters",
      },
      max_length_255: {
        error_message: "%s field can not be more than 255 characters",
      },
      wrong_format_youtube_url: {
        error_message: "Format date for youtube url is wrong",
      },
    },
    unauthorized: {
      status: 401,
      wrong_password: {
        error_message: "Input wrong password for user: %s",
      },
      generate_token: {
        error_message: "Access Token can not generate",
      },
      not_exist_user: {
        error_message: "User name: %s not exist",
      },
      missing_access_token_header: {
        error_message: "Missing access token in header request",
      },
      not_permiss_access: {
        error_message: "No permission access this feature",
      },
    },
    internal_server: {
      status: 500,
      error_message: "Internal server error",
    },
    add_success: {
      status: 201,
    },
  },
};

export default responseStatus;
