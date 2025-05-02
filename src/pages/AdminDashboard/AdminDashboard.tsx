import {
  Container,
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
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const dateReducerForStatisticResources = (statisticResources: any[]) =>
  statisticResources.map((statisticResource) => ({
    date: statisticResource.date,
    total: statisticResource.value,
  }));

const AdminDashboard = () => {
  const theme = useMantineTheme();

  const statistic = {
    totalCustomer: 1200,
    totalProduct: 450,
    totalOrder: 320,
    totalWaybill: 300,
    totalReview: 150,
    totalActivePromotion: 5,
    totalSupplier: 20,
    totalBrand: 12,
    statisticRegistration: [
      { date: "2025-04-01", value: 10 },
      { date: "2025-04-02", value: 15 },
      { date: "2025-04-03", value: 20 },
    ],
    statisticOrder: [
      { date: "2025-04-01", value: 25 },
      { date: "2025-04-02", value: 30 },
      { date: "2025-04-03", value: 35 },
    ],
    statisticReview: [
      { date: "2025-04-01", value: 5 },
      { date: "2025-04-02", value: 8 },
      { date: "2025-04-03", value: 6 },
      { date: "2025-04-03", value: 6 },
      { date: "2025-04-03", value: 6 },
      { date: "2025-04-03", value: 6 },
      { date: "2025-04-03", value: 6 },
      { date: "2025-04-03", value: 6 },
      { date: "2025-04-03", value: 6 },
    ],
    statisticWaybill: [
      { date: "2025-04-01", value: 22 },
      { date: "2025-04-02", value: 28 },
      { date: "2025-04-03", value: 26 },
    ],
  };

  return (
    <Container size="xl">
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
                  number={statistic.totalCustomer}
                  color="blue"
                  icon={IconUsers}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total books"
                  number={statistic.totalProduct}
                  color="orange"
                  icon={IconBox}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total orders"
                  number={statistic.totalOrder}
                  color="teal"
                  icon={IconFileBarcode}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total reviews"
                  number={statistic.totalReview}
                  color="yellow"
                  icon={IconStar}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total publishers"
                  number={statistic.totalSupplier}
                  color="violet"
                  icon={IconBuildingWarehouse}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total authors"
                  number={statistic.totalSupplier}
                  color="grape"
                  icon={IconBuildingWarehouse}
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <OverviewCard
                  title="Total categories"
                  number={statistic.totalSupplier}
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

                  <LineChart
                    width={400}
                    height={275}
                    data={dateReducerForStatisticResources(
                      statistic.statisticRegistration
                    )}
                    margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis />
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
                    width={400}
                    height={275}
                    data={dateReducerForStatisticResources(
                      statistic.statisticReview
                    )}
                    margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis />
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
                    width={400}
                    height={275}
                    data={dateReducerForStatisticResources(
                      statistic.statisticOrder
                    )}
                    margin={{ top: 10, right: 5, bottom: 0, left: -10 }}
                  >
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      name="Number of orders"
                      dataKey="total"
                      fill={theme.colors.teal[5]}
                    />
                  </BarChart>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
};

export default AdminDashboard;
