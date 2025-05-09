import { Container, Stack, useMantineTheme } from "@mantine/core";
import HomeBanner from "../../components/HomeBanner";
// import BookCarousel from "../../components/BookCarousel";
import ClientLatestBooks from "./ClientLatestBooks";

const HomePage = () => {
  const theme = useMantineTheme();
  return (
    <main>
      <Container size="xl">
        <Stack gap={theme.spacing.lg}>
          <HomeBanner />
          <ClientLatestBooks />
          {/* <BookCarousel />
          <BookCarousel />
          <BookCarousel /> */}

          {/* <ClientHomeBanner/>
        <ClientHomeFeaturedCategories/>
        <ClientHomeLatestProducts/>
        <ClientHomeNewsletter/> */}
        </Stack>
      </Container>
    </main>
  );
};

export default HomePage;
