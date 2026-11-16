# 10. COMPLETE AI IDE BUILD PACKAGE GENERATION

## OBJECTIVE

After completing the BRD evaluation and after the submitted BRD has been validated, generate a complete, self-contained developer handoff package that an agentic AI IDE can use to implement the entire approved MVP application.

The output must go beyond recommendations, architectural descriptions or a high-level implementation prompt.

It must provide sufficiently detailed implementation specifications for every approved MVP feature.

The package must minimise human interpretation and prevent the AI IDE from inventing important business rules, data structures, UI behaviour or technical decisions.

## A. BUILD PACKAGE CONTENTS

Generate the following artefacts.

### 1. PRODUCT_SPEC.md
Include:
- Product objective.
- Original problem statement.
- Target users and personas.
- Core use cases.
- Approved MVP features.
- Out-of-scope features.
- Functional and non-functional requirements.
- MoSCoW priorities.
- Business rules.
- Acceptance criteria.
- Definition of Done.

### 2. TECH_STACK.md
Specify:
- Frontend framework and version.
- Backend framework and version.
- Programming language.
- Database.
- ORM or database access library.
- UI component library.
- Styling framework.
- Authentication approach.
- API communication strategy.
- AI/LLM provider and model, if applicable.
- Hosting and deployment approach.
- Required dependencies and versions.

Every technology must be justified and compatible with the hackathon constraints.

### 3. DATABASE_SCHEMA
Generate:
- Complete entity definitions.
- Field names and data types.
- Primary and foreign keys.
- Relationships.
- Constraints.
- Enums.
- Indexes where required.
- Database migration scripts.
- Seed data.
- Mock data fixtures.

Use SQL DDL or the appropriate ORM schema format.

### 4. API_SPECIFICATION
For every API endpoint, provide:
- HTTP method.
- Endpoint path.
- Purpose.
- Authentication requirements.
- Request schema.
- Response schema.
- Validation rules.
- HTTP status codes.
- Error responses.
- Example request and response.

Use OpenAPI where appropriate.

### 5. UI_UX_SPECIFICATION
For every approved MVP screen, define:
- Screen name and route.
- User role and access permissions.
- Purpose.
- Layout and component hierarchy.
- Input fields.
- Buttons and interactions.
- Navigation behaviour.
- Validation rules.
- Loading state.
- Empty state.
- Error state.
- Success state.
- Responsive behaviour.

Ensure all screens are mapped to requirements and user journeys.

### 6. BUSINESS_RULES.md
Document every deterministic business rule.

Include:
- Rule ID.
- Rule description.
- Inputs.
- Conditions.
- Decision logic.
- Expected outputs.
- Edge cases.
- Validation rules.
- Related requirement IDs.
- Corresponding test cases.

Do not use ambiguous natural-language instructions where a precise decision table, formula or state machine is possible.

### 7. INTEGRATION_SPECIFICATION
For every external integration, provide:
- Provider and purpose.
- API endpoint and method.
- Authentication.
- Request and response structure.
- Required credentials.
- Rate limits and restrictions, if verified.
- Error handling.
- Fallback behaviour.
- Real versus mocked implementation status.

Provide mock fixtures for integrations that cannot be accessed during development.

Never fabricate working credentials or claim that a mock integration is a real production connection.

### 8. PROJECT_STRUCTURE.md
Provide the complete proposed folder and file structure.

Explain:
- Purpose of each major folder.
- Responsibilities of important files.
- Naming conventions.
- Component organisation.
- Service and API organisation.
- Configuration management.
- Shared utilities.

### 9. IMPLEMENTATION_BACKLOG.md
Break implementation into ordered epics and small development tasks.

For every task, provide:
- Task ID.
- Objective.
- Requirements covered.
- Files or components involved.
- Dependencies.
- Implementation instructions.
- Acceptance criteria.
- Definition of Done.
- Testing instructions.

Tasks should be sufficiently small for an AI coding agent to implement and verify incrementally.

### 10. TEST_PLAN
Generate:
- Unit tests.
- Integration tests.
- API tests.
- UI tests.
- Business-rule tests.
- Authentication and authorization tests.
- Validation and edge-case tests.
- Mock integration tests.
- Failure and recovery tests.
- End-to-end MVP tests.

Map each test to its requirement ID.

### 11. ENVIRONMENT_AND_DEPLOYMENT.md
Specify:
- Prerequisites.
- Runtime and package manager.
- Installation commands.
- Environment variables.
- Secret management.
- Local development commands.
- Database setup.
- Migration commands.
- Seed commands.
- Test commands.
- Build commands.
- Deployment steps.
- Health checks.

Provide an .env.example file with placeholder values only.

### 12. AI_IDE_RULES.md
Include instructions for the coding agent:
- Follow the approved project architecture.
- Use the approved technology stack.
- Do not invent additional features.
- Do not change approved business rules.
- Do not fabricate API responses.
- Use documented mocks where integrations are unavailable.
- Maintain requirement traceability.
- Implement error and loading states.
- Write tests alongside functionality.
- Keep secrets out of source code.
- Preserve working functionality when implementing new features.

## B. BUILD PACKAGE VALIDATION

Before declaring the package ready, verify:

1. Every Must Have requirement maps to an implementation task.
2. Every implementation task maps to one or more requirements.
3. Every screen maps to a user journey and functional requirement.
4. Every API maps to a requirement and data entity where applicable.
5. Every business rule has corresponding test cases.
6. Every database entity has defined fields and relationships.
7. Every integration has a real or mocked implementation strategy.
8. Every major user journey has success and failure behaviour.
9. Technology versions and dependencies are compatible.
10. Environment and execution instructions are complete.
11. No unresolved P0 or P1 implementation blockers remain.
12. No undocumented business decisions are required to build the Must Have features.

## C. UNRESOLVED DECISION HANDLING

Do not invent missing critical decisions.

Maintain a Decision Register:

| Decision ID | Missing Decision | Why It Matters | Recommended Default | Approval Required |
|---|---|---|---|---|

Where a missing decision materially affects implementation, mark it OPEN and request approval before treating the package as final.

Non-critical implementation choices may use documented, reversible defaults.

## D. FINAL AI IDE HANDOFF

Generate a master AI IDE implementation prompt that instructs the coding agent to:

1. Inspect all supplied project specifications.
2. Verify the development environment.
3. Scaffold the complete project.
4. Implement the database and seed data.
5. Implement backend APIs and business logic.
6. Implement all approved frontend screens.
7. Integrate real services or documented mocks.
8. Implement authentication and permissions where required.
9. Implement validation, loading and error states.
10. Create and execute the specified tests.
11. Debug failures and correct implementation defects.
12. Verify every Must Have acceptance criterion.
13. Run the application locally.
14. Provide deployment instructions.
15. Produce a final implementation report.

The coding agent must work incrementally, verify each major phase and preserve working functionality.

It must not report a feature as complete unless its implementation and corresponding verification have actually been performed.

## E. FINAL BUILD READINESS VERDICT

Choose one:

- BUILD PACKAGE READY – All critical specifications are defined and the IDE can begin implementation.
- READY WITH NON-CRITICAL OPEN ITEMS – Only reversible or non-blocking decisions remain.
- NOT READY – Important business or technical decisions remain unresolved.

Distinguish clearly between:
- Specifications generated.
- Source code actually generated.
- Tests actually executed.
- Application successfully run.
- Application successfully deployed.

Never claim that generating a build package means that an application has already been built.
