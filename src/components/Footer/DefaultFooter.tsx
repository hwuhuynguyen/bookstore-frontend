import React from 'react';
import {
  Anchor,
  Container,
  Grid,
  Stack,
  Text,
  useMantineTheme
} from '@mantine/core';
import { Link } from 'react-router-dom';
import AppLogo from '../AppLogo';
import classes from './DefaultFooter.module.css'

function DefaultFooter() {
  const theme = useMantineTheme();

  return (
    <footer className={classes.footer}>
      <Container size="xl">
        <Grid>
          <Grid.Col span={{base: 12, sm: 6}}>
            <Stack gap={theme.spacing.lg}>
              <AppLogo/>
              <Stack gap={theme.spacing.xs} align='center'>
                <Text fw={500}>Author name</Text>
                <Text>Nguyen Huu Huy</Text>
              </Stack>
                <Stack gap={theme.spacing.xs} align='center'>
                    <Text fw={500}>Contact address</Text>
                    <Text>University of Science and Technology - University of Danang</Text>
                    <Text>54 Nguyen Luong Bang, Hoa Khanh Bac, Da Nang City</Text>
                </Stack>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{base: 12, sm: 6}}>
            <Grid>
              <Grid.Col span={{sm: 6}} className={classes.footerLinks}>
                <Stack align='center'>
                  <Text fw={500}>Customer Support</Text>
                  <Stack gap={theme.spacing.xs} align='center'>
                    <Anchor component={Link} to="/">FAQs</Anchor>
                    <Anchor component={Link} to="/">Order Guide</Anchor>
                    <Anchor component={Link} to="/">Shipping Methods</Anchor>
                    <Anchor component={Link} to="/">Return Policy</Anchor>
                    <Anchor component={Link} to="/">Payment Policy</Anchor>
                    <Anchor component={Link} to="/">Complaint Resolution</Anchor>
                    <Anchor component={Link} to="/">Privacy Policy</Anchor>
                  </Stack>
                </Stack>
              </Grid.Col>
              <Grid.Col span={{sm: 6}} className={classes.footerLinks}>
                <Stack justify="space-between" style={{ height: '100%' }} align='center'>
                  <Stack align='center'>
                    <Text fw={500}>About Us</Text>
                    <Stack gap={theme.spacing.xs} align='center'>
                      <Anchor component={Link} to="/">About the Company</Anchor>
                      <Anchor component={Link} to="/">Careers</Anchor>
                      <Anchor component={Link} to="/">Partnerships</Anchor>
                      <Anchor component={Link} to="/">Contact Sales</Anchor>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>
      </Container>
    </footer>
  );
}

export default React.memo(DefaultFooter);
