const handleErrors = (res: Response): Response => {
  if (!res.ok) {
    throw new Error(`Loading error occured (code: ${res.status})`);
  }
  if (!res.headers.get('Content-Type')?.includes('application/json')) {
    throw new Error('Invalid content-type in response');
  }
  return res;
};

export const fetchData = async (baseUrl: string, requestInit?: RequestInit) => {
  try {
    const res = handleErrors(await fetch(baseUrl, requestInit));
    return await res.json();
  } catch (error) {
    throw error;
  }
};
