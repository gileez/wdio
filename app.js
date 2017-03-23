var webdriverio = require('webdriverio');

function main(){

    // 0: node
	// 1: app.js
	// 2: arg1
	// 3: arg2
	// etc...
	var args = process.argv.slice(),
        url = args[2] || false;

	if (!url) {
	    console.log('Usage: node app [url]');
	    return;
    }

    // configure the driver
    var options = {
        desiredCapabilities: {
            browserName: 'chrome',
            chromeOptions: {
                args: [
                ]
            },
        }
    },
    driver = webdriverio.remote(options);

	// start working
    driver
        .init()
        .url(url)
        .getTitle()
        .then(function(ttl){
            console.log(`url: ${url}`);
            console.log(`title: ${ttl}`);
        })
        .pause(5000)
        .click('a.ui.black')
        .pause(3000)
        .then(function(){
            console.log('Popup opened...');
            driver
                .element('body.dimmed')
                .then(function(el){
                    if (el.state == 'success') {
                        // if element exists
                        console.log('confirmed - popup is open - trying to click on NOPE in 3 seconds...');
                        driver
                            .pause(3000)
                            .click('.modal.visible .button.deny')
                            .then(function(){
                                console.log('popup closed :)');
                            })
                            .catch(function(err){
                                console.log('popup not closed :(');
                            })
                            .finally(function(){
                                console.log('ENDING...');
                                driver.end();
                            })

                    }
                });
        })
        .catch(function(){
            console.log('Popup button not found... Ending.');
            driver.end();
        });
};


if (require.main === module) {
    main();
};



