const counters = { success: 0, error: 0 };

function requestLogger(req, res, next) {
  const startedAt = Date.now();
  const requestId = req.headers['x-request-id'] || `${Date.now()}-${Math.random()}`;
  res.setHeader('x-request-id', requestId);

  res.on('finish', () => {
    const durationMs = Date.now() - startedAt;
    if (res.statusCode >= 400) counters.error += 1;
    else counters.success += 1;

    console.log(JSON.stringify({
      requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs
    }));
  });

  next();
}

module.exports = { requestLogger, counters };
