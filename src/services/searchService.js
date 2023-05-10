import * as request from '~/utils/http';
export const search = async (q, type = 'more') => {
  try {
    const res = await request.get(`users`, {
      params: {
        q,
        type,
      },
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
