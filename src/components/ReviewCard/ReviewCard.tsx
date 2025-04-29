import {
  Anchor,
  Badge,
  Blockquote,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconStar, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function ReviewCard({ review }: { review: any }) {
  const theme = useMantineTheme();

  return (
    <Card p="sm" radius="md">
      <Stack gap={3.5}>
        <Group justify="space-between">
          <Group>
            <Group gap="xs">
              <Image
                radius="md"
                style={{ width: "24px" }}
                src={
                  review.reviewProduct ||
                  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                }
                alt={review.reviewProduct}
              />
              <Anchor
                component={Link}
                to={"/book/" + review.reviewProduct}
                fw={500}
                size="sm"
              >
                {review.reviewProduct || "The Great Gatsby"}
              </Anchor>
            </Group>

            <Text size="sm" color="dimmed">
              {"20/04/2025"}
            </Text>

            <Group gap={5}>
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <IconStar
                    key={index}
                    color={
                      index < review.reviewRatingScore
                        ? theme.colors.yellow[5]
                        : theme.colors.gray[5]
                    }
                    fill={
                      index < review.reviewRatingScore
                        ? theme.colors.yellow[5]
                        : theme.colors.gray[5]
                    }
                    size={14}
                  />
                ))}
            </Group>
          </Group>

          <Button variant="outline" color="red">
            <IconTrash size={16} strokeWidth={1.5} />
          </Button>
        </Group>

        <Blockquote
          color={
            review.reviewStatus === 1
              ? "gray"
              : review.reviewStatus === 2
              ? "teal"
              : "pink"
          }
          style={{ fontSize: theme.fontSizes.sm }}
        >
          {review.reviewContent ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"}
        </Blockquote>
      </Stack>
    </Card>
  );
}

export default ReviewCard;
