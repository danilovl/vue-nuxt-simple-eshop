const jwt = require('jsonwebtoken')

// Demo credentials. Override via environment variables outside of local development.
const APP_SECRET = process.env.APP_SECRET || 'myappsecret'
const USERNAME = process.env.ADMIN_USERNAME || 'admin'
const PASSWORD = process.env.ADMIN_PASSWORD || 'admin'
const TOKEN_TTL = '1h'
const RESPONSE_DELAY_MS = 500

const AUTH_PREFIX = 'Authentication<'
const AUTH_SUFFIX = '>'

function extractToken(req) {
    const header = req.headers.authorization
    if (typeof header !== 'string' || !header.startsWith(AUTH_PREFIX) || !header.endsWith(AUTH_SUFFIX)) {
        return null
    }

    return header.substring(AUTH_PREFIX.length, header.length - AUTH_SUFFIX.length)
}

function isAuthorized(req) {
    const token = extractToken(req)
    if (!token) {
        return false
    }

    try {
        jwt.verify(token, APP_SECRET)

        return true
    } catch (err) {
        return false
    }
}

function unauthorized(res) {
    res.status(401).json({success: false})
}

/**
 * Rebuilds the order basket from the database so that prices and products
 * cannot be forged by the client. Returns null when the basket is invalid.
 */
function sanitizeBasket(db, basket) {
    if (!Array.isArray(basket) || basket.length === 0) {
        return null
    }

    const lines = []
    for (const line of basket) {
        const productId = Number(line?.product?.id)
        const quantity = Number(line?.quantity)

        if (!Number.isInteger(quantity) || quantity < 1) {
            return null
        }

        const product = db.get('products').find({id: productId}).value()
        if (!product) {
            return null
        }

        lines.push({product: {...product, price: Number(product.price)}, quantity})
    }

    return lines
}

module.exports = async function (req, res, next) {
    await new Promise(resolve => setTimeout(resolve, RESPONSE_DELAY_MS))

    const path = req.path

    if (path === '/verify-token' && req.method === 'POST') {
        res.json({success: isAuthorized(req)})

        return
    }

    if (path === '/login' && req.method === 'POST') {
        if (req.body != null && req.body.username === USERNAME && req.body.password === PASSWORD) {
            const token = jwt.sign({data: USERNAME}, APP_SECRET, {expiresIn: TOKEN_TTL})
            res.json({success: true, token: token})
        } else {
            res.json({success: false})
        }

        return
    }

    if (path.startsWith('/products') && req.method !== 'GET') {
        if (!isAuthorized(req)) {
            unauthorized(res)

            return
        }

        next()

        return
    }

    if (path.startsWith('/orders')) {
        // Placing an order is public, everything else (reading customer data,
        // changing or deleting orders) requires an administrator.
        if (path === '/orders' && req.method === 'POST') {
            const basket = sanitizeBasket(req.app.db, req.body?.basket)
            if (basket === null) {
                res.status(400).json({success: false, error: 'Invalid basket'})

                return
            }

            req.body.basket = basket
            req.body.processed = false
            delete req.body.id

            next()

            return
        }

        if (!isAuthorized(req)) {
            unauthorized(res)

            return
        }
    }

    next()
}
