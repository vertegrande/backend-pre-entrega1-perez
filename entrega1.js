class ProductManager {
  constructor(products) {
    this.products = products;
    this.id = 0; // Inicializar el contador de ID en 0
  }

  addProduct(product) {
    // Validar que todos los campos sean obligatorios
    if (!this._validateProduct(product)) {
      throw new Error('Todos los campos son obligatorios');
    }

    // Validar que el precio y el stock sean números positivos
    if (product.price <= 0 || product.stock <= 0) {
      throw new Error('El precio y el stock deben ser números positivos');
    }

    // Validar que no se repita el campo "code"
    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      throw new Error('El SKU de este producto ya existe');
    }

    // Asignar ID autoincrementable
    this.id++;
    product.id = this.id;

    // Sumar producto al array
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    // Validar que el ID sea un número entero positivo
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('El ID del producto debe ser un número entero positivo');
    }

    // Buscar Producto por ID
    const product = this.products.find(p => p.id === id);

    // Si no se encuentra el producto, devolver un error
    if (!product) {
      throw new Error('Producto no encontrado');
    }

    // Devolver el producto encontrado
    return product;
  }

  // Función privada para validar que los campos del producto sean válidos
  _validateProduct(product) {
    return (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    );
  }
}

// Ejemplo de uso
const productManager = new ProductManager([]);

const product1 = {
  title: 'Producto 1',
  description: 'Descripción del producto 1',
  price: 100,
  thumbnail: 'ruta/imagen1.jpg',
  code: '00001',
  stock: 12,
};

const product2 = {
  title: 'Producto 2',
  description: 'Descripción del producto 2',
  price: 200,
  thumbnail: 'ruta/imagen2.jpg',
  code: '00002',
  stock: 30,
};

// Añadir productos al gestor de productos
productManager.addProduct(product1);
productManager.addProduct(product2);

// Obtener un producto por su ID
const product = productManager.getProductById(1);

console.log(product); // Imprimir el producto con ID 1

try {
  productManager.getProductById(2); // Intentar obtener un producto con ID 2 (no existe)
} catch (error) {
  console.log(error.message); // Imprimir el mensaje de error
}
