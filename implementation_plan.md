# Implementation Plan - Goshelin Web App Verification and Polish

We will prepare and launch the "고슐랭" (Goshelin) web application based on the product specification PDF. Upon inspection, the web app codebase has already been scaffolded with high-fidelity components, a mockup database, styling, and server scripts in the scratch directory: `C:\Users\jeeni\.gemini\antigravity\scratch\goshelin`.

We will verify the codebase, fix minor visual and functional bugs in the roulette wheel segment alignment and pointer rotation, install dependencies, and run the application.

## User Review Required

> [!NOTE]
> The project files are located in the scratch directory at [goshelin](https://localhost:3000). We recommend setting this directory as your active workspace.

> [!IMPORTANT]
> We detected two critical bugs in the roulette wheel logic that we propose to fix:
> 1. **Wedge Alignment**: The colored background slices of the roulette wheel (drawn using CSS `conic-gradient` from 12 o'clock) are misaligned by 90 degrees with the wedge text elements (which start in the top-left quadrant). We will align them by starting the conic-gradient `from 270deg`.
> 2. **Pointer Rotation Angle**: The spin rotation formula ends up pointing to the bottom (6 o'clock) instead of the top (12 o'clock) where the pointer is located. We will correct the rotation angle calculation.

## Proposed Changes

### Web Application Polish

#### [MODIFY] [app.js](https://localhost:3000/app.js)
- Fix the `conic-gradient` background to start `from 270deg` so color slices match the text positions.
- Correct the `rotationAngle` calculation by removing the incorrect `- 90` offset, ensuring the selected winning restaurant aligns perfectly with the pointer at 12 o'clock.

#### [MODIFY] [style.css](https://localhost:3000/style.css)
- Update the default placeholder background `conic-gradient` on `.roulette-wheel` to also start `from 270deg` for initial consistency.

## Verification Plan

### Automated/Manual Testing
1. Install project dependencies (`npm install`).
2. Run the development server (`npm run dev`).
3. Access the web app at `http://localhost:3000`.
4. Test the location-based filters, categories, and price ranges.
5. Test the roulette "오늘 뭐 먹지?" feature: spin the wheel, check if the tick sounds slow down, and confirm the resulting restaurant name matches the wedge pointed to by the gold arrow at the top.
6. Verify adding a new review updates the ratings in the database and renders in the details view.
