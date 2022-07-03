class Game {
    constructor() {
        this.board = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
        ]

        this.pionki = [
            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 2, 0, 2, 0, 2, 0, 2],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]
        ]
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45, // kąt patrzenia kamery (FOV - field of view)
            4 / 3, // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
            0.1, // minimalna renderowana odległość
            10000 // maksymalna renderowana odległość od kamery
        );
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor("grey");
        this.camera.position.set(40, 50, 145)
        this.camera.lookAt(40, 0, 40);
        $("#root").append(this.renderer.domElement)
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight); //- (window.innerHeight / 10)
        this.raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2()
        this.temp = []
        this.first = true
        this.materials = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 1,


        })

        this.Plansza()
        this.Generate()


    }












    Plansza() {
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                this.materials = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 1,

                })
                var geometry = new THREE.BoxGeometry(10, 10, 10);
                if (this.board[x][y] == 1) {
                    this.materials.map = new THREE.TextureLoader().load('ciemne.jpg')


                } else if (this.board[x][y] == 0) {
                    this.materials.map = new THREE.TextureLoader().load('block.jpg')
                }
                var cube = new THREE.Mesh(geometry, this.materials);
                cube.position.set(x * 10, 0, y * 10)
                cube.x = x
                cube.y = y
                this.scene.add(cube);
            }



        }
    }
    Generate() {
        if (this.temp.length > 0) {
            for (let index = 0; index < this.temp.length; index++) {
                game.scene.remove(this.temp[index])

            }
            this.temp = []
        }

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                this.materials = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    transparent: true,
                    opacity: 1,

                })
                if (this.pionki[x][y] != 0) {
                    if (this.pionki[x][y] == 1) {
                        this.materials.color = {
                            r: 0.99,
                            g: 1,
                            b: 1
                        }
                        this.materials.map = new THREE.TextureLoader().load('block.jpg')

                    } else if (this.pionki[x][y] == 2) {
                        this.materials.color = {
                            r: 0.98,
                            g: 1,
                            b: 1
                        }
                        this.materials.map = new THREE.TextureLoader().load('acacja.jpg')
                    }
                    //THREE.Mesh(geometry, material);
                    var cube = new Pionek(x, y, this.materials)
                    cube.position.set(x * 10, 7, y * 10)
                    this.temp.push(cube)
                    this.scene.add(cube);
                }
            }


        }
        if (this.first) {
            this.render()
            this.first = false
        }

    }

    kamera(x, y, kolor) {
        this.camera.position.set(x, 100, y)
        this.camera.lookAt(35, 10, 35);
        this.kolor = kolor
        this.Raycaster()
    }
    Raycaster() {
        var zaznaczony
        $(document).mousedown(function (event) {
            game.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
            game.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;
            game.raycaster.setFromCamera(game.mouseVector, game.camera);
            var intersects = game.raycaster.intersectObjects(game.scene.children);
            if (intersects.length > 0) {
                // console.log(intersects[0].object.x);
                // console.log(intersects[0].object.y);
                //console.log(intersects[0].object.material.map)
                if ((game.kolor == "blue" && intersects[0].object.material.color.r == 0.99) || (game.kolor == "red" && intersects[0].object.material.color.r == 0.98)) {
                    //console.log("To twoje pionki")
                    if (zaznaczony)
                        zaznaczony.material.color.b = 1
                    zaznaczony = intersects[0].object
                    zaznaczony.material.color.b = 0
                } else if (zaznaczony && intersects[0].object.material.color.r == 1 && intersects[0].object.material.color.b == 1) {
                    switch (game.kolor) {
                        case "red":
                            if (intersects[0].object.x == zaznaczony.x + 1) {
                                switch (intersects[0].object.y) {
                                    case zaznaczony.y + 1:
                                        if (game.pionki[intersects[0].object.x][intersects[0].object.y] == 0) {
                                            game.pionki[intersects[0].object.x][intersects[0].object.y] = 2
                                            game.pionki[zaznaczony.x][zaznaczony.y] = 0
                                            game.scene.remove(zaznaczony)
                                            console.table(game.pionki)
                                            net.Ruch()
                                            // game.scene.remove(zaznaczony)
                                            //console.table(game.pionki)
                                            game.Generate()
                                        }

                                        break
                                    case zaznaczony.y - 1:
                                        if (game.pionki[intersects[0].object.x][intersects[0].object.y] == 0) {

                                            game.pionki[intersects[0].object.x][intersects[0].object.y] = 2
                                            game.pionki[zaznaczony.x][zaznaczony.y] = 0
                                            game.scene.remove(zaznaczony)
                                            //console.table(game.pionki)
                                            net.Ruch()
                                            // game.scene.remove(zaznaczony)
                                            //console.table(game.pionki)
                                            game.Generate()
                                        }
                                        break
                                }
                            } else if (intersects[0].object.x == zaznaczony.x + 2) {
                                switch (intersects[0].object.y) {
                                    case zaznaczony.y + 2:
                                        if (game.pionki[intersects[0].object.x][intersects[0].object.y] == 0 && game.pionki[intersects[0].object.x - 1][intersects[0].object.y - 1] == 1) {
                                            game.pionki[intersects[0].object.x][intersects[0].object.y] = 2
                                            game.pionki[intersects[0].object.x - 1][intersects[0].object.y - 1] = 0
                                            game.pionki[zaznaczony.x][zaznaczony.y] = 0
                                            net.Ruch()
                                            game.Generate()
                                        }

                                        break
                                    case zaznaczony.y - 2:
                                        if (game.pionki[intersects[0].object.x][intersects[0].object.y] == 0 && game.pionki[intersects[0].object.x - 1][intersects[0].object.y + 1] == 1) {

                                            game.pionki[intersects[0].object.x][intersects[0].object.y] = 2
                                            game.pionki[intersects[0].object.x - 1][intersects[0].object.y + 1] = 0
                                            game.pionki[zaznaczony.x][zaznaczony.y] = 0
                                            net.Ruch()
                                            game.Generate()

                                        }
                                        break
                                }
                            }

                            case "blue":
                                if (intersects[0].object.x == zaznaczony.x - 1) {
                                    switch (intersects[0].object.y) {
                                        case zaznaczony.y + 1:
                                            if (game.pionki[intersects[0].object.x][intersects[0].object.y] == 0) {
                                                game.pionki[intersects[0].object.x][intersects[0].object.y] = 1
                                                game.pionki[zaznaczony.x][zaznaczony.y] = 0
                                                net.Ruch()
                                                // game.scene.remove(zaznaczony)
                                                //console.table(game.pionki)
                                                game.Generate()
                                            }

                                            break
                                        case zaznaczony.y - 1:
                                            if (game.pionki[intersects[0].object.x][intersects[0].object.y] == 0) {

                                                game.pionki[intersects[0].object.x][intersects[0].object.y] = 1
                                                game.pionki[zaznaczony.x][zaznaczony.y] = 0
                                                net.Ruch()
                                                // game.scene.remove(zaznaczony)
                                                //console.table(game.pionki)
                                                game.Generate()

                                            }
                                            break
                                    }
                                } else if (intersects[0].object.x == zaznaczony.x - 2) {
                                    switch (intersects[0].object.y) {
                                        case zaznaczony.y + 2:
                                            if (game.pionki[intersects[0].object.x][intersects[0].object.y] == 0 && game.pionki[intersects[0].object.x + 1][intersects[0].object.y - 1] == 2) {
                                                game.pionki[intersects[0].object.x][intersects[0].object.y] = 1
                                                game.pionki[intersects[0].object.x + 1][intersects[0].object.y - 1] = 0
                                                game.pionki[zaznaczony.x][zaznaczony.y] = 0
                                                net.Ruch()
                                                game.Generate()
                                            }

                                            break
                                        case zaznaczony.y - 2:
                                            if (game.pionki[intersects[0].object.x][intersects[0].object.y] == 0 && game.pionki[intersects[0].object.x + 1][intersects[0].object.y + 1] == 2) {

                                                game.pionki[intersects[0].object.x][intersects[0].object.y] = 1
                                                game.pionki[intersects[0].object.x + 1][intersects[0].object.y + 1] = 0
                                                game.pionki[zaznaczony.x][zaznaczony.y] = 0
                                                net.Ruch()
                                                game.Generate()

                                            }
                                            break
                                    }
                                }

                    }


                }

            }
        })
    }
    render() {


        //w tym miejscu ustalamy wszelkie zmiany w projekcie (obrót, skalę, położenie obiektów)
        //np zmieniająca się wartość rotacji obiektu

        //mesh.rotation.y += 0.01;

        //wykonywanie funkcji bez końca, ok 60 fps jeśli pozwala na to wydajność maszyny

        requestAnimationFrame(this.render.bind(this));

        // potwierdzenie w konsoli, że render się wykonuje

        //console.log("render leci")

        //ciągłe renderowanie / wyświetlanie widoku sceny naszą kamerą

        this.renderer.render(this.scene, this.camera);
    }
}