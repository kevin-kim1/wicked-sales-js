wicked-sales-js-instructions
--

Instructions for building a full stack Node.js &amp; React shopping cart app.

## Getting Started

1. Create a new repository on GitHub.com under your own account. There is an icon in the upper-right corner of the navbar.

    - The repository should be named `wicked-sales-js`.
    - The description should be `A full stack Node.js and React shopping cart app.`
    - Make the respository **Public** if given the option.
    - Be sure to initialize the repository with a `README.md`
    - Do not add a `.gitignore` or a license.

1. Clone that repository into the `lfz/` directory within your development environment and open your code editor to the cloned repository. The following steps should be done on the `master` branch of your local repository.

1. Copy `package.json`, `.gitignore`, `.env.example`, and `.npmrc` from the `starter-files/` of this instructions repository into the root of your local repository.

1. Download all of the dependencies listed in `package.json` with `npm install`.

1. Visit the rest of the starter files in this instructions repository and copy them into your project so that the final structure looks like the following tree.

    **Note:** This visualization is alphabetized, so the order of directories and files might be slightly different than how they appear in your code editor. Git does not commit empty directories. `.gitkeep` files are intentionally left empty and merely serve to preserve the directory stucture even if their parent directory is otherwise empty.

    This is a good time to practice creating files and directories on the command line. After each directory's files have been added and populated to match the example tree below, make a commit with a meaningful message. **Every file matters! Triple check!**

    ```bash
    wicked-sales-js/
    ├── client/
    │   ├── components/
    │   │   └── app.jsx
    │   └── index.jsx
    ├── database/
    │   └── .gitkeep
    ├── .env.example
    ├── .gitignore
    ├── .npmrc
    ├── package.json
    ├── server/
    │   ├── client-error.js
    │   ├── database.js
    │   ├── index.js
    │   ├── public/
    │   │   ├── images/
    │   │   │   ├── favicon.png
    │   │   │   ├── ostrich-pillow.jpg
    │   │   │   ├── shake-weight.jpg
    │   │   │   ├── shamwow.jpg
    │   │   │   ├── snuggie.jpg
    │   │   │   ├── tater-mitts.jpg
    │   │   │   └── wax-vac.jpg
    │   │   ├── index.html
    │   │   └── styles.css
    │   ├── session-middleware.js
    │   ├── sessions/
    │   │   └── .gitkeep
    │   └── static-middleware.js
    └── webpack.config.js
    ```

1. Make sure that the `postgresql` service is running. Then use PostgreSQL's `createdb` command to create a new database for this project named `wickedSales`.

    ```bash
    createdb wickedSales
    ```

1. Make a copy of `.env.example` named `.env`. This is where private information like database credentials or API keys should be stored. Your project will use these values at runtime. It **should not** be committed and should be listed in `.gitignore` to prevent it from being accidentally committed.

1. Dump your database with the following command. It will export your database schema (currently nearly empty) to a new file at `database/dump.sql`. Commit this file with a meaningful message. You'll be re-exporting and committing this file each time you modify your database schema.

    ```bash
    npm run db:export
    ```

1. Start the Express.js server in `server/index.js` and `webpack-dev-server` in parallel with the following command. This will start file watchers for your back end and front end to automatically restart the back end or refresh the front end when associated files have changed:

    ```bash
    npm run dev
    ```

1. Read the `GET` endpoint for `/api/health-check` in `server/index.js`. Test it from the command line using HTTPie. You should receive a `200 OK` response.

    ```bash
    http -v get localhost:3000/api/health-check
    ```

1. Read the `App` component defined in `client/components/app.jsx` and the client entrypoint file (`client/index.jsx`). Visit `http://localhost:3000` in your browser. You should see a success message rendered to the DOM.

1. Make sure that all of your starter files have been added, committed, and pushed to the `master` branch of your repository on GitHub.

## Configure HTTPie for Sessions

By default HTTPie does not store session cookies between requests. However, its config file can be edited to do so. Open the configuration file with the `nano` terminal text editor and add the `"--session=default"` option to "default_options". The `nano` editor must be navigated with arrow keys (clicking doesn't move the cursor). `Ctrl + O` saves changes to the file and `Ctrl + X` exits the editor. This configuration is unrelated to your project's repository, it is merely to aid in development.

```bash
nano ~/.httpie/config.json
```

```json
{
    "__meta__": {
        "about": "HTTPie configuration file",
        "help": "https://httpie.org/docs#config",
        "httpie": "0.9.8"
    },
    "default_options": ["--session=default"]
}
```

## Features

The application will provide the following functionality to its users. Where applicable, each feature is divided into "front end" and "back end" implementations. Each feature (front end or back end) should be worked on in a new branch before being merged into `master` via a Pull Request on GitHub. For each feature, the "back end" implementation should be completed **first**. Here is the order in which this project's features should be implemented. Each feature in the list is linked to the appropriate instructions.

1. [User can view the products for sale - Back End](features/01-view-products-back-end.md).
1. [User can view the products for sale - Front End](features/02-view-products-front-end.md).
1. [User can view the details of a product - Back End](features/03-view-product-details-back-end.md).
1. [User can view the details of a product - Front End](features/04-view-product-details-front-end.md).
1. [User can add a product to their cart - Back End](features/05-add-to-cart-back-end.md).
1. [User can add a product to their cart - Front End](features/06-add-to-cart-front-end.md).
1. [User can view their cart summary - Front End](features/07-view-cart-summary-front-end.md).
1. [User can place an order - Back End](features/08-place-order-back-end.md).
1. [User can place an order - Front End](features/09-place-order-front-end.md).

## Commit Messages

As you work through each step of a given feature, make a commit. It's important to get into the habit of making incremental progress on a project. Each commit message that you write should be concise, but descriptive enough that another developer can guess what you did in the code without having to actually read the code.
