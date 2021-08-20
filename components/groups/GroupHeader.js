import React from 'react';

import ResponsiveLayout from '../ResponsiveLayout';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const GroupHeader = ({ group }) => {
  return (
    <ResponsiveLayout grow={false} background="background-basic-color-1">
      <View
        style={styles.headerRoot}
      >
        <Text
          category="h2"
        >
          {group.name}
        </Text>
      </View>
    </ResponsiveLayout>
  )
}


const styles = StyleSheet.create({
  headerRoot: {
    paddingHorizontal: 20,
    paddingBottom: 6,
  },
});


export default React.memo(GroupHeader);
