import { Container, Title, Table, Group, Badge, ActionIcon, Switch, TextInput, Button, Menu, Modal, Select, PasswordInput } from '@mantine/core';
import { useState } from 'react';
import { IconPencil, IconTrash, IconDotsVertical, IconSearch, IconPlus } from '@tabler/icons-react';

const AdminUserPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  
  // Mock users data
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', active: true, orders: 12 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'customer', active: true, orders: 5 },
    { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'customer', active: true, orders: 8 },
    { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'customer', active: false, orders: 0 },
    { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'customer', active: true, orders: 3 },
  ];
  
  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEditUser = (user: any) => {
    setEditingUser({ ...user });
    setModalOpen(true);
  };
  
  const handleAddNewUser = () => {
    setEditingUser({
      id: null,
      name: '',
      email: '',
      role: 'customer',
      active: true,
      password: ''
    });
    setModalOpen(true);
  };
  
  const handleSaveUser = () => {
    // Save user logic would go here
    alert(editingUser.id ? 'User updated' : 'User added');
    setModalOpen(false);
  };
  
  const handleDeleteUser = (userId: number) => {
    // Delete user logic would go here
    alert(`User ${userId} deleted`);
  };
  
  const handleToggleActive = (userId: number, currentActive: boolean) => {
    // Toggle active status logic would go here
    alert(`User ${userId} ${currentActive ? 'deactivated' : 'activated'}`);
  };
  
  return (
    <Container size="xl">
      <Group justify="space-between" align="center" mb="lg">
        <Title order={1}>Manage Users</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddNewUser}>
          Add New User
        </Button>
      </Group>
      
      <TextInput
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb="md"
        leftSection={<IconSearch size={16} />}
      />
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Role</Table.Th>
            <Table.Th>Orders</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredUsers.map(user => (
            <Table.Tr key={user.id}>
              <Table.Td>{user.name}</Table.Td>
              <Table.Td>{user.email}</Table.Td>
              <Table.Td>
                <Badge color={user.role === 'admin' ? 'blue' : 'green'}>
                  {user.role}
                </Badge>
              </Table.Td>
              <Table.Td>{user.orders}</Table.Td>
              <Table.Td>
                <Switch 
                  checked={user.active} 
                  onChange={() => handleToggleActive(user.id, user.active)}
                />
              </Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon color="blue" onClick={() => handleEditUser(user)}>
                    <IconPencil size={16} />
                  </ActionIcon>
                  <Menu>
                    <Menu.Target>
                      <ActionIcon>
                        <IconDotsVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item onClick={() => handleEditUser(user)} leftSection={<IconPencil size={16} />}>
                        Edit
                      </Menu.Item>
                      <Menu.Item 
                        color="red" 
                        onClick={() => handleDeleteUser(user.id)}
                        leftSection={<IconTrash size={16} />}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      
      {/* User Edit/Add Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser?.id ? 'Edit User' : 'Add New User'}
        size="md"
      >
        {editingUser && (
          <div>
            <TextInput
              label="Name"
              placeholder="Full name"
              value={editingUser.name}
              onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
              mb="md"
              required
            />
            
            <TextInput
              label="Email"
              placeholder="Email address"
              value={editingUser.email}
              onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
              mb="md"
              required
            />
            
            {!editingUser.id && (
              <PasswordInput
                label="Password"
                placeholder="Set password"
                value={editingUser.password || ''}
                onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                mb="md"
                required
              />
            )}
            
            <Select
              label="Role"
              placeholder="Select role"
              value={editingUser.role}
              onChange={(value) => setEditingUser({ ...editingUser, role: value })}
              data={[
                { value: 'admin', label: 'Admin' },
                { value: 'customer', label: 'Customer' }
              ]}
              mb="md"
              required
            />
            
            <Switch
              label="Active"
              checked={editingUser.active}
              onChange={(e) => setEditingUser({ ...editingUser, active: e.target.checked })}
              mb="md"
            />
            
            <Group justify="flex-end" mt="xl">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveUser}>Save</Button>
            </Group>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default AdminUserPage;
