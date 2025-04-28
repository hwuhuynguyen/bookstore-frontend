import {
  Anchor,
  Button,
  Group,
  Image,
  Stack,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { Link } from "react-router-dom";

function OrderItemRow({
  orderItem,
}: {
  orderItem: any;
  canReview: boolean;
}) {
  const theme = useMantineTheme();

  return (
    <Table.Tr key={orderItem.orderItemVariant}>
      <Table.Td>
        <Group gap="xs" style={{ flexWrap: "unset" }}>
          <Image
            radius="md"
            style={{ height: "100%", maxWidth: '100px' }}
            src={
              orderItem.orderItemVariant ||
              "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
            }
            alt={orderItem.orderItemVariant}
          />
          <Stack gap={3.5}>
            <Anchor
              component={Link}
              to={"/books/" + orderItem.orderItemVariant}
              size="sm"
            >
              {orderItem.orderItemVariant ||
                "The Great Gatsby"}
            </Anchor>
            {
              <Button
                size="xs"
                radius="md"
                variant="outline"
                style={{ width: "fit-content" }}
                disabled={orderItem.orderItemVariant}
                title={
                  orderItem.orderItemVariant
                    ? "Sản phẩm đã được bạn đánh giá"
                    : ""
                }
              >
                Review
              </Button>
            }
          </Stack>
        </Group>
      </Table.Td>
      <Table.Td style={{textAlign: 'center'}}>
        <Text size="sm">{"000000 ₫"}</Text>
      </Table.Td>
      <Table.Td style={{textAlign: 'center'}}>
        <Text size="sm">{orderItem.orderItemQuantity || 0}</Text>
      </Table.Td>
      <Table.Td style={{textAlign: 'center'}}>
        <Text fw={500} size="sm" color="blue">
          {"000000 ₫"}
        </Text>
      </Table.Td>
    </Table.Tr>
  );
}

export default OrderItemRow;
