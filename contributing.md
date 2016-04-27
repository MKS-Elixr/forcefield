# Contributing

These are the guidelines you'll need to follow when contributing code to Jubilant Umbrella. To propose a change or request clarification, [open an issue](https://github.com/MKS-Elixr/jubilant-umbrella/issues/new).

## Style Guides

Follow these two style guides religiously:

- [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)
- [Javascript Standard Style](https://github.com/feross/standard)

All pull requests and branches are automatically checked by Standard when pushing commits. If your code fails any of those tests, it won't be eligible for merging. Because of this, it's recommended that you [install Standard locally](http://standardjs.com/index.html#install).

Any violations of the Angular Style Guide will need to be reported via [Github Issues](https://github.com/MKS-Elixr/jubilant-umbrella/issues) and dealt with individually.

## Issue Tracking

Github has a built in issue tracking system that's pretty awesome! You can label issues, assign someone to them, mark them as part of a milestone, etcetera. If you haven't used them before, check out [Github's writeup on them](https://guides.github.com/features/issues/). We followed Github's recommendations, along with [a tagging style guide](https://robinpowered.com/blog/best-practice-system-for-organizing-and-tagging-github-issues/).

If you have any feedback (a bug report, feature request, etcetera) utilize Github Issues as opposed to something like Slack or Waffle. This allows us to keep track of everything more efficiently.

## Github Workflow
For the most part, we follow [Github's recommended workflow](https://guides.github.com/introduction/flow/) with a shared repository model. This meant branching off from master, committing some code, and submitting a pull request back to master for code review. As a side note, do not rewrite history and then force push into the main repository or its branches.

### Branching

You should almost always [create a feature branch](https://github.com/Kunena/Kunena-Forum/wiki/Create-a-new-branch-with-git-and-manage-branches) when working on something new. The branch should originate from master, and include a few dash separated words (without prefixes) as to what you're working on. For instance, the following are all good examples of what to do:

- `improve-database-schema`
- `refactor-authentication`
- `implement-mapping`

and these are examples of what not to do:

- `improv.db.scheme`
- `fix-broken-page`
- `[app]-feature-make-google-maps-work`

Branches should never involve more than one feature or fix, and should include as few changes as possible. This allows you to get code into master as quickly as possible, and isolate specific features and fixes from others.

As soon as you feel like a feature or fix is ready, [create a pull request](https://help.github.com/articles/using-pull-requests/). Doing so immediately means others are aware of your changes, and avoids large merge conflicts later on. When a pull request is merged into master by somebody else, it should be [pulled into your feature branch as quickly as possible using rebase](https://medium.com/@porteneuve/getting-solid-at-git-rebase-vs-merge-4fa1a48c53aa). Your branch's history should never have any merge commits; try to keep the history as clean as possible by [using rebase to fast forward and replay commits from master on top of your branch](http://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase/).

### Committing
For commit messages, try to stick with [these guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html). This mainly means keeping your commit messages short (no prefixes) and in the imperative (update instead of updates or updated, etcetera). Commit messages should also be uppercased (unless referencing a specific library name, tool, etcetera) and not include punctuation. Avoid saying you updated, added, modified, or otherwise did something to a file. Instead, say specifically (but briefly) what you did to that file or what you accomplished by changing it. Only include commit descriptions if absolutely necessary, and when you do format them using markdown.  

These are  examples of good commit messages:

- `Installed ngCordova`
- `Added Prompt for Geolocation Permissions`
- `Fixed Session Token Handling`

while these are not:
- `I Got ngCordova to Work.`
- `[feature] the geolocation permissions now work by prompting use for permissions.`
- `added a file to allow login to work`

Your commits should be concise and clear. Someone else should be able to follow the steps you took to implement something by simply viewing your commits. This means they should be in a logical order (don't switch between working on different features in the same branch).

If things get messy, don't be afraid to use git rebase. If you're unfamiliar with it, there are [several](https://help.github.com/articles/about-git-rebase/) [great](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history) [guides](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) available to you. Just don't force push or rewrite everyone's history!
