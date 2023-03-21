export const formatString = (str) => {
    const formattedStr = str.toLowerCase().replace(/[-_]/g, "");
    return formattedStr.split(" ").map(word => {
        return (word.charAt(0).toUpperCase() + word.slice(1))
    }).join(" ");
}