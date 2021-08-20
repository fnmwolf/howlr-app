import React, { useCallback, useMemo } from 'react';
import { Text, ListItem, List } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { times, compact } from 'lodash';

import UserAvatar from '../UserAvatar';
import { useNavigation } from '@react-navigation/native';
import ThemedContentLoader from '../ThemedContentLoader';
import useViewer from '../../hooks/useViewer';

const GroupMembersListItem = ({ userId, item }) => {
  const navigation = useNavigation();

  const handleGoToUser = useCallback((user) => {
    navigation.navigate('User', { id: user.id });
  }, [navigation]);

  return (
    <ListItem
      style={styles.listItem}
      onPress={() => handleGoToUser(item)}
      title={(props) => (
        <View style={styles.item}>
          <Text {...props}>{item.name}</Text>
          {item.id === userId ? <Text category="c1" appearance="hint">Group organizer</Text> : null}
        </View>
      )}
      accessoryLeft={({ style: { height } }) => (
        <UserAvatar user={item} size={height} />
      )}
    />
  );
}

const GroupMembersList = ({
  group,
  ...props
}) => {
  const viewer = useViewer();

  const renderItem = useCallback(({ item }) => (
    <GroupMembersListItem item={item} />
  ), []);

  const keyExtractor = useCallback(({ id }) => id, []);

  return (
    <List
      data={group.lastMembers}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      refreshing={true}
      style={styles.listStyle}
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
  listItem: {
    paddingHorizontal: 0
  }
})

export default React.memo(GroupMembersList);
