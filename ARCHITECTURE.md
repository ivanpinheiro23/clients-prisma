## AI Agent Architecture

The hackathon solution runs in a DDEV-based development environment. The application uses a Node.js backend with Prisma connected to a PostgreSQL database. When a Pull Request is created or updated, the pipeline agent consumes the PR diff, detects changes that affect the documentation, and creates a new commit in the same Pull Request with the updated `ROUTES.md` and `BUSSINESS_RULES.md` files.

```text
+------------------------------------------------------+
|                 DDEV Environment                     |
|                                                      |
|   +-------------------+      +-------------------+   |
|   |  Node.js Backend  | ---> |      Prisma       |   |
|   +-------------------+      +-------------------+   |
|                                      |               |
|                                      v               |
|                              +-------------------+   |
|                              |    PostgreSQL     |   |
|                              +-------------------+   |
+------------------------------------------------------+
                         |
                         | code changes
                         v
                  +--------------+
                  | Pull Request |
                  +--------------+
                         |
                         | PR diff
                         v
                 +----------------+
                 | Pipeline Agent |
                 | - reads diff   |
                 | - detects doc  |
                 |   impact       |
                 +----------------+
                         |
                         | generates updates
                         v
          +----------------------------------+
          | Documentation files             |
          | - ROUTES.md                      |
          | - BUSSINESS_RULES.md             |
          +----------------------------------+
                         |
                         | new commit
                         v
                  +--------------+
                  | Same Pull    |
                  | Request      |
                  +--------------+
                         |
                         v
                 Human review / merge
```

## Flow Summary

1. Developers change the application inside the DDEV environment.
2. The Node.js backend uses Prisma to access PostgreSQL.
3. A Pull Request exposes the code diff to the pipeline agent.
4. The agent analyzes the diff and identifies documentation impacts.
5. The agent updates `ROUTES.md` and `BUSSINESS_RULES.md` as needed.
6. The documentation changes are added as a new commit to the same Pull Request.
7. The Pull Request remains subject to human review before merge.

## Key Design Principle

Code and documentation move through the same delivery flow. The agent removes the manual documentation handoff by automatically proposing and committing documentation updates before the Pull Request is merged.
