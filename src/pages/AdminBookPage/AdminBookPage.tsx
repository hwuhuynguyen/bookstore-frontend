import {
  Container,
  Title,
  Table,
  Group,
  Button,
  TextInput,
  ActionIcon,
  Modal,
  Select,
  Textarea,
  NumberInput,
  Card,
  Stack,
  Pagination,
  Text,
} from "@mantine/core";
import { useState } from "react";
import {
  IconPencil,
  IconTrash,
  IconSearch,
  IconPlus,
  IconInfoCircle,
} from "@tabler/icons-react";

const AdminBookPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [activePage, setActivePage] = useState(0);

  // Mock books data
  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      category: "Fiction",
      price: 12.99,
      stock: 45,
    },
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      category: "Science Fiction",
      price: 10.99,
      stock: 32,
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      category: "Fiction",
      price: 11.99,
      stock: 18,
    },
    {
      id: 4,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      category: "Fantasy",
      price: 14.99,
      stock: 27,
    },
    {
      id: 5,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      category: "Classic",
      price: 9.99,
      stock: 8,
    },
  ];

  // Filter books based on search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditBook = (book: any) => {
    setEditingBook({ ...book });
    setModalOpen(true);
  };

  const handleAddNewBook = () => {
    setEditingBook({
      id: null,
      title: "",
      author: "",
      category: "",
      price: 0,
      stock: 0,
      description: "",
    });
    setModalOpen(true);
  };

  const handleSaveBook = () => {
    // Save book logic would go here
    alert(editingBook.id ? "Book updated" : "Book added");
    setModalOpen(false);
  };

  const handleDeleteBook = (bookId: number) => {
    // Delete book logic would go here
    alert(`Book ${bookId} deleted`);
  };

  return (
    <Container size="xl">
      <Card radius="md" shadow="lg" p="lg" mb="md" withBorder>
        <Stack>
          <Group justify="space-between">
            <Title order={2}>Book Management</Title>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleAddNewBook}
              color="blue"
              radius="md"
            >
              Add new book
            </Button>
          </Group>
          <TextInput
            placeholder="Search books..."
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
              <Table.Th>Title</Table.Th>
              <Table.Th>Author</Table.Th>
              <Table.Th>Category</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Price (đ)</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Stock</Table.Th>
              <Table.Th style={{ textAlign: "center" }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {filteredBooks.map((book) => (
              <Table.Tr key={book.id}>
                <Table.Td>{book.title}</Table.Td>
                <Table.Td>{book.author}</Table.Td>
                <Table.Td>{book.category}</Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  {book.price.toFixed(2)}
                </Table.Td>
                <Table.Td style={{ textAlign: "center" }}>
                  {book.stock}
                </Table.Td>
                <Table.Td>
                  <Group gap="xs" justify="center">
                    <ActionIcon
                      variant="subtle"
                      color="green"
                      onClick={() => handleEditBook(book)}
                      radius={"md"}
                    >
                      <IconInfoCircle size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      onClick={() => handleEditBook(book)}
                      radius={"md"}
                    >
                      <IconPencil size={16} />
                    </ActionIcon>
                    <ActionIcon
                      variant="subtle"
                      color="red"
                      onClick={() => handleDeleteBook(book.id)}
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

      {/* Book Edit/Add Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingBook?.id ? "Edit Book" : "Add New Book"}
        size="lg"
      >
        {editingBook && (
          <div>
            <TextInput
              label="Title"
              placeholder="Book title"
              value={editingBook.title}
              onChange={(e) =>
                setEditingBook({ ...editingBook, title: e.target.value })
              }
              mb="md"
              required
            />

            <TextInput
              label="Author"
              placeholder="Author name"
              value={editingBook.author}
              onChange={(e) =>
                setEditingBook({ ...editingBook, author: e.target.value })
              }
              mb="md"
              required
            />

            <Select
              label="Category"
              placeholder="Select category"
              value={editingBook.category}
              onChange={(value) =>
                setEditingBook({ ...editingBook, category: value })
              }
              data={[
                "Fiction",
                "Science Fiction",
                "Fantasy",
                "Mystery",
                "Romance",
                "Non-Fiction",
                "Biography",
                "History",
              ]}
              mb="md"
              required
            />

            <Group grow mb="md">
              <NumberInput
                label="Price ($)"
                placeholder="0.00"
                value={editingBook.price}
                onChange={(value) =>
                  setEditingBook({ ...editingBook, price: value })
                }
                min={0}
                required
              />

              <NumberInput
                label="Stock"
                placeholder="0"
                value={editingBook.stock}
                onChange={(value) =>
                  setEditingBook({ ...editingBook, stock: value })
                }
                min={0}
                required
              />
            </Group>

            <Textarea
              label="Description"
              placeholder="Book description"
              value={editingBook.description || ""}
              onChange={(e) =>
                setEditingBook({ ...editingBook, description: e.target.value })
              }
              mb="md"
              minRows={4}
            />

            <Group justify="flex-end" mt="xl">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveBook}>Save</Button>
            </Group>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default AdminBookPage;
