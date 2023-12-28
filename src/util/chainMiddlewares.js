export default function chainMiddlewares(middlewares, finalHandler) {
     return (req, res) => {
         const runner = (index) => {
             if (index < middlewares.length) {
                 middlewares[index](req, res, () => runner(index + 1));
             } else {
                 finalHandler(req, res);
             }
         };
         runner(0);
     };
 };
 

 /* USAGE 

 // pages/api/someEndpoint.js
import middleware1 from '../../../middleware/middleware1';
import middleware2 from '../../../middleware/middleware2';
import chainMiddlewares from '../../../lib/chainMiddlewares';

const finalHandler = async (req, res) => {
    // Your API logic here
};

export default chainMiddlewares([middleware1, middleware2], finalHandler);


 */