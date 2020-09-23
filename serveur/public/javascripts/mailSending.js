const send = require('gmail-send')
({
    user: 'eytanetest@gmail.com',
    pass: 'qwert613',
    to:   'eytanereal@gmail.com',
    subject: 'test subject',
});

  


function sendOrderEmail(destEmail, items) {
    var itemsHTML = ''
    items.forEach((item) => itemsHTML += '<div>' + item.name + ' ' + item.description + '</div><br>' )
    console.log(itemsHTML)
    send(
        {
            to: destEmail,
            html: itemsHTML
        },
        (error, result, fullResult) => {
            if (error) console.error(error);
            console.log(result);
    })
}
module.exports= {sendOrderEmail}