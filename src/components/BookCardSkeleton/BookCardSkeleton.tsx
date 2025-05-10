import { Card, Group, Skeleton } from "@mantine/core";

function BookCardSkeleton() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Skeleton height={200} radius="md" />
      <Group justify="space-between" mt="md">
        <Skeleton height={20} width="70%" />
      </Group>
      <Skeleton height={24} mt="xs" width="40%" />
      <Skeleton height={48} mt="xs" />
      <Group mt="md" grow>
        <Skeleton height={36} />
        <Skeleton height={36} />
      </Group>
    </Card>
  );
}

export default BookCardSkeleton;
