import {
  Container,
  Title,
  Table,
  Group,
  Button,
  TextInput,
  ActionIcon,
  Modal,
  Card,
  Stack,
  Pagination,
  Text,
} from "@mantine/core";
import { useState } from "react";
import {
  IconPencil,
  IconTrash,
  IconPlus,
  IconSearch,
  IconInfoCircle,
} from "@tabler/icons-react";

const AdminCategoryPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [activePage, setActivePage] = useState(0);

  // Mock categories data
  const categories = [
    { id: 1, name: "Fiction", bookCount: 124 },
    { id: 2, name: "Science Fiction", bookCount: 78 },
    { id: 3, name: "Fantasy", bookCount: 93 },
    { id: 4, name: "Mystery", bookCount: 56 },
    { id: 5, name: "Romance", bookCount: 82 },
    { id: 6, name: "Non-Fiction", bookCount: 145 },
    { id: 7, name: "Biography", bookCount: 63 },
    { id: 8, name: "History", bookCount: 91 },
  ];

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditCategory = (category: any) => {
    setEditingCategory({ ...category });
    setModalOpen(true);
  };

  const handleAddNewCategory = () => {
    setEditingCategory({
      id: null,
      name: "",
      bookCount: 0,
    });
    setModalOpen(true);
  };

  const handleSaveCategory = () => {
    // Save category logic would go here
    alert(editingCategory.id ? "Category updated" : "Category added");
    setModalOpen(false);
  };

  const handleDeleteCategory = (categoryId: number) => {
    // Delete category logic would go here
    alert(`Category ${categoryId} deleted`);
  };

  return (
    <Container size="xl">
      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title order={2}>Category Management</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleAddNewCategory}
              color="blue"
              radius="md"
            >
              Add new category
            </Button>
          </Group>
          <TextInput
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftSection={<IconSearch size={16} />}
            radius="md"
          />
        </Stack>
      </Card>
      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Number of books</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredCategories.map((category) => (
              <Table.Tr key={category.id}>
                <Table.Td>{category.name}</Table.Td>
                <Table.Td>{category.bookCount}</Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="center">
                    <ActionIcon
                      variant="subtle"
                      color="green"
                      onClick={() => handleEditCategory(category)}
                      radius={"md"}
                    >
                      <IconInfoCircle size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      onClick={() => handleEditCategory(category)}
                      radius={"md"}
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => handleDeleteCategory(category.id)}
                      radius={"md"}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Group>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Group justify="space-between" mt={"lg"}>
          <Pagination
            total={100}
            onChange={(page: number) =>
              page !== activePage && setActivePage(page)
            }
          />
          <Text>
            <Text component="span" size="sm">
              Page {activePage}/{100}
            </Text>
          </Text>
        </Group>
      </Card>

      {/* Category Edit/Add Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCategory?.id ? "Edit Category" : "Add New Category"}
      >
        {editingCategory && (
          <div>
            <TextInput
              label="Category Name"
              placeholder="Category name"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({ ...editingCategory, name: e.target.value })
              }
              mb="md"
              required
            />

            <Group justify="flex-end" mt="xl">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveCategory}>Save</Button>
            </Group>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default AdminCategoryPage;
