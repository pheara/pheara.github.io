+++
date = "2016-10-05T18:27:45+02:00"
description = ""
tags = ["Critical Algorithm Studies", "Methods Mini-Series"]
title = "Methods for Studying Algorithms"
draft = true

+++


At last, this is the third part of the [mini-series on “studying algorithms”](/tags/methods-mini-series/). The previous try to explain [why doing so is important](/article/why-study-algorithms/) and the [difficulties you might encounter](/article/challenges-when-studying-algorithms/) while doing so.

So, now let’s get to the actual “Hows”. The following sections are high-level overviews over some methods that are out there. They should help you with deciding which to dive deeper into when studying algorithms.

<!--more-->

## Studying the people

To understand an algorithm, it often helps to know where it came from and for whom it was built. For this studying the people and businesses who created it and the people who use it can be useful. For this, there’s a variety of methods commonly used in social sciences. Usually they’re divided into qualitative (e.g. interviews) and quantitative (e.g. questionnaires) ones.

Qualitative methods also include ethnographic field studies – an example would be observing coding teams at work. This can allow to understand the culture and assumptions that the algorithm came from. “How to Study Algorithms”&nbsp;<sup>[ref:HtS](#ref:HtS)</sup> mentions that it can be hard to gain access to the teams for this, though. In the same article John Danaher points out, that you can also widen the focus and study “the full set of legal, economic, institutional, technological, bureaucratic, political (etc) forces” that might influence the algorithm’s development.

On the quantitative side of things, you can give people questionnaires. The authors of “Auditing Algorithms”&nbsp;<sup>[ref:AAg](#ref:AAg)</sup> point out a problem of questionnaires: There is a difference between what people do and what they perceived, remember and report. To avoid this problem, you can ask them to allow you to collect data automatically (e.g. via a browser plugin or a tracking script).

## Reading the Source

This method can be used if the sources are available – either because they have been open-sourced or because you’re one of the trusted auditors&nbsp;<sup>[ref:Opc](#ref:Opc)</sup> mentioned above. Reading them and their documentation can help with understanding what the algorithm is doing. You can gather additional data by looking at the changes the code underwent over-time or by comparing implementations in different languages and frameworks.

There’s two problems you’ll probably run into:

Firstly, the [size of code-bases](/article/challenges-when-studying-algorithms/#scale).

Secondly, that discrimination won’t be something hard-coded in a single code-block. It can be spread out over the entire thing; you will probably only find it if you read between the lines. Almost certainly you won’t find a block like the following anywhere:
 ```
 if ($race = NOT_CAUCASIAN) then {
   illegal_discrimination()
 };
 ```

## Implement it Yourself

The idea is that by implementing the system yourself, you will understand the required steps and parts better by doing so. Rob Kitchin named this method  “Reflexively producing code” in his paper “Thinking Critically About and Researching Algorithms”&nbsp;<sup>[ref:Crt](#ref:Crt)</sup>

The inspiration for this approach are auto-ethnographic methods. Examples for these are keeping a journal/diary and observing one-self. As with any of them, your personal biases, assumptions and views will strongly influence the results.

## Scraping <a id="scraping"></a>

You download the entire thing, e.g. a set of home-pages, and explore them, e.g. by clustering them. The article “Auditing Algorithms”&nbsp;<sup>[ref:AAg](#ref:AAg)</sup> lists several limitations for this though:

Some pages constantly change as they’re personalized (e.g. Google results differ between persons and searches)

It might be necessary to log in manually or fill a captchas

There most likely will be legal restrictions, e.g. in the Terms of Service, that forbid you from doing this.

In the case of smaller servers it might even significantly tax the performance. This in turn will probably cost the provider money and worsen the experience of other users.

Lastly, another problem it shares with a few other methods, is that there’s no independent variable. These are elements you directly manipulate, to observe the resulting changes. An example would be something you enter into a search-box and the search-results you get. In comparison, scraping usually tries to just load everything. This might make it hard to impossible to find out what is the cause of things. It also makes it more prone to any personal biases and hidden assumptions.

## Black Box Audit

You systematically, but manually input different things into the algorithm (e.g. queries in Google’s search box). This input is your independent variable. Then you look at the differences in the output. From them, you can try to figure out what happens inside the algorithm.

However, usually you can’t collect too much data by hand. This in turn makes rather hard to completely understand what really causes the results. If you do the inputting automatically and generate a lot of results, evaluating them can become a challenge.

## Sock Puppet Audit <a id="sock_puppet_audit"></a>

This method, described in “Auditing Algorithms”&nbsp;<sup>[ref:AAg](#ref:AAg)</sup>, for instance is suited for studying social networks.

The basic idea is as follows: You start by creating fake accounts (the “sock puppets”). Then you flesh them out as far as necessary to make the algorithm register them as real humans. The point is to have some of these accounts vary in some way, e.g. their name and picture communicate different genders; these are your independent variables.

As opposed to [scraping](#scraping), this method can deal with login walls.

Even more importantly, having independent variables allows reasoning about cause and effect. Socket puppets still suffer from the same legal restrictions as scraping though. Also, there’s the question of how much data do puppets need to be “real enough”.

As a distinct downside, this method is usually used without the prior consent of the people running the algorithms. The fake data from the sock puppets can negatively influence the algorithm. This is especially the case, when there’s not many other users. Think of this before using the method and make sure to always get consent afterwards!

Also, as the method is often used to prove guilt, you should take extra care with your choices: what you try verify/falsify as well as which independent variables to use.

## Collaborative Audit

To deal with the issues of legality and realness of [sock puppet audits](#sock_puppet_audit), you can also hire a lot of human testers, as “Auditing Algorithms”&nbsp;<sup>[ref:AAg](#ref:AAg)</sup> sugggests. For this you can for instance use crowd-sourcing platforms like [Mechanical Turk](https://www.mturk.com/) (US-only atm). The independent variable then depends on who you chose to recruit.

However, this method has some limitations too:

It’s more expensive as you have to pay the testers. Also, at least for Mechanical Turk, the tasks you give people need to be very short
and well defined, e.g. “perform task X, save the resulting HTML and send it to us”.

In some cases a community of volunteers can get together to do collaborative audits together, making the process a lot more affordable.

## Further Reading

If you found methods that interest you in more detail, I can recommend to check out the articles and papers below. The method descriptions above also contain links to the paper(s) they draw from.

If you want to learn about the broader topic of critical algorithm studies the reading list(s) should give you a good start: The [general reading list](https://socialmediacollective.org/reading-lists/critical-algorithm-studies/) containing all papers and the [one we used](https://algorithmstudies.files.wordpress.com/2016/03/readings.pdf) – that is an extract of the former, filtered by readability from informatic-students viewpoints. Also, there is a podcast at <http://ethicalmachines.com/> that might be of some interest to you.

* [links] [“Critical Algorithm Studies: a Reading List”](https://socialmediacollective.org/reading-lists/critical-algorithm-studies/) by the Socialmediacollective.
    * [links] [a variant](https://algorithmstudies.files.wordpress.com/2016/03/readings.pdf) that has been filtered by readability from Informatic-students viewpoints (this is the list we used)
* [podcast] [“Ethical Machines: Conversations about Humans, Machines and Ethics” ](http://ethicalmachines.com/)
* [magazine] “Model View Culture: A magazine about technology, culture and diversity” <https://modelviewculture.com/>
* <a id="ref:MC" href="#ref:MC">**[MC]**</a> – Noble, Safiya. 2012. [*“Missed Connections: What Search Engines Say about Women”*](https://safiyaunoble.files.wordpress.com/2012/03/54_search_engines.pdf). Bitch magazine , 12(4): 37­41. [4 pages]
* <a id="ref:Rge" href="#ref:Rge">**[Rge]**</a> – Diakopolous, Nick. 2013. [*“Rage against the Algorithms”*](http://www.theatlantic.com/technology/archive/2013/10/rage-against-the-algorithms/280255/) The Atlantic, October 3. [blog article]
* <a id="ref:HtS" href="#ref:HtS">**[HtS]**</a> – [“How to Study Algorithms: Challenges and Methods”](https://algocracy.wordpress.com/2016/03/14/how-to-study-algorithms-challenges-and-methods/), [alternative link]( http://hplusmagazine.com/2015/07/28/how-to-study-algorithms-challenges-and-methods/) [blog article]
* <a id="ref:Crt" href="#ref:Crt">**[Crt]**</a> – Kitchin, Rob. 2014. [“Thinking Critically About and Researching Algorithms”](http://papers.ssrn.com/sol3/papers.cfm?abstract_id=2515786) [29 pages]
* <a id="ref:AAg" href="#ref:AAg">**[AAg]**</a> – Sandvig, Christian, Kevin Hamilton, Karrie Karahalios, and Cedric Langbort. 2014. [“Auditing Algorithms: Research Methods for Detecting Discrimination on Internet Platforms.”](http://www-personal.umich.edu/~csandvig/research/Auditing%20Algorithms%20--%20Sandvig%20--%20ICA%202014%20Data%20and%20Discrimination%20Preconference.pdf) Data and Discrimination: Converting Critical Concerns into Productive Inquiry , 64th Annual Meeting of the International Communication Association. May 22, 2014, Seattle, WA, USA. [18 pages]
* <a id="ref:Opc" href="#ref:Opc">**[Opc]**</a> – Burrell, Jenna. 2015. [“How the Machine ‘Thinks:’ Understanding Opacity in Machine Learning Algorithms.”](http://bds.sagepub.com/content/3/1/2053951715622512) [18 pages]
* <a id="ref:Emp" href="#ref:Emp">**[Emp]**</a> – Hooker, J.N. 1994. [“Needed: An Empirical Science of Algorithms.”](http://www.akira.ruc.dk/~keld/teaching/algoritmedesign_f08/Artikler/01/Hooker93.pdf) Operations Research 42(2): 201­212. [23 pages]
* <a id="ref:WwM" href="#ref:WwM">**[WwM]**</a> – Lee, Min Kyung, Kusbit, Daniel, Metsky, Evan and Dabbish, Laura. 2015. [“Working with Machines: The Impact of Algorithmic and Data-­Driven Management on Human Workers”](http://dl.acm.org/citation.cfm?id=2702548) CHI ’15 Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems: 1603-­1612 [10 pages from "Algorithmic Culture"-section]




<!--

Target: students who want to learn about methods to employ them
Goal: give summary and pointers to start diving deeper ("if you have the problem X read Y")

Run checkers for spelling and reading-level (high-school!)

TODO

* have someone with a more profound basis in social sciences read over it
* have first-semesters read over it
-->
