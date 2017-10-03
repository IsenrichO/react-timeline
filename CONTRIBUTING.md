# Contributing to React-Timeline

We'd love for you to contribute to our source code and make _React-Timeline_ even better than it is.

today! Here are the guidelines we'd like you to follow:

+ Question or Problem?
+ Submission Guidelines
+ Coding Rules
+ Commit Message Guidelines

<a name="question"></a> Got a Question or Problem?

Reach out to me at [isenrich at yahoo dot com](mailto:isenrich@yahoo.com)! I try to be as responsive as possible and will reply to any inquiries as soon as possible.

<a name="submit"></a> Submission Guidelines

Before you submit your pull request consider the following guidelines:

+ Fork this repo to your own repository and ensure that is accessible publicly.
+ Make your changes in a new git branch:
      git checkout -b fix/cicc-1000 master
+ Follow our Coding Rules.
+ Run the full test suite and ensure that all tests pass.
+ Commit your changes using a descriptive commit message that follows our
  commit message conventions and passes our commit message pre-submit hook. Adherence to the commit message conventions is required,
  because release notes are automatically generated from these messages.
        git commit -a
  Note: the optional commit -a command line option will automatically "add" and "rm" edited files.
+ Build your changes locally to ensure all the tests pass:
      npm run test
+ Push your branch to the remote repository:
      git push origin fix/cicc-1000

In Bitbucket, send a pull request to iris:master.

If we suggest changes, then:

+ Make the required updates.
+ Re-run the test suite to ensure tests are still passing.
+ Commit your changes to your branch (e.g. fix/cicc-1000).
+ Push the changes to your remote repository (this will update your Pull Request).

If the PR gets too outdated we may ask you to rebase and force push to update the PR:

    git rebase master -i
    git push origin fix/cicc-1000 -f

That's it! Thank you for your contribution!

After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes

from the main (upstream) repository:

+ Delete the remote branch on Bitbucket either through the Bitbucket web UI or your local shell as follows:
      git push origin --delete fix/cicc-1000
+ Check out the master branch:
      git checkout master -f
+ Delete the local branch:
      git branch -D fix/cicc-1000
+ Update your master with the latest upstream version:
      git pull --ff upstream master

<a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

+ All public API methods must be documented with JSDoc.
+ We follow the rules contained in
  Airbnb React/JSX Style Guide

<a name="commit"></a> Commit Message Guidelines

Commit Message Format

A commit message consists of a header, body and footer.  The header has a type, scope and subject:

    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>

The header is mandatory and the scope of the header is optional.

Revert

If the commit reverts a previous commit, it should begin with revert:, followed by the header of the reverted commit. In the body it should say: This reverts commit <hash>., where the hash is the SHA of the commit being reverted.

Type

If the prefix is feat, fix or perf, it will appear in the changelog. However if there is any BREAKING CHANGE, the commit will always appear in the changelog.

Other prefixes are up to your discretion. Suggested prefixes are docs, chore, style, refactor, and test for non-changelog related tasks.

Scope

The scope could be anything specifying place of the commit change. For example $location,

$browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...

Subject

The subject contains succinct description of the change:

+ use the imperative, present tense: "change" not "changed" nor "changes"
+ don't capitalize first letter
+ no dot (.) at the end

Body

Just as in the subject, use the imperative, present tense: "change" not "changed" nor "changes".

The body should include the motivation for the change and contrast this with previous behavior.

Footer

The footer should contain any information about Breaking Changes and is also the place to

reference Jira issues that this commit Closes.

Breaking Changes should start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this document.

Based on https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit

[commit-message-format]: https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#
