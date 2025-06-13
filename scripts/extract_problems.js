const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// Read the HTML file
const htmlContent = fs.readFileSync(
  path.join(__dirname, "NeetCode 150 - Coding Interview Questions.html"),
  "utf8"
);

// Function to extract problem information
function extractProblems(html) {
  const problems = [];
  const $ = cheerio.load(html);

  // Find all tables
  $("table").each((_, table) => {
    // Get the topic from the p element before the table
    const topicElement = $(table).prev("p.ng-star-inserted");
    const topic = topicElement.text().trim().replace(/&amp;/g, "&");

    // Find all problem rows in this table
    $(table)
      .find("tr.ng-star-inserted")
      .each((_, row) => {
        try {
          // Get the problem name and neetcode problem link
          const nameElement = $(row).find("a.table-text");
          if (!nameElement.length) return;

          const problemName = nameElement.text().trim();

          // Get leetcode link
          const leetcodeLink =
            $(row).find('a[href*="leetcode.com/problems"]').attr("href") || "";

          // Get solution link
          const solutionLink = $(row).find("a.video-icon").attr("href") || "";

          // Get difficulty
          const difficultyButton = $(row).find("button.button.table-button");
          const difficulty = difficultyButton.find("b").text().trim();

          // Add to problems array if we have all required information
          if (problemName && leetcodeLink && solutionLink && difficulty) {
            problems.push({
              name: problemName,
              leetcodeLink,
              solutionLink,
              difficulty,
              topic
            });
          }
        } catch (error) {
          console.error("Error processing row:", error);
        }
      });
  });

  return problems;
}

// Extract problems and write to JSON file
const problems = extractProblems(htmlContent);
fs.writeFileSync(
  path.join(__dirname, "problems.json"),
  JSON.stringify(problems, null, 2),
  "utf8"
);

console.log(
  `Successfully extracted ${problems.length} problems to problems.json`
);

// Print a sample problem to verify the extraction
if (problems.length > 0) {
  console.log("\nSample problem:");
  console.log(JSON.stringify(problems[0], null, 2));
}
