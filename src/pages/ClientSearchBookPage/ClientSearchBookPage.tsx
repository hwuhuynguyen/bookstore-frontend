import { Card, Checkbox, Container, Grid, Group,  Radio, RadioGroup, Skeleton, Stack, Text, Title, useMantineTheme } from '@mantine/core';
import { IconAlertTriangle, IconArrowsDownUp, IconChartCandle, IconMarquee } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';

function ClientSearchBookPage() {
  const theme = useMantineTheme();

  const searchQuery = new URLSearchParams(useLocation().search).get('q');

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
  let resultFragment;

  if (isLoadingProductResponses) {
    resultFragment = (
      <Stack>
        {Array(5).fill(0).map((_, index) => (
          <Skeleton key={index} height={50} radius="md"/>
        ))}
      </Stack>
    );
  }

  if (isErrorProductResponses) {
    resultFragment = (
      <Stack my={theme.spacing.xl} style={{ alignItems: 'center', color: theme.colors.pink[6] }}>
        <IconAlertTriangle size={125} strokeWidth={1}/>
        <Text size="xl" fw={500}>Đã có lỗi xảy ra</Text>
      </Stack>
    );
  }

  if (products && products === 0) {
    resultFragment = (
      <Stack my={theme.spacing.xl} style={{ alignItems: 'center', color: theme.colors.blue[6] }}>
        <IconMarquee size={125} strokeWidth={1}/>
        <Text size="xl" fw={500}>Không có sản phẩm</Text>
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
            <Text component="span" fw={500}>Trang {activePage}</Text>
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
          <Card radius="md" shadow="sm" p="lg">
            <Title order={2}>
              Kết quả tìm kiếm cho &quot;<Text component="span" color="yellow" inherit>{searchQuery}</Text>&quot;
            </Title>
          </Card>

          <Stack gap="lg">
            <Group gap="apart">
              <Group gap="xs">
                <IconArrowsDownUp size={20}/>
                <Text fw={500} mr={theme.spacing.xs}>Sắp xếp theo</Text>
                <RadioGroup
                  value={activeSort || ''}
                  onChange={(value) => setActiveSort((value as '' | 'lowest-price' | 'highest-price') || null)}
                >
                  <Radio value="" label="Mới nhất"/>
                  <Radio value="lowest-price" label="Giá thấp → cao"/>
                  <Radio value="highest-price" label="Giá cao → thấp"/>
                </RadioGroup>
              </Group>
              <Text>{0} sản phẩm</Text>
            </Group>

            <Group gap="xs">
              <IconChartCandle size={20}/>
              <Text fw={500} mr={theme.spacing.xs}>Lọc theo</Text>
              <Checkbox
                label="Chỉ tính còn hàng"
                checked={activeSaleable}
                onChange={(event) => {
                  setActiveSaleable(event.currentTarget.checked);
                  setActivePage(1);
                }}
              />
            </Group>

            {resultFragment}
          </Stack>
        </Stack>
      </Container>
    </main>
  )
}

export default ClientSearchBookPage