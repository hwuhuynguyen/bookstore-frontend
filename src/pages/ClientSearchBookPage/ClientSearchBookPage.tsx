import {
  Button,
  Checkbox,
  Chip,
  Container,
  Grid,
  Group,
  Radio,
  Skeleton,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import {
  IconAlertTriangle,
  IconArrowsDownUp,
  IconChartCandle,
  IconMarquee,
  IconSearch,
  IconX,
} from "@tabler/icons-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import BookGrid from "../../components/BookGrid";

const mockPriceQuartiles = [
  [0, 100000],
  [100000, 300000],
  [300000, 700000],
  [700000, 1000000],
];

function readablePriceOption([min, max]: number[]) {
  const toCurrency = (value: number) =>
    value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
  return `${toCurrency(min)} - ${toCurrency(max)}`;
}

function generatePriceOptions(quartiles: number[][]) {
  return quartiles;
}

function ClientSearchBookPage() {
  const theme = useMantineTheme();

  const searchQuery = new URLSearchParams(useLocation().search).get("q");

  const [activePage, setActivePage] = useState(1);
  const [activeSort, setActiveSort] = useState<string | null>(null);
  const [activeSaleable, setActiveSaleable] = useState(false);

  // const requestParams = {
  //   page: activePage,
  //   size: 5,
  //   filter: null,
  //   sort: activeSort,
  //   search: searchQuery,
  //   newable: true,
  //   saleable: activeSaleable,
  // };

  // const {
  //   data: productResponses,
  //   isLoading: isLoadingProductResponses,
  //   isError: isErrorProductResponses,
  // } = useQuery<ListResponse<ClientListedProductResponse>, ErrorMessage>(
  //   ['client-api', 'products', 'getAllProducts', requestParams],
  //   () => FetchUtils.get(ResourceURL.CLIENT_PRODUCT, requestParams),
  //   {
  //     onError: () => NotifyUtils.simpleFailed('Lấy dữ liệu không thành công'),
  //     refetchOnWindowFocus: false,
  //     keepPreviousData: true,
  //   }
  // );
  // const products = productResponses as ListResponse<ClientListedProductResponse>;

  const isLoadingProductResponses = true; // Replace with actual loading state
  const isErrorProductResponses = false; // Replace with actual error state
  const products = [] as unknown; // Replace with actual data

  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
  };


  let resultFragment;

  if (isLoadingProductResponses) {
    resultFragment = (
      <Stack>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} height={50} radius="md" />
          ))}
      </Stack>
    );
  }

  if (isErrorProductResponses) {
    resultFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.pink[6] }}
      >
        <IconAlertTriangle size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          Đã có lỗi xảy ra
        </Text>
      </Stack>
    );
  }

  if (products && products === 0) {
    resultFragment = (
      <Stack
        my={theme.spacing.xl}
        style={{ alignItems: "center", color: theme.colors.blue[6] }}
      >
        <IconMarquee size={125} strokeWidth={1} />
        <Text size="xl" fw={500}>
          Không có sản phẩm
        </Text>
      </Stack>
    );
  }

  if (products) {
    resultFragment = (
      <>
        <Grid mt={theme.spacing.xs}>
          {/* {products.content.map((product, index) => (
            <Grid.Col key={index} span={6} sm={4} md={3}>
              <ClientProductCard product={product} search={searchQuery || ''}/>
            </Grid.Col>
          ))} */}
        </Grid>

        <Group gap="apart" mt={theme.spacing.lg}>
          {/* <Pagination
            page={activePage}
            total={products.totalPages}
            onChange={(page: number) => (page !== activePage) && setActivePage(page)}
          /> */}
          <Text>
            <Text component="span" fw={500}>
              Trang {activePage}
            </Text>
            <span> / {9}</span>
          </Text>
        </Group>
      </>
    );
  }
  return (
    <main>
      <Container size="xl">
        <Stack gap={theme.spacing.xl}>
          <Grid gutter="xl">
            <Grid.Col span={{ base: 12, md: 3 }} mb={theme.spacing.xl}>
              <Stack gap="lg">
                <Group justify="space-between">
                  <Group gap="xs">
                    <IconChartCandle />
                    <Text fw={500}>Filter</Text>
                  </Group>
                  <Button
                    variant="light"
                    color="pink"
                    radius="md"
                    size="xs"
                    leftSection={<IconX size={14} />}
                    // onClick={handleResetButton}
                    // disabled={disabledResetButton}
                  >
                    Set as default
                  </Button>
                </Group>

                <Stack>
                  <Text fw={500}>Search</Text>
                  <TextInput
                    radius="md"
                    placeholder={"What are you looking for... "}
                    leftSection={<IconSearch size={16} />}
                    value={searchQuery || ""}
                    // onChange={(event) => setSearchQuery(event.currentTarget.value || null)}
                  />
                </Stack>

                <Stack>
                  <Text fw={500}>Price</Text>
                  <Radio.Group
                    value={selectedPrice}
                    onChange={handlePriceChange}
                    name="price-filter"
                  >
                    <Group>

                    {generatePriceOptions(mockPriceQuartiles).map(
                      (priceOption, index) => {
                        const value = priceOption.join("-");
                        return (
                          <Radio
                          key={index}
                          value={value}
                          label={readablePriceOption(priceOption)}
                          />
                        );
                      }
                    )}
                    </Group>
                  </Radio.Group>
                </Stack>

                <Stack>
                  <Text fw={500}>Category</Text>
                  {/* <Radio.Group
                    value={selectedPrice}
                    onChange={handlePriceChange}
                    name="price-filter"
                  >
                    <Group>

                    {generatePriceOptions(mockPriceQuartiles).map(
                      (priceOption, index) => {
                        const value = priceOption.join("-");
                        return (
                          <Radio
                          key={index}
                          value={value}
                          label={readablePriceOption(priceOption)}
                          />
                        );
                      }
                    )}
                    </Group>
                  </Radio.Group> */}
                </Stack>

                <Stack>
                  <Text fw={500}>Customer rating</Text>
                  {/* <Chips variant="filled" multiple value={priceOptions} onChange={handlePriceOptionChips}>
                    {MiscUtils.generatePriceOptions(filter.filterPriceQuartiles).map((priceOption, index) => (
                      <Chip key={index} value={priceOption.join('-')}>
                        {MiscUtils.readablePriceOption(priceOption)}
                      </Chip>
                    ))}
                  </Chips> */}
                </Stack>

                <Stack>
                  <Text fw={500}>Source</Text>
                  {/* {false
                    ? (
                      <Chips variant="filled" multiple value={brandOptions} onChange={handleBrandChips}>
                        {filter.filterBrands.map(brand => (
                          <Chip key={brand.brandId} value={brand.brandId}>{brand.brandName}</Chip>
                        ))}
                      </Chips>
                      <></>
                    ) : <Text style={{ fontStyle: 'italic' }} color="dimmed">No options</Text>} */}
                </Stack>

                <Stack>
                  <Text fw={500}>Other</Text>
                  <Checkbox
                    label="Only in stock"
                    checked={activeSaleable}
                    onChange={(event) => console.log()}
                  />
                </Stack>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 9 }}>
              <Stack gap="lg">
                <Group gap="apart">
                  <Group gap="xs">
                    <IconArrowsDownUp size={20} />
                    <Text fw={500} mr={theme.spacing.xs}>
                      Sorted by
                    </Text>
                    <Radio.Group value={activeSort || ""}>
                      <Group>
                        <Radio value="" label="New item" />
                        <Radio value="lowest-price" label="Price low to high" />
                        <Radio
                          value="highest-price"
                          label="Price high to low"
                        />
                        <Radio value="highest-price" label="Best seller" />
                      </Group>
                    </Radio.Group>
                  </Group>
                </Group>
                <BookGrid />
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </Container>
    </main>
  );
}

export default ClientSearchBookPage;
