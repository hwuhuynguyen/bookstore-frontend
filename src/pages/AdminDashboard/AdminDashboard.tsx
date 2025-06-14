import {
  Title,
  Grid,
  Card,
  Text,
  Group,
  Paper,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import OverviewCard from "../../components/OverviewCard";
import {
  IconBox,
  IconBuildingWarehouse,
  IconFileBarcode,
  IconStar,
  IconUsers,
} from "@tabler/icons-react";
import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import FetchUtils, { ErrorMessage } from "../../utils/FetchUtils";
import { DashboardResponse } from "../../models/Dashboard";
import ResourceURL from "../../constants/ResourceURL";

const dateReducerForStatisticResources = (statisticResources: any[]) =>
  statisticResources.map((statisticResource) => ({
    date: new Date(statisticResource.date).toLocaleDateString("en-CA"),
    total: statisticResource.total,
  }));

const AdminDashboard = () => {
  const theme = useMantineTheme();
  // const isEmptyChartData = (data: any[]) => data.every((d) => d.total === 0);

  const defaultStatisticResponse: DashboardResponse = {
    totalUsers: 0,
    totalBooks: 0,
    totalOrders: 0,
    totalCategories: 0,
    totalReviews: 0,
    totalAuthors: 0,
    totalCashPayments: 0,
    totalOnlinePayments: 0,
    statisticRegistration: [],
    statisticOrder: [],
    statisticReview: [],
    orderStatusStats: [],
  };

  const { data: statisticResponse } = useQuery<DashboardResponse, ErrorMessage>(
    {
      queryKey: ["api", "stats", "getStatistic"],
      queryFn: () =>
        FetchUtils.getWithToken<DashboardResponse>(
          ResourceURL.ADMIN_DASHBOARD,
          {},
          true
        ),
      placeholderData: defaultStatisticResponse,
    }
  );

  const statistic = statisticResponse as DashboardResponse;
  const statusOrder = [
    "PENDING",
    "PROCESSING",
    "DELIVERING",
    "COMPLETED",
    "CANCELLED",
  ];
  const statusColors: Record<string, string> = {
    PENDING: theme.colors.yellow[5],
    PROCESSING: theme.colors.blue[5],
    DELIVERING: theme.colors.indigo[5],
    COMPLETED: theme.colors.green[5],
    CANCELLED: theme.colors.violet[5],
  };

  const sortedOrderStatus = statusOrder.map((status) => {
    const found = statistic.orderStatusStats.find((s) => s.status === status);
    return {
      status,
      total: found ? found.total : 0,
    };
  });

  return (
    <>
      <Stack>
        <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
          <Title order={2}>Dashboard</Title>
        </Card>

        <Paper shadow="xs" p="md">
          <Stack>
            <Text size="lg" fw={500} color="dimmed">
              Overview
            </Text>
            <Grid>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total users"
                  number={statistic.totalUsers}
                  color="blue"
                  icon={IconUsers}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total books"
                  number={statistic.totalBooks}
                  color="orange"
                  icon={IconBox}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total orders"
                  number={statistic.totalOrders}
                  color="teal"
                  icon={IconFileBarcode}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total reviews"
                  number={statistic.totalReviews}
                  color="yellow"
                  icon={IconStar}
                />
              </Grid.Col>
              {/* <Grid.Col span={3}>
                <OverviewCard
                  title="Total publishers"
                  number={statistic.totalAuthors}
                  color="violet"
                  icon={IconBuildingWarehouse}
                />
              </Grid.Col> */}
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total authors"
                  number={statistic.totalAuthors}
                  color="grape"
                  icon={IconBuildingWarehouse}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total categories"
                  number={statistic.totalCategories}
                  color="indigo"
                  icon={IconBuildingWarehouse}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Paper>

        <Grid>
          <Grid.Col span={6}>
            <Stack>
              <Paper shadow="xs" p="md">
                <Stack>
                  <Group justify="space-between">
                    <Text size="lg" fw={500} color="dimmed">
                      Account registrations
                    </Text>
                    <Text size="sm" color="dimmed">
                      last 7 days
                    </Text>
                  </Group>
                  {/* {isEmptyChartData(statistic.statisticRegistration) ? (
                    <Text ta="center" color="dimmed">
                      No data available
                    </Text>
                  ) : ( */}
                  <LineChart
                    width={500}
                    height={275}
                    data={dateReducerForStatisticResources(
                      statistic.statisticRegistration
                    )}
                    margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis dataKey="total" />
                    <Tooltip />
                    <Line
                      name="Number of registrations"
                      type="monotone"
                      dataKey="total"
                      stroke={theme.colors.blue[5]}
                    />
                  </LineChart>
                </Stack>
              </Paper>

              <Paper shadow="xs" p="md">
                <Stack>
                  <Group justify="space-between">
                    <Text size="lg" fw={500} color="dimmed">
                      Book reviews
                    </Text>
                    <Text size="sm" color="dimmed">
                      last 7 days
                    </Text>
                  </Group>

                  <LineChart
                    width={500}
                    height={275}
                    data={dateReducerForStatisticResources(
                      statistic.statisticReview
                    )}
                    margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis dataKey="total" />
                    <Tooltip />
                    <Line
                      name="Number of reviews"
                      type="monotone"
                      dataKey="total"
                      stroke={theme.colors.yellow[7]}
                    />
                  </LineChart>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack>
              <Paper shadow="xs" p="md">
                <Stack>
                  <Group justify="space-between">
                    <Text size="lg" fw={500} color="dimmed">
                      Book orders
                    </Text>
                    <Text size="sm" color="dimmed">
                      last 7 days
                    </Text>
                  </Group>

                  <BarChart
                    width={500}
                    height={275}
                    data={dateReducerForStatisticResources(
                      statistic.statisticOrder
                    )}
                    margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis dataKey="total" />
                    <Tooltip />
                    <Bar
                      name="Number of orders"
                      dataKey="total"
                      fill={theme.colors.teal[5]}
                    />
                  </BarChart>
                </Stack>
              </Paper>
              <Paper shadow="xs" p="md">
                <Stack>
                  <Group justify="space-between">
                    <Text size="lg" fw={500} color="dimmed">
                      Order Status Overview
                    </Text>
                    <Text size="sm" color="dimmed">
                      All time
                    </Text>
                  </Group>

                  <BarChart
                    width={500}
                    height={275}
                    data={sortedOrderStatus}
                    margin={{ top: 10, right: 5, bottom: 50, left: -10 }}
                  >
                    <XAxis dataKey="status" angle={-45} textAnchor="end" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      name="Orders"
                      dataKey="total"
                      fill={theme.colors.blue[5]}
                    >
                      {sortedOrderStatus.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            statusColors[entry.status] || theme.colors.gray[5]
                          }
                        />
                      ))}
                      <LabelList dataKey="total" position="top" />
                    </Bar>
                  </BarChart>
                </Stack>
              </Paper>
              <Paper shadow="xs" p="md">
                <Stack>
                  <Group justify="space-between">
                    <Text size="lg" fw={500} color="dimmed">
                      Payment Method Ratio
                    </Text>
                    <Text size="sm" color="dimmed">
                      All time
                    </Text>
                  </Group>

                  <PieChart width={500} height={275}>
                    <Tooltip />
                    <Pie
                      dataKey="value"
                      data={[
                        {
                          name: "Cash on Delivery",
                          value: statistic.totalCashPayments,
                        },
                        {
                          name: "Online Payment",
                          value: statistic.totalOnlinePayments,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={90}
                      label
                    >
                      <Cell fill={theme.colors.teal[6]} />
                      <Cell fill={theme.colors.orange[6]} />
                    </Pie>
                  </PieChart>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
};

export default AdminDashboard;
