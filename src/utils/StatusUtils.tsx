import { Badge } from "@mantine/core";

class StatusUtils {
  static orderStatusBadgeFragment = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge color="gray" variant="filled" size="sm">
            Pending
          </Badge>
        );
      case "PROCESSING":
        return (
          <Badge color="blue" variant="filled" size="sm">
            Processing
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge color="green" variant="filled" size="sm">
            Comlpeted
          </Badge>
        );
      case "CANCELED":
        return (
          <Badge color="red" variant="filled" size="sm">
            Canceled
          </Badge>
        );
    }
  };

  static orderPaymentStatusBadgeFragment = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "PENDING":
        return (
          <Badge color="gray" variant="filled" size="sm">
            Not paid
          </Badge>
        );
      case "COMPLETED":
        return (
          <Badge color="green" variant="filled" size="sm">
            Completed
          </Badge>
        );
      case "FAILED":
        return (
          <Badge color="red" variant="filled" size="sm">
            FAILED
          </Badge>
        );
    }
  };
}

export default StatusUtils;
