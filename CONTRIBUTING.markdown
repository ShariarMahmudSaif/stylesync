# Contributing to StyleSync

Thank you for your interest in contributing to **StyleSync**, an open-source collection of modern UI components for web developers! We welcome contributions from the community to enhance our library of div effects, loaders, fonts, modals, inputs, buttons, and text styles. This guide outlines how you can contribute to make StyleSync even better.

## How to Contribute

### 1. Fork the Repository
- Navigate to the [StyleSync repository](https://github.com/shariarmahmudsaif/stylesync) on GitHub.
- Click the **Fork** button to create a copy of the repository under your GitHub account.

### 2. Clone Your Fork
- Clone your forked repository to your local machine:
  ```bash
  git clone https://github.com/your-username/stylesync.git
  ```
- Navigate to the project directory:
  ```bash
  cd stylesync
  ```

### 3. Create a Branch
- Create a new branch for your contribution:
  ```bash
  git checkout -b feature/your-feature-name
  ```
- Use a descriptive branch name (e.g., `feature/add-new-div-effect`, `fix/nav-bug`).

### 4. Make Changes
- **Add New Components**: Create new div effects, loaders, or other UI components in the appropriate subdirectories (e.g., `div-effects`, `buttons`). Follow the existing structure and naming conventions (e.g., `div-51` for a new div effect).
- **Enhance UI**: Improve the homepage (`index.html`), styles (`styles.css`), or scripts (`scripts.js`) for better aesthetics or performance.
- **Fix Bugs**: Address issues reported in the [GitHub Issues](https://github.com/shariarmahmudsaif/stylesync/issues) tab.
- **Update Documentation**: Enhance `README.md` or add code snippets/comments for clarity.
- **Coding Standards**:
  - Use **Tailwind CSS** for styling, following the existing classes (e.g., `bg-blue-600`, `rounded-full`).
  - Use **Poppins** (body) and **Playfair Display** (headings) fonts, loaded via Google Fonts.
  - Ensure accessibility (e.g., ARIA labels, keyboard navigation, WCAG-compliant contrast).
  - Write clean, modular JavaScript in `scripts.js` for animations (e.g., typewriter, liquid fill).
  - Test changes locally with:
    ```bash
    python -m http.server 8000
    ```
    Visit `http://localhost:8000` to preview.

### 5. Commit Your Changes
- Commit with a clear message describing your changes:
  ```bash
  git add .
  git commit -m "Add new div effect: Glow Pulse"
  ```

### 6. Push to Your Fork
- Push your branch to your forked repository:
  ```bash
  git push origin feature/your-feature-name
  ```

### 7. Submit a Pull Request
- Go to your forked repository on GitHub.
- Click **Compare & pull request** for your branch.
- Provide a detailed description of your changes, referencing any related issues (e.g., `Fixes #42`).
- Submit the pull request for review.

## Contribution Ideas
- **New Div Effects**: Add creative effects to the `div-effects` directory (e.g., new hover animations, 3D transforms).
- **UI Improvements**: Enhance the homepage layout, colors, or animations for a cleaner look.
- **Accessibility**: Add ARIA attributes, improve keyboard navigation, or enhance contrast.
- **Performance**: Optimize CSS/JavaScript for faster load times (e.g., reduce canvas animations’ complexity).
- **Documentation**: Add usage examples or tutorials in `div-effects/index.html` or `README.md`.
- **Bug Fixes**: Address issues listed in the [Issues](https://github.com/shariarmahmudsaif/stylesync/issues) tab.

## Code of Conduct
- Be respectful and inclusive in all interactions.
- Follow GitHub’s [Community Guidelines](https://docs.github.com/en/site-policy/github-terms/github-community-guidelines).
- Report any concerns via GitHub Issues or by contacting [Shariar Mahmud Saif](mailto:shariarmahmudsaif@example.com).

## Getting Help
- Check existing [Issues](https://github.com/shariarmahmudsaif/stylesync/issues) for similar questions or problems.
- Open a new issue with a clear title and description if you need assistance.
- Reach out on [Twitter](https://twitter.com/shariarmahmud) for quick questions.

## License
By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for helping make StyleSync a vibrant, community-driven project! 🚀