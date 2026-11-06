export interface MenuItem {
  id: number;
  category: string;
  name: string;
  description?: string;
  price: number;
  available: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    category: "Órdenes de patita",
    name: "Orden entera de patita",
    price: 110,
    available: true,
  },
  {
    id: 2,
    category: "Órdenes de patita",
    name: "Media orden de patita",
    price: 70,
    available: true,
  },
  {
    id: 3,
    category: "Tostadas",
    name: "Tostada sencilla",
    description: "Elige entre los ingredientes disponibles.",
    price: 30,
    available: true,
  },
  {
    id: 4,
    category: "Tostadas",
    name: "Tostada doble",
    description: "Elige entre los ingredientes disponibles, se pueden elegir 2 ingredientes.",
    price: 60,
    available: true,
  },
  {
    id: 5,
    category: "Contenedores",
    name: "Contenedor pequeño",
    description: "Elige de 1 a 3 ingredientes.",
    price: 80,
    available: true,
  },
  {
    id: 6,
    category: "Contenedores",
    name: "Contenedor grande",
    description: "Elige de 1 a 4 ingredientes.",
    price: 110,
    available: true,
  },
];

export const menuIngredients = [
  "Pata picada",
  "Oreja",
  "Cueritos",
  "Queso de puerco",
  "Ceviche",
  "Carne tártara",
];
