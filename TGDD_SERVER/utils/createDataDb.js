"use strict"

const Swatch = require("../models/Swatch")

const listProductId = [
    "4241412000773",
    "4241412000035",
    "1073200001027",
    "1073200001028",
    "1073200001029",
    "1073200001030",
    "1073200001031",
    "1073200001032",
    "1073200001093",
    "1073200001094",
    "1073200001097",
    "1073200001099",
    "1073200001100",
    "1073200001101",
    "1073200001102",
    "1073200001103",
    "1073200001111",
    "1073200001112",
    "1073200001113",
    "1073200001116",
    "1073200001117",
    "1073200001118",
    "1073200001119",
    "1073200001120",
    "1073200001122",
    "1073200001126",
    "1073200001127",
    "1073200001128",
    "1073200001129",
    "1073200001130",
    "1073200001131",
    "1073200001132",
    "1475932000001",
    "1475932000002",
    "1475087000009",
    "1475087000045",
    "9252713000040",
    "9252713000041",
    "9252713000054",
    "9252713000055",
    "9252713000058",
    "9252713000059",
    "9252713000068",
    "9252713000069",
    "1052846000213",
    "1053379000025",
    "1052846000427",
    "1052846000465",
    "1053379000026",
    "1052846000428",
    "1052846000466",
    "1052846000613",
    "1052846000552",
    "1052846000534",
    "9252834000403",
    "1193696000229",
    "8935049002109",
    "8935049002345",
    "8935049005582",
    "8935049005599",
    "9892845000325",
    "9892845000327",
    "9892845000326",
    "9892845000328",
    "1475087000004",
    "1475087000091",
    "9252711000276",
    "9252711000277",
    "9252713000028",
    "9252713000032",
    "9252713000038",
    "9252713000051",
    "9252713000052",
    "9252713000053",
    "9252713000056",
    "9252713000057",
    "1073200001033",
    "1073200001034",
    "1073200001035",
    "1073200001036",
    "1073200001037",
    "1073200001038",
    "1073200001039",
    "1073200001040",
    "1073200001041",
    "1073200001042",
    "1475913000006",
    "1475913000007",
    "1475913000008",
    "1475913000009",
    "1475913000010",
    "1475913000011",
    "1475913000012",
    "1475913000013",
    "1475913000014",
    "1475913000015",
    "1475913000016",
    "1475913000017",
    "1475913000018",
    "1475913000019",
    "1475913000020",
    "1475913000021",
    "1475913000022",
    "1475913000023",
    "1475913000024",
    "1475913000025",
    "1475913000026",
    "1475913000027",
    "1475913000028",
    "1475913000029",
    "1475913000030",
    "1475913000031",
    "1475913000032",
    "1475913000033",
    "1475913000034",
    "1475913000035",
    "1475913000036",
    "1475913000037",
    "1475913000038",
    "1475913000039",
    "1475913000040",
    "1475913000041",
    "1475913000042",
    "1475913000043",
    "1475913000044",
    "1475913000045",
    "1475920000047",
    "1475920000048",
    "1475920000049",
    "1475920000050",
    "1475920000051",
    "1475920000052",
    "1475920000053",
    "1475920000054",
    "1475920000055",
    "1475920000056",
    "1475935000005",
    "1475935000006",
    "1475935000007",
    "1475935000008",
    "1475935000009",
    "1475935000010",
    "1475935000011",
    "1475935000012",
    "1475935000013",
    "1475935000014",
    "1475935000015",
    "1475935000016",
    "1475935000017",
    "1475935000018",
    "1475935000019",
    "1475935000020",
    "1475935000021",
    "1475935000022",
    "1475935000023",
    "1475935000024",
    "1475935000025",
    "1475935000026",
    "1475935000027",
    "1475935000028",
    "1475935000029",
    "1475935000030",
    "1475935000031",
    "1475935000032",
    "1475935000033",
    "1475935000034",
    "1475935000035",
    "1475935000036",
    "1476080000004",
    "1476080000005",
    "1476080000006",
    "1476080000007",
    "1476080000008",
    "1476080000009",
    "1476080000010",
    "1476080000011",
    "1476080000012",
    "1476080000013",
    "1476080000014",
    "1476080000015",
    "1476080000016",
    "1476080000017",
    "1476080000018",
    "1476080000019",
    "1476080000020",
    "1476080000021",
    "1476080000022",
    "1476080000023",
    "1476080000024",
    "1476080000025",
    "1476080000027",
    "1476080000028",
    "1193693000538",
    "1193696000683",
    "1193696000684",
    "1193696000711",
    "1193696000712",
    "1193698000331",
    "1052846000630",
    "1052846000628",
    "161031000311",
    "161031000312",
    "161031000313",
    "161031000314",
    "163346000454",
    "163346000455",
    "1193696000685",
    "1193696000747",
    "161031000308",
    "1475086000001",
    "1475086000002",
    "1475086000056",
    "1475087000001",
    "1475087000002",
    "1475087000003",
    "1475087000106",
    "1475087000108",
    "8934755030505",
    "8934755051081",
    "8934755051098",
    "8934755051111",
    "8934755051128",
    "8934755051135",
    "8934755051142",
    "8934755051159",
    "9252711000083",
    "9252711000084",
    "9252711000228",
    "9252711000233",
    "9252711000250",
    "9252711000272",
    "9252711000273",
    "9252711000274",
    "9252711000275",
    "9252711000291",
    "9252711000079",
    "9252711000080",
    "9252711000081",
    "9252711000082",
    "1495930000002",
    "1495930000003",
    "1495930000004",
    "1495931000002",
    "1495931000003",
]

