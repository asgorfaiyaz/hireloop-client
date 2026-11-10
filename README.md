# Hireloop

Hireloop is a Next.js application for managing hiring workflows.

## What I learned

- **React Hook Form — `useWatch`:** Subscribe a component to a specific form value. In the sign-up form, the role picker watches `role` so it can update the selected button when the user switches between Seeker and Recruiter. Keeping the subscription inside the picker helps avoid rerendering the parent form just to update that selection.
