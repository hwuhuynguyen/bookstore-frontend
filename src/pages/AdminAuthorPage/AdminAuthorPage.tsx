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

const AdminAuthorPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<any>(null);
  const [activePage, setActivePage] = useState(0);

  // Mock authors data
  const authors = [
    { id: 1, name: "J.K. Rowling", bookCount: 7 },
    { id: 2, name: "George R.R. Martin", bookCount: 5 },
    { id: 3, name: "Isaac Asimov", bookCount: 50 },
    { id: 4, name: "Agatha Christie", bookCount: 66 },
    { id: 5, name: "Stephen King", bookCount: 63 },
    { id: 6, name: "Yuval Noah Harari", bookCount: 3 },
    { id: 7, name: "Haruki Murakami", bookCount: 12 },
    { id: 8, name: "Dan Brown", bookCount: 6 },
  ];

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditAuthor = (author: any) => {
    setEditingAuthor({ ...author });
    setModalOpen(true);
  };

  const handleAddNewAuthor = () => {
    setEditingAuthor({
      id: null,
      name: "",
      bookCount: 0,
    });
    setModalOpen(true);
  };

  const handleSaveAuthor = () => {
    alert(editingAuthor.id ? "Author updated" : "Author added");
    setModalOpen(false);
  };

  const handleDeleteAuthor = (authorId: number) => {
    alert(`Author ${authorId} deleted`);
  };

  return (
    <Container size="xl">
      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title order={2}>Author Management</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleAddNewAuthor}
              color="blue"
              radius="md"
            >
              Add new author
            </Button>
          </Group>
          <TextInput
            placeholder="Search authors..."
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
            {filteredAuthors.map((author) => (
              <Table.Tr key={author.id}>
                <Table.Td>{author.name}</Table.Td>
                <Table.Td>{author.bookCount}</Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="center">
                    <ActionIcon
                      variant="subtle"
                      color="green"
                      onClick={() => handleEditAuthor(author)}
                      radius={"md"}
                    >
                      <IconInfoCircle size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      onClick={() => handleEditAuthor(author)}
                      radius={"md"}
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => handleDeleteAuthor(author.id)}
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

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingAuthor?.id ? "Edit Author" : "Add New Author"}
      >
        {editingAuthor && (
          <div>
            <TextInput
              label="Author Name"
              placeholder="Author name"
              value={editingAuthor.name}
              onChange={(e) =>
                setEditingAuthor({ ...editingAuthor, name: e.target.value })
              }
              mb="md"
              required
            />

            <Group justify="flex-end" mt="xl">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveAuthor}>Save</Button>
            </Group>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default AdminAuthorPage;
