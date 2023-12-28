export default function checkMethod(allowedMethods) {
  return (req, res, next) => {
    if (allowedMethods.includes(req.method)) {
      next();
    } else {
      res.setHeader("Allow", allowedMethods);
      res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  };
}

/* 
 Usage

 // For a route that only allows POST requests
export default chainMiddlewares([checkMethod(['POST']), middleware1, middleware2], finalHandler);

// For a route that allows both GET and POST requests
export default chainMiddlewares([checkMethod(['GET', 'POST']), middleware1, middleware2], anotherFinalHandler);
*/
