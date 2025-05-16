import { Anchor, Button, Group, Image, Stack, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { WishlistResponse } from "../../models/Wishlist";
import DateUtils from "../../utils/DateUtils";
import ApplicationConstants from "../../constants/ApplicationConstants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FetchUtils from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";
import NotifyUtils from "../../utils/NotifyUtils";

interface WishCardProps {
  wish: WishlistResponse;
}

function WishCard({ wish }: WishCardProps) {
  const queryClient = useQueryClient();
  const removeItemMutation = useMutation({
    mutationFn: (bookId: string) =>
      FetchUtils.deleteWithToken(
        `${ResourceURL.WISHLIST_BASE}/book/${bookId}`,
        {}
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-api", "wishlist", "getWishlist"],
      });
      NotifyUtils.simpleSuccess(
        "This book is removed from wishlist successfully."
      );
    },
  });

  const handleRemoveItemFromWishlist = (bookId: string) => {
    removeItemMutation.mutate(bookId);
  };
  return (
    <Group justify="space-between">
      <Group>
        <Image
          src={
            wish.book?.imageUrl || ApplicationConstants.DEFAULT_THUMBNAIL_URL
          }
          radius="md"
          style={{ width: "55px" }}
          alt={wish.book?.title}
          onError={(e) => {
            e.currentTarget.src = ApplicationConstants.DEFAULT_THUMBNAIL_URL;
          }}
        />
        <Stack gap={3.5}>
          <Anchor component={Link} to={"/book/" + wish.book.slug} fw={500}>
            {wish.book.title}
          </Anchor>
          <Text size="sm" color="dimmed">
            Added to list at {DateUtils.convertTimestampToUTC(wish.createdAt)}
          </Text>
        </Stack>
      </Group>
      <Button
        variant="outline"
        color="red"
        leftSection={<IconTrash size={18} strokeWidth={1.5} />}
        onClick={() => handleRemoveItemFromWishlist(wish.book.id)}
      >
        Remove
      </Button>
    </Group>
  );
}

export default WishCard;
