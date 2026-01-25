import React, { useState } from 'react';
import OldOS from './OldOS.jsx';
import NewOS from './update.jsx';

const App = () => {
  const [version, setVersion] = useState('old'); // 'old' | 'new'

  if (version === 'new') {
    return <NewOS />;
  }

  return (
    <OldOS
      onUpdateStart={() => setVersion('new')}
    />
  );
};

export default App;