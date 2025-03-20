const pokemon = [
    {
        "name": "Pikachu",
        "category": "Mouse Pokemon",
        "type": ["Electric"],
        "dexNum": 25,
        "debut": "Generation I"
    },
    {
        "name": "Croagunk",
        "category": "Toxic Mouth Pokemon",
        "type": ["Poison", "Fighting"],
        "dexNum": 453,
        "debut": "Generation IV"
    },
    {
        "name": "Froslass",
        "category": "Snow Land Pokemon",
        "type": ["Ice", "Ghost"],
        "dexNum": 478,
        "debut": "Generation IV"
    },
    {
        "name": "Zigzagoon",
        "category": "Tiny Raccoon Pokemon",
        "type": ["Normal"],
        "dexNum": 263,
        "debut": "Generation III"
    },
    {
        "name": "Fuecoco",
        "category": "Fire Croc Pokemon",
        "type": ["Fire"],
        "dexNum": 909,
        "debut": "Generation IX"
    },
    {
        "name": "Heracross",
        "category": "Single Horn Pokemon",
        "type": ["Bug", "Fighting"],
        "dexNum": 214,
        "debut": "Generation II"
    },
    {
        "name": "Cyndaquil",
        "category": "Fire Mouse Pokemon",
        "type": ["Fire"],
        "dexNum": 155,
        "debut": "Generation II"
    },
    {
        "name": "Dunsparce",
        "category": "Land Snake Pokemon",
        "type": ["Normal"],
        "dexNum": 206,
        "debut": "Generation II"
    },
    {
        "name": "Snom",
        "category": "Worm Pokemon",
        "type": ["Ice", "Bug"],
        "dexNum": 872,
        "debut": "Generation VIII"
    },
]

export const getAllPokes = () => pokemon;

export const getOnePoke = (name) => pokemon.find(pokemon => pokemon.name === name);