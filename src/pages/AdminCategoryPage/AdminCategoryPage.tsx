import { Container, Title, Table, Group, Button, TextInput, ActionIcon, Modal } from '@mantine/core';
import { useState } from 'react';
import { IconPencil, IconTrash, IconPlus, IconSearch } from '@tabler/icons-react';

const AdminCategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  
  // Mock categories data
  const categories = [
    { id: 1, name: 'Fiction', bookCount: 124 },
    { id: 2, name: 'Science Fiction', bookCount: 78 },
    { id: 3, name: 'Fantasy', bookCount: 93 },
    { id: 4, name: 'Mystery', bookCount: 56 },
    { id: 5, name: 'Romance', bookCount: 82 },
    { id: 6, name: 'Non-Fiction', bookCount: 145 },
    { id: 7, name: 'Biography', bookCount: 63 },
    { id: 8, name: 'History', bookCount: 91 },
  ];
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleEditCategory = (category: any) => {
    setEditingCategory({ ...category });
    setModalOpen(true);
  };
  
  const handleAddNewCategory = () => {
    setEditingCategory({
      id: null,
      name: '',
      bookCount: 0
    });
    setModalOpen(true);
  };
  
  const handleSaveCategory = () => {
    // Save category logic would go here
    alert(editingCategory.id ? 'Category updated' : 'Category added');
    setModalOpen(false);
  };
  
  const handleDeleteCategory = (categoryId: number) => {
    // Delete category logic would go here
    alert(`Category ${categoryId} deleted`);
  };
  
  return (
    <Container size="xl">
      <Group justify="space-between" align="center" mb="lg">
        <Title order={1}>Manage Categories</Title>
        <Button leftSection={<IconPlus size={16} />} onClick={handleAddNewCategory}>
          Add New Category
        </Button>
      </Group>
      
      <TextInput
        placeholder="Search categories..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb="md"
        leftSection={<IconSearch size={16} />}
      />
      
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Books</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredCategories.map(category => (
            <Table.Tr key={category.id}>
              <Table.Td>{category.name}</Table.Td>
              <Table.Td>{category.bookCount}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon color="blue" onClick={() => handleEditCategory(category)}>
                    <IconPencil size={16} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => handleDeleteCategory(category.id)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      
      {/* Category Edit/Add Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCategory?.id ? 'Edit Category' : 'Add New Category'}
      >
        {editingCategory && (
          <div>
            <TextInput
              label="Category Name"
              placeholder="Category name"
              value={editingCategory.name}
              onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
              mb="md"
              required
            />
            
            <Group justify="flex-end" mt="xl">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveCategory}>Save</Button>
            </Group>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default AdminCategoryPage;
