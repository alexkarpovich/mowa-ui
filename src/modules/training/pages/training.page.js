import React from 'react';

function TrainingPage({ match }) {
  const { id } = match.params;

  return (
    <div>{id}</div>
  );
}

export default TrainingPage;
