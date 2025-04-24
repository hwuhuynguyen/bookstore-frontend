import { Grid, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconCar, IconHeartHandshake, IconStars } from "@tabler/icons-react";
import HomeCarousel from "../HomeCarousel";

function HomeBanner() {
  const theme = useMantineTheme();
  return (
    <Grid>
      <Grid.Col span={{ lg: 7, md: 12 }}>
        <HomeCarousel />
      </Grid.Col>
      <Grid.Col span={{ lg: 5, md: 12 }}>
        <Stack>
          <Group
            py="sm"
            px="md"
            style={{
              flexDirection: "row",
              flexWrap: "unset",
              backgroundColor: theme.colors.gray[1],
              borderRadius: theme.radius.md,
            }}
          >
            <IconCar size={65} strokeWidth={1} />
            <Stack gap={theme.spacing.xs}>
              <Text size="md" fw={500}>
                Free shipping
              </Text>
              <Text size="sm">
                100% of orders are eligible for free shipping when paid in
                advance.
              </Text>
            </Stack>
          </Group>
          <Group
            py="sm"
            px="md"
            style={{
              flexDirection: "row",
              flexWrap: "unset",
              backgroundColor: theme.colors.gray[1],
              borderRadius: theme.radius.md,
            }}
          >
            <IconStars size={65} strokeWidth={1} />
            <Stack gap={theme.spacing.xs}>
              <Text size="md" fw={500}>
                Dedicated warranty
              </Text>
              <Text size="sm">
                The company is always committed to supporting customers to the very end.
              </Text>
            </Stack>
          </Group>
          <Group
            py="sm"
            px="md"
            style={{
              flexDirection: "row",
              flexWrap: "unset",
              backgroundColor: theme.colors.gray[1],
              borderRadius: theme.radius.md,
            }}
          >
            <IconHeartHandshake size={65} strokeWidth={1} />
            <Stack gap={theme.spacing.xs}>
              <Text size="md" fw={500}>
                1-to-1 exchange or refund
              </Text>
              <Text size="sm">If any defects arise</Text>
            </Stack>
          </Group>
        </Stack>
      </Grid.Col>
    </Grid>
  );
}

export default HomeBanner;
