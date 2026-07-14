const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      next(error);
    });
  };
};

// Exported both ways: most controllers do `import asyncHandler from ...`,
// healthcheck.controller.js does `import { asyncHandler } from ...` — both now work.
export default asyncHandler;
export { asyncHandler };
