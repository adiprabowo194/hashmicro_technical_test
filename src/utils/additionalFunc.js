function greetingUser(user) {
    const name = user ? user.name : "Guest";
    const role = user ? (user.role === "administrator" ? "Admin" : user.role) : user ? user.role : "User";
    return `${name} - ${role}`;
}

function calculateSimilarity(text1, text2, type = 'non sensitive') {
    let str1 = text1 ? text1.trim() : '';
    let str2 = text2 ? text2.trim() : '';
    if (type === 'non sensitive') {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
    }

    const chars1 = str1.replace(/\s/g, '').split('');
    if (chars1.length === 0) return 0;

    let matchCount = 0;
    for (let char of chars1) {
        if (str2.includes(char)) {
            matchCount++;
        }
    }
    return Math.round((matchCount / chars1.length) * 100);
}

module.exports = { greetingUser, calculateSimilarity };