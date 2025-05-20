import {
  Anchor,
  Blockquote,
  Button,
  Card,
  Group,
  Image,
  Rating,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { ReviewResponse } from "../../models/Review";
import ApplicationConstants from "../../constants/ApplicationConstants";
import DateUtils from "../../utils/DateUtils";
import NotifyUtils from "../../utils/NotifyUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FetchUtils from "../../utils/FetchUtils";
import ResourceURL from "../../constants/ResourceURL";

interface ReviewCardProps {
  review: ReviewResponse;
}

function ReviewCard({ review }: ReviewCardProps) {
  const theme = useMantineTheme();
  const queryClient = useQueryClient();
  const removeItemMutation = useMutation({
    mutationFn: () =>
      FetchUtils.deleteWithToken(
        `${ResourceURL.REVIEW_BASE}/${review.id}`,
        {}
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["client-api", "reviews", "getMyReviews"],
      });
      NotifyUtils.simpleSuccess(
        "This review is removed from review list successfully."
      );
    },
  });

  const handleRemoveItemFromReviewList = () => {
    removeItemMutation.mutate();
  };
  return (
    <Card p="sm" radius="md">
      <Stack gap={3.5}>
        <Group justify="space-between">
          <Group>
            <Group gap="xs">
              <Image
                src={
                  review.book?.imageUrl ||
                  ApplicationConstants.DEFAULT_THUMBNAIL_URL
                }
                radius="md"
                style={{ width: "24px" }}
                alt={review.book?.title}
                onError={(e) => {
                  e.currentTarget.src =
                    ApplicationConstants.DEFAULT_THUMBNAIL_URL;
                }}
              />
              <Anchor
                component={Link}
                to={"/book/" + review.book.slug}
                fw={500}
                size="sm"
              >
                {review.book.title}
              </Anchor>
            </Group>

            <Text size="sm" color="dimmed">
              {DateUtils.convertTimestampToUTC(review.updatedAt)}
            </Text>

            <Group gap={5}>
              <Rating value={review?.rating} fractions={2} readOnly size="xs" />
            </Group>
          </Group>

          <Button
            variant="subtle"
            color="red"
            onClick={handleRemoveItemFromReviewList}
          >
            <IconTrash size={16} strokeWidth={1.5} />
          </Button>
        </Group>

        <Blockquote
          color={
            review.rating < 3 ? "pink" : review.rating > 3 ? "teal" : "gray"
          }
          style={{ fontSize: theme.fontSizes.sm }}
        >
          {review.comment}
        </Blockquote>
      </Stack>
    </Card>
  );
}

export default ReviewCard;
