define([
    "skylark-appify-routers",
    "./spa"
], function(routers,spa) {
    var router = new routers.Router();

    return spa.router = router;
});
