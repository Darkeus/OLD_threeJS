class Ui {
    constructor() {

        this.gen()
    }
    gen() {
        $("body").append($("<div></div>").attr("id", "log"))
        $("#log")
            .append($("<input type='text'>").attr("id", "user"))
            .append($("<div></div>").text("Zaloguj").on("click", function () {
                net.Akcja("ADD_USER", $("#user").val())
            }))
            .append($("<div></div>").text("RESET").on("click", function () {
                net.Akcja("RESET")
            }))
        
        
    }
}