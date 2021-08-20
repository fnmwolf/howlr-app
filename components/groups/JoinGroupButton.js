import React, { useCallback, useMemo } from 'react';
import {
  Button,
} from '@ui-kitten/components';

import useToggleGroup from '../../hooks/useToggleGroup';

import showTransactionLoader from '../../utils/showTransactionLoader';

const JoinGroupButton = ({ group, style }) => {
  const {
    join: handleJoin,
    leave: handleLeave,
    leaveLoading,
    joinLoading,
    joined,
  } = useToggleGroup({ group });

  const handleToggleGroup = useCallback(() => {
    showTransactionLoader(joined ? handleLeave : handleJoin)
  }, [joined, handleLeave, handleJoin]);

  if (joined) {
    return (
      <Button
        style={style}
        onPress={handleToggleGroup}
        disabled={leaveLoading}
        status="danger"
      >
        LEAVE GROUP
      </Button>
    );
  }

  return (
    <Button
      style={style}
      onPress={handleToggleGroup}
      disabled={joinLoading}
    >
      JOIN GROUP
    </Button>
  );
}

export default React.memo(JoinGroupButton);
