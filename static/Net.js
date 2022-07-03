class Net {
    constructor(action, user) {


    }


    Akcja(a, u) {
        $.ajax({
            url: "/action",
            data: {
                action: a,
                user: u
            },
            type: "POST",
            success: function (data) {


                //czytamy odesłane z serwera dane
                var obj = JSON.parse(data)
                $("#e").text(obj.comment)
                // console.log(obj.users)
                if (obj.resoult) {
                    //console.log("true")
                    if (obj.users.length == 1) {
                        game.kamera(200, 35, "blue")
                        net.wait()
                    } else {
                        game.kamera(-120, 35, "red")
                        net.Move()
                    }
                    $("#log").remove()
                }








            },
            error: function (xhr, status, error) {
                console.log(error);
            },

        })

        // tutaj wysłanie danych ajaxem na serwer
    }

    wait() {
        $("#e").text("Oczekiwanie na drugiego gracza")
        var interval = setInterval(function () {
            //console.log("czekam")
            $.ajax({
                url: "/wait",
                data: {},
                type: "POST",
                success: function (data) {
                    //czytamy odesłane z serwera dane
                    var obj = JSON.parse(data)
                    if (obj.length == 2) {
                        clearInterval(interval)
                        $("#e").text("Gracz " + obj[1] + " dołączył do gry!")
                        net.Move()
                    }



                },
                error: function (xhr, status, error) {
                    console.log(error);
                },
            })
        }, 500)
    }
    Move() {

        setInterval(function () {
            console.log("Move!")
            $.ajax({
                url: "/move",
                data: {
                    x: JSON.stringify(game.pionki)
                },
                type: "POST",
                success: function (data) {


                    //czytamy odesłane z serwera dane
                    var obj = JSON.parse(data)




                    if (JSON.stringify(game.pionki) != (data)) {
                        game.pionki = obj
                        console.table(game.pionki)
                        console.table(game.pionki)
                        game.Generate()
                    }




                    //tu wypisz sumę w div-ie na stronie


                    //console.log()




                },
                error: function (xhr, status, error) {
                    console.log(error);
                },

            })
        }, 3000)
    }
    Ruch() {
        console.table(game.pionki)
        $.ajax({
            url: "/zmiana",
            data: {
                x: JSON.stringify(game.pionki)
            },
            type: "POST",
            success: function (data) {


                //czytamy odesłane z serwera dane
                var obj = JSON.parse(data)

                obj = JSON.parse(obj.x)
                //console.log(obj)
                game.pionki = obj
                game.Generate()



                //tu wypisz sumę w div-ie na stronie


                //console.log()




            },
            error: function (xhr, status, error) {
                console.log(error);
            },

        })
    }

}