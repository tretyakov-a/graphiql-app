import { graphqlError } from '.';
import { GraphqlResponse } from './types';
import { i18n } from '@src/shared/localization';

const checkContentType = (res: Response, type: string) => {
  return res.headers.get('Content-Type')?.includes(type);
};

const getTextResponseError = async <T>(res: Response): Promise<GraphqlResponse<T>> => {
  const message = await res.text();
  return graphqlError(message);
};

const handleErrors = <T>(res: Response): Promise<GraphqlResponse<T>> => {
  if (res.status === 400) {
    if (checkContentType(res, 'application/json')) return res.json();

    if (checkContentType(res, 'text/html')) {
      return getTextResponseError<T>(res);
    }
  }
  if (!res.ok) {
    throw new Error(String(i18n.t('errors.httpStatusCodeError', { status: res.status })));
  }
  if (!checkContentType(res, 'application/json')) {
    throw new Error(String(i18n.t('errors.httpInvalidContentType')));
  }
  return res.json();
};

export const fetchData = async <T>(
  baseUrl: string,
  requestInit?: RequestInit
): Promise<GraphqlResponse<T>> => {
  try {
    return handleErrors<T>(await fetch(baseUrl, requestInit));
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(String(i18n.t(`errors.${error.message}`)));
    }
    throw error;
  }
};
