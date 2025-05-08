import React from 'react';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

class NotifyUtils {
  static simple = (message: React.ReactNode) => {
    showNotification({
      title: 'Notification',
      message: message,
      autoClose: 3000,
    });
  };

  static simpleSuccess = (message: React.ReactNode) => {
    showNotification({
      title: 'Notification',
      message: message,
      autoClose: 3000,
      icon: <IconCheck size={18}/>,
      color: 'teal',
    });
  };

  static simpleFailed = (message: React.ReactNode) => {
    showNotification({
      title: 'Notification',
      message: message,
      autoClose: 3000,
      icon: <IconX size={18}/>,
      color: 'red',
    });
  };
}

export default NotifyUtils;
