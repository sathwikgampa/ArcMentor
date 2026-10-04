/**
 * Rubrics Routes
 * Interview questions, evaluation criteria, and rubric retrieval endpoints.
 */
import { Router } from 'express';

export const rubricRoutes = Router();

// GET /api/rubrics/:domain
rubricRoutes.get('/:domain', async (req, res) => {
  const { domain } = req.params;
  return res.json({
    domain,
    rubrics: [
      {
        id: 'rubric-1',
        title: `${domain.toUpperCase()} Evaluation Rubric`,
        criteria: [
          { name: 'Problem Solving & Algorithmic Rigor', maxScore: 5 },
          { name: 'Code Quality & Clean Architecture', maxScore: 5 },
          { name: 'Communication & Edge Case Handling', maxScore: 5 },
          { name: 'Complexity & Optimization Analysis', maxScore: 5 },
        ],
      },
    ],
  });
});
