import React, { useMemo } from 'react';

import useApp from '../../hooks/useApp';
import ProfileNoteList from '../ProfileNoteList';

const GroupProfileNoteCategory = ({ group, ...props }) => {
  const { groupCategories } = useApp();

  const groupCategory = useMemo(() => (
    groupCategories.find(({ id }) => id === group?.groupCategoryId)
  ), [group, groupCategories]);

  return (
    <ProfileNoteList
      value={[groupCategory?.label]}
      iconName="info"
      numberOfLines={1}
      {...props}
    />
  );
}

export default React.memo(GroupProfileNoteCategory);
