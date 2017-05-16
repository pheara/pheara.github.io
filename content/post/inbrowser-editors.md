
+++
date = "2017-05-04T16:28:00+02:00"
draft = false
title = "JS-based Text/Markdown Editors"
tags = ["js libraries"]
+++

[Peacememories](https://github.com/peacememories) and I are working on a haskell-based CMS-frontend for static site generators like hakyll (see [project on github](https://github.com/Haskell-Praxis/hakyll-cms)). For this we need a text-editor for authoring markdown. Ideally it should allow both editing as rich text and markdown and is small enough not to incur severe page-load-performance costs.

For this, I've compiled this small comparison table, that some of you might find useful for their projects:

<!--more-->


| Editor | Size | Editing | Exports | Toolbar | Notes |
| :-- | :-- | :-- | :-- | :-- | :-- |
| [Medium.js](http://jakiestfu.github.io/Medium.js/docs/) | 18k | rich | html | JS-API | |
| [Trumbowyg](http://alex-d.github.io/Trumbowyg/) | 21k + jQuery | rich | html | at top | |
| [pen](http://sofish.github.io/pen/) | 32k | rich | md | mouse-over ||
| [EpicEditor](http://stacks.math.columbia.edu/js/EpicEditor/) | 34k | md  with preview | md | none | |
| [bootstrap-markdown](http://www.codingdrama.com/bootstrap-markdown/) | 49k + Bootstrap | md with preview | md | at top | |
| [CLEditor](http://premiumsoftware.net/cleditor/) | 9k + jQuery | rich | html | at top | win95 style |
| [bootstrap-wysiwyg](http://mindmup.github.io/bootstrap-wysiwyg/) | 5k + jQuery + Bootstrap | rich | html export | at top ||
| [Lepture's Editor](http://lab.lepture.com/editor/) | 247k | md with preview | md | at top | <!--more--> |
| [Vue.js](https://vuejs.org/v2/examples) | 273k | md with preview | md | none ||
| [SimpleMDE](https://simplemde.com/) | 280k | md with preview | md | at top ||
| [Grafikart/JS-Markdown-Editor](https://github.com/Grafikart/JS-Markdown-Editor) | 189k + jQuery + Bootstrap | md  with preview | md | at top ||
| [medium-editor](https://github.com/daviferreira/medium-editor) | 311k | rich | html | mouse-over ||
| [bootstrap-wysihtml5](http://jhollingworth.github.com/bootstrap-wysihtml5/) | 325k | rich |  html | at top ||
| [TinyMCE](https://www.tinymce.com/) | 405k | rich | html | at top | many markup options |
| [ACE](https://ace.c9.io/build/kitchen-sink.html) | 645k | md amongst others | md if md is written | none | code editor with syntax highlighting |
| [Hallo.js](http://hallojs.org/demo/markdown/) | 106k + 566k dependencies | rich + md | md | at top ||
| [CKEditor + Markdown Plugin](http://ckeditor.com/addon/markdown) | ~820k | rich + md | md | at top | many markup options, [configuration-tool](http://ckeditor.com/builder), uses iframes |
| [jbt/markdown-editor](https://jbt.github.io/markdown-editor/) | 823k with various dependencies | md with preview | md | none | default style unusable on small screens |
| [Markdown-It](https://markdown-it.github.io/) | 250k + 850k dependencies | md  with preview | md | none ||
| [Substance](http://substance.io/) | 1.14M | rich | html | at top | |
| [Stackedit](https://stackedit.io/) | 1.48M | md with preview | md | at top | requires nodejs server |
| [Woofmark](https://bevacqua.github.io/woofmark/) | 1.4M | rich + md | md | at top | |
| [Pandao/Editor.md](https://pandao.github.io/editor.md/en.html) | ~1.7M with various dependencies | md with preview | md | at top | many markup options; [github-repo](https://github.com/pandao/editor.md)
| [Dillinger](http://dillinger.io/) | 1.8M | md with preview | md | none | various import/export options |
| [Markdown-Plus](http://mdp.tylingsoft.com/) | 6M with various dependencies | md  with preview | md | at top ||
| Aloha | | | | | discontinued |

sorted by uncompressed size. bootstrap is about 28k uncompressed, jQuery about 91k. sizes have been determined by looking at the network tab on the demo pages (subtracting any content, like images, in those demos).

Other comparisons:

* [This issue](https://github.com/Semantic-Org/Semantic-UI/issues/222) on Semantic-Org/Semantic-UI lists a few editors
* [Top 7: Best Markdown editors Javascript and jQuery plugins](http://ourcodeworld.com/articles/read/359/top-7-best-markdown-editors-javascript-and-jquery-plugins) (2017-01)
* [Coding 10 Awesome JavaScript WYSIWYG & Markdown Editors](http://www.developersfeed.com/awesome-javascript-wysiwyg-markdown-editors/) (2016)
