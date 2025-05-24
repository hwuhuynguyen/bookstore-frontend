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
