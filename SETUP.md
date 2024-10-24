# Project Setup and CI/CD Pipeline

## 1. Setting up the Git Repository

1. Create a new GitHub repository under [https://github.com/hftm-in2022](https://github.com/hftm-in2022).
2. Add your project to the repository:
    ```bash
    git init
    git remote add origin https://github.com/hftm-in2022/angular-projectname-firstname-lastname.git
    git add .
    git commit -m "Initial commit"
    git push -u origin main
    ```

## 2. Setting up Code Quality Tools

1. Install **ESLint** and **Prettier**:
    ```bash
    npm install --save-dev eslint prettier
    ```

2. Install **Husky** and **Lint Staged** for pre-commit checks:
    ```bash
    npm install --save-dev husky lint-staged
    ```

3. Configure pre-commit hooks:
    - Add the file `.husky/pre-commit` with the following content:
    ```bash
    #!/bin/sh
    . "$(dirname "$0")/_/husky.sh"

    npx lint-staged
    ```

4. Set up **CommitLint** for commit message validation:
    ```bash
    npm install --save-dev @commitlint/{config-conventional,cli}
    ```

## 3. Setting up the CI/CD Pipeline

1. Create the `.github/workflows/ci.yml` file for the pipeline:
    ```yaml
    name: CI Pipeline
    on:
      push:
        branches:
          - main
      pull_request:
        branches:
          - main

    jobs:
      build-and-test:
        runs-on: ubuntu-latest
        steps:
          - name: Checkout repository
            uses: actions/checkout@v2
          - name: Set up Node.js
            uses: actions/setup-node@v2
            with:
              node-version: '18.x'
          - name: Install dependencies
            run: npm ci
          - name: Build the project
            run: npm run build --if-present
          - name: Run Unit Tests
            run: npm test
          - name: Run Angular Update
            run: ng update --all --force
          - name: Run Security Audit
            run: npm audit --production
    ```

2. Add **Security Audits** to the pipeline:
    - Use `npm audit` to scan for security vulnerabilities.
    - Integrate **Dependabot** for automated dependency updates.

## 4. Automated Angular Updates

The pipeline will automatically run the `ng update --all --force` command to ensure all dependencies are updated to their latest stable versions.

## 5. Project Deployment

This project is automatically deployed to **Azure** once changes are merged into the `main` branch.

Here is the link to the live deployment:
[Azure Deployment Link](#)

## 6. Security and Dependency Management

1. **Security Audit**: The pipeline will run `npm audit` to ensure that the project is free of known security vulnerabilities.
2. **Automated Dependency Updates**: With `dependabot` configured, dependencies are updated regularly through automated pull requests.

