/**
 * Kamaal Admin Panel — Vercel Serverless Secure API Gateway / Proxy
 * Routes verified administrative calls to the authoritative Kamaal backend
 */

const express = require('express');
const cors = require('cors');

const app = express();
const BACKEND_BASE = (process.env.BACKEND_API_URL || 'https://kammal.vercel.app').replace(/\/+$/, '');

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Allowed endpoints whitelist to prevent arbitrary proxy forwarding
const ALLOWED_ENDPOINTS = [
    '/api/admin/login',
    '/api/admin/logout',
    '/api/admin/telemetry',
    '/api/admin/users',
    '/api/admin/user/update',
    '/api/admin/transactions',
    '/api/admin/payments/list',
    '/api/admin/payments/review',
    '/api/admin/keys/list',
    '/api/admin/keys/create',
    '/api/admin/chat/broadcast',
    '/api/admin/chat/send-direct',
    '/api/admin/config/update',
    '/api/app/config',
    '/api/app-config',
    '/api/app/status',
    '/api/config/kythera',
    '/api/ai/system-prompt',
    '/api/health'
];

app.all('/api/*', async (req, res) => {
    const endpoint = req.path;
    
    // Check if the requested route is on the whitelist
    const isAllowed = ALLOWED_ENDPOINTS.some(allowed => endpoint.startsWith(allowed));
    if (!isAllowed) {
        return res.status(403).json({ success: false, error: 'Endpoint not permitted by gateway proxy whitelist.' });
    }

    const targetUrl = `${BACKEND_BASE}${req.originalUrl}`;

    try {
        const headers = {
            'Content-Type': req.headers['content-type'] || 'application/json',
            'Accept': 'application/json'
        };

        if (req.headers['authorization']) {
            headers['Authorization'] = req.headers['authorization'];
        }
        if (req.headers['x-admin-key']) {
            headers['x-admin-key'] = req.headers['x-admin-key'];
        }

        const fetchOptions = {
            method: req.method,
            headers
        };

        if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body && Object.keys(req.body).length > 0) {
            fetchOptions.body = JSON.stringify(req.body);
        }

        const backendResponse = await fetch(targetUrl, fetchOptions);
        const data = await backendResponse.json().catch(() => null);

        if (!data) {
            return res.status(backendResponse.status).send(await backendResponse.text());
        }

        return res.status(backendResponse.status).json(data);
    } catch (err) {
        return res.status(502).json({
            success: false,
            error: 'Backend Gateway Connection Failure: ' + err.message,
            targetUrl
        });
    }
});

// For local testing
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Kamaal Admin Gateway listening on port ${PORT} -> Proxying to ${BACKEND_BASE}`);
    });
}

module.exports = app;
