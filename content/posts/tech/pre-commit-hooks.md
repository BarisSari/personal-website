---
title: Raise the Bar of Code Quality in Python Projects
date: 2021-01-13
published: true
tags: ['Python', 'Github', 'pre-commit', 'code_styling']
series: false
cover_image: ../images/precommit_front.jpeg
photographer: '<a href="https://unsplash.com/@ugmonk?utm_source=medium&utm_medium=referral" target="_blank" rel="nofollow noopener noreferrer">Jeff Sheldon</a>'
image_link: '<a href="https://cdn-images-1.medium.com/max/2600/0*zUOYo_3eGaVTzTY_" target="_blank" rel="nofollow noopener noreferrer">Unsplash</a>'
canonical_url: false
description: "Create pre-commit hooks with isort, black, flake8. Add it to Github Actions to automate your code styling check and keep quality at the top."

---

You can also read it on [Medium](https://levelup.gitconnected.com/raise-the-bar-of-code-quality-in-python-projects-7c49743f004f).

Assume that you get accepted in one of your dream jobs. You think that you will work with the most talented colleagues and you feel very excited. After the orientation days, you finally sit on your desk and check the project you will be working on.

After spending some time, you realize that everything looks more complicated than it should because there are no styling checks in the project. Many developers contribute, and all of them have a different style of coding as usual. It would be hard to comprehend the project, right? It would be pretty simple if all parts of the project follow the same styling. Or it would be pretty simple if imports were in order and there were neither unused imports nor unused variables.

Yet, the company doesn’t want to force the developers to consider styling in each commit. What could they do? They could use a **pre-commit hook** and a **CI pipeline**! We will define a pre-commit hook, and add a Github Action as CI to a basic Python project in this article.

I will not explain how pre-commit hook or GitHub Actions work in details. Yet, it is always good to recall simple definitions.

[Git hooks are](https://www.atlassian.com/git/tutorials/git-hooks):

> scripts that run automatically every time a particular event occurs in a Git repository. They let you customize Git’s internal behavior and trigger customizable actions at key points in the development life cycle.

[Git hooks are necessary because](https://pre-commit.com/#introduction):

> **Git hook scripts** are **useful for identifying simple issues before submission to code review**. We run our hooks on every commit to automatically point out issues in code such as missing semicolons, trailing whitespace, and debug statements. By **pointing these issues out before code review**, this **allows a code reviewer to focus on the architecture of a change while not wasting time with trivial style nitpicks.**

[The pre-commit framework is](https://pre-commit.com/#introduction):

> **a multi-language package manager for pre-commit hooks**. You **specify a list of hooks** you want and **pre-commit manages the installation and execution of any hook written in any language before every commit**. pre-commit is specifically designed to not require root access. If one of your developers doesn’t have node installed but modifies a JavaScript file, pre-commit automatically handles downloading and building node to run eslint without root.

You might check these links for understanding Git hooks deeply: [1](https://towardsdatascience.com/pre-commit-hooks-you-must-know-ff247f5feb7e), [2](https://githooks.com/), [3](https://www.atlassian.com/git/tutorials/git-hooks)

![img](https://cdn-images-1.medium.com/max/1600/0*8GhhkibIkW39372M)Photo by [lan deng](https://unsplash.com/@landall?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)

I have created a new repository for this article. You might check it [here](https://github.com/BarisSari/medium-pre-commit-article). Before adding any configuration, please take a look at the [module and ](https://github.com/BarisSari/medium-pre-commit-article/commit/b1e22d6c72bb7780e69893292c9d1e8e0dda2742)`src`[ directory ](https://github.com/BarisSari/medium-pre-commit-article/commit/b1e22d6c72bb7780e69893292c9d1e8e0dda2742)with two packages. They all have styling errors if you look at [PEP 8](https://www.python.org/dev/peps/pep-0008/) ([E302, E303, and more](https://pep8.readthedocs.io/en/release-1.7.x/intro.html#error-codes)):

https://gist.github.com/BarisSari/5c516fd5875c6f25810daddfb03206e0

*src/bar/first_module.py*

https://gist.github.com/BarisSari/698941522ad409accf5e67aaf1f25a16

*src/foo/first_module.py*

https://gist.github.com/BarisSari/dda903b8be6d721d8d41fef8ba5b27ba

*main.py*

We will start with a file named `.pre-commit-config.yaml` in root of the project for configuring pre-commit hook:

```
$ touch .pre-commit-config.yaml
$ nano .pre-commit-config.yaml
```

https://gist.github.com/BarisSari/84489d488ab6d21e3a055106836217ab

**

When we glance at this config file:

- `.git` and `.tox` files excluded using `exclude` keyword. The pre-commit hook will not try to fix these files. It is an optional field.
- The pre-commit hook will run in each time when you try to commit. We used `default_stages: [commit]`keyword and value for that. It is also an optional field. Other possible values are: `commit`, `merge-commit`, `push`, `prepare-commit-msg`, `commit-msg`, `post-checkout`, `post-commit`, or `manual`.
- If pre-commit hook fails, the rest of the steps will not run. We set `fast_fail`to `true` for this behaviour. It is an optional field, as well. It is an optional field, default is false, as well.

These were the [top-level configurations](https://pre-commit.com/#pre-commit-configyaml---top-level). Other fields you can use are `default_language_version` , `files` , `minimum_pre_commit_version` , and `repos` . We will use only `repos` in our config file. We added a few repositories, which are going to run step by step:

- The first one is [pre-commit-hooks](https://github.com/pre-commit/pre-commit-hooks). We are using it for: `trailing-whitespace` (trims whitespaces from the end of lines), `end-of-file-fixer` (checks if all files end with a newline), `check-toml` (checks the syntax of toml files), `check-merge-conflict` (checks if your changes will cause a merge conflict or not).
- The second one is [black](https://github.com/psf/black), i.e. *The uncompromising Python code formatter*. **Black** fixes almost all of the styling errors automatically.
- The third one is [isort](https://github.com/timothycrosley/isort), a library that sorts your imports by type and name automatically. It separates Python’s built-in module/package imports, third-party imports, and project module/package imports.
- The final one is [flake8](https://gitlab.com/pycqa/flake8). It evaluates your code using PEP-8 standard, pyflakes and other libraries. Even though **black** and **isort** solve most of the problems, you may still have some errors such as [long strings](https://github.com/psf/black/issues/1331).

As you can see, we included a few libraries which might cause conflicts unless you configure them. For example, when you use default configurations, **black** and **isort** handle the long line imports differently.

Before installing and running the pre-commit hook, we will create configuration files for these libraries, and they will be compatible. Again, we will create all the new files at the root of the project.

Run the followings to create a config file named `pyproject.toml` for **black** and **isort**:

```
$ touch pyproject.toml
$ nano pyproject.toml
```

https://gist.github.com/BarisSari/995d149ae3e72f666650c015d33f0a1c

**

I find the default **maximum line length**, **88 for black and 79 for flake8, too small.** Therefore I usually set the line-length parameter to 100. When lines are too long, it becomes difficult to see all codes in once because you should scroll to the right. However, if you use GitHub, Gitlab, or Bitbucket, you will still see the full-width line without scrolling.

For **isort**, we set `black` profile and `multi_line_output` (it means [**Vertical Hanging Indent**](https://pycqa.github.io/isort/#multi-line-output-modes)) parameters. You can find more information for black compatibility of isort [in this link](https://pycqa.github.io/isort/docs/configuration/black_compatibility/).

**Note:** Preferably, You can create a new file named `.isort.cfg` for **isort** [configuration](https://pycqa.github.io/isort/docs/configuration/config_files/). You should use`[settings]`instead of `[tool.isort]`. Please check the code below:

```
$ touch .isort.cfg
$ nano .isort.cfg
```

https://gist.github.com/BarisSari/f23a8fd780dae64c23151e9d83eebbad

**

Let’s create a config file named `.flake8` for **flake8**:

```
$ touch .flake8
$ nano .flake8
```

https://gist.github.com/BarisSari/74ede2c2e4b786c116c4b986379528b1

**

As you see, I gave the same value for `max-line-length`, and I excluded some files which might flake8 be bothered unnecessarily. If you use a virtual environment, you will probably have a `venv` folder in your project, where you install your dependent libraries. I can assure you that you wouldn’t want flake8 to check your third-party libraries because it may take a long time and flake8 may find tons of warnings and errors. Please, never change the codes of the third-party libraries you use. If you spot an error, open an issue and PR in the repository. If you need more changes, fork the repo, modify and use it. The reason is that not all of the developers will have the environment you have. So, one thing that works for you won’t work for others or in production.

Finally, we will add all these config files to `Git`.

```
$ git add .pre-commit-config.yaml pyproject.toml .flake8
```

Okay, we are ready to go. I will install `pre-commit` via pip:

```
(venv) $ pip install pre-commit
(venv) $ pre-commit install
```

Since we installed the pre-commit hook, it will run in every commit. Let’s try to commit the added config files and see whether our hook runs or not.

```
$ git commit -m "Add configurations"
```

It should give the following error:

![img](https://cdn-images-1.medium.com/max/1600/1*7d8fCYVoHUUG4-c_ZBys5A.png)Our configuration files didn’t have a newline at the end

Okay, try to commit again:

```
$ git add .flake8 pyproject.toml
$ git commit -m "Add configurations"
```

The expected output is as follows:

![img](https://cdn-images-1.medium.com/max/1600/1*NBjnWPo4-c2MEytM0RhuoA.png)We committed this time without a problem

It worked this time. Pre-commit hook skipped **black**, **isort** and **flake8** steps because we didn’t add any python modules to our commit. If we added it, it would run these steps, too.

I had committed files with errors before I installed the pre-commit hook. What I want is running pre-commit hook and fixing these errors. We can use `pre-commit`’s run command:

```
$ pre-commit run -a 
```

It will run pre-commit hook for all files (that’s what `-a` stands for). If you use the same files, you will need to run this command three times to:

1. Add new empty lines to the modules,
2. Reformat code using black
3. Reformat imports using isort.

After that, you should see an error because of **flake8**:

![img](https://cdn-images-1.medium.com/max/1600/1*HbQCcHLGFI6MDh2MqvyjQw.png)

Remove the not used import line from main.py:

```
import random  # An import which we will not use at all
```

Then, you can run one more time to be sure:

![img](https://cdn-images-1.medium.com/max/1600/1*MwQEhLiLBVFOf7gtDplEFw.png)All steps passed. Files are ready to commit

Run the commands below for committing the files and finishing the first part of the tutorial:

```
$ git add main.py src/bar/first_module.py src/foo/first_module.py
$ git commit -m "Run pre-commit hooks"
```

[Let’s check final versions of the files:](https://github.com/BarisSari/medium-pre-commit-article/commit/519227f392054f1c23ac1a6e41076e7b1e53c066)

https://gist.github.com/BarisSari/4348ec31147664affd3256f8f13192b9

*src/bar/first_module.py*

https://gist.github.com/BarisSari/ac2f0a351ec7f7a4831fe8637a51e896

*src/foo/first_module.py*

https://gist.github.com/BarisSari/168d5133211ef3d12eab887e5dabb114

*main.py*

They look more elegant, right? Here are the fixed warnings:

- PEP 8: E302 expected 2 blank lines between definition of a class or function
- PEP 8: E303 too many blank lines (2) between definition of methods
- PEP 8: E501 line too long (137 > 110 characters)
- PEP 8: W292 no newline at end of file

In the second part of the tutorial, we will use the pre-commit hook we created in GitHub Actions. [Its definition by Github](https://github.com/features/actions)is as follows:

> GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want.

GitHub Actions offer a lot! It is a neat and robust tool. And it has comprehensive [documentation](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-python). I will use [the template](https://github.com/actions/starter-workflows/blob/main/ci/python-package.yml) it suggests:

https://gist.github.com/BarisSari/5f7892f756609a55abe7a9b537f85d5e

**

I added this file under `.github/workflows` directory. The last two steps are different than the example template:

1. After upgrading the pip, we will install the pre-commit hook via pip.
2. Pre-commit will be initialized and run for all files in the repository, but the excluded ones.

Since three Python versions specified, there will be three different builds for each `push` to the remote repository. Here how it looks like:

![img](https://cdn-images-1.medium.com/max/1600/1*pHVhg7l7_bN5H1IRi9Uodw.png)

All steps of the pre-commit hook are passed on GitHub as expected.

As a result, each time you commit and then push to the remote, GitHub Workflow will check the styling. Additionally, each time you commit locally, the pre-commit hook will run first. And it will prevent you from committing unless you use `force push`.

You have now the setup which will help you to standardize styling of your project. Congratulations!

You can find the latest version of the repository below:

[**BarisSari/medium-pre-commit-article**](https://github.com/BarisSari/medium-pre-commit-article)

### **Conclusion**

It is **dead simple to use the pre-commit hook** in both locally and on GitHub Actions. And **you don’t even need to change your code manually in most cases** as the pre-commit will fix them automatically. Your hook will fix them automatically. However, when you have some insisting errors, you should check the pre-commit logs and make changes.

Please keep in mind that having a **pre-commit hook does not mean that** your **project is compatible with all PEP rules**. For example, as to PEP-8, you should use only lowercase and underscore when you name your function. The pre-commit hook will not complain if you define a function called TEST. You should **be aware of what the included libraries(black, isort, flake8) are capable of** **and what they are not**. Still, If you are trying to follow Python’s best practices, pre-commit hooks will surely help you.

**Note:** Please keep in mind that I gave silly names for modules and packages. I tried to show how simple and effective pre-commit hooks are. That’s why I tried to make modules and packages as silly as I could. You can check this [gist](https://gist.github.com/sloria/7001839) for some of the best practices of Python such as naming conventions.

**Note-2:** You may use the pre-commit hook for other programming languages as well. Please check [this link](https://pre-commit.com/hooks.html) to see all supported hooks.

**Note-3:** I’m using PyCharm, and it does run the pre-commit hook even I use its commit & push screen. You can check if your IDE has this functionality unless you use terminal for Git.

**Note-4:** There are other great CI/CD tools such as Travis, CircleCI, Jenkins. Once you setup and configure a pre-commit hook for your project, you can always include it to your favourite CI/CD tool by adding a few lines. There are many examples on the internet. You can check them out.

Thank you for reading up to the end! I’m looking forward to hearing your responses.

### Resources

- [Black repository](https://github.com/psf/black) — [Documentation](https://black.readthedocs.io/en/stable/)
- [Isort repository](https://github.com/pycqa/isort/) — [Documentation](https://pycqa.github.io/isort/)
- [Flake8 repository](https://gitlab.com/pycqa/flake8) — [Documentation](https://flake8.pycqa.org/en/latest/index.html#quickstart)
- [PEP 8 Style Guide](https://www.python.org/dev/peps/pep-0008/)
- [PEP 8 Error Codes](https://pep8.readthedocs.io/en/release-1.7.x/intro.html#error-codes)
- [Git hooks](https://www.atlassian.com/git/tutorials/git-hooks)
- [Pre-commit hooks](http://pre-commit.com/)
- [Github Workflow — Building and Testing in Python](https://docs.github.com/en/free-pro-team@latest/actions/guides/building-and-testing-python#starting-with-the-python-workflow-template)