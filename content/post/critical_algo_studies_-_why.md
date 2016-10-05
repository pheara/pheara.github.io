+++
date = "2016-10-04T15:33:13+02:00"
description = ""
tags = ["Critical Algorithm Studies", "Methods Mini-Series"]
title = "Why Study Algorithms"

+++


Last semester I’ve participated in a [seminar on “Critical Algorithm Studies”](https://algorithmstudies.wordpress.com/). Collectively we worked through a [reading list](https://algorithmstudies.files.wordpress.com/2016/03/readings.pdf), which is a filtered version of [the one published by the socialmediacollective](
(https://socialmediacollective.org/reading-lists/critical-algorithm-studies/). In particular, I dived deeper into the sub-list on *“Methods for Studying Algorithmic Systems”*.

The [three posts of this mini-series](/tags/methods-mini-series) are an attempt at summarizing those writings and a
few others; you can find a complete list of the references at the bottom. :)
The series should give you a *basic overview* over the whys ([part 1](/article/why-study-algorithms/)) and challenges ([part 2](/article/challenges-when-studying-algorithms/)) of studying algorithms as well as some methods to do so ([part 3](/article/methods-for-studying-algorithms/)).

Anyway, enough preface, let’s get started. :)

<!--more-->

When people think of algorithms – Google Search for example –
they think of a system that’s impartial, neutral, objective and based on hard data. Most often the organizations behind these algorithms tend to foster this image. The same goes for bureaucracies, whose procedures are offline algorithms in a sense. Neither are free of bias and discrimination.

There are several ways this *bias* might make its way into the system. For one, the developers might introduce it *when first writing the system*. A good example for that is the article  [“Gay marriage: the database engineering perspective”](https://qntm.org/gay) (2008). In it, the author starts with a widely spread database scheme, which enforces gender-binary. It also excludes any marriages that aren’t life-long and between one woman and one man. Step-by-step the scheme is adapted to include more people and marriages.

In [“Missed Connections: What Search Engines Say about Women”](https://safiyaunoble.files.wordpress.com/2012/03/54_search_engines.pdf)&nbsp;(2012)&nbsp;<sup>[ref:MC](#ref:MC)</sup> Safiya Noble points out another source for biases: The data that the algorithm draws or learns from. If you [google for “women athletes”](https://encrypted.google.com/search?hl=en&q=women%20athletes) the returned websites will focus on the athletes looks rather than their
performance. Searching ["unprofessional hair"](https://www.google.at/search?tbm=isch&q=unprofessional+hair&tbs=imgo:1&gws_rd=cr&ei=2FlYV8f2JYXjUZCtoPgB) on Google Images mainly yields photos of black women. In comparison, the generic [“woman”](https://www.google.at/search?tbs=imgo%3A1&tbm=isch&sa=1&btnG=Search&q=woman) mostly yields white women. Search-results like these *perpetuate and reinforce stereotypes* found in our society. On the plus side, some issues mentioned in the article seem to have already been resolved by now. For instance,  antisemitic results displayed when searching for “Jew” are now filtered out.

And then, there’s *willful manipulation*.

In one example an online shop would change prices depending on where you live (search for “staples.com” in [“Rage against the Algorithms”](http://www.theatlantic.com/technology/archive/2013/10/rage-against-the-algorithms/280255/) by Nick Diakopolous (2013)&nbsp;<sup>[ref:Rge](#ref:Rge)</sup>).

In another example a business providing an online search for flights subtly tweaked their algorithm to always show the offers from their own airline first. This was the SABRE-system described in [“Auditing Algorithms”](http://www­personal.umich.edu/~csandvig/research/Auditing%20Algorithms%20%20Sandvig%20%20 ICA%202014%20Data%20and%20Discrimination%20Preconference.pdf) (2014)&nbsp;<sup>[ref:AAg](#ref:AAg)</sup>. The president of the airline argued: “Why would you build and operate an expensive algorithm if you can’t bias it in your favor?”.

A different kind of bias/manipulation is placated by Safiya Noble&nbsp;<sup>[ref:MC](#ref:MC)</sup>: Big organizations have the money to maintain numerous domains and produce a lot of content. This increases their search-ranking. Safiya Noble complains, that feminist literature rarely hits page one for generic searches like “woman magazine”. That results page is dominated by outlets, which reinforce gender stereotypes.

For more examples I can heartily recommend you to check out the my colleagues’ presentations, our [discussion notes](https://algorithmstudies.wordpress.com/), and of course the papers from the [reading list](https://algorithmstudies.files.wordpress.com/2016/03/readings.pdf), on which all of this work is based. In any case, the examples should illustrate how important it is, to make sense of the inner workings of algorithms, the background of their creation and their interaction with society.

[The next part](/article/challenges-when-studying-algorithms/) of this [mini-series](/tags/methods-mini-series on “studying algorithms”) explores some challenges you’ll encounter, when doing your own studies.

## References

* <a id="ref:MC" href="#ref:MC">**[MC]**</a> – Noble, Safiya. 2012. [*“Missed Connections: What Search Engines Say about Women”*](https://safiyaunoble.files.wordpress.com/2012/03/54_search_engines.pdf). Bitch magazine , 12(4): 37­41. [4 pages]
* <a id="ref:Rge" href="#ref:Rge">**[Rge]**</a> – Diakopolous, Nick. 2013. [*“Rage against the Algorithms”*](http://www.theatlantic.com/technology/archive/2013/10/rage-against-the-algorithms/280255/) The Atlantic, October 3. [blog article]
* <a id="ref:AAg" href="#ref:AAg">**[AAg]**</a> – Sandvig, Christian, Kevin Hamilton, Karrie Karahalios, and Cedric Langbort. 2014. [“Auditing Algorithms: Research Methods for Detecting Discrimination on Internet Platforms.”](http://www-personal.umich.edu/~csandvig/research/Auditing%20Algorithms%20--%20Sandvig%20--%20ICA%202014%20Data%20and%20Discrimination%20Preconference.pdf) Data and Discrimination: Converting Critical Concerns into Productive Inquiry , 64th Annual Meeting of the International Communication Association. May 22, 2014, Seattle, WA, USA. [18 pages]
