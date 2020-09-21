const router = require('express').Router();
const clientRoutes = require('./client.routes');
const usersRoutes = require('./users.routes');

module.exports = router;

router.use(clientRoutes);
router.use(usersRoutes)

// API error handlers (API routes must be registered before this)
useAPIErrorHandlers(router);

function useAPIErrorHandlers(router) {
    // Handle API 404
    router.use('/api/*', (req, res, next) => {
        console.log('routes index error' + JSON.stringify(res.error, null, '\t'));
        res.sendStatus(404);
    });

    // Handle API 500
    router.use((err, req, res, next) => {
        // If the error object doesn't exists
        console.log('error in routes/index.js');

        if (!err) {
            return next();
        }

        // Log it
        console.error(err.message);
        console.log('stack error');
        console.error(err.stack);

        // Redirect to error page
        res.sendStatus(500);
    });
}
