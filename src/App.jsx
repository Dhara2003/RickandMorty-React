import React from 'react';
import ApiCall from './Components/ApiCall/ApiCall';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <h1 style={{ textAlign: 'center', color: '#f5c518', padding: '20px' }}>
          Rick and Morty Characters
        </h1>
        <hr />
        <ApiCall />
      </React.Fragment>
    </QueryClientProvider>
  );
};

export default App;
