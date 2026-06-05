const { calculateSimilarity } = require("../utils/additionalFunc");

exports.index = (req, res) => {
    res.render(
        "similarity/index",
        {
            score: null,
            text1: "",
            text2: "",
            type: "non sensitive",
        }
    );
};

exports.check = (req, res) => {
    const { text1, text2, type } = req.body;
    const score = calculateSimilarity(text1, text2, type);

    res.render(
        "similarity/index",
        {
            text1,
            text2,
            type,
            score,
        }
    );
};