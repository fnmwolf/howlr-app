import React, { useCallback } from 'react';
import { useTheme, Divider, Text, Button, Icon, ListItem } from '@ui-kitten/components';

import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import useSetUsersSearchCriteria from '../../hooks/useSetUsersSearchCriteria';
import { DEFAULT_USERS_SEARCH_CRITERIA } from '../../graphql/apolloClient';

import GroupMembersList from './GroupMembersList';

const GroupProfileItemLastMembers = ({ group, ...props }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [ setUsersSearchCriteria ] = useSetUsersSearchCriteria();
  const handleGoToSearch = useCallback(async () => {
    await setUsersSearchCriteria({
      variables: {
        usersSearchCriteria: {
          ...DEFAULT_USERS_SEARCH_CRITERIA,
          groupIds: [group.id]
        }
      }
    });
    navigation.navigate("Users");
  }, [group, navigation, setUsersSearchCriteria]);

  if (group.lastMembers.length === 0) {
    return (null);
  }

  return (
    <View
      {...props}
    >
      <Divider />
      <View
        style={[ styles.content, { backgroundColor: theme['background-basic-color-1'] } ]}
      >
        <Text
          appearance="hint"
          category="label"
          style={styles.label}
        >
          {`LAST MEMBERS`}
        </Text>
        <GroupMembersList
          group={group}
        />
        <Button
          appearance="outline"
          style={styles.openInSearchButton}
          onPress={handleGoToSearch}
          accessoryLeft={({ style }) => (
            <Icon name="search" style={style} />
          )}
          size="small"
        >
          OPEN IN SEARCH
        </Button>
      </View>
      <Divider />
    </View>

  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  openInSearchButton: {
    marginTop: 5
  },
  label: {
    marginBottom: 4,
    textTransform: 'uppercase'
  },
});

export default React.memo(GroupProfileItemLastMembers);
