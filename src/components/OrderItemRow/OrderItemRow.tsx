import {
  Anchor,
  Button,
  Group,
  Image,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { Link } from "react-router-dom";
import ApplicationConstants from "../../constants/ApplicationConstants";
import { OrderItemResponse } from "../../models/Order";
import NumberUtils from "../../utils/NumberUtils";

interface OrderItemRowProps {
  orderItem: OrderItemResponse;
  canReview: boolean;
}

function OrderItemRow({ orderItem, canReview }: OrderItemRowProps) {
  return (
    <Table.Tr key={orderItem.id}>
      <Table.Td>
        <Group gap="xs" style={{ flexWrap: "unset" }}>
          <Image
            radius="md"
            style={{ height: "100%", maxWidth: "100px" }}
            src={
              orderItem.book?.imageUrl ||
              ApplicationConstants.DEFAULT_THUMBNAIL_URL
            }
            alt={orderItem.book?.title}
            onError={(e) => {
              e.currentTarget.src = ApplicationConstants.DEFAULT_THUMBNAIL_URL;
            }}
          />
          <Stack gap={3.5}>
            <Anchor
              component={Link}
              to={"/books/" + orderItem.book.slug}
              size="sm"
            >
              {orderItem.book.title}
            </Anchor>
            {
              <Button
                size="xs"
                radius="md"
                variant="outline"
                style={{ width: "fit-content" }}
                disabled={!canReview}
                title={!canReview ? "This book has already been reviewed" : ""}
              >
                Review
              </Button>
            }
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td style={{ textAlign: "center" }}>
        <Text size="sm">
          {NumberUtils.formatCurrency(orderItem.pricePerUnit)}
        </Text>
      </Table.Td>
      <Table.Td style={{ textAlign: "center" }}>
        <Text size="sm">{orderItem.quantity || 0}</Text>
      </Table.Td>
      <Table.Td style={{ textAlign: "center" }}>
        <Text fw={500} size="sm" color="blue">
          {NumberUtils.formatCurrency(orderItem.subtotal)}
        </Text>
      </Table.Td>
    </Table.Tr>
  );
}

export default OrderItemRow;
