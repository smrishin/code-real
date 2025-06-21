"use strict";

const MAX_QUESTIONS = 3;
const DIFFICULTY = ["Easy", "Medium", "Hard"];
const TOPICS = [
  ...new Set(require("./data/questions.json").map((q) => q.topic))
];
const COMPANIES = [
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Netflix",
  "Twitter",
  "LinkedIn"
];

const QUESTION_PROMPT_TO_AI = (companyName, questionInfo) => `
    You are a helpful assistant that generates a question for a coding interview.
    The question should be based on the company's interview process and the question info.

    Rewrite the following LeetCode question into an ${companyName}-style software engineer interview coding question.
    The core problem, its logic, and its solution MUST remain exactly the same.
    Focus on rephrasing the problem statement to fit typical ${companyName} interview scenarios
    (e.g., related to e-commerce, logistics, data processing for large scale systems, cloud services).
    
    Ensure the rewritten question includes:
    1. A clear, engaging problem statement with a real-world ${companyName}-esque context.
    2. Give the function name and the list of parameters with their types in python and well formatted
    3. At least two concrete **examples** (input and expected output, with a brief explanation in separate lines).
    4. Brief constraints just stating the limitations of input size and if only 1 valid answer exists.
    5. A detailed **explanation** of the problem, including edge cases, clarifying assumptions,
       and any specific considerations for a production environment.
    6. Explicit **constraints** on input size, data types, and typical time/space complexity
       requirements expected in a coding interview (e.g., O(N), O(N log N)).

    Here is the original LeetCode question information:${questionInfo}

    Point 5 and 6 from the above list should be dropdowns

    Please present the output clearly in a html format as shown below, separating each section with appropriate headings.
    Format an interview-style coding question in HTML for a frontend display system.
    Use the following structure and ensure the output is strictly HTML and markdown-style code blocks.

    Topic: Fraud detection in digital payments

    Fill in the template as follows:

    Wrap the full output in HTML tags like <h2>, <p>, <ul>, <pre><code>, etc.

    Title: inside <h2>, e.g., "Google Software Engineer Interview Question: Identifying Fraudulent Transactions"

    Have heading for each section below something like <p><strong>Problem Statement:</strong></p>

    Heading should be Problem Statement, Function Signature, Examples, Constraints, Detailed Explanation, Explicit Constraints & Complexity Expectations

    if there is anything that needs bullet points, use <li>...</li>, ordered or unordered, but use them only inside each section not for the heading
    for example, the constraints should be <ul><li>...</li></ul> but the heading should be <p><strong>Constraints:</strong></p>

    Problem description in <p> tags. 

    Function signature inside a Python code block using <pre><code class="language-python">.

    Examples inside <pre><code>, with both Input and Output.
    Each example should be in a separate <pre><code> block.
    Exmaples should include a small comment on the output in a <p> tag starting with "Explanation: " in a new line and should be after the <pre><code> block.

    Constraints as <ul><li>...</li></ul>

    Add two <details> blocks:

    One titled "Detailed Explanation" (must include edge cases, assumptions, and production considerations)

    One titled "Explicit Constraints & Complexity Expectations" (include input size, types, time/space complexity goals)

    Avoid using any additional explanation or markdown outside of proper HTML tags.

    Output must start directly with the <h2> tag and not include any extra text.  
    `;

module.exports = {
  DIFFICULTY,
  MAX_QUESTIONS,
  TOPICS,
  COMPANIES,
  QUESTION_PROMPT_TO_AI
};
