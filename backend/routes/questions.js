"use strict";

const {
  getQuestionsRandom,
  createQuestionsWithAI,
  validateInput
} = require("../services/questions");

module.exports = {
  async getQuestions(req, res, next) {
    try {
      const { secretCode } = req.body;

      // Validate secret code
      if (!secretCode || secretCode !== process.env.QUESTIONS_SECRET_CODE) {
        return res.status(401).json({
          error: "Invalid secret code"
        });
      }

      validateInput(req.body);

      const companyName = req.body.company || "Amazon";
      const noOfQuestions = req.body.noOfQuestions || 1;
      const difficulty = req.body.difficulty || ["Medium"];
      const topics = req.body.topics || [];

      // return res.json([
      //   {
      //     name: "Maximum Depth of Binary Tree",
      //     leetcodeLink:
      //       "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      //     solutionLink:
      //       "https://neetcode.io/solutions/maximum-depth-of-binary-tree",
      //     difficulty: "Easy",
      //     topic: "Trees",
      //     questionHTML:
      //       "## Google Interview Question: Analyzing Data Center Network Topology\n\nImagine you're working on Google's infrastructure team. You're responsible for managing the network topology of our massive data centers.  To optimize routing and identify potential bottlenecks, you need to analyze the hierarchical structure of the network.  We represent the network topology as a binary tree, where each node represents a network device (e.g., router, switch) and the edges represent the network connections.\n\nYour task is to write a function to determine the maximum depth (or height) of this binary tree, which represents the maximum number of hops from the root network device to the furthest leaf device in the network.\n\n```python\nclass TreeNode:  # Provided for context - no need to change during the interview\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n\ndef max_depth(root: TreeNode) -> int:\n    \"\"\"\n    Calculates the maximum depth (height) of a binary tree.\n\n    Args:\n        root: The root node of the binary tree.\n\n    Returns:\n        The maximum depth of the binary tree (an integer).\n    \"\"\"\n    pass # Replace with your solution\n```\n\n### Examples\n\n**Example 1:**\n\n*   **Input:** `root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))` (Represents the binary tree: `[3,9,20,null,null,15,7]`)\n*   **Output:** `3`\n*Explanation: The depth of the tree is 3 (3 -> 20 -> 15 or 3 -> 20 -> 7). These are the longest path.\n\n**Example 2:**\n\n*   **Input:** `root = TreeNode(1, None, TreeNode(2))` (Represents the binary tree: `[1,null,2]`)\n*   **Output:** `2`\n*Explanation: The depth of the tree is 2 (1 -> 2).\n\n### Constraints\n\n*   The number of nodes in the tree is in the range `[0, 10^4]`.\n*   `TreeNode.val` is between `-100` and `100`.\n*   Only one valid answer exists\n\n<details>\n  <summary>Explanation</summary>\n\n  This problem asks us to calculate the maximum depth (or height) of a binary tree. The depth of a node is the number of edges from the root to that node. The maximum depth of the tree is the maximum of the depths of all the leaf nodes. A leaf node is a node with no children.\n\n  **Edge Cases:**\n\n  *   **Empty Tree:** If the tree is empty (root is `None`), the depth is 0.\n  *   **Single Node Tree:** If the tree consists of only the root node (no children), the depth is 1.\n\n  **Clarifying Assumptions:**\n\n  *   The input is a valid binary tree. We don't need to perform input validation to check if it's a proper binary tree structure.\n\n  **Production Environment Considerations:**\n\n  *   In a real data center scenario, the network topology could be represented by much larger trees. Therefore, it's important to choose an algorithm that scales well. A recursive depth-first search (DFS) approach is generally suitable, as the stack depth is limited by the height of the tree.\n  *   We might want to consider using an iterative approach with a stack to avoid potential stack overflow issues for extremely deep trees.\n  *   The function should be well-documented and include error handling for unexpected situations (although error handling is less crucial in a coding interview setting).\n\n</details>\n\n<details>\n  <summary>Constraints</summary>\n\n  *   **Input Size:** Number of nodes in the tree can be up to 10^4.\n  *   **Data Types:** The tree nodes contain integer values.\n  *   **Time Complexity:** The expected time complexity is O(N), where N is the number of nodes in the tree.  We need to visit each node at least once to determine the maximum depth.\n  *   **Space Complexity:** The space complexity depends on the chosen approach.  A recursive DFS approach has a space complexity of O(H), where H is the height of the tree, due to the call stack.  In the worst case (skewed tree), H can be equal to N, leading to O(N) space complexity. An iterative approach using a queue or stack can also achieve O(W) space complexity, where W is the maximum width of the tree. In the worst case, W can also be N.\n  *   **Only One Valid Answer Exists:** The problem statement specifies that only one valid answer exists, simplifying the logic slightly.\n</details>\n"
      //   }
      // ]);

      const selectedQuestions = await getQuestionsRandom(
        noOfQuestions,
        difficulty,
        topics
      );

      await Promise.allSettled(
        selectedQuestions.map(async (q) => {
          const rawHTML = await createQuestionsWithAI(q, companyName);

          const cleanedHTML = rawHTML
            .replace(/^```html\n/, "")
            .replace(/```$/, "")
            .replace(/\\n/g, "\n")
            .replace(/\\"/g, '"');

          const pythonBlockMatch = rawHTML.match(
            /<pre><code class="language-python">([\s\S]*?)<\/code><\/pre>/
          );

          q["questionHTML"] = cleanedHTML;
          q["initialCode"] = pythonBlockMatch?.[1] || "";
        })
      );

      return res.json(selectedQuestions);
    } catch (err) {
      console.error(`Error getting the questions: ${err}`);
      return res.status(400).json({
        error: err.message || "Failed to get questions"
      });
    }
  }
};
