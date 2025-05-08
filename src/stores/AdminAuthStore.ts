import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserResponse } from "../models/User";
import { JwtResponse } from "../models/Authentication";

/**
 * Interface defining the structure of the authentication state
 */
interface AdminAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserResponse | null;
}

/**
 * Interface defining the actions for the authentication store
 */
interface AdminAuthActions {
  updateJwtToken: (jwtResponse: JwtResponse) => void;
  updateUser: (value: UserResponse) => void;
  resetAuthState: () => void;
}

/**
 * Combined type for the complete auth store
 */
type AdminAuthStore = AdminAuthState & AdminAuthActions;

/**
 * Auth Store created with Zustand
 * Handles authentication state and provides actions for login, logout, and profile updates
 * Persists auth state to localStorage
 */
const useAdminAuthStore = create<AdminAuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      updateJwtToken: (jwtResponse: JwtResponse) => {
        set({
          accessToken: jwtResponse.accessToken,
          refreshToken: jwtResponse.refreshToken,
        });
      },
      updateUser: (value) => set(() => ({ user: value })),

      resetAuthState: () => {
        set(() => ({
          accessToken: null,
          refreshToken: null,
          user: null,
        }));
      },
    }),
    {
      name: "admin-auth-storage", // name of localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    }
  )
);

export default useAdminAuthStore;
