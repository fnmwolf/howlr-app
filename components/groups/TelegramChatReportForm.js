import React from 'react';

import ReportForm from '../ReportForm';

const TelegramChatReportForm = ({
  telegramChat,
  ...props
}) => {
  return (
    <ReportForm
      subjectId={telegramChat.id}
      subjectType="TelegramChat"
      title="Report Telegram group"
      {...props}
    />
  )
}
export default React.memo(TelegramChatReportForm);
