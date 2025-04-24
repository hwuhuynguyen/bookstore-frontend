import { Carousel } from "@mantine/carousel";
import { useMantineTheme } from "@mantine/core";

function HomeCarousel() {
  const theme = useMantineTheme();
  return (
    <Carousel withIndicators withControls loop>
      <Carousel.Slide
        style={{
          height: "100%",
          minHeight: 315,
          backgroundImage: `linear-gradient(105deg, ${theme.colors.teal[3]}, ${theme.colors.lime[3]})`,
        }}
      ></Carousel.Slide>
      <Carousel.Slide
        style={{
          height: "100%",
          minHeight: 315,
          backgroundImage: `linear-gradient(0deg, ${theme.colors.orange[3]}, ${theme.colors.red[3]})`,
        }}
      ></Carousel.Slide>
      <Carousel.Slide
        style={{
          height: "100%",
          minHeight: 315,
          backgroundImage: `linear-gradient(0deg, ${theme.colors.indigo[3]}, ${theme.colors.cyan[3]})`,
        }}
      ></Carousel.Slide>
    </Carousel>
  );
}

export default HomeCarousel;
