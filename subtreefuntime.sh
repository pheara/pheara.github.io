#!/usr/bin/bash

# Setup
# =====

git remote add publish_remote git@github.com:m0ru/m0ru.github.io.git
git fetch publish_remote

# Remove the public folder to make room for the gh-pages subtree
rm -rf public

# I checked out the new repo, generated hugo once,
# moved the contents of `public/` to that folder
# and committed and pushed.
#
# Back in the original blog-folder:

git checkout -b publish_branch publish_remote/master

# to check if everything is there from the earlier generating

ls

# then switch back

git checkout master

# add the directory

git read-tree --prefix=public/ -u publish_branch


# Pulling changes from other publishes
# ====================================

git checkout master
git pull

git checkout publish_branch
git pull
git checkout master
git merge --squash -s subtree --no-commit publish_branch


# Publishing
# ==========

# after generating via `hugo` and `git commit && git push` to master

git checkout publish_branch
git merge --squash --strategy=subtree master
git commit -m 'Publishing'
git push publish_remote HEAD:master
git checkout master
