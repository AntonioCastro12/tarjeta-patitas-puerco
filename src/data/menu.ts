export interface MenuItem {
  id: number;
  category: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;
}

// Productos y precios temporales: reemplaza estos datos antes de publicar.
export const menuItems: MenuItem[] = [
  {
    id: 1,
    category: "Patitas",
    name: "Patita individual",
    description: "Producto de ejemplo — agrega aquí la presentación real.",
    price: 0,
    available: true,
  },
  {
    id: 2,
    category: "Patitas",
    name: "Orden de patitas",
    description: "Producto de ejemplo — especifica aquí el contenido de la orden.",
    price: 0,
    available: true,
  },
  {
    id: 3,
    category: "Extras",
    name: "Salsa extra",
    description: "Producto de ejemplo — reemplaza con la descripción real.",
    price: 0,
    available: true,
  },
  {
    id: 4,
    category: "Bebidas",
    name: "Bebida",
    description: "Producto de ejemplo — agrega tamaños y opciones disponibles.",
    price: 0,
    available: false,
  },
];
