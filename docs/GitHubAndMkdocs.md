# GitHub and MkDocs

This HTML documentation was built using GitHub and its Pages feature in addition to Python enriched with mkdocs and mkdocs-material modules.


## Run GitHub HTML documentation locally on your Windows laptop

!!! Note
    - For full MkDocs documentation visit [mkdocs.org](https://www.mkdocs.org).

1. Install [GitHub Desktop](https://desktop.github.com/) client

1. Clone my career GitHub repository [https://github.com/janaffolter/career](https://github.com/janaffolter/career)

1. Install [Python 3.12+](https://www.python.org/)

1. Ensure Python version is 3.12+ and pip version is 20+

    ```
    C:\Users\janaf\GitHub\career>python --version
    Python 3.12.4

    C:\Users\janaf\GitHub\career>pip --version
    pip 24.0 from C:\Users\janaf\Python312\Lib\site-packages\pip (python 3.12)
    ```

1. Install mkdocs Python's module

    ```
    pip install mkdocs
    ```

1. Install mkdocs-material Python's module

    ```
    pip install mkdocs-material
    ```

1. on your computer, open a command line terminal (execute cmd) and move inside the local folder where this repository is cloned and execute MkDocs as below

    ```
    cd [path to this github repository]
    mkdocs serve
    ```



