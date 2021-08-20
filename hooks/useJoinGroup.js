import { useMutation, gql } from '@apollo/client';

import { GROUP_FULL_FRAGMENT } from './useGetGroup';

export const JOIN_GROUP = gql`
  mutation joinGroup($input: JoinGroupInput!) {
    joinGroup(input: $input) {
      group {
        ...GroupFullFragment
      }
    }
  }
${GROUP_FULL_FRAGMENT}
`;

export default (options) => {
  return (
    useMutation(JOIN_GROUP, options)
  );
}
