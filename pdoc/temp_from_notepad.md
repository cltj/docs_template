
# install docker

sudo apt install zsh
sudo apt install vim
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -


sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce


sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee /etc/apt/trusted.gpg.d/docker.gpg
echo "deb [signed-by=/etc/apt/trusted.gpg.d/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
sudo apt-get install docker-ce docker-ce-cli containerd.io
sudo apt-get update




# manuel Linux setup guide

> [!Warning]
> NOT SURE THIS IS APPLICABLE

1. Enable windows features (powershell as admin)
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
## Get the distro from windows store
ubuntu / arch / deb / fed
Open it and set user and pass. then close. 

in PowerShell check your wsl and versions
```
wsl -l -v
```

2. Set wsl version
```
wsl --set-default-version 2
``` 
(ubuntu 24.04 seems to come with wsl 2 out of the box)

3. upate and upgrade
```
sudo apt update && sudo apt upgrade -y
```

4. create a folder on the home directory (git controlled folder) 
`need to use stow filepaths to work <repo>/<program>/.config/<program>`
git clone https://github.com/cltj/dotfiles.git dotfiles


5. create a .config folder 
(houses all the config files, some of these files will be symlinked to the

6. install zsh
sudo apt install zsh
stow zsh ( stow / = all folders ) 


7. setup the font 
```
on windows you can install the font from here ( 0xProto Nerd Font)
https://www.nerdfonts.com/font-downloads
set this in your terminal under appperance and fonts
```

8 . Install omz
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended



sudo apt update && sudo apt upgrade -y
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" "" --unattended
git clone https://github.com/cltj/fsconfig.git fsconfig
mkdir .config



9. Neovim install 

Pre-built archives
The Releases page provides pre-built binaries for Linux systems.

curl -LO https://github.com/neovim/neovim/releases/latest/download/nvim-linux64.tar.gz
sudo rm -rf /opt/nvim
sudo tar -C /opt -xzf nvim-linux64.tar.gz
After this step add this to ~/.bashrc:

export PATH="$PATH:/opt/nvim-linux64/bin"


10. wezterm
curl -fsSL https://apt.fury.io/wez/gpg.key | sudo gpg --yes --dearmor -o /usr/share/keyrings/wezterm-fury.gpg
echo 'deb [signed-by=/usr/share/keyrings/wezterm-fury.gpg] https://apt.fury.io/wez/ * *' | sudo tee /etc/apt/sources.list.d/wezterm.list
sudo apt update
sudo apt install wezterm

`is dependent on this: https://sourceforge.net/projects/vcxsrv/postdownload`

Install and Start VcXsrv
Download and Install VcXsrv:
Download VcXsrv from SourceForge.

Start VcXsrv:
Run VcXsrv, and configure it to start with the default settings.

Set the $DISPLAY Variable in WSL:
In your WSL terminal, set the $DISPLAY variable to the IP address of your Windows host:

```sh
export DISPLAY=$(grep nameserver /etc/resolv.conf | awk '{print $2}'):0
# Add to Shell Configuration:
Add the above export command to your ~/.bashrc or ~/.zshrc file to set the $DISPLAY variable automatically:
```

```
sh
Copy code
echo 'export DISPLAY=$(grep nameserver /etc/resolv.conf | awk "{print \$2}"):0' >> ~/.bashrc
source ~/.bashrc
```

Ensure WezTerm is Configured Correctly
Make sure that WezTerm is configured to use the correct display.

Check WezTerm Configuration
Review your WezTerm configuration file to ensure there are no incorrect settings. The default configuration file can usually be found in ~/.wezterm.lua


11. zeillij
```sh
wget https://github.com/zellij-org/zellij/releases/download/v0.40.1/zellij-x86_64-unknown-linux-musl.tar.gz

tar -xvf zellij*.tar.gz

chmod +x zellij

./zellij
```



## packages list (earlier version?)

fzf
git
fonts-noto-color-emoji
openssh-server
openssh-client
python3-pip
stow
tree
fonts-dejavu
fonts-joypixels
ttf-mscorefonts-installer
fonts-unifont
unzip
vim
wget
curl
zip
zsh


## Azure dns
ns1-34.azure-dns.com.
ns2-34.azure-dns.net.
ns3-34.azure-dns.org.
ns4-34.azure-dns.info.


## github-actions-terraform-azure setup 

1. Creating the service principal

az login

az ad sp create-for-rbac --name "github-action-sp" --role contributor \
    --scopes /subscriptions/82d63c35-1997-4a71-bd15-5281b9d06619 \
    --sdk-auth


The json result:
{
  "clientId": "086340e6-b7b9-4730-95ab-10b3a027ad1e",
  "clientSecret": "<SECRET_VAULE>",
  "subscriptionId": "82d63c35-1997-4a71-bd15-5281b9d06619",
  "tenantId": "f693d01f-6f7d-490e-afb7-29c8db97fe3e",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}


2. the plan

```
terraform plan \
-var="project=sha" \
-var="runner_token=<NEW_vaule>" \
-var="runner_group_name=cl-runner-group" \
-var="github_organisation=cloudlinkai"
```
3. the apply
```
terraform apply \
-var="project=sha" \
-var="runner_token=<NEW_vaule>" \
-var="runner_group_name=cl-runner-group" \
-var="github_organisation=cloudlinkai" \
-auto-approve
```

Unsure if this works with, so old value is here: 
<OLD_value>


This is actually the image you need: 
Canonical:0001-com-ubuntu-server-jammy:22_04-lts-gen2:latest


4. The yaml test file for the action/workflow
```yaml
name: Example Workflow on Self-Hosted Runner
on: [push]
jobs:
  build:
    runs-on: self-hosted
    steps:
    - uses: actions/checkout@v2
    - name: Run a one-line script
      run: echo Hello, world from the self-hosted runner!
```


