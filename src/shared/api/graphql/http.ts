import { GraphqlResponse } from './types';
import { i18n } from '@src/shared/localization';

const handleErrors = (res: Response): Response => {
  if (res.status === 400 || res.status === 200) {
    return res;
  }
  if (!res.ok) {
    throw new Error(String(i18n.t('httpStatusCodeError', { status: res.status })));
  }
  if (!res.headers.get('Content-Type')?.includes('application/json')) {
    throw new Error(String(i18n.t('httpInvalidContentType')));
  }
  return res;
};

export const fetchData = async (
  baseUrl: string,
  requestInit?: RequestInit
): Promise<GraphqlResponse> => {
  try {
    const res = handleErrors(await fetch(baseUrl, requestInit));
    return await res.json();
  } catch (error) {
    throw error;
  }
};
