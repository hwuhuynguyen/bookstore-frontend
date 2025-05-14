import { Badge } from "@mantine/core";

class StatusUtils {
  static orderStatusBadgeFragment = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge color="yellow" variant="filled">
            Pending
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge color="blue" variant="filled">
            Processing
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge color="green" variant="filled">
            Completed
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge color="grape" variant="filled">
            Cancelled
          </Badge>
        );
    }
  };

  static orderPaymentStatusBadgeFragment = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "PENDING":
        return (
          <Badge color="gray" variant="filled">
            Not paid
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge color="green" variant="filled">
            Paid
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge color="grape" variant="filled">
            Cancelled
          </Badge>
        );
      case "FAILED":
        return (
          <Badge color="red" variant="filled">
            Failed
          </Badge>
        );
      case "REFUNDED":
        return (
          <Badge color="orange" variant="filled">
            Refunded
          </Badge>
        );
    }
  };
}

export default StatusUtils;
