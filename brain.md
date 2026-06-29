# AuctionHub AI - Project Brain

This file serves as the memory and central knowledge repository for the AuctionHub AI project. It tracks architecture, design system states, and upcoming features.

## Architecture & Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4, Vanilla CSS (`globals.css`)
- **Typography**: Space Grotesk (Display), Plus Jakarta Sans (Body)
- **Icons**: Lucide React
- **Design System**: Premium Light Mode (White & Grey) with Claymorphism

## Design System: Light Claymorphism
We recently transitioned the app from a dark glassmorphism theme to a premium light theme with claymorphism.
- **Backgrounds**: Pure white (`#ffffff`) for primary, light grey (`#f1f5f9`) for panels and secondary backgrounds.
- **Text**: Slate (`#0f172a`) for primary text, medium grey (`#475569`) for secondary.
- **Claymorphism**: Soft, puffy 3D elements using light grey drop shadows (`rgba(148,163,184,0.3)`) and bright white inner highlights (`inset 2px 2px 5px #ffffff`).

## Current State & Completed Features
- Built a realistic mock dataset for 50+ Bank Auction properties (`src/data/properties.ts`).
- Interactive dashboard, AI Search interface, and Investment Advisor tools.
- Integrated a new **List Property** portal (`/list-property`) for users to upload plots/properties.
- Deployed brand-new AuctionHub logo to `Navbar` and `Footer`.

## Next Steps / Roadmap
- Connect to an actual backend (Supabase / Postgres / Firebase) to persist user uploads from `/list-property`.
- Implement user authentication (NextAuth / Clerk) for the Dashboard.
- Connect the Sia Chat widget to an actual LLM API.
