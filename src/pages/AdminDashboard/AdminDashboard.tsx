import { Container, Title, Grid, Card, Text, Group, RingProgress } from '@mantine/core';

const AdminDashboard = () => {
  // Mock dashboard data
  const stats = {
    totalSales: 12450.79,
    ordersToday: 24,
    totalBooks: 542,
    lowStock: 15,
    pendingOrders: 18,
    newCustomers: 8
  };
  
  return (
    <Container size="xl">
      <Title order={1} my="lg">Dashboard</Title>
      
      <Grid>
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <div>
                <Text c="dimmed" size="sm">Total Sales</Text>
                <Text size="xl" fw={700}>${stats.totalSales.toFixed(2)}</Text>
              </div>
              <RingProgress
                sections={[{ value: 65, color: 'blue' }]}
                size={80}
                thickness={8}
                label={<Text size="xs" ta="center">+5.2%</Text>}
              />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <div>
                <Text c="dimmed" size="sm">Orders Today</Text>
                <Text size="xl" fw={700}>{stats.ordersToday}</Text>
              </div>
              <RingProgress
                sections={[{ value: 40, color: 'green' }]}
                size={80}
                thickness={8}
                label={<Text size="xs" ta="center">+2.4%</Text>}
              />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <div>
                <Text c="dimmed" size="sm">Total Books</Text>
                <Text size="xl" fw={700}>{stats.totalBooks}</Text>
              </div>
              <RingProgress
                sections={[{ value: 75, color: 'cyan' }]}
                size={80}
                thickness={8}
                label={<Text size="xs" ta="center">+12</Text>}
              />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <div>
                <Text c="dimmed" size="sm">Low Stock Items</Text>
                <Text size="xl" fw={700}>{stats.lowStock}</Text>
              </div>
              <RingProgress
                sections={[{ value: 15, color: 'red' }]}
                size={80}
                thickness={8}
                label={<Text size="xs" ta="center">-2</Text>}
              />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <div>
                <Text c="dimmed" size="sm">Pending Orders</Text>
                <Text size="xl" fw={700}>{stats.pendingOrders}</Text>
              </div>
              <RingProgress
                sections={[{ value: 30, color: 'orange' }]}
                size={80}
                thickness={8}
                label={<Text size="xs" ta="center">+5</Text>}
              />
            </Group>
          </Card>
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Group>
              <div>
                <Text c="dimmed" size="sm">New Customers</Text>
                <Text size="xl" fw={700}>{stats.newCustomers}</Text>
              </div>
              <RingProgress
                sections={[{ value: 20, color: 'teal' }]}
                size={80}
                thickness={8}
                label={<Text size="xs" ta="center">+3</Text>}
              />
            </Group>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
