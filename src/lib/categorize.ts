const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Lácteos": [
    // Spanish multi-word
    "crema de leche", "leche de coco", "leche de almendra", "leche de avena",
    "leche de soya", "queso crema", "yogurt griego", "leche condensada",
    "leche evaporada", "leche en polvo",
    // English multi-word
    "coconut milk", "almond milk", "oat milk", "soy milk", "rice milk",
    "cream cheese", "cottage cheese", "goat cheese", "blue cheese",
    "sour cream", "heavy cream", "whipping cream", "greek yogurt",
    "condensed milk", "evaporated milk", "ice cream",
    // Spanish single-word
    "leche", "queso", "yogurt", "yogur", "mantequilla", "crema", "huevo",
    "huevos", "kumis", "cuajada",
    // English single-word
    "milk", "cheese", "yogurt", "butter", "cream", "cheddar", "mozzarella",
    "parmesan", "brie", "gouda", "feta", "ricotta", "ghee", "kefir",
    "margarine", "egg", "eggs",
  ],
  "Carnes y Mariscos": [
    // Spanish multi-word
    "carne de res", "carne molida", "pechuga de pollo", "muslo de pollo",
    "carne de cerdo", "chuleta de cerdo", "costilla de cerdo", "lomo de cerdo",
    "carne para asar", "carne para guisar",
    // English multi-word
    "ground beef", "ground turkey", "ground pork", "ground chicken",
    "chicken breast", "chicken thigh", "chicken wing", "fish fillet",
    // Spanish single-word
    "pechuga", "carne", "pollo", "cerdo", "res", "ternera", "cordero",
    "chorizo", "salchicha", "salchichon", "jamon", "jamón", "tocino", "tocineta",
    "atun", "atún", "salmon", "salmón", "trucha", "tilapia", "mojarra",
    "bagre", "camarón", "camaron", "camarones", "langostino", "pulpo",
    "calamar", "sardina", "sardinas", "mariscos",
    // English single-word
    "chicken", "beef", "pork", "turkey", "lamb", "bacon", "ham", "sausage",
    "steak", "salmon", "tuna", "shrimp", "prawn", "crab", "lobster",
    "cod", "tilapia", "trout",
  ],
  "Verduras": [
    // Spanish multi-word
    "cebolla morada", "cebolla roja", "cebolla blanca",
    "papa criolla", "papa pastusa", "papa sabanera",
    "plátano verde", "platano verde", "plátano maduro", "platano maduro",
    "verduras congeladas", "pimentón rojo", "pimentón verde",
    "tomate cherry",
    // English multi-word
    "bell pepper", "green bean", "sweet potato", "green onion",
    // Spanish single-word
    "tomate", "papa", "cebolla", "ajo", "zanahoria", "brócoli", "brocoli",
    "coliflor", "espinaca", "lechuga", "repollo", "col",
    "apio", "pepino", "calabacín", "calabacin", "calabaza", "berenjena",
    "champiñón", "champiñones", "champiñon", "hongo", "hongos",
    "maíz", "maiz", "mazorca", "arveja", "arvejas",
    "habichuela", "habichuelas", "acelga", "rábano", "rabano",
    "remolacha", "nabo", "puerro", "cilantro", "perejil",
    "ahuyama", "yuca", "plátano", "platano", "pimentón", "pimenton",
    // English single-word
    "tomato", "potato", "onion", "garlic", "carrot", "broccoli",
    "lettuce", "cabbage", "celery", "cucumber", "zucchini", "mushroom",
    "corn", "pea", "asparagus", "spinach", "kale", "ginger",
  ],
  "Frutas": [
    // Spanish multi-word
    "fruta de la pasión",
    // Spanish single-word
    "manzana", "banana", "banano", "naranja", "limón", "limon", "lima",
    "fresa", "fresas", "mora", "moras", "frambuesa", "arándano", "arandano",
    "cereza", "uva", "uvas", "durazno", "ciruela", "pera",
    "mango", "piña", "coco", "papaya", "guayaba", "kiwi",
    "sandía", "sandia", "melón", "melon",
    "higo", "granada", "mandarina", "toronja", "maracuyá", "maracuya",
    "lulo", "guanábana", "guanabana", "curuba", "tamarindo",
    "aguacate", "uchuva",
    // English single-word
    "apple", "banana", "orange", "lemon", "lime", "strawberry",
    "blueberry", "raspberry", "blackberry", "cherry", "grape",
    "peach", "plum", "pear", "mango", "pineapple", "coconut",
    "papaya", "guava", "kiwi", "watermelon", "avocado", "olive",
  ],
  "Granos y Cereales": [
    // Spanish multi-word
    "arroz integral", "arroz blanco", "harina de trigo",
    "frijoles negros", "frijoles rojos",
    // English multi-word
    "brown rice", "white rice", "bread flour",
    // Spanish single-word
    "arroz", "pasta", "espagueti", "fideos", "tallarines",
    "pan", "arepa", "arepas", "tortilla", "avena",
    "harina", "quinua", "quinoa", "granola", "cereal",
    "lenteja", "lentejas", "frijol", "frijoles", "garbanzo", "garbanzos",
    "maicena",
    // English single-word
    "rice", "pasta", "spaghetti", "bread", "oats", "oatmeal",
    "flour", "quinoa", "granola", "cereal", "beans", "lentils",
    "tofu", "tempeh",
  ],
  "Especias y Condimentos": [
    // Spanish multi-word
    "pimienta negra", "ajo en polvo", "cebolla en polvo",
    "hoja de laurel",
    // English multi-word
    "chili powder", "garlic powder", "onion powder", "bay leaf",
    // Spanish single-word
    "sal", "pimienta", "canela", "comino", "cúrcuma", "curcuma",
    "orégano", "oregano", "albahaca", "tomillo", "romero",
    "laurel", "eneldo", "perejil", "menta", "hierbabuena",
    "nuez moscada", "clavo", "azafrán", "azafran", "vainilla",
    "achiote", "sazón", "sazon", "color",
    // English single-word
    "salt", "pepper", "cinnamon", "cumin", "paprika", "turmeric",
    "oregano", "basil", "thyme", "rosemary", "sage", "dill",
    "vanilla", "cilantro",
  ],
  "Bebidas": [
    // Spanish multi-word
    "jugo de naranja", "jugo de manzana", "agua con gas",
    "agua de coco",
    // English multi-word
    "orange juice", "apple juice", "green tea", "sparkling water",
    // Spanish single-word
    "café", "cafe", "té", "jugo", "agua", "gaseosa", "limonada",
    "vino", "cerveza",
    // English single-word
    "coffee", "tea", "juice", "water", "soda", "lemonade",
    "wine", "beer", "kombucha",
  ],
  "Repostería": [
    // Spanish multi-word
    "polvo de hornear", "bicarbonato de sodio",
    "azúcar morena", "azúcar pulverizada",
    // English multi-word
    "baking soda", "baking powder", "cocoa powder",
    // Spanish single-word
    "azúcar", "azucar", "miel", "levadura", "chocolate",
    "gelatina", "almendra", "nuez", "maní", "mani",
    // English single-word
    "sugar", "honey", "yeast", "chocolate", "cocoa",
    "almond", "walnut", "pecan", "cashew", "peanut",
  ],
  "Salsas y Aderezos": [
    // Spanish multi-word
    "salsa de soya", "salsa de tomate", "salsa bbq",
    "salsa rosada", "aceite de oliva", "aceite vegetal",
    "pasta de tomate", "vinagre balsámico",
    // English multi-word
    "soy sauce", "hot sauce", "bbq sauce", "tomato sauce",
    "olive oil", "tomato paste",
    // Spanish single-word
    "ketchup", "mostaza", "mayonesa", "vinagreta", "vinagre",
    "aceite", "salsa", "pesto", "mermelada",
    // English single-word
    "ketchup", "mustard", "mayonnaise", "mayo", "vinegar",
    "oil", "sriracha", "guacamole", "hummus", "pesto",
  ],
  "Snacks y Botanas": [
    // Spanish multi-word
    "papas fritas", "palomitas de maíz",
    // English multi-word
    "potato chips", "tortilla chips", "trail mix", "granola bar",
    // Spanish single-word
    "papitas", "palomitas", "galletas", "dulces",
    // English single-word
    "chips", "popcorn", "pretzel", "candy", "cookies",
  ],
};

export function categorize(name: string): string {
  const lower = name.toLowerCase().trim();

  // Check multi-word phrases first (longer phrases first for specificity)
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (keyword.includes(" ") && lower.includes(keyword)) {
        return category;
      }
    }
  }

  // Then check single-word matches
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (!keyword.includes(" ") && lower.includes(keyword)) {
        return category;
      }
    }
  }

  return "Otros";
}
