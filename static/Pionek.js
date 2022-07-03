class Pionek extends THREE.Mesh {

    constructor( x, y, materials) {
        super() // wywołanie konstruktora klasy z której dziedziczymy czyli z Mesha
        this.geometry = new THREE.CylinderGeometry(5, 5, 2, 32)

        this.material = materials;

        this.x = x
        this.y = y

    }
    get kolor() {
        console.log("getter")
        return this._kolor
    }
}