import { useState } from "react";
import {
  Grid,
  Image,
  Text,
  Group,
  Badge,
  Rating,
  Tabs,
  Button,
  Box,
  Avatar,
  Table,
  ActionIcon,
  Container,
  Paper,
  rem,
  Stack,
  useMantineTheme,
  Progress,
  Flex,
  Divider,
} from "@mantine/core";
import { IconMinus, IconPlus, IconShoppingCart } from "@tabler/icons-react";
import BookCarousel from "../../components/BookCarousel";
const reviewsData = {
  averageRating: 4.5,
  totalReviews: 5,
  ratingDistribution: [
    { stars: 5, count: 3 },
    { stars: 4, count: 1 },
    { stars: 3, count: 2 },
    { stars: 2, count: 2 },
    { stars: 1, count: 2 },
  ],
  reviews: [
    {
      id: 1,
      author: 'Nguyễn Thảo',
      avatar: 'https://v0.dev/placeholder.svg?height=50&width=50',
      rating: 5,
      date: '23/12/2023',
      content: 'Mình thích nhất ở nội dung chọn lọc, mỗi những câu từ mà tác giả, không bị lê thê mà hay hơn đọc phần gây đầu nhà mọi người!'
    },
    {
      id: 2,
      author: 'Nguyễn Thảo',
      avatar: 'https://v0.dev/placeholder.svg?height=50&width=50',
      rating: 5,
      date: '23/12/2023',
      content: 'Mình thích nhất ở nội dung chọn lọc, mỗi những câu từ mà tác giả, không bị lê thê mà hay hơn đọc phần gây đầu nhà mọi người!'
    },
    {
      id: 3,
      author: 'Trần Minh',
      avatar: 'https://v0.dev/placeholder.svg?height=50&width=50',
      rating: 4,
      date: '15/12/2023',
      content: 'Sách hay, nội dung sâu sắc và đầy ý nghĩa. Tôi đã học được rất nhiều điều từ cuốn sách này.'
    },
    {
      id: 4,
      author: 'Lê Hương',
      avatar: 'https://v0.dev/placeholder.svg?height=50&width=50',
      rating: 5,
      date: '10/12/2023',
      content: 'Một cuốn sách tuyệt vời, đáng để đọc nhiều lần. Tôi sẽ giới thiệu cho bạn bè của mình.'
    },
    {
      id: 5,
      author: 'Phạm Anh',
      avatar: 'https://v0.dev/placeholder.svg?height=50&width=50',
      rating: 3,
      date: '05/12/2023',
      content: 'Sách có những ý hay nhưng hơi khó hiểu ở một số chương. Cần đọc chậm để hiểu hết ý nghĩa.'
    }
  ]
};

