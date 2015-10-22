var page = require('webpage').create();
page.paperSize = {
    width: '12in',
    height: '11in'

}
page.open('http://localhost:3000', function(status) {
    console.log("Status: " + status);
    if (status === "success") {
        page.render('public/invoice/item.pdf');
    }
    phantom.exit();
});