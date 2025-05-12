import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserResponse } from "../models/User";
import { JwtResponse } from "../models/Authentication";

/**
 * Interface defining the structure of the authentication state
 */
interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserResponse | null;
  currentTotalCartItems: number;
}

/**
 * Interface defining the actions for the authentication store
 */
interface AuthActions {
  updateJwtToken: (jwtResponse: JwtResponse) => void;
  updateUser: (value: UserResponse) => void;
  updateCurrentTotalCartItems: (value: number) => void;
  resetAuthState: () => void;
}

/**
 * Combined type for the complete auth store
 */
type AuthStore = AuthState & AuthActions;

/**
 * Auth Store created with Zustand
 * Handles authentication state and provides actions for login, logout, and profile updates
 * Persists auth state to localStorage
 */
const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      currentTotalCartItems: 0,

      updateJwtToken: (jwtResponse: JwtResponse) => {
        set({
          accessToken: jwtResponse.accessToken,
          refreshToken: jwtResponse.refreshToken,
        });
      },
      updateUser: (value) => set(() => ({ user: value })),
      updateCurrentTotalCartItems: (value) =>
        set(() => ({ currentTotalCartItems: value })),

      resetAuthState: () => {
        set(() => ({
          accessToken: null,
          refreshToken: null,
          user: null,
          currentTotalCartItems: 0,
        }));
      },
    }),
    {
      name: "auth-storage", // name of localStorage key
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        currentTotalCartItems: state.currentTotalCartItems
      }),
    }
  )
);

export default useAuthStore;
