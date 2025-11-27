const recipes = [
    {
        "id": 1,
        "name": "Classic Lasagna",
        "description": "Layers of pasta, rich meat sauce, and a creamy béchamel, baked to perfection.",
        "ingredients": ["Lasagna noodles", "Ground beef", "Tomato paste", "Ricotta cheese", "Mozzarella cheese", "Béchamel sauce"],
        "steps": ["Prepare the meat sauce.", "Make the béchamel.", "Layer noodles, sauce, and cheeses.", "Bake at 375°F for 45 minutes."]
    },
    {
        "id": 2,
        "name": "French Onion Soup",
        "description": "Rich beef broth base with caramelized onions, topped with a crouton and melted Gruyère cheese.",
        "ingredients": ["Onions", "Beef broth", "Butter", "Dry white wine", "Baguette slices", "Gruyère cheese"],
        "steps": ["Caramelize the onions slowly.", "Add broth and wine, simmer for 20 min.", "Pour into oven-safe bowls.", "Top with bread and cheese, broil until golden."]
    },
    {
        "id": 3,
        "name": "Spicy Thai Green Curry",
        "description": "A vibrant and aromatic Thai curry with coconut milk, vegetables, and a kick of green chili.",
        "ingredients": ["Chicken breast", "Green curry paste", "Coconut milk", "Bamboo shoots", "Bell peppers", "Fish sauce", "Lime leaves"],
        "steps": ["Sauté curry paste in oil.", "Add chicken and cook until done.", "Pour in coconut milk and vegetables.", "Simmer until thickened, season with fish sauce."]
    },
    {
        "id": 4,
        "name": "Chocolate Chip Cookies",
        "description": "Soft and chewy cookies with a hint of sea salt to enhance the chocolate.",
        "ingredients": ["All-purpose flour", "Butter", "Brown sugar", "Eggs", "Vanilla extract", "Chocolate chips", "Baking soda"],
        "steps": ["Cream butter and sugars.", "Mix in eggs and vanilla.", "Stir in dry ingredients and chocolate chips.", "Scoop onto a baking sheet and bake at 350°F for 10-12 minutes."]
    },
    {
        "id": 5,
        "name": "New England Clam Chowder",
        "description": "A creamy, thick soup featuring tender clams, diced potatoes, and smoked bacon.",
        "ingredients": ["Clams", "Potatoes", "Heavy cream", "Bacon", "Onion", "Flour", "Celery"],
        "steps": ["Cook bacon until crisp and set aside.", "Sauté onion and celery in bacon fat.", "Add flour and cook roux.", "Stir in liquid, potatoes, and clams; simmer until potatoes are tender."]
    },
    {
        "id": 6,
        "name": "Chicken Tikka Masala",
        "description": "Tender chicken pieces marinated in yogurt and spices, served in a rich tomato cream sauce.",
        "ingredients": ["Chicken thighs", "Yogurt", "Garam masala", "Tomato puree", "Ginger", "Garlic", "Heavy cream"],
        "steps": ["Marinate and grill the chicken.", "Cook ginger, garlic, and spices in a pan.", "Add tomato puree and simmer.", "Stir in cream and chicken."]
    },
    {
        "id": 7,
        "name": "Authentic Tacos al Pastor",
        "description": "Marinated pork slices traditionally cooked on a vertical spit, served in warm corn tortillas.",
        "ingredients": ["Pork shoulder", "Achiote paste", "Pineapple", "Onion", "Cilantro", "Corn tortillas", "Lime juice"],
        "steps": ["Marinate pork overnight in achiote.", "Grill or sear pork and slice thinly.", "Warm tortillas.", "Serve pork with diced onion, cilantro, and pineapple."]
    },
    {
        "id": 8,
        "name": "Shakshuka",
        "description": "A popular Middle Eastern dish of eggs poached in a flavorful sauce of tomatoes, chili peppers, and spices.",
        "ingredients": ["Canned diced tomatoes", "Eggs", "Bell peppers", "Onion", "Garlic", "Cumin", "Paprika"],
        "steps": ["Sauté onion and peppers.", "Add spices, then tomatoes; simmer until reduced.", "Create wells in the sauce and crack eggs into them.", "Cover and cook until egg whites are set."]
    },
    {
        "id": 9,
        "name": "Pad Thai",
        "description": "Stir-fried rice noodles with shrimp, tofu, peanuts, and bean sprouts, tossed in a sweet and sour sauce.",
        "ingredients": ["Rice noodles", "Shrimp", "Tofu", "Tamarind paste", "Fish sauce", "Brown sugar", "Peanuts", "Bean sprouts"],
        "steps": ["Soak noodles until tender.", "Stir-fry shrimp and tofu.", "Mix sauce ingredients and add to pan with noodles.", "Toss well, garnish with peanuts and lime."]
    },
    {
        "id": 10,
        "name": "Beef Bourguignon",
        "description": "Classic French stew where beef is braised in red wine, beef broth, and flavored with bacon, mushrooms, and pearl onions.",
        "ingredients": ["Beef chuck", "Red wine (Burgundy)", "Beef broth", "Bacon lardons", "Mushrooms", "Pearl onions", "Carrots"],
        "steps": ["Sear the beef.", "Sauté the bacon and vegetables.", "Deglaze with red wine.", "Combine all ingredients and braise in the oven for 3 hours."]
    },
    {
        "id": 11,
        "name": "Caesar Salad",
        "description": "Crisp romaine lettuce and croutons dressed with a creamy dressing based on anchovies, egg, and Parmesan cheese.",
        "ingredients": ["Romaine lettuce", "Croutons", "Parmesan cheese", "Anchovy fillets", "Egg yolk", "Lemon juice", "Olive oil"],
        "steps": ["Whisk together anchovies, egg yolk, lemon juice, and oil to make the dressing.", "Toss the lettuce and croutons with the dressing.", "Shave Parmesan on top."]
    },
    {
        "id": 12,
        "name": "Goulash (Hungarian)",
        "description": "A hearty soup or stew made of meat, potatoes, and lots of paprika.",
        "ingredients": ["Beef stew meat", "Onions", "Potatoes", "Carrots", "Sweet paprika", "Marjoram", "Beef stock"],
        "steps": ["Sauté onions until golden.", "Add beef and brown.", "Stir in paprika and other spices.", "Add stock and vegetables; simmer until tender."]
    },
    {
        "id": 13,
        "name": "Pho (Vietnamese Noodle Soup)",
        "description": "Fragrant and comforting Vietnamese rice noodle soup, typically served with beef or chicken and fresh herbs.",
        "ingredients": ["Beef bones", "Rice noodles", "Ginger", "Star anise", "Cinnamon stick", "Fish sauce", "Thinly sliced beef"],
        "steps": ["Simmer beef bones and aromatics (ginger, star anise) for hours to make broth.", "Blanch noodles.", "Assemble bowls with noodles, raw beef slices, and pour hot broth over top.", "Serve with lime and basil."]
    },
    {
        "id": 14,
        "name": "Apple Pie",
        "description": "Classic American dessert with a flaky crust and a warm, spiced apple filling.",
        "ingredients": ["Pie crust dough", "Granny Smith apples", "Brown sugar", "Cinnamon", "Nutmeg", "Butter"],
        "steps": ["Prepare pie dough and line a pan.", "Mix sliced apples with sugar and spices.", "Fill the crust and top with second crust.", "Bake at 425°F until crust is golden."]
    },
    {
        "id": 15,
        "name": "Aglio e Olio",
        "description": "Simple, traditional Italian pasta dish featuring garlic, olive oil, and sometimes chili flakes.",
        "ingredients": ["Spaghetti", "Garlic", "Olive oil", "Red pepper flakes", "Parsley", "Salt"],
        "steps": ["Cook spaghetti until al dente.", "Sauté sliced garlic and chili flakes in olive oil until fragrant.", "Toss drained pasta in the oil mixture.", "Garnish with parsley and serve."]
    },
    {
        "id": 16,
        "name": "Miso Soup",
        "description": "Traditional Japanese soup consisting of a dashi stock mixed with softened miso paste.",
        "ingredients": ["Dashi stock", "Miso paste", "Tofu (silken)", "Wakame seaweed", "Scallions"],
        "steps": ["Bring dashi stock to a gentle simmer.", "Dissolve miso paste in a small amount of warm stock, then stir into the pot.", "Add diced tofu and seaweed; do not boil.", "Garnish with scallions."]
    },
    {
        "id": 17,
        "name": "Shepherd's Pie",
        "description": "Savory mince meat (lamb or beef) topped with a thick layer of creamy mashed potatoes and baked.",
        "ingredients": ["Ground lamb", "Mashed potatoes", "Onion", "Carrots", "Beef broth", "Worcestershire sauce", "Thyme"],
        "steps": ["Cook the lamb and vegetables.", "Mix with broth and seasonings, simmer to thicken.", "Spread meat mixture into a baking dish.", "Top with mashed potatoes and bake until golden."]
    },
    {
        "id": 18,
        "name": "Paella Valenciana",
        "description": "Spanish rice dish originally from Valencia, known for its saffron, seafood, chicken, and beans.",
        "ingredients": ["Arborio rice", "Saffron threads", "Chicken pieces", "Shrimp", "Mussels", "Peas", "Smoked paprika"],
        "steps": ["Sauté meat and seafood.", "Add rice and saffron; toast briefly.", "Add hot broth slowly, stirring occasionally.", "Simmer until rice is cooked and a crust forms at the bottom (socarrat)."]
    },
    {
        "id": 19,
        "name": "Pancakes (Fluffy)",
        "description": "Soft and fluffy breakfast staples, perfect with butter and maple syrup.",
        "ingredients": ["All-purpose flour", "Milk", "Eggs", "Baking powder", "Sugar", "Salt", "Butter"],
        "steps": ["Whisk dry ingredients.", "Mix wet ingredients separately.", "Combine wet and dry, mixing lightly.", "Cook on a hot, buttered griddle until bubbles appear and flip."]
    },
    {
        "id": 20,
        "name": "Guacamole",
        "description": "A creamy, fresh dip made from mashed avocado, lime juice, and spices.",
        "ingredients": ["Avocados", "Lime juice", "Red onion", "Cilantro", "Jalapeño (optional)", "Salt"],
        "steps": ["Mash avocados in a bowl.", "Stir in lime juice, finely diced onion, and cilantro.", "Season with salt to taste.", "Serve immediately with tortilla chips."]
    },
    {
        "id": 21,
        "name": "Tiramisu",
        "description": "A classic Italian dessert layered with coffee-soaked ladyfingers and a sweet mascarpone cream.",
        "ingredients": ["Ladyfinger biscuits", "Mascarpone cheese", "Espresso coffee", "Egg yolks", "Sugar", "Cocoa powder"],
        "steps": ["Whip egg yolks and sugar.", "Fold in mascarpone cheese to make the cream.", "Dip ladyfingers quickly in cool espresso.", "Layer cream and ladyfingers, dust with cocoa, and chill overnight."]
    },
    {
        "id": 22,
        "name": "Butter Chicken (Murgh Makhani)",
        "description": "Creamy, rich Indian curry made with spiced tomatoes and tender chicken.",
        "ingredients": ["Chicken", "Butter", "Tomato puree", "Ginger", "Garlic", "Yogurt", "Heavy cream"],
        "steps": ["Marinate chicken in yogurt and spices.", "Grill or bake chicken.", "Sauté spices, add tomato puree, and simmer.", "Stir in cream and butter, then add chicken."]
    },
    {
        "id": 23,
        "name": "Margarita Pizza",
        "description": "Simple Neapolitan pizza with fresh tomatoes, mozzarella cheese, and basil.",
        "ingredients": ["Pizza dough", "San Marzano tomatoes", "Fresh mozzarella", "Basil leaves", "Olive oil", "Salt"],
        "steps": ["Roll out pizza dough.", "Top with crushed tomatoes, torn mozzarella, and olive oil.", "Bake at high heat until crust is crisp.", "Garnish with fresh basil."]
    },
    {
        "id": 24,
        "name": "Caprese Salad",
        "description": "A simple Italian salad, made of sliced fresh mozzarella, tomatoes, and sweet basil.",
        "ingredients": ["Fresh mozzarella", "Vine-ripened tomatoes", "Fresh basil leaves", "Balsamic glaze", "Olive oil"],
        "steps": ["Slice mozzarella and tomatoes.", "Arrange alternating slices on a platter with basil leaves.", "Drizzle with olive oil and balsamic glaze.", "Season lightly with salt and pepper."]
    },
    {
        "id": 25,
        "name": "Falafel",
        "description": "Deep-fried balls or patties made from ground chickpeas or fava beans.",
        "ingredients": ["Dried chickpeas", "Parsley", "Cilantro", "Onion", "Garlic", "Cumin", "Coriander"],
        "steps": ["Soak chickpeas overnight.", "Grind chickpeas with herbs and spices.", "Form into small balls or patties.", "Deep-fry until golden brown and crispy."]
    },
    {
        "id": 26,
        "name": "Cobb Salad",
        "description": "A main-dish American salad consisting of chopped lettuce, tomatoes, bacon, chicken, egg, and avocado.",
        "ingredients": ["Romaine lettuce", "Chicken breast", "Bacon", "Hard-boiled eggs", "Avocado", "Blue cheese", "Red wine vinaigrette"],
        "steps": ["Chop and wash lettuce.", "Arrange chicken, bacon, eggs, avocado, and blue cheese in neat rows over the lettuce.", "Drizzle with vinaigrette just before serving."]
    },
    {
        "id": 27,
        "name": "Ramen (Tonkotsu)",
        "description": "Rich, creamy Japanese noodle soup based on pork bones broth.",
        "ingredients": ["Pork bones", "Ramen noodles", "Chashu pork", "Soy sauce", "Scallions", "Soft-boiled egg"],
        "steps": ["Simmer pork bones for 12+ hours for the broth.", "Cook noodles.", "Assemble bowl with noodles, broth, chashu pork, and toppings."]
    },
    {
        "id": 28,
        "name": "Creme Brûlée",
        "description": "A rich custard base topped with a layer of hardened caramelized sugar.",
        "ingredients": ["Heavy cream", "Egg yolks", "Sugar", "Vanilla bean", "Granulated sugar (for torching)"],
        "steps": ["Whisk egg yolks, sugar, and cream.", "Pour into ramekins.", "Bake in a water bath until set.", "Chill thoroughly.", "Sprinkle with sugar and torch until caramelized."]
    },
    {
        "id": 29,
        "name": "Tuna Nigiri",
        "description": "A slice of fresh raw tuna draped over a bed of seasoned rice.",
        "ingredients": ["Sushi rice", "Tuna (sashimi grade)", "Rice vinegar", "Sugar", "Soy sauce (for dipping)"],
        "steps": ["Season cooked rice with vinegar and sugar.", "Form rice into small oval mounds.", "Place a thin slice of tuna over each rice mound.", "Serve with soy sauce and wasabi."]
    },
    {
        "id": 30,
        "name": "Lemon and Herb Roasted Chicken",
        "description": "A simple, flavorful whole chicken roasted with fresh herbs and lemon wedges.",
        "ingredients": ["Whole chicken", "Lemon", "Rosemary", "Thyme", "Garlic", "Butter", "Olive oil"],
        "steps": ["Pat chicken dry and season generously.", "Stuff cavity with lemon wedges and herbs.", "Rub skin with butter and oil.", "Roast at 425°F until internal temperature reaches 165°F."]
    },
    {
        "id": 31,
        "name": "Croissant",
        "description": "Flaky, buttery, Viennoiserie pastry named for its crescent shape.",
        "ingredients": ["Bread flour", "Yeast", "Milk", "Sugar", "Salt", "Unsalted butter (for lamination)"],
        "steps": ["Prepare a yeast dough.", "Encase the dough with cold butter and laminate (fold and roll) several times.", "Cut into triangles, roll into crescent shapes.", "Proof and bake at 375°F."]
    },
    {
        "id": 32,
        "name": "Gazpacho",
        "description": "A cold soup made of raw, blended vegetables, originally from Andalusia, Spain.",
        "ingredients": ["Tomatoes", "Cucumber", "Bell pepper", "Garlic", "Olive oil", "Bread (stale)", "Sherry vinegar"],
        "steps": ["Roughly chop all vegetables.", "Blend until smooth, adding oil and vinegar slowly.", "Season and chill for at least 4 hours.", "Serve cold, optionally topped with diced vegetables."]
    },
    {
        "id": 33,
        "name": "Eggs Benedict",
        "description": "An American breakfast dish consisting of a poached egg, Canadian bacon, and hollandaise sauce on an English muffin.",
        "ingredients": ["English muffins", "Eggs", "Canadian bacon", "Butter", "Lemon juice", "Egg yolks (for hollandaise)"],
        "steps": ["Toast English muffins.", "Cook Canadian bacon.", "Prepare hollandaise sauce (emulsified egg yolks and butter).", "Poach eggs.", "Assemble: muffin, bacon, egg, hollandaise."]
    },
    {
        "id": 34,
        "name": "Hummus",
        "description": "A Middle Eastern dip or spread made from mashed chickpeas blended with tahini, lemon juice, and garlic.",
        "ingredients": ["Chickpeas", "Tahini (sesame paste)", "Lemon juice", "Garlic", "Ice water", "Olive oil"],
        "steps": ["Blend chickpeas, tahini, lemon juice, and garlic until smooth.", "Slowly drizzle in ice water to lighten the texture.", "Serve in a bowl, drizzled with olive oil."]
    },
    {
        "id": 35,
        "name": "Beetroot and Feta Salad",
        "description": "Earthy roasted beetroot paired with salty feta cheese and walnuts.",
        "ingredients": ["Beets", "Feta cheese", "Walnuts", "Arugula", "Balsamic vinegar", "Olive oil"],
        "steps": ["Roast beets until tender; peel and chop.", "Combine beets, arugula, and walnuts.", "Crumble feta over the top.", "Dress with olive oil and balsamic vinegar."]
    },
    {
        "id": 36,
        "name": "Chicken Noodle Soup",
        "description": "A classic comfort soup featuring chicken, vegetables, and tender egg noodles.",
        "ingredients": ["Chicken broth", "Chicken meat", "Egg noodles", "Carrots", "Celery", "Onion", "Thyme"],
        "steps": ["Sauté carrots, celery, and onion.", "Add broth and thyme; bring to a boil.", "Add noodles and chicken; simmer until noodles are cooked."]
    },
    {
        "id": 37,
        "name": "Tzatziki",
        "description": "A creamy Greek sauce made from yogurt, shredded cucumber, garlic, and dill.",
        "ingredients": ["Greek yogurt", "Cucumber", "Garlic", "Dill", "Olive oil", "Red wine vinegar"],
        "steps": ["Grate and drain cucumber to remove excess water.", "Combine grated cucumber, yogurt, crushed garlic, and dill.", "Stir in a touch of olive oil and vinegar.", "Chill before serving."]
    },
    {
        "id": 38,
        "name": "Sauerbraten",
        "description": "A traditional German roast of heavily marinated meat, typically beef, served with gravy and potato dumplings.",
        "ingredients": ["Beef bottom round", "Red wine vinegar", "Water", "Onions", "Bay leaves", "Ginger snaps (optional, for thickening)"],
        "steps": ["Marinate beef in vinegar, water, and spices for 3-5 days.", "Roast the beef slowly in the marinade.", "Thicken the sauce with ginger snaps or a roux."]
    },
    {
        "id": 39,
        "name": "Black Forest Gateau",
        "description": "A German chocolate sponge cake with cherry filling and whipped cream.",
        "ingredients": ["Chocolate sponge cake", "Whipped cream", "Cherries (pitted)", "Kirschwasser (cherry liqueur)", "Chocolate shavings"],
        "steps": ["Slice the chocolate sponge cake into layers.", "Brush layers with Kirschwasser.", "Layer cream and cherries between sponge layers.", "Frost the cake and decorate with chocolate shavings."]
    },
    {
        "id": 40,
        "name": "Fish and Chips",
        "description": "A classic British dish of battered fish (cod or haddock) fried and served with thick-cut fried potatoes.",
        "ingredients": ["Cod fillet", "All-purpose flour", "Beer (for batter)", "Potatoes", "Frying oil", "Salt and malt vinegar"],
        "steps": ["Cut potatoes into chips and fry until soft, then set aside.", "Dip fish fillets in beer batter and fry until golden.", "Refry the chips until crisp.", "Serve fish and chips hot with salt and malt vinegar."]
    },
    {
        "id": 41,
        "name": "Bánh Mì (Vietnamese Sandwich)",
        "description": "A savory Vietnamese sandwich using a crispy baguette, pâté, meats, and pickled vegetables.",
        "ingredients": ["Baguette (crispy)", "Pâté", "Sliced pork/ham", "Pickled carrots and daikon", "Cilantro", "Jalapeño slices"],
        "steps": ["Slice the baguette and spread pâté on one side.", "Layer with meats and pickled vegetables.", "Garnish with fresh cilantro and jalapeño.", "Serve immediately."]
    },
    {
        "id": 42,
        "name": "Gnocchi with Pesto",
        "description": "Soft potato dumplings tossed in a vibrant basil pesto sauce.",
        "ingredients": ["Potato gnocchi", "Fresh basil", "Pine nuts", "Parmesan cheese", "Garlic", "Olive oil"],
        "steps": ["Boil gnocchi until they float to the surface.", "Blend basil, pine nuts, Parmesan, and garlic with olive oil to make pesto.", "Drain gnocchi and toss gently with the fresh pesto."]
    },
    {
        "id": 43,
        "ingredients": ["Pork belly", "Coconut milk", "Coconut cream", "Shrimp paste (bagoong alamang)", "Green chilies", "Red chilies", "Garlic"],
        "steps": ["Sauté garlic, onion, and shrimp paste.", "Add pork and cook until browned.", "Pour in coconut milk and simmer.", "Add chilies and coconut cream, simmer until thick and oily."]
    },
    {
        "id": 43,
        "name": "Bicol Express",
        "description": "A spicy Filipino stew of pork and green chilies cooked in coconut milk.",
        "ingredients": ["Pork belly", "Coconut milk", "Coconut cream", "Shrimp paste (bagoong alamang)", "Green chilies", "Red chilies", "Garlic"],
        "steps": ["Sauté garlic, onion, and shrimp paste.", "Add pork and cook until browned.", "Pour in coconut milk and simmer.", "Add chilies and coconut cream, simmer until thick and oily."]
    },
    {
        "id": 44,
        "name": "Adobo",
        "description": "The national dish of the Philippines—meat (chicken or pork) stewed in vinegar, soy sauce, garlic, and peppercorns.",
        "ingredients": ["Chicken or Pork", "Soy sauce", "Cane vinegar", "Garlic", "Bay leaves", "Black peppercorns"],
        "steps": ["Marinate meat in soy sauce, vinegar, and crushed garlic.", "Transfer meat and marinade to a pot.", "Add bay leaves and peppercorns; bring to a boil.", "Reduce heat and simmer until meat is tender and sauce is reduced."]
    },
    {
        "id": 45,
        "name": "Lechon Kawali",
        "description": "Crispy deep-fried pork belly, usually served with a side of dipping sauce.",
        "ingredients": ["Pork belly slab", "Water", "Salt", "Garlic", "Bay leaves", "Frying oil"],
        "steps": ["Boil pork belly with salt, garlic, and bay leaves until tender.", "Air-dry the boiled pork belly thoroughly.", "Deep-fry the pork belly in hot oil until the skin is golden and crispy.", "Chop into serving pieces and serve with liver sauce."]
    },
    {
        "id": 46,
        "name": "Lumpia (Filipino Spring Rolls)",
        "description": "Savory, crispy fried spring rolls filled with a mixture of ground meat and vegetables.",
        "ingredients": ["Ground pork or beef", "Lumpia wrappers", "Carrots (minced)", "Green onions", "Garlic", "Soy sauce"],
        "steps": ["Mix all filling ingredients (meat, vegetables, seasonings).", "Place filling on a wrapper, fold and roll tightly.", "Fry the lumpia in hot oil until golden brown.", "Drain and serve with a sweet and sour dipping sauce."]
    },
    {
        "id": 47,
        "name": "Sinigang na Baboy",
        "description": "A sour and savory Filipino soup with pork and various vegetables, flavored primarily with tamarind.",
        "ingredients": ["Pork cuts (ribs/belly)", "Tamarind mix (sampaloc)", "Radish (labanos)", "Taro (gabi)", "Water spinach (kangkong)", "Green chili"],
        "steps": ["Boil pork until tender, skimming any scum.", "Add taro, radish, and tamarind mix; simmer.", "Add other vegetables (string beans, okra, water spinach).", "Season with fish sauce to taste and serve hot."]
    },
    {
        "id": 48,
        "name": "Pork Barbecue Skewers (Filipino Style)",
        "description": "Sweet, savory, and tender slices of pork marinated and skewered before grilling.",
        "ingredients": ["Pork shoulder (thinly sliced)", "Soy sauce", "Banana ketchup", "Brown sugar", "Garlic", "Lemon/Calamansi juice"],
        "steps": ["Marinate pork slices in all ingredients for at least 6 hours or overnight.", "Thread pork onto bamboo skewers.", "Grill over hot coals, basting occasionally with the marinade.", "Cook until meat is tender and slightly charred."]
    },
    {
        "id": 49,
        "name": "Pancit Canton",
        "description": "A classic Filipino noodle dish made with wheat flour noodles, meat, and mixed vegetables.",
        "ingredients": ["Pancit Canton noodles", "Chicken or pork strips", "Shrimp", "Cabbage", "Carrots", "Soy sauce", "Oyster sauce"],
        "steps": ["Sauté meat and shrimp.", "Add vegetables and cook until crisp-tender.", "Add broth, soy sauce, and oyster sauce; bring to a boil.", "Toss in the noodles and cook until liquid is absorbed and noodles are tender."]
    },
    {
        "id": 50,
        "name": "Kare-Kare",
        "description": "A rich Filipino stew made from oxtail, tripe, and vegetables, stewed in a thick peanut sauce.",
        "ingredients": ["Oxtail and/or Tripe", "Peanut butter (unsweetened)", "Annatto seeds (achuete)", "String beans", "Eggplant", "Pechay (Chinese cabbage)", "Shrimp paste (bagoong)"],
        "steps": ["Boil oxtail/tripe until very tender.", "Sauté aromatics and annatto oil.", "Add broth and peanut butter; simmer to thicken.", "Add meat and vegetables; cook until tender.", "Serve hot with a side of shrimp paste."]
    },
    {
        "id": 51,
        "name": "Adobong Pusit",
        "description": "Squid (pusit) cooked in the classic adobo style, with soy sauce, vinegar, and its own ink.",
        "ingredients": ["Squid (with ink sac intact)", "Soy sauce", "Vinegar", "Garlic", "Onion", "Chili pepper"],
        "steps": ["Sauté garlic and onion.", "Add the cleaned squid and soy sauce.", "Stir in vinegar, squid ink, and chili; do not stir immediately after adding vinegar.", "Simmer until sauce thickens and squid is cooked through."]
    },
    {
        "id": 52,
        "name": "Rellenong Bangus (Stuffed Milkfish)",
        "description": "Deboned milkfish (bangus) stuffed with a savory filling of flaked fish, vegetables, and seasoning, then fried.",
        "ingredients": ["Whole milkfish (bangus)", "Ground pork", "Carrots (minced)", "Raisins", "Peas", "Soy sauce", "Egg"],
        "steps": ["Debone and scrape the fish meat, leaving the skin intact.", "Mix scraped fish meat with other filling ingredients.", "Stuff the fish skin with the mixture and seal.", "Fry or bake until cooked and golden."]
    },
    {
        "id": 53,
        "name": "Buko Pandan",
        "description": "A Filipino dessert made from young coconut meat (buko) and pandan-flavored gelatin in a sweet cream.",
        "ingredients": ["Young coconut meat (buko)", "Pandan-flavored gelatin", "Sweetened condensed milk", "All-purpose cream", "Shredded coconut"],
        "steps": ["Prepare pandan-flavored gelatin, let it set, and cube.", "Mix cream, condensed milk, and shredded coconut.", "Combine the cream mixture, cubed gelatin, and buko strips.", "Chill thoroughly before serving."]
    },
    {
        "id": 54,
        "name": "Silog (Sinangag at Itlog)",
        "description": "A general term for a Filipino breakfast plate: a main protein served with Sinangag (garlic rice) and Itlog (fried egg).",
        "ingredients": ["Fried main protein (e.g., Tapa, Tocino, Longganisa)", "Rice (day-old)", "Garlic", "Eggs", "Oil", "Salt"],
        "steps": ["Sauté crushed garlic in oil, then add rice and salt to make Sinangag.", "Cook the main protein.", "Fry the eggs sunny-side up.", "Serve all three components together."]
    },
    {
        "id": 55,
        "name": "Tokwa't Baboy",
        "description": "A popular side dish or appetizer of fried tofu (tokwa) and boiled pork (baboy) in a savory-sour vinegar and soy sauce dressing.",
        "ingredients": ["Firm tofu", "Pork belly (boiled)", "Soy sauce", "Vinegar", "Onion (red)", "Black pepper"],
        "steps": ["Fry cubed tofu until golden and crispy.", "Slice the boiled pork belly.", "Mix soy sauce, vinegar, and pepper for the dressing.", "Toss the tofu and pork with the dressing and sliced red onion."]
    },
    {
        "id": 56,
        "name": "Kinilaw",
        "description": "Filipino ceviche: raw fish marinated in vinegar, chilies, ginger, and onion.",
        "ingredients": ["Fresh raw fish fillet (tuna or tanigue)", "Cane vinegar", "Ginger (minced)", "Red onion", "Green chili", "Salt and pepper"],
        "steps": ["Cube the fish fillets.", "Pour the vinegar over the fish and let it 'cook' for 5-10 minutes.", "Drain most of the vinegar.", "Toss the fish with ginger, onion, chilies, and seasonings."]
    },
    {
        "id": 57,
        "name": "Puto (Steamed Rice Cake)",
        "description": "Small, fluffy steamed rice cakes, often served with grated coconut or cheese.",
        "ingredients": ["Rice flour", "Sugar", "Baking powder", "Milk", "Water", "Cheese slices (topping)"],
        "steps": ["Mix dry ingredients, then add milk and water to form a smooth batter.", "Pour into individual molds (ramekins or small cupcake liners).", "Top with a small slice of cheese.", "Steam for 15-20 minutes until cooked through."]
    },
    {
        "id": 58,
        "name": "Tinola",
        "description": "A comforting chicken soup with ginger, green papaya (or chayote), and chili leaves.",
        "ingredients": ["Chicken", "Ginger", "Green papaya or chayote", "Chili leaves (dahon ng sili)", "Onion", "Garlic", "Fish sauce"],
        "steps": ["Sauté ginger, garlic, and onion.", "Add chicken and fish sauce.", "Add water and simmer until chicken is cooked.", "Add papaya and leaves just before serving."]
    },
    {
        "id": 59,
        "name": "Sisig",
        "description": "A sizzling dish made from chopped pig parts and chicken liver, seasoned with calamansi, onions, and chili peppers.",
        "ingredients": ["Pig ears/mask", "Chicken liver", "Onion", "Calamansi", "Chili peppers", "Mayonnaise (optional)", "Soy sauce"],
        "steps": ["Boil and grill the pork parts.", "Chop pork and liver into small pieces.", "Sauté with onions and chilies.", "Season with soy sauce and calamansi. Serve on a sizzling plate."]
    },
    {
        "id": 60,
        "name": "Bulalo",
        "description": "A light colored soup that is made by cooking beef shanks and marrow bones until the collagen and fat has melted into the clear broth.",
        "ingredients": ["Beef shank with marrow", "Corn on the cob", "Cabbage", "Peppercorns", "Onion", "Fish sauce"],
        "steps": ["Boil beef shanks with onions and peppercorns for hours until tender.", "Add corn and simmer.", "Add cabbage and season with fish sauce.", "Serve hot with the marrow intact."]
    },
    {
        "id": 61,
        "name": "Halo-Halo",
        "description": "A popular cold dessert which is a concoction of crushed ice, evaporated milk and various ingredients.",
        "ingredients": ["Shaved ice", "Evaporated milk", "Ube halaya", "Leche flan", "Sweet beans", "Coconut gel (nata de coco)", "Jackfruit"],
        "steps": ["Layer sweet ingredients in a tall glass.", "Fill with shaved ice.", "Pour evaporated milk over the ice.", "Top with ube, leche flan, and pinipig."]
    },
    {
        "id": 62,
        "name": "Palabok",
        "description": "Rice noodles topped with a golden shrimp sauce, crushed chicharon, tinapa flakes, and hard-boiled eggs.",
        "ingredients": ["Rice noodles (bihon)", "Shrimp sauce (annatto oil base)", "Shrimp", "Chicharon (crushed)", "Tinapa flakes", "Hard-boiled eggs", "Spring onions"],
        "steps": ["Cook noodles and set aside.", "Prepare the shrimp sauce with broth and annatto.", "Pour sauce over noodles.", "Garnish generously with toppings."]
    },
    {
        "id": 63,
        "name": "Bistek Tagalog",
        "description": "Filipino beef steak marinated in soy sauce and calamansi, topped with onion rings.",
        "ingredients": ["Beef sirloin (thinly sliced)", "Soy sauce", "Calamansi juice", "Onion rings", "Garlic", "Black pepper"],
        "steps": ["Marinate beef in soy sauce, calamansi, and pepper.", "Pan-fry beef slices and set aside.", "Sauté onions and add the marinade.", "Simmer beef in the sauce until tender."]
    },
    {
        "id": 64,
        "name": "Dinuguan",
        "description": "A savory stew of pork offal and/or meat simmered in a rich, spicy dark gravy of pig blood, garlic, chili, and vinegar.",
        "ingredients": ["Pork belly", "Pork blood", "Vinegar", "Green chili", "Garlic", "Onion", "Oregano (optional)"],
        "steps": ["Sauté garlic and onion.", "Brown the pork.", "Add vinegar and bring to a boil without stirring.", "Stir in pork blood and simmer until thick. Add chilies."]
    },
    {
        "id": 65,
        "name": "Laing",
        "description": "Dried taro leaves cooked in coconut milk and chili peppers.",
        "ingredients": ["Dried taro leaves", "Coconut milk", "Coconut cream", "Shrimp paste", "Pork belly", "Chili peppers", "Ginger"],
        "steps": ["Combine coconut milk, spices, and pork in a pot.", "Add dried taro leaves (do not stir initially).", "Simmer until leaves absorb the liquid.", "Add coconut cream and cook until oil separates."]
    },
    {
        "id": 66,
        "name": "Pinakbet",
        "description": "An indigenous Filipino dish from the northern regions, made of mixed vegetables steamed in fish or shrimp sauce.",
        "ingredients": ["Bitter melon (ampalaya)", "Eggplant", "Okra", "Squash", "String beans", "Pork belly", "Shrimp paste (bagoong)"],
        "steps": ["Sauté pork and shrimp paste.", "Layer vegetables in the pot (squash first, leafy greens last).", "Add a little water and simmer until vegetables are cooked but crisp."]
    },
    {
        "id": 67,
        "name": "Caldereta",
        "description": "A hearty meat stew (beef, goat, or pork) with tomato sauce, liver spread, and cheese.",
        "ingredients": ["Beef chunks", "Tomato sauce", "Liver spread", "Potatoes", "Carrots", "Bell peppers", "Cheese"],
        "steps": ["Sear the meat.", "Sauté aromatics and add tomato sauce.", "Simmer meat until tender.", "Add liver spread, vegetables, and cheese to thicken."]
    },
    {
        "id": 68,
        "name": "Arroz Caldo",
        "description": "A Filipino rice porridge with chicken, ginger, and garlic, garnished with spring onions and toasted garlic.",
        "ingredients": ["Glutinous rice", "Chicken", "Ginger", "Garlic", "Safflower (kasubha)", "Fish sauce", "Calamansi"],
        "steps": ["Sauté ginger, garlic, and onion.", "Add chicken and rice.", "Pour in broth and simmer until rice is porridge-like.", "Garnish with toasted garlic and scallions."]
    },
    {
        "id": 69,
        "name": "Champorado",
        "description": "Sweet chocolate rice porridge, traditionally served with tuyo (dried salted fish).",
        "ingredients": ["Glutinous rice", "Tablea (cacao tablets)", "Sugar", "Water", "Evaporated milk"],
        "steps": ["Boil rice in water.", "Add tablea and dissolve.", "Simmer until rice is cooked and mixture is thick.", "Sweeten with sugar and drizzle with milk."]
    },
    {
        "id": 70,
        "name": "Turon",
        "description": "A popular snack made of sliced bananas (saba) dusted with brown sugar, rolled in a spring roll wrapper, and fried.",
        "ingredients": ["Saba bananas", "Jackfruit (langka)", "Brown sugar", "Spring roll wrappers", "Oil"],
        "steps": ["Slice bananas lengthwise.", "Roll banana in sugar.", "Place on wrapper with a slice of jackfruit.", "Wrap and deep fry until caramelized."]
    },
    {
        "id": 71,
        "name": "Tortang Talong",
        "description": "An eggplant omelet where grilled eggplants are dipped in an egg mixture and fried.",
        "ingredients": ["Eggplant (long variety)", "Eggs", "Salt", "Pepper", "Oil"],
        "steps": ["Grill eggplant until skin is charred.", "Peel off the skin leaving the stem.", "Flatten the eggplant and dip in beaten eggs.", "Pan-fry until golden."]
    },
    {
        "id": 72,
        "name": "Ginataang Kalabasa at Sitaw",
        "description": "Squash and string beans cooked in coconut milk, often with shrimp or pork.",
        "ingredients": ["Squash (cubed)", "String beans", "Coconut milk", "Shrimp", "Garlic", "Onion", "Shrimp paste"],
        "steps": ["Sauté garlic, onion, and shrimp.", "Add squash and coconut milk.", "Simmer until squash is tender.", "Add string beans and cook until done."]
    },
    {
        "id": 73,
        "name": "Longganisa",
        "description": "Filipino sweet or spicy sausage, often served for breakfast.",
        "ingredients": ["Ground pork", "Garlic", "Brown sugar", "Vinegar", "Soy sauce", "Black pepper"],
        "steps": ["Mix all ingredients thoroughly.", "Cure in the fridge for a few days.", "Form into links or patties.", "Fry in a pan until cooked and caramelized."]
    },
    {
        "id": 74,
        "name": "Tapsilog",
        "description": "A famous breakfast meal consisting of Tapa (cured beef), Sinangag (garlic rice), and Itlog (fried egg).",
        "ingredients": ["Beef tapa", "Garlic", "Rice", "Eggs", "Vinegar (for dipping)"],
        "steps": ["Fry the garlic rice.", "Fry the beef tapa.", "Fry the egg sunny-side up.", "Serve all components together on a plate."]
    },
    {
        "id": 75,
        "name": "Menudo",
        "description": "A stew of pork meat and liver cubes with potatoes, carrots, and raisins in tomato sauce.",
        "ingredients": ["Pork", "Pork liver", "Potatoes", "Carrots", "Tomato sauce", "Raisins", "Chickpeas"],
        "steps": ["Sauté garlic and onion.", "Brown the pork and liver.", "Add tomato sauce and water.", "Simmer with vegetables and raisins until tender."]
    },
    {
        "id": 76,
        "name": "Afritada",
        "description": "Chicken or pork stewed in tomato sauce with carrots, potatoes, and red and green bell peppers.",
        "ingredients": ["Chicken", "Tomato sauce", "Potatoes", "Carrots", "Bell peppers", "Peas", "Garlic"],
        "steps": ["Sauté aromatics and chicken.", "Add tomato sauce and simmer.", "Add potatoes and carrots.", "Add bell peppers and peas near the end."]
    },
    {
        "id": 77,
        "name": "Mechado",
        "description": "Beef stew with larded beef chunks, potatoes, and carrots in a rich tomato gravy.",
        "ingredients": ["Beef chunks (with fat insert)", "Tomato sauce", "Soy sauce", "Calamansi", "Potatoes", "Carrots"],
        "steps": ["Marinate beef in soy sauce and calamansi.", "Sear beef.", "Sauté aromatics and add beef back.", "Simmer with tomato sauce until tender, then add veggies."]
    },
    {
        "id": 78,
        "name": "Pochero",
        "description": "A stew influenced by Spanish cuisine, with pork or beef, chorizo, saba bananas, and vegetables.",
        "ingredients": ["Pork belly", "Chorizo de Bilbao", "Saba bananas", "Chickpeas", "Cabbage", "Tomato sauce", "Green beans"],
        "steps": ["Boil meat until tender.", "Add chorizo and tomato sauce.", "Add bananas and chickpeas.", "Add vegetables and cook until done."]
    },
    {
        "id": 79,
        "name": "Embutido",
        "description": "Filipino-style meatloaf wrapped in aluminum foil and steamed.",
        "ingredients": ["Ground pork", "Carrots (minced)", "Raisins", "Pickle relish", "Eggs", "Sausages (center)", "Hard-boiled eggs (center)"],
        "steps": ["Mix ground pork with minced ingredients and raw eggs.", "Spread on foil, place sausages/eggs in center.", "Roll tightly and steam for an hour.", "Slice and serve (can be fried)."]
    },
    {
        "id": 80,
        "name": "Inihaw na Liempo",
        "description": "Grilled pork belly marinated in soy sauce, calamansi, and spices.",
        "ingredients": ["Pork belly", "Soy sauce", "Calamansi", "Garlic", "Banana ketchup", "Brown sugar"],
        "steps": ["Marinate pork belly overnight.", "Grill over charcoal until cooked and charred.", "Baste with marinade while grilling.", "Serve with toyomansi dipping sauce."]
    },
    {
        "id": 81,
        "name": "Bangus Sisig",
        "description": "A healthier version of Sisig using milkfish (bangus) instead of pork.",
        "ingredients": ["Bangus (boneless)", "Onion", "Green chili", "Mayonnaise", "Calamansi", "Soy sauce"],
        "steps": ["Fry the bangus until crispy.", "Flake the fish meat.", "Sauté with onions and chilies.", "Season and mix with mayonnaise."]
    },
    {
        "id": 82,
        "name": "Daing na Bangus",
        "description": "Milkfish marinated in vinegar, garlic, and peppercorns, then fried.",
        "ingredients": ["Milkfish (butterfly cut)", "Vinegar", "Garlic (crushed)", "Peppercorns", "Salt"],
        "steps": ["Marinate fish in vinegar and garlic mixture overnight.", "Drain and fry until golden and crispy.", "Serve with garlic rice."]
    },
    {
        "id": 83,
        "name": "Escabeche",
        "description": "Sweet and sour fish, usually using a whole fried fish topped with a vegetable sauce.",
        "ingredients": ["Whole fish (Lapu-Lapu or Tilapia)", "Ginger", "Bell peppers", "Carrots", "Vinegar", "Sugar", "Ketchup"],
        "steps": ["Fry the fish until crispy.", "Sauté ginger and vegetables.", "Add vinegar, sugar, and ketchup to make sauce.", "Pour sauce over the fried fish."]
    },
    {
        "id": 84,
        "name": "Kinilaw",
        "description": "Raw fish salad cured in vinegar and citrus juices, similar to ceviche but with ginger and coconut milk.",
        "ingredients": ["Fresh tuna or tanigue", "Vinegar", "Calamansi", "Ginger", "Onion", "Chili", "Coconut milk (optional)"],
        "steps": ["Wash fish cubes in vinegar.", "Drain and mix with fresh vinegar and citrus.", "Add ginger, onions, and chilies.", "Chill before serving."]
    },
    {
        "id": 85,
        "name": "Paksiw na Lechon",
        "description": "A stew made from leftover lechon cooked in vinegar and liver sauce.",
        "ingredients": ["Leftover lechon", "Liver sauce (Mang Tomas)", "Vinegar", "Garlic", "Bay leaves", "Sugar"],
        "steps": ["Combine all ingredients in a pot.", "Simmer slowly until meat is tender and sauce thickens.", "Adjust sweetness and sourness."]
    },
    {
        "id": 86,
        "name": "Paksiw na Isda",
        "description": "Fish simmered in vinegar, garlic, ginger, and vegetables.",
        "ingredients": ["Fish (Bangus or Galunggong)", "Vinegar", "Ginger", "Garlic", "Eggplant", "Bitter melon", "Green chili"],
        "steps": ["Arrange vegetables and fish in a pot.", "Pour in vinegar and water.", "Add spices.", "Simmer until fish is cooked."]
    },
    {
        "id": 87,
        "name": "Ginataang Bilo-Bilo",
        "description": "Dessert soup with glutinous rice balls, tubers, and tapioca pearls in coconut milk.",
        "ingredients": ["Glutinous rice flour (for balls)", "Coconut milk", "Sweet potato", "Saba bananas", "Jackfruit", "Tapioca pearls"],
        "steps": ["Form rice flour into small balls.", "Boil coconut milk.", "Add tubers, bananas, and rice balls.", "Simmer until balls float and tubers are soft."]
    },
    {
        "id": 88,
        "name": "Buko Pandan",
        "description": "A popular cold dessert made with young coconut, pandan-flavored gelatin, and cream.",
        "ingredients": ["Young coconut strips", "Pandan gulaman (jelly)", "All-purpose cream", "Condensed milk", "Tapioca pearls"],
        "steps": ["Cook pandan jelly and cut into cubes.", "Mix cream and condensed milk.", "Combine jelly, coconut, and cream mixture.", "Chill before serving."]
    },
    {
        "id": 89,
        "name": "Leche Flan",
        "description": "Filipino crème caramel, a rich custard dessert with a soft caramel top.",
        "ingredients": ["Egg yolks", "Condensed milk", "Evaporated milk", "Sugar (for caramel)", "Vanilla"],
        "steps": ["Caramelize sugar in llaneras (molds).", "Mix yolks and milks gently.", "Pour into molds.", "Steam for 30-45 minutes."]
    },
    {
        "id": 90,
        "name": "Maja Blanca",
        "description": "Coconut pudding made from coconut milk, cornstarch, and corn kernels.",
        "ingredients": ["Coconut milk", "Cornstarch", "Sugar", "Corn kernels", "Milk"],
        "steps": ["Boil coconut milk, sugar, and corn.", "Dissolve cornstarch in milk/water.", "Stir into boiling mixture until thick.", "Pour into a tray and cool."]
    },
    {
        "id": 91,
        "name": "Kutsinta",
        "description": "A type of sticky rice cake, brownish-red in color, served with grated coconut.",
        "ingredients": ["Rice flour", "All-purpose flour", "Brown sugar", "Lye water", "Annatto seeds (for color)"],
        "steps": ["Mix flours, sugar, and water.", "Add lye water and color.", "Pour into molds.", "Steam until set. Serve with coconut."]
    },
    {
        "id": 92,
        "name": "Puto",
        "description": "Steamed rice cakes, often eaten as a snack or with Dinuguan.",
        "ingredients": ["Rice flour", "Sugar", "Baking powder", "Water/Milk", "Cheese (topping)"],
        "steps": ["Mix dry and wet ingredients to form a batter.", "Pour into molds.", "Steam for 10-15 minutes.", "Top with cheese."]
    },
    {
        "id": 93,
        "name": "Bibingka",
        "description": "A rice cake traditionally cooked in clay pots lined with banana leaves, topped with salted egg and cheese.",
        "ingredients": ["Rice flour", "Coconut milk", "Eggs", "Sugar", "Salted egg", "Cheese", "Butter"],
        "steps": ["Make batter with flour and coconut milk.", "Pour into lined mold.", "Top with salted egg and cheese.", "Bake until golden."]
    },
    {
        "id": 94,
        "name": "Suman",
        "description": "Glutinous rice cooked in coconut milk and wrapped in banana leaves or palm leaves.",
        "ingredients": ["Glutinous rice", "Coconut milk", "Sugar", "Salt", "Banana leaves"],
        "steps": ["Cook rice in coconut milk until half-done.", "Wrap in banana leaves.", "Steam until fully cooked.", "Serve with sugar or latik."]
    },
    {
        "id": 95,
        "name": "Chicken Inasal",
        "description": "Grilled chicken from the Bacolod region, marinated in lemongrass, calamansi, and vinegar, basted with annatto oil.",
        "ingredients": ["Chicken legs/thighs", "Lemongrass", "Calamansi", "Vinegar", "Garlic", "Annatto oil"],
        "steps": ["Marinate chicken in lemongrass and vinegar mix.", "Grill over charcoal.", "Baste frequently with annatto oil.", "Serve with garlic rice."]
    },
    {
        "id": 96,
        "name": "Batchoy",
        "description": "A noodle soup made with pork offal, crushed pork cracklings, chicken stock, beef loin and round noodles.",
        "ingredients": ["Miki noodles", "Pork stock", "Pork liver", "Pork intestines", "Chicharon", "Garlic"],
        "steps": ["Prepare rich pork broth.", "Blanch noodles.", "Top with sliced meats and liver.", "Pour hot broth and garnish with chicharon."]
    },
    {
        "id": 97,
        "name": "Sopas",
        "description": "Creamy macaroni soup made with chicken and vegetables.",
        "ingredients": ["Elbow macaroni", "Chicken", "Evaporated milk", "Carrots", "Cabbage", "Hotdogs (optional)"],
        "steps": ["Boil chicken to make broth.", "Sauté aromatics and chicken.", "Add broth and macaroni.", "Add milk and vegetables near the end."]
    },
    {
        "id": 98,
        "name": "Adobong Pusit",
        "description": "Squid cooked in its own ink with vinegar and garlic.",
        "ingredients": ["Squid", "Vinegar", "Soy sauce", "Garlic", "Onion", "Tomatoes", "Green chili"],
        "steps": ["Sauté garlic, onion, and tomatoes.", "Add squid and cook briefly.", "Add vinegar and soy sauce.", "Simmer until sauce is dark and thick. Do not overcook squid."]
    },
    {
        "id": 99,
        "name": "Misua with Meatballs",
        "description": "Soup made with thin flour noodles (misua) and pork meatballs.",
        "ingredients": ["Misua noodles", "Ground pork", "Patola (sponge gourd)", "Garlic", "Onion", "Broth"],
        "steps": ["Form ground pork into balls.", "Sauté aromatics and brown the meatballs.", "Add broth and simmer.", "Add patola and misua noodles (cooks very fast)."]
    },
    {
        "id": 100,
        "name": "Ginataang Manok",
        "description": "Chicken stewed in coconut milk with green papaya and spinach.",
        "ingredients": ["Chicken", "Coconut milk", "Green papaya", "Spinach or chili leaves", "Ginger", "Garlic"],
        "steps": ["Sauté ginger, garlic, and chicken.", "Add coconut milk and simmer.", "Add papaya and cook until tender.", "Add leafy greens."]
    },
    {
        "id": 101,
        "name": "Humba",
        "description": "A Visayan braised pork dish similar to adobo but sweeter and with fermented black beans.",
        "ingredients": ["Pork belly", "Pineapple juice", "Soy sauce", "Brown sugar", "Salted black beans (tausi)", "Banana blossoms"],
        "steps": ["Marinate pork in soy sauce and pineapple juice.", "Sauté aromatics and pork.", "Simmer with marinade, sugar, and tausi.", "Cook until pork is meltingly tender."]
    },
    {
        "id": 102,
        "name": "Pork Binagoongan",
        "description": "Pork stewed in shrimp paste, tomatoes, and chili.",
        "ingredients": ["Pork belly", "Shrimp paste (bagoong)", "Tomatoes", "Garlic", "Onion", "Chili peppers", "Eggplant (optional)"],
        "steps": ["Sauté garlic, onion, and tomatoes.", "Add pork and brown.", "Add shrimp paste and simmer.", "Add chilies and vinegar to balance."]
    },
    {
        "id": 103,
        "name": "Rellenong Bangus",
        "description": "Stuffed milkfish where the meat is removed, mixed with other ingredients, and stuffed back into the skin.",
        "ingredients": ["Whole milkfish", "Ground pork", "Carrots", "Raisins", "Peas", "Lemon juice"],
        "steps": ["Remove meat from fish skin intact.", "Cook meat with fillers.", "Stuff mixture back into skin.", "Fry or bake the whole fish."]
    },
    {
        "id": 104,
        "name": "Sizzling Tofu",
        "description": "Fried tofu cubes served on a sizzling plate with a savory mayonnaise dressing.",
        "ingredients": ["Firm tofu", "Mayonnaise", "Oyster sauce", "Green chilies", "Onion", "Bell peppers"],
        "steps": ["Deep fry tofu cubes.", "Sauté onions and peppers.", "Mix mayonnaise and oyster sauce.", "Toss tofu in sauce and serve sizzling."]
    },
    {
        "id": 105,
        "name": "Tokwa't Baboy",
        "description": "Boiled pork ears/belly and fried tofu served with a soy-vinegar dip.",
        "ingredients": ["Pork ears/belly", "Firm tofu", "Soy sauce", "Vinegar", "Onion", "Chili"],
        "steps": ["Boil pork until tender and cut into cubes.", "Fry tofu and cut into cubes.", "Mix sauce ingredients.", "Toss pork and tofu in the sauce."]
    },
    {
        "id": 106,
        "name": "Kalderetang Kambing",
        "description": "Goat meat stewed in tomato sauce, similar to beef caldereta but with goat meat.",
        "ingredients": ["Goat meat", "Tomato sauce", "Liver spread", "Peanut butter", "Bell peppers", "Chili"],
        "steps": ["Marinate goat to remove gamey smell.", "Sauté and simmer in tomato sauce.", "Add liver spread and peanut butter for thickness.", "Add vegetables."]
    },
    {
        "id": 107,
        "name": "Papaitan",
        "description": "A bitter soup made from goat or beef innards and bile.",
        "ingredients": ["Goat/Beef innards", "Bile", "Ginger", "Garlic", "Onion", "Tamarind"],
        "steps": ["Clean innards thoroughly.", "Sauté aromatics and innards.", "Add water and simmer until tender.", "Add bile sparingly for bitterness."]
    },
    {
        "id": 108,
        "name": "Igado",
        "description": "An Ilocano dish made of pork tenderloin and liver strips in a soy-vinegar sauce.",
        "ingredients": ["Pork tenderloin", "Pork liver", "Soy sauce", "Vinegar", "Bell peppers", "Peas"],
        "steps": ["Marinate pork and liver.", "Sauté garlic and onion.", "Cook meat until tender.", "Add liver last to prevent hardening."]
    },
    {
        "id": 109,
        "name": "Dinengdeng",
        "description": "Ilocano vegetable soup with bagoong monamon (fermented fish sauce) and grilled fish.",
        "ingredients": ["Mixed local vegetables", "Bagoong monamon", "Grilled fish", "Bamboo shoots", "Jute leaves (saluyot)"],
        "steps": ["Boil water with bagoong.", "Add grilled fish for flavor.", "Add vegetables in order of cooking time.", "Simmer until done."]
    },
    {
        "id": 110,
        "name": "Bringhe",
        "description": "Filipino version of Paella made with glutinous rice, coconut milk, and turmeric.",
        "ingredients": ["Glutinous rice", "Coconut milk", "Turmeric", "Chicken", "Chorizo", "Bell peppers", "Boiled eggs"],
        "steps": ["Sauté chicken and chorizo.", "Add rice and turmeric.", "Add coconut milk and simmer covered.", "Garnish with peppers and eggs."]
    },
    {
        "id": 111,
        "name": "Kadyos, Baboy, at Langka (KBL)",
        "description": "A Visayan soup with pigeon peas (kadyos), pork, and jackfruit.",
        "ingredients": ["Pork leg/hock", "Pigeon peas (kadyos)", "Unripe jackfruit", "Batwan (souring agent)"],
        "steps": ["Boil pork until tender.", "Add kadyos and simmer.", "Add jackfruit pieces.", "Sour the broth with batwan."]
    },
    {
        "id": 112,
        "name": "Chicken Curry (Filipino Style)",
        "description": "Chicken stewed in coconut milk with curry powder, potatoes, and carrots.",
        "ingredients": ["Chicken", "Coconut milk", "Curry powder", "Potatoes", "Carrots", "Bell peppers", "Ginger"],
        "steps": ["Sauté ginger and chicken.", "Add curry powder.", "Add coconut milk and simmer.", "Add vegetables and cook until tender."]
    },
    {
        "id": 113,
        "name": "Pork Steak",
        "description": "Pork chops braised in soy sauce, citrus, and onions.",
        "ingredients": ["Pork chops", "Soy sauce", "Calamansi/Lemon", "Onion rings", "Garlic"],
        "steps": ["Marinate pork chops.", "Pan fry chops.", "Sauté onions.", "Simmer chops in marinade until tender."]
    },
    {
        "id": 114,
        "name": "Tortang Giniling",
        "description": "Ground meat omelet.",
        "ingredients": ["Ground pork/beef", "Eggs", "Potatoes (diced)", "Carrots (diced)", "Garlic", "Onion"],
        "steps": ["Sauté ground meat with diced veggies.", "Beat eggs and mix with cooked meat.", "Fry as patties or one large omelet."]
    },
    {
        "id": 115,
        "name": "Gising-Gising",
        "description": "Spicy green bean stalks (or winged beans) cooked in coconut milk.",
        "ingredients": ["Winged beans (sigarilyas) or green beans", "Ground pork", "Coconut milk", "Chili peppers", "Shrimp paste"],
        "steps": ["Sauté pork and shrimp paste.", "Add coconut milk and chilies.", "Add chopped beans.", "Simmer until sauce is thick."]
    },
    {
        "id": 116,
        "name": "Nilagang Baka",
        "description": "Boiled beef soup with vegetables.",
        "ingredients": ["Beef brisket/shank", "Cabbage", "Potatoes", "Corn", "Peppercorns", "Onion"],
        "steps": ["Boil beef with onions and pepper until tender.", "Add corn and potatoes.", "Add cabbage/bok choy.", "Serve hot."]
    },
    {
        "id": 117,
        "name": "Picadillo",
        "description": "Ground beef stew with potatoes and carrots (soupy version of Giniling).",
        "ingredients": ["Ground beef", "Potatoes", "Carrots", "Peas", "Raisins", "Tomato sauce"],
        "steps": ["Sauté aromatics and beef.", "Add tomato sauce and water.", "Add diced vegetables.", "Simmer until cooked."]
    },
    {
        "id": 118,
        "name": "Hardinera",
        "description": "Lucban meatloaf steamed in oval tins, festive and colorful.",
        "ingredients": ["Diced pork", "Luncheon meat", "Pineapple chunks", "Cheese", "Eggs", "Tomato sauce"],
        "steps": ["Sauté pork and mix with other ingredients.", "Decorate llanera bottom with peppers/eggs.", "Pour mixture in.", "Steam until set."]
    },
    {
        "id": 119,
        "name": "Everlasting",
        "description": "Marikina style meatloaf, similar to Hardinera.",
        "ingredients": ["Ground pork", "Chorizo", "Tomato sauce", "Pickle relish", "Eggs"],
        "steps": ["Cook the meat mixture first.", "Place in llaneras.", "Steam to set the shape.", "Serve with bread or rice."]
    },
    {
        "id": 120,
        "name": "Camaron Rebosado",
        "description": "Filipino breaded fried shrimp.",
        "ingredients": ["Shrimp", "Flour", "Eggs", "Breadcrumbs", "Calamansi", "Salt"],
        "steps": ["Marinate shrimp in calamansi.", "Dip in flour, egg, then breadcrumbs.", "Deep fry until golden.", "Serve with sweet and sour sauce."]
    },
    {
        "id": 121,
        "name": "Pork Barbecue",
        "description": "Skewered pork slices marinated in a sweet soy-garlic mixture and grilled.",
        "ingredients": ["Pork shoulder (sliced)", "Soy sauce", "Banana ketchup", "Sprite/7-Up", "Garlic", "Brown sugar"],
        "steps": ["Marinate pork slices overnight.", "Thread onto bamboo skewers.", "Grill over charcoal, basting with marinade.", "Serve with vinegar dip."]
    },
    {
        "id": 122,
        "name": "Chicken Pastil",
        "description": "Shredded chicken cooked in soy sauce and oil, served over rice in banana leaves.",
        "ingredients": ["Chicken breast", "Soy sauce", "Vinegar", "Garlic", "Onion", "Oil"],
        "steps": ["Boil and shred chicken.", "Sauté garlic and onion.", "Add chicken and seasonings.", "Cook until dry and oily. Serve over rice."]
    },
    {
        "id": 123,
        "name": "Insaladang Talong",
        "description": "Grilled eggplant salad with tomatoes and onions.",
        "ingredients": ["Eggplant", "Tomatoes", "Onion", "Vinegar", "Salt/Bagoong"],
        "steps": ["Grill eggplant and peel.", "Mash the flesh.", "Mix with chopped tomatoes and onions.", "Season with vinegar and salt."]
    },
    {
        "id": 124,
        "name": "Atchara",
        "description": "Pickled green papaya relish.",
        "ingredients": ["Green papaya (shredded)", "Carrots", "Bell peppers", "Raisins", "Vinegar", "Sugar"],
        "steps": ["Salt papaya to remove water.", "Boil vinegar and sugar syrup.", "Pack papaya and veggies in a jar.", "Pour hot syrup over."]
    },
    {
        "id": 125,
        "name": "Banana Cue",
        "description": "Deep-fried saba bananas coated in caramelized brown sugar.",
        "ingredients": ["Saba bananas", "Brown sugar", "Oil"],
        "steps": ["Heat oil.", "Add sugar to oil.", "Add bananas and stir until coated with caramel.", "Skewer on bamboo sticks."]
    },
    {
        "id": 126,
        "name": "Carioca",
        "description": "Fried sticky rice balls coated in caramel.",
        "ingredients": ["Glutinous rice flour", "Coconut (shredded)", "Coconut milk", "Sugar (for coating)"],
        "steps": ["Mix flour, coconut, and milk.", "Form balls and deep fry.", "Melt sugar to make caramel.", "Roll balls in caramel."]
    },
    {
        "id": 127,
        "name": "Biko",
        "description": "Sweet sticky rice cake topped with latik (coconut curds).",
        "ingredients": ["Glutinous rice", "Coconut milk", "Brown sugar", "Ginger (optional)"],
        "steps": ["Cook rice with coconut milk and water.", "Make syrup with milk and sugar.", "Mix rice into syrup and thicken.", "Top with latik."]
    },
    {
        "id": 128,
        "name": "Espasol",
        "description": "Rice cake made from toasted rice flour and coconut milk.",
        "ingredients": ["Glutinous rice flour (toasted)", "Coconut milk", "Sugar", "Vanilla"],
        "steps": ["Boil coconut milk and sugar.", "Add toasted flour slowly.", "Cook until thick and pliable.", "Roll in more toasted flour."]
    },
    {
        "id": 129,
        "name": "Sapin-Sapin",
        "description": "Layered glutinous rice and coconut dessert.",
        "ingredients": ["Glutinous rice flour", "Coconut milk", "Sugar", "Food coloring (violet, yellow)"],
        "steps": ["Make batter.", "Divide and color portions.", "Steam layer by layer.", "Top with latik."]
    },
    {
        "id": 130,
        "name": "Pichi-Pichi",
        "description": "Steamed cassava cake coated in grated coconut or cheese.",
        "ingredients": ["Cassava (grated)", "Sugar", "Water", "Lye water", "Coconut/Cheese"],
        "steps": ["Mix cassava, sugar, and water.", "Pour into molds.", "Steam until translucent.", "Roll in coconut or cheese."]
    },
    {
        "id": 131,
        "name": "Cassava Cake",
        "description": "Baked dessert made from grated cassava and coconut milk.",
        "ingredients": ["Grated cassava", "Coconut milk", "Condensed milk", "Eggs", "Cheese"],
        "steps": ["Mix all ingredients.", "Bake until set.", "Pour custard topping.", "Bake again until golden."]
    },
    {
        "id": 132,
        "name": "Ube Halaya",
        "description": "Purple yam jam.",
        "ingredients": ["Purple yam (boiled/mashed)", "Condensed milk", "Coconut milk", "Butter"],
        "steps": ["Combine all ingredients in a pan.", "Cook over low heat, stirring constantly.", "Cook until thick and sticky.", "Mold and cool."]
    },
    {
        "id": 133,
        "name": "Binignit",
        "description": "Visayan version of Ginataang Bilo-Bilo, often eaten during Holy Week.",
        "ingredients": ["Coconut milk", "Landang (palm flour jelly)", "Saba bananas", "Sweet potato", "Taro"],
        "steps": ["Boil coconut milk.", "Add root crops and bananas.", "Add landang.", "Sweeten with sugar."]
    },
    {
        "id": 134,
        "name": "Puto Bumbong",
        "description": "Purple rice cake steamed in bamboo tubes, popular at Christmas.",
        "ingredients": ["Pirurutong rice (purple rice)", "Coconut (grated)", "Muscovado sugar", "Butter"],
        "steps": ["Soak and grind rice.", "Steam in bamboo tubes.", "Serve with butter, coconut, and sugar."]
    },
    {
        "id": 135,
        "name": "Sotanghon Guisado",
        "description": "Stir-fried cellophane noodles.",
        "ingredients": ["Vermicelli noodles (sotanghon)", "Chicken", "Wood ear mushrooms", "Carrots", "Annatto oil"],
        "steps": ["Soak noodles.", "Sauté chicken and veggies.", "Add broth and noodles.", "Cook until liquid is absorbed."]
    },
    {
        "id": 136,
        "name": "Misua Soup",
        "description": "Comforting soup with thin wheat noodles.",
        "ingredients": ["Misua", "Ground pork", "Garlic", "Onion", "Broth"],
        "steps": ["Sauté aromatics and pork.", "Add broth.", "Add noodles (cooks instantly).", "Serve hot."]
    },
    {
        "id": 137,
        "name": "Lomi",
        "description": "Thick egg noodle soup with a viscous broth.",
        "ingredients": ["Lomi noodles", "Pork liver", "Pork belly", "Eggs", "Cornstarch (slurry)"],
        "steps": ["Sauté meat.", "Add broth and noodles.", "Thicken with cornstarch.", "Stir in beaten eggs."]
    },
    {
        "id": 138,
        "name": "Mami",
        "description": "Noodle soup with beef or chicken broth.",
        "ingredients": ["Egg noodles", "Beef/Chicken broth", "Boiled egg", "Napa cabbage", "Fried garlic"],
        "steps": ["Prepare clear broth.", "Blanch noodles.", "Assemble with meat and toppings.", "Pour hot broth."]
    },
    {
        "id": 139,
        "name": "Goto",
        "description": "Rice porridge with ox tripe.",
        "ingredients": ["Glutinous rice", "Ox tripe", "Ginger", "Garlic", "Beef broth"],
        "steps": ["Clean and boil tripe until tender.", "Sauté ginger and rice.", "Add broth and tripe.", "Simmer until porridge consistency."]
    },
    {
        "id": 140,
        "name": "Lugaw",
        "description": "Plain rice porridge, a base for many toppings.",
        "ingredients": ["Rice", "Water/Broth", "Ginger", "Garlic", "Salt"],
        "steps": ["Boil rice with ginger and water.", "Simmer until grains break down.", "Serve with egg or tokwa."]
    },
    {
        "id": 141,
        "name": "Kikiam",
        "description": "Sausage-like roll made of minced pork and shrimp wrapped in bean curd sheets.",
        "ingredients": ["Ground pork", "Shrimp", "Five-spice powder", "Bean curd sheets"],
        "steps": ["Mix meat filling.", "Wrap in bean curd sheets.", "Steam.", "Slice and fry."]
    },
    {
        "id": 142,
        "name": "Fishball Sauce (Manong's Sauce)",
        "description": "The iconic sweet and spicy brown sauce for street food.",
        "ingredients": ["Water", "Sugar", "Soy sauce", "Cornstarch", "Garlic", "Chili"],
        "steps": ["Mix all ingredients.", "Simmer until thick.", "Serve with fried fishballs."]
    },
    {
        "id": 143,
        "name": "Proben",
        "description": "Deep-fried proventriculus (chicken organ).",
        "ingredients": ["Chicken proventriculus", "Cornstarch", "Flour", "Salt", "Pepper"],
        "steps": ["Clean organ meat.", "Coat in seasoned flour/cornstarch.", "Deep fry until crispy."]
    },
    {
        "id": 144,
        "name": "Kwek-Kwek",
        "description": "Boiled quail eggs coated in orange batter and deep-fried.",
        "ingredients": ["Quail eggs (boiled)", "Flour", "Annatto powder", "Water", "Baking powder"],
        "steps": ["Make orange batter.", "Dip boiled eggs.", "Deep fry until crispy."]
    },
    {
        "id": 145,
        "name": "Isaw",
        "description": "Grilled chicken or pork intestines.",
        "ingredients": ["Intestines", "Vinegar", "Soy sauce", "Ketchup", "Skewers"],
        "steps": ["Clean and boil intestines.", "Marinate.", "Skewer and grill.", "Dip in vinegar."]
    },
    {
        "id": 146,
        "name": "Betamax",
        "description": "Grilled coagulated chicken/pork blood blocks.",
        "ingredients": ["Coagulated blood", "Skewers", "BBQ marinade"],
        "steps": ["Cut blood into blocks.", "Parboil.", "Skewer and grill with sauce."]
    },
    {
        "id": 147,
        "name": "Adidas",
        "description": "Grilled chicken feet.",
        "ingredients": ["Chicken feet", "Soy sauce", "Sugar", "Garlic", "Chili"],
        "steps": ["Clean and boil feet.", "Marinate in sweet soy sauce.", "Grill until charred."]
    },
    {
        "id": 148,
        "name": "Helmet",
        "description": "Grilled chicken heads.",
        "ingredients": ["Chicken heads", "BBQ marinade"],
        "steps": ["Clean and trim heads.", "Marinate.", "Grill."]
    },
    {
        "id": 149,
        "name": "Walkman",
        "description": "Grilled pig ears.",
        "ingredients": ["Pig ears", "Soy sauce", "Vinegar", "Spices"],
        "steps": ["Boil ears until tender.", "Slice and skewer.", "Grill."]
    },
    {
        "id": 150,
        "name": "Balut",
        "description": "Fertilized duck egg embryo, boiled and eaten from the shell.",
        "ingredients": ["Balut egg", "Salt", "Vinegar"],
        "steps": ["Boil the egg for 20-30 minutes.", "Crack open the top.", "Drink the soup.", "Eat the embryo with salt/vinegar."]
    }
];

export default recipes;