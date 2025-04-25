import { Container, Title, Table, Group, Badge, ActionIcon, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { IconEye, IconSearch } from '@tabler/icons-react';

const AdminOrderPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Mock orders data
  const orders = [
    { id: '12345', date: '2023-04-15', customer: 'John Doe', status: 'Delivered', total: 45.97 },
    { id: '12346', date: '2023-04-18', customer: 'Jane Smith', status: 'Processing', total: 29.99 },
    { id: '12347', date: '2023-04-20', customer: 'Robert Johnson', status: 'Shipped', total: 78.50 },
    { id: '12348', date: '2023-04-21', customer: 'Sarah Williams', status: 'Pending', total: 120.75 },
    { id: '12349', date: '2023-04-22', customer: 'Michael Brown', status: 'Processing', total: 55.25 },
  ];
  
  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => 
    (searchQuery === '' || 
     order.id.includes(searchQuery) || 
     order.customer.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (statusFilter === null || order.status === statusFilter)
  );
  
  // Get unique statuses for the dropdown
  const statuses = Array.from(new Set(orders.map(order => order.status)));
  
  return (
    <Container size="xl">
      <Title order={1} my="lg">Manage Orders</Title>
      
      <Group grow mb="md">
        <TextInput
          placeholder="Search by order ID or customer..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftSection={<IconSearch size={16} />}
        />
        <Select
          placeholder="Filter by status"
          value={statusFilter}
          onChange={setStatusFilter}
          data={statuses.map(status => ({ value: status, label: status }))}
          clearable
        />
      </Group>
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Order ID</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Customer</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredOrders.map(order => (
            <Table.Tr key={order.id}>
              <Table.Td>{order.id}</Table.Td>
              <Table.Td>{order.date}</Table.Td>
              <Table.Td>{order.customer}</Table.Td>
              <Table.Td>
                <Badge 
                  color={
                    order.status === 'Delivered' ? 'green' : 
                    order.status === 'Shipped' ? 'blue' : 
                    order.status === 'Processing' ? 'yellow' : 'gray'
                  }
                >
                  {order.status}
                </Badge>
              </Table.Td>
              <Table.Td>${order.total.toFixed(2)}</Table.Td>
              <Table.Td>
                <ActionIcon color="blue">
                  <IconEye size={16} />
                </ActionIcon>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Container>
  );
};

export default AdminOrderPage;
