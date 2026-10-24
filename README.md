# Frosted Number Nook

Built an aesthetic calculator using ONLY plain HTML, CSS, and vanilla JavaScript (no React, no frameworks, no Tailwind). Three files: index.html, style.css, script.js.

Aesthetic: "Frosted glass". A dark gradient background (deep purple to midnight blue) with soft blurred glowing orbs floating in the background. The calculator is a centered glassmorphism card (backdrop-filter blur, semi-transparent white, a thin light border, soft shadow). Typography: Inter or Poppins. Number buttons are translucent, operators glow soft violet/pink, and equals is a bright gradient button.

Features:

1. A display with the previous expression in small muted text above the current input in large text.

2. Buttons: 0-9, decimal, + − × ÷, =, C (clear), ⌫ (delete), and %.

3. All four arithmetic operations, with real-time result preview as the user types.

4. Handle edge cases: division by zero (show a friendly error), multiple decimals, repeated operators.

5. Keyboard support: digits, + - * /, Enter, Backspace, Escape. The matching on-screen button animates when a key is pressed.

6. Smooth hover glow and press animations on buttons.

7. Responsive on mobile and desktop.

Do not use eval() on raw input. Write a safe calculation function. Add clear comments in the code.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://frosted-number-nook.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a3f7c234-5e52-4a8e-b7b7-b3da74b4b4cd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