const listPriceProduct = [
    184000, 463000, 71000, 94000, 85000, 141000, 130000, 81000, 60000, 79000,
    56000, 73000, 102000, 138000, 138000, 69000, 134000, 134000, 134000, 102000,
    102000, 102000, 51000, 64000, 73000, 134000, 134000, 107000, 107000, 134000,
    134000, 203000, 138000, 88000, 343000, 398000, 343000, 343000, 343000,
    343000, 343000, 343000, 343000, 343000, 412000, 236000, 449000, 449000,
    477000, 829000, 819000, 1162000, 565000, 462000, 64000, 273000, 241000,
    329000, 366000, 518000, 367000, 344000, 467000, 522000, 343000, 357000,
    357000, 357000, 357000, 357000, 357000, 357000, 357000, 357000, 357000,
    357000, 22000, 150000, 26000, 160000, 57000, 87000, 118000, 65000, 101000,
    149000, 96000, 96000, 96000, 96000, 104000, 104000, 104000, 104000, 104000,
    104000, 104000, 104000, 111000, 111000, 111000, 111000, 119000, 119000,
    119000, 119000, 126000, 126000, 126000, 126000, 100000, 100000, 100000,
    100000, 107000, 107000, 107000, 107000, 109000, 109000, 109000, 109000,
    117000, 117000, 117000, 117000, 156000, 156000, 156000, 156000, 156000,
    156000, 179000, 179000, 179000, 179000, 87000, 87000, 87000, 87000, 94000,
    94000, 94000, 94000, 87000, 87000, 87000, 87000, 94000, 94000, 94000, 94000,
    74000, 74000, 74000, 74000, 81000, 81000, 81000, 81000, 106000, 106000,
    106000, 106000, 113000, 113000, 113000, 113000, 171000, 171000, 171000,
    171000, 171000, 171000, 134000, 134000, 134000, 134000, 134000, 134000,
    134000, 134000, 79000, 79000, 79000, 79000, 79000, 79000, 79000, 79000,
    179000, 179000, 444000, 273000, 273000, 264000, 259000, 255000, 703000,
    425000, 409000, 409000, 409000, 409000, 264000, 264000, 306000, 357000,
    500000, 315000, 315000, 314000, 193000, 220000, 271000, 296000, 296000,
    120000, 220000, 220000, 220000, 271000, 271000, 271000, 271000, 144000,
    194000, 315000, 315000, 194000, 412000, 412000, 412000, 412000, 412000,
    374000, 374000, 374000, 374000, 82000, 128000, 51000, 119000, 92000,
]

const createProduct = async () => {
    for (let i = 0; i < listProductId.length; i++) {
        console.log(1)
        const result = await Swatch.create({
            price: listPriceProduct[i],
            productId: listProductId[i],
            brand: "apple",
            category: "swatch",
            description: `test + ${i + 1}`,
            idVideo: i + 1,
            images: [
                "https://cdn.tgdd.vn/Products/Images/7077/306530/befit-watch-fit-vang-1.jpg",
            ],
            name: `swatch-${i + 1}`,
        })
        console.log(result)
    }
}

module.exports = {createProduct}
