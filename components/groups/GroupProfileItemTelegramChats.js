import React, { useCallback, useState } from 'react';
import { useTheme, Divider, Text, Button, Icon, Layout, Input } from '@ui-kitten/components';
import Clipboard from '@react-native-community/clipboard';
import { trim } from 'lodash';
import { View, StyleSheet } from 'react-native';
import { showMessage } from "react-native-flash-message";

import GroupTelegramChatsList from './GroupTelegramChatsList';
import FormModal from '../FormModal';
import useApp from '../../hooks/useApp';

const HELP_POINT_SIZE = 30;

const GroupProfileItemTelegramChats = ({ group, ...props }) => {
  const theme = useTheme();

  const [ linkHelpOpen, setLinkHelpOpen ] = useState(false);

  const handleOpenLinkHelp = useCallback(async () => {
    setLinkHelpOpen(true)
  }, [setLinkHelpOpen]);

  const handleCloseLinkHelp = useCallback(async () => {
    setLinkHelpOpen(false)
  }, [setLinkHelpOpen]);

  const { name, groupBotUsername } = useApp();

  const linkMessage = `/link@${groupBotUsername} ${group.id.split('-')[0].toUpperCase()}`;
  const unlinkMessage = `/unlink@${groupBotUsername} ${group.id.split('-')[0].toUpperCase()}`;

  const hamdleCopyToClibboard = (message) => {
    Clipboard.setString(message);
    showMessage({
      message: "Copied to Clipboard",
    });
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
          {group.telegramChats.length > 0 ? `TELEGRAM GROUPS` : `NO TELEGRAM GROUPS`}
        </Text>
        {
          group.telegramChats.length > 0 && (
            <GroupTelegramChatsList
              group={group}
            />
          )
        }

        <Button
          appearance="outline"
          style={styles.openInSearchButton}
          onPress={handleOpenLinkHelp}
          size="small"
          accessoryRight={({ style }) => (
            <Icon name="question-mark-circle-outline" style={style} />
          )}
        >
          HOW TO LINK A TELEGRAM GROUP
        </Button>
      </View>
      <Divider />
      <FormModal
        saveLabel={null}
        open={linkHelpOpen}
        onCancel={handleCloseLinkHelp}
        onClose={handleCloseLinkHelp}
        cancelLabel={"Close"}
        closeOnOverlayTap
        panGestureEnabled
      >
        <Text
          category="c1"
          style={styles.description}
        >
          {`To link your group please invite @${groupBotUsername} in your group and send the following message:`}
        </Text>

        <View
          style={styles.helpPointCommandContainer}
        >
          <Input
            value={linkMessage}
            textAlign="center"
          />
          <Button
            style={styles.copyButton}
            appearance="outline"
            onPress={() => {
              hamdleCopyToClibboard(linkMessage)
            }}
          >
            COPY TO CLIPBOARD
          </Button>
        </View>


        <Text
          category="c1"
          appearance="hint"
          style={styles.description}
        >
          {trim(`
Your group must be public (please use a Lobby group if necessary.) You must also be an administrator or the owner of the group.

The ${name} group must of course be related to the Telegram group you want to link. While groups don't have to follow the same rules as ${name} does, groups hosting illegal content, hate speech, real-life abuse of animals, doxing or harassment are forbidden.
`)}
        </Text>

        <Text
          category="c1"
          appearance="hint"
          style={styles.description}
        >
          {trim(`
Once this is done you can safely remove the @${groupBotUsername} from your group. If you wish to later unlink your group, please invite the bot again and use the /unlink command with the same parameter.
`)}
        </Text>
      </FormModal>
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
  description: {
    paddingHorizontal: 5,
    marginTop: 10
  },
  helpContainer: {
    paddingVertical: 40
  },
  helpPoint: {
    alignSelf: "center",
    width: HELP_POINT_SIZE,
    height: HELP_POINT_SIZE,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: HELP_POINT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    marginRight: 10,
  },
  helpPointText: {
    // textAlign: 'center'
  },
  helpPointContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpPointCommandContainer: {
    paddingVertical: 20,
  },
  helpPointTextCommand: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingVertical: 5,
  },
  copyButton: {
    borderWidth: 0,
    marginTop: 10,
  }
});

export default React.memo(GroupProfileItemTelegramChats);
