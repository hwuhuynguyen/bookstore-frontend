export interface StatisticResource {
  total: number;
  date: string; // ISO timestamp, e.g., "2025-05-23T00:00:00Z"
}

export interface StatusStatistic {
  status: string;
  total: number;
}

export interface DashboardResponse {
  totalUsers: number;
  totalBooks: number;
  totalOrders: number;
  totalCategories: number;
  totalReviews: number;
  totalAuthors: number;
  totalCashPayments: number;
  totalOnlinePayments: number;
  statisticRegistration: StatisticResource[];
  statisticOrder: StatisticResource[];
  statisticReview: StatisticResource[];
  orderStatusStats: StatusStatistic[]; 
}
