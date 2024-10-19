### Install Volta

[Volta] (https://volta.sh/) is used for version management of node and yarn.
If Volta is not installed on your Local Machine, please do the following



MacOS
```zsh
brew install volta
```
- Set PATH
    ```zsh
    $ vi ~/.zshrc
    ```
    ```txt
    export VOLTA_HOME="$HOME/.volta"
    export PATH="$VOLTA_HOME/bin:$PATH"
    ```
    ```zsh
    $ source ~/.zshrc
    $ volta pin node@22.10.0
    $ volta pin yarn@1.22.22
    ```
- Check version
    ```zsh
    $ node -v
    v22.10.0
    ```
    ```zsh
    $ yarn -v
    1.22.22
    ```
- If the version specified in package.json > volta is not installed, it will be installed automatically
- If the versoion does not change, there may be a conflict with nodenv, nvm, etc. Please comment out PATH from ~/.zshrc to deal with the problem.
    - In case of nodevn
        ```zsh
        # export PATH="$HOME/.nodenv/bin:$PATH"
        # eval "$(nodenv init -)"
        ```