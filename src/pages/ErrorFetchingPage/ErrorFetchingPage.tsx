import React from "react";
import {
  Button,
  Container,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router-dom";

function ErrorFetchingPage() {
  return (
    <main>
      <Container size="xl">
        <Stack gap="xl" style={{ textAlign: "center" }}>
          <Text
            fw={700}
            style={{
              fontSize: 120,
            }}
          >
            Oops...
          </Text>
          <Title>Error occured when fetching data</Title>
          <Group justify="center">
            <Button component={Link} to="/" variant="subtle" size="md">
              Back to homepage
            </Button>
          </Group>
        </Stack>
      </Container>
    </main>
  );
}

export default ErrorFetchingPage;
