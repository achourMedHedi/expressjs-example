

module.exports = (role) => async (req, res, next) => {
    console.log('role: ', role);
    if (!req.user.role.includes(role)) {
        res.status(401).send({
            message: `unauthorized`,
            userRole: req.user.role,
            authorizedUser : role
        })
    }
    next()
}