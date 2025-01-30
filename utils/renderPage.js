function renderPage(req, res, authenticatedPage, unauthenticatedPage){
    if(req.user){
        res.render(authenticatedPage)
    } else {
        res.render(unauthenticatedPage)
    }
}

module.exports = renderPage