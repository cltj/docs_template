Tags:
#config

To even get [Wez's Terminal Emulator](https://wezfurlong.org/wezterm/config/files.html) to work you have a config file on your windows system at this location.

```
C:\Users\kinst\.config\wezterm
```
I suspect this is because you are running a wezterm as a windows application, and windows need to know the configuration when the application starts


At line 97 you are specifying the [[linux distribution]] (as of now this works with [[WSL]] version 1)
```lua
config.default_domain = 'WSL:Ubuntu-22.04'
```



You also have wezterm config files in your [[Dotfiles]] repo 

There is also a wezterm.lua file in your linux users home directory (~/wezterm.lua). This is symlinked to your dotfiles/wezterm folder. Further cusomtizations and setup for wezterm can be developed in this folder (which is checked in to git so you can revert to stable configurations if something breaks)

If you need to symlink this again you can do so by using
```
ln -s ~/dotfiles/wezterm/wezterm.lua ~/wezterm.lua
```

and to verify
```
ls -l ~/wezterm.lua
```



Improvements and ideas: 
- Upgrade to Ubuntu-24.04 WSL 2 (for windows os usecases like work) 



### Questions
- How can you limit your dependencies on windows, and get more control?
