// src/hooks/useAuth.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { HOMEPAGE, LOGIN_PATH } from "../constants";
import useAuthStore from "../stores/AuthStore";
import instance from "../config/axios";
import { isEmpty } from "lodash";
import { LoginRequest } from "../models/Authentication";

/**
 * Custom hook for authentication operations
 * Integrates with AuthStore and uses React Query for API calls
 */
function useAuth() {
  const { updateJwtToken, user: userProfile } = useAuthStore();
  const isAuthenticated = !isEmpty(userProfile);
  const navigate = useNavigate();
  const location = useLocation();
  const [redirectPath] = useState(
    location.state?.historyLocation.pathname || HOMEPAGE
  );

  /**
   * Mutation for login with username and password
   */
  const handleLogin = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginRequest) => {
      return instance.post(LOGIN_PATH, data);
    },
  });

  /**
   * Submit login form data
   * @param data Login credentials (username and password)
   * @param onError Callback function for handling errors
   */
  const onSubmitAccountForm = (
    data: LoginRequest,
    onError: (error: any) => void
  ) => {
    // Get the intended destination from location state or default to home
    handleLogin.mutate(data, {
      onSuccess: (response) => {
        console.log("Login success:", response.data);
        updateJwtToken(response.data);
        // Navigate to the original intended destination
        navigate(redirectPath, { replace: true });
      },
      onError: (error) => onError(error),
    });
  };

  return {
    userProfile,
    isAuthenticated,
    onSubmitAccountForm,
    handleLoginPassword: handleLogin,
  };
}

export default useAuth;
