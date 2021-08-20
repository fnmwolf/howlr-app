import React from 'react';

import ProfileNoteList from '../ProfileNoteList';

import { usersCountString } from './GroupItem';

const GroupProfileNoteUsersCount = ({ group, ...props }) => {
  return (
    <ProfileNoteList
      value={[usersCountString(group.usersCount)]}
      iconName="people"
      numberOfLines={1}
      {...props}
    />
  );
}

export default React.memo(GroupProfileNoteUsersCount);
