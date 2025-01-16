const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "sample-data.ts");

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const modifiedData = data.replace(
    /price:\s*(\d+)(\.\d+)/g,
    (match, intPart, decimal) => {
      const newInt = parseInt(intPart, 10) * 3;
      return `price: ${newInt}${decimal}`;
    }
  );

  fs.writeFile(filePath, modifiedData, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("Prices updated successfully.");
  });
});
