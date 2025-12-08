export class ProductModel {
    constructor({id, nombre, precio, cantidad, imagen, esOferta}) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
        this.imagen = imagen
        this.esOferta = esOferta
    }
}