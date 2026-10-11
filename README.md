# LetsShopWebApp

End-to-end test automation framework for an e-commerce web application, built with **Playwright** (JavaScript) and the **Page Object Model (POM)** pattern. It contains reusable page objects, automated UI and API checks, and HTML test reporting with CI via GitHub Actions.

**Application under test:** [Rahul Shetty Academy – Client App](https://rahulshettyacademy.com/client)

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Coverage](#test-coverage)
- [Continuous Integration](#continuous-integration)
- [Reports](#reports)
- [Roadmap](#roadmap)

## Tech Stack

- **Language:** JavaScript (CommonJS)
- **Test framework:** [@playwright/test](https://playwright.dev/)
- **Pattern:** Page Object Model
- **Browser:** Chromium (Firefox, WebKit, mobile and Edge/Chrome projects are available in `playwright.config.js` and commented out)
- **Reporter:** Playwright HTML report
- **CI:** GitHub Actions

## Project Structure

```
LetsShopWebApp/
├── .github/workflows/
│   └── playwright.yml        # CI pipeline
├── PageObjects/              # Page classes (locators + actions)
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── DashboardPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── OrdersPage.js
│   ├── OrderSummaryPage.js
│   └── OrdrPlacedPage.js
├── tests/                    # Test specs
│   ├── loginpage.spec.js
│   └── registerpage.spec.js
├── fixtures/                 # Custom fixtures (planned)
├── test-data/                # External test data (planned)
├── playwright.config.js      # Playwright configuration
└── package.json
```

`playwright-report/`, `test-results/` and `screenshots/` are generated at runtime and are git-ignored.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/LetsShopWebApp.git
cd LetsShopWebApp

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run a single spec file
npx playwright test tests/loginpage.spec.js

# Run a single test by title
npx playwright test -g "TC_008"

# Run in headed mode
npx playwright test --headed

# Debug with the Playwright Inspector
npx playwright test --debug

# Open the HTML report
npx playwright show-report
```

## Test Coverage

### Login page (`tests/loginpage.spec.js`) – 30 test cases

| Suite | Area | Test cases |
|-------|------|------------|
| TS_01 | UI elements, headings, placeholders, styling | TC_001 – TC_007 |
| TS_02 | Email field validation (format, empty, spaces, injection string, max length) | TC_008 – TC_014 |
| TS_03 | Password field validation (masking, empty, incorrect, injection string, max length) | TC_015 – TC_019 |
| TS_04 | Login functionality (empty fields, Enter key, unregistered email, repeated failures) | TC_020 – TC_026 |
| TS_05 | Forgot password link and page fields | TC_027 – TC_028 |
| TS_06 | Navigation to the Register page | TC_029 – TC_030 |

Some checks (the injection-string cases) call the login API directly with Playwright's `request` fixture alongside the UI tests.

### Register page (`tests/registerpage.spec.js`) – in progress

| Suite | Area | Status |
|-------|------|--------|
| TS_R01 | Page UI and layout (TC_R001 – TC_R005) | Written |
| TS_R02 – TS_R11 | Field validation, dropdown, gender, passwords, checkbox, register flow, login navigation | Planned |

## Continuous Integration

The workflow in `.github/workflows/playwright.yml` runs on every push and pull request to `main` or `master`. It installs dependencies, installs Playwright browsers, runs the full suite, and uploads the HTML report as an artifact (kept for 30 days). On CI, tests retry twice and run with a single worker.

## Reports

After a run, open the HTML report with:

```bash
npx playwright show-report
```

Traces are collected on the first retry and can be opened from the report.

## Roadmap

- [ ] Complete Register page test suites (TS_R02 – TS_R11)
- [ ] Implement page objects for Dashboard, Cart, Checkout, Orders, Order Summary and Order Placed
- [ ] Add end-to-end purchase flow tests (login → add to cart → checkout → order confirmation)
- [ ] Move credentials, URLs and payloads into `test-data/` and set `baseURL` in the config
- [ ] Add reusable fixtures (for example, an authenticated session) in `fixtures/`
- [ ] Add npm scripts (`test`, `test:headed`, `report`) to `package.json`
