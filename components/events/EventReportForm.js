import React from 'react';

import ReportForm from '../ReportForm';

const EventReportForm = ({
  event,
  ...props
}) => {
  return (
    <ReportForm
      subjectId={event.id}
      subjectType="Event"
      title="Report event"
      {...props}
    />
  )
}
export default React.memo(EventReportForm);
