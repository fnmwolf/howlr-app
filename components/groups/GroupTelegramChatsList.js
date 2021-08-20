import React, { useCallback, useState, useMemo } from 'react';
import { Text, ListItem, List, MenuItem, TopNavigationAction, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { trim, sortBy } from 'lodash';
import { format } from 'date-fns';
import AppLink from 'react-native-app-link';

import ThemedOverflowMenu from '../ThemedOverflowMenu';
import TelegramChatReportForm from './TelegramChatReportForm';

const MenuIcon = (props) => (
  <Icon {...props} name='more-vertical' />
);

const GroupTelegramChatsListItem = ({ item }) => {
  const handleToToGroup = useCallback(() => {
    AppLink.maybeOpenURL(
      `tg://resolve?domain=${item.username}`,
      {
        appName: "Telegram",
        appStoreId: "686449807",
        playStoreId: "org.telegram.messenger"
      }
    )
  }, [item.username]);

  const handleOpenMenu = useCallback(() => {
    setMenuOpen(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const renderMenuAction = useCallback(() => (
    <TopNavigationAction
      icon={MenuIcon}
      onPress={handleOpenMenu}
      style={{ marginRight: -8 }}
    />
  ), []);

  const [ menuOpen, setMenuOpen ] = useState(false);

  const [ telegramChatReportFormOpen, setTelegramChatReportFormOpen ] = useState(false);

  const handleOpenTelegramChatReportForm = useCallback(() => {
    setTelegramChatReportFormOpen(true);
    handleCloseMenu();
  }, []);

  const handleCloseTelegramChatReportForm = useCallback(() => {
    setTelegramChatReportFormOpen(false);
  }, []);

  return (
    <>
      <ListItem
        style={styles.listItem}
        onPress={handleToToGroup}
        title={({ style }) => (
          <Text style={[ style, styles.listItemText ]}>
            {trim(item.title)}
          </Text>
        )}
        description={({ style }) => (
          <Text style={[ style, styles.listItemText ]}>
            {`Added on ${format(new Date(item.createdAt), "MMM. do  Y")}`}
          </Text>
        )}
        accessoryRight={() => (
          <ThemedOverflowMenu
            anchor={renderMenuAction}
            visible={menuOpen}
            onBackdropPress={handleCloseMenu}
          >
            <MenuItem
              title='Report group'
              onPress={handleOpenTelegramChatReportForm}
            />
          </ThemedOverflowMenu>
        )}
      />
      <TelegramChatReportForm
        open={telegramChatReportFormOpen}
        onClose={handleCloseTelegramChatReportForm}
        telegramChat={item}
      />
    </>
  );
}

const GroupTelegramChatsList = ({
  group,
  ...props
}) => {
  const sortedTelegramChats = useMemo(() => (
    sortBy(
      group.telegramChats, ({ createdAt }) => (new Date(createdAt))
    )
  ), [group.telegramChats]);

  const renderItem = useCallback(({ item }) => (
    <GroupTelegramChatsListItem item={item} />
  ), []);

  const keyExtractor = useCallback(({ id }) => id, []);

  const ListEmptyComponent = useCallback(() => (
    <Text
      appearance="hint"
      category="c2"
      style={styles.emptyListMessage}
    >
      No linked groups
    </Text>
  ), []);

  return (
    <List
      data={sortedTelegramChats}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={true}
      style={styles.listStyle}
      ListEmptyComponent={ListEmptyComponent}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  listStyle: {
    backgroundColor: 'transparent'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  emptyListMessage: {
    marginVertical: 25,
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  listItem: {
    paddingHorizontal: 0,
  },
  listItemText: {
    marginLeft: 0,
  }
})

export default React.memo(GroupTelegramChatsList);
