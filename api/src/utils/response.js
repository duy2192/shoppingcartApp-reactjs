export const success = (res, data, pagination) => {
  return res.status(200).json({
    message: 'OK',
    statusCode: 200,
    success: true,
    results: data,
    pagination: pagination,
  });
};

export const failed = (res, msg, status = 500) => {
  return res.status(status).json({
    message: msg,
    statusCode: status,
    success: false,
  });
};

export const done = (res, msg = 'Success!') => {
  return res.status(200).json({
    message: msg,
    statusCode: 200,
    success: true,
  });
};
