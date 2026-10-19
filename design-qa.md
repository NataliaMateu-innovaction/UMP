# Design QA — USDC Massive Payments

final result: passed

## Evidence
- Source visual truth: C:/Users/Admin/.codex/generated_images/01a154d7-1716-77a0-aa36-6cfa9cb9e04c/exec-a83c4266-79d9-4e9c-a2e3-0155accef135.png
- Implementation: http://127.0.0.1:4173/
- Desktop screenshot: qa/desktop.png; full landing: qa/full-page.png.
- Combined reference/implementation comparison: qa/comparison.png (both images opened in one comparison input).
- Mobile evidence: qa/mobile.png, qa/mobile-full.png, qa/mobile-overview.png.
- Desktop requested CSS viewport: 1374 x 1145. Source pixels: 1374 x 1145; browser screenshot pixels: 1359 x 1133. Browser capture applies slight density/viewport scaling. Compared native captures side by side, accepting approximately 1% capture-size variation and browser scrollbar; no finding attributed to this variation.
- State: top of page, dark theme, no menus expanded. Additional FAQ-open and menu-open/closed states checked in browser.
- Mobile CSS viewport: 390 x 844; rendered content width 375 due to scrollbar. Additional 320px viewport checked: client width 305, scroll width 305.

## Comparison history
1. Initial desktop capture revealed artwork extending the hero layout and a horizontal scrollbar. P2: hero artwork wrapper needed containment. Fixed `.hero` overflow and reduced image wrapper width.
2. Recaptured at reference viewport after correction. Comparison in qa/comparison.png confirms headline hierarchy, split hero, lime CTA, four-column metrics and line-based steps. No actionable P0/P1/P2 remains. Mobile document scroll width equals client width.

## Required fidelity surfaces
- Typography: locally hosted Inter variable; large, heavy three-line headline; restrained body type and strong metric hierarchy match the target direction. Body and FAQ text legible in direct browser views.
- Layout: split hero and horizontal metrics preserved. Full content beneath the mock extends its rhythm using aligned columns and thin rules. Original explanatory subtitle and step body text intentionally add height to the how-it-works section.
- Color/tokens: graphite #0b1012, lime #d1ff52, near-white type, gray support copy and subdued dividers. No unintended contrasting surfaces.
- Imagery: real generated raster illustration, consistent translucent spreadsheet / payment-receipt composition and lime routing. Source UMP logo raster extraction. Phosphor icons are library assets. Regenerated illustration is a faithful art-direction match rather than a pixel-identical crop.
- Copy/content: all original Spanish informational sections, figures and Testnet qualifiers preserved, including FAQ responses and API example. Additional editorial section headings organize the same information. CTA URLs point to the existing app; legal, documentation and explorer links preserved.

## Interactions and validation
- Production build completed successfully.
- Browser developer logs: no warnings or errors after page loading and tested interactions.
- All three rendered images loaded successfully.
- Header anchors update hash and navigate to sections.
- Mobile menu opens, exposes navigation and closes after selecting a section.
- FAQ expands and displays original answer.
- Copy API button successfully reports Copiado and accessible confirmation. OS clipboard round-trip was not confirmed by the browser clipboard adapter; no claim of OS-level verification.
- Main CTA destinations inspected: existing /app URL. No wallet connection or payment initiated.
- Keyboard-visible focus styles, semantic headings, skip link, native details, alt text and reduced-motion support present.
- Full page and mobile montage inspected for truncation, card overload and content loss. No actionable overflow found.
- Focused inspection used native-size browser screenshots for header/hero and FAQ; the full comparison already exposes headline and metric details at readable scale, so additional focused collage was unnecessary.

## Follow-up polish / limitations
- P3: exact illustration perspective differs from generated mock, with the approved palette and subject preserved.
- Spanish-only prototype: the original multilingual selector is not implemented.
- Payment app is linked to the existing deployment; backend and payment functionality are outside this landing redesign.
- No production deployment performed.

## Implementation checklist
- [x] Reference-based desktop design
- [x] Complete Spanish landing content
- [x] Responsive mobile layout
- [x] Original application/documentation/legal destinations
- [x] Menu, FAQ and copy feedback
- [x] Browser evidence and production build
