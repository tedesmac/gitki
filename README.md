# Requirements

+ git
+ node
+ yarn

# Development

1. Clone the repo.
    ```bash
    $> git clone https://gitlab.com/centre-0-collective/leftist-database-ui
    $> cd leftist-database-ui
    ```

2. Install the node depencencies.
    ```bash
    yarn
    ```

3. Create a configuration file for the server.
    ```bash
    $> cd leftist-database-ui
    $> touch wiki.config.json
    ```

    The configuration file must have the URL of the repository that contains the
    wiki:

    ```json
    {
      "repository": "<wiki-repository-url>"
    }
    ```

4. Run the development environment.
    ```bash
    $> yarn run dev
    ```
