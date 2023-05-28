import { useState } from 'react';

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const load = async (promise: Promise<unknown>) => {
    setLoading(true);
    await promise;
    setLoading(false);
  };

  return { loading, load };
};

export default useLoading;
