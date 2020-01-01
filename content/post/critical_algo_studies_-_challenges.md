+++
date = "2016-10-06T11:55:32+02:00"
description = ""
tags = ["Critical Algorithm Studies", "Methods Mini-Series"]
title = "Challenges when Studying Algorithms"
+++

This is part two of the [mini-series on “studying algorithms”](/tags/methods-mini-series/). If you are curious why studying these might be important at all, check out the [previous post](/article/why-study-algorithms/).

So, what complicates things, is that unearthing the biases within algorithms isn’t a trivial feat – several issues can make it hard to understand what’s going on.

<!--more-->

## Dynamic

For one, those systems are _constantly changing_ as they’re being developed, bugs are fixed and they’re tweaked to deal with changing requirements. Thus, any study can only look at a snapshot of an algorithm – usually the latest one. This might mean, that older studies’ findings might be deprecated.

Also, algorithms are _“out of control”_, as John Danaher puts it in “How to Study Algorithms: Challenges and Methods”&nbsp;[ref:HtS]. One way this manifests is that they have _unforeseen consequences_ that the developers never intended – e.g. the sexist Google results mentioned above. Another way would be that people can use them in ways the developers never foresaw. E.g. “Working with Machines”&nbsp;[ref:WwM] mentions Uber-drivers strategically turning their app on and off, to influence which
passengers they get, which in turn impacts the experience for passengers in some areas. This factor influences attempts to study the algorithm via studying its developers.

## Source Accessibility

One of the biggest challenges tends to be _black boxing_. A lot of companies keep their _code secret_ to protect their trade secrets / intellectual property, to prevent people from gaming the system (e.g. by google-bombing) or to obfuscate themselves against scrutiny and legislation. In “How the Machine ‘Thinks’”&nbsp;[ref:Opc] Jenna Burrel recommends to install a system of trusted auditors who can get access to the code without it being open sourced to the public.

Then of course _technical literacy_ can be a problem. A lot of people in investigative journalism and even in tech journalism lack the schooling to understand what’s going on these systems. I assume a lot of computer scientists would, in turn lack the journalistic capabilities and drive to produce good articles. Jenna Burrel&nbsp;[ref:Opc] asks for educating journalists that can study algorithm.

## Scale <a id="scale"></a>

Even if the source-code is available and the analyst is capable of comprehending it, the sheer _scale_ of modern algorithms might foil the exercise.
[This info-graphic on Information Is Beautiful](http://www.informationisbeautiful.net/visualizations/million-lines-of-code/) by McCandles, Doughty-White and Quick lists Google’s code-base to amount to 4,000 billion lines of code, roughly 56 million times the length of Tolstoy’s War and Peace.

But also the data-sets those algorithms operate on are huge – Google and eBay seemed to roughly process 100,000 Terra-bytes per day in 2014 (taken from [followthedata.wordpress.com](https://followthedata.wordpress.com/2014/06/24/data-size-estimates/)) and the Google CEO Eric Schmidt [famously stated](https://techcrunch.com/2010/08/04/schmidt-data/) that “Every 2 Days We Create As Much Information As We Did Up To 2003”.

Adding to this, is that those huge code-bases also tend to be rather heterogeneous – within themselves they use numerous frameworks, libraries, protocols, and programming languages.

Not only are code-bases huge, so are the teams working on them. In 2015 Google was listed to have roughly 30,000 engineers working for the company ([article on Techcrunch](https://techcrunch.com/2015/03/17/the-back-office-developers/)). This, again, complicates diagnosing any issue’s source by studying the development team.

## Implementation

Additional to the issues mentioned so far that mostly arrive from the circumstances of development, some algorithms’ inner workings, how they go about things, might make it difficult for human readers to understand what’s going on.

For one, entries in data-sets are often vectors in _high-dimensional_ spaces. This not only makes understanding harder, but also negatively affects the quality of the algorithms’ results – as the number of dimensions increase all distances between points become roughly equal and the data-points get spread out over more and more space, thus they don’t cover/represent it well anymore. This is the so-called [“Curse of
Dimensionality”](https://en.wikipedia.org/wiki/Curse_of_dimensionality). A common technique to deal with this “Curse” is called [“Principal Component Analysis”](https://en.wikipedia.org/wiki/Principal_component_analysis). It picks the hyper-plane in the high-dimensional space that best reflects the data and projects everything onto that. In doing so, it essentially combines a lot of dimensions into a few. These combinations can be hard to reason about though – e.g. when
classifying cars, assuming you reduced to one dimension, your “x-axis” might be a combination of length, horse-powers, the hue of its varnish and many more. Selecting the most important dimensions and only using these might lead to more understandable behavior. Another wide-spread technique, that suffers from similar issues is the [kernel-trick](https://en.wikipedia.org/wiki/Kernel_method).

In the same vein, _non-human-readable encoding_ can be a problem. In algorithms that process natural language often sentences are represented by lists of which word occurs how often in them (the [“Bag of Words”-model](https://en.wikipedia.org/wiki/Bag-of-words_model)). This completely ignores the order of words and makes it work unlike how humans would comprehend sentences. Even harder to grasp, is what happens inside of [artificial neural
networks](https://en.wikipedia.org/wiki/Artificial_neural_network) that can work remotely similar to our own brain. Knowledge inside these is represented distributedly, i.e. no single neuron alone is responsible for recognizing a specific thing, but rather all of them exert varying influence every single time. To understand what’s going on, you would have to consider all of them at the same time. Visualization can help here to a very small degree (e.g. [for convolutional
networks](http://cs231n.github.io/understanding-cnn/)) but can’t even be applied in all domains.

For these reasons Jenna Burrel&nbsp;[ref:Opc] advises avoiding machine learning for critical applications. In some cases learning/encoding logic rules – using so-called “expert systems” – might be an alternative as long as the number of rules leading to any decision stays manageable.

## Facit

These are some some of the challenges you might run into when studying algorithms. [The next post](/article/methods-for-studying-algorithms/) delves into the hows.

## References

- <a id="ref:HtS" href="#ref:HtS">[HtS]:</a> [“How to Study Algorithms: Challenges and Methods”](https://algocracy.wordpress.com/2016/03/14/how-to-study-algorithms-challenges-and-methods/), [alternative link](http://hplusmagazine.com/2015/07/28/how-to-study-algorithms-challenges-and-methods/) [blog article]
- <a id="ref:Opc" href="#ref:Opc">[Opc]:</a> Burrell, Jenna. 2015. [“How the Machine ‘Thinks:’ Understanding Opacity in Machine Learning Algorithms.”](http://bds.sagepub.com/content/3/1/2053951715622512) [18 pages]
- <a id="ref:WwM" href="#ref:WwM">[WwM]</a>: Lee, Min Kyung, Kusbit, Daniel, Metsky, Evan and Dabbish, Laura. 2015. [“Working with Machines: The Impact of Algorithmic and Data-­Driven Management on Human Workers”](http://dl.acm.org/citation.cfm?id=2702548) CHI ’15 Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems: 1603-­1612 [10 pages from "Algorithmic Culture"-section]
