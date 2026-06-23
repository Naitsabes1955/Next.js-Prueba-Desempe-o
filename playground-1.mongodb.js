// 1. Indicamos el nombre de la base de datos que queremos usar o crear
use('ecommerce');

// 2. Insertamos el arreglo con las 20 recetas en la colección 'recipes'
db.getCollection('recipes').insertMany([
  {
    "name": "Tacos al Pastor",
    "description": "Clásicos tacos mexicanos con carne de cerdo marinada y piña.",
    "portions": "4 porciones",
    "ingredients": "1kg de carne de cerdo, 3 chiles guajillo, 2 chiles achiote, 1/2 piña, tortillas de maíz, cilantro, cebolla, limón.",
    "difficulty": "Medium",
    "preparationTime": 30,
    "cookTime": 20,
    "image": "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Marinar la carne con los chiles y el achiote por 2 horas.\n2. Cocinar la carne en una sartén a fuego alto hasta que esté dorada.\n3. Picar la carne y servir en tortillas con piña, cilantro y cebolla."
  },
  {
    "name": "Spaghetti Carbonara",
    "description": "Auténtica pasta italiana cremosa sin crema de leche.",
    "portions": "2 porciones",
    "ingredients": "200g de spaghetti, 100g de guanciale o panceta, 2 huevos grandes, 50g de queso Pecorino Romano, pimienta negra.",
    "difficulty": "Medium",
    "preparationTime": 10,
    "cookTime": 15,
    "image": "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Cocinar la pasta en agua salada.\n2. Dorar la panceta en una sartén.\n3. Mezclar los huevos con el queso y la pimienta.\n4. Integrar todo fuera del fuego para que el huevo no se cuaje."
  },
  {
    "name": "Ensalada César con Pollo",
    "description": "Fresca ensalada con aderezo clásico, crutones y pechuga a la plancha.",
    "portions": "2 porciones",
    "ingredients": "1 lechuga romana, 1 pechuga de pollo, 50g de queso parmesano, crutones, aderezo César.",
    "difficulty": "Easy",
    "preparationTime": 15,
    "cookTime": 10,
    "image": "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Cocinar la pechuga a la plancha y cortarla en tiras.\n2. Lavar y trocear la lechuga.\n3. Mezclar la lechuga con el aderezo, crutones y parmesano.\n4. Coronar con las tiras de pollo."
  },
  {
    "name": "Hamburguesa Clásica con Queso",
    "description": "Hamburguesa jugosa con queso cheddar derretido y vegetales frescos.",
    "portions": "1 porción",
    "ingredients": "200g de carne de res molida, 1 pan de hamburguesa, 1 rodaja de queso cheddar, lechuga, tomate, salsa especial.",
    "difficulty": "Easy",
    "preparationTime": 10,
    "cookTime": 8,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Formar la carne y sazonar con sal y pimienta.\n2. Cocinar en plancha 4 minutos por lado, añadiendo el queso al final.\n3. Tostar el pan y armar con los vegetales y salsas."
  },
  {
    "name": "Pizza Margherita",
    "description": "La reina de las pizzas italianas con salsa de tomate y mozzarella.",
    "portions": "2 porciones",
    "ingredients": "1 masa de pizza, 100ml de salsa de tomate, 150g de mozzarella fresca, hojas de albahaca, aceite de oliva.",
    "difficulty": "Medium",
    "preparationTime": 20,
    "cookTime": 10,
    "image": "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Estirar la masa sobre una bandeja.\n2. Extender la salsa de tomate y cubrir con rodajas de mozzarella.\n3. Hornear a máxima temperatura (250°C) hasta que dore.\n4. Añadir la albahaca fresca al salir del horno."
  },
  {
    "name": "Sushi Maki de Salmón",
    "description": "Rollos clásicos de sushi rellenos de salmón fresco y aguacate.",
    "portions": "3 rollos",
    "ingredients": "200g de arroz para sushi, algas nori, 150g de salmón fresco, 1 aguacate, vinagre de arroz.",
    "difficulty": "Hard",
    "preparationTime": 40,
    "cookTime": 20,
    "image": "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Cocinar y aderezar el arroz con el vinagre.\n2. Extender el arroz sobre el alga nori.\n3. Colocar tiras de salmón y aguacate en el centro.\n4. Enrollar con la esterilla de bambú y cortar en rodajas."
  },
  {
    "name": "Brownies de Chocolate",
    "description": "Fudge brownies melcochudos con intenso sabor a chocolate.",
    "portions": "8 unidades",
    "ingredients": "200g de chocolate oscuro, 150g de mantequilla, 200g de azúcar, 3 huevos, 100g de harina.",
    "difficulty": "Easy",
    "preparationTime": 15,
    "cookTime": 25,
    "image": "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Derretir el chocolate con la mantequilla.\n2. Batir los huevos con el azúcar e incorporar el chocolate.\n3. Agregar la harina tamizada con movimientos envolventes.\n4. Hornear a 180°C por 25 minutos."
  },
  {
    "name": "Sopa de Tomate Rostizado",
    "description": "Reconfortante crema de tomates horneados con ajo y albahaca.",
    "portions": "4 porciones",
    "ingredients": "1kg de tomates maduros, 1 cabeza de ajo, 1 cebolla, 500ml de caldo de verduras, aceite de oliva.",
    "difficulty": "Easy",
    "preparationTime": 15,
    "cookTime": 30,
    "image": "https://images.unsplash.com/photo-1547592165-e1d17fed6005?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Hornear los tomates, la cebolla y el ajo con aceite de oliva a 200°C.\n2. Licuar los vegetales horneados junto con el caldo de verduras caliente.\n3. Hervir por 5 minutos y servir con un chorro de crema."
  },
  {
    "name": "Pancakes Esponjosos",
    "description": "Los mejores pancakes americanos para empezar la mañana.",
    "portions": "6 pancakes",
    "ingredients": "1 taza de harina, 1 cucharada de azúcar, 1 cdta de polvo de hornear, 1 huevo, 3/4 taza de leche, mantequilla.",
    "difficulty": "Easy",
    "preparationTime": 10,
    "cookTime": 10,
    "image": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Mezclar los ingredientes secos en un bol.\n2. Añadir el huevo, la leche y la mantequilla derretida; batir ligeramente.\n3. Cocinar porciones en una sartén caliente hasta que salgan burbujas, voltear y dorar."
  },
  {
    "name": "Pollo al Curry con Coco",
    "description": "Un plato aromático de pollo en una salsa cremosa de curry y leche de coco.",
    "portions": "3 porciones",
    "ingredients": "500g de pechuga de pollo, 1 lata de leche de coco, 2 cucharadas de curry en polvo, 1 cebolla, pimentón.",
    "difficulty": "Medium",
    "preparationTime": 15,
    "cookTime": 20,
    "image": "https://images.unsplash.com/photo-1631292784640-2b24be784d5d?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Dorar los cubos de pollo en una sartén profunda con cebolla.\n2. Agregar el curry y saltear por 1 minuto para activar los aromas.\n3. Verter la leche de coco y cocinar a fuego lento hasta reducir la salsa."
  },
  {
    "name": "Risotto de Champiñones",
    "description": "Arroz arborio cremoso cocinado lentamente con champiñones y vino blanco.",
    "portions": "2 porciones",
    "ingredients": "200g de arroz arborio, 200g de champiñones, 1/2 vaso de vino blanco, 1L de caldo caliente, queso parmesano.",
    "difficulty": "Hard",
    "preparationTime": 10,
    "cookTime": 25,
    "image": "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Sofreír los champiñones y la cebolla; añadir el arroz.\n2. Verter el vino blanco y dejar evaporar.\n3. Agregar el caldo cucharada a cucharada, revolviendo constantemente hasta que el arroz esté al dente.\n4. Mantecar con mantequilla y parmesano."
  },
  {
    "name": "Salmón al Horno con Limón",
    "description": "Filete de salmón jugoso horneado con finas hierbas y rodajas de limón.",
    "portions": "2 porciones",
    "ingredients": "2 filetes de salmón, 1 limón, 2 dientes de ajo, romero fresco, aceite de oliva, sal y pimienta.",
    "difficulty": "Easy",
    "preparationTime": 5,
    "cookTime": 12,
    "image": "https://images.unsplash.com/photo-1485921325833-c519f76c4927?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Colocar los filetes en una bandeja para horno.\n2. Sazonar con ajo picado, romero, sal, pimienta y aceite de oliva.\n3. Cubrir con rodajas de limón.\n4. Hornear a 200°C por 12 minutes."
  },
  {
    "name": "Guacamole Casero",
    "description": "El dip mexicano por excelencia, fresco y lleno de sabor.",
    "portions": "4 porciones",
    "ingredients": "3 aguacates maduros, 1 tomate redondo, 1/2 cebolla morada, cilantro fresco, zumo de 1 limón, sal.",
    "difficulty": "Easy",
    "preparationTime": 10,
    "cookTime": 0,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Triturar la pulpa de los aguacates con un tenedor dejando algunos trozos.\n2. Incorporar el tomate, cebolla y cilantro finamente picados.\n3. Agregar el zumo de limón y sal al gusto; mezclar bien."
  },
  {
    "name": "Lasagna de Carne",
    "description": "Capas intercaladas de pasta, salsa boloñesa casera y salsa bechamel.",
    "portions": "6 porciones",
    "ingredients": "Láminas de pasta para lasagna, 500g de carne molida, 400g de salsa de tomate, 500ml de bechamel, mozzarella.",
    "difficulty": "Hard",
    "preparationTime": 30,
    "cookTime": 40,
    "image": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Cocinar la carne molida con la salsa de tomate para hacer la boloñesa.\n2. En un molde, armar capas: boloñesa, lámina de pasta, bechamel y queso.\n3. Repetir los pasos y terminar con abundante mozzarella arriba.\n4. Hornear a 190°C por 35 minutos."
  },
  {
    "name": "French Toast (Tostadas Francesas)",
    "description": "Pan brioche remojado en mezcla de huevo y canela, perfecto para el brunch.",
    "portions": "2 porciones",
    "ingredients": "4 rodajas de pan grueso, 2 huevos, 1/2 taza de leche, 1 cdta de canela, esencia de vainilla, mantequilla.",
    "difficulty": "Easy",
    "preparationTime": 5,
    "cookTime": 6,
    "image": "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Batir los huevos con la leche, canela y vainilla en un plato hondo.\n2. Remojar las rodajas de pan por ambos lados en la mezcla.\n3. Cocinar en una sartén con mantequilla derretida hasta que doren por ambos lados."
  },
  {
    "name": "Bowl de Avena y Frutos Rojos",
    "description": "Desayuno saludable y energético cargado de fibra y antioxidantes.",
    "portions": "1 porción",
    "ingredients": "1/2 taza de avena en hojuelas, 1 taza de leche de almendras, fresas, arándanos, semillas de chía, miel.",
    "difficulty": "Easy",
    "preparationTime": 5,
    "cookTime": 5,
    "image": "https://images.unsplash.com/photo-1517686469429-8faf88b9f7af?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Cocinar la avena con la leche de almendras a fuego medio revolviendo hasta que espese.\n2. Servir en un tazón.\n3. Decorar encima con los frutos rojos, las semillas de chía y un hilo de miel."
  },
  {
    "name": "Ratatouille",
    "description": "Estofado tradicional francés de vegetales cortados en rodajas finas.",
    "portions": "4 porciones",
    "ingredients": "1 berenjena, 1 calabacín, 2 tomates, 1 pimentón, salsa de tomate casera, hierbas provenzales, aceite de oliva.",
    "difficulty": "Medium",
    "preparationTime": 25,
    "cookTime": 45,
    "image": "https://images.unsplash.com/photo-1572453860999-1ad3870f400e?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Cortar todos los vegetales en rodajas del mismo grosor.\n2. Poner una capa de salsa de tomate en la base de un molde.\n3. Intercalar las rodajas de vegetales en forma de espiral.\n4. Rociar con aceite, hierbas y hornear tapado con aluminio a 180°C por 40 minutos."
  },
  {
    "name": "Chana Masala (Curry de Garbanzos)",
    "description": "Plato vegano de la India lleno de sabor especiado y reconfortante.",
    "portions": "3 porciones",
    "ingredients": "1 lata de garbanzos cocidos, 1 lata de tomates picados, 1 cebolla, jengibre, garam masala, cúrcuma, comino.",
    "difficulty": "Easy",
    "preparationTime": 10,
    "cookTime": 15,
    "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Sofreír la cebolla con el jengibre picado y todas las especias hasta que huela bien.\n2. Añadir los tomates y cocinar por 5 minutos.\n3. Agregar los garbanzos escurridos, tapar y dejar cocinar a fuego lento para que absorban el sabor."
  },
  {
    "name": "Crepas Dulces",
    "description": "Masas finas francesas ideales para rellenar con frutas o chocolate.",
    "portions": "8 crepas",
    "ingredients": "1 taza de harina, 2 huevos, 1/2 taza de leche, 1/2 taza de agua, 2 cucharadas de mantequilla derretida, sal.",
    "difficulty": "Medium",
    "preparationTime": 10,
    "cookTime": 12,
    "image": "https://images.unsplash.com/photo-1519676867240-f03562e64548?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Licuar todos los ingredientes hasta tener una mezcla líquida y homogénea.\n2. Verter una capa muy delgada en una sartén antiadherente caliente.\n3. Cocinar 1 minuto por lado hasta que empiece a dorarse."
  },
  {
    "name": "Pescado al Papillote",
    "description": "Filete de pescado blanco cocido saludablemente en sus propios jugos usando papel aluminio.",
    "portions": "1 porción",
    "ingredients": "1 filete de pescado blanco, 1/2 zanahoria en tiras, 1/2 calabacín en tiras, aceite de oliva, chorrito de vino blanco.",
    "difficulty": "Easy",
    "preparationTime": 10,
    "cookTime": 15,
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=600&auto=format&fit=crop",
    "steps": "1. Colocar una cama de vegetales sobre un trozo grande de papel aluminio.\n2. Poner el pescado encima, salpimentar, añadir aceite y el vino blanco.\n3. Cerrar el papel herméticamente creando un paquete empacado.\n4. Hornear a 200°C por 15 minutos (el paquete se inflará)."
  }
]);