export default function ClientBookDetailPage() {
  const theme = useMantineTheme();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<string>("details");

  return (
    <Container size="xl">
      <Stack gap={theme.spacing.lg}>
        <Grid>
          {/* Left column with book image */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box style={{ maxWidth: 300, margin: "0 auto" }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-MXq3G44UQ1VwFGATSnFUGM9rXn6exo.png"
                alt="Muốn kiếp nhân sinh"
                radius="md"
                fit="contain"
              />
              <Button fullWidth variant="outline" color="gray" mt="md">
                Xem trước
              </Button>
            </Box>
          </Grid.Col>

          {/* Right column with book details */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Text fz={{ base: 24, sm: 28 }} fw={700} mb="xs">
              Muốn kiếp nhân sinh
            </Text>

            <Group gap="xs" mb="md">
              <Rating value={4.4} fractions={2} readOnly />
              <Text size="sm" c="dimmed">
                4.0
              </Text>
              <Badge color="cyan" variant="outline">
                235 reviews
              </Badge>
            </Group>

            <Group mb="md" align="center">
              <Avatar
                radius="xl"
                size="md"
                src="https://v0.dev/placeholder.svg?height=40&width=40"
              />
              <Box>
                <Text size="xs" c="dimmed">
                  Author
                </Text>
                <Text>Nguyen Phong</Text>
              </Box>
              <Box ml="xl">
                <Text size="xs" c="dimmed">
                  Publisher
                </Text>
                <Text>First News</Text>
              </Box>
              <Box ml="xl">
                <Text size="xs" c="dimmed">
                  Publication year
                </Text>
                <Text>2019</Text>
              </Box>
            </Group>

            <Text
              mb="lg"
              style={{
                fontFamily: '"Newsreader", serif',
                textAlign: "justify",
              }}
              fw={500}
            >
              "Muốn kiếp nhân sinh" là tác phẩm tư duy tự vấn nổi tiếng của
              Nguyễn Phong kể từ năm 2017 và hoàn tất đến năm 2020 ghi lại những
              câu chuyện, trải nghiệm nên kiếp tây tự tu niệm thực của nghệ nhân
              tâm giới Nguyễn Phong Thomas - một nhà kinh doanh thành công sống
              ở New York. Những câu chuyện chứa đựng sâu sắc triết lý giúp con
              người tìm thấy giá trị đích thực nghiệm, khám phá cái quy luật vì
              sao thành quả và tuân thủ của cá nhân giúp bạn trở nên đắc đạng.
              "Muốn kiếp nhân sinh" là một tọa thành tâm vô vô vàn những giáo
              cuộc đời, là một cuộc phiêu đổ vô, sống động và những trải sống
              huyền bí, trải dài từ nền văn minh Atlantis hùng mạnh đến vương
              quốc Ai Cập cổ đại của các Pharaoh quyền uy, đến Hoa Kỳ Đương Quốc
              hoa lệ ngày nay.
            </Text>

            <Stack mb="md">
              <Group>
                <Text fz={{ base: 24, sm: 28 }} fw={700}>
                  99.000đ
                </Text>
                <Group gap="xs">
                  <Text td="line-through" c="dimmed" fz={16}>
                    78.000đ
                  </Text>
                  <Badge color="cyan">-95%</Badge>
                </Group>
              </Group>

              <Group>
                <ActionIcon
                  variant="filled"
                  color="cyan"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <IconMinus size={16} />
                </ActionIcon>
                <Text>{quantity}</Text>
                <ActionIcon
                  variant="filled"
                  color="cyan"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <IconPlus size={16} />
                </ActionIcon>
                <Text size="sm" c="dimmed">
                  Books in stock: 3
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Tabs
              value={activeTab}
              onChange={(value) => value && setActiveTab(value)}
              mb="xl"
              px={16}
            >
              <Tabs.List grow>
                <Tabs.Tab
                  value="details"
                  style={{
                    fontSize: "1rem",
                    fontWeight: activeTab === "details" ? "500" : "normal",
                  }}
                >
                  Details
                </Tabs.Tab>
                <Tabs.Tab
                  value="reviews"
                  style={{
                    fontSize: "1rem",
                    fontWeight: activeTab === "reviews" ? "500" : "normal",
                  }}
                >
                  Reviews
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="details" pt="md">
                <Table
                  highlightOnHover={false}
                  verticalSpacing="xs"
                  variant="vertical"
                >
                  <Table.Tbody>
                    <Table.Tr>
                      <Table.Th w={250}>Publication date</Table.Th>
                      <Table.Td>01/05/2022</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>ISBN</Table.Th>
                      <Table.Td>1213413816148</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Number of pages</Table.Th>
                      <Table.Td>408 pages</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Publisher</Table.Th>
                      <Table.Td>Raincoast Books</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Author</Table.Th>
                      <Table.Td>Nguyen Phong</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Book cover</Table.Th>
                      <Table.Td>Audio</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Source</Table.Th>
                      <Table.Td>GoodReads</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                      <Table.Th w={250}>Category</Table.Th>
                      <Table.Td>
                        <Badge color="cyan">Romance</Badge>
                      </Table.Td>
                    </Table.Tr>
                  </Table.Tbody>
                </Table>
              </Tabs.Panel>

              <Tabs.Panel value="reviews" pt="md">
              <Box>
      <Flex
        direction={{ base: 'column', sm: 'row' }}
        gap="xl"
        align="flex-start"
      >
        {/* Left side - Rating summary */}
        <Box style={{ flex: 1 }}>
          <Group align="flex-end" mb="xs">
            <Text fz={36} fw={700} lh={1}>
              {reviewsData.averageRating}
            </Text>
            <Box>
              <Rating value={reviewsData.averageRating} fractions={2} readOnly size="md" />
              <Text fz="sm" c="dimmed">
                {reviewsData.totalReviews} bài đánh giá
              </Text>
            </Box>
          </Group>

          <Stack gap="xs" mb="md">
            {reviewsData.ratingDistribution.map((item) => (
              <Group key={item.stars} gap="xs">
                <Text fz="sm" w={35}>
                  {item.stars} sao
                </Text>
                <Progress 
                  value={(item.count / reviewsData.totalReviews) * 100} 
                  size="sm" 
                  style={{ flex: 1 }}
                  color={item.stars >= 4 ? 'yellow' : item.stars >= 3 ? 'blue' : 'gray'}
                />
                <Text fz="sm" w={20} ta="right">
                  {item.count}
                </Text>
              </Group>
            ))}
          </Stack>

          <Group gap="xs">
            {[5, 4, 3, 2, 1].map((stars) => (
              <Button 
                key={stars} 
                variant="outline" 
                size="xs" 
                radius="xl"
                styles={{
                  root: {
                    borderColor: 'var(--mantine-color-gray-3)',
                    color: 'var(--mantine-color-dark-6)',
                  }
                }}
              >
                {stars} sao
              </Button>
            ))}
          </Group>
        </Box>

        {/* Right side - Filter options */}
        <Box style={{ flex: 1 }}>
          {/* You can add filter options here if needed */}
        </Box>
      </Flex>

      <Divider my="lg" />

      {/* Reviews list */}
      <Stack gap="md">
        {reviewsData.reviews.map((review) => (
          <Paper key={review.id} p="md" withBorder>
            <Group mb="xs">
              <Group>
                <Avatar src={review.avatar} radius="xl" size="md" />
                <Box>
                  <Text fw={500}>{review.author}</Text>
                  <Group gap={4}>
                    <Rating value={review.rating} readOnly size="xs" />
                    <Text fz="xs" c="dimmed">{review.date}</Text>
                  </Group>
                </Box>
              </Group>
            </Group>
            <Text fz="sm" c="dimmed">
              {review.content}
            </Text>
          </Paper>
        ))}
      </Stack>
    </Box>
              </Tabs.Panel>
            </Tabs>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }} px={16}>
            <Paper shadow="xs" p="md" withBorder>
              <Text fw={700} size="lg" mb="md" style={{ textAlign: "center" }}>
                Purchase Item
              </Text>

              <Table>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Td>Price per unit</Table.Td>
                    <Table.Td>4</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>Quantity</Table.Td>
                    <Table.Td>1</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Td>
                      <Text fw={700}>Total amount</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text fw={700}>10.000đ</Text>
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>

              <Button
                fullWidth
                color="cyan"
                leftSection={<IconShoppingCart size={18} />}
                mt="md"
              >
                Add to cart
              </Button>
            </Paper>
          </Grid.Col>
        </Grid>
        <BookCarousel />
      </Stack>
    </Container>
  );
}
