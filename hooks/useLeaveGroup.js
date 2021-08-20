import { useMutation, gql } from '@apollo/client';

import { GROUP_FULL_FRAGMENT } from './useGetGroup';

export const LEAVE_GROUP = gql`
  mutation leaveGroup($input: LeaveGroupInput!) {
    leaveGroup(input: $input) {
      group {
        ...GroupFullFragment
      }
    }
  }
${GROUP_FULL_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(LEAVE_GROUP, options)
  );
}
