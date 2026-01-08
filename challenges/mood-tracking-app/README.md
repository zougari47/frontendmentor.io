<div align="center">
  
# Mood Tracking App

Track your daily mood, sleep patterns, and emotions with visual insights.

<img width="533" height="475" alt="mood-tracker" src="https://github.com/user-attachments/assets/9d439a9e-151a-496a-9373-a5d176729316" />

</div>


## Features

- Fully responsive design
- Form validation using `react-hook-form` and `zod`
- Supabase integration as backend
- Radix UI components for accessible UI elements
- TypeScript support with generated types

## Database Diagram

<img width="1061" height="576" alt="mood-tracking-app-diagram" src="https://github.com/user-attachments/assets/ad5a5800-174d-4262-8ae4-30cc3d66c6a2" />

## Setup
- Requirements: Minimum Node.js version: 20.9
- Clone the repo **OR** download this project via [DownGit](https://downgit.github.io/#/home?url=https:%2F%2Fgithub.com%2Fzougari47%2Ffrontendmentor.io%2Fblob%2Fmain%2Fchallenges%2Fmood-tracking-app%2F) and change the current directory in the terminal to the project.
- create a `.env` file and add your supabase keys
```env
# Create a project on the supabase website and past values here 
# OR
# Use supabase CLI and work local run >> supabase start 
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# This one is only for seed script(read below)
SUPABASE_SERVICE_ROLE_KEY=
```
- Run dev server
```bash
pnpm i && pnpm dev
```
- If you want to seed data to the db run ```pnpm seed x```. x is an argument which is the number of days you want to seed from today (default 14).


## Contribution
_Did I miss something? Is there a bug? You have a suggestion??_       
Feel free to open an issue, discussion, or pull request.
