# PLAN

## Objective

Using the common available pipelines for code sourcing and versioning, have an agent that automatically detect changes from the source code implementation and generate commits directly on the created Pull Requests with  the intent to keep the relevant documentations of tehcnical relevance and business logic up-to-date.

## Phase 1 — Detect Code Changes

Use the existing source control pipeline to trigger the agent whenever a Pull Request is created or updated.

### Done Means
- The agent is triggered by a Pull Request.
- The PR diff is available for analysis.

## Phase 2 — Analyze Documentation Impact

The agent analyzes the code diff and determines whether changes affect technical routes or business rules.

### Done Means
- Relevant code changes are identified.
- The agent determines whether `ROUTES.md` or `BUSSINESS_RULES.md` needs to be updated.

## Phase 3 — Generate Documentation Updates

Generate only the documentation changes required by the implementation.

### Done Means
- `ROUTES.md` reflects API changes.
- `BUSSINESS_RULES.md` reflects business logic changes.

## Phase 4 — Commit to the Pull Request

The agent creates a new commit containing the updated documentation directly in the existing Pull Request.

### Done Means
- Documentation changes are committed to the same PR.
- Code and documentation can be reviewed together before merge.

## End-to-End Flow

Pull Request
→ Code Diff
→ Agent Analysis
→ Documentation Update
→ New Commit on the Same PR
→ Human Review
→ Merge