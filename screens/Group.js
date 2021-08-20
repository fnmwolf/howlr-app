import React, { useMemo, useState, useCallback } from 'react';
import { View, StyleSheet, Animated, Platform } from 'react-native';
import { Divider, Text, useTheme } from '@ui-kitten/components';

import ScreenTopNavigation from '../components/ScreenTopNavigation';

import EventLoader from '../components/events/EventLoader';
import useGetGroup from '../hooks/useGetGroup';

import GroupHeader from '../components/groups/GroupHeader';
import JoinGroupButton from '../components/groups/JoinGroupButton';
import GroupProfileNoteUsersCount from '../components/groups/GroupProfileNoteUsersCount';
import GroupProfileNoteCategory from '../components/groups/GroupProfileNoteCategory';
import GroupProfileItemLastMembers from '../components/groups/GroupProfileItemLastMembers';
import GroupProfileItemTelegramChats from '../components/groups/GroupProfileItemTelegramChats';

const Group = ({ route: { params: { id } }}) => {
  const { data: groupData } = useGetGroup({
    variables: { id }
  });
  const group = groupData?.viewer?.group;

  const theme = useTheme();

  const [ scrollY ] = useState(new Animated.Value(0));

  const navigationDefaultTitleOpacity =
    scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

  const navigationUserNameTitleOpacity =
    scrollY.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

  return (
    <>
      <ScreenTopNavigation
        title={({ style, ...props }) => {
          return (
            <>
              <Animated.Text
                style={[ style, styles.headerAnimatedItems, { opacity: navigationDefaultTitleOpacity }]}
                {...props}
              >
                Groups
              </Animated.Text>
              <Animated.View
                style={[ styles.headerAnimatedItems, { opacity: navigationUserNameTitleOpacity }]}
                {...props}
              >
                <Text category="s1">{group?.name}</Text>
              </Animated.View>
            </>
          )
        }}
      />
      <Animated.ScrollView
        contentContainerStyle={Platform.OS === 'ios' ? {} : styles.scrollViewContentContainerStyle}
        contentInsetAdjustmentBehavior="automatic"
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {
          group ? (
            <>
              <View
                style={styles.headerRoot}
              >
                <GroupHeader group={group} />
                <View
                  style={styles.headerAboutSummary}
                >
                  <GroupProfileNoteCategory
                    group={group}
                    style={styles.headerAboutSummaryItem}
                  />
                  <GroupProfileNoteUsersCount
                    group={group}
                    style={styles.headerAboutSummaryItem}
                  />
                </View>
                <View
                  style={styles.headerActions}
                >
                  <JoinGroupButton
                    group={group}
                    style={styles.headerActionsItemRight}
                  />
                </View>
              </View>

              <Divider />

              <View
                style={[ styles.groupItems, { backgroundColor: theme['background-basic-color-2'] }]}
              >
                <GroupProfileItemTelegramChats
                  group={group}
                  style={styles.profileItem}
                />
                <GroupProfileItemLastMembers
                  group={group}
                  style={styles.profileItem}
                />
              </View>
            </>
          ) : (
            <EventLoader />
          )
        }
      </Animated.ScrollView>
    </>
  );
}


const styles = StyleSheet.create({
  headerRoot: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  topNavigationTitle: {
    alignItems: 'center'
  },
  description: {
    marginHorizontal: 20
  },
  headerAnimatedItems: {
    position: 'absolute'
  },
  headerAboutSummary: {
  },
  headerAboutSummaryItem: {
    marginRight: 8,
  },
  headerActions: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24,
  },
  headerActionsItemRight: {
    flex: 1,
  },
  groupItems: {
    minHeight: '100%',
    paddingTop: 20,
  },
  groupItem: {
    marginBottom: 20,
  },
  scrollViewContentContainerStyle: {
    flexGrow: 1
  },
  profileItem: {
    marginBottom: 20,
  },
})

export default React.memo(Group);
