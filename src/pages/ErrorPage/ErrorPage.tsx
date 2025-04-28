import React from "react";
import { Button, Center, Container, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <main>
      <Container size="xl">
        <Stack gap="xl" style={{ textAlign: "center" }}>
          <Text
            fw={700}
            color="dimmed"
            style={{
              fontSize: 120,
            }}
          >
            404
          </Text>
          <Title>Sorry, we couldn't find this page.</Title>
          <Center>
            <Button component={Link} to="/" color="blue" size="md" radius="md">
              Back to home
            </Button>
          </Center>
        </Stack>
      </Container>
    </main>
  );
}

export default ErrorPage;
