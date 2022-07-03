var http = require("http");
var fs = require("fs");
var qs = require("querystring")
var bp
var Datastore = require('nedb')
var formidable = require("formidable")
var users = []
var pionki = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
]


function servres(req, res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        // console.log("data: " + data)
        allData += data;
    })


    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        finish = qs.parse(allData)

        //console.log(finish)
        switch (finish.action) {
            case "ADD_USER":
                if (users.length < 2 && users.indexOf(finish.user) == -1) {
                    users.push(finish.user)
                    finish = {
                        resoult: true,
                        comment: "User added",
                        users: users
                    }
                } else if (users.length < 2) {
                    finish = {
                        resoult: false,
                        comment: "User alredy exist"
                    }
                } else if (users.indexOf(finish.user) == -1) {
                    finish = {
                        resoult: false,
                        comment: "There are two players alredy"
                    }
                } else {
                    finish = {
                        resoult: false,
                        comment: "There are two players alredy"
                    }
                }
                break;
            case "RESET":
                users = []
                pionki = [
                    [0, 2, 0, 2, 0, 2, 0, 2],
                    [2, 0, 2, 0, 2, 0, 2, 0],
                    [0, 2, 0, 2, 0, 2, 0, 2],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1],
                    [1, 0, 1, 0, 1, 0, 1, 0]
                ]
                break;
        }
        res.end(JSON.stringify(finish))







    })
}

function wait(req, res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        // console.log("data: " + data)
        allData += data;
    })


    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        finish = qs.parse(allData)
        finish = users
        res.end(JSON.stringify(finish))
    })
}

function move(req, res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        // console.log("data: " + data)
        allData += data;
    })


    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        finish = qs.parse(allData)

        if (finish.x != JSON.stringify(pionki)) {
            finish = JSON.parse(finish.x)
            // console.table(finish)
            // console.table(pionki)
            res.end(JSON.stringify(pionki))
        }


    })
}

function zmiana(req, res) {
    var allData = "";

    //kiedy przychodzą dane POSTEM, w postaci pakietów,
    //łącza się po kolei do jednej zmiennej "allData"
    // w poniższej funkcji nic nie modyfikujemy

    req.on("data", function (data) {
        // console.log("data: " + data)
        allData += data;
    })


    //kiedy przyjdą już wszystkie dane
    //parsujemy je do obiektu "finish"
    //i odsyłamy do przeglądarki

    req.on("end", function (data) {
        finish = qs.parse(allData)
        if (finish.x != JSON.stringify(pionki)) {
            pionki = JSON.parse(finish.x)
            // console.log(pionki)
        }
    })
}
var server = http.createServer(function (req, res) {
    //console.log(req.url)

    // console.log(req.method) // zauważ ze przesyłane po kliknięciu butona dane, będą typu POST

    switch (req.method) {
        case "GET":


            // tu wykonaj załadowanie statycznej strony z formularzem




            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'text/css'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/main.js") {
                fs.readFile("static/main.js", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/Ui.js") {
                fs.readFile("static/Ui.js", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/Net.js") {
                fs.readFile("static/Net.js", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/three.js") {
                fs.readFile("static/three.js", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/game.js") {
                fs.readFile("static/game.js", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url === "/Pionek.js") {
                fs.readFile("static/Pionek.js", function (error, data) {
                    res.writeHead(200, {
                        'Content-Type': 'application/javascript'
                    });
                    res.write(data);
                    res.end();
                })
            } else if (req.url.indexOf(".jpg") != -1) {
                // console.log("Muzyka:" + decodeURI(req.url))
                fs.readFile(__dirname + "/static/" + decodeURI(req.url), function (error, data) {

                    res.writeHead(200, {
                        "Content-type": "application/javascript"
                    });
                    res.write(data);
                    res.end();
                })
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.write("error");
                res.end();
            }



            break;
        case "POST":
            // wywołanie funkcji "servres", która pobierze dane przesłane 
            // w formularzu i odpowie do przeglądarki 
            // (uwaga - adres żądania się nie zmienia)
            if (req.url === "/action")
                servres(req, res)
            else if (req.url === "/wait")
                wait(req, res)
            else if (req.url === "/move")
                move(req, res)
            else if (req.url === "/zmiana")
                zmiana(req, res)

    }

})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});