# Gitki

Wiki app that uses a git repository as databases. Supports search, categories, tags and
themes.

The server will store a copy of the repository.

![Screenshot](/assets/screenshot.jpg)

## Server Settings

The server reads the settings from the file `wiki.config.json`.

+ `pullInterval` :: How often the server should perform a pull request (in minutes).
  Defaults to 60.
+ `repository` :: URL to the git repository. **Required**.

## Repository form

The git repository that contains the wiki must have the following structure.

```
repo
|-- cotent
|   |-- lang_code
|   |   |-- article1.md
|   |   |-- article2.md
|   |   |-- ...
|   |-- lang_code
|   |   |-- article1.md
|   |   |-- article2.md
|   |   |-- ...
|-- assets
```

Any directories and files outside of content will be ignored by the server and can be
used to store other assets.

## Metadata

Use [toml](https://toml.io/) at the top of the Markdown document to set the article's
metadata.

```
+++
title = "Article"
tags = ["tag1", "tag2", "tag3"]

[translations]
es = "article.md"
fr = "article.md"
+++
```

**Note**: For translations, the key is the name of the directory that contains the
translation and the value is the name of the article inside the directory.

## Development

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

### Requirements

+ git
+ node
+ yarn
