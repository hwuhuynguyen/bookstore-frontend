import { DashboardResponse } from "../models/Dashboard";

export const MOCK_STATISTIC_DATA: DashboardResponse = {
  totalUsers: 3,
  totalBooks: 61021,
  totalOrders: 17,
  totalCategories: 11,
  totalReviews: 2,
  totalAuthors: 22998,
  totalCashPayments: 10,
  totalOnlinePayments: 20,
  statisticRegistration: [
    { total: 5, date: "2025-05-16T17:00:00.000+00:00" },
    { total: 3, date: "2025-05-17T17:00:00.000+00:00" },
    { total: 8, date: "2025-05-18T17:00:00.000+00:00" },
    { total: 7, date: "2025-05-19T17:00:00.000+00:00" },
    { total: 2, date: "2025-05-20T17:00:00.000+00:00" },
    { total: 6, date: "2025-05-21T17:00:00.000+00:00" },
    { total: 4, date: "2025-05-22T17:00:00.000+00:00" },
  ],
  statisticOrder: [
    { total: 1, date: "2025-05-16T17:00:00.000+00:00" },
    { total: 3, date: "2025-05-17T17:00:00.000+00:00" },
    { total: 2, date: "2025-05-18T17:00:00.000+00:00" },
    { total: 4, date: "2025-05-19T17:00:00.000+00:00" },
    { total: 5, date: "2025-05-20T17:00:00.000+00:00" },
    { total: 2, date: "2025-05-21T17:00:00.000+00:00" },
    { total: 3, date: "2025-05-22T17:00:00.000+00:00" },
  ],
  statisticReview: [
    { total: 1, date: "2025-05-16T17:00:00.000+00:00" },
    { total: 2, date: "2025-05-17T17:00:00.000+00:00" },
    { total: 3, date: "2025-05-18T17:00:00.000+00:00" },
    { total: 2, date: "2025-05-19T17:00:00.000+00:00" },
    { total: 1, date: "2025-05-20T17:00:00.000+00:00" },
    { total: 4, date: "2025-05-21T17:00:00.000+00:00" },
    { total: 5, date: "2025-05-22T17:00:00.000+00:00" },
  ],
};
