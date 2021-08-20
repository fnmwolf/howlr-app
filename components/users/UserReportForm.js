import React from 'react';

import ReportForm from '../ReportForm';

const UserReportForm = ({
  user,
  ...props
}) => {
  return (
    <ReportForm
      subjectId={user?.id}
      subjectType="User"
      title={`Report ${user?.name}`}
      {...props}
    />
  )
}

export default React.memo(UserReportForm);
