import {
  Card,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

function OverviewCard({ title, number, color, icon }: any) {
  const theme = useMantineTheme();
  const colorTheme = useMantineColorScheme();

  const Icon = icon;

  return (
    <Card
      style={{
        backgroundColor:
          theme.colors[color][colorTheme.colorScheme === "dark" ? 9 : 1],
        color: colorTheme.colorScheme === "dark" ? theme.white : theme.black,
        borderRadius: '10px'
      }}
    >
      <Group>
        <Icon size={40} strokeWidth={1.25} />
        <Stack gap={2.5}>
          <Text>{title}</Text>
          <Text size="xl" fw={500}>
            {number}
          </Text>
        </Stack>
      </Group>
    </Card>
  );
}

export default OverviewCard;
