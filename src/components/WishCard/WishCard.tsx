import { Anchor, Button, Group, Image, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";

function WishCard({ wish }: { wish: any }) {
  return (
    <Group justify="space-between">
      <Group>
        <Image
          radius="md"
          style={{width: '55px'}}
          src={wish.productThumbnail || "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}
          alt={wish.productName}
        />
        <Stack gap={3.5}>
          <Anchor
            component={Link}
            to={"/product/" + wish.productSlug}
            fw={500}
          >
            {wish.title || "The Great Gatsby"}
          </Anchor>
          <Text size="sm" color="dimmed">
            Added to list at {"20/04/2025"}
          </Text>
        </Stack>
      </Group>
      <Button
        variant="outline"
        color="red"
        leftSection={<IconTrash size={18} strokeWidth={1.5} />}
      >
        Remove
      </Button>
    </Group>
  );
}

export default WishCard;
