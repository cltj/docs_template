
Follow these steps to set up a version controlled obsidian vault on github. 

> [!NOTE]
> PS! Remember that you store all your vaults in your icloud account under the documents and docs folder. 

1. Create a new repo on your github account
2. Navigate to your icloud account > documents > docs
3. When in your docs folder use 
```
git clone https://github.com/cltj/<YOUR-REPO>.git <YOUR-REPO>
``` 
4. Open obsidian and create a new vault, chose the folder you created with the command above, and give the vault the same name
5. If you do not have a gh_pat available, create one. Then go back to the root of the project `cd ..` and run this command
```
git remote set-url origin https://<YOUR-PAT>@github.com/cltj/<YOUR-REPO>.git
```
6. Move all the files from the root into the vault
```
mv Archive Area Attachment Index.md Project/ Resource Template <YOUR-VAULT>
```
7. In obsidian open the settings and activate the community plugins
8. Browse, install and enable the git plugin as well as the Version history diff plugin
9. In the options for the git plugin, scoll down and fill in author `cltj` and email `tj@cloudlink.ai`
10. Restart obsidian, you should now see your [[PARA]] hierarchy. Use `CTRL+P` and select `Open Source Control View` to display the source control
11. Use `CTRL+P` and search for Backup. Choose `Git: Create backup` and press enter
12. Verify that your vault was pushed to the github repo


> [!Config Tip!]
> You can symlink to your documentation by using
> ```
> ln -s /mnt/c/Users/kinst/iCloudDrive/Documents/docs ~/docs
> ```
> 
> ```
> ls -l ~/docs
> ```
> 
> ```
> cd docs
> ```

