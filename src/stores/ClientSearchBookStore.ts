import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Interface defining the structure of the client search book state
 */
interface ClientSearchBookState {
  totalBooks: number;
  activePage: number;
  activePriceFilter: null | string;
  activeCategoryFilter: string[];
  activeRatingFilter: null | string;
  activeSourceFilter: null | string;
  activeSort:
    | null
    | "publicationDate,desc"
    | "averageRating,desc"
    | "price,asc"
    | "price,desc";
  activeSearch: null | string;
}

/**
 * Interface defining the actions for the client search book store
 */
interface ClientSearchBookAction {
  updateTotalBooks: (value: number) => void;
  updateActivePage: (value: number) => void;
  updateActivePriceFilter: (value: null | string) => void;
  updateActiveCategoryFilter: (value: string[]) => void;
  updateActiveRatingFilter: (value: null | string) => void;
  updateActiveSourceFilter: (value: null | string) => void;
  updateActiveSort: (
    value:
      | null
      | "publicationDate,desc"
      | "averageRating,desc"
      | "price,asc"
      | "price,desc"
  ) => void;
  updateActiveSearch: (value: null | string) => void;
  resetClientSearchBookState: () => void;
}

const initialClientSearchBookState: Omit<ClientSearchBookState, "totalBooks"> =
  {
    activePage: 1,
    activePriceFilter: null,
    activeCategoryFilter: [],
    activeRatingFilter: null,
    activeSourceFilter: null,
    activeSort: null,
    activeSearch: null,
  };

/**
 * Combined type for the complete client search book store
 */
type ClientSearchBook = ClientSearchBookState & ClientSearchBookAction;

/**
 * Client Search Book Store created with Zustand
 * Handles client search book state and provides actions for updating the state
 */
const useClientSearchBook = create<ClientSearchBook>()(
  persist((set) => ({
    totalBooks: 0,
    ...initialClientSearchBookState,

    updateTotalBooks: (value: number) => {
      set(() => ({ totalBooks: value }));
    },
    updateActivePage: (value: number) => {
      set(() => ({ activePage: value }));
    },
    updateActivePriceFilter: (value: null | string) => {
      set(() => ({ activePriceFilter: value }));
    },
    updateActiveCategoryFilter: (value: string[]) => {
      set(() => ({ activeCategoryFilter: value }));
    },
    updateActiveRatingFilter: (value: null | string) => {
      set(() => ({ activeRatingFilter: value }));
    },
    updateActiveSourceFilter: (value: null | string) => {
      set(() => ({ activeSourceFilter: value }));
    },
    updateActiveSort: (
      value:
        | null
        | "publicationDate,desc"
        | "averageRating,desc"
        | "price,asc"
        | "price,desc"
    ) => {
      set(() => ({ activeSort: value }));
    },
    updateActiveSearch: (value: null | string) => {
      set(() => ({ activeSearch: value }));
    },
    resetClientSearchBookState: () => {
      set(() => ({
        ...initialClientSearchBookState,
      }));
    },
  }), {
    name: "client-search-book-storage", 
  })
);

export default useClientSearchBook;
