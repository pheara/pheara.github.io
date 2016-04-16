/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {__webpack_require__(1);
	var riot = __webpack_require__(2);
	var actions = new (__webpack_require__(8))();
	var utils = __webpack_require__(6)

	SocialCapitalStore = __webpack_require__(12);
	ProfitStore = __webpack_require__(13);
	UsStateStore = __webpack_require__(10);

	global.window.riot = riot; //TODO deletme; for testing
	//require('../node_modules/leaflet/dist/leaflet.css');
	//require('../node_modules/riot/riot+compiler.js');


	var oldMs = Date.now();
	var tick = setInterval(function() {
	    var newMs = Date.now();
	    var deltaSeconds = (newMs - oldMs) / 1000.0;
	    oldMs = newMs;

	    actions.trigger(actions.TICK, deltaSeconds);
	}, 200);

	riot.mount('*');

	riot.update(); // TODO this should not be necessary, but the markers won't appear otherwise

	// <START-TEXT> -----------------------------------------------
	    alert("You're playing a surveillance tycoon. Due to good contacts to the ruling parties and their willingness to increase surveillance, you can sell your products (CCTV, IMSI-catchers,...) to them and make good profit. The only hindrance to you and your elected buddies is a reluctant populace (expressed by the bar in the top right) that might sanction your network on the next voting day. Make sure not to push your products to strongly or they might revolt (red marker). Good luck and good profit!");
	// </START-TEXT> -----------------------------------------------

	// <END-OF-GAME-CHECK> ----------------------------------------
	var scs = new SocialCapitalStore();
	var ps = new ProfitStore();
	var stateStore = new UsStateStore();
	scs.on('change', function(){
	    if(scs.get() >= 0.98) {
	        alert(
	            "Your advances were so overt and aggravating that the " +
	            "populace actually got off their bums to sanction you " +
	            "and your elected buddies with their votes at the urn. You probably " +
	            "should have minded their protests. Still, you have " +
	            "managed to extract a fine profit of: \n\n" + utils.numberWithCommas(ps.get()) + "$");
	        global.window.document.location.reload();
	    }
	});

	coverAchievmentEarned = false;
	firstLv1AchievmentEarned = false;
	stateStore.on('change', function(){
	    console.log("Checking for victory - min: " +
	        stateStore.minCctvLevel());
	    console.log("Checking for victory - max: " +
	        stateStore.maxCctvLevel());
	    if (stateStore.maxCctvLevel() == 1 && !firstLv1AchievmentEarned) {
	        firstLv1AchievmentEarned = true;
	        alert("Your first surveillance-sytem! The first-step of your corporate empire.");
	    }
	    if (stateStore.minCctvLevel() >= 1 && !coverAchievmentEarned) { //TODO should be higher
	        coverAchievmentEarned = true;
	        alert("You've covered the US with your surveillance systems! (" +
	            "And made fine profit while doing so: " +
	            utils.numberWithCommas(ps.get()) + "$)");
	    }
	});
	// </END-OF-GAME-CHECK> ----------------------------------------

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {__webpack_require__(3);
	__webpack_require__(11);
	var actions = new (__webpack_require__(8))();
	ProfitStore = __webpack_require__(13)
	var utils = __webpack_require__(6)

	riot.tag('app', '<social-capital-meter></social-capital-meter> <br><br><br> <h1>Profit so far: <b>{ utils.numberWithCommas(profit) }$</b></h1> <leaflet class="screen-sized"></leaflet>', function(opts) {

	    var profitStore = new ProfitStore();
	    this.profit = 0;
	    profitStore.on("change", function(){
	      this.update({profit: Math.floor(profitStore.get())});
	    }.bind(this));

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* Riot v2.2.1, @license MIT, (c) 2015 Muut Inc. + contributors */

	;(function(window) {
	  'use strict'
	  var riot = { version: 'v2.2.1', settings: {} }

	  // This globals 'const' helps code size reduction

	  // for typeof == '' comparisons
	  var T_STRING = 'string'
	  var T_OBJECT = 'object'

	  // for IE8 and rest of the world
	  var isArray = Array.isArray || (function () {
	    var _ts = Object.prototype.toString
	    return function (v) { return _ts.call(v) === '[object Array]' }
	  })()

	  // Version# for IE 8-11, 0 for others
	  var ieVersion = (function (win) {
	    return (win && win.document || {}).documentMode | 0
	  })(window)

	riot.observable = function(el) {

	  el = el || {}

	  var callbacks = {},
	      _id = 0

	  el.on = function(events, fn) {
	    if (isFunction(fn)) {
	      fn._id = typeof fn._id == 'undefined' ? _id++ : fn._id

	      events.replace(/\S+/g, function(name, pos) {
	        (callbacks[name] = callbacks[name] || []).push(fn)
	        fn.typed = pos > 0
	      })
	    }
	    return el
	  }

	  el.off = function(events, fn) {
	    if (events == '*') callbacks = {}
	    else {
	      events.replace(/\S+/g, function(name) {
	        if (fn) {
	          var arr = callbacks[name]
	          for (var i = 0, cb; (cb = arr && arr[i]); ++i) {
	            if (cb._id == fn._id) { arr.splice(i, 1); i-- }
	          }
	        } else {
	          callbacks[name] = []
	        }
	      })
	    }
	    return el
	  }

	  // only single event supported
	  el.one = function(name, fn) {
	    function on() {
	      el.off(name, on)
	      fn.apply(el, arguments)
	    }
	    return el.on(name, on)
	  }

	  el.trigger = function(name) {
	    var args = [].slice.call(arguments, 1),
	        fns = callbacks[name] || []

	    for (var i = 0, fn; (fn = fns[i]); ++i) {
	      if (!fn.busy) {
	        fn.busy = 1
	        fn.apply(el, fn.typed ? [name].concat(args) : args)
	        if (fns[i] !== fn) { i-- }
	        fn.busy = 0
	      }
	    }

	    if (callbacks.all && name != 'all') {
	      el.trigger.apply(el, ['all', name].concat(args))
	    }

	    return el
	  }

	  return el

	}
	riot.mixin = (function() {
	  var mixins = {}

	  return function(name, mixin) {
	    if (!mixin) return mixins[name]
	    mixins[name] = mixin
	  }

	})()

	;(function(riot, evt, window) {

	  // browsers only
	  if (!window) return

	  var loc = window.location,
	      fns = riot.observable(),
	      win = window,
	      started = false,
	      current

	  function hash() {
	    return loc.href.split('#')[1] || ''
	  }

	  function parser(path) {
	    return path.split('/')
	  }

	  function emit(path) {
	    if (path.type) path = hash()

	    if (path != current) {
	      fns.trigger.apply(null, ['H'].concat(parser(path)))
	      current = path
	    }
	  }

	  var r = riot.route = function(arg) {
	    // string
	    if (arg[0]) {
	      loc.hash = arg
	      emit(arg)

	    // function
	    } else {
	      fns.on('H', arg)
	    }
	  }

	  r.exec = function(fn) {
	    fn.apply(null, parser(hash()))
	  }

	  r.parser = function(fn) {
	    parser = fn
	  }

	  r.stop = function () {
	    if (!started) return
	    win.removeEventListener ? win.removeEventListener(evt, emit, false) : win.detachEvent('on' + evt, emit)
	    fns.off('*')
	    started = false
	  }

	  r.start = function () {
	    if (started) return
	    win.addEventListener ? win.addEventListener(evt, emit, false) : win.attachEvent('on' + evt, emit)
	    started = true
	  }

	  // autostart the router
	  r.start()

	})(riot, 'hashchange', window)
	/*

	//// How it works?


	Three ways:

	1. Expressions: tmpl('{ value }', data).
	   Returns the result of evaluated expression as a raw object.

	2. Templates: tmpl('Hi { name } { surname }', data).
	   Returns a string with evaluated expressions.

	3. Filters: tmpl('{ show: !done, highlight: active }', data).
	   Returns a space separated list of trueish keys (mainly
	   used for setting html classes), e.g. "show highlight".


	// Template examples

	tmpl('{ title || "Untitled" }', data)
	tmpl('Results are { results ? "ready" : "loading" }', data)
	tmpl('Today is { new Date() }', data)
	tmpl('{ message.length > 140 && "Message is too long" }', data)
	tmpl('This item got { Math.round(rating) } stars', data)
	tmpl('<h1>{ title }</h1>{ body }', data)


	// Falsy expressions in templates

	In templates (as opposed to single expressions) all falsy values
	except zero (undefined/null/false) will default to empty string:

	tmpl('{ undefined } - { false } - { null } - { 0 }', {})
	// will return: " - - - 0"

	*/


	var brackets = (function(orig) {

	  var cachedBrackets,
	      r,
	      b,
	      re = /[{}]/g

	  return function(x) {

	    // make sure we use the current setting
	    var s = riot.settings.brackets || orig

	    // recreate cached vars if needed
	    if (cachedBrackets !== s) {
	      cachedBrackets = s
	      b = s.split(' ')
	      r = b.map(function (e) { return e.replace(/(?=.)/g, '\\') })
	    }

	    // if regexp given, rewrite it with current brackets (only if differ from default)
	    return x instanceof RegExp ? (
	        s === orig ? x :
	        new RegExp(x.source.replace(re, function(b) { return r[~~(b === '}')] }), x.global ? 'g' : '')
	      ) :
	      // else, get specific bracket
	      b[x]
	  }
	})('{ }')


	var tmpl = (function() {

	  var cache = {},
	      reVars = /(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi
	              // [ 1               ][ 2  ][ 3 ][ 4                                                                                  ][ 5       ]
	              // find variable names:
	              // 1. skip quoted strings and regexps: "a b", 'a b', 'a \'b\'', /a b/
	              // 2. skip object properties: .name
	              // 3. skip object literals: name:
	              // 4. skip javascript keywords
	              // 5. match var name

	  // build a template (or get it from cache), render with data
	  return function(str, data) {
	    return str && (cache[str] = cache[str] || tmpl(str))(data)
	  }


	  // create a template instance

	  function tmpl(s, p) {

	    // default template string to {}
	    s = (s || (brackets(0) + brackets(1)))

	      // temporarily convert \{ and \} to a non-character
	      .replace(brackets(/\\{/g), '\uFFF0')
	      .replace(brackets(/\\}/g), '\uFFF1')

	    // split string to expression and non-expresion parts
	    p = split(s, extract(s, brackets(/{/), brackets(/}/)))

	    return new Function('d', 'return ' + (

	      // is it a single expression or a template? i.e. {x} or <b>{x}</b>
	      !p[0] && !p[2] && !p[3]

	        // if expression, evaluate it
	        ? expr(p[1])

	        // if template, evaluate all expressions in it
	        : '[' + p.map(function(s, i) {

	            // is it an expression or a string (every second part is an expression)
	          return i % 2

	              // evaluate the expressions
	              ? expr(s, true)

	              // process string parts of the template:
	              : '"' + s

	                  // preserve new lines
	                  .replace(/\n/g, '\\n')

	                  // escape quotes
	                  .replace(/"/g, '\\"')

	                + '"'

	        }).join(',') + '].join("")'
	      )

	      // bring escaped { and } back
	      .replace(/\uFFF0/g, brackets(0))
	      .replace(/\uFFF1/g, brackets(1))

	    + ';')

	  }


	  // parse { ... } expression

	  function expr(s, n) {
	    s = s

	      // convert new lines to spaces
	      .replace(/\n/g, ' ')

	      // trim whitespace, brackets, strip comments
	      .replace(brackets(/^[{ ]+|[ }]+$|\/\*.+?\*\//g), '')

	    // is it an object literal? i.e. { key : value }
	    return /^\s*[\w- "']+ *:/.test(s)

	      // if object literal, return trueish keys
	      // e.g.: { show: isOpen(), done: item.done } -> "show done"
	      ? '[' +

	          // extract key:val pairs, ignoring any nested objects
	          extract(s,

	              // name part: name:, "name":, 'name':, name :
	              /["' ]*[\w- ]+["' ]*:/,

	              // expression part: everything upto a comma followed by a name (see above) or end of line
	              /,(?=["' ]*[\w- ]+["' ]*:)|}|$/
	              ).map(function(pair) {

	                // get key, val parts
	                return pair.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/, function(_, k, v) {

	                  // wrap all conditional parts to ignore errors
	                  return v.replace(/[^&|=!><]+/g, wrap) + '?"' + k + '":"",'

	                })

	              }).join('')

	        + '].join(" ").trim()'

	      // if js expression, evaluate as javascript
	      : wrap(s, n)

	  }


	  // execute js w/o breaking on errors or undefined vars

	  function wrap(s, nonull) {
	    s = s.trim()
	    return !s ? '' : '(function(v){try{v='

	        // prefix vars (name => data.name)
	        + (s.replace(reVars, function(s, _, v) { return v ? '(d.'+v+'===undefined?'+(typeof window == 'undefined' ? 'global.' : 'window.')+v+':d.'+v+')' : s })

	          // break the expression if its empty (resulting in undefined value)
	          || 'x')
	      + '}catch(e){'
	      + '}finally{return '

	        // default to empty string for falsy values except zero
	        + (nonull === true ? '!v&&v!==0?"":v' : 'v')

	      + '}}).call(d)'
	  }


	  // split string by an array of substrings

	  function split(str, substrings) {
	    var parts = []
	    substrings.map(function(sub, i) {

	      // push matched expression and part before it
	      i = str.indexOf(sub)
	      parts.push(str.slice(0, i), sub)
	      str = str.slice(i + sub.length)
	    })

	    // push the remaining part
	    return parts.concat(str)
	  }


	  // match strings between opening and closing regexp, skipping any inner/nested matches

	  function extract(str, open, close) {

	    var start,
	        level = 0,
	        matches = [],
	        re = new RegExp('('+open.source+')|('+close.source+')', 'g')

	    str.replace(re, function(_, open, close, pos) {

	      // if outer inner bracket, mark position
	      if (!level && open) start = pos

	      // in(de)crease bracket level
	      level += open ? 1 : -1

	      // if outer closing bracket, grab the match
	      if (!level && close != null) matches.push(str.slice(start, pos+close.length))

	    })

	    return matches
	  }

	})()

	// { key, i in items} -> { key, i, items }
	function loopKeys(expr) {
	  var b0 = brackets(0),
	      els = expr.slice(b0.length).match(/\s*(\S+?)\s*(?:,\s*(\S)+)?\s+in\s+(.+)/)
	  return els ? { key: els[1], pos: els[2], val: b0 + els[3] } : { val: expr }
	}

	function mkitem(expr, key, val) {
	  var item = {}
	  item[expr.key] = key
	  if (expr.pos) item[expr.pos] = val
	  return item
	}


	/* Beware: heavy stuff */
	function _each(dom, parent, expr) {

	  remAttr(dom, 'each')

	  var template = dom.outerHTML,
	      root = dom.parentNode,
	      placeholder = document.createComment('riot placeholder'),
	      tags = [],
	      child = getTag(dom),
	      checksum

	  root.insertBefore(placeholder, dom)

	  expr = loopKeys(expr)

	  // clean template code
	  parent
	    .one('premount', function () {
	      if (root.stub) root = parent.root
	      // remove the original DOM node
	      dom.parentNode.removeChild(dom)
	    })
	    .on('update', function () {
	      var items = tmpl(expr.val, parent),
	          test

	      // object loop. any changes cause full redraw
	      if (!isArray(items)) {
	        test = checksum
	        checksum = items ? JSON.stringify(items) : ''
	        if (checksum === test) return

	        items = !items ? [] :
	          Object.keys(items).map(function (key) {
	            return mkitem(expr, key, items[key])
	          })
	      }

	      var frag = document.createDocumentFragment(),
	          i = tags.length,
	          j = items.length

	      // unmount leftover items
	      while (i > j) tags[--i].unmount()
	      tags.length = j

	      test = !checksum && !!expr.key
	      for (i = 0; i < j; ++i) {
	        var _item = test ? mkitem(expr, items[i], i) : items[i]

	        if (!tags[i]) {
	          // mount new
	          (tags[i] = new Tag({ tmpl: template }, {
	              parent: parent,
	              isLoop: true,
	              root: root,
	              item: _item
	            })
	          ).mount()

	          frag.appendChild(tags[i].root)
	        }
	        tags[i]._item = _item
	        tags[i].update(_item)
	      }

	      root.insertBefore(frag, placeholder)

	      if (child) parent.tags[getTagName(dom)] = tags

	    }).one('updated', function() {
	      var keys = Object.keys(parent)// only set new values
	      walk(root, function(node) {
	        // only set element node and not isLoop
	        if (node.nodeType == 1 && !node.isLoop && !node._looped) {
	          node._visited = false // reset _visited for loop node
	          node._looped = true // avoid set multiple each
	          setNamed(node, parent, keys)
	        }
	      })
	    })

	}


	function parseNamedElements(root, parent, childTags) {

	  walk(root, function(dom) {
	    if (dom.nodeType == 1) {
	      dom.isLoop = (dom.parentNode && dom.parentNode.isLoop || dom.getAttribute('each')) ? 1 : 0

	      // custom child tag
	      var child = getTag(dom)

	      if (child && !dom.isLoop) {
	        var tag = new Tag(child, { root: dom, parent: parent }, dom.innerHTML),
	            tagName = getTagName(dom),
	            ptag = parent,
	            cachedTag

	        while (!getTag(ptag.root)) {
	          if (!ptag.parent) break
	          ptag = ptag.parent
	        }

	        // fix for the parent attribute in the looped elements
	        tag.parent = ptag

	        cachedTag = ptag.tags[tagName]

	        // if there are multiple children tags having the same name
	        if (cachedTag) {
	          // if the parent tags property is not yet an array
	          // create it adding the first cached tag
	          if (!isArray(cachedTag))
	            ptag.tags[tagName] = [cachedTag]
	          // add the new nested tag to the array
	          ptag.tags[tagName].push(tag)
	        } else {
	          ptag.tags[tagName] = tag
	        }

	        // empty the child node once we got its template
	        // to avoid that its children get compiled multiple times
	        dom.innerHTML = ''
	        childTags.push(tag)
	      }

	      if (!dom.isLoop)
	        setNamed(dom, parent, [])
	    }

	  })

	}

	function parseExpressions(root, tag, expressions) {

	  function addExpr(dom, val, extra) {
	    if (val.indexOf(brackets(0)) >= 0) {
	      var expr = { dom: dom, expr: val }
	      expressions.push(extend(expr, extra))
	    }
	  }

	  walk(root, function(dom) {
	    var type = dom.nodeType

	    // text node
	    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
	    if (type != 1) return

	    /* element */

	    // loop
	    var attr = dom.getAttribute('each')

	    if (attr) { _each(dom, tag, attr); return false }

	    // attribute expressions
	    each(dom.attributes, function(attr) {
	      var name = attr.name,
	        bool = name.split('__')[1]

	      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
	      if (bool) { remAttr(dom, name); return false }

	    })

	    // skip custom tags
	    if (getTag(dom)) return false

	  })

	}
	function Tag(impl, conf, innerHTML) {

	  var self = riot.observable(this),
	      opts = inherit(conf.opts) || {},
	      dom = mkdom(impl.tmpl),
	      parent = conf.parent,
	      isLoop = conf.isLoop,
	      item = conf.item,
	      expressions = [],
	      childTags = [],
	      root = conf.root,
	      fn = impl.fn,
	      tagName = root.tagName.toLowerCase(),
	      attr = {},
	      loopDom,
	      TAG_ATTRIBUTES = /([\w\-]+)\s?=\s?['"]([^'"]+)["']/gim


	  if (fn && root._tag) {
	    root._tag.unmount(true)
	  }

	  // not yet mounted
	  this.isMounted = false

	  if (impl.attrs) {
	    var attrs = impl.attrs.match(TAG_ATTRIBUTES)

	    each(attrs, function(a) {
	      var kv = a.split(/\s?=\s?/)
	      root.setAttribute(kv[0], kv[1].replace(/['"]/g, ''))
	    })

	  }

	  // keep a reference to the tag just created
	  // so we will be able to mount this tag multiple times
	  root._tag = this

	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  this._id = fastAbs(~~(new Date().getTime() * Math.random()))

	  extend(this, { parent: parent, root: root, opts: opts, tags: {} }, item)

	  // grab attributes
	  each(root.attributes, function(el) {
	    var val = el.value
	    // remember attributes with expressions only
	    if (brackets(/\{.*\}/).test(val)) attr[el.name] = val
	  })

	  if (dom.innerHTML && !/select|select|optgroup|tbody|tr/.test(tagName))
	    // replace all the yield tags with the tag inner html
	    dom.innerHTML = replaceYield(dom.innerHTML, innerHTML)

	  // options
	  function updateOpts() {
	    // update opts from current DOM attributes
	    each(root.attributes, function(el) {
	      opts[el.name] = tmpl(el.value, parent || self)
	    })
	    // recover those with expressions
	    each(Object.keys(attr), function(name) {
	      opts[name] = tmpl(attr[name], parent || self)
	    })
	  }

	  this.update = function(data) {
	    extend(self, data)
	    updateOpts()
	    self.trigger('update', data)
	    update(expressions, self, data)
	    self.trigger('updated')
	  }

	  this.mixin = function() {
	    each(arguments, function(mix) {
	      mix = typeof mix == 'string' ? riot.mixin(mix) : mix
	      each(Object.keys(mix), function(key) {
	        // bind methods to self
	        if (key != 'init')
	          self[key] = typeof mix[key] == 'function' ? mix[key].bind(self) : mix[key]
	      })
	      // init method will be called automatically
	      if (mix.init) mix.init.bind(self)()
	    })
	  }

	  this.mount = function() {

	    updateOpts()

	    // initialiation
	    fn && fn.call(self, opts)

	    toggle(true)


	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions(dom, self, expressions)

	    if (!self.parent) self.update()

	    // internal use only, fixes #403
	    self.trigger('premount')

	    if (isLoop) {
	      // update the root attribute for the looped elements
	      self.root = root = loopDom = dom.firstChild
	    } else {
	      while (dom.firstChild) root.appendChild(dom.firstChild)
	      if (root.stub) self.root = root = parent.root
	    }
	    // if it's not a child tag we can trigger its mount event
	    if (!self.parent || self.parent.isMounted) {
	      self.isMounted = true
	      self.trigger('mount')
	    }
	    // otherwise we need to wait that the parent event gets triggered
	    else self.parent.one('mount', function() {
	      // avoid to trigger the `mount` event for the tags
	      // not visible included in an if statement
	      if (!isInStub(self.root)) {
	        self.parent.isMounted = self.isMounted = true
	        self.trigger('mount')
	      }
	    })
	  }


	  this.unmount = function(keepRootTag) {
	    var el = loopDom || root,
	        p = el.parentNode

	    if (p) {

	      if (parent) {
	        // remove this tag from the parent tags object
	        // if there are multiple nested tags with same name..
	        // remove this element form the array
	        if (isArray(parent.tags[tagName])) {
	          each(parent.tags[tagName], function(tag, i) {
	            if (tag._id == self._id)
	              parent.tags[tagName].splice(i, 1)
	          })
	        } else
	          // otherwise just delete the tag instance
	          parent.tags[tagName] = undefined
	      } else {
	        while (el.firstChild) el.removeChild(el.firstChild)
	      }

	      if (!keepRootTag)
	        p.removeChild(el)

	    }


	    self.trigger('unmount')
	    toggle()
	    self.off('*')
	    // somehow ie8 does not like `delete root._tag`
	    root._tag = null

	  }

	  function toggle(isMount) {

	    // mount/unmount children
	    each(childTags, function(child) { child[isMount ? 'mount' : 'unmount']() })

	    // listen/unlisten parent (events flow one way from parent to children)
	    if (parent) {
	      var evt = isMount ? 'on' : 'off'

	      // the loop tags will be always in sync with the parent automatically
	      if (isLoop)
	        parent[evt]('unmount', self.unmount)
	      else
	        parent[evt]('update', self.update)[evt]('unmount', self.unmount)
	    }
	  }

	  // named elements available for fn
	  parseNamedElements(dom, this, childTags)


	}

	function setEventHandler(name, handler, dom, tag, item) {

	  dom[name] = function(e) {

	    // cross browser event fix
	    e = e || window.event

	    if (!e.which) e.which = e.charCode || e.keyCode
	    if (!e.target) e.target = e.srcElement

	    // ignore error on some browsers
	    try {
	      e.currentTarget = dom
	    } catch (ignored) { '' }

	    e.item = tag._item ? tag._item : item

	    // prevent default behaviour (by default)
	    if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	      e.preventDefault && e.preventDefault()
	      e.returnValue = false
	    }

	    if (!e.preventUpdate) {
	      var el = item ? tag.parent : tag
	      el.update()
	    }

	  }

	}

	// used by if- attribute
	function insertTo(root, node, before) {
	  if (root) {
	    root.insertBefore(before, node)
	    root.removeChild(node)
	  }
	}

	// item = currently looped item
	function update(expressions, tag, item) {

	  each(expressions, function(expr, i) {

	    var dom = expr.dom,
	        attrName = expr.attr,
	        value = tmpl(expr.expr, tag),
	        parent = expr.dom.parentNode

	    if (value == null) value = ''

	    // leave out riot- prefixes from strings inside textarea
	    if (parent && parent.tagName == 'TEXTAREA') value = value.replace(/riot-/g, '')

	    // no change
	    if (expr.value === value) return
	    expr.value = value

	    // text node
	    if (!attrName) return dom.nodeValue = value.toString()

	    // remove original attribute
	    remAttr(dom, attrName)

	    // event handler
	    if (typeof value == 'function') {
	      setEventHandler(attrName, value, dom, tag, item)

	    // if- conditional
	    } else if (attrName == 'if') {
	      var stub = expr.stub

	      // add to DOM
	      if (value) {
	        if (stub) {
	          insertTo(stub.parentNode, stub, dom)
	          dom.inStub = false
	          // avoid to trigger the mount event if the tags is not visible yet
	          // maybe we can optimize this avoiding to mount the tag at all
	          if (!isInStub(dom)) {
	            walk(dom, function(el) {
	              if (el._tag && !el._tag.isMounted) el._tag.isMounted = !!el._tag.trigger('mount')
	            })
	          }
	        }
	      // remove from DOM
	      } else {
	        stub = expr.stub = stub || document.createTextNode('')
	        insertTo(dom.parentNode, dom, stub)
	        dom.inStub = true
	      }
	    // show / hide
	    } else if (/^(show|hide)$/.test(attrName)) {
	      if (attrName == 'hide') value = !value
	      dom.style.display = value ? '' : 'none'

	    // field value
	    } else if (attrName == 'value') {
	      dom.value = value

	    // <img src="{ expr }">
	    } else if (attrName.slice(0, 5) == 'riot-' && attrName != 'riot-tag') {
	      attrName = attrName.slice(5)
	      value ? dom.setAttribute(attrName, value) : remAttr(dom, attrName)

	    } else {
	      if (expr.bool) {
	        dom[attrName] = value
	        if (!value) return
	        value = attrName
	      }

	      if (typeof value != 'object') dom.setAttribute(attrName, value)

	    }

	  })

	}

	function each(els, fn) {
	  for (var i = 0, len = (els || []).length, el; i < len; i++) {
	    el = els[i]
	    // return false -> remove current item during loop
	    if (el != null && fn(el, i) === false) i--
	  }
	  return els
	}

	function isFunction(v) {
	  return typeof v === 'function' || false   // avoid IE problems
	}

	function remAttr(dom, name) {
	  dom.removeAttribute(name)
	}

	function fastAbs(nr) {
	  return (nr ^ (nr >> 31)) - (nr >> 31)
	}

	function getTagName(dom) {
	  var child = getTag(dom),
	    namedTag = dom.getAttribute('name'),
	    tagName = namedTag && namedTag.indexOf(brackets(0)) < 0 ? namedTag : child.name

	  return tagName
	}

	function extend(src) {
	  var obj, args = arguments
	  for (var i = 1; i < args.length; ++i) {
	    if ((obj = args[i])) {
	      for (var key in obj) {      // eslint-disable-line guard-for-in
	        src[key] = obj[key]
	      }
	    }
	  }
	  return src
	}

	function mkdom(template) {
	  var checkie = ieVersion && ieVersion < 10,
	      matches = /^\s*<([\w-]+)/.exec(template),
	      tagName = matches ? matches[1].toLowerCase() : '',
	      rootTag = (tagName === 'th' || tagName === 'td') ? 'tr' :
	                (tagName === 'tr' ? 'tbody' : 'div'),
	      el = mkEl(rootTag)

	  el.stub = true

	  if (checkie) {
	    if (tagName === 'optgroup')
	      optgroupInnerHTML(el, template)
	    else if (tagName === 'option')
	      optionInnerHTML(el, template)
	    else if (rootTag !== 'div')
	      tbodyInnerHTML(el, template, tagName)
	    else
	      checkie = 0
	  }
	  if (!checkie) el.innerHTML = template

	  return el
	}

	function walk(dom, fn) {
	  if (dom) {
	    if (fn(dom) === false) walk(dom.nextSibling, fn)
	    else {
	      dom = dom.firstChild

	      while (dom) {
	        walk(dom, fn)
	        dom = dom.nextSibling
	      }
	    }
	  }
	}

	function isInStub(dom) {
	  while (dom) {
	    if (dom.inStub) return true
	    dom = dom.parentNode
	  }
	  return false
	}

	function mkEl(name) {
	  return document.createElement(name)
	}

	function replaceYield (tmpl, innerHTML) {
	  return tmpl.replace(/<(yield)\/?>(<\/\1>)?/gim, innerHTML || '')
	}

	function $$(selector, ctx) {
	  return (ctx || document).querySelectorAll(selector)
	}

	function inherit(parent) {
	  function Child() {}
	  Child.prototype = parent
	  return new Child()
	}

	function setNamed(dom, parent, keys) {
	  each(dom.attributes, function(attr) {
	    if (dom._visited) return
	    if (attr.name === 'id' || attr.name === 'name') {
	      dom._visited = true
	      var p, v = attr.value
	      if (~keys.indexOf(v)) return

	      p = parent[v]
	      if (!p)
	        parent[v] = dom
	      else
	        isArray(p) ? p.push(dom) : (parent[v] = [p, dom])
	    }
	  })
	}
	/**
	 *
	 * Hacks needed for the old internet explorer versions [lower than IE10]
	 *
	 */

	function tbodyInnerHTML(el, html, tagName) {
	  var div = mkEl('div'),
	      loops = /td|th/.test(tagName) ? 3 : 2,
	      child

	  div.innerHTML = '<table>' + html + '</table>'
	  child = div.firstChild

	  while (loops--) {
	    child = child.firstChild
	  }

	  el.appendChild(child)

	}

	function optionInnerHTML(el, html) {
	  var opt = mkEl('option'),
	      valRegx = /value=[\"'](.+?)[\"']/,
	      selRegx = /selected=[\"'](.+?)[\"']/,
	      eachRegx = /each=[\"'](.+?)[\"']/,
	      ifRegx = /if=[\"'](.+?)[\"']/,
	      innerRegx = />([^<]*)</,
	      valuesMatch = html.match(valRegx),
	      selectedMatch = html.match(selRegx),
	      innerValue = html.match(innerRegx),
	      eachMatch = html.match(eachRegx),
	      ifMatch = html.match(ifRegx)

	  if (innerValue) {
	    opt.innerHTML = innerValue[1]
	  } else {
	    opt.innerHTML = html
	  }

	  if (valuesMatch) {
	    opt.value = valuesMatch[1]
	  }

	  if (selectedMatch) {
	    opt.setAttribute('riot-selected', selectedMatch[1])
	  }

	  if (eachMatch) {
	    opt.setAttribute('each', eachMatch[1])
	  }

	  if (ifMatch) {
	    opt.setAttribute('if', ifMatch[1])
	  }

	  el.appendChild(opt)
	}

	function optgroupInnerHTML(el, html) {
	  var opt = mkEl('optgroup'),
	      labelRegx = /label=[\"'](.+?)[\"']/,
	      elementRegx = /^<([^>]*)>/,
	      tagRegx = /^<([^ \>]*)/,
	      labelMatch = html.match(labelRegx),
	      elementMatch = html.match(elementRegx),
	      tagMatch = html.match(tagRegx),
	      innerContent = html

	  if (elementMatch) {
	    var options = html.slice(elementMatch[1].length+2, -tagMatch[1].length-3).trim()
	    innerContent = options
	  }

	  if (labelMatch) {
	    opt.setAttribute('riot-label', labelMatch[1])
	  }

	  if (innerContent) {
	    var innerOpt = mkEl('div')

	    optionInnerHTML(innerOpt, innerContent)

	    opt.appendChild(innerOpt.firstChild)
	  }

	  el.appendChild(opt)
	}

	/*
	 Virtual dom is an array of custom tags on the document.
	 Updates and unmounts propagate downwards from parent to children.
	*/

	var virtualDom = [],
	    tagImpl = {},
	    styleNode

	var RIOT_TAG = 'riot-tag'

	function getTag(dom) {
	  return tagImpl[dom.getAttribute(RIOT_TAG) || dom.tagName.toLowerCase()]
	}

	function injectStyle(css) {

	  styleNode = styleNode || mkEl('style')

	  if (!document.head) return

	  if (styleNode.styleSheet)
	    styleNode.styleSheet.cssText += css
	  else
	    styleNode.innerHTML += css

	  if (!styleNode._rendered)
	    if (styleNode.styleSheet) {
	      document.body.appendChild(styleNode)
	    } else {
	      var rs = $$('style[type=riot]')[0]
	      if (rs) {
	        rs.parentNode.insertBefore(styleNode, rs)
	        rs.parentNode.removeChild(rs)
	      } else {
	        document.head.appendChild(styleNode)
	      }
	    }

	  styleNode._rendered = true

	}

	function mountTo(root, tagName, opts) {
	  var tag = tagImpl[tagName],
	      // cache the inner HTML to fix #855
	      innerHTML = root._innerHTML = root._innerHTML || root.innerHTML

	  // clear the inner html
	  root.innerHTML = ''

	  if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML)

	  if (tag && tag.mount) {
	    tag.mount()
	    virtualDom.push(tag)
	    return tag.on('unmount', function() {
	      virtualDom.splice(virtualDom.indexOf(tag), 1)
	    })
	  }

	}

	riot.tag = function(name, html, css, attrs, fn) {
	  if (isFunction(attrs)) {
	    fn = attrs
	    if (/^[\w\-]+\s?=/.test(css)) {
	      attrs = css
	      css = ''
	    } else attrs = ''
	  }
	  if (css) {
	    if (isFunction(css)) fn = css
	    else injectStyle(css)
	  }
	  tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
	  return name
	}

	riot.mount = function(selector, tagName, opts) {

	  var els,
	      allTags,
	      tags = []

	  // helper functions

	  function addRiotTags(arr) {
	    var list = ''
	    each(arr, function (e) {
	      list += ', *[riot-tag="'+ e.trim() + '"]'
	    })
	    return list
	  }

	  function selectAllTags() {
	    var keys = Object.keys(tagImpl)
	    return keys + addRiotTags(keys)
	  }

	  function pushTags(root) {
	    if (root.tagName) {
	      if (tagName && !root.getAttribute(RIOT_TAG))
	        root.setAttribute(RIOT_TAG, tagName)

	      var tag = mountTo(root,
	        tagName || root.getAttribute(RIOT_TAG) || root.tagName.toLowerCase(), opts)

	      if (tag) tags.push(tag)
	    }
	    else if (root.length) {
	      each(root, pushTags)   // assume nodeList
	    }
	  }

	  // ----- mount code -----

	  if (typeof tagName === T_OBJECT) {
	    opts = tagName
	    tagName = 0
	  }

	  // crawl the DOM to find the tag
	  if (typeof selector === T_STRING) {
	    if (selector === '*') {
	      // select all the tags registered
	      // and also the tags found with the riot-tag attribute set
	      selector = allTags = selectAllTags()
	    } else {
	      // or just the ones named like the selector
	      selector += addRiotTags(selector.split(','))
	    }
	    els = $$(selector)
	  }
	  else
	    // probably you have passed already a tag or a NodeList
	    els = selector

	  // select all the registered and mount them inside their root elements
	  if (tagName === '*') {
	    // get all custom tags
	    tagName = allTags || selectAllTags()
	    // if the root els it's just a single tag
	    if (els.tagName) {
	      els = $$(tagName, els)
	    } else {
	      // select all the children for all the different root elements
	      var nodeList = []
	      each(els, function (_el) {
	        nodeList.push($$(tagName, _el))
	      })
	      els = nodeList
	    }
	    // get rid of the tagName
	    tagName = 0
	  }

	  if (els.tagName)
	    pushTags(els)
	  else
	    each(els, pushTags)

	  return tags
	}

	// update everything
	riot.update = function() {
	  return each(virtualDom, function(tag) {
	    tag.update()
	  })
	}

	// @deprecated
	riot.mountTo = riot.mount


	  // share methods for other riot parts, e.g. compiler
	  riot.util = { brackets: brackets, tmpl: tmpl }

	  // support CommonJS, AMD & browser
	  if (true)
	    module.exports = riot
	  else if (typeof define === 'function' && define.amd)
	    define(function() { return riot })
	  else
	    window.riot = riot

	})(typeof window != 'undefined' ? window : undefined);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {__webpack_require__(4);
	__webpack_require__(5);
	var utils = __webpack_require__(6);
	var statesData = __webpack_require__(7);
	var actions = new (__webpack_require__(8))();
	var personas = __webpack_require__(9);
	UsStateStore = __webpack_require__(10);

	riot.tag('leaflet', '<div id="mapcanvas" class="fill-parent"></div>', 'leaflet .info, [riot-tag="leaflet"] .info{ width: 20em; } leaflet .info, [riot-tag="leaflet"] .info{ padding: 6px 8px; font: 14px/16px Arial, Helvetica, sans-serif; background: white; background: rgba(255,255,255,0.8); box-shadow: 0 0 15px rgba(0,0,0,0.2); border-radius: 5px; } leaflet .info h4, [riot-tag="leaflet"] .info h4{ margin: 0 0 5px; color: #777; } leaflet .info .portrait, [riot-tag="leaflet"] .info .portrait{ width: 100px; } leaflet .legend, [riot-tag="leaflet"] .legend{ line-height: 18px; color: #555; } leaflet .legend i, [riot-tag="leaflet"] .legend i{ width: 18px; height: 18px; float: left; margin-right: 8px; opacity: 0.7; }', function(opts) {

	    //Webpack/Browserify fix:
	    L.Icon.Default.imagePath = '../node_modules/leaflet/dist/images/';

	    var usStateStore = new UsStateStore();
	    statesData = usStateStore.get();


	    function getColor(d) {
	        //colorscheme via http://colorbrewer2.org/
	        return d > 1000 ? '#800026' :
	               d > 500  ? '#BD0026' :
	               d > 200  ? '#E31A1C' :
	               d > 100  ? '#FC4E2A' :
	               d > 50   ? '#FD8D3C' :
	               d > 20   ? '#FEB24C' :
	               d > 10   ? '#FED976' :
	                          '#FFEDA0';
	    }
	    function getColorByCctvLevel(lvl) {
	      return lvl < 1 ? '#c6dbef' :
	             lvl < 2 ? '#9ecae1' :
	             lvl < 3 ? '#6baed6' :
	             lvl < 4 ? '#3182bd' :
	                       '#08519c';
	/*
	        return lvl < 1 ? '#d9d9d9' :
	               lvl < 2 ? '#bdbdbd' :
	               lvl < 3 ? '#969696' :
	               lvl < 4 ? '#636363' :
	                         '#252525';
	                         */
	    }

	    function styleState(feature) {
	        return {
	            fillColor: getColorByCctvLevel(feature.properties.cctvCount),
	            weight: 2,
	            opacity: 1,
	            color: 'white',
	            dashArray: '3',
	            fillOpacity: 0.8
	        };
	    }

	    var info;

	    var displayedState;
	    var activeLayer;
	    function highlightFeature(e) {
	        var layer = e.target;

	        layer.setStyle({
	            weight: 5,
	            dashArray: '',
	            fillOpacity: 0.7
	        });

	        if (!L.Browser.ie && !L.Browser.opera) {
	            layer.bringToFront();
	        }

	        displayedState = layer.feature.properties;
	        activeLayer = layer;
	        info.update(displayedState);
	    }

	    var geojson;
	    function resetHighlight(e) {
	        geojson.resetStyle(e.target);
	        displayedState = undefined;
	        activeLayer = undefined;
	        info.update(displayedState);
	    }

	    var sellToState = function(e) {
	        var state = e.target.feature.properties.name;
	        //info.update();
	        actions.trigger(actions.SELL_CCTV, state);
	    }

	    function onEachFeature(feature, layer) {
	        layer.on({
	            mouseover: highlightFeature,
	            mouseout: resetHighlight,
	            click: sellToState
	        });
	    }


	    usStateStore.on("change", function(){
	        activeLayer.setStyle({});
	        geojson.resetStyle(activeLayer);
	        info.update(displayedState);
	    });

	    this.on('mount', function() {

	        // based on tutorial: http://leafletjs.com/examples/choropleth.html

	        // create a map in the "mapcanvas" div, set thev iew to a given place and zoom
	        //US
	        this.map = L.map(this.mapcanvas)
	                   .setView([37.8, -96], 4);
	        //Vienna: this.map = L.map(this.mapcanvas).setView([48.19803, 16.35466], 13);



	        // add an OpenStreetMap tile layer
	        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	        }).addTo(this.map);

	        /*
	        //Alternative Layer
	        L.tileLayer('http://{s}.tiles.mapbox.com/{id}/{z}/{x}/{y}.png', {
	            id: 'examples.map-20v6611k',
	            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	        }).addTo(this.map);
	        */

	        geojson = L.geoJson(statesData, {
	            style: styleState,
	            onEachFeature: onEachFeature
	        }).addTo(this.map);

	        info = L.control();
	        info.onAdd = function (map) {
	            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	            this.update();
	            return this._div;
	        };


	        var personalStoryHTML = function(props){
	            var p = props.persona;
	            // TODO adapt by number of cctv cams in that country.
	            var level = (props.cctvCount < p.criticalCount)?
	                "baseSurveillance" : "totalSurveillance"

	            return '\
	                <p>In this state lives:</p> \
	                <h4>' + p.name + '</h4> \
	                <p>' + p.text[level] + '</p> \
	                <div><img class="portrait" src="./app/' + p.image + '"></img></div> '
	        }
	        var cctvHTML = function(props) {
	            return '<p>Surveillance-Level: <b>' + props.cctvCount + '</b></p>';
	        }

	        // method that we will use to update the control based on feature properties passed
	        info.update = function (props) {
	            this._div.innerHTML = (props ?
	                '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup><br/>' + cctvHTML(props) + personalStoryHTML(props)
	                : 'Hover over a state to view it. Click it to expand your empire.');

	            riot.mount('state-info-box');//TODO doesn't mount :|
	        };



	        info.addTo(this.map);

	        /*
	        var legend = L.control({position: 'bottomright'});

	        legend.onAdd = function (map) {

	            var div = L.DomUtil.create('div', 'info legend'),
	                grades = [0, 10, 20, 50, 100, 200, 500, 1000],
	                labels = [];

	            // loop through our density intervals and generate a label with a colored square for each interval
	            for (var i = 0; i < grades.length; i++) {
	                div.innerHTML +=
	                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
	                    grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	            }

	            return div;
	        };

	        legend.addTo(this.map);
	        */
	    });

	    /*
	    Discrete or continous map?

	    discrete:
	      * easier to click
	      * population density is discrete (e.g. per district)
	      * need to visualise camera-density somehow
	      * mouseover to ge stories of sample residents

	    continous:
	      * requires some sort of mechanic to spread out the placed items (e.g. bounding boxes / areas of effect)
	      * requires placing houses / interface elements that show stories of sample residents

	    */


	    var markers = [];
	    this.on('update', function() {
	      // TODO find a way to do react/riot style diffing (instead of readding a lot of markers)
	      // remove all current markers
	      for (var i = 0; i < markers.length; i++) {
	        this.map.removeLayer(markers[i]);
	      }
	      markers = [];

	      //TODO add markers here
	    });

	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	 Leaflet, a JavaScript library for mobile-friendly interactive maps. http://leafletjs.com
	 (c) 2010-2013, Vladimir Agafonkin
	 (c) 2010-2011, CloudMade
	*/
	(function (window, document, undefined) {
	var oldL = window.L,
	    L = {};

	L.version = '0.7.2';

	// define Leaflet for Node module pattern loaders, including Browserify
	if (typeof module === 'object' && typeof module.exports === 'object') {
		module.exports = L;

	// define Leaflet as an AMD module
	} else if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (L), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}

	// define Leaflet as a global L variable, saving the original L to restore later if needed

	L.noConflict = function () {
		window.L = oldL;
		return this;
	};

	window.L = L;


	/*
	 * L.Util contains various utility functions used throughout Leaflet code.
	 */

	L.Util = {
		extend: function (dest) { // (Object[, Object, ...]) ->
			var sources = Array.prototype.slice.call(arguments, 1),
			    i, j, len, src;

			for (j = 0, len = sources.length; j < len; j++) {
				src = sources[j] || {};
				for (i in src) {
					if (src.hasOwnProperty(i)) {
						dest[i] = src[i];
					}
				}
			}
			return dest;
		},

		bind: function (fn, obj) { // (Function, Object) -> Function
			var args = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
			return function () {
				return fn.apply(obj, args || arguments);
			};
		},

		stamp: (function () {
			var lastId = 0,
			    key = '_leaflet_id';
			return function (obj) {
				obj[key] = obj[key] || ++lastId;
				return obj[key];
			};
		}()),

		invokeEach: function (obj, method, context) {
			var i, args;

			if (typeof obj === 'object') {
				args = Array.prototype.slice.call(arguments, 3);

				for (i in obj) {
					method.apply(context, [i, obj[i]].concat(args));
				}
				return true;
			}

			return false;
		},

		limitExecByInterval: function (fn, time, context) {
			var lock, execOnUnlock;

			return function wrapperFn() {
				var args = arguments;

				if (lock) {
					execOnUnlock = true;
					return;
				}

				lock = true;

				setTimeout(function () {
					lock = false;

					if (execOnUnlock) {
						wrapperFn.apply(context, args);
						execOnUnlock = false;
					}
				}, time);

				fn.apply(context, args);
			};
		},

		falseFn: function () {
			return false;
		},

		formatNum: function (num, digits) {
			var pow = Math.pow(10, digits || 5);
			return Math.round(num * pow) / pow;
		},

		trim: function (str) {
			return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
		},

		splitWords: function (str) {
			return L.Util.trim(str).split(/\s+/);
		},

		setOptions: function (obj, options) {
			obj.options = L.extend({}, obj.options, options);
			return obj.options;
		},

		getParamString: function (obj, existingUrl, uppercase) {
			var params = [];
			for (var i in obj) {
				params.push(encodeURIComponent(uppercase ? i.toUpperCase() : i) + '=' + encodeURIComponent(obj[i]));
			}
			return ((!existingUrl || existingUrl.indexOf('?') === -1) ? '?' : '&') + params.join('&');
		},
		template: function (str, data) {
			return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
				var value = data[key];
				if (value === undefined) {
					throw new Error('No value provided for variable ' + str);
				} else if (typeof value === 'function') {
					value = value(data);
				}
				return value;
			});
		},

		isArray: Array.isArray || function (obj) {
			return (Object.prototype.toString.call(obj) === '[object Array]');
		},

		emptyImageUrl: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
	};

	(function () {

		// inspired by http://paulirish.com/2011/requestanimationframe-for-smart-animating/

		function getPrefixed(name) {
			var i, fn,
			    prefixes = ['webkit', 'moz', 'o', 'ms'];

			for (i = 0; i < prefixes.length && !fn; i++) {
				fn = window[prefixes[i] + name];
			}

			return fn;
		}

		var lastTime = 0;

		function timeoutDefer(fn) {
			var time = +new Date(),
			    timeToCall = Math.max(0, 16 - (time - lastTime));

			lastTime = time + timeToCall;
			return window.setTimeout(fn, timeToCall);
		}

		var requestFn = window.requestAnimationFrame ||
		        getPrefixed('RequestAnimationFrame') || timeoutDefer;

		var cancelFn = window.cancelAnimationFrame ||
		        getPrefixed('CancelAnimationFrame') ||
		        getPrefixed('CancelRequestAnimationFrame') ||
		        function (id) { window.clearTimeout(id); };


		L.Util.requestAnimFrame = function (fn, context, immediate, element) {
			fn = L.bind(fn, context);

			if (immediate && requestFn === timeoutDefer) {
				fn();
			} else {
				return requestFn.call(window, fn, element);
			}
		};

		L.Util.cancelAnimFrame = function (id) {
			if (id) {
				cancelFn.call(window, id);
			}
		};

	}());

	// shortcuts for most used utility functions
	L.extend = L.Util.extend;
	L.bind = L.Util.bind;
	L.stamp = L.Util.stamp;
	L.setOptions = L.Util.setOptions;


	/*
	 * L.Class powers the OOP facilities of the library.
	 * Thanks to John Resig and Dean Edwards for inspiration!
	 */

	L.Class = function () {};

	L.Class.extend = function (props) {

		// extended class with the new prototype
		var NewClass = function () {

			// call the constructor
			if (this.initialize) {
				this.initialize.apply(this, arguments);
			}

			// call all constructor hooks
			if (this._initHooks) {
				this.callInitHooks();
			}
		};

		// instantiate class without calling constructor
		var F = function () {};
		F.prototype = this.prototype;

		var proto = new F();
		proto.constructor = NewClass;

		NewClass.prototype = proto;

		//inherit parent's statics
		for (var i in this) {
			if (this.hasOwnProperty(i) && i !== 'prototype') {
				NewClass[i] = this[i];
			}
		}

		// mix static properties into the class
		if (props.statics) {
			L.extend(NewClass, props.statics);
			delete props.statics;
		}

		// mix includes into the prototype
		if (props.includes) {
			L.Util.extend.apply(null, [proto].concat(props.includes));
			delete props.includes;
		}

		// merge options
		if (props.options && proto.options) {
			props.options = L.extend({}, proto.options, props.options);
		}

		// mix given properties into the prototype
		L.extend(proto, props);

		proto._initHooks = [];

		var parent = this;
		// jshint camelcase: false
		NewClass.__super__ = parent.prototype;

		// add method for calling all hooks
		proto.callInitHooks = function () {

			if (this._initHooksCalled) { return; }

			if (parent.prototype.callInitHooks) {
				parent.prototype.callInitHooks.call(this);
			}

			this._initHooksCalled = true;

			for (var i = 0, len = proto._initHooks.length; i < len; i++) {
				proto._initHooks[i].call(this);
			}
		};

		return NewClass;
	};


	// method for adding properties to prototype
	L.Class.include = function (props) {
		L.extend(this.prototype, props);
	};

	// merge new default options to the Class
	L.Class.mergeOptions = function (options) {
		L.extend(this.prototype.options, options);
	};

	// add a constructor hook
	L.Class.addInitHook = function (fn) { // (Function) || (String, args...)
		var args = Array.prototype.slice.call(arguments, 1);

		var init = typeof fn === 'function' ? fn : function () {
			this[fn].apply(this, args);
		};

		this.prototype._initHooks = this.prototype._initHooks || [];
		this.prototype._initHooks.push(init);
	};


	/*
	 * L.Mixin.Events is used to add custom events functionality to Leaflet classes.
	 */

	var eventsKey = '_leaflet_events';

	L.Mixin = {};

	L.Mixin.Events = {

		addEventListener: function (types, fn, context) { // (String, Function[, Object]) or (Object[, Object])

			// types can be a map of types/handlers
			if (L.Util.invokeEach(types, this.addEventListener, this, fn, context)) { return this; }

			var events = this[eventsKey] = this[eventsKey] || {},
			    contextId = context && context !== this && L.stamp(context),
			    i, len, event, type, indexKey, indexLenKey, typeIndex;

			// types can be a string of space-separated words
			types = L.Util.splitWords(types);

			for (i = 0, len = types.length; i < len; i++) {
				event = {
					action: fn,
					context: context || this
				};
				type = types[i];

				if (contextId) {
					// store listeners of a particular context in a separate hash (if it has an id)
					// gives a major performance boost when removing thousands of map layers

					indexKey = type + '_idx';
					indexLenKey = indexKey + '_len';

					typeIndex = events[indexKey] = events[indexKey] || {};

					if (!typeIndex[contextId]) {
						typeIndex[contextId] = [];

						// keep track of the number of keys in the index to quickly check if it's empty
						events[indexLenKey] = (events[indexLenKey] || 0) + 1;
					}

					typeIndex[contextId].push(event);


				} else {
					events[type] = events[type] || [];
					events[type].push(event);
				}
			}

			return this;
		},

		hasEventListeners: function (type) { // (String) -> Boolean
			var events = this[eventsKey];
			return !!events && ((type in events && events[type].length > 0) ||
			                    (type + '_idx' in events && events[type + '_idx_len'] > 0));
		},

		removeEventListener: function (types, fn, context) { // ([String, Function, Object]) or (Object[, Object])

			if (!this[eventsKey]) {
				return this;
			}

			if (!types) {
				return this.clearAllEventListeners();
			}

			if (L.Util.invokeEach(types, this.removeEventListener, this, fn, context)) { return this; }

			var events = this[eventsKey],
			    contextId = context && context !== this && L.stamp(context),
			    i, len, type, listeners, j, indexKey, indexLenKey, typeIndex, removed;

			types = L.Util.splitWords(types);

			for (i = 0, len = types.length; i < len; i++) {
				type = types[i];
				indexKey = type + '_idx';
				indexLenKey = indexKey + '_len';

				typeIndex = events[indexKey];

				if (!fn) {
					// clear all listeners for a type if function isn't specified
					delete events[type];
					delete events[indexKey];
					delete events[indexLenKey];

				} else {
					listeners = contextId && typeIndex ? typeIndex[contextId] : events[type];

					if (listeners) {
						for (j = listeners.length - 1; j >= 0; j--) {
							if ((listeners[j].action === fn) && (!context || (listeners[j].context === context))) {
								removed = listeners.splice(j, 1);
								// set the old action to a no-op, because it is possible
								// that the listener is being iterated over as part of a dispatch
								removed[0].action = L.Util.falseFn;
							}
						}

						if (context && typeIndex && (listeners.length === 0)) {
							delete typeIndex[contextId];
							events[indexLenKey]--;
						}
					}
				}
			}

			return this;
		},

		clearAllEventListeners: function () {
			delete this[eventsKey];
			return this;
		},

		fireEvent: function (type, data) { // (String[, Object])
			if (!this.hasEventListeners(type)) {
				return this;
			}

			var event = L.Util.extend({}, data, { type: type, target: this });

			var events = this[eventsKey],
			    listeners, i, len, typeIndex, contextId;

			if (events[type]) {
				// make sure adding/removing listeners inside other listeners won't cause infinite loop
				listeners = events[type].slice();

				for (i = 0, len = listeners.length; i < len; i++) {
					listeners[i].action.call(listeners[i].context, event);
				}
			}

			// fire event for the context-indexed listeners as well
			typeIndex = events[type + '_idx'];

			for (contextId in typeIndex) {
				listeners = typeIndex[contextId].slice();

				if (listeners) {
					for (i = 0, len = listeners.length; i < len; i++) {
						listeners[i].action.call(listeners[i].context, event);
					}
				}
			}

			return this;
		},

		addOneTimeEventListener: function (types, fn, context) {

			if (L.Util.invokeEach(types, this.addOneTimeEventListener, this, fn, context)) { return this; }

			var handler = L.bind(function () {
				this
				    .removeEventListener(types, fn, context)
				    .removeEventListener(types, handler, context);
			}, this);

			return this
			    .addEventListener(types, fn, context)
			    .addEventListener(types, handler, context);
		}
	};

	L.Mixin.Events.on = L.Mixin.Events.addEventListener;
	L.Mixin.Events.off = L.Mixin.Events.removeEventListener;
	L.Mixin.Events.once = L.Mixin.Events.addOneTimeEventListener;
	L.Mixin.Events.fire = L.Mixin.Events.fireEvent;


	/*
	 * L.Browser handles different browser and feature detections for internal Leaflet use.
	 */

	(function () {

		var ie = 'ActiveXObject' in window,
			ielt9 = ie && !document.addEventListener,

		    // terrible browser detection to work around Safari / iOS / Android browser bugs
		    ua = navigator.userAgent.toLowerCase(),
		    webkit = ua.indexOf('webkit') !== -1,
		    chrome = ua.indexOf('chrome') !== -1,
		    phantomjs = ua.indexOf('phantom') !== -1,
		    android = ua.indexOf('android') !== -1,
		    android23 = ua.search('android [23]') !== -1,
			gecko = ua.indexOf('gecko') !== -1,

		    mobile = typeof orientation !== undefined + '',
		    msPointer = window.navigator && window.navigator.msPointerEnabled &&
		              window.navigator.msMaxTouchPoints && !window.PointerEvent,
			pointer = (window.PointerEvent && window.navigator.pointerEnabled && window.navigator.maxTouchPoints) ||
					  msPointer,
		    retina = ('devicePixelRatio' in window && window.devicePixelRatio > 1) ||
		             ('matchMedia' in window && window.matchMedia('(min-resolution:144dpi)') &&
		              window.matchMedia('(min-resolution:144dpi)').matches),

		    doc = document.documentElement,
		    ie3d = ie && ('transition' in doc.style),
		    webkit3d = ('WebKitCSSMatrix' in window) && ('m11' in new window.WebKitCSSMatrix()) && !android23,
		    gecko3d = 'MozPerspective' in doc.style,
		    opera3d = 'OTransition' in doc.style,
		    any3d = !window.L_DISABLE_3D && (ie3d || webkit3d || gecko3d || opera3d) && !phantomjs;


		// PhantomJS has 'ontouchstart' in document.documentElement, but doesn't actually support touch.
		// https://github.com/Leaflet/Leaflet/pull/1434#issuecomment-13843151

		var touch = !window.L_NO_TOUCH && !phantomjs && (function () {

			var startName = 'ontouchstart';

			// IE10+ (We simulate these into touch* events in L.DomEvent and L.DomEvent.Pointer) or WebKit, etc.
			if (pointer || (startName in doc)) {
				return true;
			}

			// Firefox/Gecko
			var div = document.createElement('div'),
			    supported = false;

			if (!div.setAttribute) {
				return false;
			}
			div.setAttribute(startName, 'return;');

			if (typeof div[startName] === 'function') {
				supported = true;
			}

			div.removeAttribute(startName);
			div = null;

			return supported;
		}());


		L.Browser = {
			ie: ie,
			ielt9: ielt9,
			webkit: webkit,
			gecko: gecko && !webkit && !window.opera && !ie,

			android: android,
			android23: android23,

			chrome: chrome,

			ie3d: ie3d,
			webkit3d: webkit3d,
			gecko3d: gecko3d,
			opera3d: opera3d,
			any3d: any3d,

			mobile: mobile,
			mobileWebkit: mobile && webkit,
			mobileWebkit3d: mobile && webkit3d,
			mobileOpera: mobile && window.opera,

			touch: touch,
			msPointer: msPointer,
			pointer: pointer,

			retina: retina
		};

	}());


	/*
	 * L.Point represents a point with x and y coordinates.
	 */

	L.Point = function (/*Number*/ x, /*Number*/ y, /*Boolean*/ round) {
		this.x = (round ? Math.round(x) : x);
		this.y = (round ? Math.round(y) : y);
	};

	L.Point.prototype = {

		clone: function () {
			return new L.Point(this.x, this.y);
		},

		// non-destructive, returns a new point
		add: function (point) {
			return this.clone()._add(L.point(point));
		},

		// destructive, used directly for performance in situations where it's safe to modify existing point
		_add: function (point) {
			this.x += point.x;
			this.y += point.y;
			return this;
		},

		subtract: function (point) {
			return this.clone()._subtract(L.point(point));
		},

		_subtract: function (point) {
			this.x -= point.x;
			this.y -= point.y;
			return this;
		},

		divideBy: function (num) {
			return this.clone()._divideBy(num);
		},

		_divideBy: function (num) {
			this.x /= num;
			this.y /= num;
			return this;
		},

		multiplyBy: function (num) {
			return this.clone()._multiplyBy(num);
		},

		_multiplyBy: function (num) {
			this.x *= num;
			this.y *= num;
			return this;
		},

		round: function () {
			return this.clone()._round();
		},

		_round: function () {
			this.x = Math.round(this.x);
			this.y = Math.round(this.y);
			return this;
		},

		floor: function () {
			return this.clone()._floor();
		},

		_floor: function () {
			this.x = Math.floor(this.x);
			this.y = Math.floor(this.y);
			return this;
		},

		distanceTo: function (point) {
			point = L.point(point);

			var x = point.x - this.x,
			    y = point.y - this.y;

			return Math.sqrt(x * x + y * y);
		},

		equals: function (point) {
			point = L.point(point);

			return point.x === this.x &&
			       point.y === this.y;
		},

		contains: function (point) {
			point = L.point(point);

			return Math.abs(point.x) <= Math.abs(this.x) &&
			       Math.abs(point.y) <= Math.abs(this.y);
		},

		toString: function () {
			return 'Point(' +
			        L.Util.formatNum(this.x) + ', ' +
			        L.Util.formatNum(this.y) + ')';
		}
	};

	L.point = function (x, y, round) {
		if (x instanceof L.Point) {
			return x;
		}
		if (L.Util.isArray(x)) {
			return new L.Point(x[0], x[1]);
		}
		if (x === undefined || x === null) {
			return x;
		}
		return new L.Point(x, y, round);
	};


	/*
	 * L.Bounds represents a rectangular area on the screen in pixel coordinates.
	 */

	L.Bounds = function (a, b) { //(Point, Point) or Point[]
		if (!a) { return; }

		var points = b ? [a, b] : a;

		for (var i = 0, len = points.length; i < len; i++) {
			this.extend(points[i]);
		}
	};

	L.Bounds.prototype = {
		// extend the bounds to contain the given point
		extend: function (point) { // (Point)
			point = L.point(point);

			if (!this.min && !this.max) {
				this.min = point.clone();
				this.max = point.clone();
			} else {
				this.min.x = Math.min(point.x, this.min.x);
				this.max.x = Math.max(point.x, this.max.x);
				this.min.y = Math.min(point.y, this.min.y);
				this.max.y = Math.max(point.y, this.max.y);
			}
			return this;
		},

		getCenter: function (round) { // (Boolean) -> Point
			return new L.Point(
			        (this.min.x + this.max.x) / 2,
			        (this.min.y + this.max.y) / 2, round);
		},

		getBottomLeft: function () { // -> Point
			return new L.Point(this.min.x, this.max.y);
		},

		getTopRight: function () { // -> Point
			return new L.Point(this.max.x, this.min.y);
		},

		getSize: function () {
			return this.max.subtract(this.min);
		},

		contains: function (obj) { // (Bounds) or (Point) -> Boolean
			var min, max;

			if (typeof obj[0] === 'number' || obj instanceof L.Point) {
				obj = L.point(obj);
			} else {
				obj = L.bounds(obj);
			}

			if (obj instanceof L.Bounds) {
				min = obj.min;
				max = obj.max;
			} else {
				min = max = obj;
			}

			return (min.x >= this.min.x) &&
			       (max.x <= this.max.x) &&
			       (min.y >= this.min.y) &&
			       (max.y <= this.max.y);
		},

		intersects: function (bounds) { // (Bounds) -> Boolean
			bounds = L.bounds(bounds);

			var min = this.min,
			    max = this.max,
			    min2 = bounds.min,
			    max2 = bounds.max,
			    xIntersects = (max2.x >= min.x) && (min2.x <= max.x),
			    yIntersects = (max2.y >= min.y) && (min2.y <= max.y);

			return xIntersects && yIntersects;
		},

		isValid: function () {
			return !!(this.min && this.max);
		}
	};

	L.bounds = function (a, b) { // (Bounds) or (Point, Point) or (Point[])
		if (!a || a instanceof L.Bounds) {
			return a;
		}
		return new L.Bounds(a, b);
	};


	/*
	 * L.Transformation is an utility class to perform simple point transformations through a 2d-matrix.
	 */

	L.Transformation = function (a, b, c, d) {
		this._a = a;
		this._b = b;
		this._c = c;
		this._d = d;
	};

	L.Transformation.prototype = {
		transform: function (point, scale) { // (Point, Number) -> Point
			return this._transform(point.clone(), scale);
		},

		// destructive transform (faster)
		_transform: function (point, scale) {
			scale = scale || 1;
			point.x = scale * (this._a * point.x + this._b);
			point.y = scale * (this._c * point.y + this._d);
			return point;
		},

		untransform: function (point, scale) {
			scale = scale || 1;
			return new L.Point(
			        (point.x / scale - this._b) / this._a,
			        (point.y / scale - this._d) / this._c);
		}
	};


	/*
	 * L.DomUtil contains various utility functions for working with DOM.
	 */

	L.DomUtil = {
		get: function (id) {
			return (typeof id === 'string' ? document.getElementById(id) : id);
		},

		getStyle: function (el, style) {

			var value = el.style[style];

			if (!value && el.currentStyle) {
				value = el.currentStyle[style];
			}

			if ((!value || value === 'auto') && document.defaultView) {
				var css = document.defaultView.getComputedStyle(el, null);
				value = css ? css[style] : null;
			}

			return value === 'auto' ? null : value;
		},

		getViewportOffset: function (element) {

			var top = 0,
			    left = 0,
			    el = element,
			    docBody = document.body,
			    docEl = document.documentElement,
			    pos;

			do {
				top  += el.offsetTop  || 0;
				left += el.offsetLeft || 0;

				//add borders
				top += parseInt(L.DomUtil.getStyle(el, 'borderTopWidth'), 10) || 0;
				left += parseInt(L.DomUtil.getStyle(el, 'borderLeftWidth'), 10) || 0;

				pos = L.DomUtil.getStyle(el, 'position');

				if (el.offsetParent === docBody && pos === 'absolute') { break; }

				if (pos === 'fixed') {
					top  += docBody.scrollTop  || docEl.scrollTop  || 0;
					left += docBody.scrollLeft || docEl.scrollLeft || 0;
					break;
				}

				if (pos === 'relative' && !el.offsetLeft) {
					var width = L.DomUtil.getStyle(el, 'width'),
					    maxWidth = L.DomUtil.getStyle(el, 'max-width'),
					    r = el.getBoundingClientRect();

					if (width !== 'none' || maxWidth !== 'none') {
						left += r.left + el.clientLeft;
					}

					//calculate full y offset since we're breaking out of the loop
					top += r.top + (docBody.scrollTop  || docEl.scrollTop  || 0);

					break;
				}

				el = el.offsetParent;

			} while (el);

			el = element;

			do {
				if (el === docBody) { break; }

				top  -= el.scrollTop  || 0;
				left -= el.scrollLeft || 0;

				el = el.parentNode;
			} while (el);

			return new L.Point(left, top);
		},

		documentIsLtr: function () {
			if (!L.DomUtil._docIsLtrCached) {
				L.DomUtil._docIsLtrCached = true;
				L.DomUtil._docIsLtr = L.DomUtil.getStyle(document.body, 'direction') === 'ltr';
			}
			return L.DomUtil._docIsLtr;
		},

		create: function (tagName, className, container) {

			var el = document.createElement(tagName);
			el.className = className;

			if (container) {
				container.appendChild(el);
			}

			return el;
		},

		hasClass: function (el, name) {
			if (el.classList !== undefined) {
				return el.classList.contains(name);
			}
			var className = L.DomUtil._getClass(el);
			return className.length > 0 && new RegExp('(^|\\s)' + name + '(\\s|$)').test(className);
		},

		addClass: function (el, name) {
			if (el.classList !== undefined) {
				var classes = L.Util.splitWords(name);
				for (var i = 0, len = classes.length; i < len; i++) {
					el.classList.add(classes[i]);
				}
			} else if (!L.DomUtil.hasClass(el, name)) {
				var className = L.DomUtil._getClass(el);
				L.DomUtil._setClass(el, (className ? className + ' ' : '') + name);
			}
		},

		removeClass: function (el, name) {
			if (el.classList !== undefined) {
				el.classList.remove(name);
			} else {
				L.DomUtil._setClass(el, L.Util.trim((' ' + L.DomUtil._getClass(el) + ' ').replace(' ' + name + ' ', ' ')));
			}
		},

		_setClass: function (el, name) {
			if (el.className.baseVal === undefined) {
				el.className = name;
			} else {
				// in case of SVG element
				el.className.baseVal = name;
			}
		},

		_getClass: function (el) {
			return el.className.baseVal === undefined ? el.className : el.className.baseVal;
		},

		setOpacity: function (el, value) {

			if ('opacity' in el.style) {
				el.style.opacity = value;

			} else if ('filter' in el.style) {

				var filter = false,
				    filterName = 'DXImageTransform.Microsoft.Alpha';

				// filters collection throws an error if we try to retrieve a filter that doesn't exist
				try {
					filter = el.filters.item(filterName);
				} catch (e) {
					// don't set opacity to 1 if we haven't already set an opacity,
					// it isn't needed and breaks transparent pngs.
					if (value === 1) { return; }
				}

				value = Math.round(value * 100);

				if (filter) {
					filter.Enabled = (value !== 100);
					filter.Opacity = value;
				} else {
					el.style.filter += ' progid:' + filterName + '(opacity=' + value + ')';
				}
			}
		},

		testProp: function (props) {

			var style = document.documentElement.style;

			for (var i = 0; i < props.length; i++) {
				if (props[i] in style) {
					return props[i];
				}
			}
			return false;
		},

		getTranslateString: function (point) {
			// on WebKit browsers (Chrome/Safari/iOS Safari/Android) using translate3d instead of translate
			// makes animation smoother as it ensures HW accel is used. Firefox 13 doesn't care
			// (same speed either way), Opera 12 doesn't support translate3d

			var is3d = L.Browser.webkit3d,
			    open = 'translate' + (is3d ? '3d' : '') + '(',
			    close = (is3d ? ',0' : '') + ')';

			return open + point.x + 'px,' + point.y + 'px' + close;
		},

		getScaleString: function (scale, origin) {

			var preTranslateStr = L.DomUtil.getTranslateString(origin.add(origin.multiplyBy(-1 * scale))),
			    scaleStr = ' scale(' + scale + ') ';

			return preTranslateStr + scaleStr;
		},

		setPosition: function (el, point, disable3D) { // (HTMLElement, Point[, Boolean])

			// jshint camelcase: false
			el._leaflet_pos = point;

			if (!disable3D && L.Browser.any3d) {
				el.style[L.DomUtil.TRANSFORM] =  L.DomUtil.getTranslateString(point);
			} else {
				el.style.left = point.x + 'px';
				el.style.top = point.y + 'px';
			}
		},

		getPosition: function (el) {
			// this method is only used for elements previously positioned using setPosition,
			// so it's safe to cache the position for performance

			// jshint camelcase: false
			return el._leaflet_pos;
		}
	};


	// prefix style property names

	L.DomUtil.TRANSFORM = L.DomUtil.testProp(
	        ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform']);

	// webkitTransition comes first because some browser versions that drop vendor prefix don't do
	// the same for the transitionend event, in particular the Android 4.1 stock browser

	L.DomUtil.TRANSITION = L.DomUtil.testProp(
	        ['webkitTransition', 'transition', 'OTransition', 'MozTransition', 'msTransition']);

	L.DomUtil.TRANSITION_END =
	        L.DomUtil.TRANSITION === 'webkitTransition' || L.DomUtil.TRANSITION === 'OTransition' ?
	        L.DomUtil.TRANSITION + 'End' : 'transitionend';

	(function () {
	    if ('onselectstart' in document) {
	        L.extend(L.DomUtil, {
	            disableTextSelection: function () {
	                L.DomEvent.on(window, 'selectstart', L.DomEvent.preventDefault);
	            },

	            enableTextSelection: function () {
	                L.DomEvent.off(window, 'selectstart', L.DomEvent.preventDefault);
	            }
	        });
	    } else {
	        var userSelectProperty = L.DomUtil.testProp(
	            ['userSelect', 'WebkitUserSelect', 'OUserSelect', 'MozUserSelect', 'msUserSelect']);

	        L.extend(L.DomUtil, {
	            disableTextSelection: function () {
	                if (userSelectProperty) {
	                    var style = document.documentElement.style;
	                    this._userSelect = style[userSelectProperty];
	                    style[userSelectProperty] = 'none';
	                }
	            },

	            enableTextSelection: function () {
	                if (userSelectProperty) {
	                    document.documentElement.style[userSelectProperty] = this._userSelect;
	                    delete this._userSelect;
	                }
	            }
	        });
	    }

		L.extend(L.DomUtil, {
			disableImageDrag: function () {
				L.DomEvent.on(window, 'dragstart', L.DomEvent.preventDefault);
			},

			enableImageDrag: function () {
				L.DomEvent.off(window, 'dragstart', L.DomEvent.preventDefault);
			}
		});
	})();


	/*
	 * L.LatLng represents a geographical point with latitude and longitude coordinates.
	 */

	L.LatLng = function (lat, lng, alt) { // (Number, Number, Number)
		lat = parseFloat(lat);
		lng = parseFloat(lng);

		if (isNaN(lat) || isNaN(lng)) {
			throw new Error('Invalid LatLng object: (' + lat + ', ' + lng + ')');
		}

		this.lat = lat;
		this.lng = lng;

		if (alt !== undefined) {
			this.alt = parseFloat(alt);
		}
	};

	L.extend(L.LatLng, {
		DEG_TO_RAD: Math.PI / 180,
		RAD_TO_DEG: 180 / Math.PI,
		MAX_MARGIN: 1.0E-9 // max margin of error for the "equals" check
	});

	L.LatLng.prototype = {
		equals: function (obj) { // (LatLng) -> Boolean
			if (!obj) { return false; }

			obj = L.latLng(obj);

			var margin = Math.max(
			        Math.abs(this.lat - obj.lat),
			        Math.abs(this.lng - obj.lng));

			return margin <= L.LatLng.MAX_MARGIN;
		},

		toString: function (precision) { // (Number) -> String
			return 'LatLng(' +
			        L.Util.formatNum(this.lat, precision) + ', ' +
			        L.Util.formatNum(this.lng, precision) + ')';
		},

		// Haversine distance formula, see http://en.wikipedia.org/wiki/Haversine_formula
		// TODO move to projection code, LatLng shouldn't know about Earth
		distanceTo: function (other) { // (LatLng) -> Number
			other = L.latLng(other);

			var R = 6378137, // earth radius in meters
			    d2r = L.LatLng.DEG_TO_RAD,
			    dLat = (other.lat - this.lat) * d2r,
			    dLon = (other.lng - this.lng) * d2r,
			    lat1 = this.lat * d2r,
			    lat2 = other.lat * d2r,
			    sin1 = Math.sin(dLat / 2),
			    sin2 = Math.sin(dLon / 2);

			var a = sin1 * sin1 + sin2 * sin2 * Math.cos(lat1) * Math.cos(lat2);

			return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		},

		wrap: function (a, b) { // (Number, Number) -> LatLng
			var lng = this.lng;

			a = a || -180;
			b = b ||  180;

			lng = (lng + b) % (b - a) + (lng < a || lng === b ? b : a);

			return new L.LatLng(this.lat, lng);
		}
	};

	L.latLng = function (a, b) { // (LatLng) or ([Number, Number]) or (Number, Number)
		if (a instanceof L.LatLng) {
			return a;
		}
		if (L.Util.isArray(a)) {
			if (typeof a[0] === 'number' || typeof a[0] === 'string') {
				return new L.LatLng(a[0], a[1], a[2]);
			} else {
				return null;
			}
		}
		if (a === undefined || a === null) {
			return a;
		}
		if (typeof a === 'object' && 'lat' in a) {
			return new L.LatLng(a.lat, 'lng' in a ? a.lng : a.lon);
		}
		if (b === undefined) {
			return null;
		}
		return new L.LatLng(a, b);
	};



	/*
	 * L.LatLngBounds represents a rectangular area on the map in geographical coordinates.
	 */

	L.LatLngBounds = function (southWest, northEast) { // (LatLng, LatLng) or (LatLng[])
		if (!southWest) { return; }

		var latlngs = northEast ? [southWest, northEast] : southWest;

		for (var i = 0, len = latlngs.length; i < len; i++) {
			this.extend(latlngs[i]);
		}
	};

	L.LatLngBounds.prototype = {
		// extend the bounds to contain the given point or bounds
		extend: function (obj) { // (LatLng) or (LatLngBounds)
			if (!obj) { return this; }

			var latLng = L.latLng(obj);
			if (latLng !== null) {
				obj = latLng;
			} else {
				obj = L.latLngBounds(obj);
			}

			if (obj instanceof L.LatLng) {
				if (!this._southWest && !this._northEast) {
					this._southWest = new L.LatLng(obj.lat, obj.lng);
					this._northEast = new L.LatLng(obj.lat, obj.lng);
				} else {
					this._southWest.lat = Math.min(obj.lat, this._southWest.lat);
					this._southWest.lng = Math.min(obj.lng, this._southWest.lng);

					this._northEast.lat = Math.max(obj.lat, this._northEast.lat);
					this._northEast.lng = Math.max(obj.lng, this._northEast.lng);
				}
			} else if (obj instanceof L.LatLngBounds) {
				this.extend(obj._southWest);
				this.extend(obj._northEast);
			}
			return this;
		},

		// extend the bounds by a percentage
		pad: function (bufferRatio) { // (Number) -> LatLngBounds
			var sw = this._southWest,
			    ne = this._northEast,
			    heightBuffer = Math.abs(sw.lat - ne.lat) * bufferRatio,
			    widthBuffer = Math.abs(sw.lng - ne.lng) * bufferRatio;

			return new L.LatLngBounds(
			        new L.LatLng(sw.lat - heightBuffer, sw.lng - widthBuffer),
			        new L.LatLng(ne.lat + heightBuffer, ne.lng + widthBuffer));
		},

		getCenter: function () { // -> LatLng
			return new L.LatLng(
			        (this._southWest.lat + this._northEast.lat) / 2,
			        (this._southWest.lng + this._northEast.lng) / 2);
		},

		getSouthWest: function () {
			return this._southWest;
		},

		getNorthEast: function () {
			return this._northEast;
		},

		getNorthWest: function () {
			return new L.LatLng(this.getNorth(), this.getWest());
		},

		getSouthEast: function () {
			return new L.LatLng(this.getSouth(), this.getEast());
		},

		getWest: function () {
			return this._southWest.lng;
		},

		getSouth: function () {
			return this._southWest.lat;
		},

		getEast: function () {
			return this._northEast.lng;
		},

		getNorth: function () {
			return this._northEast.lat;
		},

		contains: function (obj) { // (LatLngBounds) or (LatLng) -> Boolean
			if (typeof obj[0] === 'number' || obj instanceof L.LatLng) {
				obj = L.latLng(obj);
			} else {
				obj = L.latLngBounds(obj);
			}

			var sw = this._southWest,
			    ne = this._northEast,
			    sw2, ne2;

			if (obj instanceof L.LatLngBounds) {
				sw2 = obj.getSouthWest();
				ne2 = obj.getNorthEast();
			} else {
				sw2 = ne2 = obj;
			}

			return (sw2.lat >= sw.lat) && (ne2.lat <= ne.lat) &&
			       (sw2.lng >= sw.lng) && (ne2.lng <= ne.lng);
		},

		intersects: function (bounds) { // (LatLngBounds)
			bounds = L.latLngBounds(bounds);

			var sw = this._southWest,
			    ne = this._northEast,
			    sw2 = bounds.getSouthWest(),
			    ne2 = bounds.getNorthEast(),

			    latIntersects = (ne2.lat >= sw.lat) && (sw2.lat <= ne.lat),
			    lngIntersects = (ne2.lng >= sw.lng) && (sw2.lng <= ne.lng);

			return latIntersects && lngIntersects;
		},

		toBBoxString: function () {
			return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(',');
		},

		equals: function (bounds) { // (LatLngBounds)
			if (!bounds) { return false; }

			bounds = L.latLngBounds(bounds);

			return this._southWest.equals(bounds.getSouthWest()) &&
			       this._northEast.equals(bounds.getNorthEast());
		},

		isValid: function () {
			return !!(this._southWest && this._northEast);
		}
	};

	//TODO International date line?

	L.latLngBounds = function (a, b) { // (LatLngBounds) or (LatLng, LatLng)
		if (!a || a instanceof L.LatLngBounds) {
			return a;
		}
		return new L.LatLngBounds(a, b);
	};


	/*
	 * L.Projection contains various geographical projections used by CRS classes.
	 */

	L.Projection = {};


	/*
	 * Spherical Mercator is the most popular map projection, used by EPSG:3857 CRS used by default.
	 */

	L.Projection.SphericalMercator = {
		MAX_LATITUDE: 85.0511287798,

		project: function (latlng) { // (LatLng) -> Point
			var d = L.LatLng.DEG_TO_RAD,
			    max = this.MAX_LATITUDE,
			    lat = Math.max(Math.min(max, latlng.lat), -max),
			    x = latlng.lng * d,
			    y = lat * d;

			y = Math.log(Math.tan((Math.PI / 4) + (y / 2)));

			return new L.Point(x, y);
		},

		unproject: function (point) { // (Point, Boolean) -> LatLng
			var d = L.LatLng.RAD_TO_DEG,
			    lng = point.x * d,
			    lat = (2 * Math.atan(Math.exp(point.y)) - (Math.PI / 2)) * d;

			return new L.LatLng(lat, lng);
		}
	};


	/*
	 * Simple equirectangular (Plate Carree) projection, used by CRS like EPSG:4326 and Simple.
	 */

	L.Projection.LonLat = {
		project: function (latlng) {
			return new L.Point(latlng.lng, latlng.lat);
		},

		unproject: function (point) {
			return new L.LatLng(point.y, point.x);
		}
	};


	/*
	 * L.CRS is a base object for all defined CRS (Coordinate Reference Systems) in Leaflet.
	 */

	L.CRS = {
		latLngToPoint: function (latlng, zoom) { // (LatLng, Number) -> Point
			var projectedPoint = this.projection.project(latlng),
			    scale = this.scale(zoom);

			return this.transformation._transform(projectedPoint, scale);
		},

		pointToLatLng: function (point, zoom) { // (Point, Number[, Boolean]) -> LatLng
			var scale = this.scale(zoom),
			    untransformedPoint = this.transformation.untransform(point, scale);

			return this.projection.unproject(untransformedPoint);
		},

		project: function (latlng) {
			return this.projection.project(latlng);
		},

		scale: function (zoom) {
			return 256 * Math.pow(2, zoom);
		},

		getSize: function (zoom) {
			var s = this.scale(zoom);
			return L.point(s, s);
		}
	};


	/*
	 * A simple CRS that can be used for flat non-Earth maps like panoramas or game maps.
	 */

	L.CRS.Simple = L.extend({}, L.CRS, {
		projection: L.Projection.LonLat,
		transformation: new L.Transformation(1, 0, -1, 0),

		scale: function (zoom) {
			return Math.pow(2, zoom);
		}
	});


	/*
	 * L.CRS.EPSG3857 (Spherical Mercator) is the most common CRS for web mapping
	 * and is used by Leaflet by default.
	 */

	L.CRS.EPSG3857 = L.extend({}, L.CRS, {
		code: 'EPSG:3857',

		projection: L.Projection.SphericalMercator,
		transformation: new L.Transformation(0.5 / Math.PI, 0.5, -0.5 / Math.PI, 0.5),

		project: function (latlng) { // (LatLng) -> Point
			var projectedPoint = this.projection.project(latlng),
			    earthRadius = 6378137;
			return projectedPoint.multiplyBy(earthRadius);
		}
	});

	L.CRS.EPSG900913 = L.extend({}, L.CRS.EPSG3857, {
		code: 'EPSG:900913'
	});


	/*
	 * L.CRS.EPSG4326 is a CRS popular among advanced GIS specialists.
	 */

	L.CRS.EPSG4326 = L.extend({}, L.CRS, {
		code: 'EPSG:4326',

		projection: L.Projection.LonLat,
		transformation: new L.Transformation(1 / 360, 0.5, -1 / 360, 0.5)
	});


	/*
	 * L.Map is the central class of the API - it is used to create a map.
	 */

	L.Map = L.Class.extend({

		includes: L.Mixin.Events,

		options: {
			crs: L.CRS.EPSG3857,

			/*
			center: LatLng,
			zoom: Number,
			layers: Array,
			*/

			fadeAnimation: L.DomUtil.TRANSITION && !L.Browser.android23,
			trackResize: true,
			markerZoomAnimation: L.DomUtil.TRANSITION && L.Browser.any3d
		},

		initialize: function (id, options) { // (HTMLElement or String, Object)
			options = L.setOptions(this, options);


			this._initContainer(id);
			this._initLayout();

			// hack for https://github.com/Leaflet/Leaflet/issues/1980
			this._onResize = L.bind(this._onResize, this);

			this._initEvents();

			if (options.maxBounds) {
				this.setMaxBounds(options.maxBounds);
			}

			if (options.center && options.zoom !== undefined) {
				this.setView(L.latLng(options.center), options.zoom, {reset: true});
			}

			this._handlers = [];

			this._layers = {};
			this._zoomBoundLayers = {};
			this._tileLayersNum = 0;

			this.callInitHooks();

			this._addLayers(options.layers);
		},


		// public methods that modify map state

		// replaced by animation-powered implementation in Map.PanAnimation.js
		setView: function (center, zoom) {
			zoom = zoom === undefined ? this.getZoom() : zoom;
			this._resetView(L.latLng(center), this._limitZoom(zoom));
			return this;
		},

		setZoom: function (zoom, options) {
			if (!this._loaded) {
				this._zoom = this._limitZoom(zoom);
				return this;
			}
			return this.setView(this.getCenter(), zoom, {zoom: options});
		},

		zoomIn: function (delta, options) {
			return this.setZoom(this._zoom + (delta || 1), options);
		},

		zoomOut: function (delta, options) {
			return this.setZoom(this._zoom - (delta || 1), options);
		},

		setZoomAround: function (latlng, zoom, options) {
			var scale = this.getZoomScale(zoom),
			    viewHalf = this.getSize().divideBy(2),
			    containerPoint = latlng instanceof L.Point ? latlng : this.latLngToContainerPoint(latlng),

			    centerOffset = containerPoint.subtract(viewHalf).multiplyBy(1 - 1 / scale),
			    newCenter = this.containerPointToLatLng(viewHalf.add(centerOffset));

			return this.setView(newCenter, zoom, {zoom: options});
		},

		fitBounds: function (bounds, options) {

			options = options || {};
			bounds = bounds.getBounds ? bounds.getBounds() : L.latLngBounds(bounds);

			var paddingTL = L.point(options.paddingTopLeft || options.padding || [0, 0]),
			    paddingBR = L.point(options.paddingBottomRight || options.padding || [0, 0]),

			    zoom = this.getBoundsZoom(bounds, false, paddingTL.add(paddingBR)),
			    paddingOffset = paddingBR.subtract(paddingTL).divideBy(2),

			    swPoint = this.project(bounds.getSouthWest(), zoom),
			    nePoint = this.project(bounds.getNorthEast(), zoom),
			    center = this.unproject(swPoint.add(nePoint).divideBy(2).add(paddingOffset), zoom);

			zoom = options && options.maxZoom ? Math.min(options.maxZoom, zoom) : zoom;

			return this.setView(center, zoom, options);
		},

		fitWorld: function (options) {
			return this.fitBounds([[-90, -180], [90, 180]], options);
		},

		panTo: function (center, options) { // (LatLng)
			return this.setView(center, this._zoom, {pan: options});
		},

		panBy: function (offset) { // (Point)
			// replaced with animated panBy in Map.PanAnimation.js
			this.fire('movestart');

			this._rawPanBy(L.point(offset));

			this.fire('move');
			return this.fire('moveend');
		},

		setMaxBounds: function (bounds) {
			bounds = L.latLngBounds(bounds);

			this.options.maxBounds = bounds;

			if (!bounds) {
				return this.off('moveend', this._panInsideMaxBounds, this);
			}

			if (this._loaded) {
				this._panInsideMaxBounds();
			}

			return this.on('moveend', this._panInsideMaxBounds, this);
		},

		panInsideBounds: function (bounds, options) {
			var center = this.getCenter(),
				newCenter = this._limitCenter(center, this._zoom, bounds);

			if (center.equals(newCenter)) { return this; }

			return this.panTo(newCenter, options);
		},

		addLayer: function (layer) {
			// TODO method is too big, refactor

			var id = L.stamp(layer);

			if (this._layers[id]) { return this; }

			this._layers[id] = layer;

			// TODO getMaxZoom, getMinZoom in ILayer (instead of options)
			if (layer.options && (!isNaN(layer.options.maxZoom) || !isNaN(layer.options.minZoom))) {
				this._zoomBoundLayers[id] = layer;
				this._updateZoomLevels();
			}

			// TODO looks ugly, refactor!!!
			if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
				this._tileLayersNum++;
				this._tileLayersToLoad++;
				layer.on('load', this._onTileLayerLoad, this);
			}

			if (this._loaded) {
				this._layerAdd(layer);
			}

			return this;
		},

		removeLayer: function (layer) {
			var id = L.stamp(layer);

			if (!this._layers[id]) { return this; }

			if (this._loaded) {
				layer.onRemove(this);
			}

			delete this._layers[id];

			if (this._loaded) {
				this.fire('layerremove', {layer: layer});
			}

			if (this._zoomBoundLayers[id]) {
				delete this._zoomBoundLayers[id];
				this._updateZoomLevels();
			}

			// TODO looks ugly, refactor
			if (this.options.zoomAnimation && L.TileLayer && (layer instanceof L.TileLayer)) {
				this._tileLayersNum--;
				this._tileLayersToLoad--;
				layer.off('load', this._onTileLayerLoad, this);
			}

			return this;
		},

		hasLayer: function (layer) {
			if (!layer) { return false; }

			return (L.stamp(layer) in this._layers);
		},

		eachLayer: function (method, context) {
			for (var i in this._layers) {
				method.call(context, this._layers[i]);
			}
			return this;
		},

		invalidateSize: function (options) {
			if (!this._loaded) { return this; }

			options = L.extend({
				animate: false,
				pan: true
			}, options === true ? {animate: true} : options);

			var oldSize = this.getSize();
			this._sizeChanged = true;
			this._initialCenter = null;

			var newSize = this.getSize(),
			    oldCenter = oldSize.divideBy(2).round(),
			    newCenter = newSize.divideBy(2).round(),
			    offset = oldCenter.subtract(newCenter);

			if (!offset.x && !offset.y) { return this; }

			if (options.animate && options.pan) {
				this.panBy(offset);

			} else {
				if (options.pan) {
					this._rawPanBy(offset);
				}

				this.fire('move');

				if (options.debounceMoveend) {
					clearTimeout(this._sizeTimer);
					this._sizeTimer = setTimeout(L.bind(this.fire, this, 'moveend'), 200);
				} else {
					this.fire('moveend');
				}
			}

			return this.fire('resize', {
				oldSize: oldSize,
				newSize: newSize
			});
		},

		// TODO handler.addTo
		addHandler: function (name, HandlerClass) {
			if (!HandlerClass) { return this; }

			var handler = this[name] = new HandlerClass(this);

			this._handlers.push(handler);

			if (this.options[name]) {
				handler.enable();
			}

			return this;
		},

		remove: function () {
			if (this._loaded) {
				this.fire('unload');
			}

			this._initEvents('off');

			try {
				// throws error in IE6-8
				delete this._container._leaflet;
			} catch (e) {
				this._container._leaflet = undefined;
			}

			this._clearPanes();
			if (this._clearControlPos) {
				this._clearControlPos();
			}

			this._clearHandlers();

			return this;
		},


		// public methods for getting map state

		getCenter: function () { // (Boolean) -> LatLng
			this._checkIfLoaded();

			if (this._initialCenter && !this._moved()) {
				return this._initialCenter;
			}
			return this.layerPointToLatLng(this._getCenterLayerPoint());
		},

		getZoom: function () {
			return this._zoom;
		},

		getBounds: function () {
			var bounds = this.getPixelBounds(),
			    sw = this.unproject(bounds.getBottomLeft()),
			    ne = this.unproject(bounds.getTopRight());

			return new L.LatLngBounds(sw, ne);
		},

		getMinZoom: function () {
			return this.options.minZoom === undefined ?
				(this._layersMinZoom === undefined ? 0 : this._layersMinZoom) :
				this.options.minZoom;
		},

		getMaxZoom: function () {
			return this.options.maxZoom === undefined ?
				(this._layersMaxZoom === undefined ? Infinity : this._layersMaxZoom) :
				this.options.maxZoom;
		},

		getBoundsZoom: function (bounds, inside, padding) { // (LatLngBounds[, Boolean, Point]) -> Number
			bounds = L.latLngBounds(bounds);

			var zoom = this.getMinZoom() - (inside ? 1 : 0),
			    maxZoom = this.getMaxZoom(),
			    size = this.getSize(),

			    nw = bounds.getNorthWest(),
			    se = bounds.getSouthEast(),

			    zoomNotFound = true,
			    boundsSize;

			padding = L.point(padding || [0, 0]);

			do {
				zoom++;
				boundsSize = this.project(se, zoom).subtract(this.project(nw, zoom)).add(padding);
				zoomNotFound = !inside ? size.contains(boundsSize) : boundsSize.x < size.x || boundsSize.y < size.y;

			} while (zoomNotFound && zoom <= maxZoom);

			if (zoomNotFound && inside) {
				return null;
			}

			return inside ? zoom : zoom - 1;
		},

		getSize: function () {
			if (!this._size || this._sizeChanged) {
				this._size = new L.Point(
					this._container.clientWidth,
					this._container.clientHeight);

				this._sizeChanged = false;
			}
			return this._size.clone();
		},

		getPixelBounds: function () {
			var topLeftPoint = this._getTopLeftPoint();
			return new L.Bounds(topLeftPoint, topLeftPoint.add(this.getSize()));
		},

		getPixelOrigin: function () {
			this._checkIfLoaded();
			return this._initialTopLeftPoint;
		},

		getPanes: function () {
			return this._panes;
		},

		getContainer: function () {
			return this._container;
		},


		// TODO replace with universal implementation after refactoring projections

		getZoomScale: function (toZoom) {
			var crs = this.options.crs;
			return crs.scale(toZoom) / crs.scale(this._zoom);
		},

		getScaleZoom: function (scale) {
			return this._zoom + (Math.log(scale) / Math.LN2);
		},


		// conversion methods

		project: function (latlng, zoom) { // (LatLng[, Number]) -> Point
			zoom = zoom === undefined ? this._zoom : zoom;
			return this.options.crs.latLngToPoint(L.latLng(latlng), zoom);
		},

		unproject: function (point, zoom) { // (Point[, Number]) -> LatLng
			zoom = zoom === undefined ? this._zoom : zoom;
			return this.options.crs.pointToLatLng(L.point(point), zoom);
		},

		layerPointToLatLng: function (point) { // (Point)
			var projectedPoint = L.point(point).add(this.getPixelOrigin());
			return this.unproject(projectedPoint);
		},

		latLngToLayerPoint: function (latlng) { // (LatLng)
			var projectedPoint = this.project(L.latLng(latlng))._round();
			return projectedPoint._subtract(this.getPixelOrigin());
		},

		containerPointToLayerPoint: function (point) { // (Point)
			return L.point(point).subtract(this._getMapPanePos());
		},

		layerPointToContainerPoint: function (point) { // (Point)
			return L.point(point).add(this._getMapPanePos());
		},

		containerPointToLatLng: function (point) {
			var layerPoint = this.containerPointToLayerPoint(L.point(point));
			return this.layerPointToLatLng(layerPoint);
		},

		latLngToContainerPoint: function (latlng) {
			return this.layerPointToContainerPoint(this.latLngToLayerPoint(L.latLng(latlng)));
		},

		mouseEventToContainerPoint: function (e) { // (MouseEvent)
			return L.DomEvent.getMousePosition(e, this._container);
		},

		mouseEventToLayerPoint: function (e) { // (MouseEvent)
			return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
		},

		mouseEventToLatLng: function (e) { // (MouseEvent)
			return this.layerPointToLatLng(this.mouseEventToLayerPoint(e));
		},


		// map initialization methods

		_initContainer: function (id) {
			var container = this._container = L.DomUtil.get(id);

			if (!container) {
				throw new Error('Map container not found.');
			} else if (container._leaflet) {
				throw new Error('Map container is already initialized.');
			}

			container._leaflet = true;
		},

		_initLayout: function () {
			var container = this._container;

			L.DomUtil.addClass(container, 'leaflet-container' +
				(L.Browser.touch ? ' leaflet-touch' : '') +
				(L.Browser.retina ? ' leaflet-retina' : '') +
				(L.Browser.ielt9 ? ' leaflet-oldie' : '') +
				(this.options.fadeAnimation ? ' leaflet-fade-anim' : ''));

			var position = L.DomUtil.getStyle(container, 'position');

			if (position !== 'absolute' && position !== 'relative' && position !== 'fixed') {
				container.style.position = 'relative';
			}

			this._initPanes();

			if (this._initControlPos) {
				this._initControlPos();
			}
		},

		_initPanes: function () {
			var panes = this._panes = {};

			this._mapPane = panes.mapPane = this._createPane('leaflet-map-pane', this._container);

			this._tilePane = panes.tilePane = this._createPane('leaflet-tile-pane', this._mapPane);
			panes.objectsPane = this._createPane('leaflet-objects-pane', this._mapPane);
			panes.shadowPane = this._createPane('leaflet-shadow-pane');
			panes.overlayPane = this._createPane('leaflet-overlay-pane');
			panes.markerPane = this._createPane('leaflet-marker-pane');
			panes.popupPane = this._createPane('leaflet-popup-pane');

			var zoomHide = ' leaflet-zoom-hide';

			if (!this.options.markerZoomAnimation) {
				L.DomUtil.addClass(panes.markerPane, zoomHide);
				L.DomUtil.addClass(panes.shadowPane, zoomHide);
				L.DomUtil.addClass(panes.popupPane, zoomHide);
			}
		},

		_createPane: function (className, container) {
			return L.DomUtil.create('div', className, container || this._panes.objectsPane);
		},

		_clearPanes: function () {
			this._container.removeChild(this._mapPane);
		},

		_addLayers: function (layers) {
			layers = layers ? (L.Util.isArray(layers) ? layers : [layers]) : [];

			for (var i = 0, len = layers.length; i < len; i++) {
				this.addLayer(layers[i]);
			}
		},


		// private methods that modify map state

		_resetView: function (center, zoom, preserveMapOffset, afterZoomAnim) {

			var zoomChanged = (this._zoom !== zoom);

			if (!afterZoomAnim) {
				this.fire('movestart');

				if (zoomChanged) {
					this.fire('zoomstart');
				}
			}

			this._zoom = zoom;
			this._initialCenter = center;

			this._initialTopLeftPoint = this._getNewTopLeftPoint(center);

			if (!preserveMapOffset) {
				L.DomUtil.setPosition(this._mapPane, new L.Point(0, 0));
			} else {
				this._initialTopLeftPoint._add(this._getMapPanePos());
			}

			this._tileLayersToLoad = this._tileLayersNum;

			var loading = !this._loaded;
			this._loaded = true;

			this.fire('viewreset', {hard: !preserveMapOffset});

			if (loading) {
				this.fire('load');
				this.eachLayer(this._layerAdd, this);
			}

			this.fire('move');

			if (zoomChanged || afterZoomAnim) {
				this.fire('zoomend');
			}

			this.fire('moveend', {hard: !preserveMapOffset});
		},

		_rawPanBy: function (offset) {
			L.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(offset));
		},

		_getZoomSpan: function () {
			return this.getMaxZoom() - this.getMinZoom();
		},

		_updateZoomLevels: function () {
			var i,
				minZoom = Infinity,
				maxZoom = -Infinity,
				oldZoomSpan = this._getZoomSpan();

			for (i in this._zoomBoundLayers) {
				var layer = this._zoomBoundLayers[i];
				if (!isNaN(layer.options.minZoom)) {
					minZoom = Math.min(minZoom, layer.options.minZoom);
				}
				if (!isNaN(layer.options.maxZoom)) {
					maxZoom = Math.max(maxZoom, layer.options.maxZoom);
				}
			}

			if (i === undefined) { // we have no tilelayers
				this._layersMaxZoom = this._layersMinZoom = undefined;
			} else {
				this._layersMaxZoom = maxZoom;
				this._layersMinZoom = minZoom;
			}

			if (oldZoomSpan !== this._getZoomSpan()) {
				this.fire('zoomlevelschange');
			}
		},

		_panInsideMaxBounds: function () {
			this.panInsideBounds(this.options.maxBounds);
		},

		_checkIfLoaded: function () {
			if (!this._loaded) {
				throw new Error('Set map center and zoom first.');
			}
		},

		// map events

		_initEvents: function (onOff) {
			if (!L.DomEvent) { return; }

			onOff = onOff || 'on';

			L.DomEvent[onOff](this._container, 'click', this._onMouseClick, this);

			var events = ['dblclick', 'mousedown', 'mouseup', 'mouseenter',
			              'mouseleave', 'mousemove', 'contextmenu'],
			    i, len;

			for (i = 0, len = events.length; i < len; i++) {
				L.DomEvent[onOff](this._container, events[i], this._fireMouseEvent, this);
			}

			if (this.options.trackResize) {
				L.DomEvent[onOff](window, 'resize', this._onResize, this);
			}
		},

		_onResize: function () {
			L.Util.cancelAnimFrame(this._resizeRequest);
			this._resizeRequest = L.Util.requestAnimFrame(
			        function () { this.invalidateSize({debounceMoveend: true}); }, this, false, this._container);
		},

		_onMouseClick: function (e) {
			if (!this._loaded || (!e._simulated &&
			        ((this.dragging && this.dragging.moved()) ||
			         (this.boxZoom  && this.boxZoom.moved()))) ||
			            L.DomEvent._skipped(e)) { return; }

			this.fire('preclick');
			this._fireMouseEvent(e);
		},

		_fireMouseEvent: function (e) {
			if (!this._loaded || L.DomEvent._skipped(e)) { return; }

			var type = e.type;

			type = (type === 'mouseenter' ? 'mouseover' : (type === 'mouseleave' ? 'mouseout' : type));

			if (!this.hasEventListeners(type)) { return; }

			if (type === 'contextmenu') {
				L.DomEvent.preventDefault(e);
			}

			var containerPoint = this.mouseEventToContainerPoint(e),
			    layerPoint = this.containerPointToLayerPoint(containerPoint),
			    latlng = this.layerPointToLatLng(layerPoint);

			this.fire(type, {
				latlng: latlng,
				layerPoint: layerPoint,
				containerPoint: containerPoint,
				originalEvent: e
			});
		},

		_onTileLayerLoad: function () {
			this._tileLayersToLoad--;
			if (this._tileLayersNum && !this._tileLayersToLoad) {
				this.fire('tilelayersload');
			}
		},

		_clearHandlers: function () {
			for (var i = 0, len = this._handlers.length; i < len; i++) {
				this._handlers[i].disable();
			}
		},

		whenReady: function (callback, context) {
			if (this._loaded) {
				callback.call(context || this, this);
			} else {
				this.on('load', callback, context);
			}
			return this;
		},

		_layerAdd: function (layer) {
			layer.onAdd(this);
			this.fire('layeradd', {layer: layer});
		},


		// private methods for getting map state

		_getMapPanePos: function () {
			return L.DomUtil.getPosition(this._mapPane);
		},

		_moved: function () {
			var pos = this._getMapPanePos();
			return pos && !pos.equals([0, 0]);
		},

		_getTopLeftPoint: function () {
			return this.getPixelOrigin().subtract(this._getMapPanePos());
		},

		_getNewTopLeftPoint: function (center, zoom) {
			var viewHalf = this.getSize()._divideBy(2);
			// TODO round on display, not calculation to increase precision?
			return this.project(center, zoom)._subtract(viewHalf)._round();
		},

		_latLngToNewLayerPoint: function (latlng, newZoom, newCenter) {
			var topLeft = this._getNewTopLeftPoint(newCenter, newZoom).add(this._getMapPanePos());
			return this.project(latlng, newZoom)._subtract(topLeft);
		},

		// layer point of the current center
		_getCenterLayerPoint: function () {
			return this.containerPointToLayerPoint(this.getSize()._divideBy(2));
		},

		// offset of the specified place to the current center in pixels
		_getCenterOffset: function (latlng) {
			return this.latLngToLayerPoint(latlng).subtract(this._getCenterLayerPoint());
		},

		// adjust center for view to get inside bounds
		_limitCenter: function (center, zoom, bounds) {

			if (!bounds) { return center; }

			var centerPoint = this.project(center, zoom),
			    viewHalf = this.getSize().divideBy(2),
			    viewBounds = new L.Bounds(centerPoint.subtract(viewHalf), centerPoint.add(viewHalf)),
			    offset = this._getBoundsOffset(viewBounds, bounds, zoom);

			return this.unproject(centerPoint.add(offset), zoom);
		},

		// adjust offset for view to get inside bounds
		_limitOffset: function (offset, bounds) {
			if (!bounds) { return offset; }

			var viewBounds = this.getPixelBounds(),
			    newBounds = new L.Bounds(viewBounds.min.add(offset), viewBounds.max.add(offset));

			return offset.add(this._getBoundsOffset(newBounds, bounds));
		},

		// returns offset needed for pxBounds to get inside maxBounds at a specified zoom
		_getBoundsOffset: function (pxBounds, maxBounds, zoom) {
			var nwOffset = this.project(maxBounds.getNorthWest(), zoom).subtract(pxBounds.min),
			    seOffset = this.project(maxBounds.getSouthEast(), zoom).subtract(pxBounds.max),

			    dx = this._rebound(nwOffset.x, -seOffset.x),
			    dy = this._rebound(nwOffset.y, -seOffset.y);

			return new L.Point(dx, dy);
		},

		_rebound: function (left, right) {
			return left + right > 0 ?
				Math.round(left - right) / 2 :
				Math.max(0, Math.ceil(left)) - Math.max(0, Math.floor(right));
		},

		_limitZoom: function (zoom) {
			var min = this.getMinZoom(),
			    max = this.getMaxZoom();

			return Math.max(min, Math.min(max, zoom));
		}
	});

	L.map = function (id, options) {
		return new L.Map(id, options);
	};


	/*
	 * Mercator projection that takes into account that the Earth is not a perfect sphere.
	 * Less popular than spherical mercator; used by projections like EPSG:3395.
	 */

	L.Projection.Mercator = {
		MAX_LATITUDE: 85.0840591556,

		R_MINOR: 6356752.314245179,
		R_MAJOR: 6378137,

		project: function (latlng) { // (LatLng) -> Point
			var d = L.LatLng.DEG_TO_RAD,
			    max = this.MAX_LATITUDE,
			    lat = Math.max(Math.min(max, latlng.lat), -max),
			    r = this.R_MAJOR,
			    r2 = this.R_MINOR,
			    x = latlng.lng * d * r,
			    y = lat * d,
			    tmp = r2 / r,
			    eccent = Math.sqrt(1.0 - tmp * tmp),
			    con = eccent * Math.sin(y);

			con = Math.pow((1 - con) / (1 + con), eccent * 0.5);

			var ts = Math.tan(0.5 * ((Math.PI * 0.5) - y)) / con;
			y = -r * Math.log(ts);

			return new L.Point(x, y);
		},

		unproject: function (point) { // (Point, Boolean) -> LatLng
			var d = L.LatLng.RAD_TO_DEG,
			    r = this.R_MAJOR,
			    r2 = this.R_MINOR,
			    lng = point.x * d / r,
			    tmp = r2 / r,
			    eccent = Math.sqrt(1 - (tmp * tmp)),
			    ts = Math.exp(- point.y / r),
			    phi = (Math.PI / 2) - 2 * Math.atan(ts),
			    numIter = 15,
			    tol = 1e-7,
			    i = numIter,
			    dphi = 0.1,
			    con;

			while ((Math.abs(dphi) > tol) && (--i > 0)) {
				con = eccent * Math.sin(phi);
				dphi = (Math.PI / 2) - 2 * Math.atan(ts *
				            Math.pow((1.0 - con) / (1.0 + con), 0.5 * eccent)) - phi;
				phi += dphi;
			}

			return new L.LatLng(phi * d, lng);
		}
	};



	L.CRS.EPSG3395 = L.extend({}, L.CRS, {
		code: 'EPSG:3395',

		projection: L.Projection.Mercator,

		transformation: (function () {
			var m = L.Projection.Mercator,
			    r = m.R_MAJOR,
			    scale = 0.5 / (Math.PI * r);

			return new L.Transformation(scale, 0.5, -scale, 0.5);
		}())
	});


	/*
	 * L.TileLayer is used for standard xyz-numbered tile layers.
	 */

	L.TileLayer = L.Class.extend({
		includes: L.Mixin.Events,

		options: {
			minZoom: 0,
			maxZoom: 18,
			tileSize: 256,
			subdomains: 'abc',
			errorTileUrl: '',
			attribution: '',
			zoomOffset: 0,
			opacity: 1,
			/*
			maxNativeZoom: null,
			zIndex: null,
			tms: false,
			continuousWorld: false,
			noWrap: false,
			zoomReverse: false,
			detectRetina: false,
			reuseTiles: false,
			bounds: false,
			*/
			unloadInvisibleTiles: L.Browser.mobile,
			updateWhenIdle: L.Browser.mobile
		},

		initialize: function (url, options) {
			options = L.setOptions(this, options);

			// detecting retina displays, adjusting tileSize and zoom levels
			if (options.detectRetina && L.Browser.retina && options.maxZoom > 0) {

				options.tileSize = Math.floor(options.tileSize / 2);
				options.zoomOffset++;

				if (options.minZoom > 0) {
					options.minZoom--;
				}
				this.options.maxZoom--;
			}

			if (options.bounds) {
				options.bounds = L.latLngBounds(options.bounds);
			}

			this._url = url;

			var subdomains = this.options.subdomains;

			if (typeof subdomains === 'string') {
				this.options.subdomains = subdomains.split('');
			}
		},

		onAdd: function (map) {
			this._map = map;
			this._animated = map._zoomAnimated;

			// create a container div for tiles
			this._initContainer();

			// set up events
			map.on({
				'viewreset': this._reset,
				'moveend': this._update
			}, this);

			if (this._animated) {
				map.on({
					'zoomanim': this._animateZoom,
					'zoomend': this._endZoomAnim
				}, this);
			}

			if (!this.options.updateWhenIdle) {
				this._limitedUpdate = L.Util.limitExecByInterval(this._update, 150, this);
				map.on('move', this._limitedUpdate, this);
			}

			this._reset();
			this._update();
		},

		addTo: function (map) {
			map.addLayer(this);
			return this;
		},

		onRemove: function (map) {
			this._container.parentNode.removeChild(this._container);

			map.off({
				'viewreset': this._reset,
				'moveend': this._update
			}, this);

			if (this._animated) {
				map.off({
					'zoomanim': this._animateZoom,
					'zoomend': this._endZoomAnim
				}, this);
			}

			if (!this.options.updateWhenIdle) {
				map.off('move', this._limitedUpdate, this);
			}

			this._container = null;
			this._map = null;
		},

		bringToFront: function () {
			var pane = this._map._panes.tilePane;

			if (this._container) {
				pane.appendChild(this._container);
				this._setAutoZIndex(pane, Math.max);
			}

			return this;
		},

		bringToBack: function () {
			var pane = this._map._panes.tilePane;

			if (this._container) {
				pane.insertBefore(this._container, pane.firstChild);
				this._setAutoZIndex(pane, Math.min);
			}

			return this;
		},

		getAttribution: function () {
			return this.options.attribution;
		},

		getContainer: function () {
			return this._container;
		},

		setOpacity: function (opacity) {
			this.options.opacity = opacity;

			if (this._map) {
				this._updateOpacity();
			}

			return this;
		},

		setZIndex: function (zIndex) {
			this.options.zIndex = zIndex;
			this._updateZIndex();

			return this;
		},

		setUrl: function (url, noRedraw) {
			this._url = url;

			if (!noRedraw) {
				this.redraw();
			}

			return this;
		},

		redraw: function () {
			if (this._map) {
				this._reset({hard: true});
				this._update();
			}
			return this;
		},

		_updateZIndex: function () {
			if (this._container && this.options.zIndex !== undefined) {
				this._container.style.zIndex = this.options.zIndex;
			}
		},

		_setAutoZIndex: function (pane, compare) {

			var layers = pane.children,
			    edgeZIndex = -compare(Infinity, -Infinity), // -Infinity for max, Infinity for min
			    zIndex, i, len;

			for (i = 0, len = layers.length; i < len; i++) {

				if (layers[i] !== this._container) {
					zIndex = parseInt(layers[i].style.zIndex, 10);

					if (!isNaN(zIndex)) {
						edgeZIndex = compare(edgeZIndex, zIndex);
					}
				}
			}

			this.options.zIndex = this._container.style.zIndex =
			        (isFinite(edgeZIndex) ? edgeZIndex : 0) + compare(1, -1);
		},

		_updateOpacity: function () {
			var i,
			    tiles = this._tiles;

			if (L.Browser.ielt9) {
				for (i in tiles) {
					L.DomUtil.setOpacity(tiles[i], this.options.opacity);
				}
			} else {
				L.DomUtil.setOpacity(this._container, this.options.opacity);
			}
		},

		_initContainer: function () {
			var tilePane = this._map._panes.tilePane;

			if (!this._container) {
				this._container = L.DomUtil.create('div', 'leaflet-layer');

				this._updateZIndex();

				if (this._animated) {
					var className = 'leaflet-tile-container';

					this._bgBuffer = L.DomUtil.create('div', className, this._container);
					this._tileContainer = L.DomUtil.create('div', className, this._container);

				} else {
					this._tileContainer = this._container;
				}

				tilePane.appendChild(this._container);

				if (this.options.opacity < 1) {
					this._updateOpacity();
				}
			}
		},

		_reset: function (e) {
			for (var key in this._tiles) {
				this.fire('tileunload', {tile: this._tiles[key]});
			}

			this._tiles = {};
			this._tilesToLoad = 0;

			if (this.options.reuseTiles) {
				this._unusedTiles = [];
			}

			this._tileContainer.innerHTML = '';

			if (this._animated && e && e.hard) {
				this._clearBgBuffer();
			}

			this._initContainer();
		},

		_getTileSize: function () {
			var map = this._map,
			    zoom = map.getZoom() + this.options.zoomOffset,
			    zoomN = this.options.maxNativeZoom,
			    tileSize = this.options.tileSize;

			if (zoomN && zoom > zoomN) {
				tileSize = Math.round(map.getZoomScale(zoom) / map.getZoomScale(zoomN) * tileSize);
			}

			return tileSize;
		},

		_update: function () {

			if (!this._map) { return; }

			var map = this._map,
			    bounds = map.getPixelBounds(),
			    zoom = map.getZoom(),
			    tileSize = this._getTileSize();

			if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
				return;
			}

			var tileBounds = L.bounds(
			        bounds.min.divideBy(tileSize)._floor(),
			        bounds.max.divideBy(tileSize)._floor());

			this._addTilesFromCenterOut(tileBounds);

			if (this.options.unloadInvisibleTiles || this.options.reuseTiles) {
				this._removeOtherTiles(tileBounds);
			}
		},

		_addTilesFromCenterOut: function (bounds) {
			var queue = [],
			    center = bounds.getCenter();

			var j, i, point;

			for (j = bounds.min.y; j <= bounds.max.y; j++) {
				for (i = bounds.min.x; i <= bounds.max.x; i++) {
					point = new L.Point(i, j);

					if (this._tileShouldBeLoaded(point)) {
						queue.push(point);
					}
				}
			}

			var tilesToLoad = queue.length;

			if (tilesToLoad === 0) { return; }

			// load tiles in order of their distance to center
			queue.sort(function (a, b) {
				return a.distanceTo(center) - b.distanceTo(center);
			});

			var fragment = document.createDocumentFragment();

			// if its the first batch of tiles to load
			if (!this._tilesToLoad) {
				this.fire('loading');
			}

			this._tilesToLoad += tilesToLoad;

			for (i = 0; i < tilesToLoad; i++) {
				this._addTile(queue[i], fragment);
			}

			this._tileContainer.appendChild(fragment);
		},

		_tileShouldBeLoaded: function (tilePoint) {
			if ((tilePoint.x + ':' + tilePoint.y) in this._tiles) {
				return false; // already loaded
			}

			var options = this.options;

			if (!options.continuousWorld) {
				var limit = this._getWrapTileNum();

				// don't load if exceeds world bounds
				if ((options.noWrap && (tilePoint.x < 0 || tilePoint.x >= limit.x)) ||
					tilePoint.y < 0 || tilePoint.y >= limit.y) { return false; }
			}

			if (options.bounds) {
				var tileSize = options.tileSize,
				    nwPoint = tilePoint.multiplyBy(tileSize),
				    sePoint = nwPoint.add([tileSize, tileSize]),
				    nw = this._map.unproject(nwPoint),
				    se = this._map.unproject(sePoint);

				// TODO temporary hack, will be removed after refactoring projections
				// https://github.com/Leaflet/Leaflet/issues/1618
				if (!options.continuousWorld && !options.noWrap) {
					nw = nw.wrap();
					se = se.wrap();
				}

				if (!options.bounds.intersects([nw, se])) { return false; }
			}

			return true;
		},

		_removeOtherTiles: function (bounds) {
			var kArr, x, y, key;

			for (key in this._tiles) {
				kArr = key.split(':');
				x = parseInt(kArr[0], 10);
				y = parseInt(kArr[1], 10);

				// remove tile if it's out of bounds
				if (x < bounds.min.x || x > bounds.max.x || y < bounds.min.y || y > bounds.max.y) {
					this._removeTile(key);
				}
			}
		},

		_removeTile: function (key) {
			var tile = this._tiles[key];

			this.fire('tileunload', {tile: tile, url: tile.src});

			if (this.options.reuseTiles) {
				L.DomUtil.removeClass(tile, 'leaflet-tile-loaded');
				this._unusedTiles.push(tile);

			} else if (tile.parentNode === this._tileContainer) {
				this._tileContainer.removeChild(tile);
			}

			// for https://github.com/CloudMade/Leaflet/issues/137
			if (!L.Browser.android) {
				tile.onload = null;
				tile.src = L.Util.emptyImageUrl;
			}

			delete this._tiles[key];
		},

		_addTile: function (tilePoint, container) {
			var tilePos = this._getTilePos(tilePoint);

			// get unused tile - or create a new tile
			var tile = this._getTile();

			/*
			Chrome 20 layouts much faster with top/left (verify with timeline, frames)
			Android 4 browser has display issues with top/left and requires transform instead
			(other browsers don't currently care) - see debug/hacks/jitter.html for an example
			*/
			L.DomUtil.setPosition(tile, tilePos, L.Browser.chrome);

			this._tiles[tilePoint.x + ':' + tilePoint.y] = tile;

			this._loadTile(tile, tilePoint);

			if (tile.parentNode !== this._tileContainer) {
				container.appendChild(tile);
			}
		},

		_getZoomForUrl: function () {

			var options = this.options,
			    zoom = this._map.getZoom();

			if (options.zoomReverse) {
				zoom = options.maxZoom - zoom;
			}

			zoom += options.zoomOffset;

			return options.maxNativeZoom ? Math.min(zoom, options.maxNativeZoom) : zoom;
		},

		_getTilePos: function (tilePoint) {
			var origin = this._map.getPixelOrigin(),
			    tileSize = this._getTileSize();

			return tilePoint.multiplyBy(tileSize).subtract(origin);
		},

		// image-specific code (override to implement e.g. Canvas or SVG tile layer)

		getTileUrl: function (tilePoint) {
			return L.Util.template(this._url, L.extend({
				s: this._getSubdomain(tilePoint),
				z: tilePoint.z,
				x: tilePoint.x,
				y: tilePoint.y
			}, this.options));
		},

		_getWrapTileNum: function () {
			var crs = this._map.options.crs,
			    size = crs.getSize(this._map.getZoom());
			return size.divideBy(this._getTileSize())._floor();
		},

		_adjustTilePoint: function (tilePoint) {

			var limit = this._getWrapTileNum();

			// wrap tile coordinates
			if (!this.options.continuousWorld && !this.options.noWrap) {
				tilePoint.x = ((tilePoint.x % limit.x) + limit.x) % limit.x;
			}

			if (this.options.tms) {
				tilePoint.y = limit.y - tilePoint.y - 1;
			}

			tilePoint.z = this._getZoomForUrl();
		},

		_getSubdomain: function (tilePoint) {
			var index = Math.abs(tilePoint.x + tilePoint.y) % this.options.subdomains.length;
			return this.options.subdomains[index];
		},

		_getTile: function () {
			if (this.options.reuseTiles && this._unusedTiles.length > 0) {
				var tile = this._unusedTiles.pop();
				this._resetTile(tile);
				return tile;
			}
			return this._createTile();
		},

		// Override if data stored on a tile needs to be cleaned up before reuse
		_resetTile: function (/*tile*/) {},

		_createTile: function () {
			var tile = L.DomUtil.create('img', 'leaflet-tile');
			tile.style.width = tile.style.height = this._getTileSize() + 'px';
			tile.galleryimg = 'no';

			tile.onselectstart = tile.onmousemove = L.Util.falseFn;

			if (L.Browser.ielt9 && this.options.opacity !== undefined) {
				L.DomUtil.setOpacity(tile, this.options.opacity);
			}
			// without this hack, tiles disappear after zoom on Chrome for Android
			// https://github.com/Leaflet/Leaflet/issues/2078
			if (L.Browser.mobileWebkit3d) {
				tile.style.WebkitBackfaceVisibility = 'hidden';
			}
			return tile;
		},

		_loadTile: function (tile, tilePoint) {
			tile._layer  = this;
			tile.onload  = this._tileOnLoad;
			tile.onerror = this._tileOnError;

			this._adjustTilePoint(tilePoint);
			tile.src     = this.getTileUrl(tilePoint);

			this.fire('tileloadstart', {
				tile: tile,
				url: tile.src
			});
		},

		_tileLoaded: function () {
			this._tilesToLoad--;

			if (this._animated) {
				L.DomUtil.addClass(this._tileContainer, 'leaflet-zoom-animated');
			}

			if (!this._tilesToLoad) {
				this.fire('load');

				if (this._animated) {
					// clear scaled tiles after all new tiles are loaded (for performance)
					clearTimeout(this._clearBgBufferTimer);
					this._clearBgBufferTimer = setTimeout(L.bind(this._clearBgBuffer, this), 500);
				}
			}
		},

		_tileOnLoad: function () {
			var layer = this._layer;

			//Only if we are loading an actual image
			if (this.src !== L.Util.emptyImageUrl) {
				L.DomUtil.addClass(this, 'leaflet-tile-loaded');

				layer.fire('tileload', {
					tile: this,
					url: this.src
				});
			}

			layer._tileLoaded();
		},

		_tileOnError: function () {
			var layer = this._layer;

			layer.fire('tileerror', {
				tile: this,
				url: this.src
			});

			var newUrl = layer.options.errorTileUrl;
			if (newUrl) {
				this.src = newUrl;
			}

			layer._tileLoaded();
		}
	});

	L.tileLayer = function (url, options) {
		return new L.TileLayer(url, options);
	};


	/*
	 * L.TileLayer.WMS is used for putting WMS tile layers on the map.
	 */

	L.TileLayer.WMS = L.TileLayer.extend({

		defaultWmsParams: {
			service: 'WMS',
			request: 'GetMap',
			version: '1.1.1',
			layers: '',
			styles: '',
			format: 'image/jpeg',
			transparent: false
		},

		initialize: function (url, options) { // (String, Object)

			this._url = url;

			var wmsParams = L.extend({}, this.defaultWmsParams),
			    tileSize = options.tileSize || this.options.tileSize;

			if (options.detectRetina && L.Browser.retina) {
				wmsParams.width = wmsParams.height = tileSize * 2;
			} else {
				wmsParams.width = wmsParams.height = tileSize;
			}

			for (var i in options) {
				// all keys that are not TileLayer options go to WMS params
				if (!this.options.hasOwnProperty(i) && i !== 'crs') {
					wmsParams[i] = options[i];
				}
			}

			this.wmsParams = wmsParams;

			L.setOptions(this, options);
		},

		onAdd: function (map) {

			this._crs = this.options.crs || map.options.crs;

			this._wmsVersion = parseFloat(this.wmsParams.version);

			var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
			this.wmsParams[projectionKey] = this._crs.code;

			L.TileLayer.prototype.onAdd.call(this, map);
		},

		getTileUrl: function (tilePoint) { // (Point, Number) -> String

			var map = this._map,
			    tileSize = this.options.tileSize,

			    nwPoint = tilePoint.multiplyBy(tileSize),
			    sePoint = nwPoint.add([tileSize, tileSize]),

			    nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
			    se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
			    bbox = this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
			        [se.y, nw.x, nw.y, se.x].join(',') :
			        [nw.x, se.y, se.x, nw.y].join(','),

			    url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});

			return url + L.Util.getParamString(this.wmsParams, url, true) + '&BBOX=' + bbox;
		},

		setParams: function (params, noRedraw) {

			L.extend(this.wmsParams, params);

			if (!noRedraw) {
				this.redraw();
			}

			return this;
		}
	});

	L.tileLayer.wms = function (url, options) {
		return new L.TileLayer.WMS(url, options);
	};


	/*
	 * L.TileLayer.Canvas is a class that you can use as a base for creating
	 * dynamically drawn Canvas-based tile layers.
	 */

	L.TileLayer.Canvas = L.TileLayer.extend({
		options: {
			async: false
		},

		initialize: function (options) {
			L.setOptions(this, options);
		},

		redraw: function () {
			if (this._map) {
				this._reset({hard: true});
				this._update();
			}

			for (var i in this._tiles) {
				this._redrawTile(this._tiles[i]);
			}
			return this;
		},

		_redrawTile: function (tile) {
			this.drawTile(tile, tile._tilePoint, this._map._zoom);
		},

		_createTile: function () {
			var tile = L.DomUtil.create('canvas', 'leaflet-tile');
			tile.width = tile.height = this.options.tileSize;
			tile.onselectstart = tile.onmousemove = L.Util.falseFn;
			return tile;
		},

		_loadTile: function (tile, tilePoint) {
			tile._layer = this;
			tile._tilePoint = tilePoint;

			this._redrawTile(tile);

			if (!this.options.async) {
				this.tileDrawn(tile);
			}
		},

		drawTile: function (/*tile, tilePoint*/) {
			// override with rendering code
		},

		tileDrawn: function (tile) {
			this._tileOnLoad.call(tile);
		}
	});


	L.tileLayer.canvas = function (options) {
		return new L.TileLayer.Canvas(options);
	};


	/*
	 * L.ImageOverlay is used to overlay images over the map (to specific geographical bounds).
	 */

	L.ImageOverlay = L.Class.extend({
		includes: L.Mixin.Events,

		options: {
			opacity: 1
		},

		initialize: function (url, bounds, options) { // (String, LatLngBounds, Object)
			this._url = url;
			this._bounds = L.latLngBounds(bounds);

			L.setOptions(this, options);
		},

		onAdd: function (map) {
			this._map = map;

			if (!this._image) {
				this._initImage();
			}

			map._panes.overlayPane.appendChild(this._image);

			map.on('viewreset', this._reset, this);

			if (map.options.zoomAnimation && L.Browser.any3d) {
				map.on('zoomanim', this._animateZoom, this);
			}

			this._reset();
		},

		onRemove: function (map) {
			map.getPanes().overlayPane.removeChild(this._image);

			map.off('viewreset', this._reset, this);

			if (map.options.zoomAnimation) {
				map.off('zoomanim', this._animateZoom, this);
			}
		},

		addTo: function (map) {
			map.addLayer(this);
			return this;
		},

		setOpacity: function (opacity) {
			this.options.opacity = opacity;
			this._updateOpacity();
			return this;
		},

		// TODO remove bringToFront/bringToBack duplication from TileLayer/Path
		bringToFront: function () {
			if (this._image) {
				this._map._panes.overlayPane.appendChild(this._image);
			}
			return this;
		},

		bringToBack: function () {
			var pane = this._map._panes.overlayPane;
			if (this._image) {
				pane.insertBefore(this._image, pane.firstChild);
			}
			return this;
		},

		setUrl: function (url) {
			this._url = url;
			this._image.src = this._url;
		},

		getAttribution: function () {
			return this.options.attribution;
		},

		_initImage: function () {
			this._image = L.DomUtil.create('img', 'leaflet-image-layer');

			if (this._map.options.zoomAnimation && L.Browser.any3d) {
				L.DomUtil.addClass(this._image, 'leaflet-zoom-animated');
			} else {
				L.DomUtil.addClass(this._image, 'leaflet-zoom-hide');
			}

			this._updateOpacity();

			//TODO createImage util method to remove duplication
			L.extend(this._image, {
				galleryimg: 'no',
				onselectstart: L.Util.falseFn,
				onmousemove: L.Util.falseFn,
				onload: L.bind(this._onImageLoad, this),
				src: this._url
			});
		},

		_animateZoom: function (e) {
			var map = this._map,
			    image = this._image,
			    scale = map.getZoomScale(e.zoom),
			    nw = this._bounds.getNorthWest(),
			    se = this._bounds.getSouthEast(),

			    topLeft = map._latLngToNewLayerPoint(nw, e.zoom, e.center),
			    size = map._latLngToNewLayerPoint(se, e.zoom, e.center)._subtract(topLeft),
			    origin = topLeft._add(size._multiplyBy((1 / 2) * (1 - 1 / scale)));

			image.style[L.DomUtil.TRANSFORM] =
			        L.DomUtil.getTranslateString(origin) + ' scale(' + scale + ') ';
		},

		_reset: function () {
			var image   = this._image,
			    topLeft = this._map.latLngToLayerPoint(this._bounds.getNorthWest()),
			    size = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(topLeft);

			L.DomUtil.setPosition(image, topLeft);

			image.style.width  = size.x + 'px';
			image.style.height = size.y + 'px';
		},

		_onImageLoad: function () {
			this.fire('load');
		},

		_updateOpacity: function () {
			L.DomUtil.setOpacity(this._image, this.options.opacity);
		}
	});

	L.imageOverlay = function (url, bounds, options) {
		return new L.ImageOverlay(url, bounds, options);
	};


	/*
	 * L.Icon is an image-based icon class that you can use with L.Marker for custom markers.
	 */

	L.Icon = L.Class.extend({
		options: {
			/*
			iconUrl: (String) (required)
			iconRetinaUrl: (String) (optional, used for retina devices if detected)
			iconSize: (Point) (can be set through CSS)
			iconAnchor: (Point) (centered by default, can be set in CSS with negative margins)
			popupAnchor: (Point) (if not specified, popup opens in the anchor point)
			shadowUrl: (String) (no shadow by default)
			shadowRetinaUrl: (String) (optional, used for retina devices if detected)
			shadowSize: (Point)
			shadowAnchor: (Point)
			*/
			className: ''
		},

		initialize: function (options) {
			L.setOptions(this, options);
		},

		createIcon: function (oldIcon) {
			return this._createIcon('icon', oldIcon);
		},

		createShadow: function (oldIcon) {
			return this._createIcon('shadow', oldIcon);
		},

		_createIcon: function (name, oldIcon) {
			var src = this._getIconUrl(name);

			if (!src) {
				if (name === 'icon') {
					throw new Error('iconUrl not set in Icon options (see the docs).');
				}
				return null;
			}

			var img;
			if (!oldIcon || oldIcon.tagName !== 'IMG') {
				img = this._createImg(src);
			} else {
				img = this._createImg(src, oldIcon);
			}
			this._setIconStyles(img, name);

			return img;
		},

		_setIconStyles: function (img, name) {
			var options = this.options,
			    size = L.point(options[name + 'Size']),
			    anchor;

			if (name === 'shadow') {
				anchor = L.point(options.shadowAnchor || options.iconAnchor);
			} else {
				anchor = L.point(options.iconAnchor);
			}

			if (!anchor && size) {
				anchor = size.divideBy(2, true);
			}

			img.className = 'leaflet-marker-' + name + ' ' + options.className;

			if (anchor) {
				img.style.marginLeft = (-anchor.x) + 'px';
				img.style.marginTop  = (-anchor.y) + 'px';
			}

			if (size) {
				img.style.width  = size.x + 'px';
				img.style.height = size.y + 'px';
			}
		},

		_createImg: function (src, el) {
			el = el || document.createElement('img');
			el.src = src;
			return el;
		},

		_getIconUrl: function (name) {
			if (L.Browser.retina && this.options[name + 'RetinaUrl']) {
				return this.options[name + 'RetinaUrl'];
			}
			return this.options[name + 'Url'];
		}
	});

	L.icon = function (options) {
		return new L.Icon(options);
	};


	/*
	 * L.Icon.Default is the blue marker icon used by default in Leaflet.
	 */

	L.Icon.Default = L.Icon.extend({

		options: {
			iconSize: [25, 41],
			iconAnchor: [12, 41],
			popupAnchor: [1, -34],

			shadowSize: [41, 41]
		},

		_getIconUrl: function (name) {
			var key = name + 'Url';

			if (this.options[key]) {
				return this.options[key];
			}

			if (L.Browser.retina && name === 'icon') {
				name += '-2x';
			}

			var path = L.Icon.Default.imagePath;

			if (!path) {
				throw new Error('Couldn\'t autodetect L.Icon.Default.imagePath, set it manually.');
			}

			return path + '/marker-' + name + '.png';
		}
	});

	L.Icon.Default.imagePath = (function () {
		var scripts = document.getElementsByTagName('script'),
		    leafletRe = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;

		var i, len, src, matches, path;

		for (i = 0, len = scripts.length; i < len; i++) {
			src = scripts[i].src;
			matches = src.match(leafletRe);

			if (matches) {
				path = src.split(leafletRe)[0];
				return (path ? path + '/' : '') + 'images';
			}
		}
	}());


	/*
	 * L.Marker is used to display clickable/draggable icons on the map.
	 */

	L.Marker = L.Class.extend({

		includes: L.Mixin.Events,

		options: {
			icon: new L.Icon.Default(),
			title: '',
			alt: '',
			clickable: true,
			draggable: false,
			keyboard: true,
			zIndexOffset: 0,
			opacity: 1,
			riseOnHover: false,
			riseOffset: 250
		},

		initialize: function (latlng, options) {
			L.setOptions(this, options);
			this._latlng = L.latLng(latlng);
		},

		onAdd: function (map) {
			this._map = map;

			map.on('viewreset', this.update, this);

			this._initIcon();
			this.update();
			this.fire('add');

			if (map.options.zoomAnimation && map.options.markerZoomAnimation) {
				map.on('zoomanim', this._animateZoom, this);
			}
		},

		addTo: function (map) {
			map.addLayer(this);
			return this;
		},

		onRemove: function (map) {
			if (this.dragging) {
				this.dragging.disable();
			}

			this._removeIcon();
			this._removeShadow();

			this.fire('remove');

			map.off({
				'viewreset': this.update,
				'zoomanim': this._animateZoom
			}, this);

			this._map = null;
		},

		getLatLng: function () {
			return this._latlng;
		},

		setLatLng: function (latlng) {
			this._latlng = L.latLng(latlng);

			this.update();

			return this.fire('move', { latlng: this._latlng });
		},

		setZIndexOffset: function (offset) {
			this.options.zIndexOffset = offset;
			this.update();

			return this;
		},

		setIcon: function (icon) {

			this.options.icon = icon;

			if (this._map) {
				this._initIcon();
				this.update();
			}

			if (this._popup) {
				this.bindPopup(this._popup);
			}

			return this;
		},

		update: function () {
			if (this._icon) {
				var pos = this._map.latLngToLayerPoint(this._latlng).round();
				this._setPos(pos);
			}

			return this;
		},

		_initIcon: function () {
			var options = this.options,
			    map = this._map,
			    animation = (map.options.zoomAnimation && map.options.markerZoomAnimation),
			    classToAdd = animation ? 'leaflet-zoom-animated' : 'leaflet-zoom-hide';

			var icon = options.icon.createIcon(this._icon),
				addIcon = false;

			// if we're not reusing the icon, remove the old one and init new one
			if (icon !== this._icon) {
				if (this._icon) {
					this._removeIcon();
				}
				addIcon = true;

				if (options.title) {
					icon.title = options.title;
				}
				
				if (options.alt) {
					icon.alt = options.alt;
				}
			}

			L.DomUtil.addClass(icon, classToAdd);

			if (options.keyboard) {
				icon.tabIndex = '0';
			}

			this._icon = icon;

			this._initInteraction();

			if (options.riseOnHover) {
				L.DomEvent
					.on(icon, 'mouseover', this._bringToFront, this)
					.on(icon, 'mouseout', this._resetZIndex, this);
			}

			var newShadow = options.icon.createShadow(this._shadow),
				addShadow = false;

			if (newShadow !== this._shadow) {
				this._removeShadow();
				addShadow = true;
			}

			if (newShadow) {
				L.DomUtil.addClass(newShadow, classToAdd);
			}
			this._shadow = newShadow;


			if (options.opacity < 1) {
				this._updateOpacity();
			}


			var panes = this._map._panes;

			if (addIcon) {
				panes.markerPane.appendChild(this._icon);
			}

			if (newShadow && addShadow) {
				panes.shadowPane.appendChild(this._shadow);
			}
		},

		_removeIcon: function () {
			if (this.options.riseOnHover) {
				L.DomEvent
				    .off(this._icon, 'mouseover', this._bringToFront)
				    .off(this._icon, 'mouseout', this._resetZIndex);
			}

			this._map._panes.markerPane.removeChild(this._icon);

			this._icon = null;
		},

		_removeShadow: function () {
			if (this._shadow) {
				this._map._panes.shadowPane.removeChild(this._shadow);
			}
			this._shadow = null;
		},

		_setPos: function (pos) {
			L.DomUtil.setPosition(this._icon, pos);

			if (this._shadow) {
				L.DomUtil.setPosition(this._shadow, pos);
			}

			this._zIndex = pos.y + this.options.zIndexOffset;

			this._resetZIndex();
		},

		_updateZIndex: function (offset) {
			this._icon.style.zIndex = this._zIndex + offset;
		},

		_animateZoom: function (opt) {
			var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();

			this._setPos(pos);
		},

		_initInteraction: function () {

			if (!this.options.clickable) { return; }

			// TODO refactor into something shared with Map/Path/etc. to DRY it up

			var icon = this._icon,
			    events = ['dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu'];

			L.DomUtil.addClass(icon, 'leaflet-clickable');
			L.DomEvent.on(icon, 'click', this._onMouseClick, this);
			L.DomEvent.on(icon, 'keypress', this._onKeyPress, this);

			for (var i = 0; i < events.length; i++) {
				L.DomEvent.on(icon, events[i], this._fireMouseEvent, this);
			}

			if (L.Handler.MarkerDrag) {
				this.dragging = new L.Handler.MarkerDrag(this);

				if (this.options.draggable) {
					this.dragging.enable();
				}
			}
		},

		_onMouseClick: function (e) {
			var wasDragged = this.dragging && this.dragging.moved();

			if (this.hasEventListeners(e.type) || wasDragged) {
				L.DomEvent.stopPropagation(e);
			}

			if (wasDragged) { return; }

			if ((!this.dragging || !this.dragging._enabled) && this._map.dragging && this._map.dragging.moved()) { return; }

			this.fire(e.type, {
				originalEvent: e,
				latlng: this._latlng
			});
		},

		_onKeyPress: function (e) {
			if (e.keyCode === 13) {
				this.fire('click', {
					originalEvent: e,
					latlng: this._latlng
				});
			}
		},

		_fireMouseEvent: function (e) {

			this.fire(e.type, {
				originalEvent: e,
				latlng: this._latlng
			});

			// TODO proper custom event propagation
			// this line will always be called if marker is in a FeatureGroup
			if (e.type === 'contextmenu' && this.hasEventListeners(e.type)) {
				L.DomEvent.preventDefault(e);
			}
			if (e.type !== 'mousedown') {
				L.DomEvent.stopPropagation(e);
			} else {
				L.DomEvent.preventDefault(e);
			}
		},

		setOpacity: function (opacity) {
			this.options.opacity = opacity;
			if (this._map) {
				this._updateOpacity();
			}

			return this;
		},

		_updateOpacity: function () {
			L.DomUtil.setOpacity(this._icon, this.options.opacity);
			if (this._shadow) {
				L.DomUtil.setOpacity(this._shadow, this.options.opacity);
			}
		},

		_bringToFront: function () {
			this._updateZIndex(this.options.riseOffset);
		},

		_resetZIndex: function () {
			this._updateZIndex(0);
		}
	});

	L.marker = function (latlng, options) {
		return new L.Marker(latlng, options);
	};


	/*
	 * L.DivIcon is a lightweight HTML-based icon class (as opposed to the image-based L.Icon)
	 * to use with L.Marker.
	 */

	L.DivIcon = L.Icon.extend({
		options: {
			iconSize: [12, 12], // also can be set through CSS
			/*
			iconAnchor: (Point)
			popupAnchor: (Point)
			html: (String)
			bgPos: (Point)
			*/
			className: 'leaflet-div-icon',
			html: false
		},

		createIcon: function (oldIcon) {
			var div = (oldIcon && oldIcon.tagName === 'DIV') ? oldIcon : document.createElement('div'),
			    options = this.options;

			if (options.html !== false) {
				div.innerHTML = options.html;
			} else {
				div.innerHTML = '';
			}

			if (options.bgPos) {
				div.style.backgroundPosition =
				        (-options.bgPos.x) + 'px ' + (-options.bgPos.y) + 'px';
			}

			this._setIconStyles(div, 'icon');
			return div;
		},

		createShadow: function () {
			return null;
		}
	});

	L.divIcon = function (options) {
		return new L.DivIcon(options);
	};


	/*
	 * L.Popup is used for displaying popups on the map.
	 */

	L.Map.mergeOptions({
		closePopupOnClick: true
	});

	L.Popup = L.Class.extend({
		includes: L.Mixin.Events,

		options: {
			minWidth: 50,
			maxWidth: 300,
			// maxHeight: null,
			autoPan: true,
			closeButton: true,
			offset: [0, 7],
			autoPanPadding: [5, 5],
			// autoPanPaddingTopLeft: null,
			// autoPanPaddingBottomRight: null,
			keepInView: false,
			className: '',
			zoomAnimation: true
		},

		initialize: function (options, source) {
			L.setOptions(this, options);

			this._source = source;
			this._animated = L.Browser.any3d && this.options.zoomAnimation;
			this._isOpen = false;
		},

		onAdd: function (map) {
			this._map = map;

			if (!this._container) {
				this._initLayout();
			}

			var animFade = map.options.fadeAnimation;

			if (animFade) {
				L.DomUtil.setOpacity(this._container, 0);
			}
			map._panes.popupPane.appendChild(this._container);

			map.on(this._getEvents(), this);

			this.update();

			if (animFade) {
				L.DomUtil.setOpacity(this._container, 1);
			}

			this.fire('open');

			map.fire('popupopen', {popup: this});

			if (this._source) {
				this._source.fire('popupopen', {popup: this});
			}
		},

		addTo: function (map) {
			map.addLayer(this);
			return this;
		},

		openOn: function (map) {
			map.openPopup(this);
			return this;
		},

		onRemove: function (map) {
			map._panes.popupPane.removeChild(this._container);

			L.Util.falseFn(this._container.offsetWidth); // force reflow

			map.off(this._getEvents(), this);

			if (map.options.fadeAnimation) {
				L.DomUtil.setOpacity(this._container, 0);
			}

			this._map = null;

			this.fire('close');

			map.fire('popupclose', {popup: this});

			if (this._source) {
				this._source.fire('popupclose', {popup: this});
			}
		},

		getLatLng: function () {
			return this._latlng;
		},

		setLatLng: function (latlng) {
			this._latlng = L.latLng(latlng);
			if (this._map) {
				this._updatePosition();
				this._adjustPan();
			}
			return this;
		},

		getContent: function () {
			return this._content;
		},

		setContent: function (content) {
			this._content = content;
			this.update();
			return this;
		},

		update: function () {
			if (!this._map) { return; }

			this._container.style.visibility = 'hidden';

			this._updateContent();
			this._updateLayout();
			this._updatePosition();

			this._container.style.visibility = '';

			this._adjustPan();
		},

		_getEvents: function () {
			var events = {
				viewreset: this._updatePosition
			};

			if (this._animated) {
				events.zoomanim = this._zoomAnimation;
			}
			if ('closeOnClick' in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) {
				events.preclick = this._close;
			}
			if (this.options.keepInView) {
				events.moveend = this._adjustPan;
			}

			return events;
		},

		_close: function () {
			if (this._map) {
				this._map.closePopup(this);
			}
		},

		_initLayout: function () {
			var prefix = 'leaflet-popup',
				containerClass = prefix + ' ' + this.options.className + ' leaflet-zoom-' +
				        (this._animated ? 'animated' : 'hide'),
				container = this._container = L.DomUtil.create('div', containerClass),
				closeButton;

			if (this.options.closeButton) {
				closeButton = this._closeButton =
				        L.DomUtil.create('a', prefix + '-close-button', container);
				closeButton.href = '#close';
				closeButton.innerHTML = '&#215;';
				L.DomEvent.disableClickPropagation(closeButton);

				L.DomEvent.on(closeButton, 'click', this._onCloseButtonClick, this);
			}

			var wrapper = this._wrapper =
			        L.DomUtil.create('div', prefix + '-content-wrapper', container);
			L.DomEvent.disableClickPropagation(wrapper);

			this._contentNode = L.DomUtil.create('div', prefix + '-content', wrapper);

			L.DomEvent.disableScrollPropagation(this._contentNode);
			L.DomEvent.on(wrapper, 'contextmenu', L.DomEvent.stopPropagation);

			this._tipContainer = L.DomUtil.create('div', prefix + '-tip-container', container);
			this._tip = L.DomUtil.create('div', prefix + '-tip', this._tipContainer);
		},

		_updateContent: function () {
			if (!this._content) { return; }

			if (typeof this._content === 'string') {
				this._contentNode.innerHTML = this._content;
			} else {
				while (this._contentNode.hasChildNodes()) {
					this._contentNode.removeChild(this._contentNode.firstChild);
				}
				this._contentNode.appendChild(this._content);
			}
			this.fire('contentupdate');
		},

		_updateLayout: function () {
			var container = this._contentNode,
			    style = container.style;

			style.width = '';
			style.whiteSpace = 'nowrap';

			var width = container.offsetWidth;
			width = Math.min(width, this.options.maxWidth);
			width = Math.max(width, this.options.minWidth);

			style.width = (width + 1) + 'px';
			style.whiteSpace = '';

			style.height = '';

			var height = container.offsetHeight,
			    maxHeight = this.options.maxHeight,
			    scrolledClass = 'leaflet-popup-scrolled';

			if (maxHeight && height > maxHeight) {
				style.height = maxHeight + 'px';
				L.DomUtil.addClass(container, scrolledClass);
			} else {
				L.DomUtil.removeClass(container, scrolledClass);
			}

			this._containerWidth = this._container.offsetWidth;
		},

		_updatePosition: function () {
			if (!this._map) { return; }

			var pos = this._map.latLngToLayerPoint(this._latlng),
			    animated = this._animated,
			    offset = L.point(this.options.offset);

			if (animated) {
				L.DomUtil.setPosition(this._container, pos);
			}

			this._containerBottom = -offset.y - (animated ? 0 : pos.y);
			this._containerLeft = -Math.round(this._containerWidth / 2) + offset.x + (animated ? 0 : pos.x);

			// bottom position the popup in case the height of the popup changes (images loading etc)
			this._container.style.bottom = this._containerBottom + 'px';
			this._container.style.left = this._containerLeft + 'px';
		},

		_zoomAnimation: function (opt) {
			var pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center);

			L.DomUtil.setPosition(this._container, pos);
		},

		_adjustPan: function () {
			if (!this.options.autoPan) { return; }

			var map = this._map,
			    containerHeight = this._container.offsetHeight,
			    containerWidth = this._containerWidth,

			    layerPos = new L.Point(this._containerLeft, -containerHeight - this._containerBottom);

			if (this._animated) {
				layerPos._add(L.DomUtil.getPosition(this._container));
			}

			var containerPos = map.layerPointToContainerPoint(layerPos),
			    padding = L.point(this.options.autoPanPadding),
			    paddingTL = L.point(this.options.autoPanPaddingTopLeft || padding),
			    paddingBR = L.point(this.options.autoPanPaddingBottomRight || padding),
			    size = map.getSize(),
			    dx = 0,
			    dy = 0;

			if (containerPos.x + containerWidth + paddingBR.x > size.x) { // right
				dx = containerPos.x + containerWidth - size.x + paddingBR.x;
			}
			if (containerPos.x - dx - paddingTL.x < 0) { // left
				dx = containerPos.x - paddingTL.x;
			}
			if (containerPos.y + containerHeight + paddingBR.y > size.y) { // bottom
				dy = containerPos.y + containerHeight - size.y + paddingBR.y;
			}
			if (containerPos.y - dy - paddingTL.y < 0) { // top
				dy = containerPos.y - paddingTL.y;
			}

			if (dx || dy) {
				map
				    .fire('autopanstart')
				    .panBy([dx, dy]);
			}
		},

		_onCloseButtonClick: function (e) {
			this._close();
			L.DomEvent.stop(e);
		}
	});

	L.popup = function (options, source) {
		return new L.Popup(options, source);
	};


	L.Map.include({
		openPopup: function (popup, latlng, options) { // (Popup) or (String || HTMLElement, LatLng[, Object])
			this.closePopup();

			if (!(popup instanceof L.Popup)) {
				var content = popup;

				popup = new L.Popup(options)
				    .setLatLng(latlng)
				    .setContent(content);
			}
			popup._isOpen = true;

			this._popup = popup;
			return this.addLayer(popup);
		},

		closePopup: function (popup) {
			if (!popup || popup === this._popup) {
				popup = this._popup;
				this._popup = null;
			}
			if (popup) {
				this.removeLayer(popup);
				popup._isOpen = false;
			}
			return this;
		}
	});


	/*
	 * Popup extension to L.Marker, adding popup-related methods.
	 */

	L.Marker.include({
		openPopup: function () {
			if (this._popup && this._map && !this._map.hasLayer(this._popup)) {
				this._popup.setLatLng(this._latlng);
				this._map.openPopup(this._popup);
			}

			return this;
		},

		closePopup: function () {
			if (this._popup) {
				this._popup._close();
			}
			return this;
		},

		togglePopup: function () {
			if (this._popup) {
				if (this._popup._isOpen) {
					this.closePopup();
				} else {
					this.openPopup();
				}
			}
			return this;
		},

		bindPopup: function (content, options) {
			var anchor = L.point(this.options.icon.options.popupAnchor || [0, 0]);

			anchor = anchor.add(L.Popup.prototype.options.offset);

			if (options && options.offset) {
				anchor = anchor.add(options.offset);
			}

			options = L.extend({offset: anchor}, options);

			if (!this._popupHandlersAdded) {
				this
				    .on('click', this.togglePopup, this)
				    .on('remove', this.closePopup, this)
				    .on('move', this._movePopup, this);
				this._popupHandlersAdded = true;
			}

			if (content instanceof L.Popup) {
				L.setOptions(content, options);
				this._popup = content;
			} else {
				this._popup = new L.Popup(options, this)
					.setContent(content);
			}

			return this;
		},

		setPopupContent: function (content) {
			if (this._popup) {
				this._popup.setContent(content);
			}
			return this;
		},

		unbindPopup: function () {
			if (this._popup) {
				this._popup = null;
				this
				    .off('click', this.togglePopup, this)
				    .off('remove', this.closePopup, this)
				    .off('move', this._movePopup, this);
				this._popupHandlersAdded = false;
			}
			return this;
		},

		getPopup: function () {
			return this._popup;
		},

		_movePopup: function (e) {
			this._popup.setLatLng(e.latlng);
		}
	});


	/*
	 * L.LayerGroup is a class to combine several layers into one so that
	 * you can manipulate the group (e.g. add/remove it) as one layer.
	 */

	L.LayerGroup = L.Class.extend({
		initialize: function (layers) {
			this._layers = {};

			var i, len;

			if (layers) {
				for (i = 0, len = layers.length; i < len; i++) {
					this.addLayer(layers[i]);
				}
			}
		},

		addLayer: function (layer) {
			var id = this.getLayerId(layer);

			this._layers[id] = layer;

			if (this._map) {
				this._map.addLayer(layer);
			}

			return this;
		},

		removeLayer: function (layer) {
			var id = layer in this._layers ? layer : this.getLayerId(layer);

			if (this._map && this._layers[id]) {
				this._map.removeLayer(this._layers[id]);
			}

			delete this._layers[id];

			return this;
		},

		hasLayer: function (layer) {
			if (!layer) { return false; }

			return (layer in this._layers || this.getLayerId(layer) in this._layers);
		},

		clearLayers: function () {
			this.eachLayer(this.removeLayer, this);
			return this;
		},

		invoke: function (methodName) {
			var args = Array.prototype.slice.call(arguments, 1),
			    i, layer;

			for (i in this._layers) {
				layer = this._layers[i];

				if (layer[methodName]) {
					layer[methodName].apply(layer, args);
				}
			}

			return this;
		},

		onAdd: function (map) {
			this._map = map;
			this.eachLayer(map.addLayer, map);
		},

		onRemove: function (map) {
			this.eachLayer(map.removeLayer, map);
			this._map = null;
		},

		addTo: function (map) {
			map.addLayer(this);
			return this;
		},

		eachLayer: function (method, context) {
			for (var i in this._layers) {
				method.call(context, this._layers[i]);
			}
			return this;
		},

		getLayer: function (id) {
			return this._layers[id];
		},

		getLayers: function () {
			var layers = [];

			for (var i in this._layers) {
				layers.push(this._layers[i]);
			}
			return layers;
		},

		setZIndex: function (zIndex) {
			return this.invoke('setZIndex', zIndex);
		},

		getLayerId: function (layer) {
			return L.stamp(layer);
		}
	});

	L.layerGroup = function (layers) {
		return new L.LayerGroup(layers);
	};


	/*
	 * L.FeatureGroup extends L.LayerGroup by introducing mouse events and additional methods
	 * shared between a group of interactive layers (like vectors or markers).
	 */

	L.FeatureGroup = L.LayerGroup.extend({
		includes: L.Mixin.Events,

		statics: {
			EVENTS: 'click dblclick mouseover mouseout mousemove contextmenu popupopen popupclose'
		},

		addLayer: function (layer) {
			if (this.hasLayer(layer)) {
				return this;
			}

			if ('on' in layer) {
				layer.on(L.FeatureGroup.EVENTS, this._propagateEvent, this);
			}

			L.LayerGroup.prototype.addLayer.call(this, layer);

			if (this._popupContent && layer.bindPopup) {
				layer.bindPopup(this._popupContent, this._popupOptions);
			}

			return this.fire('layeradd', {layer: layer});
		},

		removeLayer: function (layer) {
			if (!this.hasLayer(layer)) {
				return this;
			}
			if (layer in this._layers) {
				layer = this._layers[layer];
			}

			layer.off(L.FeatureGroup.EVENTS, this._propagateEvent, this);

			L.LayerGroup.prototype.removeLayer.call(this, layer);

			if (this._popupContent) {
				this.invoke('unbindPopup');
			}

			return this.fire('layerremove', {layer: layer});
		},

		bindPopup: function (content, options) {
			this._popupContent = content;
			this._popupOptions = options;
			return this.invoke('bindPopup', content, options);
		},

		openPopup: function (latlng) {
			// open popup on the first layer
			for (var id in this._layers) {
				this._layers[id].openPopup(latlng);
				break;
			}
			return this;
		},

		setStyle: function (style) {
			return this.invoke('setStyle', style);
		},

		bringToFront: function () {
			return this.invoke('bringToFront');
		},

		bringToBack: function () {
			return this.invoke('bringToBack');
		},

		getBounds: function () {
			var bounds = new L.LatLngBounds();

			this.eachLayer(function (layer) {
				bounds.extend(layer instanceof L.Marker ? layer.getLatLng() : layer.getBounds());
			});

			return bounds;
		},

		_propagateEvent: function (e) {
			e = L.extend({
				layer: e.target,
				target: this
			}, e);
			this.fire(e.type, e);
		}
	});

	L.featureGroup = function (layers) {
		return new L.FeatureGroup(layers);
	};


	/*
	 * L.Path is a base class for rendering vector paths on a map. Inherited by Polyline, Circle, etc.
	 */

	L.Path = L.Class.extend({
		includes: [L.Mixin.Events],

		statics: {
			// how much to extend the clip area around the map view
			// (relative to its size, e.g. 0.5 is half the screen in each direction)
			// set it so that SVG element doesn't exceed 1280px (vectors flicker on dragend if it is)
			CLIP_PADDING: (function () {
				var max = L.Browser.mobile ? 1280 : 2000,
				    target = (max / Math.max(window.outerWidth, window.outerHeight) - 1) / 2;
				return Math.max(0, Math.min(0.5, target));
			})()
		},

		options: {
			stroke: true,
			color: '#0033ff',
			dashArray: null,
			lineCap: null,
			lineJoin: null,
			weight: 5,
			opacity: 0.5,

			fill: false,
			fillColor: null, //same as color by default
			fillOpacity: 0.2,

			clickable: true
		},

		initialize: function (options) {
			L.setOptions(this, options);
		},

		onAdd: function (map) {
			this._map = map;

			if (!this._container) {
				this._initElements();
				this._initEvents();
			}

			this.projectLatlngs();
			this._updatePath();

			if (this._container) {
				this._map._pathRoot.appendChild(this._container);
			}

			this.fire('add');

			map.on({
				'viewreset': this.projectLatlngs,
				'moveend': this._updatePath
			}, this);
		},

		addTo: function (map) {
			map.addLayer(this);
			return this;
		},

		onRemove: function (map) {
			map._pathRoot.removeChild(this._container);

			// Need to fire remove event before we set _map to null as the event hooks might need the object
			this.fire('remove');
			this._map = null;

			if (L.Browser.vml) {
				this._container = null;
				this._stroke = null;
				this._fill = null;
			}

			map.off({
				'viewreset': this.projectLatlngs,
				'moveend': this._updatePath
			}, this);
		},

		projectLatlngs: function () {
			// do all projection stuff here
		},

		setStyle: function (style) {
			L.setOptions(this, style);

			if (this._container) {
				this._updateStyle();
			}

			return this;
		},

		redraw: function () {
			if (this._map) {
				this.projectLatlngs();
				this._updatePath();
			}
			return this;
		}
	});

	L.Map.include({
		_updatePathViewport: function () {
			var p = L.Path.CLIP_PADDING,
			    size = this.getSize(),
			    panePos = L.DomUtil.getPosition(this._mapPane),
			    min = panePos.multiplyBy(-1)._subtract(size.multiplyBy(p)._round()),
			    max = min.add(size.multiplyBy(1 + p * 2)._round());

			this._pathViewport = new L.Bounds(min, max);
		}
	});


	/*
	 * Extends L.Path with SVG-specific rendering code.
	 */

	L.Path.SVG_NS = 'http://www.w3.org/2000/svg';

	L.Browser.svg = !!(document.createElementNS && document.createElementNS(L.Path.SVG_NS, 'svg').createSVGRect);

	L.Path = L.Path.extend({
		statics: {
			SVG: L.Browser.svg
		},

		bringToFront: function () {
			var root = this._map._pathRoot,
			    path = this._container;

			if (path && root.lastChild !== path) {
				root.appendChild(path);
			}
			return this;
		},

		bringToBack: function () {
			var root = this._map._pathRoot,
			    path = this._container,
			    first = root.firstChild;

			if (path && first !== path) {
				root.insertBefore(path, first);
			}
			return this;
		},

		getPathString: function () {
			// form path string here
		},

		_createElement: function (name) {
			return document.createElementNS(L.Path.SVG_NS, name);
		},

		_initElements: function () {
			this._map._initPathRoot();
			this._initPath();
			this._initStyle();
		},

		_initPath: function () {
			this._container = this._createElement('g');

			this._path = this._createElement('path');

			if (this.options.className) {
				L.DomUtil.addClass(this._path, this.options.className);
			}

			this._container.appendChild(this._path);
		},

		_initStyle: function () {
			if (this.options.stroke) {
				this._path.setAttribute('stroke-linejoin', 'round');
				this._path.setAttribute('stroke-linecap', 'round');
			}
			if (this.options.fill) {
				this._path.setAttribute('fill-rule', 'evenodd');
			}
			if (this.options.pointerEvents) {
				this._path.setAttribute('pointer-events', this.options.pointerEvents);
			}
			if (!this.options.clickable && !this.options.pointerEvents) {
				this._path.setAttribute('pointer-events', 'none');
			}
			this._updateStyle();
		},

		_updateStyle: function () {
			if (this.options.stroke) {
				this._path.setAttribute('stroke', this.options.color);
				this._path.setAttribute('stroke-opacity', this.options.opacity);
				this._path.setAttribute('stroke-width', this.options.weight);
				if (this.options.dashArray) {
					this._path.setAttribute('stroke-dasharray', this.options.dashArray);
				} else {
					this._path.removeAttribute('stroke-dasharray');
				}
				if (this.options.lineCap) {
					this._path.setAttribute('stroke-linecap', this.options.lineCap);
				}
				if (this.options.lineJoin) {
					this._path.setAttribute('stroke-linejoin', this.options.lineJoin);
				}
			} else {
				this._path.setAttribute('stroke', 'none');
			}
			if (this.options.fill) {
				this._path.setAttribute('fill', this.options.fillColor || this.options.color);
				this._path.setAttribute('fill-opacity', this.options.fillOpacity);
			} else {
				this._path.setAttribute('fill', 'none');
			}
		},

		_updatePath: function () {
			var str = this.getPathString();
			if (!str) {
				// fix webkit empty string parsing bug
				str = 'M0 0';
			}
			this._path.setAttribute('d', str);
		},

		// TODO remove duplication with L.Map
		_initEvents: function () {
			if (this.options.clickable) {
				if (L.Browser.svg || !L.Browser.vml) {
					L.DomUtil.addClass(this._path, 'leaflet-clickable');
				}

				L.DomEvent.on(this._container, 'click', this._onMouseClick, this);

				var events = ['dblclick', 'mousedown', 'mouseover',
				              'mouseout', 'mousemove', 'contextmenu'];
				for (var i = 0; i < events.length; i++) {
					L.DomEvent.on(this._container, events[i], this._fireMouseEvent, this);
				}
			}
		},

		_onMouseClick: function (e) {
			if (this._map.dragging && this._map.dragging.moved()) { return; }

			this._fireMouseEvent(e);
		},

		_fireMouseEvent: function (e) {
			if (!this.hasEventListeners(e.type)) { return; }

			var map = this._map,
			    containerPoint = map.mouseEventToContainerPoint(e),
			    layerPoint = map.containerPointToLayerPoint(containerPoint),
			    latlng = map.layerPointToLatLng(layerPoint);

			this.fire(e.type, {
				latlng: latlng,
				layerPoint: layerPoint,
				containerPoint: containerPoint,
				originalEvent: e
			});

			if (e.type === 'contextmenu') {
				L.DomEvent.preventDefault(e);
			}
			if (e.type !== 'mousemove') {
				L.DomEvent.stopPropagation(e);
			}
		}
	});

	L.Map.include({
		_initPathRoot: function () {
			if (!this._pathRoot) {
				this._pathRoot = L.Path.prototype._createElement('svg');
				this._panes.overlayPane.appendChild(this._pathRoot);

				if (this.options.zoomAnimation && L.Browser.any3d) {
					L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-animated');

					this.on({
						'zoomanim': this._animatePathZoom,
						'zoomend': this._endPathZoom
					});
				} else {
					L.DomUtil.addClass(this._pathRoot, 'leaflet-zoom-hide');
				}

				this.on('moveend', this._updateSvgViewport);
				this._updateSvgViewport();
			}
		},

		_animatePathZoom: function (e) {
			var scale = this.getZoomScale(e.zoom),
			    offset = this._getCenterOffset(e.center)._multiplyBy(-scale)._add(this._pathViewport.min);

			this._pathRoot.style[L.DomUtil.TRANSFORM] =
			        L.DomUtil.getTranslateString(offset) + ' scale(' + scale + ') ';

			this._pathZooming = true;
		},

		_endPathZoom: function () {
			this._pathZooming = false;
		},

		_updateSvgViewport: function () {

			if (this._pathZooming) {
				// Do not update SVGs while a zoom animation is going on otherwise the animation will break.
				// When the zoom animation ends we will be updated again anyway
				// This fixes the case where you do a momentum move and zoom while the move is still ongoing.
				return;
			}

			this._updatePathViewport();

			var vp = this._pathViewport,
			    min = vp.min,
			    max = vp.max,
			    width = max.x - min.x,
			    height = max.y - min.y,
			    root = this._pathRoot,
			    pane = this._panes.overlayPane;

			// Hack to make flicker on drag end on mobile webkit less irritating
			if (L.Browser.mobileWebkit) {
				pane.removeChild(root);
			}

			L.DomUtil.setPosition(root, min);
			root.setAttribute('width', width);
			root.setAttribute('height', height);
			root.setAttribute('viewBox', [min.x, min.y, width, height].join(' '));

			if (L.Browser.mobileWebkit) {
				pane.appendChild(root);
			}
		}
	});


	/*
	 * Popup extension to L.Path (polylines, polygons, circles), adding popup-related methods.
	 */

	L.Path.include({

		bindPopup: function (content, options) {

			if (content instanceof L.Popup) {
				this._popup = content;
			} else {
				if (!this._popup || options) {
					this._popup = new L.Popup(options, this);
				}
				this._popup.setContent(content);
			}

			if (!this._popupHandlersAdded) {
				this
				    .on('click', this._openPopup, this)
				    .on('remove', this.closePopup, this);

				this._popupHandlersAdded = true;
			}

			return this;
		},

		unbindPopup: function () {
			if (this._popup) {
				this._popup = null;
				this
				    .off('click', this._openPopup)
				    .off('remove', this.closePopup);

				this._popupHandlersAdded = false;
			}
			return this;
		},

		openPopup: function (latlng) {

			if (this._popup) {
				// open the popup from one of the path's points if not specified
				latlng = latlng || this._latlng ||
				         this._latlngs[Math.floor(this._latlngs.length / 2)];

				this._openPopup({latlng: latlng});
			}

			return this;
		},

		closePopup: function () {
			if (this._popup) {
				this._popup._close();
			}
			return this;
		},

		_openPopup: function (e) {
			this._popup.setLatLng(e.latlng);
			this._map.openPopup(this._popup);
		}
	});


	/*
	 * Vector rendering for IE6-8 through VML.
	 * Thanks to Dmitry Baranovsky and his Raphael library for inspiration!
	 */

	L.Browser.vml = !L.Browser.svg && (function () {
		try {
			var div = document.createElement('div');
			div.innerHTML = '<v:shape adj="1"/>';

			var shape = div.firstChild;
			shape.style.behavior = 'url(#default#VML)';

			return shape && (typeof shape.adj === 'object');

		} catch (e) {
			return false;
		}
	}());

	L.Path = L.Browser.svg || !L.Browser.vml ? L.Path : L.Path.extend({
		statics: {
			VML: true,
			CLIP_PADDING: 0.02
		},

		_createElement: (function () {
			try {
				document.namespaces.add('lvml', 'urn:schemas-microsoft-com:vml');
				return function (name) {
					return document.createElement('<lvml:' + name + ' class="lvml">');
				};
			} catch (e) {
				return function (name) {
					return document.createElement(
					        '<' + name + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');
				};
			}
		}()),

		_initPath: function () {
			var container = this._container = this._createElement('shape');

			L.DomUtil.addClass(container, 'leaflet-vml-shape' +
				(this.options.className ? ' ' + this.options.className : ''));

			if (this.options.clickable) {
				L.DomUtil.addClass(container, 'leaflet-clickable');
			}

			container.coordsize = '1 1';

			this._path = this._createElement('path');
			container.appendChild(this._path);

			this._map._pathRoot.appendChild(container);
		},

		_initStyle: function () {
			this._updateStyle();
		},

		_updateStyle: function () {
			var stroke = this._stroke,
			    fill = this._fill,
			    options = this.options,
			    container = this._container;

			container.stroked = options.stroke;
			container.filled = options.fill;

			if (options.stroke) {
				if (!stroke) {
					stroke = this._stroke = this._createElement('stroke');
					stroke.endcap = 'round';
					container.appendChild(stroke);
				}
				stroke.weight = options.weight + 'px';
				stroke.color = options.color;
				stroke.opacity = options.opacity;

				if (options.dashArray) {
					stroke.dashStyle = L.Util.isArray(options.dashArray) ?
					    options.dashArray.join(' ') :
					    options.dashArray.replace(/( *, *)/g, ' ');
				} else {
					stroke.dashStyle = '';
				}
				if (options.lineCap) {
					stroke.endcap = options.lineCap.replace('butt', 'flat');
				}
				if (options.lineJoin) {
					stroke.joinstyle = options.lineJoin;
				}

			} else if (stroke) {
				container.removeChild(stroke);
				this._stroke = null;
			}

			if (options.fill) {
				if (!fill) {
					fill = this._fill = this._createElement('fill');
					container.appendChild(fill);
				}
				fill.color = options.fillColor || options.color;
				fill.opacity = options.fillOpacity;

			} else if (fill) {
				container.removeChild(fill);
				this._fill = null;
			}
		},

		_updatePath: function () {
			var style = this._container.style;

			style.display = 'none';
			this._path.v = this.getPathString() + ' '; // the space fixes IE empty path string bug
			style.display = '';
		}
	});

	L.Map.include(L.Browser.svg || !L.Browser.vml ? {} : {
		_initPathRoot: function () {
			if (this._pathRoot) { return; }

			var root = this._pathRoot = document.createElement('div');
			root.className = 'leaflet-vml-container';
			this._panes.overlayPane.appendChild(root);

			this.on('moveend', this._updatePathViewport);
			this._updatePathViewport();
		}
	});


	/*
	 * Vector rendering for all browsers that support canvas.
	 */

	L.Browser.canvas = (function () {
		return !!document.createElement('canvas').getContext;
	}());

	L.Path = (L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? L.Path : L.Path.extend({
		statics: {
			//CLIP_PADDING: 0.02, // not sure if there's a need to set it to a small value
			CANVAS: true,
			SVG: false
		},

		redraw: function () {
			if (this._map) {
				this.projectLatlngs();
				this._requestUpdate();
			}
			return this;
		},

		setStyle: function (style) {
			L.setOptions(this, style);

			if (this._map) {
				this._updateStyle();
				this._requestUpdate();
			}
			return this;
		},

		onRemove: function (map) {
			map
			    .off('viewreset', this.projectLatlngs, this)
			    .off('moveend', this._updatePath, this);

			if (this.options.clickable) {
				this._map.off('click', this._onClick, this);
				this._map.off('mousemove', this._onMouseMove, this);
			}

			this._requestUpdate();
			
			this.fire('remove');
			this._map = null;
		},

		_requestUpdate: function () {
			if (this._map && !L.Path._updateRequest) {
				L.Path._updateRequest = L.Util.requestAnimFrame(this._fireMapMoveEnd, this._map);
			}
		},

		_fireMapMoveEnd: function () {
			L.Path._updateRequest = null;
			this.fire('moveend');
		},

		_initElements: function () {
			this._map._initPathRoot();
			this._ctx = this._map._canvasCtx;
		},

		_updateStyle: function () {
			var options = this.options;

			if (options.stroke) {
				this._ctx.lineWidth = options.weight;
				this._ctx.strokeStyle = options.color;
			}
			if (options.fill) {
				this._ctx.fillStyle = options.fillColor || options.color;
			}
		},

		_drawPath: function () {
			var i, j, len, len2, point, drawMethod;

			this._ctx.beginPath();

			for (i = 0, len = this._parts.length; i < len; i++) {
				for (j = 0, len2 = this._parts[i].length; j < len2; j++) {
					point = this._parts[i][j];
					drawMethod = (j === 0 ? 'move' : 'line') + 'To';

					this._ctx[drawMethod](point.x, point.y);
				}
				// TODO refactor ugly hack
				if (this instanceof L.Polygon) {
					this._ctx.closePath();
				}
			}
		},

		_checkIfEmpty: function () {
			return !this._parts.length;
		},

		_updatePath: function () {
			if (this._checkIfEmpty()) { return; }

			var ctx = this._ctx,
			    options = this.options;

			this._drawPath();
			ctx.save();
			this._updateStyle();

			if (options.fill) {
				ctx.globalAlpha = options.fillOpacity;
				ctx.fill();
			}

			if (options.stroke) {
				ctx.globalAlpha = options.opacity;
				ctx.stroke();
			}

			ctx.restore();

			// TODO optimization: 1 fill/stroke for all features with equal style instead of 1 for each feature
		},

		_initEvents: function () {
			if (this.options.clickable) {
				// TODO dblclick
				this._map.on('mousemove', this._onMouseMove, this);
				this._map.on('click', this._onClick, this);
			}
		},

		_onClick: function (e) {
			if (this._containsPoint(e.layerPoint)) {
				this.fire('click', e);
			}
		},

		_onMouseMove: function (e) {
			if (!this._map || this._map._animatingZoom) { return; }

			// TODO don't do on each move
			if (this._containsPoint(e.layerPoint)) {
				this._ctx.canvas.style.cursor = 'pointer';
				this._mouseInside = true;
				this.fire('mouseover', e);

			} else if (this._mouseInside) {
				this._ctx.canvas.style.cursor = '';
				this._mouseInside = false;
				this.fire('mouseout', e);
			}
		}
	});

	L.Map.include((L.Path.SVG && !window.L_PREFER_CANVAS) || !L.Browser.canvas ? {} : {
		_initPathRoot: function () {
			var root = this._pathRoot,
			    ctx;

			if (!root) {
				root = this._pathRoot = document.createElement('canvas');
				root.style.position = 'absolute';
				ctx = this._canvasCtx = root.getContext('2d');

				ctx.lineCap = 'round';
				ctx.lineJoin = 'round';

				this._panes.overlayPane.appendChild(root);

				if (this.options.zoomAnimation) {
					this._pathRoot.className = 'leaflet-zoom-animated';
					this.on('zoomanim', this._animatePathZoom);
					this.on('zoomend', this._endPathZoom);
				}
				this.on('moveend', this._updateCanvasViewport);
				this._updateCanvasViewport();
			}
		},

		_updateCanvasViewport: function () {
			// don't redraw while zooming. See _updateSvgViewport for more details
			if (this._pathZooming) { return; }
			this._updatePathViewport();

			var vp = this._pathViewport,
			    min = vp.min,
			    size = vp.max.subtract(min),
			    root = this._pathRoot;

			//TODO check if this works properly on mobile webkit
			L.DomUtil.setPosition(root, min);
			root.width = size.x;
			root.height = size.y;
			root.getContext('2d').translate(-min.x, -min.y);
		}
	});


	/*
	 * L.LineUtil contains different utility functions for line segments
	 * and polylines (clipping, simplification, distances, etc.)
	 */

	/*jshint bitwise:false */ // allow bitwise operations for this file

	L.LineUtil = {

		// Simplify polyline with vertex reduction and Douglas-Peucker simplification.
		// Improves rendering performance dramatically by lessening the number of points to draw.

		simplify: function (/*Point[]*/ points, /*Number*/ tolerance) {
			if (!tolerance || !points.length) {
				return points.slice();
			}

			var sqTolerance = tolerance * tolerance;

			// stage 1: vertex reduction
			points = this._reducePoints(points, sqTolerance);

			// stage 2: Douglas-Peucker simplification
			points = this._simplifyDP(points, sqTolerance);

			return points;
		},

		// distance from a point to a segment between two points
		pointToSegmentDistance:  function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
			return Math.sqrt(this._sqClosestPointOnSegment(p, p1, p2, true));
		},

		closestPointOnSegment: function (/*Point*/ p, /*Point*/ p1, /*Point*/ p2) {
			return this._sqClosestPointOnSegment(p, p1, p2);
		},

		// Douglas-Peucker simplification, see http://en.wikipedia.org/wiki/Douglas-Peucker_algorithm
		_simplifyDP: function (points, sqTolerance) {

			var len = points.length,
			    ArrayConstructor = typeof Uint8Array !== undefined + '' ? Uint8Array : Array,
			    markers = new ArrayConstructor(len);

			markers[0] = markers[len - 1] = 1;

			this._simplifyDPStep(points, markers, sqTolerance, 0, len - 1);

			var i,
			    newPoints = [];

			for (i = 0; i < len; i++) {
				if (markers[i]) {
					newPoints.push(points[i]);
				}
			}

			return newPoints;
		},

		_simplifyDPStep: function (points, markers, sqTolerance, first, last) {

			var maxSqDist = 0,
			    index, i, sqDist;

			for (i = first + 1; i <= last - 1; i++) {
				sqDist = this._sqClosestPointOnSegment(points[i], points[first], points[last], true);

				if (sqDist > maxSqDist) {
					index = i;
					maxSqDist = sqDist;
				}
			}

			if (maxSqDist > sqTolerance) {
				markers[index] = 1;

				this._simplifyDPStep(points, markers, sqTolerance, first, index);
				this._simplifyDPStep(points, markers, sqTolerance, index, last);
			}
		},

		// reduce points that are too close to each other to a single point
		_reducePoints: function (points, sqTolerance) {
			var reducedPoints = [points[0]];

			for (var i = 1, prev = 0, len = points.length; i < len; i++) {
				if (this._sqDist(points[i], points[prev]) > sqTolerance) {
					reducedPoints.push(points[i]);
					prev = i;
				}
			}
			if (prev < len - 1) {
				reducedPoints.push(points[len - 1]);
			}
			return reducedPoints;
		},

		// Cohen-Sutherland line clipping algorithm.
		// Used to avoid rendering parts of a polyline that are not currently visible.

		clipSegment: function (a, b, bounds, useLastCode) {
			var codeA = useLastCode ? this._lastCode : this._getBitCode(a, bounds),
			    codeB = this._getBitCode(b, bounds),

			    codeOut, p, newCode;

			// save 2nd code to avoid calculating it on the next segment
			this._lastCode = codeB;

			while (true) {
				// if a,b is inside the clip window (trivial accept)
				if (!(codeA | codeB)) {
					return [a, b];
				// if a,b is outside the clip window (trivial reject)
				} else if (codeA & codeB) {
					return false;
				// other cases
				} else {
					codeOut = codeA || codeB;
					p = this._getEdgeIntersection(a, b, codeOut, bounds);
					newCode = this._getBitCode(p, bounds);

					if (codeOut === codeA) {
						a = p;
						codeA = newCode;
					} else {
						b = p;
						codeB = newCode;
					}
				}
			}
		},

		_getEdgeIntersection: function (a, b, code, bounds) {
			var dx = b.x - a.x,
			    dy = b.y - a.y,
			    min = bounds.min,
			    max = bounds.max;

			if (code & 8) { // top
				return new L.Point(a.x + dx * (max.y - a.y) / dy, max.y);
			} else if (code & 4) { // bottom
				return new L.Point(a.x + dx * (min.y - a.y) / dy, min.y);
			} else if (code & 2) { // right
				return new L.Point(max.x, a.y + dy * (max.x - a.x) / dx);
			} else if (code & 1) { // left
				return new L.Point(min.x, a.y + dy * (min.x - a.x) / dx);
			}
		},

		_getBitCode: function (/*Point*/ p, bounds) {
			var code = 0;

			if (p.x < bounds.min.x) { // left
				code |= 1;
			} else if (p.x > bounds.max.x) { // right
				code |= 2;
			}
			if (p.y < bounds.min.y) { // bottom
				code |= 4;
			} else if (p.y > bounds.max.y) { // top
				code |= 8;
			}

			return code;
		},

		// square distance (to avoid unnecessary Math.sqrt calls)
		_sqDist: function (p1, p2) {
			var dx = p2.x - p1.x,
			    dy = p2.y - p1.y;
			return dx * dx + dy * dy;
		},

		// return closest point on segment or distance to that point
		_sqClosestPointOnSegment: function (p, p1, p2, sqDist) {
			var x = p1.x,
			    y = p1.y,
			    dx = p2.x - x,
			    dy = p2.y - y,
			    dot = dx * dx + dy * dy,
			    t;

			if (dot > 0) {
				t = ((p.x - x) * dx + (p.y - y) * dy) / dot;

				if (t > 1) {
					x = p2.x;
					y = p2.y;
				} else if (t > 0) {
					x += dx * t;
					y += dy * t;
				}
			}

			dx = p.x - x;
			dy = p.y - y;

			return sqDist ? dx * dx + dy * dy : new L.Point(x, y);
		}
	};


	/*
	 * L.Polyline is used to display polylines on a map.
	 */

	L.Polyline = L.Path.extend({
		initialize: function (latlngs, options) {
			L.Path.prototype.initialize.call(this, options);

			this._latlngs = this._convertLatLngs(latlngs);
		},

		options: {
			// how much to simplify the polyline on each zoom level
			// more = better performance and smoother look, less = more accurate
			smoothFactor: 1.0,
			noClip: false
		},

		projectLatlngs: function () {
			this._originalPoints = [];

			for (var i = 0, len = this._latlngs.length; i < len; i++) {
				this._originalPoints[i] = this._map.latLngToLayerPoint(this._latlngs[i]);
			}
		},

		getPathString: function () {
			for (var i = 0, len = this._parts.length, str = ''; i < len; i++) {
				str += this._getPathPartStr(this._parts[i]);
			}
			return str;
		},

		getLatLngs: function () {
			return this._latlngs;
		},

		setLatLngs: function (latlngs) {
			this._latlngs = this._convertLatLngs(latlngs);
			return this.redraw();
		},

		addLatLng: function (latlng) {
			this._latlngs.push(L.latLng(latlng));
			return this.redraw();
		},

		spliceLatLngs: function () { // (Number index, Number howMany)
			var removed = [].splice.apply(this._latlngs, arguments);
			this._convertLatLngs(this._latlngs, true);
			this.redraw();
			return removed;
		},

		closestLayerPoint: function (p) {
			var minDistance = Infinity, parts = this._parts, p1, p2, minPoint = null;

			for (var j = 0, jLen = parts.length; j < jLen; j++) {
				var points = parts[j];
				for (var i = 1, len = points.length; i < len; i++) {
					p1 = points[i - 1];
					p2 = points[i];
					var sqDist = L.LineUtil._sqClosestPointOnSegment(p, p1, p2, true);
					if (sqDist < minDistance) {
						minDistance = sqDist;
						minPoint = L.LineUtil._sqClosestPointOnSegment(p, p1, p2);
					}
				}
			}
			if (minPoint) {
				minPoint.distance = Math.sqrt(minDistance);
			}
			return minPoint;
		},

		getBounds: function () {
			return new L.LatLngBounds(this.getLatLngs());
		},

		_convertLatLngs: function (latlngs, overwrite) {
			var i, len, target = overwrite ? latlngs : [];

			for (i = 0, len = latlngs.length; i < len; i++) {
				if (L.Util.isArray(latlngs[i]) && typeof latlngs[i][0] !== 'number') {
					return;
				}
				target[i] = L.latLng(latlngs[i]);
			}
			return target;
		},

		_initEvents: function () {
			L.Path.prototype._initEvents.call(this);
		},

		_getPathPartStr: function (points) {
			var round = L.Path.VML;

			for (var j = 0, len2 = points.length, str = '', p; j < len2; j++) {
				p = points[j];
				if (round) {
					p._round();
				}
				str += (j ? 'L' : 'M') + p.x + ' ' + p.y;
			}
			return str;
		},

		_clipPoints: function () {
			var points = this._originalPoints,
			    len = points.length,
			    i, k, segment;

			if (this.options.noClip) {
				this._parts = [points];
				return;
			}

			this._parts = [];

			var parts = this._parts,
			    vp = this._map._pathViewport,
			    lu = L.LineUtil;

			for (i = 0, k = 0; i < len - 1; i++) {
				segment = lu.clipSegment(points[i], points[i + 1], vp, i);
				if (!segment) {
					continue;
				}

				parts[k] = parts[k] || [];
				parts[k].push(segment[0]);

				// if segment goes out of screen, or it's the last one, it's the end of the line part
				if ((segment[1] !== points[i + 1]) || (i === len - 2)) {
					parts[k].push(segment[1]);
					k++;
				}
			}
		},

		// simplify each clipped part of the polyline
		_simplifyPoints: function () {
			var parts = this._parts,
			    lu = L.LineUtil;

			for (var i = 0, len = parts.length; i < len; i++) {
				parts[i] = lu.simplify(parts[i], this.options.smoothFactor);
			}
		},

		_updatePath: function () {
			if (!this._map) { return; }

			this._clipPoints();
			this._simplifyPoints();

			L.Path.prototype._updatePath.call(this);
		}
	});

	L.polyline = function (latlngs, options) {
		return new L.Polyline(latlngs, options);
	};


	/*
	 * L.PolyUtil contains utility functions for polygons (clipping, etc.).
	 */

	/*jshint bitwise:false */ // allow bitwise operations here

	L.PolyUtil = {};

	/*
	 * Sutherland-Hodgeman polygon clipping algorithm.
	 * Used to avoid rendering parts of a polygon that are not currently visible.
	 */
	L.PolyUtil.clipPolygon = function (points, bounds) {
		var clippedPoints,
		    edges = [1, 4, 2, 8],
		    i, j, k,
		    a, b,
		    len, edge, p,
		    lu = L.LineUtil;

		for (i = 0, len = points.length; i < len; i++) {
			points[i]._code = lu._getBitCode(points[i], bounds);
		}

		// for each edge (left, bottom, right, top)
		for (k = 0; k < 4; k++) {
			edge = edges[k];
			clippedPoints = [];

			for (i = 0, len = points.length, j = len - 1; i < len; j = i++) {
				a = points[i];
				b = points[j];

				// if a is inside the clip window
				if (!(a._code & edge)) {
					// if b is outside the clip window (a->b goes out of screen)
					if (b._code & edge) {
						p = lu._getEdgeIntersection(b, a, edge, bounds);
						p._code = lu._getBitCode(p, bounds);
						clippedPoints.push(p);
					}
					clippedPoints.push(a);

				// else if b is inside the clip window (a->b enters the screen)
				} else if (!(b._code & edge)) {
					p = lu._getEdgeIntersection(b, a, edge, bounds);
					p._code = lu._getBitCode(p, bounds);
					clippedPoints.push(p);
				}
			}
			points = clippedPoints;
		}

		return points;
	};


	/*
	 * L.Polygon is used to display polygons on a map.
	 */

	L.Polygon = L.Polyline.extend({
		options: {
			fill: true
		},

		initialize: function (latlngs, options) {
			L.Polyline.prototype.initialize.call(this, latlngs, options);
			this._initWithHoles(latlngs);
		},

		_initWithHoles: function (latlngs) {
			var i, len, hole;
			if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
				this._latlngs = this._convertLatLngs(latlngs[0]);
				this._holes = latlngs.slice(1);

				for (i = 0, len = this._holes.length; i < len; i++) {
					hole = this._holes[i] = this._convertLatLngs(this._holes[i]);
					if (hole[0].equals(hole[hole.length - 1])) {
						hole.pop();
					}
				}
			}

			// filter out last point if its equal to the first one
			latlngs = this._latlngs;

			if (latlngs.length >= 2 && latlngs[0].equals(latlngs[latlngs.length - 1])) {
				latlngs.pop();
			}
		},

		projectLatlngs: function () {
			L.Polyline.prototype.projectLatlngs.call(this);

			// project polygon holes points
			// TODO move this logic to Polyline to get rid of duplication
			this._holePoints = [];

			if (!this._holes) { return; }

			var i, j, len, len2;

			for (i = 0, len = this._holes.length; i < len; i++) {
				this._holePoints[i] = [];

				for (j = 0, len2 = this._holes[i].length; j < len2; j++) {
					this._holePoints[i][j] = this._map.latLngToLayerPoint(this._holes[i][j]);
				}
			}
		},

		setLatLngs: function (latlngs) {
			if (latlngs && L.Util.isArray(latlngs[0]) && (typeof latlngs[0][0] !== 'number')) {
				this._initWithHoles(latlngs);
				return this.redraw();
			} else {
				return L.Polyline.prototype.setLatLngs.call(this, latlngs);
			}
		},

		_clipPoints: function () {
			var points = this._originalPoints,
			    newParts = [];

			this._parts = [points].concat(this._holePoints);

			if (this.options.noClip) { return; }

			for (var i = 0, len = this._parts.length; i < len; i++) {
				var clipped = L.PolyUtil.clipPolygon(this._parts[i], this._map._pathViewport);
				if (clipped.length) {
					newParts.push(clipped);
				}
			}

			this._parts = newParts;
		},

		_getPathPartStr: function (points) {
			var str = L.Polyline.prototype._getPathPartStr.call(this, points);
			return str + (L.Browser.svg ? 'z' : 'x');
		}
	});

	L.polygon = function (latlngs, options) {
		return new L.Polygon(latlngs, options);
	};


	/*
	 * Contains L.MultiPolyline and L.MultiPolygon layers.
	 */

	(function () {
		function createMulti(Klass) {

			return L.FeatureGroup.extend({

				initialize: function (latlngs, options) {
					this._layers = {};
					this._options = options;
					this.setLatLngs(latlngs);
				},

				setLatLngs: function (latlngs) {
					var i = 0,
					    len = latlngs.length;

					this.eachLayer(function (layer) {
						if (i < len) {
							layer.setLatLngs(latlngs[i++]);
						} else {
							this.removeLayer(layer);
						}
					}, this);

					while (i < len) {
						this.addLayer(new Klass(latlngs[i++], this._options));
					}

					return this;
				},

				getLatLngs: function () {
					var latlngs = [];

					this.eachLayer(function (layer) {
						latlngs.push(layer.getLatLngs());
					});

					return latlngs;
				}
			});
		}

		L.MultiPolyline = createMulti(L.Polyline);
		L.MultiPolygon = createMulti(L.Polygon);

		L.multiPolyline = function (latlngs, options) {
			return new L.MultiPolyline(latlngs, options);
		};

		L.multiPolygon = function (latlngs, options) {
			return new L.MultiPolygon(latlngs, options);
		};
	}());


	/*
	 * L.Rectangle extends Polygon and creates a rectangle when passed a LatLngBounds object.
	 */

	L.Rectangle = L.Polygon.extend({
		initialize: function (latLngBounds, options) {
			L.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(latLngBounds), options);
		},

		setBounds: function (latLngBounds) {
			this.setLatLngs(this._boundsToLatLngs(latLngBounds));
		},

		_boundsToLatLngs: function (latLngBounds) {
			latLngBounds = L.latLngBounds(latLngBounds);
			return [
				latLngBounds.getSouthWest(),
				latLngBounds.getNorthWest(),
				latLngBounds.getNorthEast(),
				latLngBounds.getSouthEast()
			];
		}
	});

	L.rectangle = function (latLngBounds, options) {
		return new L.Rectangle(latLngBounds, options);
	};


	/*
	 * L.Circle is a circle overlay (with a certain radius in meters).
	 */

	L.Circle = L.Path.extend({
		initialize: function (latlng, radius, options) {
			L.Path.prototype.initialize.call(this, options);

			this._latlng = L.latLng(latlng);
			this._mRadius = radius;
		},

		options: {
			fill: true
		},

		setLatLng: function (latlng) {
			this._latlng = L.latLng(latlng);
			return this.redraw();
		},

		setRadius: function (radius) {
			this._mRadius = radius;
			return this.redraw();
		},

		projectLatlngs: function () {
			var lngRadius = this._getLngRadius(),
			    latlng = this._latlng,
			    pointLeft = this._map.latLngToLayerPoint([latlng.lat, latlng.lng - lngRadius]);

			this._point = this._map.latLngToLayerPoint(latlng);
			this._radius = Math.max(this._point.x - pointLeft.x, 1);
		},

		getBounds: function () {
			var lngRadius = this._getLngRadius(),
			    latRadius = (this._mRadius / 40075017) * 360,
			    latlng = this._latlng;

			return new L.LatLngBounds(
			        [latlng.lat - latRadius, latlng.lng - lngRadius],
			        [latlng.lat + latRadius, latlng.lng + lngRadius]);
		},

		getLatLng: function () {
			return this._latlng;
		},

		getPathString: function () {
			var p = this._point,
			    r = this._radius;

			if (this._checkIfEmpty()) {
				return '';
			}

			if (L.Browser.svg) {
				return 'M' + p.x + ',' + (p.y - r) +
				       'A' + r + ',' + r + ',0,1,1,' +
				       (p.x - 0.1) + ',' + (p.y - r) + ' z';
			} else {
				p._round();
				r = Math.round(r);
				return 'AL ' + p.x + ',' + p.y + ' ' + r + ',' + r + ' 0,' + (65535 * 360);
			}
		},

		getRadius: function () {
			return this._mRadius;
		},

		// TODO Earth hardcoded, move into projection code!

		_getLatRadius: function () {
			return (this._mRadius / 40075017) * 360;
		},

		_getLngRadius: function () {
			return this._getLatRadius() / Math.cos(L.LatLng.DEG_TO_RAD * this._latlng.lat);
		},

		_checkIfEmpty: function () {
			if (!this._map) {
				return false;
			}
			var vp = this._map._pathViewport,
			    r = this._radius,
			    p = this._point;

			return p.x - r > vp.max.x || p.y - r > vp.max.y ||
			       p.x + r < vp.min.x || p.y + r < vp.min.y;
		}
	});

	L.circle = function (latlng, radius, options) {
		return new L.Circle(latlng, radius, options);
	};


	/*
	 * L.CircleMarker is a circle overlay with a permanent pixel radius.
	 */

	L.CircleMarker = L.Circle.extend({
		options: {
			radius: 10,
			weight: 2
		},

		initialize: function (latlng, options) {
			L.Circle.prototype.initialize.call(this, latlng, null, options);
			this._radius = this.options.radius;
		},

		projectLatlngs: function () {
			this._point = this._map.latLngToLayerPoint(this._latlng);
		},

		_updateStyle : function () {
			L.Circle.prototype._updateStyle.call(this);
			this.setRadius(this.options.radius);
		},

		setLatLng: function (latlng) {
			L.Circle.prototype.setLatLng.call(this, latlng);
			if (this._popup && this._popup._isOpen) {
				this._popup.setLatLng(latlng);
			}
			return this;
		},

		setRadius: function (radius) {
			this.options.radius = this._radius = radius;
			return this.redraw();
		},

		getRadius: function () {
			return this._radius;
		}
	});

	L.circleMarker = function (latlng, options) {
		return new L.CircleMarker(latlng, options);
	};


	/*
	 * Extends L.Polyline to be able to manually detect clicks on Canvas-rendered polylines.
	 */

	L.Polyline.include(!L.Path.CANVAS ? {} : {
		_containsPoint: function (p, closed) {
			var i, j, k, len, len2, dist, part,
			    w = this.options.weight / 2;

			if (L.Browser.touch) {
				w += 10; // polyline click tolerance on touch devices
			}

			for (i = 0, len = this._parts.length; i < len; i++) {
				part = this._parts[i];
				for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
					if (!closed && (j === 0)) {
						continue;
					}

					dist = L.LineUtil.pointToSegmentDistance(p, part[k], part[j]);

					if (dist <= w) {
						return true;
					}
				}
			}
			return false;
		}
	});


	/*
	 * Extends L.Polygon to be able to manually detect clicks on Canvas-rendered polygons.
	 */

	L.Polygon.include(!L.Path.CANVAS ? {} : {
		_containsPoint: function (p) {
			var inside = false,
			    part, p1, p2,
			    i, j, k,
			    len, len2;

			// TODO optimization: check if within bounds first

			if (L.Polyline.prototype._containsPoint.call(this, p, true)) {
				// click on polygon border
				return true;
			}

			// ray casting algorithm for detecting if point is in polygon

			for (i = 0, len = this._parts.length; i < len; i++) {
				part = this._parts[i];

				for (j = 0, len2 = part.length, k = len2 - 1; j < len2; k = j++) {
					p1 = part[j];
					p2 = part[k];

					if (((p1.y > p.y) !== (p2.y > p.y)) &&
							(p.x < (p2.x - p1.x) * (p.y - p1.y) / (p2.y - p1.y) + p1.x)) {
						inside = !inside;
					}
				}
			}

			return inside;
		}
	});


	/*
	 * Extends L.Circle with Canvas-specific code.
	 */

	L.Circle.include(!L.Path.CANVAS ? {} : {
		_drawPath: function () {
			var p = this._point;
			this._ctx.beginPath();
			this._ctx.arc(p.x, p.y, this._radius, 0, Math.PI * 2, false);
		},

		_containsPoint: function (p) {
			var center = this._point,
			    w2 = this.options.stroke ? this.options.weight / 2 : 0;

			return (p.distanceTo(center) <= this._radius + w2);
		}
	});


	/*
	 * CircleMarker canvas specific drawing parts.
	 */

	L.CircleMarker.include(!L.Path.CANVAS ? {} : {
		_updateStyle: function () {
			L.Path.prototype._updateStyle.call(this);
		}
	});


	/*
	 * L.GeoJSON turns any GeoJSON data into a Leaflet layer.
	 */

	L.GeoJSON = L.FeatureGroup.extend({

		initialize: function (geojson, options) {
			L.setOptions(this, options);

			this._layers = {};

			if (geojson) {
				this.addData(geojson);
			}
		},

		addData: function (geojson) {
			var features = L.Util.isArray(geojson) ? geojson : geojson.features,
			    i, len, feature;

			if (features) {
				for (i = 0, len = features.length; i < len; i++) {
					// Only add this if geometry or geometries are set and not null
					feature = features[i];
					if (feature.geometries || feature.geometry || feature.features || feature.coordinates) {
						this.addData(features[i]);
					}
				}
				return this;
			}

			var options = this.options;

			if (options.filter && !options.filter(geojson)) { return; }

			var layer = L.GeoJSON.geometryToLayer(geojson, options.pointToLayer, options.coordsToLatLng, options);
			layer.feature = L.GeoJSON.asFeature(geojson);

			layer.defaultOptions = layer.options;
			this.resetStyle(layer);

			if (options.onEachFeature) {
				options.onEachFeature(geojson, layer);
			}

			return this.addLayer(layer);
		},

		resetStyle: function (layer) {
			var style = this.options.style;
			if (style) {
				// reset any custom styles
				L.Util.extend(layer.options, layer.defaultOptions);

				this._setLayerStyle(layer, style);
			}
		},

		setStyle: function (style) {
			this.eachLayer(function (layer) {
				this._setLayerStyle(layer, style);
			}, this);
		},

		_setLayerStyle: function (layer, style) {
			if (typeof style === 'function') {
				style = style(layer.feature);
			}
			if (layer.setStyle) {
				layer.setStyle(style);
			}
		}
	});

	L.extend(L.GeoJSON, {
		geometryToLayer: function (geojson, pointToLayer, coordsToLatLng, vectorOptions) {
			var geometry = geojson.type === 'Feature' ? geojson.geometry : geojson,
			    coords = geometry.coordinates,
			    layers = [],
			    latlng, latlngs, i, len;

			coordsToLatLng = coordsToLatLng || this.coordsToLatLng;

			switch (geometry.type) {
			case 'Point':
				latlng = coordsToLatLng(coords);
				return pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng);

			case 'MultiPoint':
				for (i = 0, len = coords.length; i < len; i++) {
					latlng = coordsToLatLng(coords[i]);
					layers.push(pointToLayer ? pointToLayer(geojson, latlng) : new L.Marker(latlng));
				}
				return new L.FeatureGroup(layers);

			case 'LineString':
				latlngs = this.coordsToLatLngs(coords, 0, coordsToLatLng);
				return new L.Polyline(latlngs, vectorOptions);

			case 'Polygon':
				if (coords.length === 2 && !coords[1].length) {
					throw new Error('Invalid GeoJSON object.');
				}
				latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
				return new L.Polygon(latlngs, vectorOptions);

			case 'MultiLineString':
				latlngs = this.coordsToLatLngs(coords, 1, coordsToLatLng);
				return new L.MultiPolyline(latlngs, vectorOptions);

			case 'MultiPolygon':
				latlngs = this.coordsToLatLngs(coords, 2, coordsToLatLng);
				return new L.MultiPolygon(latlngs, vectorOptions);

			case 'GeometryCollection':
				for (i = 0, len = geometry.geometries.length; i < len; i++) {

					layers.push(this.geometryToLayer({
						geometry: geometry.geometries[i],
						type: 'Feature',
						properties: geojson.properties
					}, pointToLayer, coordsToLatLng, vectorOptions));
				}
				return new L.FeatureGroup(layers);

			default:
				throw new Error('Invalid GeoJSON object.');
			}
		},

		coordsToLatLng: function (coords) { // (Array[, Boolean]) -> LatLng
			return new L.LatLng(coords[1], coords[0], coords[2]);
		},

		coordsToLatLngs: function (coords, levelsDeep, coordsToLatLng) { // (Array[, Number, Function]) -> Array
			var latlng, i, len,
			    latlngs = [];

			for (i = 0, len = coords.length; i < len; i++) {
				latlng = levelsDeep ?
				        this.coordsToLatLngs(coords[i], levelsDeep - 1, coordsToLatLng) :
				        (coordsToLatLng || this.coordsToLatLng)(coords[i]);

				latlngs.push(latlng);
			}

			return latlngs;
		},

		latLngToCoords: function (latlng) {
			var coords = [latlng.lng, latlng.lat];

			if (latlng.alt !== undefined) {
				coords.push(latlng.alt);
			}
			return coords;
		},

		latLngsToCoords: function (latLngs) {
			var coords = [];

			for (var i = 0, len = latLngs.length; i < len; i++) {
				coords.push(L.GeoJSON.latLngToCoords(latLngs[i]));
			}

			return coords;
		},

		getFeature: function (layer, newGeometry) {
			return layer.feature ? L.extend({}, layer.feature, {geometry: newGeometry}) : L.GeoJSON.asFeature(newGeometry);
		},

		asFeature: function (geoJSON) {
			if (geoJSON.type === 'Feature') {
				return geoJSON;
			}

			return {
				type: 'Feature',
				properties: {},
				geometry: geoJSON
			};
		}
	});

	var PointToGeoJSON = {
		toGeoJSON: function () {
			return L.GeoJSON.getFeature(this, {
				type: 'Point',
				coordinates: L.GeoJSON.latLngToCoords(this.getLatLng())
			});
		}
	};

	L.Marker.include(PointToGeoJSON);
	L.Circle.include(PointToGeoJSON);
	L.CircleMarker.include(PointToGeoJSON);

	L.Polyline.include({
		toGeoJSON: function () {
			return L.GeoJSON.getFeature(this, {
				type: 'LineString',
				coordinates: L.GeoJSON.latLngsToCoords(this.getLatLngs())
			});
		}
	});

	L.Polygon.include({
		toGeoJSON: function () {
			var coords = [L.GeoJSON.latLngsToCoords(this.getLatLngs())],
			    i, len, hole;

			coords[0].push(coords[0][0]);

			if (this._holes) {
				for (i = 0, len = this._holes.length; i < len; i++) {
					hole = L.GeoJSON.latLngsToCoords(this._holes[i]);
					hole.push(hole[0]);
					coords.push(hole);
				}
			}

			return L.GeoJSON.getFeature(this, {
				type: 'Polygon',
				coordinates: coords
			});
		}
	});

	(function () {
		function multiToGeoJSON(type) {
			return function () {
				var coords = [];

				this.eachLayer(function (layer) {
					coords.push(layer.toGeoJSON().geometry.coordinates);
				});

				return L.GeoJSON.getFeature(this, {
					type: type,
					coordinates: coords
				});
			};
		}

		L.MultiPolyline.include({toGeoJSON: multiToGeoJSON('MultiLineString')});
		L.MultiPolygon.include({toGeoJSON: multiToGeoJSON('MultiPolygon')});

		L.LayerGroup.include({
			toGeoJSON: function () {

				var geometry = this.feature && this.feature.geometry,
					jsons = [],
					json;

				if (geometry && geometry.type === 'MultiPoint') {
					return multiToGeoJSON('MultiPoint').call(this);
				}

				var isGeometryCollection = geometry && geometry.type === 'GeometryCollection';

				this.eachLayer(function (layer) {
					if (layer.toGeoJSON) {
						json = layer.toGeoJSON();
						jsons.push(isGeometryCollection ? json.geometry : L.GeoJSON.asFeature(json));
					}
				});

				if (isGeometryCollection) {
					return L.GeoJSON.getFeature(this, {
						geometries: jsons,
						type: 'GeometryCollection'
					});
				}

				return {
					type: 'FeatureCollection',
					features: jsons
				};
			}
		});
	}());

	L.geoJson = function (geojson, options) {
		return new L.GeoJSON(geojson, options);
	};


	/*
	 * L.DomEvent contains functions for working with DOM events.
	 */

	L.DomEvent = {
		/* inspired by John Resig, Dean Edwards and YUI addEvent implementations */
		addListener: function (obj, type, fn, context) { // (HTMLElement, String, Function[, Object])

			var id = L.stamp(fn),
			    key = '_leaflet_' + type + id,
			    handler, originalHandler, newType;

			if (obj[key]) { return this; }

			handler = function (e) {
				return fn.call(context || obj, e || L.DomEvent._getEvent());
			};

			if (L.Browser.pointer && type.indexOf('touch') === 0) {
				return this.addPointerListener(obj, type, handler, id);
			}
			if (L.Browser.touch && (type === 'dblclick') && this.addDoubleTapListener) {
				this.addDoubleTapListener(obj, handler, id);
			}

			if ('addEventListener' in obj) {

				if (type === 'mousewheel') {
					obj.addEventListener('DOMMouseScroll', handler, false);
					obj.addEventListener(type, handler, false);

				} else if ((type === 'mouseenter') || (type === 'mouseleave')) {

					originalHandler = handler;
					newType = (type === 'mouseenter' ? 'mouseover' : 'mouseout');

					handler = function (e) {
						if (!L.DomEvent._checkMouse(obj, e)) { return; }
						return originalHandler(e);
					};

					obj.addEventListener(newType, handler, false);

				} else if (type === 'click' && L.Browser.android) {
					originalHandler = handler;
					handler = function (e) {
						return L.DomEvent._filterClick(e, originalHandler);
					};

					obj.addEventListener(type, handler, false);
				} else {
					obj.addEventListener(type, handler, false);
				}

			} else if ('attachEvent' in obj) {
				obj.attachEvent('on' + type, handler);
			}

			obj[key] = handler;

			return this;
		},

		removeListener: function (obj, type, fn) {  // (HTMLElement, String, Function)

			var id = L.stamp(fn),
			    key = '_leaflet_' + type + id,
			    handler = obj[key];

			if (!handler) { return this; }

			if (L.Browser.pointer && type.indexOf('touch') === 0) {
				this.removePointerListener(obj, type, id);
			} else if (L.Browser.touch && (type === 'dblclick') && this.removeDoubleTapListener) {
				this.removeDoubleTapListener(obj, id);

			} else if ('removeEventListener' in obj) {

				if (type === 'mousewheel') {
					obj.removeEventListener('DOMMouseScroll', handler, false);
					obj.removeEventListener(type, handler, false);

				} else if ((type === 'mouseenter') || (type === 'mouseleave')) {
					obj.removeEventListener((type === 'mouseenter' ? 'mouseover' : 'mouseout'), handler, false);
				} else {
					obj.removeEventListener(type, handler, false);
				}
			} else if ('detachEvent' in obj) {
				obj.detachEvent('on' + type, handler);
			}

			obj[key] = null;

			return this;
		},

		stopPropagation: function (e) {

			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			L.DomEvent._skipped(e);

			return this;
		},

		disableScrollPropagation: function (el) {
			var stop = L.DomEvent.stopPropagation;

			return L.DomEvent
				.on(el, 'mousewheel', stop)
				.on(el, 'MozMousePixelScroll', stop);
		},

		disableClickPropagation: function (el) {
			var stop = L.DomEvent.stopPropagation;

			for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
				L.DomEvent.on(el, L.Draggable.START[i], stop);
			}

			return L.DomEvent
				.on(el, 'click', L.DomEvent._fakeStop)
				.on(el, 'dblclick', stop);
		},

		preventDefault: function (e) {

			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			return this;
		},

		stop: function (e) {
			return L.DomEvent
				.preventDefault(e)
				.stopPropagation(e);
		},

		getMousePosition: function (e, container) {
			if (!container) {
				return new L.Point(e.clientX, e.clientY);
			}

			var rect = container.getBoundingClientRect();

			return new L.Point(
				e.clientX - rect.left - container.clientLeft,
				e.clientY - rect.top - container.clientTop);
		},

		getWheelDelta: function (e) {

			var delta = 0;

			if (e.wheelDelta) {
				delta = e.wheelDelta / 120;
			}
			if (e.detail) {
				delta = -e.detail / 3;
			}
			return delta;
		},

		_skipEvents: {},

		_fakeStop: function (e) {
			// fakes stopPropagation by setting a special event flag, checked/reset with L.DomEvent._skipped(e)
			L.DomEvent._skipEvents[e.type] = true;
		},

		_skipped: function (e) {
			var skipped = this._skipEvents[e.type];
			// reset when checking, as it's only used in map container and propagates outside of the map
			this._skipEvents[e.type] = false;
			return skipped;
		},

		// check if element really left/entered the event target (for mouseenter/mouseleave)
		_checkMouse: function (el, e) {

			var related = e.relatedTarget;

			if (!related) { return true; }

			try {
				while (related && (related !== el)) {
					related = related.parentNode;
				}
			} catch (err) {
				return false;
			}
			return (related !== el);
		},

		_getEvent: function () { // evil magic for IE
			/*jshint noarg:false */
			var e = window.event;
			if (!e) {
				var caller = arguments.callee.caller;
				while (caller) {
					e = caller['arguments'][0];
					if (e && window.Event === e.constructor) {
						break;
					}
					caller = caller.caller;
				}
			}
			return e;
		},

		// this is a horrible workaround for a bug in Android where a single touch triggers two click events
		_filterClick: function (e, handler) {
			var timeStamp = (e.timeStamp || e.originalEvent.timeStamp),
				elapsed = L.DomEvent._lastClick && (timeStamp - L.DomEvent._lastClick);

			// are they closer together than 500ms yet more than 100ms?
			// Android typically triggers them ~300ms apart while multiple listeners
			// on the same event should be triggered far faster;
			// or check if click is simulated on the element, and if it is, reject any non-simulated events

			if ((elapsed && elapsed > 100 && elapsed < 500) || (e.target._simulatedClick && !e._simulated)) {
				L.DomEvent.stop(e);
				return;
			}
			L.DomEvent._lastClick = timeStamp;

			return handler(e);
		}
	};

	L.DomEvent.on = L.DomEvent.addListener;
	L.DomEvent.off = L.DomEvent.removeListener;


	/*
	 * L.Draggable allows you to add dragging capabilities to any element. Supports mobile devices too.
	 */

	L.Draggable = L.Class.extend({
		includes: L.Mixin.Events,

		statics: {
			START: L.Browser.touch ? ['touchstart', 'mousedown'] : ['mousedown'],
			END: {
				mousedown: 'mouseup',
				touchstart: 'touchend',
				pointerdown: 'touchend',
				MSPointerDown: 'touchend'
			},
			MOVE: {
				mousedown: 'mousemove',
				touchstart: 'touchmove',
				pointerdown: 'touchmove',
				MSPointerDown: 'touchmove'
			}
		},

		initialize: function (element, dragStartTarget) {
			this._element = element;
			this._dragStartTarget = dragStartTarget || element;
		},

		enable: function () {
			if (this._enabled) { return; }

			for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
				L.DomEvent.on(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
			}

			this._enabled = true;
		},

		disable: function () {
			if (!this._enabled) { return; }

			for (var i = L.Draggable.START.length - 1; i >= 0; i--) {
				L.DomEvent.off(this._dragStartTarget, L.Draggable.START[i], this._onDown, this);
			}

			this._enabled = false;
			this._moved = false;
		},

		_onDown: function (e) {
			this._moved = false;

			if (e.shiftKey || ((e.which !== 1) && (e.button !== 1) && !e.touches)) { return; }

			L.DomEvent.stopPropagation(e);

			if (L.Draggable._disabled) { return; }

			L.DomUtil.disableImageDrag();
			L.DomUtil.disableTextSelection();

			if (this._moving) { return; }

			var first = e.touches ? e.touches[0] : e;

			this._startPoint = new L.Point(first.clientX, first.clientY);
			this._startPos = this._newPos = L.DomUtil.getPosition(this._element);

			L.DomEvent
			    .on(document, L.Draggable.MOVE[e.type], this._onMove, this)
			    .on(document, L.Draggable.END[e.type], this._onUp, this);
		},

		_onMove: function (e) {
			if (e.touches && e.touches.length > 1) {
				this._moved = true;
				return;
			}

			var first = (e.touches && e.touches.length === 1 ? e.touches[0] : e),
			    newPoint = new L.Point(first.clientX, first.clientY),
			    offset = newPoint.subtract(this._startPoint);

			if (!offset.x && !offset.y) { return; }
			if (L.Browser.touch && Math.abs(offset.x) + Math.abs(offset.y) < 3) { return; }

			L.DomEvent.preventDefault(e);

			if (!this._moved) {
				this.fire('dragstart');

				this._moved = true;
				this._startPos = L.DomUtil.getPosition(this._element).subtract(offset);

				L.DomUtil.addClass(document.body, 'leaflet-dragging');
				this._lastTarget = e.target || e.srcElement;
				L.DomUtil.addClass(this._lastTarget, 'leaflet-drag-target');
			}

			this._newPos = this._startPos.add(offset);
			this._moving = true;

			L.Util.cancelAnimFrame(this._animRequest);
			this._animRequest = L.Util.requestAnimFrame(this._updatePosition, this, true, this._dragStartTarget);
		},

		_updatePosition: function () {
			this.fire('predrag');
			L.DomUtil.setPosition(this._element, this._newPos);
			this.fire('drag');
		},

		_onUp: function () {
			L.DomUtil.removeClass(document.body, 'leaflet-dragging');

			if (this._lastTarget) {
				L.DomUtil.removeClass(this._lastTarget, 'leaflet-drag-target');
				this._lastTarget = null;
			}

			for (var i in L.Draggable.MOVE) {
				L.DomEvent
				    .off(document, L.Draggable.MOVE[i], this._onMove)
				    .off(document, L.Draggable.END[i], this._onUp);
			}

			L.DomUtil.enableImageDrag();
			L.DomUtil.enableTextSelection();

			if (this._moved && this._moving) {
				// ensure drag is not fired after dragend
				L.Util.cancelAnimFrame(this._animRequest);

				this.fire('dragend', {
					distance: this._newPos.distanceTo(this._startPos)
				});
			}

			this._moving = false;
		}
	});


	/*
		L.Handler is a base class for handler classes that are used internally to inject
		interaction features like dragging to classes like Map and Marker.
	*/

	L.Handler = L.Class.extend({
		initialize: function (map) {
			this._map = map;
		},

		enable: function () {
			if (this._enabled) { return; }

			this._enabled = true;
			this.addHooks();
		},

		disable: function () {
			if (!this._enabled) { return; }

			this._enabled = false;
			this.removeHooks();
		},

		enabled: function () {
			return !!this._enabled;
		}
	});


	/*
	 * L.Handler.MapDrag is used to make the map draggable (with panning inertia), enabled by default.
	 */

	L.Map.mergeOptions({
		dragging: true,

		inertia: !L.Browser.android23,
		inertiaDeceleration: 3400, // px/s^2
		inertiaMaxSpeed: Infinity, // px/s
		inertiaThreshold: L.Browser.touch ? 32 : 18, // ms
		easeLinearity: 0.25,

		// TODO refactor, move to CRS
		worldCopyJump: false
	});

	L.Map.Drag = L.Handler.extend({
		addHooks: function () {
			if (!this._draggable) {
				var map = this._map;

				this._draggable = new L.Draggable(map._mapPane, map._container);

				this._draggable.on({
					'dragstart': this._onDragStart,
					'drag': this._onDrag,
					'dragend': this._onDragEnd
				}, this);

				if (map.options.worldCopyJump) {
					this._draggable.on('predrag', this._onPreDrag, this);
					map.on('viewreset', this._onViewReset, this);

					map.whenReady(this._onViewReset, this);
				}
			}
			this._draggable.enable();
		},

		removeHooks: function () {
			this._draggable.disable();
		},

		moved: function () {
			return this._draggable && this._draggable._moved;
		},

		_onDragStart: function () {
			var map = this._map;

			if (map._panAnim) {
				map._panAnim.stop();
			}

			map
			    .fire('movestart')
			    .fire('dragstart');

			if (map.options.inertia) {
				this._positions = [];
				this._times = [];
			}
		},

		_onDrag: function () {
			if (this._map.options.inertia) {
				var time = this._lastTime = +new Date(),
				    pos = this._lastPos = this._draggable._newPos;

				this._positions.push(pos);
				this._times.push(time);

				if (time - this._times[0] > 200) {
					this._positions.shift();
					this._times.shift();
				}
			}

			this._map
			    .fire('move')
			    .fire('drag');
		},

		_onViewReset: function () {
			// TODO fix hardcoded Earth values
			var pxCenter = this._map.getSize()._divideBy(2),
			    pxWorldCenter = this._map.latLngToLayerPoint([0, 0]);

			this._initialWorldOffset = pxWorldCenter.subtract(pxCenter).x;
			this._worldWidth = this._map.project([0, 180]).x;
		},

		_onPreDrag: function () {
			// TODO refactor to be able to adjust map pane position after zoom
			var worldWidth = this._worldWidth,
			    halfWidth = Math.round(worldWidth / 2),
			    dx = this._initialWorldOffset,
			    x = this._draggable._newPos.x,
			    newX1 = (x - halfWidth + dx) % worldWidth + halfWidth - dx,
			    newX2 = (x + halfWidth + dx) % worldWidth - halfWidth - dx,
			    newX = Math.abs(newX1 + dx) < Math.abs(newX2 + dx) ? newX1 : newX2;

			this._draggable._newPos.x = newX;
		},

		_onDragEnd: function (e) {
			var map = this._map,
			    options = map.options,
			    delay = +new Date() - this._lastTime,

			    noInertia = !options.inertia || delay > options.inertiaThreshold || !this._positions[0];

			map.fire('dragend', e);

			if (noInertia) {
				map.fire('moveend');

			} else {

				var direction = this._lastPos.subtract(this._positions[0]),
				    duration = (this._lastTime + delay - this._times[0]) / 1000,
				    ease = options.easeLinearity,

				    speedVector = direction.multiplyBy(ease / duration),
				    speed = speedVector.distanceTo([0, 0]),

				    limitedSpeed = Math.min(options.inertiaMaxSpeed, speed),
				    limitedSpeedVector = speedVector.multiplyBy(limitedSpeed / speed),

				    decelerationDuration = limitedSpeed / (options.inertiaDeceleration * ease),
				    offset = limitedSpeedVector.multiplyBy(-decelerationDuration / 2).round();

				if (!offset.x || !offset.y) {
					map.fire('moveend');

				} else {
					offset = map._limitOffset(offset, map.options.maxBounds);

					L.Util.requestAnimFrame(function () {
						map.panBy(offset, {
							duration: decelerationDuration,
							easeLinearity: ease,
							noMoveStart: true
						});
					});
				}
			}
		}
	});

	L.Map.addInitHook('addHandler', 'dragging', L.Map.Drag);


	/*
	 * L.Handler.DoubleClickZoom is used to handle double-click zoom on the map, enabled by default.
	 */

	L.Map.mergeOptions({
		doubleClickZoom: true
	});

	L.Map.DoubleClickZoom = L.Handler.extend({
		addHooks: function () {
			this._map.on('dblclick', this._onDoubleClick, this);
		},

		removeHooks: function () {
			this._map.off('dblclick', this._onDoubleClick, this);
		},

		_onDoubleClick: function (e) {
			var map = this._map,
			    zoom = map.getZoom() + (e.originalEvent.shiftKey ? -1 : 1);

			if (map.options.doubleClickZoom === 'center') {
				map.setZoom(zoom);
			} else {
				map.setZoomAround(e.containerPoint, zoom);
			}
		}
	});

	L.Map.addInitHook('addHandler', 'doubleClickZoom', L.Map.DoubleClickZoom);


	/*
	 * L.Handler.ScrollWheelZoom is used by L.Map to enable mouse scroll wheel zoom on the map.
	 */

	L.Map.mergeOptions({
		scrollWheelZoom: true
	});

	L.Map.ScrollWheelZoom = L.Handler.extend({
		addHooks: function () {
			L.DomEvent.on(this._map._container, 'mousewheel', this._onWheelScroll, this);
			L.DomEvent.on(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
			this._delta = 0;
		},

		removeHooks: function () {
			L.DomEvent.off(this._map._container, 'mousewheel', this._onWheelScroll);
			L.DomEvent.off(this._map._container, 'MozMousePixelScroll', L.DomEvent.preventDefault);
		},

		_onWheelScroll: function (e) {
			var delta = L.DomEvent.getWheelDelta(e);

			this._delta += delta;
			this._lastMousePos = this._map.mouseEventToContainerPoint(e);

			if (!this._startTime) {
				this._startTime = +new Date();
			}

			var left = Math.max(40 - (+new Date() - this._startTime), 0);

			clearTimeout(this._timer);
			this._timer = setTimeout(L.bind(this._performZoom, this), left);

			L.DomEvent.preventDefault(e);
			L.DomEvent.stopPropagation(e);
		},

		_performZoom: function () {
			var map = this._map,
			    delta = this._delta,
			    zoom = map.getZoom();

			delta = delta > 0 ? Math.ceil(delta) : Math.floor(delta);
			delta = Math.max(Math.min(delta, 4), -4);
			delta = map._limitZoom(zoom + delta) - zoom;

			this._delta = 0;
			this._startTime = null;

			if (!delta) { return; }

			if (map.options.scrollWheelZoom === 'center') {
				map.setZoom(zoom + delta);
			} else {
				map.setZoomAround(this._lastMousePos, zoom + delta);
			}
		}
	});

	L.Map.addInitHook('addHandler', 'scrollWheelZoom', L.Map.ScrollWheelZoom);


	/*
	 * Extends the event handling code with double tap support for mobile browsers.
	 */

	L.extend(L.DomEvent, {

		_touchstart: L.Browser.msPointer ? 'MSPointerDown' : L.Browser.pointer ? 'pointerdown' : 'touchstart',
		_touchend: L.Browser.msPointer ? 'MSPointerUp' : L.Browser.pointer ? 'pointerup' : 'touchend',

		// inspired by Zepto touch code by Thomas Fuchs
		addDoubleTapListener: function (obj, handler, id) {
			var last,
			    doubleTap = false,
			    delay = 250,
			    touch,
			    pre = '_leaflet_',
			    touchstart = this._touchstart,
			    touchend = this._touchend,
			    trackedTouches = [];

			function onTouchStart(e) {
				var count;

				if (L.Browser.pointer) {
					trackedTouches.push(e.pointerId);
					count = trackedTouches.length;
				} else {
					count = e.touches.length;
				}
				if (count > 1) {
					return;
				}

				var now = Date.now(),
					delta = now - (last || now);

				touch = e.touches ? e.touches[0] : e;
				doubleTap = (delta > 0 && delta <= delay);
				last = now;
			}

			function onTouchEnd(e) {
				if (L.Browser.pointer) {
					var idx = trackedTouches.indexOf(e.pointerId);
					if (idx === -1) {
						return;
					}
					trackedTouches.splice(idx, 1);
				}

				if (doubleTap) {
					if (L.Browser.pointer) {
						// work around .type being readonly with MSPointer* events
						var newTouch = { },
							prop;

						// jshint forin:false
						for (var i in touch) {
							prop = touch[i];
							if (typeof prop === 'function') {
								newTouch[i] = prop.bind(touch);
							} else {
								newTouch[i] = prop;
							}
						}
						touch = newTouch;
					}
					touch.type = 'dblclick';
					handler(touch);
					last = null;
				}
			}
			obj[pre + touchstart + id] = onTouchStart;
			obj[pre + touchend + id] = onTouchEnd;

			// on pointer we need to listen on the document, otherwise a drag starting on the map and moving off screen
			// will not come through to us, so we will lose track of how many touches are ongoing
			var endElement = L.Browser.pointer ? document.documentElement : obj;

			obj.addEventListener(touchstart, onTouchStart, false);
			endElement.addEventListener(touchend, onTouchEnd, false);

			if (L.Browser.pointer) {
				endElement.addEventListener(L.DomEvent.POINTER_CANCEL, onTouchEnd, false);
			}

			return this;
		},

		removeDoubleTapListener: function (obj, id) {
			var pre = '_leaflet_';

			obj.removeEventListener(this._touchstart, obj[pre + this._touchstart + id], false);
			(L.Browser.pointer ? document.documentElement : obj).removeEventListener(
			        this._touchend, obj[pre + this._touchend + id], false);

			if (L.Browser.pointer) {
				document.documentElement.removeEventListener(L.DomEvent.POINTER_CANCEL, obj[pre + this._touchend + id],
					false);
			}

			return this;
		}
	});


	/*
	 * Extends L.DomEvent to provide touch support for Internet Explorer and Windows-based devices.
	 */

	L.extend(L.DomEvent, {

		//static
		POINTER_DOWN: L.Browser.msPointer ? 'MSPointerDown' : 'pointerdown',
		POINTER_MOVE: L.Browser.msPointer ? 'MSPointerMove' : 'pointermove',
		POINTER_UP: L.Browser.msPointer ? 'MSPointerUp' : 'pointerup',
		POINTER_CANCEL: L.Browser.msPointer ? 'MSPointerCancel' : 'pointercancel',

		_pointers: [],
		_pointerDocumentListener: false,

		// Provides a touch events wrapper for (ms)pointer events.
		// Based on changes by veproza https://github.com/CloudMade/Leaflet/pull/1019
		//ref http://www.w3.org/TR/pointerevents/ https://www.w3.org/Bugs/Public/show_bug.cgi?id=22890

		addPointerListener: function (obj, type, handler, id) {

			switch (type) {
			case 'touchstart':
				return this.addPointerListenerStart(obj, type, handler, id);
			case 'touchend':
				return this.addPointerListenerEnd(obj, type, handler, id);
			case 'touchmove':
				return this.addPointerListenerMove(obj, type, handler, id);
			default:
				throw 'Unknown touch event type';
			}
		},

		addPointerListenerStart: function (obj, type, handler, id) {
			var pre = '_leaflet_',
			    pointers = this._pointers;

			var cb = function (e) {

				L.DomEvent.preventDefault(e);

				var alreadyInArray = false;
				for (var i = 0; i < pointers.length; i++) {
					if (pointers[i].pointerId === e.pointerId) {
						alreadyInArray = true;
						break;
					}
				}
				if (!alreadyInArray) {
					pointers.push(e);
				}

				e.touches = pointers.slice();
				e.changedTouches = [e];

				handler(e);
			};

			obj[pre + 'touchstart' + id] = cb;
			obj.addEventListener(this.POINTER_DOWN, cb, false);

			// need to also listen for end events to keep the _pointers list accurate
			// this needs to be on the body and never go away
			if (!this._pointerDocumentListener) {
				var internalCb = function (e) {
					for (var i = 0; i < pointers.length; i++) {
						if (pointers[i].pointerId === e.pointerId) {
							pointers.splice(i, 1);
							break;
						}
					}
				};
				//We listen on the documentElement as any drags that end by moving the touch off the screen get fired there
				document.documentElement.addEventListener(this.POINTER_UP, internalCb, false);
				document.documentElement.addEventListener(this.POINTER_CANCEL, internalCb, false);

				this._pointerDocumentListener = true;
			}

			return this;
		},

		addPointerListenerMove: function (obj, type, handler, id) {
			var pre = '_leaflet_',
			    touches = this._pointers;

			function cb(e) {

				// don't fire touch moves when mouse isn't down
				if ((e.pointerType === e.MSPOINTER_TYPE_MOUSE || e.pointerType === 'mouse') && e.buttons === 0) { return; }

				for (var i = 0; i < touches.length; i++) {
					if (touches[i].pointerId === e.pointerId) {
						touches[i] = e;
						break;
					}
				}

				e.touches = touches.slice();
				e.changedTouches = [e];

				handler(e);
			}

			obj[pre + 'touchmove' + id] = cb;
			obj.addEventListener(this.POINTER_MOVE, cb, false);

			return this;
		},

		addPointerListenerEnd: function (obj, type, handler, id) {
			var pre = '_leaflet_',
			    touches = this._pointers;

			var cb = function (e) {
				for (var i = 0; i < touches.length; i++) {
					if (touches[i].pointerId === e.pointerId) {
						touches.splice(i, 1);
						break;
					}
				}

				e.touches = touches.slice();
				e.changedTouches = [e];

				handler(e);
			};

			obj[pre + 'touchend' + id] = cb;
			obj.addEventListener(this.POINTER_UP, cb, false);
			obj.addEventListener(this.POINTER_CANCEL, cb, false);

			return this;
		},

		removePointerListener: function (obj, type, id) {
			var pre = '_leaflet_',
			    cb = obj[pre + type + id];

			switch (type) {
			case 'touchstart':
				obj.removeEventListener(this.POINTER_DOWN, cb, false);
				break;
			case 'touchmove':
				obj.removeEventListener(this.POINTER_MOVE, cb, false);
				break;
			case 'touchend':
				obj.removeEventListener(this.POINTER_UP, cb, false);
				obj.removeEventListener(this.POINTER_CANCEL, cb, false);
				break;
			}

			return this;
		}
	});


	/*
	 * L.Handler.TouchZoom is used by L.Map to add pinch zoom on supported mobile browsers.
	 */

	L.Map.mergeOptions({
		touchZoom: L.Browser.touch && !L.Browser.android23,
		bounceAtZoomLimits: true
	});

	L.Map.TouchZoom = L.Handler.extend({
		addHooks: function () {
			L.DomEvent.on(this._map._container, 'touchstart', this._onTouchStart, this);
		},

		removeHooks: function () {
			L.DomEvent.off(this._map._container, 'touchstart', this._onTouchStart, this);
		},

		_onTouchStart: function (e) {
			var map = this._map;

			if (!e.touches || e.touches.length !== 2 || map._animatingZoom || this._zooming) { return; }

			var p1 = map.mouseEventToLayerPoint(e.touches[0]),
			    p2 = map.mouseEventToLayerPoint(e.touches[1]),
			    viewCenter = map._getCenterLayerPoint();

			this._startCenter = p1.add(p2)._divideBy(2);
			this._startDist = p1.distanceTo(p2);

			this._moved = false;
			this._zooming = true;

			this._centerOffset = viewCenter.subtract(this._startCenter);

			if (map._panAnim) {
				map._panAnim.stop();
			}

			L.DomEvent
			    .on(document, 'touchmove', this._onTouchMove, this)
			    .on(document, 'touchend', this._onTouchEnd, this);

			L.DomEvent.preventDefault(e);
		},

		_onTouchMove: function (e) {
			var map = this._map;

			if (!e.touches || e.touches.length !== 2 || !this._zooming) { return; }

			var p1 = map.mouseEventToLayerPoint(e.touches[0]),
			    p2 = map.mouseEventToLayerPoint(e.touches[1]);

			this._scale = p1.distanceTo(p2) / this._startDist;
			this._delta = p1._add(p2)._divideBy(2)._subtract(this._startCenter);

			if (this._scale === 1) { return; }

			if (!map.options.bounceAtZoomLimits) {
				if ((map.getZoom() === map.getMinZoom() && this._scale < 1) ||
				    (map.getZoom() === map.getMaxZoom() && this._scale > 1)) { return; }
			}

			if (!this._moved) {
				L.DomUtil.addClass(map._mapPane, 'leaflet-touching');

				map
				    .fire('movestart')
				    .fire('zoomstart');

				this._moved = true;
			}

			L.Util.cancelAnimFrame(this._animRequest);
			this._animRequest = L.Util.requestAnimFrame(
			        this._updateOnMove, this, true, this._map._container);

			L.DomEvent.preventDefault(e);
		},

		_updateOnMove: function () {
			var map = this._map,
			    origin = this._getScaleOrigin(),
			    center = map.layerPointToLatLng(origin),
			    zoom = map.getScaleZoom(this._scale);

			map._animateZoom(center, zoom, this._startCenter, this._scale, this._delta, false, true);
		},

		_onTouchEnd: function () {
			if (!this._moved || !this._zooming) {
				this._zooming = false;
				return;
			}

			var map = this._map;

			this._zooming = false;
			L.DomUtil.removeClass(map._mapPane, 'leaflet-touching');
			L.Util.cancelAnimFrame(this._animRequest);

			L.DomEvent
			    .off(document, 'touchmove', this._onTouchMove)
			    .off(document, 'touchend', this._onTouchEnd);

			var origin = this._getScaleOrigin(),
			    center = map.layerPointToLatLng(origin),

			    oldZoom = map.getZoom(),
			    floatZoomDelta = map.getScaleZoom(this._scale) - oldZoom,
			    roundZoomDelta = (floatZoomDelta > 0 ?
			            Math.ceil(floatZoomDelta) : Math.floor(floatZoomDelta)),

			    zoom = map._limitZoom(oldZoom + roundZoomDelta),
			    scale = map.getZoomScale(zoom) / this._scale;

			map._animateZoom(center, zoom, origin, scale);
		},

		_getScaleOrigin: function () {
			var centerOffset = this._centerOffset.subtract(this._delta).divideBy(this._scale);
			return this._startCenter.add(centerOffset);
		}
	});

	L.Map.addInitHook('addHandler', 'touchZoom', L.Map.TouchZoom);


	/*
	 * L.Map.Tap is used to enable mobile hacks like quick taps and long hold.
	 */

	L.Map.mergeOptions({
		tap: true,
		tapTolerance: 15
	});

	L.Map.Tap = L.Handler.extend({
		addHooks: function () {
			L.DomEvent.on(this._map._container, 'touchstart', this._onDown, this);
		},

		removeHooks: function () {
			L.DomEvent.off(this._map._container, 'touchstart', this._onDown, this);
		},

		_onDown: function (e) {
			if (!e.touches) { return; }

			L.DomEvent.preventDefault(e);

			this._fireClick = true;

			// don't simulate click or track longpress if more than 1 touch
			if (e.touches.length > 1) {
				this._fireClick = false;
				clearTimeout(this._holdTimeout);
				return;
			}

			var first = e.touches[0],
			    el = first.target;

			this._startPos = this._newPos = new L.Point(first.clientX, first.clientY);

			// if touching a link, highlight it
			if (el.tagName && el.tagName.toLowerCase() === 'a') {
				L.DomUtil.addClass(el, 'leaflet-active');
			}

			// simulate long hold but setting a timeout
			this._holdTimeout = setTimeout(L.bind(function () {
				if (this._isTapValid()) {
					this._fireClick = false;
					this._onUp();
					this._simulateEvent('contextmenu', first);
				}
			}, this), 1000);

			L.DomEvent
				.on(document, 'touchmove', this._onMove, this)
				.on(document, 'touchend', this._onUp, this);
		},

		_onUp: function (e) {
			clearTimeout(this._holdTimeout);

			L.DomEvent
				.off(document, 'touchmove', this._onMove, this)
				.off(document, 'touchend', this._onUp, this);

			if (this._fireClick && e && e.changedTouches) {

				var first = e.changedTouches[0],
				    el = first.target;

				if (el && el.tagName && el.tagName.toLowerCase() === 'a') {
					L.DomUtil.removeClass(el, 'leaflet-active');
				}

				// simulate click if the touch didn't move too much
				if (this._isTapValid()) {
					this._simulateEvent('click', first);
				}
			}
		},

		_isTapValid: function () {
			return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance;
		},

		_onMove: function (e) {
			var first = e.touches[0];
			this._newPos = new L.Point(first.clientX, first.clientY);
		},

		_simulateEvent: function (type, e) {
			var simulatedEvent = document.createEvent('MouseEvents');

			simulatedEvent._simulated = true;
			e.target._simulatedClick = true;

			simulatedEvent.initMouseEvent(
			        type, true, true, window, 1,
			        e.screenX, e.screenY,
			        e.clientX, e.clientY,
			        false, false, false, false, 0, null);

			e.target.dispatchEvent(simulatedEvent);
		}
	});

	if (L.Browser.touch && !L.Browser.pointer) {
		L.Map.addInitHook('addHandler', 'tap', L.Map.Tap);
	}


	/*
	 * L.Handler.ShiftDragZoom is used to add shift-drag zoom interaction to the map
	  * (zoom to a selected bounding box), enabled by default.
	 */

	L.Map.mergeOptions({
		boxZoom: true
	});

	L.Map.BoxZoom = L.Handler.extend({
		initialize: function (map) {
			this._map = map;
			this._container = map._container;
			this._pane = map._panes.overlayPane;
			this._moved = false;
		},

		addHooks: function () {
			L.DomEvent.on(this._container, 'mousedown', this._onMouseDown, this);
		},

		removeHooks: function () {
			L.DomEvent.off(this._container, 'mousedown', this._onMouseDown);
			this._moved = false;
		},

		moved: function () {
			return this._moved;
		},

		_onMouseDown: function (e) {
			this._moved = false;

			if (!e.shiftKey || ((e.which !== 1) && (e.button !== 1))) { return false; }

			L.DomUtil.disableTextSelection();
			L.DomUtil.disableImageDrag();

			this._startLayerPoint = this._map.mouseEventToLayerPoint(e);

			L.DomEvent
			    .on(document, 'mousemove', this._onMouseMove, this)
			    .on(document, 'mouseup', this._onMouseUp, this)
			    .on(document, 'keydown', this._onKeyDown, this);
		},

		_onMouseMove: function (e) {
			if (!this._moved) {
				this._box = L.DomUtil.create('div', 'leaflet-zoom-box', this._pane);
				L.DomUtil.setPosition(this._box, this._startLayerPoint);

				//TODO refactor: move cursor to styles
				this._container.style.cursor = 'crosshair';
				this._map.fire('boxzoomstart');
			}

			var startPoint = this._startLayerPoint,
			    box = this._box,

			    layerPoint = this._map.mouseEventToLayerPoint(e),
			    offset = layerPoint.subtract(startPoint),

			    newPos = new L.Point(
			        Math.min(layerPoint.x, startPoint.x),
			        Math.min(layerPoint.y, startPoint.y));

			L.DomUtil.setPosition(box, newPos);

			this._moved = true;

			// TODO refactor: remove hardcoded 4 pixels
			box.style.width  = (Math.max(0, Math.abs(offset.x) - 4)) + 'px';
			box.style.height = (Math.max(0, Math.abs(offset.y) - 4)) + 'px';
		},

		_finish: function () {
			if (this._moved) {
				this._pane.removeChild(this._box);
				this._container.style.cursor = '';
			}

			L.DomUtil.enableTextSelection();
			L.DomUtil.enableImageDrag();

			L.DomEvent
			    .off(document, 'mousemove', this._onMouseMove)
			    .off(document, 'mouseup', this._onMouseUp)
			    .off(document, 'keydown', this._onKeyDown);
		},

		_onMouseUp: function (e) {

			this._finish();

			var map = this._map,
			    layerPoint = map.mouseEventToLayerPoint(e);

			if (this._startLayerPoint.equals(layerPoint)) { return; }

			var bounds = new L.LatLngBounds(
			        map.layerPointToLatLng(this._startLayerPoint),
			        map.layerPointToLatLng(layerPoint));

			map.fitBounds(bounds);

			map.fire('boxzoomend', {
				boxZoomBounds: bounds
			});
		},

		_onKeyDown: function (e) {
			if (e.keyCode === 27) {
				this._finish();
			}
		}
	});

	L.Map.addInitHook('addHandler', 'boxZoom', L.Map.BoxZoom);


	/*
	 * L.Map.Keyboard is handling keyboard interaction with the map, enabled by default.
	 */

	L.Map.mergeOptions({
		keyboard: true,
		keyboardPanOffset: 80,
		keyboardZoomOffset: 1
	});

	L.Map.Keyboard = L.Handler.extend({

		keyCodes: {
			left:    [37],
			right:   [39],
			down:    [40],
			up:      [38],
			zoomIn:  [187, 107, 61, 171],
			zoomOut: [189, 109, 173]
		},

		initialize: function (map) {
			this._map = map;

			this._setPanOffset(map.options.keyboardPanOffset);
			this._setZoomOffset(map.options.keyboardZoomOffset);
		},

		addHooks: function () {
			var container = this._map._container;

			// make the container focusable by tabbing
			if (container.tabIndex === -1) {
				container.tabIndex = '0';
			}

			L.DomEvent
			    .on(container, 'focus', this._onFocus, this)
			    .on(container, 'blur', this._onBlur, this)
			    .on(container, 'mousedown', this._onMouseDown, this);

			this._map
			    .on('focus', this._addHooks, this)
			    .on('blur', this._removeHooks, this);
		},

		removeHooks: function () {
			this._removeHooks();

			var container = this._map._container;

			L.DomEvent
			    .off(container, 'focus', this._onFocus, this)
			    .off(container, 'blur', this._onBlur, this)
			    .off(container, 'mousedown', this._onMouseDown, this);

			this._map
			    .off('focus', this._addHooks, this)
			    .off('blur', this._removeHooks, this);
		},

		_onMouseDown: function () {
			if (this._focused) { return; }

			var body = document.body,
			    docEl = document.documentElement,
			    top = body.scrollTop || docEl.scrollTop,
			    left = body.scrollLeft || docEl.scrollLeft;

			this._map._container.focus();

			window.scrollTo(left, top);
		},

		_onFocus: function () {
			this._focused = true;
			this._map.fire('focus');
		},

		_onBlur: function () {
			this._focused = false;
			this._map.fire('blur');
		},

		_setPanOffset: function (pan) {
			var keys = this._panKeys = {},
			    codes = this.keyCodes,
			    i, len;

			for (i = 0, len = codes.left.length; i < len; i++) {
				keys[codes.left[i]] = [-1 * pan, 0];
			}
			for (i = 0, len = codes.right.length; i < len; i++) {
				keys[codes.right[i]] = [pan, 0];
			}
			for (i = 0, len = codes.down.length; i < len; i++) {
				keys[codes.down[i]] = [0, pan];
			}
			for (i = 0, len = codes.up.length; i < len; i++) {
				keys[codes.up[i]] = [0, -1 * pan];
			}
		},

		_setZoomOffset: function (zoom) {
			var keys = this._zoomKeys = {},
			    codes = this.keyCodes,
			    i, len;

			for (i = 0, len = codes.zoomIn.length; i < len; i++) {
				keys[codes.zoomIn[i]] = zoom;
			}
			for (i = 0, len = codes.zoomOut.length; i < len; i++) {
				keys[codes.zoomOut[i]] = -zoom;
			}
		},

		_addHooks: function () {
			L.DomEvent.on(document, 'keydown', this._onKeyDown, this);
		},

		_removeHooks: function () {
			L.DomEvent.off(document, 'keydown', this._onKeyDown, this);
		},

		_onKeyDown: function (e) {
			var key = e.keyCode,
			    map = this._map;

			if (key in this._panKeys) {

				if (map._panAnim && map._panAnim._inProgress) { return; }

				map.panBy(this._panKeys[key]);

				if (map.options.maxBounds) {
					map.panInsideBounds(map.options.maxBounds);
				}

			} else if (key in this._zoomKeys) {
				map.setZoom(map.getZoom() + this._zoomKeys[key]);

			} else {
				return;
			}

			L.DomEvent.stop(e);
		}
	});

	L.Map.addInitHook('addHandler', 'keyboard', L.Map.Keyboard);


	/*
	 * L.Handler.MarkerDrag is used internally by L.Marker to make the markers draggable.
	 */

	L.Handler.MarkerDrag = L.Handler.extend({
		initialize: function (marker) {
			this._marker = marker;
		},

		addHooks: function () {
			var icon = this._marker._icon;
			if (!this._draggable) {
				this._draggable = new L.Draggable(icon, icon);
			}

			this._draggable
				.on('dragstart', this._onDragStart, this)
				.on('drag', this._onDrag, this)
				.on('dragend', this._onDragEnd, this);
			this._draggable.enable();
			L.DomUtil.addClass(this._marker._icon, 'leaflet-marker-draggable');
		},

		removeHooks: function () {
			this._draggable
				.off('dragstart', this._onDragStart, this)
				.off('drag', this._onDrag, this)
				.off('dragend', this._onDragEnd, this);

			this._draggable.disable();
			L.DomUtil.removeClass(this._marker._icon, 'leaflet-marker-draggable');
		},

		moved: function () {
			return this._draggable && this._draggable._moved;
		},

		_onDragStart: function () {
			this._marker
			    .closePopup()
			    .fire('movestart')
			    .fire('dragstart');
		},

		_onDrag: function () {
			var marker = this._marker,
			    shadow = marker._shadow,
			    iconPos = L.DomUtil.getPosition(marker._icon),
			    latlng = marker._map.layerPointToLatLng(iconPos);

			// update shadow position
			if (shadow) {
				L.DomUtil.setPosition(shadow, iconPos);
			}

			marker._latlng = latlng;

			marker
			    .fire('move', {latlng: latlng})
			    .fire('drag');
		},

		_onDragEnd: function (e) {
			this._marker
			    .fire('moveend')
			    .fire('dragend', e);
		}
	});


	/*
	 * L.Control is a base class for implementing map controls. Handles positioning.
	 * All other controls extend from this class.
	 */

	L.Control = L.Class.extend({
		options: {
			position: 'topright'
		},

		initialize: function (options) {
			L.setOptions(this, options);
		},

		getPosition: function () {
			return this.options.position;
		},

		setPosition: function (position) {
			var map = this._map;

			if (map) {
				map.removeControl(this);
			}

			this.options.position = position;

			if (map) {
				map.addControl(this);
			}

			return this;
		},

		getContainer: function () {
			return this._container;
		},

		addTo: function (map) {
			this._map = map;

			var container = this._container = this.onAdd(map),
			    pos = this.getPosition(),
			    corner = map._controlCorners[pos];

			L.DomUtil.addClass(container, 'leaflet-control');

			if (pos.indexOf('bottom') !== -1) {
				corner.insertBefore(container, corner.firstChild);
			} else {
				corner.appendChild(container);
			}

			return this;
		},

		removeFrom: function (map) {
			var pos = this.getPosition(),
			    corner = map._controlCorners[pos];

			corner.removeChild(this._container);
			this._map = null;

			if (this.onRemove) {
				this.onRemove(map);
			}

			return this;
		},

		_refocusOnMap: function () {
			if (this._map) {
				this._map.getContainer().focus();
			}
		}
	});

	L.control = function (options) {
		return new L.Control(options);
	};


	// adds control-related methods to L.Map

	L.Map.include({
		addControl: function (control) {
			control.addTo(this);
			return this;
		},

		removeControl: function (control) {
			control.removeFrom(this);
			return this;
		},

		_initControlPos: function () {
			var corners = this._controlCorners = {},
			    l = 'leaflet-',
			    container = this._controlContainer =
			            L.DomUtil.create('div', l + 'control-container', this._container);

			function createCorner(vSide, hSide) {
				var className = l + vSide + ' ' + l + hSide;

				corners[vSide + hSide] = L.DomUtil.create('div', className, container);
			}

			createCorner('top', 'left');
			createCorner('top', 'right');
			createCorner('bottom', 'left');
			createCorner('bottom', 'right');
		},

		_clearControlPos: function () {
			this._container.removeChild(this._controlContainer);
		}
	});


	/*
	 * L.Control.Zoom is used for the default zoom buttons on the map.
	 */

	L.Control.Zoom = L.Control.extend({
		options: {
			position: 'topleft',
			zoomInText: '+',
			zoomInTitle: 'Zoom in',
			zoomOutText: '-',
			zoomOutTitle: 'Zoom out'
		},

		onAdd: function (map) {
			var zoomName = 'leaflet-control-zoom',
			    container = L.DomUtil.create('div', zoomName + ' leaflet-bar');

			this._map = map;

			this._zoomInButton  = this._createButton(
			        this.options.zoomInText, this.options.zoomInTitle,
			        zoomName + '-in',  container, this._zoomIn,  this);
			this._zoomOutButton = this._createButton(
			        this.options.zoomOutText, this.options.zoomOutTitle,
			        zoomName + '-out', container, this._zoomOut, this);

			this._updateDisabled();
			map.on('zoomend zoomlevelschange', this._updateDisabled, this);

			return container;
		},

		onRemove: function (map) {
			map.off('zoomend zoomlevelschange', this._updateDisabled, this);
		},

		_zoomIn: function (e) {
			this._map.zoomIn(e.shiftKey ? 3 : 1);
		},

		_zoomOut: function (e) {
			this._map.zoomOut(e.shiftKey ? 3 : 1);
		},

		_createButton: function (html, title, className, container, fn, context) {
			var link = L.DomUtil.create('a', className, container);
			link.innerHTML = html;
			link.href = '#';
			link.title = title;

			var stop = L.DomEvent.stopPropagation;

			L.DomEvent
			    .on(link, 'click', stop)
			    .on(link, 'mousedown', stop)
			    .on(link, 'dblclick', stop)
			    .on(link, 'click', L.DomEvent.preventDefault)
			    .on(link, 'click', fn, context)
			    .on(link, 'click', this._refocusOnMap, context);

			return link;
		},

		_updateDisabled: function () {
			var map = this._map,
				className = 'leaflet-disabled';

			L.DomUtil.removeClass(this._zoomInButton, className);
			L.DomUtil.removeClass(this._zoomOutButton, className);

			if (map._zoom === map.getMinZoom()) {
				L.DomUtil.addClass(this._zoomOutButton, className);
			}
			if (map._zoom === map.getMaxZoom()) {
				L.DomUtil.addClass(this._zoomInButton, className);
			}
		}
	});

	L.Map.mergeOptions({
		zoomControl: true
	});

	L.Map.addInitHook(function () {
		if (this.options.zoomControl) {
			this.zoomControl = new L.Control.Zoom();
			this.addControl(this.zoomControl);
		}
	});

	L.control.zoom = function (options) {
		return new L.Control.Zoom(options);
	};



	/*
	 * L.Control.Attribution is used for displaying attribution on the map (added by default).
	 */

	L.Control.Attribution = L.Control.extend({
		options: {
			position: 'bottomright',
			prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
		},

		initialize: function (options) {
			L.setOptions(this, options);

			this._attributions = {};
		},

		onAdd: function (map) {
			this._container = L.DomUtil.create('div', 'leaflet-control-attribution');
			L.DomEvent.disableClickPropagation(this._container);

			for (var i in map._layers) {
				if (map._layers[i].getAttribution) {
					this.addAttribution(map._layers[i].getAttribution());
				}
			}
			
			map
			    .on('layeradd', this._onLayerAdd, this)
			    .on('layerremove', this._onLayerRemove, this);

			this._update();

			return this._container;
		},

		onRemove: function (map) {
			map
			    .off('layeradd', this._onLayerAdd)
			    .off('layerremove', this._onLayerRemove);

		},

		setPrefix: function (prefix) {
			this.options.prefix = prefix;
			this._update();
			return this;
		},

		addAttribution: function (text) {
			if (!text) { return; }

			if (!this._attributions[text]) {
				this._attributions[text] = 0;
			}
			this._attributions[text]++;

			this._update();

			return this;
		},

		removeAttribution: function (text) {
			if (!text) { return; }

			if (this._attributions[text]) {
				this._attributions[text]--;
				this._update();
			}

			return this;
		},

		_update: function () {
			if (!this._map) { return; }

			var attribs = [];

			for (var i in this._attributions) {
				if (this._attributions[i]) {
					attribs.push(i);
				}
			}

			var prefixAndAttribs = [];

			if (this.options.prefix) {
				prefixAndAttribs.push(this.options.prefix);
			}
			if (attribs.length) {
				prefixAndAttribs.push(attribs.join(', '));
			}

			this._container.innerHTML = prefixAndAttribs.join(' | ');
		},

		_onLayerAdd: function (e) {
			if (e.layer.getAttribution) {
				this.addAttribution(e.layer.getAttribution());
			}
		},

		_onLayerRemove: function (e) {
			if (e.layer.getAttribution) {
				this.removeAttribution(e.layer.getAttribution());
			}
		}
	});

	L.Map.mergeOptions({
		attributionControl: true
	});

	L.Map.addInitHook(function () {
		if (this.options.attributionControl) {
			this.attributionControl = (new L.Control.Attribution()).addTo(this);
		}
	});

	L.control.attribution = function (options) {
		return new L.Control.Attribution(options);
	};


	/*
	 * L.Control.Scale is used for displaying metric/imperial scale on the map.
	 */

	L.Control.Scale = L.Control.extend({
		options: {
			position: 'bottomleft',
			maxWidth: 100,
			metric: true,
			imperial: true,
			updateWhenIdle: false
		},

		onAdd: function (map) {
			this._map = map;

			var className = 'leaflet-control-scale',
			    container = L.DomUtil.create('div', className),
			    options = this.options;

			this._addScales(options, className, container);

			map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
			map.whenReady(this._update, this);

			return container;
		},

		onRemove: function (map) {
			map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
		},

		_addScales: function (options, className, container) {
			if (options.metric) {
				this._mScale = L.DomUtil.create('div', className + '-line', container);
			}
			if (options.imperial) {
				this._iScale = L.DomUtil.create('div', className + '-line', container);
			}
		},

		_update: function () {
			var bounds = this._map.getBounds(),
			    centerLat = bounds.getCenter().lat,
			    halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
			    dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,

			    size = this._map.getSize(),
			    options = this.options,
			    maxMeters = 0;

			if (size.x > 0) {
				maxMeters = dist * (options.maxWidth / size.x);
			}

			this._updateScales(options, maxMeters);
		},

		_updateScales: function (options, maxMeters) {
			if (options.metric && maxMeters) {
				this._updateMetric(maxMeters);
			}

			if (options.imperial && maxMeters) {
				this._updateImperial(maxMeters);
			}
		},

		_updateMetric: function (maxMeters) {
			var meters = this._getRoundNum(maxMeters);

			this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
			this._mScale.innerHTML = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
		},

		_updateImperial: function (maxMeters) {
			var maxFeet = maxMeters * 3.2808399,
			    scale = this._iScale,
			    maxMiles, miles, feet;

			if (maxFeet > 5280) {
				maxMiles = maxFeet / 5280;
				miles = this._getRoundNum(maxMiles);

				scale.style.width = this._getScaleWidth(miles / maxMiles) + 'px';
				scale.innerHTML = miles + ' mi';

			} else {
				feet = this._getRoundNum(maxFeet);

				scale.style.width = this._getScaleWidth(feet / maxFeet) + 'px';
				scale.innerHTML = feet + ' ft';
			}
		},

		_getScaleWidth: function (ratio) {
			return Math.round(this.options.maxWidth * ratio) - 10;
		},

		_getRoundNum: function (num) {
			var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
			    d = num / pow10;

			d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

			return pow10 * d;
		}
	});

	L.control.scale = function (options) {
		return new L.Control.Scale(options);
	};


	/*
	 * L.Control.Layers is a control to allow users to switch between different layers on the map.
	 */

	L.Control.Layers = L.Control.extend({
		options: {
			collapsed: true,
			position: 'topright',
			autoZIndex: true
		},

		initialize: function (baseLayers, overlays, options) {
			L.setOptions(this, options);

			this._layers = {};
			this._lastZIndex = 0;
			this._handlingClick = false;

			for (var i in baseLayers) {
				this._addLayer(baseLayers[i], i);
			}

			for (i in overlays) {
				this._addLayer(overlays[i], i, true);
			}
		},

		onAdd: function (map) {
			this._initLayout();
			this._update();

			map
			    .on('layeradd', this._onLayerChange, this)
			    .on('layerremove', this._onLayerChange, this);

			return this._container;
		},

		onRemove: function (map) {
			map
			    .off('layeradd', this._onLayerChange, this)
			    .off('layerremove', this._onLayerChange, this);
		},

		addBaseLayer: function (layer, name) {
			this._addLayer(layer, name);
			this._update();
			return this;
		},

		addOverlay: function (layer, name) {
			this._addLayer(layer, name, true);
			this._update();
			return this;
		},

		removeLayer: function (layer) {
			var id = L.stamp(layer);
			delete this._layers[id];
			this._update();
			return this;
		},

		_initLayout: function () {
			var className = 'leaflet-control-layers',
			    container = this._container = L.DomUtil.create('div', className);

			//Makes this work on IE10 Touch devices by stopping it from firing a mouseout event when the touch is released
			container.setAttribute('aria-haspopup', true);

			if (!L.Browser.touch) {
				L.DomEvent
					.disableClickPropagation(container)
					.disableScrollPropagation(container);
			} else {
				L.DomEvent.on(container, 'click', L.DomEvent.stopPropagation);
			}

			var form = this._form = L.DomUtil.create('form', className + '-list');

			if (this.options.collapsed) {
				if (!L.Browser.android) {
					L.DomEvent
					    .on(container, 'mouseover', this._expand, this)
					    .on(container, 'mouseout', this._collapse, this);
				}
				var link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
				link.href = '#';
				link.title = 'Layers';

				if (L.Browser.touch) {
					L.DomEvent
					    .on(link, 'click', L.DomEvent.stop)
					    .on(link, 'click', this._expand, this);
				}
				else {
					L.DomEvent.on(link, 'focus', this._expand, this);
				}
				//Work around for Firefox android issue https://github.com/Leaflet/Leaflet/issues/2033
				L.DomEvent.on(form, 'click', function () {
					setTimeout(L.bind(this._onInputClick, this), 0);
				}, this);

				this._map.on('click', this._collapse, this);
				// TODO keyboard accessibility
			} else {
				this._expand();
			}

			this._baseLayersList = L.DomUtil.create('div', className + '-base', form);
			this._separator = L.DomUtil.create('div', className + '-separator', form);
			this._overlaysList = L.DomUtil.create('div', className + '-overlays', form);

			container.appendChild(form);
		},

		_addLayer: function (layer, name, overlay) {
			var id = L.stamp(layer);

			this._layers[id] = {
				layer: layer,
				name: name,
				overlay: overlay
			};

			if (this.options.autoZIndex && layer.setZIndex) {
				this._lastZIndex++;
				layer.setZIndex(this._lastZIndex);
			}
		},

		_update: function () {
			if (!this._container) {
				return;
			}

			this._baseLayersList.innerHTML = '';
			this._overlaysList.innerHTML = '';

			var baseLayersPresent = false,
			    overlaysPresent = false,
			    i, obj;

			for (i in this._layers) {
				obj = this._layers[i];
				this._addItem(obj);
				overlaysPresent = overlaysPresent || obj.overlay;
				baseLayersPresent = baseLayersPresent || !obj.overlay;
			}

			this._separator.style.display = overlaysPresent && baseLayersPresent ? '' : 'none';
		},

		_onLayerChange: function (e) {
			var obj = this._layers[L.stamp(e.layer)];

			if (!obj) { return; }

			if (!this._handlingClick) {
				this._update();
			}

			var type = obj.overlay ?
				(e.type === 'layeradd' ? 'overlayadd' : 'overlayremove') :
				(e.type === 'layeradd' ? 'baselayerchange' : null);

			if (type) {
				this._map.fire(type, obj);
			}
		},

		// IE7 bugs out if you create a radio dynamically, so you have to do it this hacky way (see http://bit.ly/PqYLBe)
		_createRadioElement: function (name, checked) {

			var radioHtml = '<input type="radio" class="leaflet-control-layers-selector" name="' + name + '"';
			if (checked) {
				radioHtml += ' checked="checked"';
			}
			radioHtml += '/>';

			var radioFragment = document.createElement('div');
			radioFragment.innerHTML = radioHtml;

			return radioFragment.firstChild;
		},

		_addItem: function (obj) {
			var label = document.createElement('label'),
			    input,
			    checked = this._map.hasLayer(obj.layer);

			if (obj.overlay) {
				input = document.createElement('input');
				input.type = 'checkbox';
				input.className = 'leaflet-control-layers-selector';
				input.defaultChecked = checked;
			} else {
				input = this._createRadioElement('leaflet-base-layers', checked);
			}

			input.layerId = L.stamp(obj.layer);

			L.DomEvent.on(input, 'click', this._onInputClick, this);

			var name = document.createElement('span');
			name.innerHTML = ' ' + obj.name;

			label.appendChild(input);
			label.appendChild(name);

			var container = obj.overlay ? this._overlaysList : this._baseLayersList;
			container.appendChild(label);

			return label;
		},

		_onInputClick: function () {
			var i, input, obj,
			    inputs = this._form.getElementsByTagName('input'),
			    inputsLen = inputs.length;

			this._handlingClick = true;

			for (i = 0; i < inputsLen; i++) {
				input = inputs[i];
				obj = this._layers[input.layerId];

				if (input.checked && !this._map.hasLayer(obj.layer)) {
					this._map.addLayer(obj.layer);

				} else if (!input.checked && this._map.hasLayer(obj.layer)) {
					this._map.removeLayer(obj.layer);
				}
			}

			this._handlingClick = false;

			this._refocusOnMap();
		},

		_expand: function () {
			L.DomUtil.addClass(this._container, 'leaflet-control-layers-expanded');
		},

		_collapse: function () {
			this._container.className = this._container.className.replace(' leaflet-control-layers-expanded', '');
		}
	});

	L.control.layers = function (baseLayers, overlays, options) {
		return new L.Control.Layers(baseLayers, overlays, options);
	};


	/*
	 * L.PosAnimation is used by Leaflet internally for pan animations.
	 */

	L.PosAnimation = L.Class.extend({
		includes: L.Mixin.Events,

		run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
			this.stop();

			this._el = el;
			this._inProgress = true;
			this._newPos = newPos;

			this.fire('start');

			el.style[L.DomUtil.TRANSITION] = 'all ' + (duration || 0.25) +
			        's cubic-bezier(0,0,' + (easeLinearity || 0.5) + ',1)';

			L.DomEvent.on(el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);
			L.DomUtil.setPosition(el, newPos);

			// toggle reflow, Chrome flickers for some reason if you don't do this
			L.Util.falseFn(el.offsetWidth);

			// there's no native way to track value updates of transitioned properties, so we imitate this
			this._stepTimer = setInterval(L.bind(this._onStep, this), 50);
		},

		stop: function () {
			if (!this._inProgress) { return; }

			// if we just removed the transition property, the element would jump to its final position,
			// so we need to make it stay at the current position

			L.DomUtil.setPosition(this._el, this._getPos());
			this._onTransitionEnd();
			L.Util.falseFn(this._el.offsetWidth); // force reflow in case we are about to start a new animation
		},

		_onStep: function () {
			var stepPos = this._getPos();
			if (!stepPos) {
				this._onTransitionEnd();
				return;
			}
			// jshint camelcase: false
			// make L.DomUtil.getPosition return intermediate position value during animation
			this._el._leaflet_pos = stepPos;

			this.fire('step');
		},

		// you can't easily get intermediate values of properties animated with CSS3 Transitions,
		// we need to parse computed style (in case of transform it returns matrix string)

		_transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/,

		_getPos: function () {
			var left, top, matches,
			    el = this._el,
			    style = window.getComputedStyle(el);

			if (L.Browser.any3d) {
				matches = style[L.DomUtil.TRANSFORM].match(this._transformRe);
				if (!matches) { return; }
				left = parseFloat(matches[1]);
				top  = parseFloat(matches[2]);
			} else {
				left = parseFloat(style.left);
				top  = parseFloat(style.top);
			}

			return new L.Point(left, top, true);
		},

		_onTransitionEnd: function () {
			L.DomEvent.off(this._el, L.DomUtil.TRANSITION_END, this._onTransitionEnd, this);

			if (!this._inProgress) { return; }
			this._inProgress = false;

			this._el.style[L.DomUtil.TRANSITION] = '';

			// jshint camelcase: false
			// make sure L.DomUtil.getPosition returns the final position value after animation
			this._el._leaflet_pos = this._newPos;

			clearInterval(this._stepTimer);

			this.fire('step').fire('end');
		}

	});


	/*
	 * Extends L.Map to handle panning animations.
	 */

	L.Map.include({

		setView: function (center, zoom, options) {

			zoom = zoom === undefined ? this._zoom : this._limitZoom(zoom);
			center = this._limitCenter(L.latLng(center), zoom, this.options.maxBounds);
			options = options || {};

			if (this._panAnim) {
				this._panAnim.stop();
			}

			if (this._loaded && !options.reset && options !== true) {

				if (options.animate !== undefined) {
					options.zoom = L.extend({animate: options.animate}, options.zoom);
					options.pan = L.extend({animate: options.animate}, options.pan);
				}

				// try animating pan or zoom
				var animated = (this._zoom !== zoom) ?
					this._tryAnimatedZoom && this._tryAnimatedZoom(center, zoom, options.zoom) :
					this._tryAnimatedPan(center, options.pan);

				if (animated) {
					// prevent resize handler call, the view will refresh after animation anyway
					clearTimeout(this._sizeTimer);
					return this;
				}
			}

			// animation didn't start, just reset the map view
			this._resetView(center, zoom);

			return this;
		},

		panBy: function (offset, options) {
			offset = L.point(offset).round();
			options = options || {};

			if (!offset.x && !offset.y) {
				return this;
			}

			if (!this._panAnim) {
				this._panAnim = new L.PosAnimation();

				this._panAnim.on({
					'step': this._onPanTransitionStep,
					'end': this._onPanTransitionEnd
				}, this);
			}

			// don't fire movestart if animating inertia
			if (!options.noMoveStart) {
				this.fire('movestart');
			}

			// animate pan unless animate: false specified
			if (options.animate !== false) {
				L.DomUtil.addClass(this._mapPane, 'leaflet-pan-anim');

				var newPos = this._getMapPanePos().subtract(offset);
				this._panAnim.run(this._mapPane, newPos, options.duration || 0.25, options.easeLinearity);
			} else {
				this._rawPanBy(offset);
				this.fire('move').fire('moveend');
			}

			return this;
		},

		_onPanTransitionStep: function () {
			this.fire('move');
		},

		_onPanTransitionEnd: function () {
			L.DomUtil.removeClass(this._mapPane, 'leaflet-pan-anim');
			this.fire('moveend');
		},

		_tryAnimatedPan: function (center, options) {
			// difference between the new and current centers in pixels
			var offset = this._getCenterOffset(center)._floor();

			// don't animate too far unless animate: true specified in options
			if ((options && options.animate) !== true && !this.getSize().contains(offset)) { return false; }

			this.panBy(offset, options);

			return true;
		}
	});


	/*
	 * L.PosAnimation fallback implementation that powers Leaflet pan animations
	 * in browsers that don't support CSS3 Transitions.
	 */

	L.PosAnimation = L.DomUtil.TRANSITION ? L.PosAnimation : L.PosAnimation.extend({

		run: function (el, newPos, duration, easeLinearity) { // (HTMLElement, Point[, Number, Number])
			this.stop();

			this._el = el;
			this._inProgress = true;
			this._duration = duration || 0.25;
			this._easeOutPower = 1 / Math.max(easeLinearity || 0.5, 0.2);

			this._startPos = L.DomUtil.getPosition(el);
			this._offset = newPos.subtract(this._startPos);
			this._startTime = +new Date();

			this.fire('start');

			this._animate();
		},

		stop: function () {
			if (!this._inProgress) { return; }

			this._step();
			this._complete();
		},

		_animate: function () {
			// animation loop
			this._animId = L.Util.requestAnimFrame(this._animate, this);
			this._step();
		},

		_step: function () {
			var elapsed = (+new Date()) - this._startTime,
			    duration = this._duration * 1000;

			if (elapsed < duration) {
				this._runFrame(this._easeOut(elapsed / duration));
			} else {
				this._runFrame(1);
				this._complete();
			}
		},

		_runFrame: function (progress) {
			var pos = this._startPos.add(this._offset.multiplyBy(progress));
			L.DomUtil.setPosition(this._el, pos);

			this.fire('step');
		},

		_complete: function () {
			L.Util.cancelAnimFrame(this._animId);

			this._inProgress = false;
			this.fire('end');
		},

		_easeOut: function (t) {
			return 1 - Math.pow(1 - t, this._easeOutPower);
		}
	});


	/*
	 * Extends L.Map to handle zoom animations.
	 */

	L.Map.mergeOptions({
		zoomAnimation: true,
		zoomAnimationThreshold: 4
	});

	if (L.DomUtil.TRANSITION) {

		L.Map.addInitHook(function () {
			// don't animate on browsers without hardware-accelerated transitions or old Android/Opera
			this._zoomAnimated = this.options.zoomAnimation && L.DomUtil.TRANSITION &&
					L.Browser.any3d && !L.Browser.android23 && !L.Browser.mobileOpera;

			// zoom transitions run with the same duration for all layers, so if one of transitionend events
			// happens after starting zoom animation (propagating to the map pane), we know that it ended globally
			if (this._zoomAnimated) {
				L.DomEvent.on(this._mapPane, L.DomUtil.TRANSITION_END, this._catchTransitionEnd, this);
			}
		});
	}

	L.Map.include(!L.DomUtil.TRANSITION ? {} : {

		_catchTransitionEnd: function (e) {
			if (this._animatingZoom && e.propertyName.indexOf('transform') >= 0) {
				this._onZoomTransitionEnd();
			}
		},

		_nothingToAnimate: function () {
			return !this._container.getElementsByClassName('leaflet-zoom-animated').length;
		},

		_tryAnimatedZoom: function (center, zoom, options) {

			if (this._animatingZoom) { return true; }

			options = options || {};

			// don't animate if disabled, not supported or zoom difference is too large
			if (!this._zoomAnimated || options.animate === false || this._nothingToAnimate() ||
			        Math.abs(zoom - this._zoom) > this.options.zoomAnimationThreshold) { return false; }

			// offset is the pixel coords of the zoom origin relative to the current center
			var scale = this.getZoomScale(zoom),
			    offset = this._getCenterOffset(center)._divideBy(1 - 1 / scale),
				origin = this._getCenterLayerPoint()._add(offset);

			// don't animate if the zoom origin isn't within one screen from the current center, unless forced
			if (options.animate !== true && !this.getSize().contains(offset)) { return false; }

			this
			    .fire('movestart')
			    .fire('zoomstart');

			this._animateZoom(center, zoom, origin, scale, null, true);

			return true;
		},

		_animateZoom: function (center, zoom, origin, scale, delta, backwards, forTouchZoom) {

			if (!forTouchZoom) {
				this._animatingZoom = true;
			}

			// put transform transition on all layers with leaflet-zoom-animated class
			L.DomUtil.addClass(this._mapPane, 'leaflet-zoom-anim');

			// remember what center/zoom to set after animation
			this._animateToCenter = center;
			this._animateToZoom = zoom;

			// disable any dragging during animation
			if (L.Draggable) {
				L.Draggable._disabled = true;
			}

			L.Util.requestAnimFrame(function () {
				this.fire('zoomanim', {
					center: center,
					zoom: zoom,
					origin: origin,
					scale: scale,
					delta: delta,
					backwards: backwards
				});
			}, this);
		},

		_onZoomTransitionEnd: function () {

			this._animatingZoom = false;

			L.DomUtil.removeClass(this._mapPane, 'leaflet-zoom-anim');

			this._resetView(this._animateToCenter, this._animateToZoom, true, true);

			if (L.Draggable) {
				L.Draggable._disabled = false;
			}
		}
	});


	/*
		Zoom animation logic for L.TileLayer.
	*/

	L.TileLayer.include({
		_animateZoom: function (e) {
			if (!this._animating) {
				this._animating = true;
				this._prepareBgBuffer();
			}

			var bg = this._bgBuffer,
			    transform = L.DomUtil.TRANSFORM,
			    initialTransform = e.delta ? L.DomUtil.getTranslateString(e.delta) : bg.style[transform],
			    scaleStr = L.DomUtil.getScaleString(e.scale, e.origin);

			bg.style[transform] = e.backwards ?
					scaleStr + ' ' + initialTransform :
					initialTransform + ' ' + scaleStr;
		},

		_endZoomAnim: function () {
			var front = this._tileContainer,
			    bg = this._bgBuffer;

			front.style.visibility = '';
			front.parentNode.appendChild(front); // Bring to fore

			// force reflow
			L.Util.falseFn(bg.offsetWidth);

			this._animating = false;
		},

		_clearBgBuffer: function () {
			var map = this._map;

			if (map && !map._animatingZoom && !map.touchZoom._zooming) {
				this._bgBuffer.innerHTML = '';
				this._bgBuffer.style[L.DomUtil.TRANSFORM] = '';
			}
		},

		_prepareBgBuffer: function () {

			var front = this._tileContainer,
			    bg = this._bgBuffer;

			// if foreground layer doesn't have many tiles but bg layer does,
			// keep the existing bg layer and just zoom it some more

			var bgLoaded = this._getLoadedTilesPercentage(bg),
			    frontLoaded = this._getLoadedTilesPercentage(front);

			if (bg && bgLoaded > 0.5 && frontLoaded < 0.5) {

				front.style.visibility = 'hidden';
				this._stopLoadingImages(front);
				return;
			}

			// prepare the buffer to become the front tile pane
			bg.style.visibility = 'hidden';
			bg.style[L.DomUtil.TRANSFORM] = '';

			// switch out the current layer to be the new bg layer (and vice-versa)
			this._tileContainer = bg;
			bg = this._bgBuffer = front;

			this._stopLoadingImages(bg);

			//prevent bg buffer from clearing right after zoom
			clearTimeout(this._clearBgBufferTimer);
		},

		_getLoadedTilesPercentage: function (container) {
			var tiles = container.getElementsByTagName('img'),
			    i, len, count = 0;

			for (i = 0, len = tiles.length; i < len; i++) {
				if (tiles[i].complete) {
					count++;
				}
			}
			return count / len;
		},

		// stops loading all tiles in the background layer
		_stopLoadingImages: function (container) {
			var tiles = Array.prototype.slice.call(container.getElementsByTagName('img')),
			    i, len, tile;

			for (i = 0, len = tiles.length; i < len; i++) {
				tile = tiles[i];

				if (!tile.complete) {
					tile.onload = L.Util.falseFn;
					tile.onerror = L.Util.falseFn;
					tile.src = L.Util.emptyImageUrl;

					tile.parentNode.removeChild(tile);
				}
			}
		}
	});


	/*
	 * Provides L.Map with convenient shortcuts for using browser geolocation features.
	 */

	L.Map.include({
		_defaultLocateOptions: {
			watch: false,
			setView: false,
			maxZoom: Infinity,
			timeout: 10000,
			maximumAge: 0,
			enableHighAccuracy: false
		},

		locate: function (/*Object*/ options) {

			options = this._locateOptions = L.extend(this._defaultLocateOptions, options);

			if (!navigator.geolocation) {
				this._handleGeolocationError({
					code: 0,
					message: 'Geolocation not supported.'
				});
				return this;
			}

			var onResponse = L.bind(this._handleGeolocationResponse, this),
				onError = L.bind(this._handleGeolocationError, this);

			if (options.watch) {
				this._locationWatchId =
				        navigator.geolocation.watchPosition(onResponse, onError, options);
			} else {
				navigator.geolocation.getCurrentPosition(onResponse, onError, options);
			}
			return this;
		},

		stopLocate: function () {
			if (navigator.geolocation) {
				navigator.geolocation.clearWatch(this._locationWatchId);
			}
			if (this._locateOptions) {
				this._locateOptions.setView = false;
			}
			return this;
		},

		_handleGeolocationError: function (error) {
			var c = error.code,
			    message = error.message ||
			            (c === 1 ? 'permission denied' :
			            (c === 2 ? 'position unavailable' : 'timeout'));

			if (this._locateOptions.setView && !this._loaded) {
				this.fitWorld();
			}

			this.fire('locationerror', {
				code: c,
				message: 'Geolocation error: ' + message + '.'
			});
		},

		_handleGeolocationResponse: function (pos) {
			var lat = pos.coords.latitude,
			    lng = pos.coords.longitude,
			    latlng = new L.LatLng(lat, lng),

			    latAccuracy = 180 * pos.coords.accuracy / 40075017,
			    lngAccuracy = latAccuracy / Math.cos(L.LatLng.DEG_TO_RAD * lat),

			    bounds = L.latLngBounds(
			            [lat - latAccuracy, lng - lngAccuracy],
			            [lat + latAccuracy, lng + lngAccuracy]),

			    options = this._locateOptions;

			if (options.setView) {
				var zoom = Math.min(this.getBoundsZoom(bounds), options.maxZoom);
				this.setView(latlng, zoom);
			}

			var data = {
				latlng: latlng,
				bounds: bounds,
				timestamp: pos.timestamp
			};

			for (var i in pos.coords) {
				if (typeof pos.coords[i] === 'number') {
					data[i] = pos.coords[i];
				}
			}

			this.fire('locationfound', data);
		}
	});


	}(window, document));

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {riot.tag('state-info-box', '', function(opts) {
	riot.tag('h4', 'Hello', function(opts) {
	});




	});

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	utils = {};

	/*
	utils.randomFloat = function(lower, upper) {
	    return lower + Math.random() * (upper - lower)
	}

	utils.randomInt = function(lower, upper) {
	    return Math.floor(utils.randomFloat(lower, upper+1));
	}*/
	utils.numberWithCommas = function(x) {
	    x = x.toString();
	    var pattern = /(-?\d+)(\d{3})/;
	    while (pattern.test(x))
	        x = x.replace(pattern, "$1,$2");
	    return x;
	}

	module.exports = utils;


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = {
	    "type": "FeatureCollection",
	    "features": [{
	        "type": "Feature",
	        "id": "01",
	        "properties": {
	            "name": "Alabama",
	            "density": 94.65
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-87.359296, 35.00118],
	                    [-85.606675, 34.984749],
	                    [-85.431413, 34.124869],
	                    [-85.184951, 32.859696],
	                    [-85.069935, 32.580372],
	                    [-84.960397, 32.421541],
	                    [-85.004212, 32.322956],
	                    [-84.889196, 32.262709],
	                    [-85.058981, 32.13674],
	                    [-85.053504, 32.01077],
	                    [-85.141136, 31.840985],
	                    [-85.042551, 31.539753],
	                    [-85.113751, 31.27686],
	                    [-85.004212, 31.003013],
	                    [-85.497137, 30.997536],
	                    [-87.600282, 30.997536],
	                    [-87.633143, 30.86609],
	                    [-87.408589, 30.674397],
	                    [-87.446927, 30.510088],
	                    [-87.37025, 30.427934],
	                    [-87.518128, 30.280057],
	                    [-87.655051, 30.247195],
	                    [-87.90699, 30.411504],
	                    [-87.934375, 30.657966],
	                    [-88.011052, 30.685351],
	                    [-88.10416, 30.499135],
	                    [-88.137022, 30.318396],
	                    [-88.394438, 30.367688],
	                    [-88.471115, 31.895754],
	                    [-88.241084, 33.796253],
	                    [-88.098683, 34.891641],
	                    [-88.202745, 34.995703],
	                    [-87.359296, 35.00118]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "02",
	        "properties": {
	            "name": "Alaska",
	            "density": 1.264
	        },
	        "geometry": {
	            "type": "MultiPolygon",
	            "coordinates": [
	                [
	                    [
	                        [-131.602021, 55.117982],
	                        [-131.569159, 55.28229],
	                        [-131.355558, 55.183705],
	                        [-131.38842, 55.01392],
	                        [-131.645836, 55.035827],
	                        [-131.602021, 55.117982]
	                    ]
	                ],
	                [
	                    [
	                        [-131.832052, 55.42469],
	                        [-131.645836, 55.304197],
	                        [-131.749898, 55.128935],
	                        [-131.832052, 55.189182],
	                        [-131.832052, 55.42469]
	                    ]
	                ],
	                [
	                    [
	                        [-132.976733, 56.437924],
	                        [-132.735747, 56.459832],
	                        [-132.631685, 56.421493],
	                        [-132.664547, 56.273616],
	                        [-132.878148, 56.240754],
	                        [-133.069841, 56.333862],
	                        [-132.976733, 56.437924]
	                    ]
	                ],
	                [
	                    [
	                        [-133.595627, 56.350293],
	                        [-133.162949, 56.317431],
	                        [-133.05341, 56.125739],
	                        [-132.620732, 55.912138],
	                        [-132.472854, 55.780691],
	                        [-132.4619, 55.671152],
	                        [-132.357838, 55.649245],
	                        [-132.341408, 55.506844],
	                        [-132.166146, 55.364444],
	                        [-132.144238, 55.238474],
	                        [-132.029222, 55.276813],
	                        [-131.97993, 55.178228],
	                        [-131.958022, 54.789365],
	                        [-132.029222, 54.701734],
	                        [-132.308546, 54.718165],
	                        [-132.385223, 54.915335],
	                        [-132.483808, 54.898904],
	                        [-132.686455, 55.046781],
	                        [-132.746701, 54.997489],
	                        [-132.916486, 55.046781],
	                        [-132.889102, 54.898904],
	                        [-132.73027, 54.937242],
	                        [-132.626209, 54.882473],
	                        [-132.675501, 54.679826],
	                        [-132.867194, 54.701734],
	                        [-133.157472, 54.95915],
	                        [-133.239626, 55.090597],
	                        [-133.223195, 55.22752],
	                        [-133.453227, 55.216566],
	                        [-133.453227, 55.320628],
	                        [-133.277964, 55.331582],
	                        [-133.102702, 55.42469],
	                        [-133.17938, 55.588998],
	                        [-133.387503, 55.62186],
	                        [-133.420365, 55.884753],
	                        [-133.497042, 56.0162],
	                        [-133.639442, 55.923092],
	                        [-133.694212, 56.070969],
	                        [-133.546335, 56.142169],
	                        [-133.666827, 56.311955],
	                        [-133.595627, 56.350293]
	                    ]
	                ],
	                [
	                    [
	                        [-133.738027, 55.556137],
	                        [-133.546335, 55.490413],
	                        [-133.414888, 55.572568],
	                        [-133.283441, 55.534229],
	                        [-133.420365, 55.386352],
	                        [-133.633966, 55.430167],
	                        [-133.738027, 55.556137]
	                    ]
	                ],
	                [
	                    [
	                        [-133.907813, 56.930849],
	                        [-134.050213, 57.029434],
	                        [-133.885905, 57.095157],
	                        [-133.343688, 57.002049],
	                        [-133.102702, 57.007526],
	                        [-132.932917, 56.82131],
	                        [-132.620732, 56.667956],
	                        [-132.653593, 56.55294],
	                        [-132.817901, 56.492694],
	                        [-133.042456, 56.520078],
	                        [-133.201287, 56.448878],
	                        [-133.420365, 56.492694],
	                        [-133.66135, 56.448878],
	                        [-133.710643, 56.684386],
	                        [-133.688735, 56.837741],
	                        [-133.869474, 56.843218],
	                        [-133.907813, 56.930849]
	                    ]
	                ],
	                [
	                    [
	                        [-134.115936, 56.48174],
	                        [-134.25286, 56.558417],
	                        [-134.400737, 56.722725],
	                        [-134.417168, 56.848695],
	                        [-134.296675, 56.908941],
	                        [-134.170706, 56.848695],
	                        [-134.143321, 56.952757],
	                        [-133.748981, 56.772017],
	                        [-133.710643, 56.596755],
	                        [-133.847566, 56.574848],
	                        [-133.935197, 56.377678],
	                        [-133.836612, 56.322908],
	                        [-133.957105, 56.092877],
	                        [-134.110459, 56.142169],
	                        [-134.132367, 55.999769],
	                        [-134.230952, 56.070969],
	                        [-134.291198, 56.350293],
	                        [-134.115936, 56.48174]
	                    ]
	                ],
	                [
	                    [
	                        [-134.636246, 56.28457],
	                        [-134.669107, 56.169554],
	                        [-134.806031, 56.235277],
	                        [-135.178463, 56.67891],
	                        [-135.413971, 56.810356],
	                        [-135.331817, 56.914418],
	                        [-135.424925, 57.166357],
	                        [-135.687818, 57.369004],
	                        [-135.419448, 57.566174],
	                        [-135.298955, 57.48402],
	                        [-135.063447, 57.418296],
	                        [-134.849846, 57.407343],
	                        [-134.844369, 57.248511],
	                        [-134.636246, 56.728202],
	                        [-134.636246, 56.28457]
	                    ]
	                ],
	                [
	                    [
	                        [-134.712923, 58.223407],
	                        [-134.373353, 58.14673],
	                        [-134.176183, 58.157683],
	                        [-134.187137, 58.081006],
	                        [-133.902336, 57.807159],
	                        [-134.099505, 57.850975],
	                        [-134.148798, 57.757867],
	                        [-133.935197, 57.615466],
	                        [-133.869474, 57.363527],
	                        [-134.083075, 57.297804],
	                        [-134.154275, 57.210173],
	                        [-134.499322, 57.029434],
	                        [-134.603384, 57.034911],
	                        [-134.6472, 57.226604],
	                        [-134.575999, 57.341619],
	                        [-134.608861, 57.511404],
	                        [-134.729354, 57.719528],
	                        [-134.707446, 57.829067],
	                        [-134.784123, 58.097437],
	                        [-134.91557, 58.212453],
	                        [-134.953908, 58.409623],
	                        [-134.712923, 58.223407]
	                    ]
	                ],
	                [
	                    [
	                        [-135.857603, 57.330665],
	                        [-135.715203, 57.330665],
	                        [-135.567326, 57.149926],
	                        [-135.633049, 57.023957],
	                        [-135.857603, 56.996572],
	                        [-135.824742, 57.193742],
	                        [-135.857603, 57.330665]
	                    ]
	                ],
	                [
	                    [
	                        [-136.279328, 58.206976],
	                        [-135.978096, 58.201499],
	                        [-135.780926, 58.28913],
	                        [-135.496125, 58.168637],
	                        [-135.64948, 58.037191],
	                        [-135.59471, 57.987898],
	                        [-135.45231, 58.135776],
	                        [-135.107263, 58.086483],
	                        [-134.91557, 57.976944],
	                        [-135.025108, 57.779775],
	                        [-134.937477, 57.763344],
	                        [-134.822462, 57.500451],
	                        [-135.085355, 57.462112],
	                        [-135.572802, 57.675713],
	                        [-135.556372, 57.456635],
	                        [-135.709726, 57.369004],
	                        [-135.890465, 57.407343],
	                        [-136.000004, 57.544266],
	                        [-136.208128, 57.637374],
	                        [-136.366959, 57.829067],
	                        [-136.569606, 57.916698],
	                        [-136.558652, 58.075529],
	                        [-136.421728, 58.130299],
	                        [-136.377913, 58.267222],
	                        [-136.279328, 58.206976]
	                    ]
	                ],
	                [
	                    [
	                        [-147.079854, 60.200582],
	                        [-147.501579, 59.948643],
	                        [-147.53444, 59.850058],
	                        [-147.874011, 59.784335],
	                        [-147.80281, 59.937689],
	                        [-147.435855, 60.09652],
	                        [-147.205824, 60.271782],
	                        [-147.079854, 60.200582]
	                    ]
	                ],
	                [
	                    [
	                        [-147.561825, 60.578491],
	                        [-147.616594, 60.370367],
	                        [-147.758995, 60.156767],
	                        [-147.956165, 60.227967],
	                        [-147.791856, 60.474429],
	                        [-147.561825, 60.578491]
	                    ]
	                ],
	                [
	                    [
	                        [-147.786379, 70.245291],
	                        [-147.682318, 70.201475],
	                        [-147.162008, 70.15766],
	                        [-146.888161, 70.185044],
	                        [-146.510252, 70.185044],
	                        [-146.099482, 70.146706],
	                        [-145.858496, 70.168614],
	                        [-145.622988, 70.08646],
	                        [-145.195787, 69.993352],
	                        [-144.620708, 69.971444],
	                        [-144.461877, 70.026213],
	                        [-144.078491, 70.059075],
	                        [-143.914183, 70.130275],
	                        [-143.497935, 70.141229],
	                        [-143.503412, 70.091936],
	                        [-143.25695, 70.119321],
	                        [-142.747594, 70.042644],
	                        [-142.402547, 69.916674],
	                        [-142.079408, 69.856428],
	                        [-142.008207, 69.801659],
	                        [-141.712453, 69.790705],
	                        [-141.433129, 69.697597],
	                        [-141.378359, 69.63735],
	                        [-141.208574, 69.686643],
	                        [-141.00045, 69.648304],
	                        [-141.00045, 60.304644],
	                        [-140.53491, 60.22249],
	                        [-140.474664, 60.310121],
	                        [-139.987216, 60.184151],
	                        [-139.696939, 60.342983],
	                        [-139.088998, 60.359413],
	                        [-139.198537, 60.091043],
	                        [-139.045183, 59.997935],
	                        [-138.700135, 59.910304],
	                        [-138.623458, 59.767904],
	                        [-137.604747, 59.242118],
	                        [-137.445916, 58.908024],
	                        [-137.265177, 59.001132],
	                        [-136.827022, 59.159963],
	                        [-136.580559, 59.16544],
	                        [-136.465544, 59.285933],
	                        [-136.476498, 59.466672],
	                        [-136.301236, 59.466672],
	                        [-136.25742, 59.625503],
	                        [-135.945234, 59.663842],
	                        [-135.479694, 59.800766],
	                        [-135.025108, 59.565257],
	                        [-135.068924, 59.422857],
	                        [-134.959385, 59.280456],
	                        [-134.701969, 59.247595],
	                        [-134.378829, 59.033994],
	                        [-134.400737, 58.973748],
	                        [-134.25286, 58.858732],
	                        [-133.842089, 58.727285],
	                        [-133.173903, 58.152206],
	                        [-133.075318, 57.998852],
	                        [-132.867194, 57.845498],
	                        [-132.560485, 57.505928],
	                        [-132.253777, 57.21565],
	                        [-132.368792, 57.095157],
	                        [-132.05113, 57.051341],
	                        [-132.127807, 56.876079],
	                        [-131.870391, 56.804879],
	                        [-131.837529, 56.602232],
	                        [-131.580113, 56.613186],
	                        [-131.087188, 56.405062],
	                        [-130.78048, 56.366724],
	                        [-130.621648, 56.268139],
	                        [-130.468294, 56.240754],
	                        [-130.424478, 56.142169],
	                        [-130.101339, 56.114785],
	                        [-130.002754, 55.994292],
	                        [-130.150631, 55.769737],
	                        [-130.128724, 55.583521],
	                        [-129.986323, 55.276813],
	                        [-130.095862, 55.200136],
	                        [-130.336847, 54.920812],
	                        [-130.687372, 54.718165],
	                        [-130.785957, 54.822227],
	                        [-130.917403, 54.789365],
	                        [-131.010511, 54.997489],
	                        [-130.983126, 55.08512],
	                        [-131.092665, 55.189182],
	                        [-130.862634, 55.298721],
	                        [-130.928357, 55.337059],
	                        [-131.158389, 55.200136],
	                        [-131.284358, 55.287767],
	                        [-131.426759, 55.238474],
	                        [-131.843006, 55.457552],
	                        [-131.700606, 55.698537],
	                        [-131.963499, 55.616383],
	                        [-131.974453, 55.49589],
	                        [-132.182576, 55.588998],
	                        [-132.226392, 55.704014],
	                        [-132.083991, 55.829984],
	                        [-132.127807, 55.955953],
	                        [-132.324977, 55.851892],
	                        [-132.522147, 56.076446],
	                        [-132.642639, 56.032631],
	                        [-132.719317, 56.218847],
	                        [-132.527624, 56.339339],
	                        [-132.341408, 56.339339],
	                        [-132.396177, 56.487217],
	                        [-132.297592, 56.67891],
	                        [-132.450946, 56.673433],
	                        [-132.768609, 56.837741],
	                        [-132.993164, 57.034911],
	                        [-133.51895, 57.177311],
	                        [-133.507996, 57.577128],
	                        [-133.677781, 57.62642],
	                        [-133.639442, 57.790728],
	                        [-133.814705, 57.834544],
	                        [-134.072121, 58.053622],
	                        [-134.143321, 58.168637],
	                        [-134.586953, 58.206976],
	                        [-135.074401, 58.502731],
	                        [-135.282525, 59.192825],
	                        [-135.38111, 59.033994],
	                        [-135.337294, 58.891593],
	                        [-135.140124, 58.617746],
	                        [-135.189417, 58.573931],
	                        [-135.05797, 58.349376],
	                        [-135.085355, 58.201499],
	                        [-135.277048, 58.234361],
	                        [-135.430402, 58.398669],
	                        [-135.633049, 58.426053],
	                        [-135.91785, 58.382238],
	                        [-135.912373, 58.617746],
	                        [-136.087635, 58.814916],
	                        [-136.246466, 58.75467],
	                        [-136.876314, 58.962794],
	                        [-136.931084, 58.902547],
	                        [-136.586036, 58.836824],
	                        [-136.317666, 58.672516],
	                        [-136.213604, 58.667039],
	                        [-136.180743, 58.535592],
	                        [-136.043819, 58.382238],
	                        [-136.388867, 58.294607],
	                        [-136.591513, 58.349376],
	                        [-136.59699, 58.212453],
	                        [-136.859883, 58.316515],
	                        [-136.947514, 58.393192],
	                        [-137.111823, 58.393192],
	                        [-137.566409, 58.590362],
	                        [-137.900502, 58.765624],
	                        [-137.933364, 58.869686],
	                        [-138.11958, 59.02304],
	                        [-138.634412, 59.132579],
	                        [-138.919213, 59.247595],
	                        [-139.417615, 59.379041],
	                        [-139.746231, 59.505011],
	                        [-139.718846, 59.641934],
	                        [-139.625738, 59.598119],
	                        [-139.5162, 59.68575],
	                        [-139.625738, 59.88292],
	                        [-139.488815, 59.992458],
	                        [-139.554538, 60.041751],
	                        [-139.801, 59.833627],
	                        [-140.315833, 59.696704],
	                        [-140.92925, 59.745996],
	                        [-141.444083, 59.871966],
	                        [-141.46599, 59.970551],
	                        [-141.706976, 59.948643],
	                        [-141.964392, 60.019843],
	                        [-142.539471, 60.085566],
	                        [-142.873564, 60.091043],
	                        [-143.623905, 60.036274],
	                        [-143.892275, 59.997935],
	                        [-144.231845, 60.140336],
	                        [-144.65357, 60.206059],
	                        [-144.785016, 60.29369],
	                        [-144.834309, 60.441568],
	                        [-145.124586, 60.430614],
	                        [-145.223171, 60.299167],
	                        [-145.738004, 60.474429],
	                        [-145.820158, 60.551106],
	                        [-146.351421, 60.408706],
	                        [-146.608837, 60.238921],
	                        [-146.718376, 60.397752],
	                        [-146.608837, 60.485383],
	                        [-146.455483, 60.463475],
	                        [-145.951604, 60.578491],
	                        [-146.017328, 60.666122],
	                        [-146.252836, 60.622307],
	                        [-146.345944, 60.737322],
	                        [-146.565022, 60.753753],
	                        [-146.784099, 61.044031],
	                        [-146.866253, 60.972831],
	                        [-147.172962, 60.934492],
	                        [-147.271547, 60.972831],
	                        [-147.375609, 60.879723],
	                        [-147.758995, 60.912584],
	                        [-147.775426, 60.808523],
	                        [-148.032842, 60.781138],
	                        [-148.153334, 60.819476],
	                        [-148.065703, 61.005692],
	                        [-148.175242, 61.000215],
	                        [-148.350504, 60.803046],
	                        [-148.109519, 60.737322],
	                        [-148.087611, 60.594922],
	                        [-147.939734, 60.441568],
	                        [-148.027365, 60.277259],
	                        [-148.219058, 60.332029],
	                        [-148.273827, 60.249875],
	                        [-148.087611, 60.217013],
	                        [-147.983549, 59.997935],
	                        [-148.251919, 59.95412],
	                        [-148.399797, 59.997935],
	                        [-148.635305, 59.937689],
	                        [-148.755798, 59.986981],
	                        [-149.067984, 59.981505],
	                        [-149.05703, 60.063659],
	                        [-149.204907, 60.008889],
	                        [-149.287061, 59.904827],
	                        [-149.418508, 59.997935],
	                        [-149.582816, 59.866489],
	                        [-149.511616, 59.806242],
	                        [-149.741647, 59.729565],
	                        [-149.949771, 59.718611],
	                        [-150.031925, 59.61455],
	                        [-150.25648, 59.521442],
	                        [-150.409834, 59.554303],
	                        [-150.579619, 59.444764],
	                        [-150.716543, 59.450241],
	                        [-151.001343, 59.225687],
	                        [-151.308052, 59.209256],
	                        [-151.406637, 59.280456],
	                        [-151.592853, 59.159963],
	                        [-151.976239, 59.253071],
	                        [-151.888608, 59.422857],
	                        [-151.636669, 59.483103],
	                        [-151.47236, 59.472149],
	                        [-151.423068, 59.537872],
	                        [-151.127313, 59.669319],
	                        [-151.116359, 59.778858],
	                        [-151.505222, 59.63098],
	                        [-151.828361, 59.718611],
	                        [-151.8667, 59.778858],
	                        [-151.702392, 60.030797],
	                        [-151.423068, 60.211536],
	                        [-151.379252, 60.359413],
	                        [-151.297098, 60.386798],
	                        [-151.264237, 60.545629],
	                        [-151.406637, 60.720892],
	                        [-151.06159, 60.786615],
	                        [-150.404357, 61.038554],
	                        [-150.245526, 60.939969],
	                        [-150.042879, 60.912584],
	                        [-149.741647, 61.016646],
	                        [-150.075741, 61.15357],
	                        [-150.207187, 61.257632],
	                        [-150.47008, 61.246678],
	                        [-150.656296, 61.29597],
	                        [-150.711066, 61.252155],
	                        [-151.023251, 61.180954],
	                        [-151.165652, 61.044031],
	                        [-151.477837, 61.011169],
	                        [-151.800977, 60.852338],
	                        [-151.833838, 60.748276],
	                        [-152.080301, 60.693507],
	                        [-152.13507, 60.578491],
	                        [-152.310332, 60.507291],
	                        [-152.392486, 60.304644],
	                        [-152.732057, 60.173197],
	                        [-152.567748, 60.069136],
	                        [-152.704672, 59.915781],
	                        [-153.022334, 59.888397],
	                        [-153.049719, 59.691227],
	                        [-153.345474, 59.620026],
	                        [-153.438582, 59.702181],
	                        [-153.586459, 59.548826],
	                        [-153.761721, 59.543349],
	                        [-153.72886, 59.433811],
	                        [-154.117723, 59.368087],
	                        [-154.1944, 59.066856],
	                        [-153.750768, 59.050425],
	                        [-153.400243, 58.968271],
	                        [-153.301658, 58.869686],
	                        [-153.444059, 58.710854],
	                        [-153.679567, 58.612269],
	                        [-153.898645, 58.606793],
	                        [-153.920553, 58.519161],
	                        [-154.062953, 58.4863],
	                        [-153.99723, 58.376761],
	                        [-154.145107, 58.212453],
	                        [-154.46277, 58.059098],
	                        [-154.643509, 58.059098],
	                        [-154.818771, 58.004329],
	                        [-154.988556, 58.015283],
	                        [-155.120003, 57.955037],
	                        [-155.081664, 57.872883],
	                        [-155.328126, 57.829067],
	                        [-155.377419, 57.708574],
	                        [-155.547204, 57.785251],
	                        [-155.73342, 57.549743],
	                        [-156.045606, 57.566174],
	                        [-156.023698, 57.440204],
	                        [-156.209914, 57.473066],
	                        [-156.34136, 57.418296],
	                        [-156.34136, 57.248511],
	                        [-156.549484, 56.985618],
	                        [-156.883577, 56.952757],
	                        [-157.157424, 56.832264],
	                        [-157.20124, 56.766541],
	                        [-157.376502, 56.859649],
	                        [-157.672257, 56.607709],
	                        [-157.754411, 56.67891],
	                        [-157.918719, 56.657002],
	                        [-157.957058, 56.514601],
	                        [-158.126843, 56.459832],
	                        [-158.32949, 56.48174],
	                        [-158.488321, 56.339339],
	                        [-158.208997, 56.295524],
	                        [-158.510229, 55.977861],
	                        [-159.375585, 55.873799],
	                        [-159.616571, 55.594475],
	                        [-159.676817, 55.654722],
	                        [-159.643955, 55.829984],
	                        [-159.813741, 55.857368],
	                        [-160.027341, 55.791645],
	                        [-160.060203, 55.720445],
	                        [-160.394296, 55.605429],
	                        [-160.536697, 55.473983],
	                        [-160.580512, 55.567091],
	                        [-160.668143, 55.457552],
	                        [-160.865313, 55.528752],
	                        [-161.232268, 55.358967],
	                        [-161.506115, 55.364444],
	                        [-161.467776, 55.49589],
	                        [-161.588269, 55.62186],
	                        [-161.697808, 55.517798],
	                        [-161.686854, 55.408259],
	                        [-162.053809, 55.074166],
	                        [-162.179779, 55.15632],
	                        [-162.218117, 55.03035],
	                        [-162.470057, 55.052258],
	                        [-162.508395, 55.249428],
	                        [-162.661749, 55.293244],
	                        [-162.716519, 55.222043],
	                        [-162.579595, 55.134412],
	                        [-162.645319, 54.997489],
	                        [-162.847965, 54.926289],
	                        [-163.00132, 55.079643],
	                        [-163.187536, 55.090597],
	                        [-163.220397, 55.03035],
	                        [-163.034181, 54.942719],
	                        [-163.373752, 54.800319],
	                        [-163.14372, 54.76198],
	                        [-163.138243, 54.696257],
	                        [-163.329936, 54.74555],
	                        [-163.587352, 54.614103],
	                        [-164.085754, 54.61958],
	                        [-164.332216, 54.531949],
	                        [-164.354124, 54.466226],
	                        [-164.638925, 54.389548],
	                        [-164.847049, 54.416933],
	                        [-164.918249, 54.603149],
	                        [-164.710125, 54.663395],
	                        [-164.551294, 54.88795],
	                        [-164.34317, 54.893427],
	                        [-163.894061, 55.041304],
	                        [-163.532583, 55.046781],
	                        [-163.39566, 54.904381],
	                        [-163.291598, 55.008443],
	                        [-163.313505, 55.128935],
	                        [-163.105382, 55.183705],
	                        [-162.880827, 55.183705],
	                        [-162.579595, 55.446598],
	                        [-162.245502, 55.682106],
	                        [-161.807347, 55.89023],
	                        [-161.292514, 55.983338],
	                        [-161.078914, 55.939523],
	                        [-160.87079, 55.999769],
	                        [-160.816021, 55.912138],
	                        [-160.931036, 55.813553],
	                        [-160.805067, 55.736876],
	                        [-160.766728, 55.857368],
	                        [-160.509312, 55.868322],
	                        [-160.438112, 55.791645],
	                        [-160.27928, 55.76426],
	                        [-160.273803, 55.857368],
	                        [-160.536697, 55.939523],
	                        [-160.558604, 55.994292],
	                        [-160.383342, 56.251708],
	                        [-160.147834, 56.399586],
	                        [-159.830171, 56.541986],
	                        [-159.326293, 56.667956],
	                        [-158.959338, 56.848695],
	                        [-158.784076, 56.782971],
	                        [-158.641675, 56.810356],
	                        [-158.701922, 56.925372],
	                        [-158.658106, 57.034911],
	                        [-158.378782, 57.264942],
	                        [-157.995396, 57.41282],
	                        [-157.688688, 57.609989],
	                        [-157.705118, 57.719528],
	                        [-157.458656, 58.497254],
	                        [-157.07527, 58.705377],
	                        [-157.119086, 58.869686],
	                        [-158.039212, 58.634177],
	                        [-158.32949, 58.661562],
	                        [-158.40069, 58.760147],
	                        [-158.564998, 58.803962],
	                        [-158.619768, 58.913501],
	                        [-158.767645, 58.864209],
	                        [-158.860753, 58.694424],
	                        [-158.701922, 58.480823],
	                        [-158.893615, 58.387715],
	                        [-159.0634, 58.420577],
	                        [-159.392016, 58.760147],
	                        [-159.616571, 58.929932],
	                        [-159.731586, 58.929932],
	                        [-159.808264, 58.803962],
	                        [-159.906848, 58.782055],
	                        [-160.054726, 58.886116],
	                        [-160.235465, 58.902547],
	                        [-160.317619, 59.072332],
	                        [-160.854359, 58.88064],
	                        [-161.33633, 58.743716],
	                        [-161.374669, 58.667039],
	                        [-161.752577, 58.552023],
	                        [-161.938793, 58.656085],
	                        [-161.769008, 58.776578],
	                        [-161.829255, 59.061379],
	                        [-161.955224, 59.36261],
	                        [-161.703285, 59.48858],
	                        [-161.911409, 59.740519],
	                        [-162.092148, 59.88292],
	                        [-162.234548, 60.091043],
	                        [-162.448149, 60.178674],
	                        [-162.502918, 59.997935],
	                        [-162.760334, 59.959597],
	                        [-163.171105, 59.844581],
	                        [-163.66403, 59.795289],
	                        [-163.9324, 59.806242],
	                        [-164.162431, 59.866489],
	                        [-164.189816, 60.02532],
	                        [-164.386986, 60.074613],
	                        [-164.699171, 60.29369],
	                        [-164.962064, 60.337506],
	                        [-165.268773, 60.578491],
	                        [-165.060649, 60.68803],
	                        [-165.016834, 60.890677],
	                        [-165.175665, 60.846861],
	                        [-165.197573, 60.972831],
	                        [-165.120896, 61.076893],
	                        [-165.323543, 61.170001],
	                        [-165.34545, 61.071416],
	                        [-165.591913, 61.109754],
	                        [-165.624774, 61.279539],
	                        [-165.816467, 61.301447],
	                        [-165.920529, 61.416463],
	                        [-165.915052, 61.558863],
	                        [-166.106745, 61.49314],
	                        [-166.139607, 61.630064],
	                        [-165.904098, 61.662925],
	                        [-166.095791, 61.81628],
	                        [-165.756221, 61.827233],
	                        [-165.756221, 62.013449],
	                        [-165.674067, 62.139419],
	                        [-165.044219, 62.539236],
	                        [-164.912772, 62.659728],
	                        [-164.819664, 62.637821],
	                        [-164.874433, 62.807606],
	                        [-164.633448, 63.097884],
	                        [-164.425324, 63.212899],
	                        [-164.036462, 63.262192],
	                        [-163.73523, 63.212899],
	                        [-163.313505, 63.037637],
	                        [-163.039658, 63.059545],
	                        [-162.661749, 63.22933],
	                        [-162.272887, 63.486746],
	                        [-162.075717, 63.514131],
	                        [-162.026424, 63.448408],
	                        [-161.555408, 63.448408],
	                        [-161.13916, 63.503177],
	                        [-160.766728, 63.771547],
	                        [-160.766728, 63.837271],
	                        [-160.952944, 64.08921],
	                        [-160.974852, 64.237087],
	                        [-161.26513, 64.395918],
	                        [-161.374669, 64.532842],
	                        [-161.078914, 64.494503],
	                        [-160.79959, 64.609519],
	                        [-160.783159, 64.719058],
	                        [-161.144637, 64.921705],
	                        [-161.413007, 64.762873],
	                        [-161.664946, 64.790258],
	                        [-161.900455, 64.702627],
	                        [-162.168825, 64.680719],
	                        [-162.234548, 64.620473],
	                        [-162.541257, 64.532842],
	                        [-162.634365, 64.384965],
	                        [-162.787719, 64.324718],
	                        [-162.858919, 64.49998],
	                        [-163.045135, 64.538319],
	                        [-163.176582, 64.401395],
	                        [-163.253259, 64.467119],
	                        [-163.598306, 64.565704],
	                        [-164.304832, 64.560227],
	                        [-164.80871, 64.450688],
	                        [-165.000403, 64.434257],
	                        [-165.411174, 64.49998],
	                        [-166.188899, 64.576658],
	                        [-166.391546, 64.636904],
	                        [-166.484654, 64.735489],
	                        [-166.413454, 64.872412],
	                        [-166.692778, 64.987428],
	                        [-166.638008, 65.113398],
	                        [-166.462746, 65.179121],
	                        [-166.517516, 65.337952],
	                        [-166.796839, 65.337952],
	                        [-167.026871, 65.381768],
	                        [-167.47598, 65.414629],
	                        [-167.711489, 65.496784],
	                        [-168.072967, 65.578938],
	                        [-168.105828, 65.682999],
	                        [-167.541703, 65.819923],
	                        [-166.829701, 66.049954],
	                        [-166.3313, 66.186878],
	                        [-166.046499, 66.110201],
	                        [-165.756221, 66.09377],
	                        [-165.690498, 66.203309],
	                        [-165.86576, 66.21974],
	                        [-165.88219, 66.312848],
	                        [-165.186619, 66.466202],
	                        [-164.403417, 66.581218],
	                        [-163.981692, 66.592172],
	                        [-163.751661, 66.553833],
	                        [-163.872153, 66.389525],
	                        [-163.828338, 66.274509],
	                        [-163.915969, 66.192355],
	                        [-163.768091, 66.060908],
	                        [-163.494244, 66.082816],
	                        [-163.149197, 66.060908],
	                        [-162.749381, 66.088293],
	                        [-162.634365, 66.039001],
	                        [-162.371472, 66.028047],
	                        [-162.14144, 66.077339],
	                        [-161.840208, 66.02257],
	                        [-161.549931, 66.241647],
	                        [-161.341807, 66.252601],
	                        [-161.199406, 66.208786],
	                        [-161.128206, 66.334755],
	                        [-161.528023, 66.395002],
	                        [-161.911409, 66.345709],
	                        [-161.87307, 66.510017],
	                        [-162.174302, 66.68528],
	                        [-162.502918, 66.740049],
	                        [-162.601503, 66.89888],
	                        [-162.344087, 66.937219],
	                        [-162.015471, 66.778388],
	                        [-162.075717, 66.652418],
	                        [-161.916886, 66.553833],
	                        [-161.571838, 66.438817],
	                        [-161.489684, 66.55931],
	                        [-161.884024, 66.718141],
	                        [-161.714239, 67.002942],
	                        [-161.851162, 67.052235],
	                        [-162.240025, 66.991988],
	                        [-162.639842, 67.008419],
	                        [-162.700088, 67.057712],
	                        [-162.902735, 67.008419],
	                        [-163.740707, 67.128912],
	                        [-163.757138, 67.254881],
	                        [-164.009077, 67.534205],
	                        [-164.211724, 67.638267],
	                        [-164.534863, 67.725898],
	                        [-165.192096, 67.966884],
	                        [-165.493328, 68.059992],
	                        [-165.794559, 68.081899],
	                        [-166.243668, 68.246208],
	                        [-166.681824, 68.339316],
	                        [-166.703731, 68.372177],
	                        [-166.375115, 68.42147],
	                        [-166.227238, 68.574824],
	                        [-166.216284, 68.881533],
	                        [-165.329019, 68.859625],
	                        [-164.255539, 68.930825],
	                        [-163.976215, 68.985595],
	                        [-163.532583, 69.138949],
	                        [-163.110859, 69.374457],
	                        [-163.023228, 69.609966],
	                        [-162.842489, 69.812613],
	                        [-162.470057, 69.982398],
	                        [-162.311225, 70.108367],
	                        [-161.851162, 70.311014],
	                        [-161.779962, 70.256245],
	                        [-161.396576, 70.239814],
	                        [-160.837928, 70.343876],
	                        [-160.487404, 70.453415],
	                        [-159.649432, 70.792985],
	                        [-159.33177, 70.809416],
	                        [-159.298908, 70.760123],
	                        [-158.975769, 70.798462],
	                        [-158.658106, 70.787508],
	                        [-158.033735, 70.831323],
	                        [-157.420318, 70.979201],
	                        [-156.812377, 71.285909],
	                        [-156.565915, 71.351633],
	                        [-156.522099, 71.296863],
	                        [-155.585543, 71.170894],
	                        [-155.508865, 71.083263],
	                        [-155.832005, 70.968247],
	                        [-155.979882, 70.96277],
	                        [-155.974405, 70.809416],
	                        [-155.503388, 70.858708],
	                        [-155.476004, 70.940862],
	                        [-155.262403, 71.017539],
	                        [-155.191203, 70.973724],
	                        [-155.032372, 71.148986],
	                        [-154.566832, 70.990155],
	                        [-154.643509, 70.869662],
	                        [-154.353231, 70.8368],
	                        [-154.183446, 70.7656],
	                        [-153.931507, 70.880616],
	                        [-153.487874, 70.886093],
	                        [-153.235935, 70.924431],
	                        [-152.589656, 70.886093],
	                        [-152.26104, 70.842277],
	                        [-152.419871, 70.606769],
	                        [-151.817408, 70.546523],
	                        [-151.773592, 70.486276],
	                        [-151.187559, 70.382214],
	                        [-151.182082, 70.431507],
	                        [-150.760358, 70.49723],
	                        [-150.355064, 70.491753],
	                        [-150.349588, 70.436984],
	                        [-150.114079, 70.431507],
	                        [-149.867617, 70.508184],
	                        [-149.462323, 70.519138],
	                        [-149.177522, 70.486276],
	                        [-148.78866, 70.404122],
	                        [-148.607921, 70.420553],
	                        [-148.350504, 70.305537],
	                        [-148.202627, 70.349353],
	                        [-147.961642, 70.316491],
	                        [-147.786379, 70.245291]
	                    ]
	                ],
	                [
	                    [
	                        [-152.94018, 58.026237],
	                        [-152.945657, 57.982421],
	                        [-153.290705, 58.048145],
	                        [-153.044242, 58.305561],
	                        [-152.819688, 58.327469],
	                        [-152.666333, 58.562977],
	                        [-152.496548, 58.354853],
	                        [-152.354148, 58.426053],
	                        [-152.080301, 58.311038],
	                        [-152.080301, 58.152206],
	                        [-152.480117, 58.130299],
	                        [-152.655379, 58.059098],
	                        [-152.94018, 58.026237]
	                    ]
	                ],
	                [
	                    [
	                        [-153.958891, 57.538789],
	                        [-153.67409, 57.670236],
	                        [-153.931507, 57.69762],
	                        [-153.936983, 57.812636],
	                        [-153.723383, 57.889313],
	                        [-153.570028, 57.834544],
	                        [-153.548121, 57.719528],
	                        [-153.46049, 57.796205],
	                        [-153.455013, 57.96599],
	                        [-153.268797, 57.889313],
	                        [-153.235935, 57.998852],
	                        [-153.071627, 57.933129],
	                        [-152.874457, 57.933129],
	                        [-152.721103, 57.993375],
	                        [-152.469163, 57.889313],
	                        [-152.469163, 57.599035],
	                        [-152.151501, 57.620943],
	                        [-152.359625, 57.42925],
	                        [-152.74301, 57.505928],
	                        [-152.60061, 57.379958],
	                        [-152.710149, 57.275896],
	                        [-152.907319, 57.325188],
	                        [-152.912796, 57.128019],
	                        [-153.214027, 57.073249],
	                        [-153.312612, 56.991095],
	                        [-153.498828, 57.067772],
	                        [-153.695998, 56.859649],
	                        [-153.849352, 56.837741],
	                        [-154.013661, 56.744633],
	                        [-154.073907, 56.969187],
	                        [-154.303938, 56.848695],
	                        [-154.314892, 56.919895],
	                        [-154.523016, 56.991095],
	                        [-154.539447, 57.193742],
	                        [-154.742094, 57.275896],
	                        [-154.627078, 57.511404],
	                        [-154.227261, 57.659282],
	                        [-153.980799, 57.648328],
	                        [-153.958891, 57.538789]
	                    ]
	                ],
	                [
	                    [
	                        [-154.53397, 56.602232],
	                        [-154.742094, 56.399586],
	                        [-154.807817, 56.432447],
	                        [-154.53397, 56.602232]
	                    ]
	                ],
	                [
	                    [
	                        [-155.634835, 55.923092],
	                        [-155.476004, 55.912138],
	                        [-155.530773, 55.704014],
	                        [-155.793666, 55.731399],
	                        [-155.837482, 55.802599],
	                        [-155.634835, 55.923092]
	                    ]
	                ],
	                [
	                    [
	                        [-159.890418, 55.28229],
	                        [-159.950664, 55.068689],
	                        [-160.257373, 54.893427],
	                        [-160.109495, 55.161797],
	                        [-160.005433, 55.134412],
	                        [-159.890418, 55.28229]
	                    ]
	                ],
	                [
	                    [
	                        [-160.520266, 55.358967],
	                        [-160.33405, 55.358967],
	                        [-160.339527, 55.249428],
	                        [-160.525743, 55.128935],
	                        [-160.690051, 55.211089],
	                        [-160.794113, 55.134412],
	                        [-160.854359, 55.320628],
	                        [-160.79959, 55.380875],
	                        [-160.520266, 55.358967]
	                    ]
	                ],
	                [
	                    [
	                        [-162.256456, 54.981058],
	                        [-162.234548, 54.893427],
	                        [-162.349564, 54.838658],
	                        [-162.437195, 54.931766],
	                        [-162.256456, 54.981058]
	                    ]
	                ],
	                [
	                    [
	                        [-162.415287, 63.634624],
	                        [-162.563165, 63.536039],
	                        [-162.612457, 63.62367],
	                        [-162.415287, 63.634624]
	                    ]
	                ],
	                [
	                    [
	                        [-162.80415, 54.488133],
	                        [-162.590549, 54.449795],
	                        [-162.612457, 54.367641],
	                        [-162.782242, 54.373118],
	                        [-162.80415, 54.488133]
	                    ]
	                ],
	                [
	                    [
	                        [-165.548097, 54.29644],
	                        [-165.476897, 54.181425],
	                        [-165.630251, 54.132132],
	                        [-165.685021, 54.252625],
	                        [-165.548097, 54.29644]
	                    ]
	                ],
	                [
	                    [
	                        [-165.73979, 54.15404],
	                        [-166.046499, 54.044501],
	                        [-166.112222, 54.121178],
	                        [-165.980775, 54.219763],
	                        [-165.73979, 54.15404]
	                    ]
	                ],
	                [
	                    [
	                        [-166.364161, 60.359413],
	                        [-166.13413, 60.397752],
	                        [-166.084837, 60.326552],
	                        [-165.88219, 60.342983],
	                        [-165.685021, 60.277259],
	                        [-165.646682, 59.992458],
	                        [-165.750744, 59.89935],
	                        [-166.00816, 59.844581],
	                        [-166.062929, 59.745996],
	                        [-166.440838, 59.855535],
	                        [-166.6161, 59.850058],
	                        [-166.994009, 59.992458],
	                        [-167.125456, 59.992458],
	                        [-167.344534, 60.074613],
	                        [-167.421211, 60.206059],
	                        [-167.311672, 60.238921],
	                        [-166.93924, 60.206059],
	                        [-166.763978, 60.310121],
	                        [-166.577762, 60.321075],
	                        [-166.495608, 60.392275],
	                        [-166.364161, 60.359413]
	                    ]
	                ],
	                [
	                    [
	                        [-166.375115, 54.01164],
	                        [-166.210807, 53.934962],
	                        [-166.5449, 53.748746],
	                        [-166.539423, 53.715885],
	                        [-166.117699, 53.852808],
	                        [-166.112222, 53.776131],
	                        [-166.282007, 53.683023],
	                        [-166.555854, 53.622777],
	                        [-166.583239, 53.529669],
	                        [-166.878994, 53.431084],
	                        [-167.13641, 53.425607],
	                        [-167.306195, 53.332499],
	                        [-167.623857, 53.250345],
	                        [-167.793643, 53.337976],
	                        [-167.459549, 53.442038],
	                        [-167.355487, 53.425607],
	                        [-167.103548, 53.513238],
	                        [-167.163794, 53.611823],
	                        [-167.021394, 53.715885],
	                        [-166.807793, 53.666592],
	                        [-166.785886, 53.732316],
	                        [-167.015917, 53.754223],
	                        [-167.141887, 53.825424],
	                        [-167.032348, 53.945916],
	                        [-166.643485, 54.017116],
	                        [-166.561331, 53.880193],
	                        [-166.375115, 54.01164]
	                    ]
	                ],
	                [
	                    [
	                        [-168.790446, 53.157237],
	                        [-168.40706, 53.34893],
	                        [-168.385152, 53.431084],
	                        [-168.237275, 53.524192],
	                        [-168.007243, 53.568007],
	                        [-167.886751, 53.518715],
	                        [-167.842935, 53.387268],
	                        [-168.270136, 53.244868],
	                        [-168.500168, 53.036744],
	                        [-168.686384, 52.965544],
	                        [-168.790446, 53.157237]
	                    ]
	                ],
	                [
	                    [
	                        [-169.74891, 52.894344],
	                        [-169.705095, 52.795759],
	                        [-169.962511, 52.790282],
	                        [-169.989896, 52.856005],
	                        [-169.74891, 52.894344]
	                    ]
	                ],
	                [
	                    [
	                        [-170.148727, 57.221127],
	                        [-170.28565, 57.128019],
	                        [-170.313035, 57.221127],
	                        [-170.148727, 57.221127]
	                    ]
	                ],
	                [
	                    [
	                        [-170.669036, 52.697174],
	                        [-170.603313, 52.604066],
	                        [-170.789529, 52.538343],
	                        [-170.816914, 52.636928],
	                        [-170.669036, 52.697174]
	                    ]
	                ],
	                [
	                    [
	                        [-171.742517, 63.716778],
	                        [-170.94836, 63.5689],
	                        [-170.488297, 63.69487],
	                        [-170.280174, 63.683916],
	                        [-170.093958, 63.612716],
	                        [-170.044665, 63.492223],
	                        [-169.644848, 63.4265],
	                        [-169.518879, 63.366254],
	                        [-168.99857, 63.338869],
	                        [-168.686384, 63.295053],
	                        [-168.856169, 63.147176],
	                        [-169.108108, 63.180038],
	                        [-169.376478, 63.152653],
	                        [-169.513402, 63.08693],
	                        [-169.639372, 62.939052],
	                        [-169.831064, 63.075976],
	                        [-170.055619, 63.169084],
	                        [-170.263743, 63.180038],
	                        [-170.362328, 63.2841],
	                        [-170.866206, 63.415546],
	                        [-171.101715, 63.421023],
	                        [-171.463193, 63.306007],
	                        [-171.73704, 63.366254],
	                        [-171.852055, 63.486746],
	                        [-171.742517, 63.716778]
	                    ]
	                ],
	                [
	                    [
	                        [-172.432611, 52.390465],
	                        [-172.41618, 52.275449],
	                        [-172.607873, 52.253542],
	                        [-172.569535, 52.352127],
	                        [-172.432611, 52.390465]
	                    ]
	                ],
	                [
	                    [
	                        [-173.626584, 52.14948],
	                        [-173.495138, 52.105664],
	                        [-173.122706, 52.111141],
	                        [-173.106275, 52.07828],
	                        [-173.549907, 52.028987],
	                        [-173.626584, 52.14948]
	                    ]
	                ],
	                [
	                    [
	                        [-174.322156, 52.280926],
	                        [-174.327632, 52.379511],
	                        [-174.185232, 52.41785],
	                        [-173.982585, 52.319265],
	                        [-174.059262, 52.226157],
	                        [-174.179755, 52.231634],
	                        [-174.141417, 52.127572],
	                        [-174.333109, 52.116618],
	                        [-174.738403, 52.007079],
	                        [-174.968435, 52.039941],
	                        [-174.902711, 52.116618],
	                        [-174.656249, 52.105664],
	                        [-174.322156, 52.280926]
	                    ]
	                ],
	                [
	                    [
	                        [-176.469116, 51.853725],
	                        [-176.288377, 51.870156],
	                        [-176.288377, 51.744186],
	                        [-176.518409, 51.760617],
	                        [-176.80321, 51.61274],
	                        [-176.912748, 51.80991],
	                        [-176.792256, 51.815386],
	                        [-176.775825, 51.963264],
	                        [-176.627947, 51.968741],
	                        [-176.627947, 51.859202],
	                        [-176.469116, 51.853725]
	                    ]
	                ],
	                [
	                    [
	                        [-177.153734, 51.946833],
	                        [-177.044195, 51.897541],
	                        [-177.120872, 51.727755],
	                        [-177.274226, 51.678463],
	                        [-177.279703, 51.782525],
	                        [-177.153734, 51.946833]
	                    ]
	                ],
	                [
	                    [
	                        [-178.123152, 51.919448],
	                        [-177.953367, 51.913971],
	                        [-177.800013, 51.793479],
	                        [-177.964321, 51.651078],
	                        [-178.123152, 51.919448]
	                    ]
	                ],
	                [
	                    [
	                        [-187.107557, 52.992929],
	                        [-187.293773, 52.927205],
	                        [-187.304726, 52.823143],
	                        [-188.90491, 52.762897],
	                        [-188.642017, 52.927205],
	                        [-188.642017, 53.003883],
	                        [-187.107557, 52.992929]
	                    ]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "04",
	        "properties": {
	            "name": "Arizona",
	            "density": 57.05
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-109.042503, 37.000263],
	                    [-109.04798, 31.331629],
	                    [-111.074448, 31.331629],
	                    [-112.246513, 31.704061],
	                    [-114.815198, 32.492741],
	                    [-114.72209, 32.717295],
	                    [-114.524921, 32.755634],
	                    [-114.470151, 32.843265],
	                    [-114.524921, 33.029481],
	                    [-114.661844, 33.034958],
	                    [-114.727567, 33.40739],
	                    [-114.524921, 33.54979],
	                    [-114.497536, 33.697668],
	                    [-114.535874, 33.933176],
	                    [-114.415382, 34.108438],
	                    [-114.256551, 34.174162],
	                    [-114.136058, 34.305608],
	                    [-114.333228, 34.448009],
	                    [-114.470151, 34.710902],
	                    [-114.634459, 34.87521],
	                    [-114.634459, 35.00118],
	                    [-114.574213, 35.138103],
	                    [-114.596121, 35.324319],
	                    [-114.678275, 35.516012],
	                    [-114.738521, 36.102045],
	                    [-114.371566, 36.140383],
	                    [-114.251074, 36.01989],
	                    [-114.152489, 36.025367],
	                    [-114.048427, 36.195153],
	                    [-114.048427, 37.000263],
	                    [-110.499369, 37.00574],
	                    [-109.042503, 37.000263]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "05",
	        "properties": {
	            "name": "Arkansas",
	            "density": 56.43
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-94.473842, 36.501861],
	                    [-90.152536, 36.496384],
	                    [-90.064905, 36.304691],
	                    [-90.218259, 36.184199],
	                    [-90.377091, 35.997983],
	                    [-89.730812, 35.997983],
	                    [-89.763673, 35.811767],
	                    [-89.911551, 35.756997],
	                    [-89.944412, 35.603643],
	                    [-90.130628, 35.439335],
	                    [-90.114197, 35.198349],
	                    [-90.212782, 35.023087],
	                    [-90.311367, 34.995703],
	                    [-90.251121, 34.908072],
	                    [-90.409952, 34.831394],
	                    [-90.481152, 34.661609],
	                    [-90.585214, 34.617794],
	                    [-90.568783, 34.420624],
	                    [-90.749522, 34.365854],
	                    [-90.744046, 34.300131],
	                    [-90.952169, 34.135823],
	                    [-90.891923, 34.026284],
	                    [-91.072662, 33.867453],
	                    [-91.231493, 33.560744],
	                    [-91.056231, 33.429298],
	                    [-91.143862, 33.347144],
	                    [-91.089093, 33.13902],
	                    [-91.16577, 33.002096],
	                    [-93.608485, 33.018527],
	                    [-94.041164, 33.018527],
	                    [-94.041164, 33.54979],
	                    [-94.183564, 33.593606],
	                    [-94.380734, 33.544313],
	                    [-94.484796, 33.637421],
	                    [-94.430026, 35.395519],
	                    [-94.616242, 36.501861],
	                    [-94.473842, 36.501861]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "06",
	        "properties": {
	            "name": "California",
	            "density": 241.7
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-123.233256, 42.006186],
	                    [-122.378853, 42.011663],
	                    [-121.037003, 41.995232],
	                    [-120.001861, 41.995232],
	                    [-119.996384, 40.264519],
	                    [-120.001861, 38.999346],
	                    [-118.71478, 38.101128],
	                    [-117.498899, 37.21934],
	                    [-116.540435, 36.501861],
	                    [-115.85034, 35.970598],
	                    [-114.634459, 35.00118],
	                    [-114.634459, 34.87521],
	                    [-114.470151, 34.710902],
	                    [-114.333228, 34.448009],
	                    [-114.136058, 34.305608],
	                    [-114.256551, 34.174162],
	                    [-114.415382, 34.108438],
	                    [-114.535874, 33.933176],
	                    [-114.497536, 33.697668],
	                    [-114.524921, 33.54979],
	                    [-114.727567, 33.40739],
	                    [-114.661844, 33.034958],
	                    [-114.524921, 33.029481],
	                    [-114.470151, 32.843265],
	                    [-114.524921, 32.755634],
	                    [-114.72209, 32.717295],
	                    [-116.04751, 32.624187],
	                    [-117.126467, 32.536556],
	                    [-117.24696, 32.668003],
	                    [-117.252437, 32.876127],
	                    [-117.329114, 33.122589],
	                    [-117.471515, 33.297851],
	                    [-117.7837, 33.538836],
	                    [-118.183517, 33.763391],
	                    [-118.260194, 33.703145],
	                    [-118.413548, 33.741483],
	                    [-118.391641, 33.840068],
	                    [-118.566903, 34.042715],
	                    [-118.802411, 33.998899],
	                    [-119.218659, 34.146777],
	                    [-119.278905, 34.26727],
	                    [-119.558229, 34.415147],
	                    [-119.875891, 34.40967],
	                    [-120.138784, 34.475393],
	                    [-120.472878, 34.448009],
	                    [-120.64814, 34.579455],
	                    [-120.609801, 34.858779],
	                    [-120.670048, 34.902595],
	                    [-120.631709, 35.099764],
	                    [-120.894602, 35.247642],
	                    [-120.905556, 35.450289],
	                    [-121.004141, 35.461243],
	                    [-121.168449, 35.636505],
	                    [-121.283465, 35.674843],
	                    [-121.332757, 35.784382],
	                    [-121.716143, 36.195153],
	                    [-121.896882, 36.315645],
	                    [-121.935221, 36.638785],
	                    [-121.858544, 36.6114],
	                    [-121.787344, 36.803093],
	                    [-121.929744, 36.978355],
	                    [-122.105006, 36.956447],
	                    [-122.335038, 37.115279],
	                    [-122.417192, 37.241248],
	                    [-122.400761, 37.361741],
	                    [-122.515777, 37.520572],
	                    [-122.515777, 37.783465],
	                    [-122.329561, 37.783465],
	                    [-122.406238, 38.15042],
	                    [-122.488392, 38.112082],
	                    [-122.504823, 37.931343],
	                    [-122.701993, 37.893004],
	                    [-122.937501, 38.029928],
	                    [-122.97584, 38.265436],
	                    [-123.129194, 38.451652],
	                    [-123.331841, 38.566668],
	                    [-123.44138, 38.698114],
	                    [-123.737134, 38.95553],
	                    [-123.687842, 39.032208],
	                    [-123.824765, 39.366301],
	                    [-123.764519, 39.552517],
	                    [-123.85215, 39.831841],
	                    [-124.109566, 40.105688],
	                    [-124.361506, 40.259042],
	                    [-124.410798, 40.439781],
	                    [-124.158859, 40.877937],
	                    [-124.109566, 41.025814],
	                    [-124.158859, 41.14083],
	                    [-124.065751, 41.442061],
	                    [-124.147905, 41.715908],
	                    [-124.257444, 41.781632],
	                    [-124.213628, 42.000709],
	                    [-123.233256, 42.006186]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "08",
	        "properties": {
	            "name": "Colorado",
	            "density": 49.33
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-107.919731, 41.003906],
	                    [-105.728954, 40.998429],
	                    [-104.053011, 41.003906],
	                    [-102.053927, 41.003906],
	                    [-102.053927, 40.001626],
	                    [-102.042974, 36.994786],
	                    [-103.001438, 37.000263],
	                    [-104.337812, 36.994786],
	                    [-106.868158, 36.994786],
	                    [-107.421329, 37.000263],
	                    [-109.042503, 37.000263],
	                    [-109.042503, 38.166851],
	                    [-109.058934, 38.27639],
	                    [-109.053457, 39.125316],
	                    [-109.04798, 40.998429],
	                    [-107.919731, 41.003906]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "09",
	        "properties": {
	            "name": "Connecticut",
	            "density": 739.1
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-73.053528, 42.039048],
	                    [-71.799309, 42.022617],
	                    [-71.799309, 42.006186],
	                    [-71.799309, 41.414677],
	                    [-71.859555, 41.321569],
	                    [-71.947186, 41.338],
	                    [-72.385341, 41.261322],
	                    [-72.905651, 41.28323],
	                    [-73.130205, 41.146307],
	                    [-73.371191, 41.102491],
	                    [-73.655992, 40.987475],
	                    [-73.727192, 41.102491],
	                    [-73.48073, 41.21203],
	                    [-73.55193, 41.294184],
	                    [-73.486206, 42.050002],
	                    [-73.053528, 42.039048]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "10",
	        "properties": {
	            "name": "Delaware",
	            "density": 464.3
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-75.414089, 39.804456],
	                    [-75.507197, 39.683964],
	                    [-75.611259, 39.61824],
	                    [-75.589352, 39.459409],
	                    [-75.441474, 39.311532],
	                    [-75.403136, 39.065069],
	                    [-75.189535, 38.807653],
	                    [-75.09095, 38.796699],
	                    [-75.047134, 38.451652],
	                    [-75.693413, 38.462606],
	                    [-75.786521, 39.722302],
	                    [-75.616736, 39.831841],
	                    [-75.414089, 39.804456]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "11",
	        "properties": {
	            "name": "District of Columbia",
	            "density": 10065
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-77.035264, 38.993869],
	                    [-76.909294, 38.895284],
	                    [-77.040741, 38.791222],
	                    [-77.117418, 38.933623],
	                    [-77.035264, 38.993869]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "12",
	        "properties": {
	            "name": "Florida",
	            "density": 353.4
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-85.497137, 30.997536],
	                    [-85.004212, 31.003013],
	                    [-84.867289, 30.712735],
	                    [-83.498053, 30.647012],
	                    [-82.216449, 30.570335],
	                    [-82.167157, 30.356734],
	                    [-82.046664, 30.362211],
	                    [-82.002849, 30.564858],
	                    [-82.041187, 30.751074],
	                    [-81.948079, 30.827751],
	                    [-81.718048, 30.745597],
	                    [-81.444201, 30.707258],
	                    [-81.383954, 30.27458],
	                    [-81.257985, 29.787132],
	                    [-80.967707, 29.14633],
	                    [-80.524075, 28.461713],
	                    [-80.589798, 28.41242],
	                    [-80.56789, 28.094758],
	                    [-80.381674, 27.738757],
	                    [-80.091397, 27.021277],
	                    [-80.03115, 26.796723],
	                    [-80.036627, 26.566691],
	                    [-80.146166, 25.739673],
	                    [-80.239274, 25.723243],
	                    [-80.337859, 25.465826],
	                    [-80.304997, 25.383672],
	                    [-80.49669, 25.197456],
	                    [-80.573367, 25.241272],
	                    [-80.759583, 25.164595],
	                    [-81.077246, 25.120779],
	                    [-81.170354, 25.224841],
	                    [-81.126538, 25.378195],
	                    [-81.351093, 25.821827],
	                    [-81.526355, 25.903982],
	                    [-81.679709, 25.843735],
	                    [-81.800202, 26.090198],
	                    [-81.833064, 26.292844],
	                    [-82.041187, 26.517399],
	                    [-82.09048, 26.665276],
	                    [-82.057618, 26.878877],
	                    [-82.172634, 26.917216],
	                    [-82.145249, 26.791246],
	                    [-82.249311, 26.758384],
	                    [-82.566974, 27.300601],
	                    [-82.692943, 27.437525],
	                    [-82.391711, 27.837342],
	                    [-82.588881, 27.815434],
	                    [-82.720328, 27.689464],
	                    [-82.851774, 27.886634],
	                    [-82.676512, 28.434328],
	                    [-82.643651, 28.888914],
	                    [-82.764143, 28.998453],
	                    [-82.802482, 29.14633],
	                    [-82.994175, 29.179192],
	                    [-83.218729, 29.420177],
	                    [-83.399469, 29.518762],
	                    [-83.410422, 29.66664],
	                    [-83.536392, 29.721409],
	                    [-83.640454, 29.885717],
	                    [-84.02384, 30.104795],
	                    [-84.357933, 30.055502],
	                    [-84.341502, 29.902148],
	                    [-84.451041, 29.929533],
	                    [-84.867289, 29.743317],
	                    [-85.310921, 29.699501],
	                    [-85.299967, 29.80904],
	                    [-85.404029, 29.940487],
	                    [-85.924338, 30.236241],
	                    [-86.29677, 30.362211],
	                    [-86.630863, 30.395073],
	                    [-86.910187, 30.373165],
	                    [-87.518128, 30.280057],
	                    [-87.37025, 30.427934],
	                    [-87.446927, 30.510088],
	                    [-87.408589, 30.674397],
	                    [-87.633143, 30.86609],
	                    [-87.600282, 30.997536],
	                    [-85.497137, 30.997536]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "13",
	        "properties": {
	            "name": "Georgia",
	            "density": 169.5
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-83.109191, 35.00118],
	                    [-83.322791, 34.787579],
	                    [-83.339222, 34.683517],
	                    [-83.005129, 34.469916],
	                    [-82.901067, 34.486347],
	                    [-82.747713, 34.26727],
	                    [-82.714851, 34.152254],
	                    [-82.55602, 33.94413],
	                    [-82.325988, 33.81816],
	                    [-82.194542, 33.631944],
	                    [-81.926172, 33.462159],
	                    [-81.937125, 33.347144],
	                    [-81.761863, 33.160928],
	                    [-81.493493, 33.007573],
	                    [-81.42777, 32.843265],
	                    [-81.416816, 32.629664],
	                    [-81.279893, 32.558464],
	                    [-81.121061, 32.290094],
	                    [-81.115584, 32.120309],
	                    [-80.885553, 32.032678],
	                    [-81.132015, 31.693108],
	                    [-81.175831, 31.517845],
	                    [-81.279893, 31.364491],
	                    [-81.290846, 31.20566],
	                    [-81.400385, 31.13446],
	                    [-81.444201, 30.707258],
	                    [-81.718048, 30.745597],
	                    [-81.948079, 30.827751],
	                    [-82.041187, 30.751074],
	                    [-82.002849, 30.564858],
	                    [-82.046664, 30.362211],
	                    [-82.167157, 30.356734],
	                    [-82.216449, 30.570335],
	                    [-83.498053, 30.647012],
	                    [-84.867289, 30.712735],
	                    [-85.004212, 31.003013],
	                    [-85.113751, 31.27686],
	                    [-85.042551, 31.539753],
	                    [-85.141136, 31.840985],
	                    [-85.053504, 32.01077],
	                    [-85.058981, 32.13674],
	                    [-84.889196, 32.262709],
	                    [-85.004212, 32.322956],
	                    [-84.960397, 32.421541],
	                    [-85.069935, 32.580372],
	                    [-85.184951, 32.859696],
	                    [-85.431413, 34.124869],
	                    [-85.606675, 34.984749],
	                    [-84.319594, 34.990226],
	                    [-83.618546, 34.984749],
	                    [-83.109191, 35.00118]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "15",
	        "properties": {
	            "name": "Hawaii",
	            "density": 214.1
	        },
	        "geometry": {
	            "type": "MultiPolygon",
	            "coordinates": [
	                [
	                    [
	                        [-155.634835, 18.948267],
	                        [-155.881297, 19.035898],
	                        [-155.919636, 19.123529],
	                        [-155.886774, 19.348084],
	                        [-156.062036, 19.73147],
	                        [-155.925113, 19.857439],
	                        [-155.826528, 20.032702],
	                        [-155.897728, 20.147717],
	                        [-155.87582, 20.26821],
	                        [-155.596496, 20.12581],
	                        [-155.284311, 20.021748],
	                        [-155.092618, 19.868393],
	                        [-155.092618, 19.736947],
	                        [-154.807817, 19.523346],
	                        [-154.983079, 19.348084],
	                        [-155.295265, 19.26593],
	                        [-155.514342, 19.134483],
	                        [-155.634835, 18.948267]
	                    ]
	                ],
	                [
	                    [
	                        [-156.587823, 21.029505],
	                        [-156.472807, 20.892581],
	                        [-156.324929, 20.952827],
	                        [-156.00179, 20.793996],
	                        [-156.051082, 20.651596],
	                        [-156.379699, 20.580396],
	                        [-156.445422, 20.60778],
	                        [-156.461853, 20.783042],
	                        [-156.631638, 20.821381],
	                        [-156.697361, 20.919966],
	                        [-156.587823, 21.029505]
	                    ]
	                ],
	                [
	                    [
	                        [-156.982162, 21.210244],
	                        [-157.080747, 21.106182],
	                        [-157.310779, 21.106182],
	                        [-157.239579, 21.221198],
	                        [-156.982162, 21.210244]
	                    ]
	                ],
	                [
	                    [
	                        [-157.951581, 21.697691],
	                        [-157.842042, 21.462183],
	                        [-157.896811, 21.325259],
	                        [-158.110412, 21.303352],
	                        [-158.252813, 21.582676],
	                        [-158.126843, 21.588153],
	                        [-157.951581, 21.697691]
	                    ]
	                ],
	                [
	                    [
	                        [-159.468693, 22.228955],
	                        [-159.353678, 22.218001],
	                        [-159.298908, 22.113939],
	                        [-159.33177, 21.966061],
	                        [-159.446786, 21.872953],
	                        [-159.764448, 21.987969],
	                        [-159.726109, 22.152277],
	                        [-159.468693, 22.228955]
	                    ]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "16",
	        "properties": {
	            "name": "Idaho",
	            "density": 19.15
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-116.04751, 49.000239],
	                    [-116.04751, 47.976051],
	                    [-115.724371, 47.696727],
	                    [-115.718894, 47.42288],
	                    [-115.527201, 47.302388],
	                    [-115.324554, 47.258572],
	                    [-115.302646, 47.187372],
	                    [-114.930214, 46.919002],
	                    [-114.886399, 46.809463],
	                    [-114.623506, 46.705401],
	                    [-114.612552, 46.639678],
	                    [-114.322274, 46.645155],
	                    [-114.464674, 46.272723],
	                    [-114.492059, 46.037214],
	                    [-114.387997, 45.88386],
	                    [-114.568736, 45.774321],
	                    [-114.497536, 45.670259],
	                    [-114.546828, 45.560721],
	                    [-114.333228, 45.456659],
	                    [-114.086765, 45.593582],
	                    [-113.98818, 45.703121],
	                    [-113.807441, 45.604536],
	                    [-113.834826, 45.522382],
	                    [-113.736241, 45.330689],
	                    [-113.571933, 45.128042],
	                    [-113.45144, 45.056842],
	                    [-113.456917, 44.865149],
	                    [-113.341901, 44.782995],
	                    [-113.133778, 44.772041],
	                    [-113.002331, 44.448902],
	                    [-112.887315, 44.394132],
	                    [-112.783254, 44.48724],
	                    [-112.471068, 44.481763],
	                    [-112.241036, 44.569394],
	                    [-112.104113, 44.520102],
	                    [-111.868605, 44.563917],
	                    [-111.819312, 44.509148],
	                    [-111.616665, 44.547487],
	                    [-111.386634, 44.75561],
	                    [-111.227803, 44.580348],
	                    [-111.047063, 44.476286],
	                    [-111.047063, 42.000709],
	                    [-112.164359, 41.995232],
	                    [-114.04295, 41.995232],
	                    [-117.027882, 42.000709],
	                    [-117.027882, 43.830007],
	                    [-116.896436, 44.158624],
	                    [-116.97859, 44.240778],
	                    [-117.170283, 44.257209],
	                    [-117.241483, 44.394132],
	                    [-117.038836, 44.750133],
	                    [-116.934774, 44.782995],
	                    [-116.830713, 44.930872],
	                    [-116.847143, 45.02398],
	                    [-116.732128, 45.144473],
	                    [-116.671881, 45.319735],
	                    [-116.463758, 45.61549],
	                    [-116.545912, 45.752413],
	                    [-116.78142, 45.823614],
	                    [-116.918344, 45.993399],
	                    [-116.92382, 46.168661],
	                    [-117.055267, 46.343923],
	                    [-117.038836, 46.426077],
	                    [-117.044313, 47.762451],
	                    [-117.033359, 49.000239],
	                    [-116.04751, 49.000239]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "17",
	        "properties": {
	            "name": "Illinois",
	            "density": 231.5
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-90.639984, 42.510065],
	                    [-88.788778, 42.493634],
	                    [-87.802929, 42.493634],
	                    [-87.83579, 42.301941],
	                    [-87.682436, 42.077386],
	                    [-87.523605, 41.710431],
	                    [-87.529082, 39.34987],
	                    [-87.63862, 39.169131],
	                    [-87.512651, 38.95553],
	                    [-87.49622, 38.780268],
	                    [-87.62219, 38.637868],
	                    [-87.655051, 38.506421],
	                    [-87.83579, 38.292821],
	                    [-87.950806, 38.27639],
	                    [-87.923421, 38.15042],
	                    [-88.000098, 38.101128],
	                    [-88.060345, 37.865619],
	                    [-88.027483, 37.799896],
	                    [-88.15893, 37.657496],
	                    [-88.065822, 37.482234],
	                    [-88.476592, 37.389126],
	                    [-88.514931, 37.285064],
	                    [-88.421823, 37.153617],
	                    [-88.547792, 37.071463],
	                    [-88.914747, 37.224817],
	                    [-89.029763, 37.213863],
	                    [-89.183118, 37.038601],
	                    [-89.133825, 36.983832],
	                    [-89.292656, 36.994786],
	                    [-89.517211, 37.279587],
	                    [-89.435057, 37.34531],
	                    [-89.517211, 37.537003],
	                    [-89.517211, 37.690357],
	                    [-89.84035, 37.903958],
	                    [-89.949889, 37.88205],
	                    [-90.059428, 38.013497],
	                    [-90.355183, 38.216144],
	                    [-90.349706, 38.374975],
	                    [-90.179921, 38.632391],
	                    [-90.207305, 38.725499],
	                    [-90.10872, 38.845992],
	                    [-90.251121, 38.917192],
	                    [-90.470199, 38.961007],
	                    [-90.585214, 38.867899],
	                    [-90.661891, 38.928146],
	                    [-90.727615, 39.256762],
	                    [-91.061708, 39.470363],
	                    [-91.368417, 39.727779],
	                    [-91.494386, 40.034488],
	                    [-91.50534, 40.237135],
	                    [-91.417709, 40.379535],
	                    [-91.401278, 40.560274],
	                    [-91.121954, 40.669813],
	                    [-91.09457, 40.823167],
	                    [-90.963123, 40.921752],
	                    [-90.946692, 41.097014],
	                    [-91.111001, 41.239415],
	                    [-91.045277, 41.414677],
	                    [-90.656414, 41.463969],
	                    [-90.344229, 41.589939],
	                    [-90.311367, 41.743293],
	                    [-90.179921, 41.809016],
	                    [-90.141582, 42.000709],
	                    [-90.168967, 42.126679],
	                    [-90.393521, 42.225264],
	                    [-90.420906, 42.329326],
	                    [-90.639984, 42.510065]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "18",
	        "properties": {
	            "name": "Indiana",
	            "density": 181.7
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-85.990061, 41.759724],
	                    [-84.807042, 41.759724],
	                    [-84.807042, 41.694001],
	                    [-84.801565, 40.500028],
	                    [-84.817996, 39.103408],
	                    [-84.894673, 39.059592],
	                    [-84.812519, 38.785745],
	                    [-84.987781, 38.780268],
	                    [-85.173997, 38.68716],
	                    [-85.431413, 38.730976],
	                    [-85.42046, 38.533806],
	                    [-85.590245, 38.451652],
	                    [-85.655968, 38.325682],
	                    [-85.83123, 38.27639],
	                    [-85.924338, 38.024451],
	                    [-86.039354, 37.958727],
	                    [-86.263908, 38.051835],
	                    [-86.302247, 38.166851],
	                    [-86.521325, 38.040881],
	                    [-86.504894, 37.931343],
	                    [-86.729448, 37.893004],
	                    [-86.795172, 37.991589],
	                    [-87.047111, 37.893004],
	                    [-87.129265, 37.788942],
	                    [-87.381204, 37.93682],
	                    [-87.512651, 37.903958],
	                    [-87.600282, 37.975158],
	                    [-87.682436, 37.903958],
	                    [-87.934375, 37.893004],
	                    [-88.027483, 37.799896],
	                    [-88.060345, 37.865619],
	                    [-88.000098, 38.101128],
	                    [-87.923421, 38.15042],
	                    [-87.950806, 38.27639],
	                    [-87.83579, 38.292821],
	                    [-87.655051, 38.506421],
	                    [-87.62219, 38.637868],
	                    [-87.49622, 38.780268],
	                    [-87.512651, 38.95553],
	                    [-87.63862, 39.169131],
	                    [-87.529082, 39.34987],
	                    [-87.523605, 41.710431],
	                    [-87.42502, 41.644708],
	                    [-87.118311, 41.644708],
	                    [-86.822556, 41.759724],
	                    [-85.990061, 41.759724]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "19",
	        "properties": {
	            "name": "Iowa",
	            "density": 54.81
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-91.368417, 43.501391],
	                    [-91.215062, 43.501391],
	                    [-91.204109, 43.353514],
	                    [-91.056231, 43.254929],
	                    [-91.176724, 43.134436],
	                    [-91.143862, 42.909881],
	                    [-91.067185, 42.75105],
	                    [-90.711184, 42.636034],
	                    [-90.639984, 42.510065],
	                    [-90.420906, 42.329326],
	                    [-90.393521, 42.225264],
	                    [-90.168967, 42.126679],
	                    [-90.141582, 42.000709],
	                    [-90.179921, 41.809016],
	                    [-90.311367, 41.743293],
	                    [-90.344229, 41.589939],
	                    [-90.656414, 41.463969],
	                    [-91.045277, 41.414677],
	                    [-91.111001, 41.239415],
	                    [-90.946692, 41.097014],
	                    [-90.963123, 40.921752],
	                    [-91.09457, 40.823167],
	                    [-91.121954, 40.669813],
	                    [-91.401278, 40.560274],
	                    [-91.417709, 40.379535],
	                    [-91.527248, 40.412397],
	                    [-91.729895, 40.615043],
	                    [-91.833957, 40.609566],
	                    [-93.257961, 40.582182],
	                    [-94.632673, 40.571228],
	                    [-95.7664, 40.587659],
	                    [-95.881416, 40.719105],
	                    [-95.826646, 40.976521],
	                    [-95.925231, 41.201076],
	                    [-95.919754, 41.453015],
	                    [-96.095016, 41.540646],
	                    [-96.122401, 41.67757],
	                    [-96.062155, 41.798063],
	                    [-96.127878, 41.973325],
	                    [-96.264801, 42.039048],
	                    [-96.44554, 42.488157],
	                    [-96.631756, 42.707235],
	                    [-96.544125, 42.855112],
	                    [-96.511264, 43.052282],
	                    [-96.434587, 43.123482],
	                    [-96.560556, 43.222067],
	                    [-96.527695, 43.397329],
	                    [-96.582464, 43.479483],
	                    [-96.451017, 43.501391],
	                    [-91.368417, 43.501391]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "20",
	        "properties": {
	            "name": "Kansas",
	            "density": 35.09
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-101.90605, 40.001626],
	                    [-95.306337, 40.001626],
	                    [-95.207752, 39.908518],
	                    [-94.884612, 39.831841],
	                    [-95.109167, 39.541563],
	                    [-94.983197, 39.442978],
	                    [-94.824366, 39.20747],
	                    [-94.610765, 39.158177],
	                    [-94.616242, 37.000263],
	                    [-100.087706, 37.000263],
	                    [-102.042974, 36.994786],
	                    [-102.053927, 40.001626],
	                    [-101.90605, 40.001626]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "21",
	        "properties": {
	            "name": "Kentucky",
	            "density": 110
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-83.903347, 38.769315],
	                    [-83.678792, 38.632391],
	                    [-83.519961, 38.703591],
	                    [-83.142052, 38.626914],
	                    [-83.032514, 38.725499],
	                    [-82.890113, 38.758361],
	                    [-82.846298, 38.588575],
	                    [-82.731282, 38.561191],
	                    [-82.594358, 38.424267],
	                    [-82.621743, 38.123036],
	                    [-82.50125, 37.931343],
	                    [-82.342419, 37.783465],
	                    [-82.293127, 37.668449],
	                    [-82.101434, 37.553434],
	                    [-81.969987, 37.537003],
	                    [-82.353373, 37.268633],
	                    [-82.720328, 37.120755],
	                    [-82.720328, 37.044078],
	                    [-82.868205, 36.978355],
	                    [-82.879159, 36.890724],
	                    [-83.070852, 36.852385],
	                    [-83.136575, 36.742847],
	                    [-83.673316, 36.600446],
	                    [-83.689746, 36.584015],
	                    [-84.544149, 36.594969],
	                    [-85.289013, 36.627831],
	                    [-85.486183, 36.616877],
	                    [-86.592525, 36.655216],
	                    [-87.852221, 36.633308],
	                    [-88.071299, 36.677123],
	                    [-88.054868, 36.496384],
	                    [-89.298133, 36.507338],
	                    [-89.418626, 36.496384],
	                    [-89.363857, 36.622354],
	                    [-89.215979, 36.578538],
	                    [-89.133825, 36.983832],
	                    [-89.183118, 37.038601],
	                    [-89.029763, 37.213863],
	                    [-88.914747, 37.224817],
	                    [-88.547792, 37.071463],
	                    [-88.421823, 37.153617],
	                    [-88.514931, 37.285064],
	                    [-88.476592, 37.389126],
	                    [-88.065822, 37.482234],
	                    [-88.15893, 37.657496],
	                    [-88.027483, 37.799896],
	                    [-87.934375, 37.893004],
	                    [-87.682436, 37.903958],
	                    [-87.600282, 37.975158],
	                    [-87.512651, 37.903958],
	                    [-87.381204, 37.93682],
	                    [-87.129265, 37.788942],
	                    [-87.047111, 37.893004],
	                    [-86.795172, 37.991589],
	                    [-86.729448, 37.893004],
	                    [-86.504894, 37.931343],
	                    [-86.521325, 38.040881],
	                    [-86.302247, 38.166851],
	                    [-86.263908, 38.051835],
	                    [-86.039354, 37.958727],
	                    [-85.924338, 38.024451],
	                    [-85.83123, 38.27639],
	                    [-85.655968, 38.325682],
	                    [-85.590245, 38.451652],
	                    [-85.42046, 38.533806],
	                    [-85.431413, 38.730976],
	                    [-85.173997, 38.68716],
	                    [-84.987781, 38.780268],
	                    [-84.812519, 38.785745],
	                    [-84.894673, 39.059592],
	                    [-84.817996, 39.103408],
	                    [-84.43461, 39.103408],
	                    [-84.231963, 38.895284],
	                    [-84.215533, 38.807653],
	                    [-83.903347, 38.769315]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "22",
	        "properties": {
	            "name": "Louisiana",
	            "density": 105
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-93.608485, 33.018527],
	                    [-91.16577, 33.002096],
	                    [-91.072662, 32.887081],
	                    [-91.143862, 32.843265],
	                    [-91.154816, 32.640618],
	                    [-91.006939, 32.514649],
	                    [-90.985031, 32.218894],
	                    [-91.105524, 31.988862],
	                    [-91.341032, 31.846462],
	                    [-91.401278, 31.621907],
	                    [-91.499863, 31.643815],
	                    [-91.516294, 31.27686],
	                    [-91.636787, 31.265906],
	                    [-91.565587, 31.068736],
	                    [-91.636787, 30.997536],
	                    [-89.747242, 30.997536],
	                    [-89.845827, 30.66892],
	                    [-89.681519, 30.449842],
	                    [-89.643181, 30.285534],
	                    [-89.522688, 30.181472],
	                    [-89.818443, 30.044549],
	                    [-89.84035, 29.945964],
	                    [-89.599365, 29.88024],
	                    [-89.495303, 30.039072],
	                    [-89.287179, 29.88024],
	                    [-89.30361, 29.754271],
	                    [-89.424103, 29.699501],
	                    [-89.648657, 29.748794],
	                    [-89.621273, 29.655686],
	                    [-89.69795, 29.513285],
	                    [-89.506257, 29.387316],
	                    [-89.199548, 29.348977],
	                    [-89.09001, 29.2011],
	                    [-89.002379, 29.179192],
	                    [-89.16121, 29.009407],
	                    [-89.336472, 29.042268],
	                    [-89.484349, 29.217531],
	                    [-89.851304, 29.310638],
	                    [-89.851304, 29.480424],
	                    [-90.032043, 29.425654],
	                    [-90.021089, 29.283254],
	                    [-90.103244, 29.151807],
	                    [-90.23469, 29.129899],
	                    [-90.333275, 29.277777],
	                    [-90.563307, 29.283254],
	                    [-90.645461, 29.129899],
	                    [-90.798815, 29.086084],
	                    [-90.963123, 29.179192],
	                    [-91.09457, 29.190146],
	                    [-91.220539, 29.436608],
	                    [-91.445094, 29.546147],
	                    [-91.532725, 29.529716],
	                    [-91.620356, 29.73784],
	                    [-91.883249, 29.710455],
	                    [-91.888726, 29.836425],
	                    [-92.146142, 29.715932],
	                    [-92.113281, 29.622824],
	                    [-92.31045, 29.535193],
	                    [-92.617159, 29.579009],
	                    [-92.97316, 29.715932],
	                    [-93.2251, 29.776178],
	                    [-93.767317, 29.726886],
	                    [-93.838517, 29.688547],
	                    [-93.926148, 29.787132],
	                    [-93.690639, 30.143133],
	                    [-93.767317, 30.334826],
	                    [-93.696116, 30.438888],
	                    [-93.728978, 30.575812],
	                    [-93.630393, 30.679874],
	                    [-93.526331, 30.93729],
	                    [-93.542762, 31.15089],
	                    [-93.816609, 31.556184],
	                    [-93.822086, 31.775262],
	                    [-94.041164, 31.994339],
	                    [-94.041164, 33.018527],
	                    [-93.608485, 33.018527]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "23",
	        "properties": {
	            "name": "Maine",
	            "density": 43.04
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-70.703921, 43.057759],
	                    [-70.824413, 43.128959],
	                    [-70.807983, 43.227544],
	                    [-70.966814, 43.34256],
	                    [-71.032537, 44.657025],
	                    [-71.08183, 45.303304],
	                    [-70.649151, 45.440228],
	                    [-70.720352, 45.511428],
	                    [-70.556043, 45.664782],
	                    [-70.386258, 45.735983],
	                    [-70.41912, 45.796229],
	                    [-70.260289, 45.889337],
	                    [-70.309581, 46.064599],
	                    [-70.210996, 46.327492],
	                    [-70.057642, 46.415123],
	                    [-69.997395, 46.694447],
	                    [-69.225147, 47.461219],
	                    [-69.044408, 47.428357],
	                    [-69.033454, 47.242141],
	                    [-68.902007, 47.176418],
	                    [-68.578868, 47.285957],
	                    [-68.376221, 47.285957],
	                    [-68.233821, 47.357157],
	                    [-67.954497, 47.198326],
	                    [-67.790188, 47.066879],
	                    [-67.779235, 45.944106],
	                    [-67.801142, 45.675736],
	                    [-67.456095, 45.604536],
	                    [-67.505388, 45.48952],
	                    [-67.417757, 45.379982],
	                    [-67.488957, 45.281397],
	                    [-67.346556, 45.128042],
	                    [-67.16034, 45.160904],
	                    [-66.979601, 44.804903],
	                    [-67.187725, 44.646072],
	                    [-67.308218, 44.706318],
	                    [-67.406803, 44.596779],
	                    [-67.549203, 44.624164],
	                    [-67.565634, 44.531056],
	                    [-67.75185, 44.54201],
	                    [-68.047605, 44.328409],
	                    [-68.118805, 44.476286],
	                    [-68.222867, 44.48724],
	                    [-68.173574, 44.328409],
	                    [-68.403606, 44.251732],
	                    [-68.458375, 44.377701],
	                    [-68.567914, 44.311978],
	                    [-68.82533, 44.311978],
	                    [-68.830807, 44.459856],
	                    [-68.984161, 44.426994],
	                    [-68.956777, 44.322932],
	                    [-69.099177, 44.103854],
	                    [-69.071793, 44.043608],
	                    [-69.258008, 43.923115],
	                    [-69.444224, 43.966931],
	                    [-69.553763, 43.840961],
	                    [-69.707118, 43.82453],
	                    [-69.833087, 43.720469],
	                    [-69.986442, 43.742376],
	                    [-70.030257, 43.851915],
	                    [-70.254812, 43.676653],
	                    [-70.194565, 43.567114],
	                    [-70.358873, 43.528776],
	                    [-70.369827, 43.435668],
	                    [-70.556043, 43.320652],
	                    [-70.703921, 43.057759]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "24",
	        "properties": {
	            "name": "Maryland",
	            "density": 596.3
	        },
	        "geometry": {
	            "type": "MultiPolygon",
	            "coordinates": [
	                [
	                    [
	                        [-75.994645, 37.95325],
	                        [-76.016553, 37.95325],
	                        [-76.043938, 37.95325],
	                        [-75.994645, 37.95325]
	                    ]
	                ],
	                [
	                    [
	                        [-79.477979, 39.722302],
	                        [-75.786521, 39.722302],
	                        [-75.693413, 38.462606],
	                        [-75.047134, 38.451652],
	                        [-75.244304, 38.029928],
	                        [-75.397659, 38.013497],
	                        [-75.671506, 37.95325],
	                        [-75.885106, 37.909435],
	                        [-75.879629, 38.073743],
	                        [-75.961783, 38.139466],
	                        [-75.846768, 38.210667],
	                        [-76.000122, 38.374975],
	                        [-76.049415, 38.303775],
	                        [-76.257538, 38.320205],
	                        [-76.328738, 38.500944],
	                        [-76.263015, 38.500944],
	                        [-76.257538, 38.736453],
	                        [-76.191815, 38.829561],
	                        [-76.279446, 39.147223],
	                        [-76.169907, 39.333439],
	                        [-76.000122, 39.366301],
	                        [-75.972737, 39.557994],
	                        [-76.098707, 39.536086],
	                        [-76.104184, 39.437501],
	                        [-76.367077, 39.311532],
	                        [-76.443754, 39.196516],
	                        [-76.460185, 38.906238],
	                        [-76.55877, 38.769315],
	                        [-76.514954, 38.539283],
	                        [-76.383508, 38.380452],
	                        [-76.399939, 38.259959],
	                        [-76.317785, 38.139466],
	                        [-76.3616, 38.057312],
	                        [-76.591632, 38.216144],
	                        [-76.920248, 38.292821],
	                        [-77.018833, 38.446175],
	                        [-77.205049, 38.358544],
	                        [-77.276249, 38.479037],
	                        [-77.128372, 38.632391],
	                        [-77.040741, 38.791222],
	                        [-76.909294, 38.895284],
	                        [-77.035264, 38.993869],
	                        [-77.117418, 38.933623],
	                        [-77.248864, 39.026731],
	                        [-77.456988, 39.076023],
	                        [-77.456988, 39.223901],
	                        [-77.566527, 39.306055],
	                        [-77.719881, 39.322485],
	                        [-77.834897, 39.601809],
	                        [-78.004682, 39.601809],
	                        [-78.174467, 39.694917],
	                        [-78.267575, 39.61824],
	                        [-78.431884, 39.623717],
	                        [-78.470222, 39.514178],
	                        [-78.765977, 39.585379],
	                        [-78.963147, 39.437501],
	                        [-79.094593, 39.470363],
	                        [-79.291763, 39.300578],
	                        [-79.488933, 39.20747],
	                        [-79.477979, 39.722302]
	                    ]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "25",
	        "properties": {
	            "name": "Massachusetts",
	            "density": 840.2
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-70.917521, 42.887974],
	                    [-70.818936, 42.871543],
	                    [-70.780598, 42.696281],
	                    [-70.824413, 42.55388],
	                    [-70.983245, 42.422434],
	                    [-70.988722, 42.269079],
	                    [-70.769644, 42.247172],
	                    [-70.638197, 42.08834],
	                    [-70.660105, 41.962371],
	                    [-70.550566, 41.929509],
	                    [-70.539613, 41.814493],
	                    [-70.260289, 41.715908],
	                    [-69.937149, 41.809016],
	                    [-70.008349, 41.672093],
	                    [-70.484843, 41.5516],
	                    [-70.660105, 41.546123],
	                    [-70.764167, 41.639231],
	                    [-70.928475, 41.611847],
	                    [-70.933952, 41.540646],
	                    [-71.120168, 41.496831],
	                    [-71.196845, 41.67757],
	                    [-71.22423, 41.710431],
	                    [-71.328292, 41.781632],
	                    [-71.383061, 42.01714],
	                    [-71.530939, 42.01714],
	                    [-71.799309, 42.006186],
	                    [-71.799309, 42.022617],
	                    [-73.053528, 42.039048],
	                    [-73.486206, 42.050002],
	                    [-73.508114, 42.08834],
	                    [-73.267129, 42.745573],
	                    [-72.456542, 42.729142],
	                    [-71.29543, 42.696281],
	                    [-71.185891, 42.789389],
	                    [-70.917521, 42.887974]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "26",
	        "properties": {
	            "name": "Michigan",
	            "density": 173.9
	        },
	        "geometry": {
	            "type": "MultiPolygon",
	            "coordinates": [
	                [
	                    [
	                        [-83.454238, 41.732339],
	                        [-84.807042, 41.694001],
	                        [-84.807042, 41.759724],
	                        [-85.990061, 41.759724],
	                        [-86.822556, 41.759724],
	                        [-86.619909, 41.891171],
	                        [-86.482986, 42.115725],
	                        [-86.357016, 42.252649],
	                        [-86.263908, 42.444341],
	                        [-86.209139, 42.718189],
	                        [-86.231047, 43.013943],
	                        [-86.526801, 43.594499],
	                        [-86.433693, 43.813577],
	                        [-86.499417, 44.07647],
	                        [-86.269385, 44.34484],
	                        [-86.220093, 44.569394],
	                        [-86.252954, 44.689887],
	                        [-86.088646, 44.73918],
	                        [-86.066738, 44.903488],
	                        [-85.809322, 44.947303],
	                        [-85.612152, 45.128042],
	                        [-85.628583, 44.766564],
	                        [-85.524521, 44.750133],
	                        [-85.393075, 44.930872],
	                        [-85.387598, 45.237581],
	                        [-85.305444, 45.314258],
	                        [-85.031597, 45.363551],
	                        [-85.119228, 45.577151],
	                        [-84.938489, 45.75789],
	                        [-84.713934, 45.768844],
	                        [-84.461995, 45.653829],
	                        [-84.215533, 45.637398],
	                        [-84.09504, 45.494997],
	                        [-83.908824, 45.484043],
	                        [-83.596638, 45.352597],
	                        [-83.4871, 45.358074],
	                        [-83.317314, 45.144473],
	                        [-83.454238, 45.029457],
	                        [-83.322791, 44.88158],
	                        [-83.273499, 44.711795],
	                        [-83.333745, 44.339363],
	                        [-83.536392, 44.246255],
	                        [-83.585684, 44.054562],
	                        [-83.82667, 43.988839],
	                        [-83.958116, 43.758807],
	                        [-83.908824, 43.671176],
	                        [-83.667839, 43.589022],
	                        [-83.481623, 43.714992],
	                        [-83.262545, 43.972408],
	                        [-82.917498, 44.070993],
	                        [-82.747713, 43.994316],
	                        [-82.643651, 43.851915],
	                        [-82.539589, 43.435668],
	                        [-82.523158, 43.227544],
	                        [-82.413619, 42.975605],
	                        [-82.517681, 42.614127],
	                        [-82.681989, 42.559357],
	                        [-82.687466, 42.690804],
	                        [-82.797005, 42.652465],
	                        [-82.922975, 42.351234],
	                        [-83.125621, 42.236218],
	                        [-83.185868, 42.006186],
	                        [-83.437807, 41.814493],
	                        [-83.454238, 41.732339]
	                    ]
	                ],
	                [
	                    [
	                        [-85.508091, 45.730506],
	                        [-85.49166, 45.610013],
	                        [-85.623106, 45.588105],
	                        [-85.568337, 45.75789],
	                        [-85.508091, 45.730506]
	                    ]
	                ],
	                [
	                    [
	                        [-87.589328, 45.095181],
	                        [-87.742682, 45.199243],
	                        [-87.649574, 45.341643],
	                        [-87.885083, 45.363551],
	                        [-87.791975, 45.500474],
	                        [-87.781021, 45.675736],
	                        [-87.989145, 45.796229],
	                        [-88.10416, 45.922199],
	                        [-88.531362, 46.020784],
	                        [-88.662808, 45.987922],
	                        [-89.09001, 46.135799],
	                        [-90.119674, 46.338446],
	                        [-90.229213, 46.508231],
	                        [-90.415429, 46.568478],
	                        [-90.026566, 46.672539],
	                        [-89.851304, 46.793032],
	                        [-89.413149, 46.842325],
	                        [-89.128348, 46.990202],
	                        [-88.996902, 46.995679],
	                        [-88.887363, 47.099741],
	                        [-88.575177, 47.247618],
	                        [-88.416346, 47.373588],
	                        [-88.180837, 47.455742],
	                        [-87.956283, 47.384542],
	                        [-88.350623, 47.077833],
	                        [-88.443731, 46.973771],
	                        [-88.438254, 46.787555],
	                        [-88.246561, 46.929956],
	                        [-87.901513, 46.908048],
	                        [-87.633143, 46.809463],
	                        [-87.392158, 46.535616],
	                        [-87.260711, 46.486323],
	                        [-87.008772, 46.530139],
	                        [-86.948526, 46.469893],
	                        [-86.696587, 46.437031],
	                        [-86.159846, 46.667063],
	                        [-85.880522, 46.68897],
	                        [-85.508091, 46.678016],
	                        [-85.256151, 46.754694],
	                        [-85.064458, 46.760171],
	                        [-85.02612, 46.480847],
	                        [-84.82895, 46.442508],
	                        [-84.63178, 46.486323],
	                        [-84.549626, 46.4206],
	                        [-84.418179, 46.502754],
	                        [-84.127902, 46.530139],
	                        [-84.122425, 46.179615],
	                        [-83.990978, 46.031737],
	                        [-83.793808, 45.993399],
	                        [-83.7719, 46.091984],
	                        [-83.580208, 46.091984],
	                        [-83.476146, 45.987922],
	                        [-83.563777, 45.911245],
	                        [-84.111471, 45.976968],
	                        [-84.374364, 45.933153],
	                        [-84.659165, 46.053645],
	                        [-84.741319, 45.944106],
	                        [-84.70298, 45.850998],
	                        [-84.82895, 45.872906],
	                        [-85.015166, 46.00983],
	                        [-85.338305, 46.091984],
	                        [-85.502614, 46.097461],
	                        [-85.661445, 45.966014],
	                        [-85.924338, 45.933153],
	                        [-86.209139, 45.960537],
	                        [-86.324155, 45.905768],
	                        [-86.351539, 45.796229],
	                        [-86.663725, 45.703121],
	                        [-86.647294, 45.834568],
	                        [-86.784218, 45.861952],
	                        [-86.838987, 45.725029],
	                        [-87.069019, 45.719552],
	                        [-87.17308, 45.659305],
	                        [-87.326435, 45.423797],
	                        [-87.611236, 45.122565],
	                        [-87.589328, 45.095181]
	                    ]
	                ],
	                [
	                    [
	                        [-88.805209, 47.976051],
	                        [-89.057148, 47.850082],
	                        [-89.188594, 47.833651],
	                        [-89.177641, 47.937713],
	                        [-88.547792, 48.173221],
	                        [-88.668285, 48.008913],
	                        [-88.805209, 47.976051]
	                    ]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "27",
	        "properties": {
	            "name": "Minnesota",
	            "density": 67.14
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-92.014696, 46.705401],
	                    [-92.091373, 46.749217],
	                    [-92.29402, 46.667063],
	                    [-92.29402, 46.075553],
	                    [-92.354266, 46.015307],
	                    [-92.639067, 45.933153],
	                    [-92.869098, 45.719552],
	                    [-92.885529, 45.577151],
	                    [-92.770513, 45.566198],
	                    [-92.644544, 45.440228],
	                    [-92.75956, 45.286874],
	                    [-92.737652, 45.117088],
	                    [-92.808852, 44.750133],
	                    [-92.545959, 44.569394],
	                    [-92.337835, 44.552964],
	                    [-92.233773, 44.443425],
	                    [-91.927065, 44.333886],
	                    [-91.877772, 44.202439],
	                    [-91.592971, 44.032654],
	                    [-91.43414, 43.994316],
	                    [-91.242447, 43.775238],
	                    [-91.269832, 43.616407],
	                    [-91.215062, 43.501391],
	                    [-91.368417, 43.501391],
	                    [-96.451017, 43.501391],
	                    [-96.451017, 45.297827],
	                    [-96.681049, 45.412843],
	                    [-96.856311, 45.604536],
	                    [-96.582464, 45.818137],
	                    [-96.560556, 45.933153],
	                    [-96.598895, 46.332969],
	                    [-96.719387, 46.437031],
	                    [-96.801542, 46.656109],
	                    [-96.785111, 46.924479],
	                    [-96.823449, 46.968294],
	                    [-96.856311, 47.609096],
	                    [-97.053481, 47.948667],
	                    [-97.130158, 48.140359],
	                    [-97.16302, 48.545653],
	                    [-97.097296, 48.682577],
	                    [-97.228743, 49.000239],
	                    [-95.152983, 49.000239],
	                    [-95.152983, 49.383625],
	                    [-94.955813, 49.372671],
	                    [-94.824366, 49.295994],
	                    [-94.69292, 48.775685],
	                    [-94.588858, 48.715438],
	                    [-94.260241, 48.699007],
	                    [-94.221903, 48.649715],
	                    [-93.838517, 48.627807],
	                    [-93.794701, 48.518268],
	                    [-93.466085, 48.545653],
	                    [-93.466085, 48.589469],
	                    [-93.208669, 48.644238],
	                    [-92.984114, 48.62233],
	                    [-92.726698, 48.540176],
	                    [-92.655498, 48.436114],
	                    [-92.50762, 48.447068],
	                    [-92.370697, 48.222514],
	                    [-92.304974, 48.315622],
	                    [-92.053034, 48.359437],
	                    [-92.009219, 48.266329],
	                    [-91.713464, 48.200606],
	                    [-91.713464, 48.112975],
	                    [-91.565587, 48.041775],
	                    [-91.264355, 48.080113],
	                    [-91.083616, 48.178698],
	                    [-90.837154, 48.238944],
	                    [-90.749522, 48.091067],
	                    [-90.579737, 48.123929],
	                    [-90.377091, 48.091067],
	                    [-90.141582, 48.112975],
	                    [-89.873212, 47.987005],
	                    [-89.615796, 48.008913],
	                    [-89.637704, 47.954144],
	                    [-89.971797, 47.828174],
	                    [-90.437337, 47.729589],
	                    [-90.738569, 47.625527],
	                    [-91.171247, 47.368111],
	                    [-91.357463, 47.20928],
	                    [-91.642264, 47.028541],
	                    [-92.091373, 46.787555],
	                    [-92.014696, 46.705401]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "28",
	        "properties": {
	            "name": "Mississippi",
	            "density": 63.50
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-88.471115, 34.995703],
	                    [-88.202745, 34.995703],
	                    [-88.098683, 34.891641],
	                    [-88.241084, 33.796253],
	                    [-88.471115, 31.895754],
	                    [-88.394438, 30.367688],
	                    [-88.503977, 30.323872],
	                    [-88.744962, 30.34578],
	                    [-88.843547, 30.411504],
	                    [-89.084533, 30.367688],
	                    [-89.418626, 30.252672],
	                    [-89.522688, 30.181472],
	                    [-89.643181, 30.285534],
	                    [-89.681519, 30.449842],
	                    [-89.845827, 30.66892],
	                    [-89.747242, 30.997536],
	                    [-91.636787, 30.997536],
	                    [-91.565587, 31.068736],
	                    [-91.636787, 31.265906],
	                    [-91.516294, 31.27686],
	                    [-91.499863, 31.643815],
	                    [-91.401278, 31.621907],
	                    [-91.341032, 31.846462],
	                    [-91.105524, 31.988862],
	                    [-90.985031, 32.218894],
	                    [-91.006939, 32.514649],
	                    [-91.154816, 32.640618],
	                    [-91.143862, 32.843265],
	                    [-91.072662, 32.887081],
	                    [-91.16577, 33.002096],
	                    [-91.089093, 33.13902],
	                    [-91.143862, 33.347144],
	                    [-91.056231, 33.429298],
	                    [-91.231493, 33.560744],
	                    [-91.072662, 33.867453],
	                    [-90.891923, 34.026284],
	                    [-90.952169, 34.135823],
	                    [-90.744046, 34.300131],
	                    [-90.749522, 34.365854],
	                    [-90.568783, 34.420624],
	                    [-90.585214, 34.617794],
	                    [-90.481152, 34.661609],
	                    [-90.409952, 34.831394],
	                    [-90.251121, 34.908072],
	                    [-90.311367, 34.995703],
	                    [-88.471115, 34.995703]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "29",
	        "properties": {
	            "name": "Missouri",
	            "density": 87.26
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-91.833957, 40.609566],
	                    [-91.729895, 40.615043],
	                    [-91.527248, 40.412397],
	                    [-91.417709, 40.379535],
	                    [-91.50534, 40.237135],
	                    [-91.494386, 40.034488],
	                    [-91.368417, 39.727779],
	                    [-91.061708, 39.470363],
	                    [-90.727615, 39.256762],
	                    [-90.661891, 38.928146],
	                    [-90.585214, 38.867899],
	                    [-90.470199, 38.961007],
	                    [-90.251121, 38.917192],
	                    [-90.10872, 38.845992],
	                    [-90.207305, 38.725499],
	                    [-90.179921, 38.632391],
	                    [-90.349706, 38.374975],
	                    [-90.355183, 38.216144],
	                    [-90.059428, 38.013497],
	                    [-89.949889, 37.88205],
	                    [-89.84035, 37.903958],
	                    [-89.517211, 37.690357],
	                    [-89.517211, 37.537003],
	                    [-89.435057, 37.34531],
	                    [-89.517211, 37.279587],
	                    [-89.292656, 36.994786],
	                    [-89.133825, 36.983832],
	                    [-89.215979, 36.578538],
	                    [-89.363857, 36.622354],
	                    [-89.418626, 36.496384],
	                    [-89.484349, 36.496384],
	                    [-89.539119, 36.496384],
	                    [-89.533642, 36.249922],
	                    [-89.730812, 35.997983],
	                    [-90.377091, 35.997983],
	                    [-90.218259, 36.184199],
	                    [-90.064905, 36.304691],
	                    [-90.152536, 36.496384],
	                    [-94.473842, 36.501861],
	                    [-94.616242, 36.501861],
	                    [-94.616242, 37.000263],
	                    [-94.610765, 39.158177],
	                    [-94.824366, 39.20747],
	                    [-94.983197, 39.442978],
	                    [-95.109167, 39.541563],
	                    [-94.884612, 39.831841],
	                    [-95.207752, 39.908518],
	                    [-95.306337, 40.001626],
	                    [-95.552799, 40.264519],
	                    [-95.7664, 40.587659],
	                    [-94.632673, 40.571228],
	                    [-93.257961, 40.582182],
	                    [-91.833957, 40.609566]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "30",
	        "properties": {
	            "name": "Montana",
	            "density": 6.858
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-104.047534, 49.000239],
	                    [-104.042057, 47.861036],
	                    [-104.047534, 45.944106],
	                    [-104.042057, 44.996596],
	                    [-104.058488, 44.996596],
	                    [-105.91517, 45.002073],
	                    [-109.080842, 45.002073],
	                    [-111.05254, 45.002073],
	                    [-111.047063, 44.476286],
	                    [-111.227803, 44.580348],
	                    [-111.386634, 44.75561],
	                    [-111.616665, 44.547487],
	                    [-111.819312, 44.509148],
	                    [-111.868605, 44.563917],
	                    [-112.104113, 44.520102],
	                    [-112.241036, 44.569394],
	                    [-112.471068, 44.481763],
	                    [-112.783254, 44.48724],
	                    [-112.887315, 44.394132],
	                    [-113.002331, 44.448902],
	                    [-113.133778, 44.772041],
	                    [-113.341901, 44.782995],
	                    [-113.456917, 44.865149],
	                    [-113.45144, 45.056842],
	                    [-113.571933, 45.128042],
	                    [-113.736241, 45.330689],
	                    [-113.834826, 45.522382],
	                    [-113.807441, 45.604536],
	                    [-113.98818, 45.703121],
	                    [-114.086765, 45.593582],
	                    [-114.333228, 45.456659],
	                    [-114.546828, 45.560721],
	                    [-114.497536, 45.670259],
	                    [-114.568736, 45.774321],
	                    [-114.387997, 45.88386],
	                    [-114.492059, 46.037214],
	                    [-114.464674, 46.272723],
	                    [-114.322274, 46.645155],
	                    [-114.612552, 46.639678],
	                    [-114.623506, 46.705401],
	                    [-114.886399, 46.809463],
	                    [-114.930214, 46.919002],
	                    [-115.302646, 47.187372],
	                    [-115.324554, 47.258572],
	                    [-115.527201, 47.302388],
	                    [-115.718894, 47.42288],
	                    [-115.724371, 47.696727],
	                    [-116.04751, 47.976051],
	                    [-116.04751, 49.000239],
	                    [-111.50165, 48.994762],
	                    [-109.453274, 49.000239],
	                    [-104.047534, 49.000239]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "31",
	        "properties": {
	            "name": "Nebraska",
	            "density": 23.97
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-103.324578, 43.002989],
	                    [-101.626726, 42.997512],
	                    [-98.499393, 42.997512],
	                    [-98.466531, 42.94822],
	                    [-97.951699, 42.767481],
	                    [-97.831206, 42.866066],
	                    [-97.688806, 42.844158],
	                    [-97.217789, 42.844158],
	                    [-96.692003, 42.657942],
	                    [-96.626279, 42.515542],
	                    [-96.44554, 42.488157],
	                    [-96.264801, 42.039048],
	                    [-96.127878, 41.973325],
	                    [-96.062155, 41.798063],
	                    [-96.122401, 41.67757],
	                    [-96.095016, 41.540646],
	                    [-95.919754, 41.453015],
	                    [-95.925231, 41.201076],
	                    [-95.826646, 40.976521],
	                    [-95.881416, 40.719105],
	                    [-95.7664, 40.587659],
	                    [-95.552799, 40.264519],
	                    [-95.306337, 40.001626],
	                    [-101.90605, 40.001626],
	                    [-102.053927, 40.001626],
	                    [-102.053927, 41.003906],
	                    [-104.053011, 41.003906],
	                    [-104.053011, 43.002989],
	                    [-103.324578, 43.002989]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "32",
	        "properties": {
	            "name": "Nevada",
	            "density": 24.80
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-117.027882, 42.000709],
	                    [-114.04295, 41.995232],
	                    [-114.048427, 37.000263],
	                    [-114.048427, 36.195153],
	                    [-114.152489, 36.025367],
	                    [-114.251074, 36.01989],
	                    [-114.371566, 36.140383],
	                    [-114.738521, 36.102045],
	                    [-114.678275, 35.516012],
	                    [-114.596121, 35.324319],
	                    [-114.574213, 35.138103],
	                    [-114.634459, 35.00118],
	                    [-115.85034, 35.970598],
	                    [-116.540435, 36.501861],
	                    [-117.498899, 37.21934],
	                    [-118.71478, 38.101128],
	                    [-120.001861, 38.999346],
	                    [-119.996384, 40.264519],
	                    [-120.001861, 41.995232],
	                    [-118.698349, 41.989755],
	                    [-117.027882, 42.000709]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "33",
	        "properties": {
	            "name": "New Hampshire",
	            "density": 147
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-71.08183, 45.303304],
	                    [-71.032537, 44.657025],
	                    [-70.966814, 43.34256],
	                    [-70.807983, 43.227544],
	                    [-70.824413, 43.128959],
	                    [-70.703921, 43.057759],
	                    [-70.818936, 42.871543],
	                    [-70.917521, 42.887974],
	                    [-71.185891, 42.789389],
	                    [-71.29543, 42.696281],
	                    [-72.456542, 42.729142],
	                    [-72.544173, 42.80582],
	                    [-72.533219, 42.953697],
	                    [-72.445588, 43.008466],
	                    [-72.456542, 43.150867],
	                    [-72.379864, 43.572591],
	                    [-72.204602, 43.769761],
	                    [-72.116971, 43.994316],
	                    [-72.02934, 44.07647],
	                    [-72.034817, 44.322932],
	                    [-71.700724, 44.41604],
	                    [-71.536416, 44.585825],
	                    [-71.629524, 44.750133],
	                    [-71.4926, 44.914442],
	                    [-71.503554, 45.013027],
	                    [-71.361154, 45.270443],
	                    [-71.131122, 45.243058],
	                    [-71.08183, 45.303304]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "34",
	        "properties": {
	            "name": "New Jersey",
	            "density": 1189
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-74.236547, 41.14083],
	                    [-73.902454, 40.998429],
	                    [-74.022947, 40.708151],
	                    [-74.187255, 40.642428],
	                    [-74.274886, 40.489074],
	                    [-74.001039, 40.412397],
	                    [-73.979131, 40.297381],
	                    [-74.099624, 39.760641],
	                    [-74.411809, 39.360824],
	                    [-74.614456, 39.245808],
	                    [-74.795195, 38.993869],
	                    [-74.888303, 39.158177],
	                    [-75.178581, 39.240331],
	                    [-75.534582, 39.459409],
	                    [-75.55649, 39.607286],
	                    [-75.561967, 39.629194],
	                    [-75.507197, 39.683964],
	                    [-75.414089, 39.804456],
	                    [-75.145719, 39.88661],
	                    [-75.129289, 39.963288],
	                    [-74.82258, 40.127596],
	                    [-74.773287, 40.215227],
	                    [-75.058088, 40.417874],
	                    [-75.069042, 40.543843],
	                    [-75.195012, 40.576705],
	                    [-75.205966, 40.691721],
	                    [-75.052611, 40.866983],
	                    [-75.134765, 40.971045],
	                    [-74.882826, 41.179168],
	                    [-74.828057, 41.288707],
	                    [-74.69661, 41.359907],
	                    [-74.236547, 41.14083]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "35",
	        "properties": {
	            "name": "New Mexico",
	            "density": 17.16
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-107.421329, 37.000263],
	                    [-106.868158, 36.994786],
	                    [-104.337812, 36.994786],
	                    [-103.001438, 37.000263],
	                    [-103.001438, 36.501861],
	                    [-103.039777, 36.501861],
	                    [-103.045254, 34.01533],
	                    [-103.067161, 33.002096],
	                    [-103.067161, 31.999816],
	                    [-106.616219, 31.999816],
	                    [-106.643603, 31.901231],
	                    [-106.528588, 31.786216],
	                    [-108.210008, 31.786216],
	                    [-108.210008, 31.331629],
	                    [-109.04798, 31.331629],
	                    [-109.042503, 37.000263],
	                    [-107.421329, 37.000263]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "36",
	        "properties": {
	            "name": "New York",
	            "density": 412.3
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-73.343806, 45.013027],
	                    [-73.332852, 44.804903],
	                    [-73.387622, 44.618687],
	                    [-73.294514, 44.437948],
	                    [-73.321898, 44.246255],
	                    [-73.436914, 44.043608],
	                    [-73.349283, 43.769761],
	                    [-73.404052, 43.687607],
	                    [-73.245221, 43.523299],
	                    [-73.278083, 42.833204],
	                    [-73.267129, 42.745573],
	                    [-73.508114, 42.08834],
	                    [-73.486206, 42.050002],
	                    [-73.55193, 41.294184],
	                    [-73.48073, 41.21203],
	                    [-73.727192, 41.102491],
	                    [-73.655992, 40.987475],
	                    [-73.22879, 40.905321],
	                    [-73.141159, 40.965568],
	                    [-72.774204, 40.965568],
	                    [-72.587988, 40.998429],
	                    [-72.28128, 41.157261],
	                    [-72.259372, 41.042245],
	                    [-72.100541, 40.992952],
	                    [-72.467496, 40.845075],
	                    [-73.239744, 40.625997],
	                    [-73.562884, 40.582182],
	                    [-73.776484, 40.593136],
	                    [-73.935316, 40.543843],
	                    [-74.022947, 40.708151],
	                    [-73.902454, 40.998429],
	                    [-74.236547, 41.14083],
	                    [-74.69661, 41.359907],
	                    [-74.740426, 41.431108],
	                    [-74.89378, 41.436584],
	                    [-75.074519, 41.60637],
	                    [-75.052611, 41.754247],
	                    [-75.173104, 41.869263],
	                    [-75.249781, 41.863786],
	                    [-75.35932, 42.000709],
	                    [-79.76278, 42.000709],
	                    [-79.76278, 42.252649],
	                    [-79.76278, 42.269079],
	                    [-79.149363, 42.55388],
	                    [-79.050778, 42.690804],
	                    [-78.853608, 42.783912],
	                    [-78.930285, 42.953697],
	                    [-79.012439, 42.986559],
	                    [-79.072686, 43.260406],
	                    [-78.486653, 43.375421],
	                    [-77.966344, 43.369944],
	                    [-77.75822, 43.34256],
	                    [-77.533665, 43.233021],
	                    [-77.391265, 43.276836],
	                    [-76.958587, 43.271359],
	                    [-76.695693, 43.34256],
	                    [-76.41637, 43.523299],
	                    [-76.235631, 43.528776],
	                    [-76.230154, 43.802623],
	                    [-76.137046, 43.961454],
	                    [-76.3616, 44.070993],
	                    [-76.312308, 44.196962],
	                    [-75.912491, 44.366748],
	                    [-75.764614, 44.514625],
	                    [-75.282643, 44.848718],
	                    [-74.828057, 45.018503],
	                    [-74.148916, 44.991119],
	                    [-73.343806, 45.013027]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "37",
	        "properties": {
	            "name": "North Carolina",
	            "density": 198.2
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-80.978661, 36.562108],
	                    [-80.294043, 36.545677],
	                    [-79.510841, 36.5402],
	                    [-75.868676, 36.551154],
	                    [-75.75366, 36.151337],
	                    [-76.032984, 36.189676],
	                    [-76.071322, 36.140383],
	                    [-76.410893, 36.080137],
	                    [-76.460185, 36.025367],
	                    [-76.68474, 36.008937],
	                    [-76.673786, 35.937736],
	                    [-76.399939, 35.987029],
	                    [-76.3616, 35.943213],
	                    [-76.060368, 35.992506],
	                    [-75.961783, 35.899398],
	                    [-75.781044, 35.937736],
	                    [-75.715321, 35.696751],
	                    [-75.775568, 35.581735],
	                    [-75.89606, 35.570781],
	                    [-76.147999, 35.324319],
	                    [-76.482093, 35.313365],
	                    [-76.536862, 35.14358],
	                    [-76.394462, 34.973795],
	                    [-76.279446, 34.940933],
	                    [-76.493047, 34.661609],
	                    [-76.673786, 34.694471],
	                    [-76.991448, 34.667086],
	                    [-77.210526, 34.60684],
	                    [-77.555573, 34.415147],
	                    [-77.82942, 34.163208],
	                    [-77.971821, 33.845545],
	                    [-78.179944, 33.916745],
	                    [-78.541422, 33.851022],
	                    [-79.675149, 34.80401],
	                    [-80.797922, 34.820441],
	                    [-80.781491, 34.935456],
	                    [-80.934845, 35.105241],
	                    [-81.038907, 35.044995],
	                    [-81.044384, 35.149057],
	                    [-82.276696, 35.198349],
	                    [-82.550543, 35.160011],
	                    [-82.764143, 35.066903],
	                    [-83.109191, 35.00118],
	                    [-83.618546, 34.984749],
	                    [-84.319594, 34.990226],
	                    [-84.29221, 35.225734],
	                    [-84.09504, 35.247642],
	                    [-84.018363, 35.41195],
	                    [-83.7719, 35.559827],
	                    [-83.498053, 35.565304],
	                    [-83.251591, 35.718659],
	                    [-82.994175, 35.773428],
	                    [-82.775097, 35.997983],
	                    [-82.638174, 36.063706],
	                    [-82.610789, 35.965121],
	                    [-82.216449, 36.156814],
	                    [-82.03571, 36.118475],
	                    [-81.909741, 36.304691],
	                    [-81.723525, 36.353984],
	                    [-81.679709, 36.589492],
	                    [-80.978661, 36.562108]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "38",
	        "properties": {
	            "name": "North Dakota",
	            "density": 9.916
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-97.228743, 49.000239],
	                    [-97.097296, 48.682577],
	                    [-97.16302, 48.545653],
	                    [-97.130158, 48.140359],
	                    [-97.053481, 47.948667],
	                    [-96.856311, 47.609096],
	                    [-96.823449, 46.968294],
	                    [-96.785111, 46.924479],
	                    [-96.801542, 46.656109],
	                    [-96.719387, 46.437031],
	                    [-96.598895, 46.332969],
	                    [-96.560556, 45.933153],
	                    [-104.047534, 45.944106],
	                    [-104.042057, 47.861036],
	                    [-104.047534, 49.000239],
	                    [-97.228743, 49.000239]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "39",
	        "properties": {
	            "name": "Ohio",
	            "density": 281.9
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-80.518598, 41.978802],
	                    [-80.518598, 40.636951],
	                    [-80.666475, 40.582182],
	                    [-80.595275, 40.472643],
	                    [-80.600752, 40.319289],
	                    [-80.737675, 40.078303],
	                    [-80.830783, 39.711348],
	                    [-81.219646, 39.388209],
	                    [-81.345616, 39.344393],
	                    [-81.455155, 39.410117],
	                    [-81.57017, 39.267716],
	                    [-81.685186, 39.273193],
	                    [-81.811156, 39.0815],
	                    [-81.783771, 38.966484],
	                    [-81.887833, 38.873376],
	                    [-82.03571, 39.026731],
	                    [-82.221926, 38.785745],
	                    [-82.172634, 38.632391],
	                    [-82.293127, 38.577622],
	                    [-82.331465, 38.446175],
	                    [-82.594358, 38.424267],
	                    [-82.731282, 38.561191],
	                    [-82.846298, 38.588575],
	                    [-82.890113, 38.758361],
	                    [-83.032514, 38.725499],
	                    [-83.142052, 38.626914],
	                    [-83.519961, 38.703591],
	                    [-83.678792, 38.632391],
	                    [-83.903347, 38.769315],
	                    [-84.215533, 38.807653],
	                    [-84.231963, 38.895284],
	                    [-84.43461, 39.103408],
	                    [-84.817996, 39.103408],
	                    [-84.801565, 40.500028],
	                    [-84.807042, 41.694001],
	                    [-83.454238, 41.732339],
	                    [-83.065375, 41.595416],
	                    [-82.933929, 41.513262],
	                    [-82.835344, 41.589939],
	                    [-82.616266, 41.431108],
	                    [-82.479343, 41.381815],
	                    [-82.013803, 41.513262],
	                    [-81.739956, 41.485877],
	                    [-81.444201, 41.672093],
	                    [-81.011523, 41.852832],
	                    [-80.518598, 41.978802],
	                    [-80.518598, 41.978802]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "40",
	        "properties": {
	            "name": "Oklahoma",
	            "density": 55.22
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-100.087706, 37.000263],
	                    [-94.616242, 37.000263],
	                    [-94.616242, 36.501861],
	                    [-94.430026, 35.395519],
	                    [-94.484796, 33.637421],
	                    [-94.868182, 33.74696],
	                    [-94.966767, 33.861976],
	                    [-95.224183, 33.960561],
	                    [-95.289906, 33.87293],
	                    [-95.547322, 33.878407],
	                    [-95.602092, 33.933176],
	                    [-95.8376, 33.834591],
	                    [-95.936185, 33.889361],
	                    [-96.149786, 33.840068],
	                    [-96.346956, 33.686714],
	                    [-96.423633, 33.774345],
	                    [-96.631756, 33.845545],
	                    [-96.850834, 33.845545],
	                    [-96.922034, 33.960561],
	                    [-97.173974, 33.736006],
	                    [-97.256128, 33.861976],
	                    [-97.371143, 33.823637],
	                    [-97.458774, 33.905791],
	                    [-97.694283, 33.982469],
	                    [-97.869545, 33.851022],
	                    [-97.946222, 33.987946],
	                    [-98.088623, 34.004376],
	                    [-98.170777, 34.113915],
	                    [-98.36247, 34.157731],
	                    [-98.488439, 34.064623],
	                    [-98.570593, 34.146777],
	                    [-98.767763, 34.135823],
	                    [-98.986841, 34.223454],
	                    [-99.189488, 34.2125],
	                    [-99.260688, 34.404193],
	                    [-99.57835, 34.415147],
	                    [-99.698843, 34.382285],
	                    [-99.923398, 34.573978],
	                    [-100.000075, 34.563024],
	                    [-100.000075, 36.501861],
	                    [-101.812942, 36.501861],
	                    [-103.001438, 36.501861],
	                    [-103.001438, 37.000263],
	                    [-102.042974, 36.994786],
	                    [-100.087706, 37.000263]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "41",
	        "properties": {
	            "name": "Oregon",
	            "density": 40.33
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-123.211348, 46.174138],
	                    [-123.11824, 46.185092],
	                    [-122.904639, 46.08103],
	                    [-122.811531, 45.960537],
	                    [-122.762239, 45.659305],
	                    [-122.247407, 45.549767],
	                    [-121.809251, 45.708598],
	                    [-121.535404, 45.725029],
	                    [-121.217742, 45.670259],
	                    [-121.18488, 45.604536],
	                    [-120.637186, 45.746937],
	                    [-120.505739, 45.697644],
	                    [-120.209985, 45.725029],
	                    [-119.963522, 45.823614],
	                    [-119.525367, 45.911245],
	                    [-119.125551, 45.933153],
	                    [-118.988627, 45.998876],
	                    [-116.918344, 45.993399],
	                    [-116.78142, 45.823614],
	                    [-116.545912, 45.752413],
	                    [-116.463758, 45.61549],
	                    [-116.671881, 45.319735],
	                    [-116.732128, 45.144473],
	                    [-116.847143, 45.02398],
	                    [-116.830713, 44.930872],
	                    [-116.934774, 44.782995],
	                    [-117.038836, 44.750133],
	                    [-117.241483, 44.394132],
	                    [-117.170283, 44.257209],
	                    [-116.97859, 44.240778],
	                    [-116.896436, 44.158624],
	                    [-117.027882, 43.830007],
	                    [-117.027882, 42.000709],
	                    [-118.698349, 41.989755],
	                    [-120.001861, 41.995232],
	                    [-121.037003, 41.995232],
	                    [-122.378853, 42.011663],
	                    [-123.233256, 42.006186],
	                    [-124.213628, 42.000709],
	                    [-124.356029, 42.115725],
	                    [-124.432706, 42.438865],
	                    [-124.416275, 42.663419],
	                    [-124.553198, 42.838681],
	                    [-124.454613, 43.002989],
	                    [-124.383413, 43.271359],
	                    [-124.235536, 43.55616],
	                    [-124.169813, 43.8081],
	                    [-124.060274, 44.657025],
	                    [-124.076705, 44.772041],
	                    [-123.97812, 45.144473],
	                    [-123.939781, 45.659305],
	                    [-123.994551, 45.944106],
	                    [-123.945258, 46.113892],
	                    [-123.545441, 46.261769],
	                    [-123.370179, 46.146753],
	                    [-123.211348, 46.174138]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "42",
	        "properties": {
	            "name": "Pennsylvania",
	            "density": 284.3
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-79.76278, 42.252649],
	                    [-79.76278, 42.000709],
	                    [-75.35932, 42.000709],
	                    [-75.249781, 41.863786],
	                    [-75.173104, 41.869263],
	                    [-75.052611, 41.754247],
	                    [-75.074519, 41.60637],
	                    [-74.89378, 41.436584],
	                    [-74.740426, 41.431108],
	                    [-74.69661, 41.359907],
	                    [-74.828057, 41.288707],
	                    [-74.882826, 41.179168],
	                    [-75.134765, 40.971045],
	                    [-75.052611, 40.866983],
	                    [-75.205966, 40.691721],
	                    [-75.195012, 40.576705],
	                    [-75.069042, 40.543843],
	                    [-75.058088, 40.417874],
	                    [-74.773287, 40.215227],
	                    [-74.82258, 40.127596],
	                    [-75.129289, 39.963288],
	                    [-75.145719, 39.88661],
	                    [-75.414089, 39.804456],
	                    [-75.616736, 39.831841],
	                    [-75.786521, 39.722302],
	                    [-79.477979, 39.722302],
	                    [-80.518598, 39.722302],
	                    [-80.518598, 40.636951],
	                    [-80.518598, 41.978802],
	                    [-80.518598, 41.978802],
	                    [-80.332382, 42.033571],
	                    [-79.76278, 42.269079],
	                    [-79.76278, 42.252649]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "44",
	        "properties": {
	            "name": "Rhode Island",
	            "density": 1006
	        },
	        "geometry": {
	            "type": "MultiPolygon",
	            "coordinates": [
	                [
	                    [
	                        [-71.196845, 41.67757],
	                        [-71.120168, 41.496831],
	                        [-71.317338, 41.474923],
	                        [-71.196845, 41.67757]
	                    ]
	                ],
	                [
	                    [
	                        [-71.530939, 42.01714],
	                        [-71.383061, 42.01714],
	                        [-71.328292, 41.781632],
	                        [-71.22423, 41.710431],
	                        [-71.344723, 41.726862],
	                        [-71.448785, 41.578985],
	                        [-71.481646, 41.370861],
	                        [-71.859555, 41.321569],
	                        [-71.799309, 41.414677],
	                        [-71.799309, 42.006186],
	                        [-71.530939, 42.01714]
	                    ]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "45",
	        "properties": {
	            "name": "South Carolina",
	            "density": 155.4
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-82.764143, 35.066903],
	                    [-82.550543, 35.160011],
	                    [-82.276696, 35.198349],
	                    [-81.044384, 35.149057],
	                    [-81.038907, 35.044995],
	                    [-80.934845, 35.105241],
	                    [-80.781491, 34.935456],
	                    [-80.797922, 34.820441],
	                    [-79.675149, 34.80401],
	                    [-78.541422, 33.851022],
	                    [-78.716684, 33.80173],
	                    [-78.935762, 33.637421],
	                    [-79.149363, 33.380005],
	                    [-79.187701, 33.171881],
	                    [-79.357487, 33.007573],
	                    [-79.582041, 33.007573],
	                    [-79.631334, 32.887081],
	                    [-79.866842, 32.755634],
	                    [-79.998289, 32.613234],
	                    [-80.206412, 32.552987],
	                    [-80.430967, 32.399633],
	                    [-80.452875, 32.328433],
	                    [-80.660998, 32.246279],
	                    [-80.885553, 32.032678],
	                    [-81.115584, 32.120309],
	                    [-81.121061, 32.290094],
	                    [-81.279893, 32.558464],
	                    [-81.416816, 32.629664],
	                    [-81.42777, 32.843265],
	                    [-81.493493, 33.007573],
	                    [-81.761863, 33.160928],
	                    [-81.937125, 33.347144],
	                    [-81.926172, 33.462159],
	                    [-82.194542, 33.631944],
	                    [-82.325988, 33.81816],
	                    [-82.55602, 33.94413],
	                    [-82.714851, 34.152254],
	                    [-82.747713, 34.26727],
	                    [-82.901067, 34.486347],
	                    [-83.005129, 34.469916],
	                    [-83.339222, 34.683517],
	                    [-83.322791, 34.787579],
	                    [-83.109191, 35.00118],
	                    [-82.764143, 35.066903]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "46",
	        "properties": {
	            "name": "South Dakota",
	            "density": 98.07
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-104.047534, 45.944106],
	                    [-96.560556, 45.933153],
	                    [-96.582464, 45.818137],
	                    [-96.856311, 45.604536],
	                    [-96.681049, 45.412843],
	                    [-96.451017, 45.297827],
	                    [-96.451017, 43.501391],
	                    [-96.582464, 43.479483],
	                    [-96.527695, 43.397329],
	                    [-96.560556, 43.222067],
	                    [-96.434587, 43.123482],
	                    [-96.511264, 43.052282],
	                    [-96.544125, 42.855112],
	                    [-96.631756, 42.707235],
	                    [-96.44554, 42.488157],
	                    [-96.626279, 42.515542],
	                    [-96.692003, 42.657942],
	                    [-97.217789, 42.844158],
	                    [-97.688806, 42.844158],
	                    [-97.831206, 42.866066],
	                    [-97.951699, 42.767481],
	                    [-98.466531, 42.94822],
	                    [-98.499393, 42.997512],
	                    [-101.626726, 42.997512],
	                    [-103.324578, 43.002989],
	                    [-104.053011, 43.002989],
	                    [-104.058488, 44.996596],
	                    [-104.042057, 44.996596],
	                    [-104.047534, 45.944106]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "47",
	        "properties": {
	            "name": "Tennessee",
	            "density": 88.08
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-88.054868, 36.496384],
	                    [-88.071299, 36.677123],
	                    [-87.852221, 36.633308],
	                    [-86.592525, 36.655216],
	                    [-85.486183, 36.616877],
	                    [-85.289013, 36.627831],
	                    [-84.544149, 36.594969],
	                    [-83.689746, 36.584015],
	                    [-83.673316, 36.600446],
	                    [-81.679709, 36.589492],
	                    [-81.723525, 36.353984],
	                    [-81.909741, 36.304691],
	                    [-82.03571, 36.118475],
	                    [-82.216449, 36.156814],
	                    [-82.610789, 35.965121],
	                    [-82.638174, 36.063706],
	                    [-82.775097, 35.997983],
	                    [-82.994175, 35.773428],
	                    [-83.251591, 35.718659],
	                    [-83.498053, 35.565304],
	                    [-83.7719, 35.559827],
	                    [-84.018363, 35.41195],
	                    [-84.09504, 35.247642],
	                    [-84.29221, 35.225734],
	                    [-84.319594, 34.990226],
	                    [-85.606675, 34.984749],
	                    [-87.359296, 35.00118],
	                    [-88.202745, 34.995703],
	                    [-88.471115, 34.995703],
	                    [-90.311367, 34.995703],
	                    [-90.212782, 35.023087],
	                    [-90.114197, 35.198349],
	                    [-90.130628, 35.439335],
	                    [-89.944412, 35.603643],
	                    [-89.911551, 35.756997],
	                    [-89.763673, 35.811767],
	                    [-89.730812, 35.997983],
	                    [-89.533642, 36.249922],
	                    [-89.539119, 36.496384],
	                    [-89.484349, 36.496384],
	                    [-89.418626, 36.496384],
	                    [-89.298133, 36.507338],
	                    [-88.054868, 36.496384]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "48",
	        "properties": {
	            "name": "Texas",
	            "density": 98.07
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-101.812942, 36.501861],
	                    [-100.000075, 36.501861],
	                    [-100.000075, 34.563024],
	                    [-99.923398, 34.573978],
	                    [-99.698843, 34.382285],
	                    [-99.57835, 34.415147],
	                    [-99.260688, 34.404193],
	                    [-99.189488, 34.2125],
	                    [-98.986841, 34.223454],
	                    [-98.767763, 34.135823],
	                    [-98.570593, 34.146777],
	                    [-98.488439, 34.064623],
	                    [-98.36247, 34.157731],
	                    [-98.170777, 34.113915],
	                    [-98.088623, 34.004376],
	                    [-97.946222, 33.987946],
	                    [-97.869545, 33.851022],
	                    [-97.694283, 33.982469],
	                    [-97.458774, 33.905791],
	                    [-97.371143, 33.823637],
	                    [-97.256128, 33.861976],
	                    [-97.173974, 33.736006],
	                    [-96.922034, 33.960561],
	                    [-96.850834, 33.845545],
	                    [-96.631756, 33.845545],
	                    [-96.423633, 33.774345],
	                    [-96.346956, 33.686714],
	                    [-96.149786, 33.840068],
	                    [-95.936185, 33.889361],
	                    [-95.8376, 33.834591],
	                    [-95.602092, 33.933176],
	                    [-95.547322, 33.878407],
	                    [-95.289906, 33.87293],
	                    [-95.224183, 33.960561],
	                    [-94.966767, 33.861976],
	                    [-94.868182, 33.74696],
	                    [-94.484796, 33.637421],
	                    [-94.380734, 33.544313],
	                    [-94.183564, 33.593606],
	                    [-94.041164, 33.54979],
	                    [-94.041164, 33.018527],
	                    [-94.041164, 31.994339],
	                    [-93.822086, 31.775262],
	                    [-93.816609, 31.556184],
	                    [-93.542762, 31.15089],
	                    [-93.526331, 30.93729],
	                    [-93.630393, 30.679874],
	                    [-93.728978, 30.575812],
	                    [-93.696116, 30.438888],
	                    [-93.767317, 30.334826],
	                    [-93.690639, 30.143133],
	                    [-93.926148, 29.787132],
	                    [-93.838517, 29.688547],
	                    [-94.002825, 29.68307],
	                    [-94.523134, 29.546147],
	                    [-94.70935, 29.622824],
	                    [-94.742212, 29.787132],
	                    [-94.873659, 29.672117],
	                    [-94.966767, 29.699501],
	                    [-95.016059, 29.557101],
	                    [-94.911997, 29.496854],
	                    [-94.895566, 29.310638],
	                    [-95.081782, 29.113469],
	                    [-95.383014, 28.867006],
	                    [-95.985477, 28.604113],
	                    [-96.045724, 28.647929],
	                    [-96.226463, 28.582205],
	                    [-96.23194, 28.642452],
	                    [-96.478402, 28.598636],
	                    [-96.593418, 28.724606],
	                    [-96.664618, 28.697221],
	                    [-96.401725, 28.439805],
	                    [-96.593418, 28.357651],
	                    [-96.774157, 28.406943],
	                    [-96.801542, 28.226204],
	                    [-97.026096, 28.039988],
	                    [-97.256128, 27.694941],
	                    [-97.404005, 27.333463],
	                    [-97.513544, 27.360848],
	                    [-97.540929, 27.229401],
	                    [-97.425913, 27.262263],
	                    [-97.480682, 26.99937],
	                    [-97.557359, 26.988416],
	                    [-97.562836, 26.840538],
	                    [-97.469728, 26.758384],
	                    [-97.442344, 26.457153],
	                    [-97.332805, 26.353091],
	                    [-97.30542, 26.161398],
	                    [-97.217789, 25.991613],
	                    [-97.524498, 25.887551],
	                    [-97.650467, 26.018997],
	                    [-97.885976, 26.06829],
	                    [-98.198161, 26.057336],
	                    [-98.466531, 26.221644],
	                    [-98.669178, 26.238075],
	                    [-98.822533, 26.369522],
	                    [-99.030656, 26.413337],
	                    [-99.173057, 26.539307],
	                    [-99.266165, 26.840538],
	                    [-99.446904, 27.021277],
	                    [-99.424996, 27.174632],
	                    [-99.50715, 27.33894],
	                    [-99.479765, 27.48134],
	                    [-99.605735, 27.640172],
	                    [-99.709797, 27.656603],
	                    [-99.879582, 27.799003],
	                    [-99.934351, 27.979742],
	                    [-100.082229, 28.14405],
	                    [-100.29583, 28.280974],
	                    [-100.399891, 28.582205],
	                    [-100.498476, 28.66436],
	                    [-100.629923, 28.905345],
	                    [-100.673738, 29.102515],
	                    [-100.799708, 29.244915],
	                    [-101.013309, 29.370885],
	                    [-101.062601, 29.458516],
	                    [-101.259771, 29.535193],
	                    [-101.413125, 29.754271],
	                    [-101.851281, 29.803563],
	                    [-102.114174, 29.792609],
	                    [-102.338728, 29.869286],
	                    [-102.388021, 29.765225],
	                    [-102.629006, 29.732363],
	                    [-102.809745, 29.524239],
	                    [-102.919284, 29.190146],
	                    [-102.97953, 29.184669],
	                    [-103.116454, 28.987499],
	                    [-103.280762, 28.982022],
	                    [-103.527224, 29.135376],
	                    [-104.146119, 29.381839],
	                    [-104.266611, 29.513285],
	                    [-104.507597, 29.639255],
	                    [-104.677382, 29.924056],
	                    [-104.688336, 30.181472],
	                    [-104.858121, 30.389596],
	                    [-104.896459, 30.570335],
	                    [-105.005998, 30.685351],
	                    [-105.394861, 30.855136],
	                    [-105.602985, 31.085167],
	                    [-105.77277, 31.167321],
	                    [-105.953509, 31.364491],
	                    [-106.205448, 31.468553],
	                    [-106.38071, 31.731446],
	                    [-106.528588, 31.786216],
	                    [-106.643603, 31.901231],
	                    [-106.616219, 31.999816],
	                    [-103.067161, 31.999816],
	                    [-103.067161, 33.002096],
	                    [-103.045254, 34.01533],
	                    [-103.039777, 36.501861],
	                    [-103.001438, 36.501861],
	                    [-101.812942, 36.501861]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "49",
	        "properties": {
	            "name": "Utah",
	            "density": 34.30
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-112.164359, 41.995232],
	                    [-111.047063, 42.000709],
	                    [-111.047063, 40.998429],
	                    [-109.04798, 40.998429],
	                    [-109.053457, 39.125316],
	                    [-109.058934, 38.27639],
	                    [-109.042503, 38.166851],
	                    [-109.042503, 37.000263],
	                    [-110.499369, 37.00574],
	                    [-114.048427, 37.000263],
	                    [-114.04295, 41.995232],
	                    [-112.164359, 41.995232]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "50",
	        "properties": {
	            "name": "Vermont",
	            "density": 67.73
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-71.503554, 45.013027],
	                    [-71.4926, 44.914442],
	                    [-71.629524, 44.750133],
	                    [-71.536416, 44.585825],
	                    [-71.700724, 44.41604],
	                    [-72.034817, 44.322932],
	                    [-72.02934, 44.07647],
	                    [-72.116971, 43.994316],
	                    [-72.204602, 43.769761],
	                    [-72.379864, 43.572591],
	                    [-72.456542, 43.150867],
	                    [-72.445588, 43.008466],
	                    [-72.533219, 42.953697],
	                    [-72.544173, 42.80582],
	                    [-72.456542, 42.729142],
	                    [-73.267129, 42.745573],
	                    [-73.278083, 42.833204],
	                    [-73.245221, 43.523299],
	                    [-73.404052, 43.687607],
	                    [-73.349283, 43.769761],
	                    [-73.436914, 44.043608],
	                    [-73.321898, 44.246255],
	                    [-73.294514, 44.437948],
	                    [-73.387622, 44.618687],
	                    [-73.332852, 44.804903],
	                    [-73.343806, 45.013027],
	                    [-72.308664, 45.002073],
	                    [-71.503554, 45.013027]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "51",
	        "properties": {
	            "name": "Virginia",
	            "density": 204.5
	        },
	        "geometry": {
	            "type": "MultiPolygon",
	            "coordinates": [
	                [
	                    [
	                        [-75.397659, 38.013497],
	                        [-75.244304, 38.029928],
	                        [-75.375751, 37.860142],
	                        [-75.512674, 37.799896],
	                        [-75.594828, 37.569865],
	                        [-75.802952, 37.197433],
	                        [-75.972737, 37.120755],
	                        [-76.027507, 37.257679],
	                        [-75.939876, 37.564388],
	                        [-75.671506, 37.95325],
	                        [-75.397659, 38.013497]
	                    ]
	                ],
	                [
	                    [
	                        [-76.016553, 37.95325],
	                        [-75.994645, 37.95325],
	                        [-76.043938, 37.95325],
	                        [-76.016553, 37.95325]
	                    ]
	                ],
	                [
	                    [
	                        [-78.349729, 39.464886],
	                        [-77.82942, 39.130793],
	                        [-77.719881, 39.322485],
	                        [-77.566527, 39.306055],
	                        [-77.456988, 39.223901],
	                        [-77.456988, 39.076023],
	                        [-77.248864, 39.026731],
	                        [-77.117418, 38.933623],
	                        [-77.040741, 38.791222],
	                        [-77.128372, 38.632391],
	                        [-77.248864, 38.588575],
	                        [-77.325542, 38.446175],
	                        [-77.281726, 38.342113],
	                        [-77.013356, 38.374975],
	                        [-76.964064, 38.216144],
	                        [-76.613539, 38.15042],
	                        [-76.514954, 38.024451],
	                        [-76.235631, 37.887527],
	                        [-76.3616, 37.608203],
	                        [-76.246584, 37.389126],
	                        [-76.383508, 37.285064],
	                        [-76.399939, 37.159094],
	                        [-76.273969, 37.082417],
	                        [-76.410893, 36.961924],
	                        [-76.619016, 37.120755],
	                        [-76.668309, 37.065986],
	                        [-76.48757, 36.95097],
	                        [-75.994645, 36.923586],
	                        [-75.868676, 36.551154],
	                        [-79.510841, 36.5402],
	                        [-80.294043, 36.545677],
	                        [-80.978661, 36.562108],
	                        [-81.679709, 36.589492],
	                        [-83.673316, 36.600446],
	                        [-83.136575, 36.742847],
	                        [-83.070852, 36.852385],
	                        [-82.879159, 36.890724],
	                        [-82.868205, 36.978355],
	                        [-82.720328, 37.044078],
	                        [-82.720328, 37.120755],
	                        [-82.353373, 37.268633],
	                        [-81.969987, 37.537003],
	                        [-81.986418, 37.454849],
	                        [-81.849494, 37.285064],
	                        [-81.679709, 37.20291],
	                        [-81.55374, 37.208387],
	                        [-81.362047, 37.339833],
	                        [-81.225123, 37.235771],
	                        [-80.967707, 37.290541],
	                        [-80.513121, 37.482234],
	                        [-80.474782, 37.421987],
	                        [-80.29952, 37.509618],
	                        [-80.294043, 37.690357],
	                        [-80.184505, 37.849189],
	                        [-79.998289, 37.997066],
	                        [-79.921611, 38.177805],
	                        [-79.724442, 38.364021],
	                        [-79.647764, 38.594052],
	                        [-79.477979, 38.457129],
	                        [-79.313671, 38.413313],
	                        [-79.209609, 38.495467],
	                        [-78.996008, 38.851469],
	                        [-78.870039, 38.763838],
	                        [-78.404499, 39.169131],
	                        [-78.349729, 39.464886]
	                    ]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "53",
	        "properties": {
	            "name": "Washington",
	            "density": 102.6
	        },
	        "geometry": {
	            "type": "MultiPolygon",
	            "coordinates": [
	                [
	                    [
	                        [-117.033359, 49.000239],
	                        [-117.044313, 47.762451],
	                        [-117.038836, 46.426077],
	                        [-117.055267, 46.343923],
	                        [-116.92382, 46.168661],
	                        [-116.918344, 45.993399],
	                        [-118.988627, 45.998876],
	                        [-119.125551, 45.933153],
	                        [-119.525367, 45.911245],
	                        [-119.963522, 45.823614],
	                        [-120.209985, 45.725029],
	                        [-120.505739, 45.697644],
	                        [-120.637186, 45.746937],
	                        [-121.18488, 45.604536],
	                        [-121.217742, 45.670259],
	                        [-121.535404, 45.725029],
	                        [-121.809251, 45.708598],
	                        [-122.247407, 45.549767],
	                        [-122.762239, 45.659305],
	                        [-122.811531, 45.960537],
	                        [-122.904639, 46.08103],
	                        [-123.11824, 46.185092],
	                        [-123.211348, 46.174138],
	                        [-123.370179, 46.146753],
	                        [-123.545441, 46.261769],
	                        [-123.72618, 46.300108],
	                        [-123.874058, 46.239861],
	                        [-124.065751, 46.327492],
	                        [-124.027412, 46.464416],
	                        [-123.895966, 46.535616],
	                        [-124.098612, 46.74374],
	                        [-124.235536, 47.285957],
	                        [-124.31769, 47.357157],
	                        [-124.427229, 47.740543],
	                        [-124.624399, 47.88842],
	                        [-124.706553, 48.184175],
	                        [-124.597014, 48.381345],
	                        [-124.394367, 48.288237],
	                        [-123.983597, 48.162267],
	                        [-123.704273, 48.167744],
	                        [-123.424949, 48.118452],
	                        [-123.162056, 48.167744],
	                        [-123.036086, 48.080113],
	                        [-122.800578, 48.08559],
	                        [-122.636269, 47.866512],
	                        [-122.515777, 47.882943],
	                        [-122.493869, 47.587189],
	                        [-122.422669, 47.318818],
	                        [-122.324084, 47.346203],
	                        [-122.422669, 47.576235],
	                        [-122.395284, 47.800789],
	                        [-122.230976, 48.030821],
	                        [-122.362422, 48.123929],
	                        [-122.373376, 48.288237],
	                        [-122.471961, 48.468976],
	                        [-122.422669, 48.600422],
	                        [-122.488392, 48.753777],
	                        [-122.647223, 48.775685],
	                        [-122.795101, 48.8907],
	                        [-122.756762, 49.000239],
	                        [-117.033359, 49.000239]
	                    ]
	                ],
	                [
	                    [
	                        [-122.718423, 48.310145],
	                        [-122.586977, 48.35396],
	                        [-122.608885, 48.151313],
	                        [-122.767716, 48.227991],
	                        [-122.718423, 48.310145]
	                    ]
	                ],
	                [
	                    [
	                        [-123.025132, 48.583992],
	                        [-122.915593, 48.715438],
	                        [-122.767716, 48.556607],
	                        [-122.811531, 48.419683],
	                        [-123.041563, 48.458022],
	                        [-123.025132, 48.583992]
	                    ]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "54",
	        "properties": {
	            "name": "West Virginia",
	            "density": 77.06
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-80.518598, 40.636951],
	                    [-80.518598, 39.722302],
	                    [-79.477979, 39.722302],
	                    [-79.488933, 39.20747],
	                    [-79.291763, 39.300578],
	                    [-79.094593, 39.470363],
	                    [-78.963147, 39.437501],
	                    [-78.765977, 39.585379],
	                    [-78.470222, 39.514178],
	                    [-78.431884, 39.623717],
	                    [-78.267575, 39.61824],
	                    [-78.174467, 39.694917],
	                    [-78.004682, 39.601809],
	                    [-77.834897, 39.601809],
	                    [-77.719881, 39.322485],
	                    [-77.82942, 39.130793],
	                    [-78.349729, 39.464886],
	                    [-78.404499, 39.169131],
	                    [-78.870039, 38.763838],
	                    [-78.996008, 38.851469],
	                    [-79.209609, 38.495467],
	                    [-79.313671, 38.413313],
	                    [-79.477979, 38.457129],
	                    [-79.647764, 38.594052],
	                    [-79.724442, 38.364021],
	                    [-79.921611, 38.177805],
	                    [-79.998289, 37.997066],
	                    [-80.184505, 37.849189],
	                    [-80.294043, 37.690357],
	                    [-80.29952, 37.509618],
	                    [-80.474782, 37.421987],
	                    [-80.513121, 37.482234],
	                    [-80.967707, 37.290541],
	                    [-81.225123, 37.235771],
	                    [-81.362047, 37.339833],
	                    [-81.55374, 37.208387],
	                    [-81.679709, 37.20291],
	                    [-81.849494, 37.285064],
	                    [-81.986418, 37.454849],
	                    [-81.969987, 37.537003],
	                    [-82.101434, 37.553434],
	                    [-82.293127, 37.668449],
	                    [-82.342419, 37.783465],
	                    [-82.50125, 37.931343],
	                    [-82.621743, 38.123036],
	                    [-82.594358, 38.424267],
	                    [-82.331465, 38.446175],
	                    [-82.293127, 38.577622],
	                    [-82.172634, 38.632391],
	                    [-82.221926, 38.785745],
	                    [-82.03571, 39.026731],
	                    [-81.887833, 38.873376],
	                    [-81.783771, 38.966484],
	                    [-81.811156, 39.0815],
	                    [-81.685186, 39.273193],
	                    [-81.57017, 39.267716],
	                    [-81.455155, 39.410117],
	                    [-81.345616, 39.344393],
	                    [-81.219646, 39.388209],
	                    [-80.830783, 39.711348],
	                    [-80.737675, 40.078303],
	                    [-80.600752, 40.319289],
	                    [-80.595275, 40.472643],
	                    [-80.666475, 40.582182],
	                    [-80.518598, 40.636951]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "55",
	        "properties": {
	            "name": "Wisconsin",
	            "density": 105.2
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-90.415429, 46.568478],
	                    [-90.229213, 46.508231],
	                    [-90.119674, 46.338446],
	                    [-89.09001, 46.135799],
	                    [-88.662808, 45.987922],
	                    [-88.531362, 46.020784],
	                    [-88.10416, 45.922199],
	                    [-87.989145, 45.796229],
	                    [-87.781021, 45.675736],
	                    [-87.791975, 45.500474],
	                    [-87.885083, 45.363551],
	                    [-87.649574, 45.341643],
	                    [-87.742682, 45.199243],
	                    [-87.589328, 45.095181],
	                    [-87.627666, 44.974688],
	                    [-87.819359, 44.95278],
	                    [-87.983668, 44.722749],
	                    [-88.043914, 44.563917],
	                    [-87.928898, 44.536533],
	                    [-87.775544, 44.640595],
	                    [-87.611236, 44.837764],
	                    [-87.403112, 44.914442],
	                    [-87.238804, 45.166381],
	                    [-87.03068, 45.22115],
	                    [-87.047111, 45.089704],
	                    [-87.189511, 44.969211],
	                    [-87.468835, 44.552964],
	                    [-87.545512, 44.322932],
	                    [-87.540035, 44.158624],
	                    [-87.644097, 44.103854],
	                    [-87.737205, 43.8793],
	                    [-87.704344, 43.687607],
	                    [-87.791975, 43.561637],
	                    [-87.912467, 43.249452],
	                    [-87.885083, 43.002989],
	                    [-87.76459, 42.783912],
	                    [-87.802929, 42.493634],
	                    [-88.788778, 42.493634],
	                    [-90.639984, 42.510065],
	                    [-90.711184, 42.636034],
	                    [-91.067185, 42.75105],
	                    [-91.143862, 42.909881],
	                    [-91.176724, 43.134436],
	                    [-91.056231, 43.254929],
	                    [-91.204109, 43.353514],
	                    [-91.215062, 43.501391],
	                    [-91.269832, 43.616407],
	                    [-91.242447, 43.775238],
	                    [-91.43414, 43.994316],
	                    [-91.592971, 44.032654],
	                    [-91.877772, 44.202439],
	                    [-91.927065, 44.333886],
	                    [-92.233773, 44.443425],
	                    [-92.337835, 44.552964],
	                    [-92.545959, 44.569394],
	                    [-92.808852, 44.750133],
	                    [-92.737652, 45.117088],
	                    [-92.75956, 45.286874],
	                    [-92.644544, 45.440228],
	                    [-92.770513, 45.566198],
	                    [-92.885529, 45.577151],
	                    [-92.869098, 45.719552],
	                    [-92.639067, 45.933153],
	                    [-92.354266, 46.015307],
	                    [-92.29402, 46.075553],
	                    [-92.29402, 46.667063],
	                    [-92.091373, 46.749217],
	                    [-92.014696, 46.705401],
	                    [-91.790141, 46.694447],
	                    [-91.09457, 46.864232],
	                    [-90.837154, 46.95734],
	                    [-90.749522, 46.88614],
	                    [-90.886446, 46.754694],
	                    [-90.55783, 46.584908],
	                    [-90.415429, 46.568478]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "56",
	        "properties": {
	            "name": "Wyoming",
	            "density": 5.851
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-109.080842, 45.002073],
	                    [-105.91517, 45.002073],
	                    [-104.058488, 44.996596],
	                    [-104.053011, 43.002989],
	                    [-104.053011, 41.003906],
	                    [-105.728954, 40.998429],
	                    [-107.919731, 41.003906],
	                    [-109.04798, 40.998429],
	                    [-111.047063, 40.998429],
	                    [-111.047063, 42.000709],
	                    [-111.047063, 44.476286],
	                    [-111.05254, 45.002073],
	                    [-109.080842, 45.002073]
	                ]
	            ]
	        }
	    }, {
	        "type": "Feature",
	        "id": "72",
	        "properties": {
	            "name": "Puerto Rico",
	            "density": 1082
	        },
	        "geometry": {
	            "type": "Polygon",
	            "coordinates": [
	                [
	                    [-66.448338, 17.984326],
	                    [-66.771478, 18.006234],
	                    [-66.924832, 17.929556],
	                    [-66.985078, 17.973372],
	                    [-67.209633, 17.956941],
	                    [-67.154863, 18.19245],
	                    [-67.269879, 18.362235],
	                    [-67.094617, 18.515589],
	                    [-66.957694, 18.488204],
	                    [-66.409999, 18.488204],
	                    [-65.840398, 18.433435],
	                    [-65.632274, 18.367712],
	                    [-65.626797, 18.203403],
	                    [-65.730859, 18.186973],
	                    [-65.834921, 18.017187],
	                    [-66.234737, 17.929556],
	                    [-66.448338, 17.984326]
	                ]
	            ]
	        }
	    }]
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {/*
	* This is the central action hub for the app. You
	* can any user interaction should trigger an event
	* here, that causes the stores to update.
	*
	* Usage:
	* to listen: actions.on(action, callback)
	* to call action: actions.trigger(action, callbackArgs)
	*/
	module.exports = function() {
	  if ( arguments.callee._singletonInstance )
	    return arguments.callee._singletonInstance;
	  arguments.callee._singletonInstance = this;

	  // Make instances observable
	  riot.observable(this);


	  this.TICK = "game-cycle-tick";
	  this.SELL_CCTV = "sell-cctv";
	  //this.ITEM-PLACED = "item-placed";

	  //TODO Use a proper dispatcher (e.g. fb-flux is only 10kB)

	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 9 */
/***/ function(module, exports) {

	var personas = [
	    {
	        "name" : "Jannet Kennsington",
	        "text" : {
	            "baseSurveillance" : "As a feminist and civil \
	                    rights activist Jannet likes to warn \
	                    people of the potential problems of \
	                    surveillance - especially for \
	                    marginalized groups.",
	            "totalSurveillance" : "As a feminist and civil \
	                    rights activist Jannet is a thorn in the side \
	                    of the ruling parties. Due to the intense \
	                    carpet-CCTV (which is especiallly intense in her \
	                    neighbourhood) she feels severly inhibited in \
	                    her ability to move freely. The NSA has her \
	                    on their list and uses the network to track her \
	                    movements, waiting for anything they can use as \
	                    evidence to construct a lawsuit under whatever \
	                    obscure or missused law."
	        },
	        image: "bell_hooks.png",
	        criticalCount: 3
	    },
	    {
	        name: "Marianne Witkins",
	        text: {
	            baseSurveillance: "Due to strong ghettoization in her \
	                district and skyrocketing crime-rates, Marianne \
	                would like the town hall to respond with some \
	                measures. Maybe CCTV would help.", // would like more surveillance to feel safe
	            totalSurveillance: "Despite carpet-CCCT the \
	                crime-rates have stayed high as ever. On top of that, \
	                she suspects that her ex-husband, a police-officer is \
	                using the CCTV-system to actively stalk her. However, \
	                she can't get at evidence to base a court-suite on. " // got stalked by officer crime as high as ever
	        },
	        image: "theresa_may.png",
	        criticalCount: 5

	    }
	]
	personas.randomPersona = function() {
	    return personas[Math.floor(Math.random() * personas.length)];
	}
	module.exports = personas;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);
	var actions = new (__webpack_require__(8))();
	var statesData = __webpack_require__(7);
	var personas = __webpack_require__(9);

	module.exports = UsStateStore
	function UsStateStore() {
	  if ( arguments.callee._singletonInstance )
	      return arguments.callee._singletonInstance;
	  arguments.callee._singletonInstance = this;

	  // Make instances observable
	  riot.observable(this);



	  var statesGeoJSON = statesData;
	  //secondary map for easier access
	  // actually we should build the geoJSON from
	  // this object on demand for the sake of
	  // clarity. but w/e. it's a prototype.
	  var states = {};

	  //enrich data with personas and cctv count
	  for(var i = 0; i < statesGeoJSON.features.length; i++){
	      var p = statesGeoJSON.features[i].properties;
	      p.persona = personas.randomPersona();
	      p.cctvCount = 0;
	      states[p.name] = p;
	  }

	  this.minCctvLevel = function() {
	      if(!statesGeoJSON.features[0]) return 0;
	      var min = statesGeoJSON.features[0].properties.cctvCount;
	      for(var i = 0; i < statesGeoJSON.features.length; i++){
	          var p = statesGeoJSON.features[i].properties;
	          if(p.cctvCount < min)
	            min = p.cctvCount;
	      }
	      return min;
	  }
	  this.maxCctvLevel = function() {
	      var max = 0
	      for(var i = 0; i < statesGeoJSON.features.length; i++){
	          var p = statesGeoJSON.features[i].properties;
	          if(p.cctvCount > max)
	            max = p.cctvCount;
	      }
	      return max;
	  }


	  this.get = function() {      return statesGeoJSON;  }  this.getState = function(stateName) {      console.log(states);      return states[stateName];  }  actions.on(actions.SELL_CCTV, function(state) {      states[state].cctvCount += 1;      // get state as arg      // increase the cctv count there      this.trigger("change");  }.bind(this));}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var riot = __webpack_require__(2);
	SocialCapitalStore = __webpack_require__(12)

	riot.tag('social-capital-meter', ' <div class="scm__bg"></div> <div class="scm__bar"></div> <div class="scm__label">Resentment: <span class="scm__label__value"> { capital }%</span> ({ deltaPerSecond } per second) </div>', 'social-capital-meter , [riot-tag="social-capital-meter"] { width: 100%; overflow: hidden; } social-capital-meter .scm__bg, [riot-tag="social-capital-meter"] .scm__bg{ width: 100%; height: 2em; min-height: 2em; border: 1px solid #000; background: #999999; position: fixed; left: 0; top: 0; } social-capital-meter .scm__bar, [riot-tag="social-capital-meter"] .scm__bar{ width: 37%; height: 2em; //border-right: 1px solid #000000; background: #222222; position: fixed; left: 0; top: 0; } social-capital-meter .scm__label, [riot-tag="social-capital-meter"] .scm__label{ color: #cccccc; font-size: 1em; position: fixed; left: 1em; top: 0.5em; } social-capital-meter .scm__label .scm__label__value, [riot-tag="social-capital-meter"] .scm__label .scm__label__value{ color: #eeeeee; font-weight: bold; }', function(opts) {

	    global.window.scm = this;

	    var scs = new SocialCapitalStore();
	    this.capital = Math.floor(scs.get() * 100);
	    scs.on("change", function(){
	        this.update()
	    }.bind(this));

	    this.on('update', function(){
	        //  console.log(this.scm__bar.style
	        this.capital = Math.floor(scs.get() * 100);
	        this.root.querySelector('.scm__bar').style.width = this.capital + "%";
	        this.deltaPerSecond = Math.floor(scs.resentmentPerSecond() * 100);
	    }.bind(this))


	});

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var riot = __webpack_require__(2);
	var actions = new (__webpack_require__(8))();
	//UsStateStore = require('./us-state-store')

	module.exports = SocialCapitalStore
	function SocialCapitalStore() {
	  if ( arguments.callee._singletonInstance )
	      return arguments.callee._singletonInstance;
	  arguments.callee._singletonInstance = this;

	  // Make instances observable
	  riot.observable(this);
	  var CHANGE_EVENT = 'change'

	  var resentment = 0.0;
	  actions.on(actions.TICK, function(deltaSeconds) {
	      var oldSC = resentment;

	      increaseResentment(deltaSeconds * this.resentmentPerSecond());

	      if(oldSC != resentment)
	          this.trigger("change");
	  }.bind(this))


	  //var stateStore = new UsStateStore();
	  //console.log(maxDensity); //10k
	  //console.log(minDensity); //1.2

	  actions.on(actions.SELL_CCTV, function(state) {
	    increaseResentment(0.1);
	  }.bind(this))

	  var resentment = 0.15;
	  this.get = function() {
	      return resentment;
	  }
	  function increaseResentment(delta) {
	      resentment += delta;
	      resentment = Math.min(Math.max(resentment, 0.0), 1.0);
	  }

	  function chiSquaredK4(x) {
	    if (x <= 0)
	        return 0;
	    else
	        return 1 /  4 * x * Math.exp(-x / 2);
	        //return 1 / 2 * Math.exp(- x / 2);
	  }

	  var BASE_LEVEL = 0.15;
	  this.resentmentPerSecond = function() {
	    // strong regen if it barely goes over the base_level, the regen lessens
	    // at higher levels, close to the protest line (1.0)

	    var delta = Math.abs(resentment - BASE_LEVEL);

	    var rate = chiSquaredK4(delta * 12) / 3;

	    if(delta < 0.002) {
	      return 0;
	    } else if (resentment < BASE_LEVEL) {
	      return rate;
	    } else { // resentment > BASE_LEVEL
	      return -rate;
	    }
	  }
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	
	var riot = __webpack_require__(2);
	var actions = new (__webpack_require__(8))();

	module.exports = ProfitStore
	function ProfitStore() {
	  if ( arguments.callee._singletonInstance )
	      return arguments.callee._singletonInstance;
	  arguments.callee._singletonInstance = this;

	  // Make instances observable
	  riot.observable(this);

	  var profit = 0;
	  this.get = function() {      return profit;  }  actions.on(actions.SELL_CCTV, function(state) {    profit += Math.floor(100000 * ( 1 + Math.random()));    this.trigger("change")  }.bind(this));}

/***/ }
/******/ ]);