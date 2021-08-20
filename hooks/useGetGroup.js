import { useQuery, gql } from '@apollo/client';

import { GROUP_FRAGMENT } from './useGetApp';

export const GROUP_FULL_FRAGMENT = gql`
fragment GroupFullFragment on Group {
  ...GroupFragment
  telegramChats {
    id
    title
    username
    createdAt
  }
  lastMembers {
    id
    name
    avatarUrl
  }
}
${GROUP_FRAGMENT}`;

export const GET_GROUP = gql`
  query getGroup($id: ID!) {
    viewer {
      id
      group(id: $id) {
        ...GroupFullFragment
      }
    }
  }
${GROUP_FULL_FRAGMENT}`;

export default (options) => {
  return (
    useQuery(GET_GROUP, options)
  );
}
