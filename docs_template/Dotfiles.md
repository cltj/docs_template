tags: #config 

Dotfiles are configuration files for your setup. It holds important settings and enable you to personalize your setup. It should minimize setup time when you need to get a new computer, increasing familiarity and longevity in a gradual manner. 

In order to develop a stable setup your dotfiles are in your github account 
```
https://github.com/cltj/dotfiles
```


> [!Remember] Remeber! 
> This is a public repo


The repo is structured in a way so that you can just clone the repo in under your `home/tj` and use [[gnu stow]] to insert your settings into the local environment. `~/.config`
The `~/.config` files are symlinked back to the `~/dotfiles`

It might look a bit messy, but if you just treat the `.config` directories in the dotfiles as it was the local `~/.config` directory it makes more sense. Its a requirement for gnu stow to do it this way.

![[symlinked-local-config-files.png]]

In addition to the files in the .config directory there is a few dotfiles that need to be under your home directory `~`

.gitconfig -> dotfiles/git/.gitconfig
.zshrc -> dotfiles/zsh/.zshrc
packages.list -> dotfiles/programs/packages.list
wezterm.lua -> dotfiles/wezterm/wezterm.lua

Your current configurations include: 

- [[Wezterm config]]
- [[zsh]] and [[zshrc]]
- [[fontconfig]]
- [[nvim]]
- [[starship]]
- [[btop]]
- [[zellij]]
- [[gitconfig]]
- [[packages]]

> [!Config Tip!]
> You can use the install.sh script to try and automate the deployment. This will get the repo, install the linux packages and do the symlinking for you. 
> 
> ```
> wget -O https://raw.githubusercontent.com/cltj/dotfiles/main/install.sh && chmod +x install.sh && ./install.sh 
> ```
> 
> If you are developing and troubleshooting the automatic setup of dotfiles into your local environment it might be handy to revert to the default installed on linux. (currently ubuntu24.04 defaults)
> 
> ```
> wget -O https://raw.githubusercontent.com/cltj/dotfiles/main/reset-to-default-packages.sh && chmod +x reset-to-default-packages.sh && ./reset-to-default-packages.sh
> ```
> > [!Warning] This has not been tested out so make sure you dont do this on current working environments


### Questions and ideas
- I notice that the wezterm.lua is both in the .config and the `home` directory. The file seems to contain the same things. I wonder if i need both?

