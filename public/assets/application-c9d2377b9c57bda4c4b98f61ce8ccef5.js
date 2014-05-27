/*!
 * jQuery JavaScript Library v1.11.0
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-23T21:02Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var trim = "".trim;

var support = {};



var
	version = "1.11.0",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return a 'clean' array
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return just the object
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: trim && !trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.16
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-01-13
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select t=''><option selected=''></option></select>";

			// Support: IE8, Opera 10-12
			// Nothing should be selected when empty strings follow ^= or $= or *=
			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

jQuery(function() {
	// We need to execute this one support test ASAP because we need to know
	// if body.style.zoom needs to be set.

	var container, div,
		body = document.getElementsByTagName("body")[0];

	if ( !body ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

	div = document.createElement( "div" );
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1";

		if ( (support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 )) ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );

	// Null elements to avoid leaks in IE
	container = div = null;
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = document.createElement("div"),
		input = document.createElement("input");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	fragment = div = input = null;
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined && (
				// Support: IE < 9
				src.returnValue === false ||
				// Support: Android < 4.0
				src.getPreventDefault && src.getPreventDefault() ) ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			window.getDefaultComputedStyle( elem[ 0 ] ).display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var a, shrinkWrapBlocksVal,
		div = document.createElement( "div" ),
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	support.shrinkWrapBlocks = function() {
		var body, container, div, containerStyles;

		if ( shrinkWrapBlocksVal == null ) {
			body = document.getElementsByTagName( "body" )[ 0 ];
			if ( !body ) {
				// Test fired too early or in an unsupported environment, exit.
				return;
			}

			containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px";
			container = document.createElement( "div" );
			div = document.createElement( "div" );

			body.appendChild( container ).appendChild( div );

			// Will be changed later if needed.
			shrinkWrapBlocksVal = false;

			if ( typeof div.style.zoom !== strundefined ) {
				// Support: IE6
				// Check if elements with layout shrink-wrap their children
				div.style.cssText = divReset + ";width:1px;padding:1px;zoom:1";
				div.innerHTML = "<div></div>";
				div.firstChild.style.width = "5px";
				shrinkWrapBlocksVal = div.offsetWidth !== 3;
			}

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			body = container = div = null;
		}

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var a, reliableHiddenOffsetsVal, boxSizingVal, boxSizingReliableVal,
		pixelPositionVal, reliableMarginRightVal,
		div = document.createElement( "div" ),
		containerStyles = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px",
		divReset =
			"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;" +
			"display:block;padding:0;margin:0;border:0";

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	a.style.cssText = "float:left;opacity:.5";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Null elements to avoid leaks in IE.
	a = div = null;

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal != null ) {
				return reliableHiddenOffsetsVal;
			}

			var container, tds, isSupported,
				div = document.createElement( "div" ),
				body = document.getElementsByTagName( "body" )[ 0 ];

			if ( !body ) {
				// Return for frameset docs that don't have a body
				return;
			}

			// Setup
			div.setAttribute( "className", "t" );
			div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

			container = document.createElement( "div" );
			container.style.cssText = containerStyles;

			body.appendChild( container ).appendChild( div );

			// Support: IE8
			// Check if table cells still have offsetWidth/Height when they are set
			// to display:none and there are still other visible table cells in a
			// table row; if so, offsetWidth/Height are not reliable for use when
			// determining if an element has been hidden directly using
			// display:none (it is still safe to use offsets if a parent element is
			// hidden; don safety goggles and see bug #4512 for more information).
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			tds = div.getElementsByTagName( "td" );
			tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
			isSupported = ( tds[ 0 ].offsetHeight === 0 );

			tds[ 0 ].style.display = "";
			tds[ 1 ].style.display = "none";

			// Support: IE8
			// Check if empty table cells still have offsetWidth/Height
			reliableHiddenOffsetsVal = isSupported && ( tds[ 0 ].offsetHeight === 0 );

			body.removeChild( container );

			// Null elements to avoid leaks in IE.
			div = body = null;

			return reliableHiddenOffsetsVal;
		},

		boxSizing: function() {
			if ( boxSizingVal == null ) {
				computeStyleTests();
			}
			return boxSizingVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {
			var body, container, div, marginDiv;

			// Use window.getComputedStyle because jsdom on node.js will break without it.
			if ( reliableMarginRightVal == null && window.getComputedStyle ) {
				body = document.getElementsByTagName( "body" )[ 0 ];
				if ( !body ) {
					// Test fired too early or in an unsupported environment, exit.
					return;
				}

				container = document.createElement( "div" );
				div = document.createElement( "div" );
				container.style.cssText = containerStyles;

				body.appendChild( container ).appendChild( div );

				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// Fails in WebKit before Feb 2011 nightlies
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				marginDiv = div.appendChild( document.createElement( "div" ) );
				marginDiv.style.cssText = div.style.cssText = divReset;
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";

				reliableMarginRightVal =
					!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );

				body.removeChild( container );
			}

			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		var container, div,
			body = document.getElementsByTagName( "body" )[ 0 ];

		if ( !body ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		container = document.createElement( "div" );
		div = document.createElement( "div" );
		container.style.cssText = containerStyles;

		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:absolute;display:block;padding:1px;border:1px;width:4px;" +
				"margin-top:1%;top:1%";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			boxSizingVal = div.offsetWidth === 4;
		});

		// Will be changed later if needed.
		boxSizingReliableVal = true;
		pixelPositionVal = false;
		reliableMarginRightVal = true;

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE.
		div = body = null;
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					// Support: Chrome, Safari
					// Setting style to blank string required to delete "style: x !important;"
					style[ name ] = "";
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing() && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, dDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );
		dDisplay = defaultDisplay( elem.nodeName );
		if ( display === "none" ) {
			display = dDisplay;
		}
		if ( display === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || dDisplay === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var a, input, select, opt,
		div = document.createElement("div" );

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// Null elements to avoid leaks in IE.
	a = input = select = opt = div = null;
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					jQuery.text( elem );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.
if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.7.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with], button[data-disable-with], textarea[data-disable-with]',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            return rails.fire(element, 'ajax:beforeSend', [xhr, settings]);
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        var jqxhr = rails.ajax(options);
        element.trigger('ajax:send', jqxhr);
        return jqxhr;
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      form.find(rails.disableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        element.data('ujs:enable-with', element[method]());
        element[method](element.data('disable-with'));
        element.prop('disabled', true);
      });
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      form.find(rails.enableSelector).each(function() {
        var element = $(this), method = element.is('button') ? 'html' : 'val';
        if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
        element.prop('disabled', false);
      });
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      element.data('ujs:enable-with', element.html()); // store enabled state
      element.html(element.data('disable-with')); // set to disabled state
      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }

  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);
      if (!rails.allowAction(button)) return rails.stopEverything(e);

      rails.handleRemote(button);
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector),
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (blankRequiredInputs && form.attr("novalidate") == undefined && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
        return rails.stopEverything(e);
      }

      if (remote) {
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:beforeSend.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.6.0';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return obj;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
    return obj;
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, predicate, context) {
    var result;
    any(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
    each(obj, function(value, index, list) {
      if (predicate.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, function(value, index, list) {
      return !predicate.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
    each(obj, function(value, index, list) {
      if (!(result = result && predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, predicate, context) {
    predicate || (predicate = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
    each(obj, function(value, index, list) {
      if (result || (result = predicate.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, _.property(key));
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs) {
    return _.filter(obj, _.matches(attrs));
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.find(obj, _.matches(attrs));
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    var result = -Infinity, lastComputed = -Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed > lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    var result = Infinity, lastComputed = Infinity;
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      if (computed < lastComputed) {
        result = value;
        lastComputed = computed;
      }
    });
    return result;
  };

  // Shuffle an array, using the modern version of the
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from a collection.
  // If **n** is not specified, returns a single random element.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (n == null || guard) {
      if (obj.length !== +obj.length) obj = _.values(obj);
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    if (value == null) return _.identity;
    if (_.isFunction(value)) return value;
    return _.property(value);
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    iterator = lookupIterator(iterator);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, iterator, context) {
      var result = {};
      iterator = lookupIterator(iterator);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    _.has(result, key) ? result[key].push(value) : result[key] = [value];
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[0];
    if (n < 0) return [];
    return slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) return array[array.length - 1];
    return slice.call(array, Math.max(array.length - n, 0));
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Split an array into two arrays: one whose elements all satisfy the given
  // predicate, and one whose elements all do not satisfy the predicate.
  _.partition = function(array, predicate) {
    var pass = [], fail = [];
    each(array, function(elem) {
      (predicate(elem) ? pass : fail).push(elem);
    });
    return [pass, fail];
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.contains(other, item);
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, 'length').concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context. _ acts
  // as a placeholder, allowing any combination of arguments to be pre-filled.
  _.partial = function(func) {
    var boundArgs = slice.call(arguments, 1);
    return function() {
      var position = 0;
      var args = boundArgs.slice();
      for (var i = 0, length = args.length; i < length; i++) {
        if (args[i] === _) args[i] = arguments[position++];
      }
      while (position < arguments.length) args.push(arguments[position++]);
      return func.apply(this, args);
    };
  };

  // Bind a number of an object's methods to that object. Remaining arguments
  // are the method names to be bound. Useful for ensuring that all callbacks
  // defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error('bindAll must be passed function names');
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : _.now();
      timeout = null;
      result = func.apply(context, args);
      context = args = null;
    };
    return function() {
      var now = _.now();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
        context = args = null;
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function() {
      var last = _.now() - timestamp;
      if (last < wait) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;
        if (!immediate) {
          result = func.apply(context, args);
          context = args = null;
        }
      }
    };

    return function() {
      context = this;
      args = arguments;
      timestamp = _.now();
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) {
        result = func.apply(context, args);
        context = args = null;
      }

      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return _.partial(wrapper, func);
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = function(obj) {
    if (!_.isObject(obj)) return [];
    if (nativeKeys) return nativeKeys(obj);
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  _.constant = function(value) {
    return function () {
      return value;
    };
  };

  _.property = function(key) {
    return function(obj) {
      return obj[key];
    };
  };

  // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
  _.matches = function(attrs) {
    return function(obj) {
      if (obj === attrs) return true; //avoid comparing an object to itself.
      for (var key in attrs) {
        if (attrs[key] !== obj[key])
          return false;
      }
      return true;
    }
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // A (possibly faster) way to get the current timestamp as an integer.
  _.now = Date.now || function() { return new Date().getTime(); };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

  // AMD registration happens at the end for compatibility with AMD loaders
  // that may not enforce next-turn semantics on modules. Even though general
  // practice for AMD registration is to be anonymous, underscore registers
  // as a named module because, like jQuery, it is a base library that is
  // popular enough to be bundled in a third party lib, but not be part of
  // an AMD load request. Those cases could generate an error when an
  // anonymous define() is called outside of a loader request.
  if (typeof define === 'function' && define.amd) {
    define('underscore', [], function() {
      return _;
    });
  }
}).call(this);
(function() {
  var CSRFToken, Click, ComponentUrl, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    reflectNewUrl(url);
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent('page:fetch', {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent('page:receive');
      if (doc = processResponse()) {
        changePage.apply(null, extractTitleAndBody(doc));
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent('page:load');
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent('page:restore');
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent('page:expire', pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent('page:change');
    return triggerEvent('page:update');
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function() {
    return !triggerEvent('page:before-change');
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      return xhr.getResponseHeader('Content-Type').match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.head.childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.body), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var createDocumentUsingDOM, createDocumentUsingParser, createDocumentUsingWrite, e, testDoc, _ref;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    try {
      if (window.DOMParser) {
        testDoc = createDocumentUsingParser('<html><body><p>test');
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      testDoc = createDocumentUsingDOM('<html><body><p>test');
      return createDocumentUsingDOM;
    } finally {
      if ((testDoc != null ? (_ref = testDoc.body) != null ? _ref.childNodes.length : void 0 : void 0) !== 1) {
        return createDocumentUsingWrite;
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      var current;
      return ((this.hash && this.withoutHash()) === (current = new ComponentUrl).withoutHash()) || (this.href === current.href + '#');
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.link;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented()) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent('page:change');
      return triggerEvent('page:update');
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent('page:update');
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks
  };

}).call(this);
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */


if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return this.sliding = false

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })
    this.$element.trigger(e)
    if (e.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid.bs.carousel', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid.bs.carousel') }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid.bs.carousel')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role=menu]' + desc + ', [role=listbox]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).focus()
  }

  function clearMenus(e) {
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu], [role=listbox]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal', '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return
      var that = this;

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var $parent = this.$element.parent()

        var orgPlacement = placement
        var docScroll    = document.documentElement.scrollTop || document.body.scrollTop
        var parentWidth  = this.options.container == 'body' ? window.innerWidth  : $parent.outerWidth()
        var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
        var parentLeft   = this.options.container == 'body' ? 0 : $parent.offset().left

        placement = placement == 'bottom' && pos.top   + pos.height  + actualHeight - docScroll > parentHeight  ? 'top'    :
                    placement == 'top'    && pos.top   - docScroll   - actualHeight < 0                         ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth > parentWidth                              ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth < parentLeft                               ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)
      this.hoverState = null

      var complete = function() {
        that.$element.trigger('shown.bs.' + that.type)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one($.support.transition.end, complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      replace = true
      offset.top = offset.top + height - actualHeight
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0

      if (offset.left < 0) {
        delta       = offset.left * -2
        offset.left = 0

        $tip.offset(offset)

        actualWidth  = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, 'top')
    }

    if (replace) $tip.offset(offset)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0]
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
      width: el.offsetWidth,
      height: el.offsetHeight
    }, this.$element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.tip = function () {
    return this.$tip = this.$tip || $(this.options.template)
  }

  Tooltip.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content')[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find('.arrow')
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href
    var process  = $.proxy(this.process, this)

    this.$element       = $(element).is('body') ? $(window) : $(element)
    this.$body          = $('body')
    this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.offsets        = $([])
    this.targets        = $([])
    this.activeTarget   = null

    this.refresh()
    this.process()
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? 'offset' : 'position'

    this.offsets = $([])
    this.targets = $([])

    var self     = this
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[ $href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
    var maxScroll    = scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate( targets[i] )
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.parent('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$window.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (this.affixed == 'top') position.top += scrollTop

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({ top: scrollHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);
/*
CSS Browser Selector v0.4.0 (Nov 02, 2010)
Rafael Lima (http://rafael.adm.br)
http://rafael.adm.br/css_browser_selector
License: http://creativecommons.org/licenses/by/2.5/
Contributors: http://rafael.adm.br/css_browser_selector#contributors
*/

function css_browser_selector(u){var ua=u.toLowerCase(),is=function(t){return ua.indexOf(t)>-1},g='gecko',w='webkit',s='safari',o='opera',m='mobile',h=document.documentElement,b=[(!(/opera|webtv/i.test(ua))&&/msie\s(\d)/.test(ua))?('ie ie'+RegExp.$1):is('firefox/2')?g+' ff2':is('firefox/3.5')?g+' ff3 ff3_5':is('firefox/3.6')?g+' ff3 ff3_6':is('firefox/3')?g+' ff3':is('gecko/')?g:is('opera')?o+(/version\/(\d+)/.test(ua)?' '+o+RegExp.$1:(/opera(\s|\/)(\d+)/.test(ua)?' '+o+RegExp.$2:'')):is('konqueror')?'konqueror':is('blackberry')?m+' blackberry':is('android')?m+' android':is('chrome')?w+' chrome':is('iron')?w+' iron':is('applewebkit/')?w+' '+s+(/version\/(\d+)/.test(ua)?' '+s+RegExp.$1:''):is('mozilla/')?g:'',is('j2me')?m+' j2me':is('iphone')?m+' iphone':is('ipod')?m+' ipod':is('ipad')?m+' ipad':is('mac')?'mac':is('darwin')?'mac':is('webtv')?'webtv':is('win')?'win'+(is('windows nt 6.0')?' vista':''):is('freebsd')?'freebsd':(is('x11')||is('linux'))?'linux':'','js']; c = b.join(' '); h.className += ' '+c; return c;}; css_browser_selector(navigator.userAgent);
//fgnass.github.com/spin.js#v1.3

/*!
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */

(function(root, factory) {

  /* CommonJS */
  if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  else root.Spinner = factory()
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    if(s[prop] !== undefined) return prop
    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    if (typeof this == 'undefined') return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))

        ins(el, ins(seg, fill(o.color, '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: o.color, opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));
/*!
 * Ladda 0.9.3 (2014-04-16, 09:38)
 * http://lab.hakim.se/ladda
 * MIT licensed
 *
 * Copyright (C) 2014 Hakim El Hattab, http://hakim.se
 */

(function(t,e){"object"==typeof exports?module.exports=e(require("spin.js")):"function"==typeof define&&define.amd?define(["spin"],e):t.Ladda=e(t.Spinner)})(this,function(t){"use strict";function e(t){if(t===void 0)return console.warn("Ladda button target must be defined."),void 0;t.querySelector(".ladda-label")||(t.innerHTML='<span class="ladda-label">'+t.innerHTML+"</span>");var e,n=document.createElement("span");n.className="ladda-spinner",t.appendChild(n);var r,a={start:function(){return e||(e=o(t)),t.setAttribute("disabled",""),t.setAttribute("data-loading",""),clearTimeout(r),e.spin(n),this.setProgress(0),this},startAfter:function(t){return clearTimeout(r),r=setTimeout(function(){a.start()},t),this},stop:function(){return t.removeAttribute("disabled"),t.removeAttribute("data-loading"),clearTimeout(r),e&&(r=setTimeout(function(){e.stop()},1e3)),this},toggle:function(){return this.isLoading()?this.stop():this.start(),this},setProgress:function(e){e=Math.max(Math.min(e,1),0);var n=t.querySelector(".ladda-progress");0===e&&n&&n.parentNode?n.parentNode.removeChild(n):(n||(n=document.createElement("div"),n.className="ladda-progress",t.appendChild(n)),n.style.width=(e||0)*t.offsetWidth+"px")},enable:function(){return this.stop(),this},disable:function(){return this.stop(),t.setAttribute("disabled",""),this},isLoading:function(){return t.hasAttribute("data-loading")}};return u.push(a),a}function n(t,e){for(;t.parentNode&&t.tagName!==e;)t=t.parentNode;return e===t.tagName?t:void 0}function r(t){for(var e=["input","textarea"],n=[],r=0;e.length>r;r++)for(var a=t.getElementsByTagName(e[r]),i=0;a.length>i;i++)a[i].hasAttribute("required")&&n.push(a[i]);return n}function a(t,a){a=a||{};var i=[];"string"==typeof t?i=s(document.querySelectorAll(t)):"object"==typeof t&&"string"==typeof t.nodeName&&(i=[t]);for(var o=0,u=i.length;u>o;o++)(function(){var t=i[o];if("function"==typeof t.addEventListener){var s=e(t),u=-1;t.addEventListener("click",function(){var e=!0,i=n(t,"FORM");if(i!==void 0)for(var o=r(i),d=0;o.length>d;d++)""===o[d].value.replace(/^\s+|\s+$/g,"")&&(e=!1);e&&(s.startAfter(1),"number"==typeof a.timeout&&(clearTimeout(u),u=setTimeout(s.stop,a.timeout)),"function"==typeof a.callback&&a.callback.apply(null,[s]))},!1)}})()}function i(){for(var t=0,e=u.length;e>t;t++)u[t].stop()}function o(e){var n,r=e.offsetHeight;0===r&&(r=parseFloat(window.getComputedStyle(e).height)),r>32&&(r*=.8),e.hasAttribute("data-spinner-size")&&(r=parseInt(e.getAttribute("data-spinner-size"),10)),e.hasAttribute("data-spinner-color")&&(n=e.getAttribute("data-spinner-color"));var a=12,i=.2*r,o=.6*i,s=7>i?2:3;return new t({color:n||"#fff",lines:a,radius:i,length:o,width:s,zIndex:"auto",top:"auto",left:"auto",className:""})}function s(t){for(var e=[],n=0;t.length>n;n++)e.push(t[n]);return e}var u=[];return{bind:a,create:e,stopAll:i}});
$(document ).ready(function() {
  if ($(".ladda-button").length > 0){
    var laddaLoadingButton = Ladda.create( document.querySelector( '.ladda-button' ) );

        var successAnimation = function(){
          var _this = $(".logo-flame")
          _this.addClass("success-animation");
          setTimeout(function() {
            _this.removeClass("success-animation")
          }, 2000);
        }

        var failAnimation = function(){
          var _this = $(".logo-flame")
          _this.addClass("fail-animation");
          setTimeout(function() {
            _this.removeClass("fail-animation")
          }, 2000);
        }

        $("#oli-form").submit(function() {
          laddaLoadingButton.start();
          $.ajax({
          url: '/landing',
          type: 'post',
          async: true,
          data: $("#oli-form").serialize(),
          dataType: 'script',
          beforeSend: function (xhr) {
            xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
          }
          }).fail(function() {
            failAnimation();
            laddaLoadingButton.stop();

          }).success(function(){
            successAnimation();
            laddaLoadingButton.stop();

          });
        return false;
        })
     } 
  });
/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
/* exported Handlebars */

var Handlebars = (function() {
// handlebars/safe-string.js
var __module4__ = (function() {
  "use strict";
  var __exports__;
  // Build out our basic SafeString type
  function SafeString(string) {
    this.string = string;
  }

  SafeString.prototype.toString = function() {
    return "" + this.string;
  };

  __exports__ = SafeString;
  return __exports__;
})();

// handlebars/utils.js
var __module3__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  /*jshint -W004 */
  var SafeString = __dependency1__;

  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  function escapeChar(chr) {
    return escape[chr] || "&amp;";
  }

  function extend(obj, value) {
    for(var key in value) {
      if(Object.prototype.hasOwnProperty.call(value, key)) {
        obj[key] = value[key];
      }
    }
  }

  __exports__.extend = extend;var toString = Object.prototype.toString;
  __exports__.toString = toString;
  // Sourced from lodash
  // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
  var isFunction = function(value) {
    return typeof value === 'function';
  };
  // fallback for older versions of Chrome and Safari
  if (isFunction(/x/)) {
    isFunction = function(value) {
      return typeof value === 'function' && toString.call(value) === '[object Function]';
    };
  }
  var isFunction;
  __exports__.isFunction = isFunction;
  var isArray = Array.isArray || function(value) {
    return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
  };
  __exports__.isArray = isArray;

  function escapeExpression(string) {
    // don't escape SafeStrings, since they're already safe
    if (string instanceof SafeString) {
      return string.toString();
    } else if (!string && string !== 0) {
      return "";
    }

    // Force a string conversion as this will be done by the append regardless and
    // the regex test will do this transparently behind the scenes, causing issues if
    // an object's to string has escaped characters in it.
    string = "" + string;

    if(!possible.test(string)) { return string; }
    return string.replace(badChars, escapeChar);
  }

  __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
    if (!value && value !== 0) {
      return true;
    } else if (isArray(value) && value.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  __exports__.isEmpty = isEmpty;
  return __exports__;
})(__module4__);

// handlebars/exception.js
var __module5__ = (function() {
  "use strict";
  var __exports__;

  var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

  function Exception(message, node) {
    var line;
    if (node && node.firstLine) {
      line = node.firstLine;

      message += ' - ' + line + ':' + node.firstColumn;
    }

    var tmp = Error.prototype.constructor.call(this, message);

    // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
    for (var idx = 0; idx < errorProps.length; idx++) {
      this[errorProps[idx]] = tmp[errorProps[idx]];
    }

    if (line) {
      this.lineNumber = line;
      this.column = node.firstColumn;
    }
  }

  Exception.prototype = new Error();

  __exports__ = Exception;
  return __exports__;
})();

// handlebars/base.js
var __module2__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;

  var VERSION = "1.3.0";
  __exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
  __exports__.COMPILER_REVISION = COMPILER_REVISION;
  var REVISION_CHANGES = {
    1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
    2: '== 1.0.0-rc.3',
    3: '== 1.0.0-rc.4',
    4: '>= 1.0.0'
  };
  __exports__.REVISION_CHANGES = REVISION_CHANGES;
  var isArray = Utils.isArray,
      isFunction = Utils.isFunction,
      toString = Utils.toString,
      objectType = '[object Object]';

  function HandlebarsEnvironment(helpers, partials) {
    this.helpers = helpers || {};
    this.partials = partials || {};

    registerDefaultHelpers(this);
  }

  __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
    constructor: HandlebarsEnvironment,

    logger: logger,
    log: log,

    registerHelper: function(name, fn, inverse) {
      if (toString.call(name) === objectType) {
        if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
        Utils.extend(this.helpers, name);
      } else {
        if (inverse) { fn.not = inverse; }
        this.helpers[name] = fn;
      }
    },

    registerPartial: function(name, str) {
      if (toString.call(name) === objectType) {
        Utils.extend(this.partials,  name);
      } else {
        this.partials[name] = str;
      }
    }
  };

  function registerDefaultHelpers(instance) {
    instance.registerHelper('helperMissing', function(arg) {
      if(arguments.length === 2) {
        return undefined;
      } else {
        throw new Exception("Missing helper: '" + arg + "'");
      }
    });

    instance.registerHelper('blockHelperMissing', function(context, options) {
      var inverse = options.inverse || function() {}, fn = options.fn;

      if (isFunction(context)) { context = context.call(this); }

      if(context === true) {
        return fn(this);
      } else if(context === false || context == null) {
        return inverse(this);
      } else if (isArray(context)) {
        if(context.length > 0) {
          return instance.helpers.each(context, options);
        } else {
          return inverse(this);
        }
      } else {
        return fn(context);
      }
    });

    instance.registerHelper('each', function(context, options) {
      var fn = options.fn, inverse = options.inverse;
      var i = 0, ret = "", data;

      if (isFunction(context)) { context = context.call(this); }

      if (options.data) {
        data = createFrame(options.data);
      }

      if(context && typeof context === 'object') {
        if (isArray(context)) {
          for(var j = context.length; i<j; i++) {
            if (data) {
              data.index = i;
              data.first = (i === 0);
              data.last  = (i === (context.length-1));
            }
            ret = ret + fn(context[i], { data: data });
          }
        } else {
          for(var key in context) {
            if(context.hasOwnProperty(key)) {
              if(data) { 
                data.key = key; 
                data.index = i;
                data.first = (i === 0);
              }
              ret = ret + fn(context[key], {data: data});
              i++;
            }
          }
        }
      }

      if(i === 0){
        ret = inverse(this);
      }

      return ret;
    });

    instance.registerHelper('if', function(conditional, options) {
      if (isFunction(conditional)) { conditional = conditional.call(this); }

      // Default behavior is to render the positive path if the value is truthy and not empty.
      // The `includeZero` option may be set to treat the condtional as purely not empty based on the
      // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
      if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    });

    instance.registerHelper('unless', function(conditional, options) {
      return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
    });

    instance.registerHelper('with', function(context, options) {
      if (isFunction(context)) { context = context.call(this); }

      if (!Utils.isEmpty(context)) return options.fn(context);
    });

    instance.registerHelper('log', function(context, options) {
      var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
      instance.log(level, context);
    });
  }

  var logger = {
    methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

    // State enum
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    level: 3,

    // can be overridden in the host environment
    log: function(level, obj) {
      if (logger.level <= level) {
        var method = logger.methodMap[level];
        if (typeof console !== 'undefined' && console[method]) {
          console[method].call(console, obj);
        }
      }
    }
  };
  __exports__.logger = logger;
  function log(level, obj) { logger.log(level, obj); }

  __exports__.log = log;var createFrame = function(object) {
    var obj = {};
    Utils.extend(obj, object);
    return obj;
  };
  __exports__.createFrame = createFrame;
  return __exports__;
})(__module3__, __module5__);

// handlebars/runtime.js
var __module6__ = (function(__dependency1__, __dependency2__, __dependency3__) {
  "use strict";
  var __exports__ = {};
  var Utils = __dependency1__;
  var Exception = __dependency2__;
  var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

  function checkRevision(compilerInfo) {
    var compilerRevision = compilerInfo && compilerInfo[0] || 1,
        currentRevision = COMPILER_REVISION;

    if (compilerRevision !== currentRevision) {
      if (compilerRevision < currentRevision) {
        var runtimeVersions = REVISION_CHANGES[currentRevision],
            compilerVersions = REVISION_CHANGES[compilerRevision];
        throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
              "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
      } else {
        // Use the embedded version info since the runtime doesn't know about this revision yet
        throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
              "Please update your runtime to a newer version ("+compilerInfo[1]+").");
      }
    }
  }

  __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

  function template(templateSpec, env) {
    if (!env) {
      throw new Exception("No environment passed to template");
    }

    // Note: Using env.VM references rather than local var references throughout this section to allow
    // for external users to override these as psuedo-supported APIs.
    var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
      var result = env.VM.invokePartial.apply(this, arguments);
      if (result != null) { return result; }

      if (env.compile) {
        var options = { helpers: helpers, partials: partials, data: data };
        partials[name] = env.compile(partial, { data: data !== undefined }, env);
        return partials[name](context, options);
      } else {
        throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
      }
    };

    // Just add water
    var container = {
      escapeExpression: Utils.escapeExpression,
      invokePartial: invokePartialWrapper,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          programWrapper = program(i, fn, data);
        } else if (!programWrapper) {
          programWrapper = this.programs[i] = program(i, fn);
        }
        return programWrapper;
      },
      merge: function(param, common) {
        var ret = param || common;

        if (param && common && (param !== common)) {
          ret = {};
          Utils.extend(ret, common);
          Utils.extend(ret, param);
        }
        return ret;
      },
      programWithDepth: env.VM.programWithDepth,
      noop: env.VM.noop,
      compilerInfo: null
    };

    return function(context, options) {
      options = options || {};
      var namespace = options.partial ? options : env,
          helpers,
          partials;

      if (!options.partial) {
        helpers = options.helpers;
        partials = options.partials;
      }
      var result = templateSpec.call(
            container,
            namespace, context,
            helpers,
            partials,
            options.data);

      if (!options.partial) {
        env.VM.checkRevision(container.compilerInfo);
      }

      return result;
    };
  }

  __exports__.template = template;function programWithDepth(i, fn, data /*, $depth */) {
    var args = Array.prototype.slice.call(arguments, 3);

    var prog = function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
    prog.program = i;
    prog.depth = args.length;
    return prog;
  }

  __exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
    var prog = function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
    prog.program = i;
    prog.depth = 0;
    return prog;
  }

  __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
    var options = { partial: true, helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    }
  }

  __exports__.invokePartial = invokePartial;function noop() { return ""; }

  __exports__.noop = noop;
  return __exports__;
})(__module3__, __module5__, __module2__);

// handlebars.runtime.js
var __module1__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var base = __dependency1__;

  // Each of these augment the Handlebars object. No need to setup here.
  // (This is done to easily share code between commonjs and browse envs)
  var SafeString = __dependency2__;
  var Exception = __dependency3__;
  var Utils = __dependency4__;
  var runtime = __dependency5__;

  // For compatibility and usage outside of module systems, make the Handlebars object a namespace
  var create = function() {
    var hb = new base.HandlebarsEnvironment();

    Utils.extend(hb, base);
    hb.SafeString = SafeString;
    hb.Exception = Exception;
    hb.Utils = Utils;

    hb.VM = runtime;
    hb.template = function(spec) {
      return runtime.template(spec, hb);
    };

    return hb;
  };

  var Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module2__, __module4__, __module5__, __module3__, __module6__);

// handlebars/compiler/ast.js
var __module7__ = (function(__dependency1__) {
  "use strict";
  var __exports__;
  var Exception = __dependency1__;

  function LocationInfo(locInfo){
    locInfo = locInfo || {};
    this.firstLine   = locInfo.first_line;
    this.firstColumn = locInfo.first_column;
    this.lastColumn  = locInfo.last_column;
    this.lastLine    = locInfo.last_line;
  }

  var AST = {
    ProgramNode: function(statements, inverseStrip, inverse, locInfo) {
      var inverseLocationInfo, firstInverseNode;
      if (arguments.length === 3) {
        locInfo = inverse;
        inverse = null;
      } else if (arguments.length === 2) {
        locInfo = inverseStrip;
        inverseStrip = null;
      }

      LocationInfo.call(this, locInfo);
      this.type = "program";
      this.statements = statements;
      this.strip = {};

      if(inverse) {
        firstInverseNode = inverse[0];
        if (firstInverseNode) {
          inverseLocationInfo = {
            first_line: firstInverseNode.firstLine,
            last_line: firstInverseNode.lastLine,
            last_column: firstInverseNode.lastColumn,
            first_column: firstInverseNode.firstColumn
          };
          this.inverse = new AST.ProgramNode(inverse, inverseStrip, inverseLocationInfo);
        } else {
          this.inverse = new AST.ProgramNode(inverse, inverseStrip);
        }
        this.strip.right = inverseStrip.left;
      } else if (inverseStrip) {
        this.strip.left = inverseStrip.right;
      }
    },

    MustacheNode: function(rawParams, hash, open, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "mustache";
      this.strip = strip;

      // Open may be a string parsed from the parser or a passed boolean flag
      if (open != null && open.charAt) {
        // Must use charAt to support IE pre-10
        var escapeFlag = open.charAt(3) || open.charAt(2);
        this.escaped = escapeFlag !== '{' && escapeFlag !== '&';
      } else {
        this.escaped = !!open;
      }

      if (rawParams instanceof AST.SexprNode) {
        this.sexpr = rawParams;
      } else {
        // Support old AST API
        this.sexpr = new AST.SexprNode(rawParams, hash);
      }

      this.sexpr.isRoot = true;

      // Support old AST API that stored this info in MustacheNode
      this.id = this.sexpr.id;
      this.params = this.sexpr.params;
      this.hash = this.sexpr.hash;
      this.eligibleHelper = this.sexpr.eligibleHelper;
      this.isHelper = this.sexpr.isHelper;
    },

    SexprNode: function(rawParams, hash, locInfo) {
      LocationInfo.call(this, locInfo);

      this.type = "sexpr";
      this.hash = hash;

      var id = this.id = rawParams[0];
      var params = this.params = rawParams.slice(1);

      // a mustache is an eligible helper if:
      // * its id is simple (a single part, not `this` or `..`)
      var eligibleHelper = this.eligibleHelper = id.isSimple;

      // a mustache is definitely a helper if:
      // * it is an eligible helper, and
      // * it has at least one parameter or hash segment
      this.isHelper = eligibleHelper && (params.length || hash);

      // if a mustache is an eligible helper but not a definite
      // helper, it is ambiguous, and will be resolved in a later
      // pass or at runtime.
    },

    PartialNode: function(partialName, context, strip, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type         = "partial";
      this.partialName  = partialName;
      this.context      = context;
      this.strip = strip;
    },

    BlockNode: function(mustache, program, inverse, close, locInfo) {
      LocationInfo.call(this, locInfo);

      if(mustache.sexpr.id.original !== close.path.original) {
        throw new Exception(mustache.sexpr.id.original + " doesn't match " + close.path.original, this);
      }

      this.type = 'block';
      this.mustache = mustache;
      this.program  = program;
      this.inverse  = inverse;

      this.strip = {
        left: mustache.strip.left,
        right: close.strip.right
      };

      (program || inverse).strip.left = mustache.strip.right;
      (inverse || program).strip.right = close.strip.left;

      if (inverse && !program) {
        this.isInverse = true;
      }
    },

    ContentNode: function(string, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "content";
      this.string = string;
    },

    HashNode: function(pairs, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "hash";
      this.pairs = pairs;
    },

    IdNode: function(parts, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "ID";

      var original = "",
          dig = [],
          depth = 0;

      for(var i=0,l=parts.length; i<l; i++) {
        var part = parts[i].part;
        original += (parts[i].separator || '') + part;

        if (part === ".." || part === "." || part === "this") {
          if (dig.length > 0) {
            throw new Exception("Invalid path: " + original, this);
          } else if (part === "..") {
            depth++;
          } else {
            this.isScoped = true;
          }
        } else {
          dig.push(part);
        }
      }

      this.original = original;
      this.parts    = dig;
      this.string   = dig.join('.');
      this.depth    = depth;

      // an ID is simple if it only has one part, and that part is not
      // `..` or `this`.
      this.isSimple = parts.length === 1 && !this.isScoped && depth === 0;

      this.stringModeValue = this.string;
    },

    PartialNameNode: function(name, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "PARTIAL_NAME";
      this.name = name.original;
    },

    DataNode: function(id, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "DATA";
      this.id = id;
    },

    StringNode: function(string, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "STRING";
      this.original =
        this.string =
        this.stringModeValue = string;
    },

    IntegerNode: function(integer, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "INTEGER";
      this.original =
        this.integer = integer;
      this.stringModeValue = Number(integer);
    },

    BooleanNode: function(bool, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "BOOLEAN";
      this.bool = bool;
      this.stringModeValue = bool === "true";
    },

    CommentNode: function(comment, locInfo) {
      LocationInfo.call(this, locInfo);
      this.type = "comment";
      this.comment = comment;
    }
  };

  // Must be exported as an object rather than the root of the module as the jison lexer
  // most modify the object to operate properly.
  __exports__ = AST;
  return __exports__;
})(__module5__);

// handlebars/compiler/parser.js
var __module9__ = (function() {
  "use strict";
  var __exports__;
  /* jshint ignore:start */
  /* Jison generated parser */
  var handlebars = (function(){
  var parser = {trace: function trace() { },
  yy: {},
  symbols_: {"error":2,"root":3,"statements":4,"EOF":5,"program":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"sexpr":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"partial_option0":27,"sexpr_repetition0":28,"sexpr_option0":29,"dataName":30,"param":31,"STRING":32,"INTEGER":33,"BOOLEAN":34,"OPEN_SEXPR":35,"CLOSE_SEXPR":36,"hash":37,"hash_repetition_plus0":38,"hashSegment":39,"ID":40,"EQUALS":41,"DATA":42,"pathSegments":43,"SEP":44,"$accept":0,"$end":1},
  terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",32:"STRING",33:"INTEGER",34:"BOOLEAN",35:"OPEN_SEXPR",36:"CLOSE_SEXPR",40:"ID",41:"EQUALS",42:"DATA",44:"SEP"},
  productions_: [0,[3,2],[3,1],[6,2],[6,3],[6,2],[6,1],[6,1],[6,0],[4,1],[4,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,4],[7,2],[17,3],[17,1],[31,1],[31,1],[31,1],[31,1],[31,1],[31,3],[37,1],[39,3],[26,1],[26,1],[26,1],[30,2],[21,1],[43,3],[43,1],[27,0],[27,1],[28,0],[28,2],[29,0],[29,1],[38,1],[38,2]],
  performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

  var $0 = $$.length - 1;
  switch (yystate) {
  case 1: return new yy.ProgramNode($$[$0-1], this._$); 
  break;
  case 2: return new yy.ProgramNode([], this._$); 
  break;
  case 3:this.$ = new yy.ProgramNode([], $$[$0-1], $$[$0], this._$);
  break;
  case 4:this.$ = new yy.ProgramNode($$[$0-2], $$[$0-1], $$[$0], this._$);
  break;
  case 5:this.$ = new yy.ProgramNode($$[$0-1], $$[$0], [], this._$);
  break;
  case 6:this.$ = new yy.ProgramNode($$[$0], this._$);
  break;
  case 7:this.$ = new yy.ProgramNode([], this._$);
  break;
  case 8:this.$ = new yy.ProgramNode([], this._$);
  break;
  case 9:this.$ = [$$[$0]];
  break;
  case 10: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]; 
  break;
  case 11:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1].inverse, $$[$0-1], $$[$0], this._$);
  break;
  case 12:this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0-1].inverse, $$[$0], this._$);
  break;
  case 13:this.$ = $$[$0];
  break;
  case 14:this.$ = $$[$0];
  break;
  case 15:this.$ = new yy.ContentNode($$[$0], this._$);
  break;
  case 16:this.$ = new yy.CommentNode($$[$0], this._$);
  break;
  case 17:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 18:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 19:this.$ = {path: $$[$0-1], strip: stripFlags($$[$0-2], $$[$0])};
  break;
  case 20:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 21:this.$ = new yy.MustacheNode($$[$0-1], null, $$[$0-2], stripFlags($$[$0-2], $$[$0]), this._$);
  break;
  case 22:this.$ = new yy.PartialNode($$[$0-2], $$[$0-1], stripFlags($$[$0-3], $$[$0]), this._$);
  break;
  case 23:this.$ = stripFlags($$[$0-1], $$[$0]);
  break;
  case 24:this.$ = new yy.SexprNode([$$[$0-2]].concat($$[$0-1]), $$[$0], this._$);
  break;
  case 25:this.$ = new yy.SexprNode([$$[$0]], null, this._$);
  break;
  case 26:this.$ = $$[$0];
  break;
  case 27:this.$ = new yy.StringNode($$[$0], this._$);
  break;
  case 28:this.$ = new yy.IntegerNode($$[$0], this._$);
  break;
  case 29:this.$ = new yy.BooleanNode($$[$0], this._$);
  break;
  case 30:this.$ = $$[$0];
  break;
  case 31:$$[$0-1].isHelper = true; this.$ = $$[$0-1];
  break;
  case 32:this.$ = new yy.HashNode($$[$0], this._$);
  break;
  case 33:this.$ = [$$[$0-2], $$[$0]];
  break;
  case 34:this.$ = new yy.PartialNameNode($$[$0], this._$);
  break;
  case 35:this.$ = new yy.PartialNameNode(new yy.StringNode($$[$0], this._$), this._$);
  break;
  case 36:this.$ = new yy.PartialNameNode(new yy.IntegerNode($$[$0], this._$));
  break;
  case 37:this.$ = new yy.DataNode($$[$0], this._$);
  break;
  case 38:this.$ = new yy.IdNode($$[$0], this._$);
  break;
  case 39: $$[$0-2].push({part: $$[$0], separator: $$[$0-1]}); this.$ = $$[$0-2]; 
  break;
  case 40:this.$ = [{part: $$[$0]}];
  break;
  case 43:this.$ = [];
  break;
  case 44:$$[$0-1].push($$[$0]);
  break;
  case 47:this.$ = [$$[$0]];
  break;
  case 48:$$[$0-1].push($$[$0]);
  break;
  }
  },
  table: [{3:1,4:2,5:[1,3],8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[3]},{5:[1,16],8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],25:[1,15]},{1:[2,2]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{4:20,6:18,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{4:20,6:22,7:19,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,8],22:[1,13],23:[1,14],25:[1,15]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{17:23,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:29,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:30,21:24,30:25,40:[1,28],42:[1,27],43:26},{17:31,21:24,30:25,40:[1,28],42:[1,27],43:26},{21:33,26:32,32:[1,34],33:[1,35],40:[1,28],43:26},{1:[2,1]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{10:36,20:[1,37]},{4:38,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,7],22:[1,13],23:[1,14],25:[1,15]},{7:39,8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,21],20:[2,6],22:[1,13],23:[1,14],25:[1,15]},{17:23,18:[1,40],21:24,30:25,40:[1,28],42:[1,27],43:26},{10:41,20:[1,37]},{18:[1,42]},{18:[2,43],24:[2,43],28:43,32:[2,43],33:[2,43],34:[2,43],35:[2,43],36:[2,43],40:[2,43],42:[2,43]},{18:[2,25],24:[2,25],36:[2,25]},{18:[2,38],24:[2,38],32:[2,38],33:[2,38],34:[2,38],35:[2,38],36:[2,38],40:[2,38],42:[2,38],44:[1,44]},{21:45,40:[1,28],43:26},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],42:[2,40],44:[2,40]},{18:[1,46]},{18:[1,47]},{24:[1,48]},{18:[2,41],21:50,27:49,40:[1,28],43:26},{18:[2,34],40:[2,34]},{18:[2,35],40:[2,35]},{18:[2,36],40:[2,36]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{21:51,40:[1,28],43:26},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,3],22:[1,13],23:[1,14],25:[1,15]},{4:52,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,5],22:[1,13],23:[1,14],25:[1,15]},{14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]},{18:[2,45],21:56,24:[2,45],29:53,30:60,31:54,32:[1,57],33:[1,58],34:[1,59],35:[1,61],36:[2,45],37:55,38:62,39:63,40:[1,64],42:[1,27],43:26},{40:[1,65]},{18:[2,37],24:[2,37],32:[2,37],33:[2,37],34:[2,37],35:[2,37],36:[2,37],40:[2,37],42:[2,37]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,66]},{18:[2,42]},{18:[1,67]},{8:17,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],25:[1,15]},{18:[2,24],24:[2,24],36:[2,24]},{18:[2,44],24:[2,44],32:[2,44],33:[2,44],34:[2,44],35:[2,44],36:[2,44],40:[2,44],42:[2,44]},{18:[2,46],24:[2,46],36:[2,46]},{18:[2,26],24:[2,26],32:[2,26],33:[2,26],34:[2,26],35:[2,26],36:[2,26],40:[2,26],42:[2,26]},{18:[2,27],24:[2,27],32:[2,27],33:[2,27],34:[2,27],35:[2,27],36:[2,27],40:[2,27],42:[2,27]},{18:[2,28],24:[2,28],32:[2,28],33:[2,28],34:[2,28],35:[2,28],36:[2,28],40:[2,28],42:[2,28]},{18:[2,29],24:[2,29],32:[2,29],33:[2,29],34:[2,29],35:[2,29],36:[2,29],40:[2,29],42:[2,29]},{18:[2,30],24:[2,30],32:[2,30],33:[2,30],34:[2,30],35:[2,30],36:[2,30],40:[2,30],42:[2,30]},{17:68,21:24,30:25,40:[1,28],42:[1,27],43:26},{18:[2,32],24:[2,32],36:[2,32],39:69,40:[1,70]},{18:[2,47],24:[2,47],36:[2,47],40:[2,47]},{18:[2,40],24:[2,40],32:[2,40],33:[2,40],34:[2,40],35:[2,40],36:[2,40],40:[2,40],41:[1,71],42:[2,40],44:[2,40]},{18:[2,39],24:[2,39],32:[2,39],33:[2,39],34:[2,39],35:[2,39],36:[2,39],40:[2,39],42:[2,39],44:[2,39]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{36:[1,72]},{18:[2,48],24:[2,48],36:[2,48],40:[2,48]},{41:[1,71]},{21:56,30:60,31:73,32:[1,57],33:[1,58],34:[1,59],35:[1,61],40:[1,28],42:[1,27],43:26},{18:[2,31],24:[2,31],32:[2,31],33:[2,31],34:[2,31],35:[2,31],36:[2,31],40:[2,31],42:[2,31]},{18:[2,33],24:[2,33],36:[2,33],40:[2,33]}],
  defaultActions: {3:[2,2],16:[2,1],50:[2,42]},
  parseError: function parseError(str, hash) {
      throw new Error(str);
  },
  parse: function parse(input) {
      var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      this.lexer.setInput(input);
      this.lexer.yy = this.yy;
      this.yy.lexer = this.lexer;
      this.yy.parser = this;
      if (typeof this.lexer.yylloc == "undefined")
          this.lexer.yylloc = {};
      var yyloc = this.lexer.yylloc;
      lstack.push(yyloc);
      var ranges = this.lexer.options && this.lexer.options.ranges;
      if (typeof this.yy.parseError === "function")
          this.parseError = this.yy.parseError;
      function popStack(n) {
          stack.length = stack.length - 2 * n;
          vstack.length = vstack.length - n;
          lstack.length = lstack.length - n;
      }
      function lex() {
          var token;
          token = self.lexer.lex() || 1;
          if (typeof token !== "number") {
              token = self.symbols_[token] || token;
          }
          return token;
      }
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
          state = stack[stack.length - 1];
          if (this.defaultActions[state]) {
              action = this.defaultActions[state];
          } else {
              if (symbol === null || typeof symbol == "undefined") {
                  symbol = lex();
              }
              action = table[state] && table[state][symbol];
          }
          if (typeof action === "undefined" || !action.length || !action[0]) {
              var errStr = "";
              if (!recovering) {
                  expected = [];
                  for (p in table[state])
                      if (this.terminals_[p] && p > 2) {
                          expected.push("'" + this.terminals_[p] + "'");
                      }
                  if (this.lexer.showPosition) {
                      errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
                  } else {
                      errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                  }
                  this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
              }
          }
          if (action[0] instanceof Array && action.length > 1) {
              throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
          }
          switch (action[0]) {
          case 1:
              stack.push(symbol);
              vstack.push(this.lexer.yytext);
              lstack.push(this.lexer.yylloc);
              stack.push(action[1]);
              symbol = null;
              if (!preErrorSymbol) {
                  yyleng = this.lexer.yyleng;
                  yytext = this.lexer.yytext;
                  yylineno = this.lexer.yylineno;
                  yyloc = this.lexer.yylloc;
                  if (recovering > 0)
                      recovering--;
              } else {
                  symbol = preErrorSymbol;
                  preErrorSymbol = null;
              }
              break;
          case 2:
              len = this.productions_[action[1]][1];
              yyval.$ = vstack[vstack.length - len];
              yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
              if (ranges) {
                  yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
              }
              r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
              if (typeof r !== "undefined") {
                  return r;
              }
              if (len) {
                  stack = stack.slice(0, -1 * len * 2);
                  vstack = vstack.slice(0, -1 * len);
                  lstack = lstack.slice(0, -1 * len);
              }
              stack.push(this.productions_[action[1]][0]);
              vstack.push(yyval.$);
              lstack.push(yyval._$);
              newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
              stack.push(newState);
              break;
          case 3:
              return true;
          }
      }
      return true;
  }
  };


  function stripFlags(open, close) {
    return {
      left: open.charAt(2) === '~',
      right: close.charAt(0) === '~' || close.charAt(1) === '~'
    };
  }

  /* Jison generated lexer */
  var lexer = (function(){
  var lexer = ({EOF:1,
  parseError:function parseError(str, hash) {
          if (this.yy.parser) {
              this.yy.parser.parseError(str, hash);
          } else {
              throw new Error(str);
          }
      },
  setInput:function (input) {
          this._input = input;
          this._more = this._less = this.done = false;
          this.yylineno = this.yyleng = 0;
          this.yytext = this.matched = this.match = '';
          this.conditionStack = ['INITIAL'];
          this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
          if (this.options.ranges) this.yylloc.range = [0,0];
          this.offset = 0;
          return this;
      },
  input:function () {
          var ch = this._input[0];
          this.yytext += ch;
          this.yyleng++;
          this.offset++;
          this.match += ch;
          this.matched += ch;
          var lines = ch.match(/(?:\r\n?|\n).*/g);
          if (lines) {
              this.yylineno++;
              this.yylloc.last_line++;
          } else {
              this.yylloc.last_column++;
          }
          if (this.options.ranges) this.yylloc.range[1]++;

          this._input = this._input.slice(1);
          return ch;
      },
  unput:function (ch) {
          var len = ch.length;
          var lines = ch.split(/(?:\r\n?|\n)/g);

          this._input = ch + this._input;
          this.yytext = this.yytext.substr(0, this.yytext.length-len-1);
          //this.yyleng -= len;
          this.offset -= len;
          var oldLines = this.match.split(/(?:\r\n?|\n)/g);
          this.match = this.match.substr(0, this.match.length-1);
          this.matched = this.matched.substr(0, this.matched.length-1);

          if (lines.length-1) this.yylineno -= lines.length-1;
          var r = this.yylloc.range;

          this.yylloc = {first_line: this.yylloc.first_line,
            last_line: this.yylineno+1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length:
                this.yylloc.first_column - len
            };

          if (this.options.ranges) {
              this.yylloc.range = [r[0], r[0] + this.yyleng - len];
          }
          return this;
      },
  more:function () {
          this._more = true;
          return this;
      },
  less:function (n) {
          this.unput(this.match.slice(n));
      },
  pastInput:function () {
          var past = this.matched.substr(0, this.matched.length - this.match.length);
          return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
      },
  upcomingInput:function () {
          var next = this.match;
          if (next.length < 20) {
              next += this._input.substr(0, 20-next.length);
          }
          return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
      },
  showPosition:function () {
          var pre = this.pastInput();
          var c = new Array(pre.length + 1).join("-");
          return pre + this.upcomingInput() + "\n" + c+"^";
      },
  next:function () {
          if (this.done) {
              return this.EOF;
          }
          if (!this._input) this.done = true;

          var token,
              match,
              tempMatch,
              index,
              col,
              lines;
          if (!this._more) {
              this.yytext = '';
              this.match = '';
          }
          var rules = this._currentRules();
          for (var i=0;i < rules.length; i++) {
              tempMatch = this._input.match(this.rules[rules[i]]);
              if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                  match = tempMatch;
                  index = i;
                  if (!this.options.flex) break;
              }
          }
          if (match) {
              lines = match[0].match(/(?:\r\n?|\n).*/g);
              if (lines) this.yylineno += lines.length;
              this.yylloc = {first_line: this.yylloc.last_line,
                             last_line: this.yylineno+1,
                             first_column: this.yylloc.last_column,
                             last_column: lines ? lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length};
              this.yytext += match[0];
              this.match += match[0];
              this.matches = match;
              this.yyleng = this.yytext.length;
              if (this.options.ranges) {
                  this.yylloc.range = [this.offset, this.offset += this.yyleng];
              }
              this._more = false;
              this._input = this._input.slice(match[0].length);
              this.matched += match[0];
              token = this.performAction.call(this, this.yy, this, rules[index],this.conditionStack[this.conditionStack.length-1]);
              if (this.done && this._input) this.done = false;
              if (token) return token;
              else return;
          }
          if (this._input === "") {
              return this.EOF;
          } else {
              return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                      {text: "", token: null, line: this.yylineno});
          }
      },
  lex:function lex() {
          var r = this.next();
          if (typeof r !== 'undefined') {
              return r;
          } else {
              return this.lex();
          }
      },
  begin:function begin(condition) {
          this.conditionStack.push(condition);
      },
  popState:function popState() {
          return this.conditionStack.pop();
      },
  _currentRules:function _currentRules() {
          return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
      },
  topState:function () {
          return this.conditionStack[this.conditionStack.length-2];
      },
  pushState:function begin(condition) {
          this.begin(condition);
      }});
  lexer.options = {};
  lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {


  function strip(start, end) {
    return yy_.yytext = yy_.yytext.substr(start, yy_.yyleng-end);
  }


  var YYSTATE=YY_START
  switch($avoiding_name_collisions) {
  case 0:
                                     if(yy_.yytext.slice(-2) === "\\\\") {
                                       strip(0,1);
                                       this.begin("mu");
                                     } else if(yy_.yytext.slice(-1) === "\\") {
                                       strip(0,1);
                                       this.begin("emu");
                                     } else {
                                       this.begin("mu");
                                     }
                                     if(yy_.yytext) return 14;
                                   
  break;
  case 1:return 14;
  break;
  case 2:
                                     this.popState();
                                     return 14;
                                   
  break;
  case 3:strip(0,4); this.popState(); return 15;
  break;
  case 4:return 35;
  break;
  case 5:return 36;
  break;
  case 6:return 25;
  break;
  case 7:return 16;
  break;
  case 8:return 20;
  break;
  case 9:return 19;
  break;
  case 10:return 19;
  break;
  case 11:return 23;
  break;
  case 12:return 22;
  break;
  case 13:this.popState(); this.begin('com');
  break;
  case 14:strip(3,5); this.popState(); return 15;
  break;
  case 15:return 22;
  break;
  case 16:return 41;
  break;
  case 17:return 40;
  break;
  case 18:return 40;
  break;
  case 19:return 44;
  break;
  case 20:// ignore whitespace
  break;
  case 21:this.popState(); return 24;
  break;
  case 22:this.popState(); return 18;
  break;
  case 23:yy_.yytext = strip(1,2).replace(/\\"/g,'"'); return 32;
  break;
  case 24:yy_.yytext = strip(1,2).replace(/\\'/g,"'"); return 32;
  break;
  case 25:return 42;
  break;
  case 26:return 34;
  break;
  case 27:return 34;
  break;
  case 28:return 33;
  break;
  case 29:return 40;
  break;
  case 30:yy_.yytext = strip(1,2); return 40;
  break;
  case 31:return 'INVALID';
  break;
  case 32:return 5;
  break;
  }
  };
  lexer.rules = [/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{(~)?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:-?[0-9]+(?=([~}\s)])))/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)]))))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];
  lexer.conditions = {"mu":{"rules":[4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"com":{"rules":[3],"inclusive":false},"INITIAL":{"rules":[0,1,32],"inclusive":true}};
  return lexer;})()
  parser.lexer = lexer;
  function Parser () { this.yy = {}; }Parser.prototype = parser;parser.Parser = Parser;
  return new Parser;
  })();__exports__ = handlebars;
  /* jshint ignore:end */
  return __exports__;
})();

// handlebars/compiler/base.js
var __module8__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__ = {};
  var parser = __dependency1__;
  var AST = __dependency2__;

  __exports__.parser = parser;

  function parse(input) {
    // Just return if an already-compile AST was passed in.
    if(input.constructor === AST.ProgramNode) { return input; }

    parser.yy = AST;
    return parser.parse(input);
  }

  __exports__.parse = parse;
  return __exports__;
})(__module9__, __module7__);

// handlebars/compiler/compiler.js
var __module10__ = (function(__dependency1__) {
  "use strict";
  var __exports__ = {};
  var Exception = __dependency1__;

  function Compiler() {}

  __exports__.Compiler = Compiler;// the foundHelper register will disambiguate helper lookup from finding a
  // function in a context. This is necessary for mustache compatibility, which
  // requires that context functions in blocks are evaluated by blockHelperMissing,
  // and then proceed as if the resulting value was provided to blockHelperMissing.

  Compiler.prototype = {
    compiler: Compiler,

    disassemble: function() {
      var opcodes = this.opcodes, opcode, out = [], params, param;

      for (var i=0, l=opcodes.length; i<l; i++) {
        opcode = opcodes[i];

        if (opcode.opcode === 'DECLARE') {
          out.push("DECLARE " + opcode.name + "=" + opcode.value);
        } else {
          params = [];
          for (var j=0; j<opcode.args.length; j++) {
            param = opcode.args[j];
            if (typeof param === "string") {
              param = "\"" + param.replace("\n", "\\n") + "\"";
            }
            params.push(param);
          }
          out.push(opcode.opcode + " " + params.join(" "));
        }
      }

      return out.join("\n");
    },

    equals: function(other) {
      var len = this.opcodes.length;
      if (other.opcodes.length !== len) {
        return false;
      }

      for (var i = 0; i < len; i++) {
        var opcode = this.opcodes[i],
            otherOpcode = other.opcodes[i];
        if (opcode.opcode !== otherOpcode.opcode || opcode.args.length !== otherOpcode.args.length) {
          return false;
        }
        for (var j = 0; j < opcode.args.length; j++) {
          if (opcode.args[j] !== otherOpcode.args[j]) {
            return false;
          }
        }
      }

      len = this.children.length;
      if (other.children.length !== len) {
        return false;
      }
      for (i = 0; i < len; i++) {
        if (!this.children[i].equals(other.children[i])) {
          return false;
        }
      }

      return true;
    },

    guid: 0,

    compile: function(program, options) {
      this.opcodes = [];
      this.children = [];
      this.depths = {list: []};
      this.options = options;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.accept(program);
    },

    accept: function(node) {
      var strip = node.strip || {},
          ret;
      if (strip.left) {
        this.opcode('strip');
      }

      ret = this[node.type](node);

      if (strip.right) {
        this.opcode('strip');
      }

      return ret;
    },

    program: function(program) {
      var statements = program.statements;

      for(var i=0, l=statements.length; i<l; i++) {
        this.accept(statements[i]);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++, depth;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache,
          program = block.program,
          inverse = block.inverse;

      if (program) {
        program = this.compileProgram(program);
      }

      if (inverse) {
        inverse = this.compileProgram(inverse);
      }

      var sexpr = mustache.sexpr;
      var type = this.classifySexpr(sexpr);

      if (type === "helper") {
        this.helperSexpr(sexpr, program, inverse);
      } else if (type === "simple") {
        this.simpleSexpr(sexpr);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('blockValue');
      } else {
        this.ambiguousSexpr(sexpr, program, inverse);

        // now that the simple mustache is resolved, we need to
        // evaluate it by executing `blockHelperMissing`
        this.opcode('pushProgram', program);
        this.opcode('pushProgram', inverse);
        this.opcode('emptyHash');
        this.opcode('ambiguousBlockValue');
      }

      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, pair, val;

      this.opcode('pushHash');

      for(var i=0, l=pairs.length; i<l; i++) {
        pair = pairs[i];
        val  = pair[1];

        if (this.options.stringParams) {
          if(val.depth) {
            this.addDepth(val.depth);
          }
          this.opcode('getContext', val.depth || 0);
          this.opcode('pushStringParam', val.stringModeValue, val.type);

          if (val.type === 'sexpr') {
            // Subexpressions get evaluated and passed in
            // in string params mode.
            this.sexpr(val);
          }
        } else {
          this.accept(val);
        }

        this.opcode('assignToHash', pair[0]);
      }
      this.opcode('popHash');
    },

    partial: function(partial) {
      var partialName = partial.partialName;
      this.usePartial = true;

      if(partial.context) {
        this.ID(partial.context);
      } else {
        this.opcode('push', 'depth0');
      }

      this.opcode('invokePartial', partialName.name);
      this.opcode('append');
    },

    content: function(content) {
      this.opcode('appendContent', content.string);
    },

    mustache: function(mustache) {
      this.sexpr(mustache.sexpr);

      if(mustache.escaped && !this.options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ambiguousSexpr: function(sexpr, program, inverse) {
      var id = sexpr.id,
          name = id.parts[0],
          isBlock = program != null || inverse != null;

      this.opcode('getContext', id.depth);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      this.opcode('invokeAmbiguous', name, isBlock);
    },

    simpleSexpr: function(sexpr) {
      var id = sexpr.id;

      if (id.type === 'DATA') {
        this.DATA(id);
      } else if (id.parts.length) {
        this.ID(id);
      } else {
        // Simplified ID for `this`
        this.addDepth(id.depth);
        this.opcode('getContext', id.depth);
        this.opcode('pushContext');
      }

      this.opcode('resolvePossibleLambda');
    },

    helperSexpr: function(sexpr, program, inverse) {
      var params = this.setupFullMustacheParams(sexpr, program, inverse),
          name = sexpr.id.parts[0];

      if (this.options.knownHelpers[name]) {
        this.opcode('invokeKnownHelper', params.length, name);
      } else if (this.options.knownHelpersOnly) {
        throw new Exception("You specified knownHelpersOnly, but used the unknown helper " + name, sexpr);
      } else {
        this.opcode('invokeHelper', params.length, name, sexpr.isRoot);
      }
    },

    sexpr: function(sexpr) {
      var type = this.classifySexpr(sexpr);

      if (type === "simple") {
        this.simpleSexpr(sexpr);
      } else if (type === "helper") {
        this.helperSexpr(sexpr);
      } else {
        this.ambiguousSexpr(sexpr);
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);
      this.opcode('getContext', id.depth);

      var name = id.parts[0];
      if (!name) {
        this.opcode('pushContext');
      } else {
        this.opcode('lookupOnContext', id.parts[0]);
      }

      for(var i=1, l=id.parts.length; i<l; i++) {
        this.opcode('lookup', id.parts[i]);
      }
    },

    DATA: function(data) {
      this.options.data = true;
      if (data.id.isScoped || data.id.depth) {
        throw new Exception('Scoped data references are not supported: ' + data.original, data);
      }

      this.opcode('lookupData');
      var parts = data.id.parts;
      for(var i=0, l=parts.length; i<l; i++) {
        this.opcode('lookup', parts[i]);
      }
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    INTEGER: function(integer) {
      this.opcode('pushLiteral', integer.integer);
    },

    BOOLEAN: function(bool) {
      this.opcode('pushLiteral', bool.bool);
    },

    comment: function() {},

    // HELPERS
    opcode: function(name) {
      this.opcodes.push({ opcode: name, args: [].slice.call(arguments, 1) });
    },

    declare: function(name, value) {
      this.opcodes.push({ opcode: 'DECLARE', name: name, value: value });
    },

    addDepth: function(depth) {
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    classifySexpr: function(sexpr) {
      var isHelper   = sexpr.isHelper;
      var isEligible = sexpr.eligibleHelper;
      var options    = this.options;

      // if ambiguous, we can possibly resolve the ambiguity now
      if (isEligible && !isHelper) {
        var name = sexpr.id.parts[0];

        if (options.knownHelpers[name]) {
          isHelper = true;
        } else if (options.knownHelpersOnly) {
          isEligible = false;
        }
      }

      if (isHelper) { return "helper"; }
      else if (isEligible) { return "ambiguous"; }
      else { return "simple"; }
    },

    pushParams: function(params) {
      var i = params.length, param;

      while(i--) {
        param = params[i];

        if(this.options.stringParams) {
          if(param.depth) {
            this.addDepth(param.depth);
          }

          this.opcode('getContext', param.depth || 0);
          this.opcode('pushStringParam', param.stringModeValue, param.type);

          if (param.type === 'sexpr') {
            // Subexpressions get evaluated and passed in
            // in string params mode.
            this.sexpr(param);
          }
        } else {
          this[param.type](param);
        }
      }
    },

    setupFullMustacheParams: function(sexpr, program, inverse) {
      var params = sexpr.params;
      this.pushParams(params);

      this.opcode('pushProgram', program);
      this.opcode('pushProgram', inverse);

      if (sexpr.hash) {
        this.hash(sexpr.hash);
      } else {
        this.opcode('emptyHash');
      }

      return params;
    }
  };

  function precompile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + input);
    }

    options = options || {};
    if (!('data' in options)) {
      options.data = true;
    }

    var ast = env.parse(input);
    var environment = new env.Compiler().compile(ast, options);
    return new env.JavaScriptCompiler().compile(environment, options);
  }

  __exports__.precompile = precompile;function compile(input, options, env) {
    if (input == null || (typeof input !== 'string' && input.constructor !== env.AST.ProgramNode)) {
      throw new Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + input);
    }

    options = options || {};

    if (!('data' in options)) {
      options.data = true;
    }

    var compiled;

    function compileInput() {
      var ast = env.parse(input);
      var environment = new env.Compiler().compile(ast, options);
      var templateSpec = new env.JavaScriptCompiler().compile(environment, options, undefined, true);
      return env.template(templateSpec);
    }

    // Template is only compiled on first use and cached after that point.
    return function(context, options) {
      if (!compiled) {
        compiled = compileInput();
      }
      return compiled.call(this, context, options);
    };
  }

  __exports__.compile = compile;
  return __exports__;
})(__module5__);

// handlebars/compiler/javascript-compiler.js
var __module11__ = (function(__dependency1__, __dependency2__) {
  "use strict";
  var __exports__;
  var COMPILER_REVISION = __dependency1__.COMPILER_REVISION;
  var REVISION_CHANGES = __dependency1__.REVISION_CHANGES;
  var log = __dependency1__.log;
  var Exception = __dependency2__;

  function Literal(value) {
    this.value = value;
  }

  function JavaScriptCompiler() {}

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name /* , type*/) {
      var wrap,
          ret;
      if (parent.indexOf('depth') === 0) {
        wrap = true;
      }

      if (/^[0-9]+$/.test(name)) {
        ret = parent + "[" + name + "]";
      } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
        ret = parent + "." + name;
      }
      else {
        ret = parent + "['" + name + "']";
      }

      if (wrap) {
        return '(' + parent + ' && ' + ret + ')';
      } else {
        return ret;
      }
    },

    compilerInfo: function() {
      var revision = COMPILER_REVISION,
          versions = REVISION_CHANGES[revision];
      return "this.compilerInfo = ["+revision+",'"+versions+"'];\n";
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return {
          appendToBuffer: true,
          content: string,
          toString: function() { return "buffer += " + string + ";"; }
        };
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options || {};

      log('debug', this.environment.disassemble() + "\n\n");

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        environments: [],
        aliases: { }
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];
      this.registers = { list: [] };
      this.hashes = [];
      this.compileStack = [];
      this.inlineStack = [];

      this.compileChildren(environment, options);

      var opcodes = environment.opcodes, opcode;

      this.i = 0;

      for(var l=opcodes.length; this.i<l; this.i++) {
        opcode = opcodes[this.i];

        if(opcode.opcode === 'DECLARE') {
          this[opcode.name] = opcode.value;
        } else {
          this[opcode.opcode].apply(this, opcode.args);
        }

        // Reset the stripNext flag if it was not set by this operation.
        if (opcode.opcode !== this.stripNext) {
          this.stripNext = false;
        }
      }

      // Flush any trailing content that might be pending.
      this.pushSource('');

      if (this.stackSlot || this.inlineStack.length || this.compileStack.length) {
        throw new Exception('Compile completed with content left on stack');
      }

      return this.createFunctionContext(asObject);
    },

    preamble: function() {
      var out = [];

      if (!this.isChild) {
        var namespace = this.namespace;

        var copies = "helpers = this.merge(helpers, " + namespace + ".helpers);";
        if (this.environment.usePartial) { copies = copies + " partials = this.merge(partials, " + namespace + ".partials);"; }
        if (this.options.data) { copies = copies + " data = data || {};"; }
        out.push(copies);
      } else {
        out.push('');
      }

      if (!this.environment.isSimple) {
        out.push(", buffer = " + this.initializeBuffer());
      } else {
        out.push("");
      }

      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = out;
    },

    createFunctionContext: function(asObject) {
      var locals = this.stackVars.concat(this.registers.list);

      if(locals.length > 0) {
        this.source[1] = this.source[1] + ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      if (!this.isChild) {
        for (var alias in this.context.aliases) {
          if (this.context.aliases.hasOwnProperty(alias)) {
            this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
          }
        }
      }

      if (this.source[1]) {
        this.source[1] = "var " + this.source[1].substring(2) + ";";
      }

      // Merge children
      if (!this.isChild) {
        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
      }

      if (!this.environment.isSimple) {
        this.pushSource("return buffer;");
      }

      var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

      for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
        params.push("depth" + this.environment.depths.list[i]);
      }

      // Perform a second pass over the output to merge content when possible
      var source = this.mergeSource();

      if (!this.isChild) {
        source = this.compilerInfo()+source;
      }

      if (asObject) {
        params.push(source);

        return Function.apply(this, params);
      } else {
        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + source + '}';
        log('debug', functionSource + "\n\n");
        return functionSource;
      }
    },
    mergeSource: function() {
      // WARN: We are not handling the case where buffer is still populated as the source should
      // not have buffer append operations as their final action.
      var source = '',
          buffer;
      for (var i = 0, len = this.source.length; i < len; i++) {
        var line = this.source[i];
        if (line.appendToBuffer) {
          if (buffer) {
            buffer = buffer + '\n    + ' + line.content;
          } else {
            buffer = line.content;
          }
        } else {
          if (buffer) {
            source += 'buffer += ' + buffer + ';\n  ';
            buffer = undefined;
          }
          source += line + '\n  ';
        }
      }
      return source;
    },

    // [blockValue]
    //
    // On stack, before: hash, inverse, program, value
    // On stack, after: return value of blockHelperMissing
    //
    // The purpose of this opcode is to take a block of the form
    // `{{#foo}}...{{/foo}}`, resolve the value of `foo`, and
    // replace it on the stack with the result of properly
    // invoking blockHelperMissing.
    blockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      this.replaceStack(function(current) {
        params.splice(1, 0, current);
        return "blockHelperMissing.call(" + params.join(", ") + ")";
      });
    },

    // [ambiguousBlockValue]
    //
    // On stack, before: hash, inverse, program, value
    // Compiler value, before: lastHelper=value of last found helper, if any
    // On stack, after, if no lastHelper: same as [blockValue]
    // On stack, after, if lastHelper: value
    ambiguousBlockValue: function() {
      this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';

      var params = ["depth0"];
      this.setupParams(0, params);

      var current = this.topStack();
      params.splice(1, 0, current);

      this.pushSource("if (!" + this.lastHelper + ") { " + current + " = blockHelperMissing.call(" + params.join(", ") + "); }");
    },

    // [appendContent]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Appends the string value of `content` to the current buffer
    appendContent: function(content) {
      if (this.pendingContent) {
        content = this.pendingContent + content;
      }
      if (this.stripNext) {
        content = content.replace(/^\s+/, '');
      }

      this.pendingContent = content;
    },

    // [strip]
    //
    // On stack, before: ...
    // On stack, after: ...
    //
    // Removes any trailing whitespace from the prior content node and flags
    // the next operation for stripping if it is a content node.
    strip: function() {
      if (this.pendingContent) {
        this.pendingContent = this.pendingContent.replace(/\s+$/, '');
      }
      this.stripNext = 'strip';
    },

    // [append]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Coerces `value` to a String and appends it to the current buffer.
    //
    // If `value` is truthy, or 0, it is coerced into a string and appended
    // Otherwise, the empty string is appended
    append: function() {
      // Force anything that is inlined onto the stack so we don't have duplication
      // when we examine local
      this.flushInline();
      var local = this.popStack();
      this.pushSource("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
      if (this.environment.isSimple) {
        this.pushSource("else { " + this.appendToBuffer("''") + " }");
      }
    },

    // [appendEscaped]
    //
    // On stack, before: value, ...
    // On stack, after: ...
    //
    // Escape `value` and append it to the buffer
    appendEscaped: function() {
      this.context.aliases.escapeExpression = 'this.escapeExpression';

      this.pushSource(this.appendToBuffer("escapeExpression(" + this.popStack() + ")"));
    },

    // [getContext]
    //
    // On stack, before: ...
    // On stack, after: ...
    // Compiler value, after: lastContext=depth
    //
    // Set the value of the `lastContext` compiler value to the depth
    getContext: function(depth) {
      if(this.lastContext !== depth) {
        this.lastContext = depth;
      }
    },

    // [lookupOnContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext[name], ...
    //
    // Looks up the value of `name` on the current context and pushes
    // it onto the stack.
    lookupOnContext: function(name) {
      this.push(this.nameLookup('depth' + this.lastContext, name, 'context'));
    },

    // [pushContext]
    //
    // On stack, before: ...
    // On stack, after: currentContext, ...
    //
    // Pushes the value of the current context onto the stack.
    pushContext: function() {
      this.pushStackLiteral('depth' + this.lastContext);
    },

    // [resolvePossibleLambda]
    //
    // On stack, before: value, ...
    // On stack, after: resolved value, ...
    //
    // If the `value` is a lambda, replace it on the stack by
    // the return value of the lambda
    resolvePossibleLambda: function() {
      this.context.aliases.functionType = '"function"';

      this.replaceStack(function(current) {
        return "typeof " + current + " === functionType ? " + current + ".apply(depth0) : " + current;
      });
    },

    // [lookup]
    //
    // On stack, before: value, ...
    // On stack, after: value[name], ...
    //
    // Replace the value on the stack with the result of looking
    // up `name` on `value`
    lookup: function(name) {
      this.replaceStack(function(current) {
        return current + " == null || " + current + " === false ? " + current + " : " + this.nameLookup(current, name, 'context');
      });
    },

    // [lookupData]
    //
    // On stack, before: ...
    // On stack, after: data, ...
    //
    // Push the data lookup operator
    lookupData: function() {
      this.pushStackLiteral('data');
    },

    // [pushStringParam]
    //
    // On stack, before: ...
    // On stack, after: string, currentContext, ...
    //
    // This opcode is designed for use in string mode, which
    // provides the string value of a parameter along with its
    // depth rather than resolving it immediately.
    pushStringParam: function(string, type) {
      this.pushStackLiteral('depth' + this.lastContext);

      this.pushString(type);

      // If it's a subexpression, the string result
      // will be pushed after this opcode.
      if (type !== 'sexpr') {
        if (typeof string === 'string') {
          this.pushString(string);
        } else {
          this.pushStackLiteral(string);
        }
      }
    },

    emptyHash: function() {
      this.pushStackLiteral('{}');

      if (this.options.stringParams) {
        this.push('{}'); // hashContexts
        this.push('{}'); // hashTypes
      }
    },
    pushHash: function() {
      if (this.hash) {
        this.hashes.push(this.hash);
      }
      this.hash = {values: [], types: [], contexts: []};
    },
    popHash: function() {
      var hash = this.hash;
      this.hash = this.hashes.pop();

      if (this.options.stringParams) {
        this.push('{' + hash.contexts.join(',') + '}');
        this.push('{' + hash.types.join(',') + '}');
      }

      this.push('{\n    ' + hash.values.join(',\n    ') + '\n  }');
    },

    // [pushString]
    //
    // On stack, before: ...
    // On stack, after: quotedString(string), ...
    //
    // Push a quoted version of `string` onto the stack
    pushString: function(string) {
      this.pushStackLiteral(this.quotedString(string));
    },

    // [push]
    //
    // On stack, before: ...
    // On stack, after: expr, ...
    //
    // Push an expression onto the stack
    push: function(expr) {
      this.inlineStack.push(expr);
      return expr;
    },

    // [pushLiteral]
    //
    // On stack, before: ...
    // On stack, after: value, ...
    //
    // Pushes a value onto the stack. This operation prevents
    // the compiler from creating a temporary variable to hold
    // it.
    pushLiteral: function(value) {
      this.pushStackLiteral(value);
    },

    // [pushProgram]
    //
    // On stack, before: ...
    // On stack, after: program(guid), ...
    //
    // Push a program expression onto the stack. This takes
    // a compile-time guid and converts it into a runtime-accessible
    // expression.
    pushProgram: function(guid) {
      if (guid != null) {
        this.pushStackLiteral(this.programExpression(guid));
      } else {
        this.pushStackLiteral(null);
      }
    },

    // [invokeHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // Pops off the helper's parameters, invokes the helper,
    // and pushes the helper's return value onto the stack.
    //
    // If the helper is not found, `helperMissing` is called.
    invokeHelper: function(paramSize, name, isRoot) {
      this.context.aliases.helperMissing = 'helpers.helperMissing';
      this.useRegister('helper');

      var helper = this.lastHelper = this.setupHelper(paramSize, name, true);
      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');

      var lookup = 'helper = ' + helper.name + ' || ' + nonHelper;
      if (helper.paramsInit) {
        lookup += ',' + helper.paramsInit;
      }

      this.push(
        '('
          + lookup
          + ',helper '
            + '? helper.call(' + helper.callParams + ') '
            + ': helperMissing.call(' + helper.helperMissingParams + '))');

      // Always flush subexpressions. This is both to prevent the compounding size issue that
      // occurs when the code has to be duplicated for inlining and also to prevent errors
      // due to the incorrect options object being passed due to the shared register.
      if (!isRoot) {
        this.flushInline();
      }
    },

    // [invokeKnownHelper]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of helper invocation
    //
    // This operation is used when the helper is known to exist,
    // so a `helperMissing` fallback is not required.
    invokeKnownHelper: function(paramSize, name) {
      var helper = this.setupHelper(paramSize, name);
      this.push(helper.name + ".call(" + helper.callParams + ")");
    },

    // [invokeAmbiguous]
    //
    // On stack, before: hash, inverse, program, params..., ...
    // On stack, after: result of disambiguation
    //
    // This operation is used when an expression like `{{foo}}`
    // is provided, but we don't know at compile-time whether it
    // is a helper or a path.
    //
    // This operation emits more code than the other options,
    // and can be avoided by passing the `knownHelpers` and
    // `knownHelpersOnly` flags at compile-time.
    invokeAmbiguous: function(name, helperCall) {
      this.context.aliases.functionType = '"function"';
      this.useRegister('helper');

      this.emptyHash();
      var helper = this.setupHelper(0, name, helperCall);

      var helperName = this.lastHelper = this.nameLookup('helpers', name, 'helper');

      var nonHelper = this.nameLookup('depth' + this.lastContext, name, 'context');
      var nextStack = this.nextStack();

      if (helper.paramsInit) {
        this.pushSource(helper.paramsInit);
      }
      this.pushSource('if (helper = ' + helperName + ') { ' + nextStack + ' = helper.call(' + helper.callParams + '); }');
      this.pushSource('else { helper = ' + nonHelper + '; ' + nextStack + ' = typeof helper === functionType ? helper.call(' + helper.callParams + ') : helper; }');
    },

    // [invokePartial]
    //
    // On stack, before: context, ...
    // On stack after: result of partial invocation
    //
    // This operation pops off a context, invokes a partial with that context,
    // and pushes the result of the invocation back.
    invokePartial: function(name) {
      var params = [this.nameLookup('partials', name, 'partial'), "'" + name + "'", this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      }

      this.context.aliases.self = "this";
      this.push("self.invokePartial(" + params.join(", ") + ")");
    },

    // [assignToHash]
    //
    // On stack, before: value, hash, ...
    // On stack, after: hash, ...
    //
    // Pops a value and hash off the stack, assigns `hash[key] = value`
    // and pushes the hash back onto the stack.
    assignToHash: function(key) {
      var value = this.popStack(),
          context,
          type;

      if (this.options.stringParams) {
        type = this.popStack();
        context = this.popStack();
      }

      var hash = this.hash;
      if (context) {
        hash.contexts.push("'" + key + "': " + context);
      }
      if (type) {
        hash.types.push("'" + key + "': " + type);
      }
      hash.values.push("'" + key + "': (" + value + ")");
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        var index = this.matchExistingProgram(child);

        if (index == null) {
          this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
          index = this.context.programs.length;
          child.index = index;
          child.name = 'program' + index;
          this.context.programs[index] = compiler.compile(child, options, this.context);
          this.context.environments[index] = child;
        } else {
          child.index = index;
          child.name = 'program' + index;
        }
      }
    },
    matchExistingProgram: function(child) {
      for (var i = 0, len = this.context.environments.length; i < len; i++) {
        var environment = this.context.environments[i];
        if (environment && environment.equals(child)) {
          return i;
        }
      }
    },

    programExpression: function(guid) {
      this.context.aliases.self = "this";

      if(guid == null) {
        return "self.noop";
      }

      var child = this.environment.children[guid],
          depths = child.depths.list, depth;

      var programParams = [child.index, child.name, "data"];

      for(var i=0, l = depths.length; i<l; i++) {
        depth = depths[i];

        if(depth === 1) { programParams.push("depth0"); }
        else { programParams.push("depth" + (depth - 1)); }
      }

      return (depths.length === 0 ? "self.program(" : "self.programWithDepth(") + programParams.join(", ") + ")";
    },

    register: function(name, val) {
      this.useRegister(name);
      this.pushSource(name + " = " + val + ";");
    },

    useRegister: function(name) {
      if(!this.registers[name]) {
        this.registers[name] = true;
        this.registers.list.push(name);
      }
    },

    pushStackLiteral: function(item) {
      return this.push(new Literal(item));
    },

    pushSource: function(source) {
      if (this.pendingContent) {
        this.source.push(this.appendToBuffer(this.quotedString(this.pendingContent)));
        this.pendingContent = undefined;
      }

      if (source) {
        this.source.push(source);
      }
    },

    pushStack: function(item) {
      this.flushInline();

      var stack = this.incrStack();
      if (item) {
        this.pushSource(stack + " = " + item + ";");
      }
      this.compileStack.push(stack);
      return stack;
    },

    replaceStack: function(callback) {
      var prefix = '',
          inline = this.isInline(),
          stack,
          createdStack,
          usedLiteral;

      // If we are currently inline then we want to merge the inline statement into the
      // replacement statement via ','
      if (inline) {
        var top = this.popStack(true);

        if (top instanceof Literal) {
          // Literals do not need to be inlined
          stack = top.value;
          usedLiteral = true;
        } else {
          // Get or create the current stack name for use by the inline
          createdStack = !this.stackSlot;
          var name = !createdStack ? this.topStackName() : this.incrStack();

          prefix = '(' + this.push(name) + ' = ' + top + '),';
          stack = this.topStack();
        }
      } else {
        stack = this.topStack();
      }

      var item = callback.call(this, stack);

      if (inline) {
        if (!usedLiteral) {
          this.popStack();
        }
        if (createdStack) {
          this.stackSlot--;
        }
        this.push('(' + prefix + item + ')');
      } else {
        // Prevent modification of the context depth variable. Through replaceStack
        if (!/^stack/.test(stack)) {
          stack = this.nextStack();
        }

        this.pushSource(stack + " = (" + prefix + item + ");");
      }
      return stack;
    },

    nextStack: function() {
      return this.pushStack();
    },

    incrStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return this.topStackName();
    },
    topStackName: function() {
      return "stack" + this.stackSlot;
    },
    flushInline: function() {
      var inlineStack = this.inlineStack;
      if (inlineStack.length) {
        this.inlineStack = [];
        for (var i = 0, len = inlineStack.length; i < len; i++) {
          var entry = inlineStack[i];
          if (entry instanceof Literal) {
            this.compileStack.push(entry);
          } else {
            this.pushStack(entry);
          }
        }
      }
    },
    isInline: function() {
      return this.inlineStack.length;
    },

    popStack: function(wrapped) {
      var inline = this.isInline(),
          item = (inline ? this.inlineStack : this.compileStack).pop();

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        if (!inline) {
          if (!this.stackSlot) {
            throw new Exception('Invalid stack pop');
          }
          this.stackSlot--;
        }
        return item;
      }
    },

    topStack: function(wrapped) {
      var stack = (this.isInline() ? this.inlineStack : this.compileStack),
          item = stack[stack.length - 1];

      if (!wrapped && (item instanceof Literal)) {
        return item.value;
      } else {
        return item;
      }
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\u2028/g, '\\u2028')   // Per Ecma-262 7.3 + 7.8.4
        .replace(/\u2029/g, '\\u2029') + '"';
    },

    setupHelper: function(paramSize, name, missingParams) {
      var params = [],
          paramsInit = this.setupParams(paramSize, params, missingParams);
      var foundHelper = this.nameLookup('helpers', name, 'helper');

      return {
        params: params,
        paramsInit: paramsInit,
        name: foundHelper,
        callParams: ["depth0"].concat(params).join(", "),
        helperMissingParams: missingParams && ["depth0", this.quotedString(name)].concat(params).join(", ")
      };
    },

    setupOptions: function(paramSize, params) {
      var options = [], contexts = [], types = [], param, inverse, program;

      options.push("hash:" + this.popStack());

      if (this.options.stringParams) {
        options.push("hashTypes:" + this.popStack());
        options.push("hashContexts:" + this.popStack());
      }

      inverse = this.popStack();
      program = this.popStack();

      // Avoid setting fn and inverse if neither are set. This allows
      // helpers to do a check for `if (options.fn)`
      if (program || inverse) {
        if (!program) {
          this.context.aliases.self = "this";
          program = "self.noop";
        }

        if (!inverse) {
          this.context.aliases.self = "this";
          inverse = "self.noop";
        }

        options.push("inverse:" + inverse);
        options.push("fn:" + program);
      }

      for(var i=0; i<paramSize; i++) {
        param = this.popStack();
        params.push(param);

        if(this.options.stringParams) {
          types.push(this.popStack());
          contexts.push(this.popStack());
        }
      }

      if (this.options.stringParams) {
        options.push("contexts:[" + contexts.join(",") + "]");
        options.push("types:[" + types.join(",") + "]");
      }

      if(this.options.data) {
        options.push("data:data");
      }

      return options;
    },

    // the params and contexts arguments are passed in arrays
    // to fill in
    setupParams: function(paramSize, params, useRegister) {
      var options = '{' + this.setupOptions(paramSize, params).join(',') + '}';

      if (useRegister) {
        this.useRegister('options');
        params.push('options');
        return 'options=' + options;
      } else {
        params.push(options);
        return '';
      }
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

  JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
    if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(name)) {
      return true;
    }
    return false;
  };

  __exports__ = JavaScriptCompiler;
  return __exports__;
})(__module2__, __module5__);

// handlebars.js
var __module0__ = (function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__) {
  "use strict";
  var __exports__;
  /*globals Handlebars: true */
  var Handlebars = __dependency1__;

  // Compiler imports
  var AST = __dependency2__;
  var Parser = __dependency3__.parser;
  var parse = __dependency3__.parse;
  var Compiler = __dependency4__.Compiler;
  var compile = __dependency4__.compile;
  var precompile = __dependency4__.precompile;
  var JavaScriptCompiler = __dependency5__;

  var _create = Handlebars.create;
  var create = function() {
    var hb = _create();

    hb.compile = function(input, options) {
      return compile(input, options, hb);
    };
    hb.precompile = function (input, options) {
      return precompile(input, options, hb);
    };

    hb.AST = AST;
    hb.Compiler = Compiler;
    hb.JavaScriptCompiler = JavaScriptCompiler;
    hb.Parser = Parser;
    hb.parse = parse;

    return hb;
  };

  Handlebars = create();
  Handlebars.create = create;

  __exports__ = Handlebars;
  return __exports__;
})(__module1__, __module7__, __module8__, __module10__, __module11__);

  return __module0__;
})();
/*!
 * @overview  Ember - JavaScript Application Framework
 * @copyright Copyright 2011-2014 Tilde Inc. and contributors
 *            Portions Copyright 2006-2011 Strobe Inc.
 *            Portions Copyright 2008-2011 Apple Inc. All rights reserved.
 * @license   Licensed under MIT license
 *            See https://raw.github.com/emberjs/ember.js/master/LICENSE
 * @version   1.6.0-beta.5+pre.34d5fca1
 */

!function(){var e,t,r,n,i;!function(){if(i=this.Ember=this.Ember||{},"undefined"==typeof i&&(i={}),"undefined"==typeof i.__loader){var a={},o={};e=function(e,t,r){a[e]={deps:t,callback:r}},n=r=t=function(e){function r(t){if("."!==t.charAt(0))return t;for(var r=t.split("/"),n=e.split("/").slice(0,-1),i=0,a=r.length;a>i;i++){var o=r[i];if(".."===o)n.pop();else{if("."===o)continue;n.push(o)}}return n.join("/")}if(o.hasOwnProperty(e))return o[e];if(o[e]={},!a[e])throw new Error("Could not find module "+e);for(var n,i=a[e],s=i.deps,l=i.callback,u=[],c=0,h=s.length;h>c;c++)"exports"===s[c]?u.push(n={}):u.push(t(r(s[c])));var m=l.apply(this,u);return o[e]=n||m},n._eak_seen=a,i.__loader={define:e,require:r,registry:a}}else e=i.__loader.define,n=r=t=i.__loader.require}(),function(){e("ember-metal/array",["exports"],function(){var e=arguments,t=e[e.length-1],r=Array.prototype,n=function(e){return e&&Function.prototype.toString.call(e).indexOf("[native code]")>-1},a=n(r.map)?r.map:function(e){if(void 0===this||null===this)throw new TypeError;var t=Object(this),r=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var n=new Array(r),i=arguments[1],a=0;r>a;a++)a in t&&(n[a]=e.call(i,t[a],a,t));return n},o=n(r.forEach)?r.forEach:function(e){if(void 0===this||null===this)throw new TypeError;var t=Object(this),r=t.length>>>0;if("function"!=typeof e)throw new TypeError;for(var n=arguments[1],i=0;r>i;i++)i in t&&e.call(n,t[i],i,t)},s=n(r.indexOf)?r.indexOf:function(e,t){null===t||void 0===t?t=0:0>t&&(t=Math.max(0,this.length+t));for(var r=t,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},l=n(r.filter)?r.filter:function(e,t){var r,n,i=[],a=this.length;for(r=0;a>r;r++)this.hasOwnProperty(r)&&(n=this[r],e.call(t,n,r,this)&&i.push(n));return i};i.SHIM_ES5&&(r.map||(r.map=a),r.forEach||(r.forEach=o),r.filter||(r.filter=l),r.indexOf||(r.indexOf=s)),t.map=a,t.forEach=o,t.filter=l,t.indexOf=s}),e("ember-metal/binding",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/map","ember-metal/observer","ember-metal/run_loop","exports"],function(){function e(e){return g.test(e)}function t(t,r){return l(e(r)?s.lookup:t,r)}function r(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])}function n(e,t,r){return new v(t,r).connect(e)}function i(e,t,r){return new v(t,r).oneWay().connect(e)}var a=arguments,o=a[a.length-1],s=a[0]["default"],l=a[1].get,u=(a[2].set,a[2].trySet),c=a[3].guidFor,h=a[4].Map,m=a[5].addObserver,f=a[5].removeObserver,p=a[5]._suspendObserver,d=a[6]["default"];s.LOG_BINDINGS=!1||!!s.ENV.LOG_BINDINGS;var g=/^([A-Z$]|([0-9][A-Z$]))/,v=function(e,t){this._direction="fwd",this._from=t,this._to=e,this._directionMap=h.create()};v.prototype={copy:function(){var e=new v(this._to,this._from);return this._oneWay&&(e._oneWay=!0),e},from:function(e){return this._from=e,this},to:function(e){return this._to=e,this},oneWay:function(){return this._oneWay=!0,this},toString:function(){var e=this._oneWay?"[oneWay]":"";return"Ember.Binding<"+c(this)+">("+this._from+" -> "+this._to+")"+e},connect:function(e){var r=this._from,n=this._to;return u(e,n,t(e,r)),m(e,r,this,this.fromDidChange),this._oneWay||m(e,n,this,this.toDidChange),this._readyToSync=!0,this},disconnect:function(e){var t=!this._oneWay;return f(e,this._from,this,this.fromDidChange),t&&f(e,this._to,this,this.toDidChange),this._readyToSync=!1,this},fromDidChange:function(e){this._scheduleSync(e,"fwd")},toDidChange:function(e){this._scheduleSync(e,"back")},_scheduleSync:function(e,t){var r=this._directionMap,n=r.get(e);n||(d.schedule("sync",this,this._sync,e),r.set(e,t)),"back"===n&&"fwd"===t&&r.set(e,"fwd")},_sync:function(r){var n=s.LOG_BINDINGS;if(!r.isDestroyed&&this._readyToSync){var i=this._directionMap,a=i.get(r),o=this._from,c=this._to;if(i.remove(r),"fwd"===a){var h=t(r,this._from);n&&s.Logger.log(" ",this.toString(),"->",h,r),this._oneWay?u(r,c,h):p(r,c,this,this.toDidChange,function(){u(r,c,h)})}else if("back"===a){var m=l(r,this._to);n&&s.Logger.log(" ",this.toString(),"<-",m,r),p(r,o,this,this.fromDidChange,function(){u(e(o)?s.lookup:r,o,m)})}}}},r(v,{from:function(){var e=this,t=new e;return t.from.apply(t,arguments)},to:function(){var e=this,t=new e;return t.to.apply(t,arguments)},oneWay:function(e,t){var r=this,n=new r(null,e);return n.oneWay(t)}}),o.Binding=v,o.bind=n,o.oneWay=i,o.isGlobalPath=e}),e("ember-metal/chains",["ember-metal/core","ember-metal/property_get","ember-metal/utils","ember-metal/array","ember-metal/watch_key","exports"],function(){function e(e){return e.match(y)[0]}function t(){if(0!==_.length){var e=_;_=[],p.call(e,function(e){e[0].add(e[1])}),b("Watching an undefined global, Ember expects watched globals to be setup by the time the run loop is flushed, check for typos",0===_.length)}}function r(e,t,r){if(e&&"object"==typeof e){var n=v(e),i=n.chainWatchers;n.hasOwnProperty("chainWatchers")||(i=n.chainWatchers={}),i[t]||(i[t]=[]),i[t].push(r),d(e,t,n)}}function n(e,t,r){if(e&&"object"==typeof e){var n=e[f];if(!n||n.hasOwnProperty("chainWatchers")){var i=n&&n.chainWatchers;if(i&&i[t]){i=i[t];for(var a=0,o=i.length;o>a;a++)i[a]===r&&i.splice(a,1)}g(e,t,n)}}}function i(e,t,n){this._parent=e,this._key=t,this._watching=void 0===n,this._value=n,this._paths={},this._watching&&(this._object=e.value(),this._object&&r(this._object,this._key,this)),this._parent&&"@each"===this._parent._key&&this.value()}function a(e,t){if(!e)return void 0;var r=e[f];if(r&&r.proto===e)return void 0;if("@each"===t)return c(e,t);var n=r&&r.descs[t];return n&&n._cacheable?t in r.cache?r.cache[t]:void 0:c(e,t)}function o(e){var t=e[f],r=t&&t.chains;r&&(r.value()!==e?v(e).chains=r=r.copy(e):r.didChange(null))}var s=arguments,l=s[s.length-1],u=s[0]["default"],c=s[1].get,h=s[1].normalizeTuple,m=s[2].meta,f=s[2].META_KEY,p=s[3].forEach,d=s[4].watchKey,g=s[4].unwatchKey,v=m,b=u.warn,y=/^([^\.]+)/,_=[],w=i.prototype;w.value=function(){if(void 0===this._value&&this._watching){var e=this._parent.value();this._value=a(e,this._key)}return this._value},w.destroy=function(){if(this._watching){var e=this._object;e&&n(e,this._key,this),this._watching=!1}},w.copy=function(e){var t,r=new i(null,null,e),n=this._paths;for(t in n)n[t]<=0||r.add(t);return r},w.add=function(t){var r,n,i,a,o;if(o=this._paths,o[t]=(o[t]||0)+1,r=this.value(),n=h(r,t),n[0]&&n[0]===r)t=n[1],i=e(t),t=t.slice(i.length+1);else{if(!n[0])return _.push([this,t]),n.length=0,void 0;a=n[0],i=t.slice(0,0-(n[1].length+1)),t=n[1]}n.length=0,this.chain(i,t,a)},w.remove=function(t){var r,n,i,a,o;o=this._paths,o[t]>0&&o[t]--,r=this.value(),n=h(r,t),n[0]===r?(t=n[1],i=e(t),t=t.slice(i.length+1)):(a=n[0],i=t.slice(0,0-(n[1].length+1)),t=n[1]),n.length=0,this.unchain(i,t)},w.count=0,w.chain=function(t,r,n){var a,o=this._chains;o||(o=this._chains={}),a=o[t],a||(a=o[t]=new i(this,t,n)),a.count++,r&&r.length>0&&(t=e(r),r=r.slice(t.length+1),a.chain(t,r))},w.unchain=function(t,r){var n=this._chains,i=n[t];r&&r.length>1&&(t=e(r),r=r.slice(t.length+1),i.unchain(t,r)),i.count--,i.count<=0&&(delete n[i._key],i.destroy())},w.willChange=function(e){var t=this._chains;if(t)for(var r in t)t.hasOwnProperty(r)&&t[r].willChange(e);this._parent&&this._parent.chainWillChange(this,this._key,1,e)},w.chainWillChange=function(e,t,r,n){this._key&&(t=this._key+"."+t),this._parent?this._parent.chainWillChange(this,t,r+1,n):(r>1&&n.push(this.value(),t),t="this."+t,this._paths[t]>0&&n.push(this.value(),t))},w.chainDidChange=function(e,t,r,n){this._key&&(t=this._key+"."+t),this._parent?this._parent.chainDidChange(this,t,r+1,n):(r>1&&n.push(this.value(),t),t="this."+t,this._paths[t]>0&&n.push(this.value(),t))},w.didChange=function(e){if(this._watching){var t=this._parent.value();t!==this._object&&(n(this._object,this._key,this),this._object=t,r(t,this._key,this)),this._value=void 0,this._parent&&"@each"===this._parent._key&&this.value()}var i=this._chains;if(i)for(var a in i)i.hasOwnProperty(a)&&i[a].didChange(e);null!==e&&this._parent&&this._parent.chainDidChange(this,this._key,1,e)},l.flushPendingChains=t,l.removeChainWatcher=n,l.ChainNode=i,l.finishChains=o}),e("ember-metal/computed",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/enumerable_utils","ember-metal/platform","ember-metal/watching","ember-metal/expand_properties","ember-metal/error","ember-metal/properties","ember-metal/property_events","ember-metal/is_empty","ember-metal/is_none","exports"],function(){function e(){}function t(e,t){var r=e[t];return r?e.hasOwnProperty(t)||(r=e[t]=V(r)):r=e[t]={},r}function r(e){return t(e,"deps")}function n(e,n,i,a){var o,s,l,u,c,h=e._dependentKeys;if(h)for(o=r(a),s=0,l=h.length;l>s;s++)u=h[s],c=t(o,u),c[i]=(c[i]||0)+1,_(n,u,a)}function i(e,n,i,a){var o,s,l,u,c,h=e._dependentKeys;if(h)for(o=r(a),s=0,l=h.length;l>s;s++)u=h[s],c=t(o,u),c[i]=(c[i]||0)-1,w(n,u,a)}function a(e,t){e.__ember_arity__=e.length,this.func=e,this._cacheable=t&&void 0!==t.cacheable?t.cacheable:!0,this._dependentKeys=t&&t.dependentKeys,this._readOnly=t&&(void 0!==t.readOnly||!!t.readOnly)||!1}function o(e){for(var t=0,r=e.length;r>t;t++)e[t].didChange(null)}function s(e){var t;if(arguments.length>1&&(t=N.call(arguments,0,-1),e=N.call(arguments,-1)[0]),"function"!=typeof e)throw new C("Computed Property declared without a property function");var r=new a(e);return t&&r.property.apply(r,t),r}function l(t,r){var n=t[v],i=n&&n.cache,a=i&&i[r];return a===e?void 0:a}function u(e,t){for(var r={},n=0;n<t.length;n++)r[t[n]]=p(e,t[n]);return r}function c(e,t){s[e]=function(e){var r=N.call(arguments);return s(e,function(){return t.apply(this,r)})}}function h(e,t){s[e]=function(){var e=N.call(arguments),r=s(function(){return t.apply(this,[u(this,e)])});return r.property.apply(r,e)}}var m=arguments,f=m[m.length-1],p=(m[0]["default"],m[1].get),d=m[2].set,g=m[3].meta,v=m[3].META_KEY,b=(m[3].guidFor,m[3].typeOf,m[3].inspect),y=(m[4]["default"],m[5].create),_=m[6].watch,w=m[6].unwatch,x=m[7]["default"],C=m[8]["default"],E=m[9].Descriptor,O=m[9].defineProperty,P=m[10].propertyWillChange,A=m[10].propertyDidChange,T=m[11]["default"],S=m[12].isNone,I=g,N=[].slice,V=y;a.prototype=new E;var R=a.prototype;R._dependentKeys=void 0,R._suspended=void 0,R._meta=void 0,R.cacheable=function(e){return this._cacheable=e!==!1,this},R.volatile=function(){return this.cacheable(!1)},R.readOnly=function(e){return this._readOnly=void 0===e||!!e,this},R.property=function(){var e,t=function(t){e.push(t)};e=[];for(var r=0,n=arguments.length;n>r;r++)x(arguments[r],t);return this._dependentKeys=e,this},R.meta=function(e){return 0===arguments.length?this._meta||{}:(this._meta=e,this)},R.didChange=function(e,t){if(this._cacheable&&this._suspended!==e){var r=I(e);void 0!==r.cache[t]&&(r.cache[t]=void 0,i(this,e,t,r))}},R.get=function(t,r){var i,a,s,l;if(this._cacheable){s=I(t),a=s.cache;var u=a[r];if(u===e)return void 0;if(void 0!==u)return u;i=this.func.call(t,r),a[r]=void 0===i?e:i,l=s.chainWatchers&&s.chainWatchers[r],l&&o(l),n(this,t,r,s)}else i=this.func.call(t,r);return i},R.set=function(t,r,i){var a,o,s,l=this._cacheable,u=this.func,c=I(t,l),h=this._suspended,m=!1,f=c.cache;if(this._readOnly)throw new C('Cannot set read-only property "'+r+'" on object: '+b(t));this._suspended=t;try{if(l&&void 0!==f[r]&&(o=f[r],m=!0),a=u.wrappedFunction?u.wrappedFunction.__ember_arity__:u.__ember_arity__,3===a)s=u.call(t,r,i,o);else{if(2!==a)return O(t,r,null,o),d(t,r,i),void 0;s=u.call(t,r,i)}if(m&&o===s)return;var p=c.watching[r];p&&P(t,r),m&&(f[r]=void 0),l&&(m||n(this,t,r,c),f[r]=void 0===s?e:s),p&&A(t,r)}finally{this._suspended=h}return s},R.teardown=function(e,t){var r=I(e);return t in r.cache&&i(this,e,t,r),this._cacheable&&delete r.cache[t],null},l.set=function(t,r,n){t[r]=void 0===n?e:n},l.get=function(t,r){var n=t[r];return n===e?void 0:n},l.remove=function(e,t){e[t]=void 0},s.empty=function(e){return s(e+".length",function(){return T(p(this,e))})},c("notEmpty",function(e){return!T(p(this,e))}),c("none",function(e){return S(p(this,e))}),c("not",function(e){return!p(this,e)}),c("bool",function(e){return!!p(this,e)}),c("match",function(e,t){var r=p(this,e);return"string"==typeof r?t.test(r):!1}),c("equal",function(e,t){return p(this,e)===t}),c("gt",function(e,t){return p(this,e)>t}),c("gte",function(e,t){return p(this,e)>=t}),c("lt",function(e,t){return p(this,e)<t}),c("lte",function(e,t){return p(this,e)<=t}),h("and",function(e){for(var t in e)if(e.hasOwnProperty(t)&&!e[t])return!1;return!0}),h("or",function(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!0;return!1}),h("any",function(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return e[t];return null}),h("collect",function(e){var t=[];for(var r in e)e.hasOwnProperty(r)&&(S(e[r])?t.push(null):t.push(e[r]));return t}),s.alias=function(e){return s(e,function(t,r){return arguments.length>1?(d(this,e,r),r):p(this,e)})},s.oneWay=function(e){return s(e,function(){return p(this,e)})},s.readOnly=function(e){return s(e,function(){return p(this,e)}).readOnly()},s.defaultTo=function(e){return s(function(t,r){return 1===arguments.length?p(this,e):null!=r?r:p(this,e)})},f.ComputedProperty=a,f.computed=s,f.cacheFor=l}),e("ember-metal/core",["exports"],function(){var e=arguments,t=e[e.length-1];"undefined"==typeof i&&(i={});{var r=(i.imports=i.imports||this,i.exports=i.exports||this);i.lookup=i.lookup||this}r.Em=r.Ember=i,i.isNamespace=!0,i.toString=function(){return"Ember"},i.VERSION="1.6.0-beta.5+pre.34d5fca1",i.ENV||(i.ENV="undefined"!=typeof EmberENV?EmberENV:"undefined"!=typeof ENV?ENV:{}),i.config=i.config||{},"undefined"==typeof i.ENV.DISABLE_RANGE_API&&(i.ENV.DISABLE_RANGE_API=!0),"undefined"==typeof MetamorphENV&&(r.MetamorphENV={}),MetamorphENV.DISABLE_RANGE_API=i.ENV.DISABLE_RANGE_API,i.FEATURES=i.ENV.FEATURES||{},i.FEATURES.isEnabled=function(e){var t=i.FEATURES[e];return i.ENV.ENABLE_ALL_FEATURES?!0:t===!0||t===!1||void 0===t?t:i.ENV.ENABLE_OPTIONAL_FEATURES?!0:!1},i.EXTEND_PROTOTYPES=i.ENV.EXTEND_PROTOTYPES,"undefined"==typeof i.EXTEND_PROTOTYPES&&(i.EXTEND_PROTOTYPES=!0),i.LOG_STACKTRACE_ON_DEPRECATION=i.ENV.LOG_STACKTRACE_ON_DEPRECATION!==!1,i.SHIM_ES5=i.ENV.SHIM_ES5===!1?!1:i.EXTEND_PROTOTYPES,i.LOG_VERSION=i.ENV.LOG_VERSION===!1?!1:!0,i.K=function(){return this},"undefined"==typeof i.assert&&(i.assert=i.K),"undefined"==typeof i.warn&&(i.warn=i.K),"undefined"==typeof i.debug&&(i.debug=i.K),"undefined"==typeof i.runInDebug&&(i.runInDebug=i.K),"undefined"==typeof i.deprecate&&(i.deprecate=i.K),"undefined"==typeof i.deprecateFunc&&(i.deprecateFunc=function(e,t){return t}),i.uuid=0,t["default"]=i}),e("ember-metal/enumerable_utils",["ember-metal/array","exports"],function(){var e,t,r,n,i,a=arguments,o=a[a.length-1],e=a[0].map,t=a[0].forEach,r=a[0].indexOf,i=a[0].filter;e=Array.prototype.map||e,t=Array.prototype.forEach||t,r=Array.prototype.indexOf||r,i=Array.prototype.filter||i,n=Array.prototype.splice;var s={map:function(t,r,n){return t.map?t.map.call(t,r,n):e.call(t,r,n)},forEach:function(e,r,n){return e.forEach?e.forEach.call(e,r,n):t.call(e,r,n)},filter:function(e,t,r){return e.filter?e.filter.call(e,t,r):i.call(e,t,r)},indexOf:function(e,t,n){return e.indexOf?e.indexOf.call(e,t,n):r.call(e,t,n)},indexesOf:function(e,t){return void 0===t?[]:s.map(t,function(t){return s.indexOf(e,t)})},addObject:function(e,t){var r=s.indexOf(e,t);-1===r&&e.push(t)},removeObject:function(e,t){var r=s.indexOf(e,t);-1!==r&&e.splice(r,1)},_replace:function(e,t,r,i){for(var a,o,s=[].concat(i),l=[],u=6e4,c=t,h=r;s.length;)o=h>u?u:h,0>=o&&(o=0),a=s.splice(0,u),a=[c,o].concat(a),c+=u,h-=o,l=l.concat(n.apply(e,a));return l},replace:function(e,t,r,n){return e.replace?e.replace(t,r,n):s._replace(e,t,r,n)},intersection:function(e,t){var r=[];return s.forEach(e,function(e){s.indexOf(t,e)>=0&&r.push(e)}),r}};o["default"]=s}),e("ember-metal/error",["ember-metal/platform","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].create,n=["description","fileName","lineNumber","message","name","number","stack"],a=function(){var e=Error.apply(this,arguments);Error.captureStackTrace&&Error.captureStackTrace(this,i.Error);for(var t=0;t<n.length;t++)this[n[t]]=e[n[t]]};a.prototype=r(Error.prototype),t["default"]=a}),e("ember-metal/events",["ember-metal/core","ember-metal/utils","ember-metal/platform","exports"],function(){function e(e,t,r){for(var n=-1,i=e.length-3;i>=0;i-=3)if(t===e[i]&&r===e[i+1]){n=i;break}return n}function t(e,t){var r,n=C(e,!0);return n.listeners||(n.listeners={}),n.hasOwnProperty("listeners")||(n.listeners=w(n.listeners)),r=n.listeners[t],r&&!n.listeners.hasOwnProperty(t)?r=n.listeners[t]=n.listeners[t].slice():r||(r=n.listeners[t]=[]),r}function r(t,r,n){var i=t[v],a=i&&i.listeners&&i.listeners[r];if(a)for(var o=a.length-3;o>=0;o-=3){var s=a[o],l=a[o+1],u=a[o+2],c=e(n,s,l);-1===c&&n.push(s,l,u)}}function n(t,r,n){var i=t[v],a=i&&i.listeners&&i.listeners[r],o=[];if(a){for(var s=a.length-3;s>=0;s-=3){var l=a[s],u=a[s+1],c=a[s+2],h=e(n,l,u);-1===h&&(n.push(l,u,c),o.push(l,u,c))}return o}}function i(r,n,i,a,o){a||"function"!=typeof i||(a=i,i=null);var s=t(r,n),l=e(s,i,a),u=0;o&&(u|=E),-1===l&&(s.push(i,a,u),"function"==typeof r.didAddListener&&r.didAddListener(n,i,a))}function a(r,n,i,a){function o(i,a){var o=t(r,n),s=e(o,i,a);-1!==s&&(o.splice(s,3),"function"==typeof r.didRemoveListener&&r.didRemoveListener(n,i,a))}if(a||"function"!=typeof i||(a=i,i=null),a)o(i,a);else{var s=r[v],l=s&&s.listeners&&s.listeners[n];if(!l)return;for(var u=l.length-3;u>=0;u-=3)o(l[u],l[u+1])}}function o(r,n,i,a,o){function s(){return o.call(i)}function l(){-1!==c&&(u[c+2]&=~O)}a||"function"!=typeof i||(a=i,i=null);var u=t(r,n),c=e(u,i,a);return-1!==c&&(u[c+2]|=O),b(s,l)}function s(r,n,i,a,o){function s(){return o.call(i)}function l(){for(var e=0,t=f.length;t>e;e++){var r=f[e];p[e][r+2]&=~O}}a||"function"!=typeof i||(a=i,i=null);var u,c,h,m,f=[],p=[];for(h=0,m=n.length;m>h;h++){u=n[h],c=t(r,u);var d=e(c,i,a);-1!==d&&(c[d+2]|=O,f.push(d),p.push(c))}return b(s,l)}function l(e){var t=e[v].listeners,r=[];if(t)for(var n in t)t[n]&&r.push(n);return r}function u(e,t,r,n){if(e!==d&&"function"==typeof e.sendEvent&&e.sendEvent(t,r),!n){var i=e[v];n=i&&i.listeners&&i.listeners[t]}if(n){for(var o=n.length-3;o>=0;o-=3){var s=n[o],l=n[o+1],u=n[o+2];l&&(u&O||(u&E&&a(e,t,s,l),s||(s=e),"string"==typeof l?r?_(s,l,r):s[l]():r?y(s,l,r):l.call(s)))}return!0}}function c(e,t){var r=e[v],n=r&&r.listeners&&r.listeners[t];return!(!n||!n.length)}function h(e,t){var r=[],n=e[v],i=n&&n.listeners&&n.listeners[t];if(!i)return r;for(var a=0,o=i.length;o>a;a+=3){var s=i[a],l=i[a+1];r.push([s,l])}return r}function m(){var e=x.call(arguments,-1)[0],t=x.call(arguments,0,-1);return e.__ember_listens__=t,e}var f=arguments,p=f[f.length-1],d=f[0]["default"],g=f[1].meta,v=f[1].META_KEY,b=f[1].tryFinally,y=f[1].apply,_=f[1].applyStr,w=f[2].create,x=[].slice,C=g,E=1,O=2;p.on=m,p.addListener=i,p.removeListener=a,p.suspendListener=o,p.suspendListeners=s,p.sendEvent=u,p.hasListeners=c,p.watchedEvents=l,p.listenersFor=h,p.listenersDiff=n,p.listenersUnion=r}),e("ember-metal/expand_properties",["ember-metal/error","ember-metal/enumerable_utils","exports"],function(){function e(e,t){var r,i,s;if(e.indexOf(" ")>-1)throw new n("Brace expanded properties cannot contain spaces, e.g. `user.{firstName, lastName}` should be `user.{firstName,lastName}`");(r=o.exec(e))?(i=r[1],s=r[2],a(s.split(","),function(e){t(i+e)})):t(e)}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=t[1]["default"],a=i.forEach,o=/^((?:[^\.]*\.)*)\{(.*)\}$/;r["default"]=e}),e("ember-metal/get_properties",["ember-metal/property_get","ember-metal/utils","exports"],function(){function e(e){var t={},r=arguments,a=1;2===arguments.length&&"array"===i(arguments[1])&&(a=0,r=arguments[1]);for(var o=r.length;o>a;a++)t[r[a]]=n(e,r[a]);return t}var t=arguments,r=t[t.length-1],n=t[0].get,i=t[1].typeOf;r["default"]=e}),e("ember-metal/instrumentation",["ember-metal/core","ember-metal/utils","exports"],function(){function e(e,t,r,n){function i(){for(g=0,v=p.length;v>g;g++)d=p[g],b[g]=d.before(e,h(),t);return r.call(n)}function a(e){t=t||{},t.exception=e}function l(){for(g=0,v=p.length;v>g;g++)d=p[g],d.after(e,h(),t,b[g]);o.STRUCTURED_PROFILE&&console.timeEnd(m)}var m,f,p=u[e];if(o.STRUCTURED_PROFILE&&(m=e+": "+t.object,console.time(m)),p||(p=c(e)),0===p.length)return f=r.call(n),o.STRUCTURED_PROFILE&&console.timeEnd(m),f;var d,g,v,b=[];return s(i,a,l)}function t(e,t){for(var r,n=e.split("."),i=[],a=0,o=n.length;o>a;a++)r=n[a],"*"===r?i.push("[^\\.]*"):i.push(r);i=i.join("\\."),i+="(\\..*)?";var s={pattern:e,regex:new RegExp("^"+i+"$"),object:t};return l.push(s),u={},s}function r(e){for(var t,r=0,n=l.length;n>r;r++)l[r]===e&&(t=r);l.splice(t,1),u={}}function n(){l=[],u={}}var i=arguments,a=i[i.length-1],o=i[0]["default"],s=i[1].tryCatchFinally,l=[],u={},c=function(e){for(var t,r=[],n=0,i=l.length;i>n;n++)t=l[n],t.regex.test(e)&&r.push(t.object);return u[e]=r,r},h=function(){var e="undefined"!=typeof window?window.performance||{}:{},t=e.now||e.mozNow||e.webkitNow||e.msNow||e.oNow;return t?t.bind(e):function(){return+new Date}}();a.instrument=e,a.subscribe=t,a.unsubscribe=r,a.reset=n}),e("ember-metal/is_blank",["ember-metal/core","ember-metal/is_empty","exports"],function(){function e(e){return n(e)||"string"==typeof e&&null===e.match(/\S/)}var t=arguments,r=t[t.length-1],n=(t[0]["default"],t[1]["default"]);r["default"]=e}),e("ember-metal/is_empty",["ember-metal/core","ember-metal/property_get","ember-metal/is_none","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=e[2]["default"],a=function(e){return i(e)||0===e.length&&"function"!=typeof e||"object"==typeof e&&0===n(e,"length")},o=r.deprecateFunc("Ember.empty is deprecated. Please use Ember.isEmpty instead.",a);t["default"]=a,t.isEmpty=a,t.empty=o}),e("ember-metal/is_none",["ember-metal/core","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=function(e){return null===e||void 0===e},i=r.deprecateFunc("Ember.none is deprecated. Please use Ember.isNone instead.",n);t["default"]=n,t.isNone=n,t.none=i}),e("ember-metal/libraries",["ember-metal/enumerable_utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=r.forEach,i=r.indexOf,a=function(){var e=[],t=0,r=function(t){for(var r=0;r<e.length;r++)if(e[r].name===t)return e[r]};return e.register=function(t,n){r(t)||e.push({name:t,version:n})},e.registerCoreLibrary=function(n,i){r(n)||e.splice(t++,0,{name:n,version:i})},e.deRegister=function(t){var n=r(t);n&&e.splice(i(e,n),1)},e.each=function(t){n(e,function(e){t(e.name,e.version)})},e}();t["default"]=a}),e("ember-metal/logger",["ember-metal/core","ember-metal/error","exports"],function(){function e(e){var t,r;i.imports.console?t=i.imports.console:"undefined"!=typeof console&&(t=console);var n="object"==typeof t?t[e]:null;return n?"function"==typeof n.apply?(r=function(){n.apply(t,arguments)},r.displayName="console."+e,r):function(){var e=Array.prototype.join.call(arguments,", ");n(e)}:void 0}function t(e,t){if(!e)try{throw new a("assertion failed: "+t)}catch(r){setTimeout(function(){throw r},0)}}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1]["default"],o={log:e("log")||i.K,warn:e("warn")||i.K,error:e("error")||i.K,info:e("info")||i.K,debug:e("debug")||e("info")||i.K,assert:e("assert")||t};n["default"]=o}),e("ember-metal",["ember-metal/core","ember-metal/merge","ember-metal/instrumentation","ember-metal/utils","ember-metal/error","ember-metal/enumerable_utils","ember-metal/platform","ember-metal/array","ember-metal/logger","ember-metal/property_get","ember-metal/events","ember-metal/observer_set","ember-metal/property_events","ember-metal/properties","ember-metal/property_set","ember-metal/map","ember-metal/get_properties","ember-metal/set_properties","ember-metal/watch_key","ember-metal/chains","ember-metal/watch_path","ember-metal/watching","ember-metal/expand_properties","ember-metal/computed","ember-metal/observer","ember-metal/mixin","ember-metal/binding","ember-metal/run_loop","ember-metal/libraries","ember-metal/is_none","ember-metal/is_empty","ember-metal/is_blank","exports"],function(){var e=arguments,r=e[e.length-1],n=i.Instrumentation={};n.instrument=e[2].instrument,n.subscribe=e[2].subscribe,n.unsubscribe=e[2].unsubscribe,n.reset=e[2].reset,i.instrument=e[2].instrument,i.subscribe=e[2].subscribe,i.generateGuid=e[3].generateGuid,i.GUID_KEY=e[3].GUID_KEY,i.GUID_PREFIX=e[3].GUID_PREFIX,i.create=e[6].create,i.platform=e[6].platform;var a=i.ArrayPolyfills={};a.map=e[7].map,a.forEach=e[7].forEach,a.filter=e[7].filter,a.indexOf=e[7].indexOf,i.Error=e[4]["default"],i.guidFor=e[3].guidFor,i.META_DESC=e[3].META_DESC,i.EMPTY_META=e[3].EMPTY_META,i.meta=e[3].meta,i.getMeta=e[3].getMeta,i.setMeta=e[3].setMeta,i.metaPath=e[3].metaPath,i.inspect=e[3].inspect,i.typeOf=e[3].typeOf,i.tryCatchFinally=e[3].tryCatchFinally,i.isArray=e[3].isArray,i.makeArray=e[3].makeArray,i.canInvoke=e[3].canInvoke,i.tryInvoke=e[3].tryInvoke,i.tryFinally=e[3].tryFinally,i.wrap=e[3].wrap,i.apply=e[3].apply,i.applyStr=e[3].applyStr,i.Logger=e[8]["default"],i.get=e[9].get,i.getWithDefault=e[9].getWithDefault,i.normalizeTuple=e[9].normalizeTuple,i._getPath=e[9]._getPath,i.EnumerableUtils=e[5]["default"],i.on=e[10].on,i.addListener=e[10].addListener,i.removeListener=e[10].removeListener,i._suspendListener=e[10].suspendListener,i._suspendListeners=e[10].suspendListeners,i.sendEvent=e[10].sendEvent,i.hasListeners=e[10].hasListeners,i.watchedEvents=e[10].watchedEvents,i.listenersFor=e[10].listenersFor,i.listenersDiff=e[10].listenersDiff,i.listenersUnion=e[10].listenersUnion,i._ObserverSet=e[11]["default"],i.propertyWillChange=e[12].propertyWillChange,i.propertyDidChange=e[12].propertyDidChange,i.overrideChains=e[12].overrideChains,i.beginPropertyChanges=e[12].beginPropertyChanges,i.endPropertyChanges=e[12].endPropertyChanges,i.changeProperties=e[12].changeProperties,i.Descriptor=e[13].Descriptor,i.defineProperty=e[13].defineProperty,i.set=e[14].set,i.trySet=e[14].trySet,i.OrderedSet=e[15].OrderedSet,i.Map=e[15].Map,i.MapWithDefault=e[15].MapWithDefault,i.getProperties=e[16]["default"],i.setProperties=e[17]["default"],i.watchKey=e[18].watchKey,i.unwatchKey=e[18].unwatchKey,i.flushPendingChains=e[19].flushPendingChains,i.removeChainWatcher=e[19].removeChainWatcher,i._ChainNode=e[19].ChainNode,i.finishChains=e[19].finishChains,i.watchPath=e[20].watchPath,i.unwatchPath=e[20].unwatchPath,i.watch=e[21].watch,i.isWatching=e[21].isWatching,i.unwatch=e[21].unwatch,i.rewatch=e[21].rewatch,i.destroy=e[21].destroy,i.expandProperties=e[22]["default"],i.ComputedProperty=e[23].ComputedProperty,i.computed=e[23].computed,i.cacheFor=e[23].cacheFor,i.addObserver=e[24].addObserver,i.observersFor=e[24].observersFor,i.removeObserver=e[24].removeObserver,i.addBeforeObserver=e[24].addBeforeObserver,i._suspendBeforeObserver=e[24]._suspendBeforeObserver,i._suspendBeforeObservers=e[24]._suspendBeforeObservers,i._suspendObserver=e[24]._suspendObserver,i._suspendObservers=e[24]._suspendObservers,i.beforeObserversFor=e[24].beforeObserversFor,i.removeBeforeObserver=e[24].removeBeforeObserver,i.IS_BINDING=e[25].IS_BINDING,i.required=e[25].required,i.aliasMethod=e[25].aliasMethod,i.observer=e[25].observer,i.immediateObserver=e[25].immediateObserver,i.beforeObserver=e[25].beforeObserver,i.mixin=e[25].mixin,i.Mixin=e[25].Mixin,i.oneWay=e[26].oneWay,i.bind=e[26].bind,i.Binding=e[26].Binding,i.isGlobalPath=e[26].isGlobalPath,i.run=e[27]["default"],i.libraries=e[28]["default"],i.libraries.registerCoreLibrary("Ember",i.VERSION),i.isNone=e[29].isNone,i.none=e[29].none,i.isEmpty=e[30].isEmpty,i.empty=e[30].empty,i.isBlank=e[31]["default"],i.merge=e[1]["default"],i.onerror=null,i.__loader.registry["ember-debug"]&&t("ember-debug"),r["default"]=i}),e("ember-metal/map",["ember-metal/property_set","ember-metal/utils","ember-metal/array","ember-metal/platform","exports"],function(){function e(){this.clear()}function t(e){h.call(this),this.defaultValue=e.defaultValue}var r=arguments,n=r[r.length-1],a=r[0].set,o=r[1].guidFor,s=r[2].indexOf,l=r[3].create,u=function(e){var t={};for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);return t},c=function(e,t){var r=e.keys.copy(),n=u(e.values);return t.keys=r,t.values=n,t.length=e.length,t};e.create=function(){return new e},e.prototype={clear:function(){this.presenceSet={},this.list=[]},add:function(e){var t=o(e),r=this.presenceSet,n=this.list;t in r||(r[t]=!0,n.push(e))},remove:function(e){var t=o(e),r=this.presenceSet,n=this.list;delete r[t];var i=s.call(n,e);i>-1&&n.splice(i,1)},isEmpty:function(){return 0===this.list.length},has:function(e){var t=o(e),r=this.presenceSet;return t in r},forEach:function(e,t){for(var r=this.toArray(),n=0,i=r.length;i>n;n++)e.call(t,r[n])},toArray:function(){return this.list.slice()},copy:function(){var t=new e;return t.presenceSet=u(this.presenceSet),t.list=this.toArray(),t}};var h=i.Map=function(){this.keys=e.create(),this.values={}};h.create=function(){return new h},h.prototype={length:0,get:function(e){var t=this.values,r=o(e);return t[r]},set:function(e,t){var r=this.keys,n=this.values,i=o(e);r.add(e),n[i]=t,a(this,"length",r.list.length)},remove:function(e){var t=this.keys,r=this.values,n=o(e);return r.hasOwnProperty(n)?(t.remove(e),delete r[n],a(this,"length",t.list.length),!0):!1},has:function(e){var t=this.values,r=o(e);return t.hasOwnProperty(r)},forEach:function(e,t){var r=this.keys,n=this.values;r.forEach(function(r){var i=o(r);e.call(t,r,n[i])})},copy:function(){return c(this,new h)}},t.create=function(e){return e?new t(e):new h},t.prototype=l(h.prototype),t.prototype.get=function(e){var t=this.has(e);if(t)return h.prototype.get.call(this,e);var r=this.defaultValue(e);return this.set(e,r),r},t.prototype.copy=function(){return c(this,new t({defaultValue:this.defaultValue}))},n.OrderedSet=e,n.Map=h,n.MapWithDefault=t}),e("ember-metal/merge",["exports"],function(){function e(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e}var t=arguments,r=t[t.length-1];r["default"]=e}),e("ember-metal/mixin",["ember-metal/core","ember-metal/merge","ember-metal/array","ember-metal/platform","ember-metal/utils","ember-metal/expand_properties","ember-metal/properties","ember-metal/computed","ember-metal/binding","ember-metal/observer","ember-metal/events","exports"],function(){function e(){var e,t=this.__nextSuper;return t&&(this.__nextSuper=null,e=U(this,t,arguments),this.__nextSuper=t),e}function t(e){var t=ot(e,!0),r=t.mixins;return r?t.hasOwnProperty("mixins")||(r=t.mixins=at(r)):r=t.mixins={},r}function r(e,t){return t&&t.length>0&&(e.mixins=tt.call(t,function(e){if(e instanceof _)return e;var t=new _;return t.properties=e,t})),e}function n(e){return"function"==typeof e&&e.isMethod!==!1&&e!==Boolean&&e!==Object&&e!==Number&&e!==Array&&e!==Date&&e!==String}function i(e,t){var r;return t instanceof _?(r=L(t),e[r]?st:(e[r]=t,t.properties)):t}function a(e,t,r,n){var i;return i=r[e]||n[e],t[e]&&(i=i?i.concat(t[e]):t[e]),i}function o(e,t,r,n,i){var a;return void 0===n[t]&&(a=i[t]),a=a||e.descs[t],a&&a instanceof G?(r=at(r),r.func=F(r.func,a.func),r):r}function s(e,t,r,n,i){var a;return void 0===i[t]&&(a=n[t]),a=a||e[t],"function"!=typeof a?r:F(r,a)}function l(e,t,r,n){var i=n[t]||e[t];return i?"function"==typeof i.concat?i.concat(r):z(i).concat(r):z(r)}function u(t,r,i,a){var o=a[r]||t[r];if(!o)return i;var l=R({},o),u=!1;for(var c in i)if(i.hasOwnProperty(c)){var h=i[c];n(h)?(u=!0,l[c]=s(t,c,h,o,{})):l[c]=h}return u&&(l._super=e),l}function c(e,t,r,i,a,c,h,m){if(r instanceof K){if(r===T&&a[t])return st;r.func&&(r=o(i,t,r,c,a)),a[t]=r,c[t]=void 0}else h&&rt.call(h,t)>=0||"concatenatedProperties"===t||"mergedProperties"===t?r=l(e,t,r,c):m&&rt.call(m,t)>=0?r=u(e,t,r,c):n(r)&&(r=s(e,t,r,c,a)),a[t]=void 0,c[t]=r}function h(e,t,r,n,o,s){function l(e){delete r[e],delete n[e]}for(var u,m,f,p,d,g,v=0,b=e.length;b>v;v++)if(u=e[v],m=i(t,u),m!==st)if(m){g=ot(o),o.willMergeMixin&&o.willMergeMixin(m),p=a("concatenatedProperties",m,n,o),d=a("mergedProperties",m,n,o);for(f in m)m.hasOwnProperty(f)&&(s.push(f),c(o,f,m[f],g,r,n,p,d));m.hasOwnProperty("toString")&&(o.toString=m.toString)}else u.mixins&&(h(u.mixins,t,r,n,o,s),u._without&&nt.call(u._without,l))}function m(e,t,r,n){if(lt.test(t)){var i=n.bindings;i?n.hasOwnProperty("bindings")||(i=n.bindings=at(n.bindings)):i=n.bindings={},i[t]=r}}function f(e,t){var r,n,i,a=t.bindings;if(a){for(r in a)n=a[r],n&&(i=r.slice(0,-7),n instanceof Y?(n=n.copy(),n.to(i)):n=new Y(i,n),n.connect(e),e[r]=n);t.bindings={}}}function p(e,t){return f(e,t||ot(e)),e}function d(e,t,r,n,i){var a,o=t.methodName;return n[o]||i[o]?(a=i[o],t=n[o]):r.descs[o]?(t=r.descs[o],a=void 0):(t=void 0,a=e[o]),{desc:t,value:a}
}function g(e,t,r,n,i){var a=r[n];if(a)for(var o=0,s=a.length;s>o;o++)i(e,a[o],null,t)}function v(e,t,r){var n=e[t];"function"==typeof n&&(g(e,t,n,"__ember_observesBefore__",X),g(e,t,n,"__ember_observes__",Q),g(e,t,n,"__ember_listens__",et)),"function"==typeof r&&(g(e,t,r,"__ember_observesBefore__",J),g(e,t,r,"__ember_observes__",$),g(e,t,r,"__ember_listens__",Z))}function b(r,n,i){var a,o,s,l={},u={},c=ot(r),f=[];r._super=e,h(n,t(r),l,u,r,f);for(var g=0,b=f.length;b>g;g++)if(a=f[g],"constructor"!==a&&u.hasOwnProperty(a)&&(s=l[a],o=u[a],s!==T)){for(;s&&s instanceof S;){var y=d(r,s,c,l,u);s=y.desc,o=y.value}(void 0!==s||void 0!==o)&&(v(r,a,o),m(r,a,o,c),W(r,a,s,o,c))}return i||p(r,c),r}function y(e){var t=it.call(arguments,1);return b(e,t,!1),e}function _(){return r(this,arguments)}function w(e,t,r){var n=L(e);if(r[n])return!1;if(r[n]=!0,e===t)return!0;for(var i=e.mixins,a=i?i.length:0;--a>=0;)if(w(i[a],t,r))return!0;return!1}function x(e,t,r){if(!r[L(t)])if(r[L(t)]=!0,t.properties){var n=t.properties;for(var i in n)n.hasOwnProperty(i)&&(e[i]=!0)}else t.mixins&&nt.call(t.mixins,function(t){x(e,t,r)})}function C(){return T}function E(e){return new S(e)}function O(){var e,t=it.call(arguments,-1)[0],r=function(t){e.push(t)},n=it.call(arguments,0,-1);"function"!=typeof t&&(t=arguments[0],n=it.call(arguments,1)),e=[];for(var i=0;i<n.length;++i)q(n[i],r);if("function"!=typeof t)throw new V.Error("Ember.observer called without a function");return t.__ember_observes__=e,t}function P(){for(var e=0,t=arguments.length;t>e;e++){arguments[e]}return O.apply(this,arguments)}function A(){var e,t=it.call(arguments,-1)[0],r=function(t){e.push(t)},n=it.call(arguments,0,-1);"function"!=typeof t&&(t=arguments[0],n=it.call(arguments,1)),e=[];for(var i=0;i<n.length;++i)q(n[i],r);if("function"!=typeof t)throw new V.Error("Ember.beforeObserver called without a function");return t.__ember_observesBefore__=e,t}var T,S,I=arguments,N=I[I.length-1],V=I[0]["default"],R=I[1]["default"],k=I[2].map,D=I[2].indexOf,j=I[2].forEach,M=I[3].create,L=I[4].guidFor,H=I[4].meta,B=I[4].META_KEY,F=I[4].wrap,z=I[4].makeArray,U=I[4].apply,q=I[5]["default"],K=I[6].Descriptor,W=I[6].defineProperty,G=I[7].ComputedProperty,Y=I[8].Binding,$=I[9].addObserver,Q=I[9].removeObserver,J=I[9].addBeforeObserver,X=I[9].removeBeforeObserver,Z=I[10].addListener,et=I[10].removeListener,tt=k,rt=D,nt=j,it=[].slice,at=M,W=W,ot=H,st={},lt=/^.+Binding$/;_.prototype={properties:null,mixins:null,ownerConstructor:null},_._apply=b,_.applyPartial=function(e){var t=it.call(arguments,1);return b(e,t,!0)},_.finishPartial=p,V.anyUnprocessedMixins=!1,_.create=function(){V.anyUnprocessedMixins=!0;var e=this;return r(new e,arguments)};var ut=_.prototype;ut.reopen=function(){var e,t;this.properties?(e=_.create(),e.properties=this.properties,delete this.properties,this.mixins=[e]):this.mixins||(this.mixins=[]);var r,n=arguments.length,i=this.mixins;for(r=0;n>r;r++)e=arguments[r],e instanceof _?i.push(e):(t=_.create(),t.properties=e,i.push(t));return this},ut.apply=function(e){return b(e,[this],!1)},ut.applyPartial=function(e){return b(e,[this],!0)},ut.detect=function(e){if(!e)return!1;if(e instanceof _)return w(e,this,{});var t=e[B],r=t&&t.mixins;return r?!!r[L(this)]:!1},ut.without=function(){var e=new _(this);return e._without=it.call(arguments),e},ut.keys=function(){var e={},t={},r=[];x(e,this,t);for(var n in e)e.hasOwnProperty(n)&&r.push(n);return r},_.mixins=function(e){var t=e[B],r=t&&t.mixins,n=[];if(!r)return n;for(var i in r){var a=r[i];a.properties||n.push(a)}return n},T=new K,T.toString=function(){return"(Required Property)"},S=function(e){this.methodName=e},S.prototype=new K,N.IS_BINDING=lt,N.mixin=y,N.Mixin=_,N.required=C,N.aliasMethod=E,N.observer=O,N.immediateObserver=P,N.beforeObserver=A}),e("ember-metal/observer",["ember-metal/watching","ember-metal/array","ember-metal/events","exports"],function(){function e(e){return e+x}function t(e){return e+C}function r(t,r,n,i){return b(t,e(r),n,i),p(t,r),this}function n(t,r){return v(t,e(r))}function i(t,r,n,i){return d(t,r),y(t,e(r),n,i),this}function a(e,r,n,i){return b(e,t(r),n,i),p(e,r),this}function o(e,r,n,i,a){return w(e,t(r),n,i,a)}function s(t,r,n,i,a){return w(t,e(r),n,i,a)}function l(e,r,n,i,a){var o=g.call(r,t);return _(e,o,n,i,a)}function u(t,r,n,i,a){var o=g.call(r,e);return _(t,o,n,i,a)}function c(e,r){return v(e,t(r))}function h(e,r,n,i){return d(e,r),y(e,t(r),n,i),this}var m=arguments,f=m[m.length-1],p=m[0].watch,d=m[0].unwatch,g=m[1].map,v=m[2].listenersFor,b=m[2].addListener,y=m[2].removeListener,_=m[2].suspendListeners,w=m[2].suspendListener,x=":change",C=":before";f.addObserver=r,f.observersFor=n,f.removeObserver=i,f.addBeforeObserver=a,f._suspendBeforeObserver=o,f._suspendObserver=s,f._suspendBeforeObservers=l,f._suspendObservers=u,f.beforeObserversFor=c,f.removeBeforeObserver=h}),e("ember-metal/observer_set",["ember-metal/utils","ember-metal/events","exports"],function(){function e(){this.clear()}var t=arguments,r=t[t.length-1],n=t[0].guidFor,i=t[1].sendEvent;e.prototype.add=function(e,t,r){var i,a=this.observerSet,o=this.observers,s=n(e),l=a[s];return l||(a[s]=l={}),i=l[t],void 0===i&&(i=o.push({sender:e,keyName:t,eventName:r,listeners:[]})-1,l[t]=i),o[i].listeners},e.prototype.flush=function(){var e,t,r,n,a=this.observers;for(this.clear(),e=0,t=a.length;t>e;++e)r=a[e],n=r.sender,n.isDestroying||n.isDestroyed||i(n,r.eventName,[n,r.keyName],r.listeners)},e.prototype.clear=function(){this.observerSet={},this.observers=[]},r["default"]=e}),e("ember-metal/platform",["ember-metal/core","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n={},i=Object.create;if(i&&2!==i({a:1},{a:{value:2}}).a&&(i=null),!i||r.ENV.STUB_OBJECT_CREATE){var a=function(){};i=function(e,t){if(a.prototype=e,e=new a,t){a.prototype=e;for(var r in t)a.prototype[r]=t[r].value;e=new a}return a.prototype=null,e},i.isSimulated=!0}var o,s,l=Object.defineProperty;if(l)try{l({},"a",{get:function(){}})}catch(u){l=null}l&&(o=function(){var e={};return l(e,"a",{configurable:!0,enumerable:!0,get:function(){},set:function(){}}),l(e,"a",{configurable:!0,enumerable:!0,writable:!0,value:!0}),e.a===!0}(),s=function(){try{return l(document.createElement("div"),"definePropertyOnDOM",{}),!0}catch(e){}return!1}(),o?s||(l=function(e,t,r){var n;return n="object"==typeof Node?e instanceof Node:"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName,n?e[t]=r.value:Object.defineProperty(e,t,r)}):l=null),n.defineProperty=l,n.hasPropertyAccessors=!0,n.defineProperty||(n.hasPropertyAccessors=!1,n.defineProperty=function(e,t,r){r.get||(e[t]=r.value)},n.defineProperty.isSimulated=!0),r.ENV.MANDATORY_SETTER&&!n.hasPropertyAccessors&&(r.ENV.MANDATORY_SETTER=!1),t.create=i,t.platform=n}),e("ember-metal/properties",["ember-metal/core","ember-metal/utils","ember-metal/platform","ember-metal/property_events","exports"],function(){function e(){}function t(t,r,n,i,a){var o,s,p,d;return a||(a=u(t)),o=a.descs,s=a.descs[r],p=a.watching[r]>0,s instanceof e&&s.teardown(t,r),n instanceof e?(d=n,o[r]=n,h&&p?c(t,r,{configurable:!0,enumerable:!0,writable:!0,value:void 0}):t[r]=void 0):(o[r]=void 0,null==n?(d=i,h&&p?(a.values[r]=i,c(t,r,{configurable:!0,enumerable:!0,set:m,get:f(r)})):t[r]=i):(d=n,c(t,r,n))),p&&l(t,r,a),t.didDefineProperty&&t.didDefineProperty(t,r,d),this}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1].META_KEY,o=r[1].meta,s=r[2].platform,l=r[3].overrideChains,u=o,c=s.defineProperty,h=i.ENV.MANDATORY_SETTER,m=i.MANDATORY_SETTER_FUNCTION=function(){},f=i.DEFAULT_GETTER_FUNCTION=function(e){return function(){var t=this[a];return t&&t.values[e]}};n.Descriptor=e,n.defineProperty=t}),e("ember-metal/property_events",["ember-metal/utils","ember-metal/events","ember-metal/observer_set","exports"],function(){function e(e,t){var n=e[v],i=n&&n.watching[t]>0||"length"===t,o=n&&n.proto,s=n&&n.descs[t];i&&o!==e&&(s&&s.willChange&&s.willChange(e,t),r(e,t,n),a(e,t,n),h(e,t))}function t(e,t){var r=e[v],i=r&&r.watching[t]>0||"length"===t,a=r&&r.proto,s=r&&r.descs[t];a!==e&&(s&&s.didChange&&s.didChange(e,t),(i||"length"===t)&&(n(e,t,r),o(e,t,r,!1),m(e,t)))}function r(t,r,n){if(!t.isDestroying){var a=f,o=!a;o&&(a=f={}),i(e,t,r,a,n),o&&(f=null)}}function n(e,r,n){if(!e.isDestroying){var a=p,o=!a;o&&(a=p={}),i(t,e,r,a,n),o&&(p=null)}}function i(e,t,r,n,i){var a=b(t);if(n[a]||(n[a]={}),!n[a][r]){n[a][r]=!0;var o=i.deps;if(o=o&&o[r])for(var s in o){var l=i.descs[s];l&&l._suspended===t||e(t,s)}}}function a(t,r,n){if(n.hasOwnProperty("chainWatchers")&&n.chainWatchers[r]){var i,a,o=n.chainWatchers[r],s=[];for(i=0,a=o.length;a>i;i++)o[i].willChange(s);for(i=0,a=s.length;a>i;i+=2)e(s[i],s[i+1])}}function o(e,r,n,i){if(n&&n.hasOwnProperty("chainWatchers")&&n.chainWatchers[r]){var a,o,s=n.chainWatchers[r],l=i?null:[];for(a=0,o=s.length;o>a;a++)s[a].didChange(l);if(!i)for(a=0,o=l.length;o>a;a+=2)t(l[a],l[a+1])}}function s(e,t,r){o(e,t,r,!0)}function l(){P++}function u(){P--,0>=P&&(E.clear(),O.flush())}function c(e,t){l(),y(e,u,t)}function h(e,t){if(!e.isDestroying){var r,n,i=t+":before";P?(r=E.add(e,t,i),n=x(e,i,r),_(e,i,[e,t],n)):_(e,i,[e,t])}}function m(e,t){if(!e.isDestroying){var r,n=t+":change";P?(r=O.add(e,t,n),w(e,n,r)):_(e,n,[e,t])}}var f,p,d=arguments,g=d[d.length-1],v=d[0].META_KEY,b=d[0].guidFor,y=d[0].tryFinally,_=d[1].sendEvent,w=d[1].listenersUnion,x=d[1].listenersDiff,C=d[2]["default"],E=new C,O=new C,P=0;g.propertyWillChange=e,g.propertyDidChange=t,g.overrideChains=s,g.beginPropertyChanges=l,g.endPropertyChanges=u,g.changeProperties=c}),e("ember-metal/property_get",["ember-metal/core","ember-metal/utils","ember-metal/error","exports"],function(){function e(e,t){var r,i=0===t.indexOf(h),a=!i&&c.test(t);if((!e||a)&&(e=o.lookup),i&&(t=t.slice(5)),e===o.lookup&&(r=t.match(m)[0],e=n(e,r),t=t.slice(r.length+1)),!t||0===t.length)throw new l("Path cannot be empty");return[e,t]}function t(t,r){var i,a,s,l,u;if(null===t&&-1===r.indexOf("."))return n(o.lookup,r);for(i=0===r.indexOf(h),(!t||i)&&(s=e(t,r),t=s[0],r=s[1],s.length=0),a=r.split("."),u=a.length,l=0;null!=t&&u>l;l++)if(t=n(t,a[l],!0),t&&t.isDestroyed)return void 0;return t}function r(e,t,r){var i=n(e,t);return void 0===i?r:i}var n,i=arguments,a=i[i.length-1],o=i[0]["default"],s=i[1].META_KEY,l=i[2]["default"],u=o.ENV.MANDATORY_SETTER,c=/^([A-Z$]|([0-9][A-Z$])).*[\.]/,h="this.",m=/^([^\.]+)/;n=function(e,r){if(""===r)return e;if(r||"string"!=typeof e||(r=e,e=null),null===e)return t(e,r);var n,i=e[s],a=i&&i.descs[r];return void 0===a&&-1!==r.indexOf(".")?t(e,r):a?a.get(e,r):(n=u&&i&&i.watching[r]>0?i.values[r]:e[r],void 0!==n||"object"!=typeof e||r in e||"function"!=typeof e.unknownProperty?n:e.unknownProperty(r))},o.config.overrideAccessors&&(o.get=n,o.config.overrideAccessors(),n=o.get),a["default"]=n,a.get=n,a.getWithDefault=r,a.normalizeTuple=e,a._getPath=t}),e("ember-metal/property_set",["ember-metal/core","ember-metal/property_get","ember-metal/utils","ember-metal/property_events","ember-metal/properties","ember-metal/error","exports"],function(){function e(e,t,r,n){var i;if(i=t.slice(t.lastIndexOf(".")+1),t=t===i?i:t.slice(0,t.length-(i.length+1)),"this"!==t&&(e=a(e,t)),!i||0===i.length)throw new c("Property set failed: You passed an empty path");if(!e){if(n)return;throw new c('Property set failed: object in path "'+t+'" could not be found or was destroyed.')}return m(e,i,r)}function t(e,t,r){return m(e,t,r,!0)}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1]._getPath,o=r[2].META_KEY,s=r[3].propertyWillChange,l=r[3].propertyDidChange,u=r[4].defineProperty,c=r[5]["default"],h=i.ENV.MANDATORY_SETTER,m=function(t,r,n,i){if("string"==typeof t&&(n=r,r=t,t=null),!t)return e(t,r,n,i);var a,c,m=t[o],f=m&&m.descs[r];if(void 0===f&&-1!==r.indexOf("."))return e(t,r,n,i);if(void 0!==f)f.set(t,r,n);else{if("object"==typeof t&&null!==t&&void 0!==n&&t[r]===n)return n;a="object"==typeof t&&!(r in t),a&&"function"==typeof t.setUnknownProperty?t.setUnknownProperty(r,n):m&&m.watching[r]>0?(c=h?m.values[r]:t[r],n!==c&&(s(t,r),h?(void 0!==c||r in t)&&t.propertyIsEnumerable(r)?m.values[r]=n:u(t,r,null,n):t[r]=n,l(t,r))):t[r]=n}return n};i.config.overrideAccessors&&(i.set=m,i.config.overrideAccessors(),m=i.set),n.set=m,n.trySet=t}),e("ember-metal/run_loop",["ember-metal/core","ember-metal/utils","ember-metal/array","ember-metal/property_events","exports"],function(){function e(){!p.currentRunLoop}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1].apply,o=r[2].indexOf,s=r[3].beginPropertyChanges,l=r[3].endPropertyChanges,u=function(e){p.currentRunLoop=e},c=function(e,t){p.currentRunLoop=t},h=t("backburner").Backburner,m=new h(["sync","actions","destroy"],{sync:{before:s,after:l},defaultQueue:"actions",onBegin:u,onEnd:c,onErrorTarget:i,onErrorMethod:"onerror"}),f=[].slice,p=([].concat,function(){return a(m,m.run,arguments)});p.join=function(){if(!p.currentRunLoop)return a(i,p,arguments);var e=f.call(arguments);e.unshift("actions"),a(p,p.schedule,e)},p.bind=function(){var e=f.call(arguments);return function(){return a(p,p.join,e.concat(f.call(arguments)))}},p.backburner=m,p.currentRunLoop=null,p.queues=m.queueNames,p.begin=function(){m.begin()},p.end=function(){m.end()},p.schedule=function(){e(),a(m,m.schedule,arguments)},p.hasScheduledTimers=function(){return m.hasTimers()},p.cancelTimers=function(){m.cancelTimers()},p.sync=function(){m.currentInstance&&m.currentInstance.queues.sync.flush()},p.later=function(){return a(m,m.later,arguments)},p.once=function(){e();var t=f.call(arguments);return t.unshift("actions"),a(m,m.scheduleOnce,t)},p.scheduleOnce=function(){return e(),a(m,m.scheduleOnce,arguments)},p.next=function(){var e=f.call(arguments);return e.push(1),a(m,m.later,e)},p.cancel=function(e){return m.cancel(e)},p.debounce=function(){return a(m,m.debounce,arguments)},p.throttle=function(){return a(m,m.throttle,arguments)},p._addQueue=function(e,t){-1===o.call(p.queues,e)&&p.queues.splice(o.call(p.queues,t)+1,0,e)},n["default"]=p}),e("ember-metal/set_properties",["ember-metal/property_events","ember-metal/property_set","exports"],function(){function e(e,t){return n(function(){for(var r in t)t.hasOwnProperty(r)&&i(e,r,t[r])}),e}var t=arguments,r=t[t.length-1],n=t[0].changeProperties,i=t[1].set;r["default"]=e}),e("ember-metal/utils",["ember-metal/core","ember-metal/platform","ember-metal/array","exports"],function(){function e(e,t){t||(t=E);var r=t+S++;return e&&(null===e[N]?e[N]=r:(V.value=r,O(e,N,V))),r}function r(e){if(void 0===e)return"(undefined)";if(null===e)return"(null)";var t,r=typeof e;switch(r){case"number":return t=A[e],t||(t=A[e]="nu"+e),t;case"string":return t=T[e],t||(t=T[e]="st"+S++),t;case"boolean":return e?"(true)":"(false)";default:return e[N]?e[N]:e===Object?"(Object)":e===Array?"(Array)":(t="ember"+S++,null===e[N]?e[N]=t:(V.value=t,O(e,N,V)),t)}}function i(e){this.descs={},this.watching={},this.cache={},this.cacheMeta={},this.source=e}function a(e,t){var r=e[k];return t===!1?r||j:(r?r.source!==e&&(D||O(e,k,R),r=P(r),r.descs=P(r.descs),r.watching=P(r.watching),r.cache={},r.cacheMeta={},r.source=e,I&&(r.values=P(r.values)),e[k]=r):(D||O(e,k,R),r=new i(e),I&&(r.values={}),e[k]=r,r.descs.constructor=null),r)}function o(e,t){var r=a(e,!1);return r[t]}function s(e,t,r){var n=a(e,!0);return n[t]=r,r}function l(e,t,r){for(var n,i,o=a(e,r),s=0,l=t.length;l>s;s++){if(n=t[s],i=o[n]){if(i.__ember_source__!==e){if(!r)return void 0;i=o[n]=P(i),i.__ember_source__=e}}else{if(!r)return void 0;i=o[n]={__ember_source__:e}}o=i}return i}function u(e,t){function r(){var r,n=this.__nextSuper;return this.__nextSuper=t,r=g(this,e,arguments),this.__nextSuper=n,r}return r.wrappedFunction=e,r.wrappedFunction.__ember_arity__=e.length,r.__ember_observes__=e.__ember_observes__,r.__ember_observesBefore__=e.__ember_observesBefore__,r.__ember_listens__=e.__ember_listens__,r}function c(e){var r,i;return"undefined"==typeof M&&(r="ember-runtime/mixins/array",n._eak_seen[r]&&(M=t(r)["default"])),!e||e.setInterval?!1:Array.isArray&&Array.isArray(e)?!0:M&&M.detect(e)?!0:(i=p(e),"array"===i?!0:void 0!==e.length&&"object"===i?!0:!1)}function h(e){return null===e||void 0===e?[]:c(e)?e:[e]}function m(e,t){return!(!e||"function"!=typeof e[t])}function f(e,t,r){return m(e,t)?r?v(e,t,r):v(e,t):void 0}function p(e){var r,i;return"undefined"==typeof U&&(i="ember-runtime/system/object",n._eak_seen[i]&&(U=t(i)["default"])),r=null===e||void 0===e?String(e):F[q.call(e)]||"object","function"===r?U&&U.detect(e)&&(r="class"):"object"===r&&(e instanceof Error?r="error":U&&e instanceof U?r="instance":e instanceof Date&&(r="date")),r}function d(e){var t=p(e);if("array"===t)return"["+e+"]";if("object"!==t)return e+"";var r,n=[];for(var i in e)if(e.hasOwnProperty(i)){if(r=e[i],"toString"===r)continue;"function"===p(r)&&(r="function() { ... }"),n.push(i+": "+r)}return"{"+n.join(", ")+"}"}function g(e,t,r){var n=r&&r.length;if(!r||!n)return t.call(e);switch(n){case 1:return t.call(e,r[0]);case 2:return t.call(e,r[0],r[1]);case 3:return t.call(e,r[0],r[1],r[2]);case 4:return t.call(e,r[0],r[1],r[2],r[3]);case 5:return t.call(e,r[0],r[1],r[2],r[3],r[4]);default:return t.apply(e,r)}}function v(e,t,r){var n=r&&r.length;if(!r||!n)return e[t]();switch(n){case 1:return e[t](r[0]);case 2:return e[t](r[0],r[1]);case 3:return e[t](r[0],r[1],r[2]);case 4:return e[t](r[0],r[1],r[2],r[3]);case 5:return e[t](r[0],r[1],r[2],r[3],r[4]);default:return e[t].apply(e,r)}}var b=arguments,y=b[b.length-1],_=b[0]["default"],w=b[1].platform,x=b[1].create,C=b[2].forEach,E="ember",O=w.defineProperty,P=x,A=[],T={},S=0,I=_.ENV.MANDATORY_SETTER,N="__ember"+ +new Date,V={writable:!1,configurable:!1,enumerable:!1,value:null},R={writable:!0,configurable:!1,enumerable:!1,value:null},k="__ember_meta__",D=w.defineProperty.isSimulated;i.prototype={descs:null,deps:null,watching:null,listeners:null,cache:null,cacheMeta:null,source:null,mixins:null,bindings:null,chains:null,chainWatchers:null,values:null,proto:null},D&&(i.prototype.__preventPlainObject__=!0,i.prototype.toJSON=function(){});var j=new i(null);I&&(j.values={});var M,L,H=function(){var e=0;try{try{}finally{throw e++,new Error("needsFinallyFixTest")}}catch(t){}return 1!==e}();L=H?function(e,t,r){var n,i,a;r=r||this;try{n=e.call(r)}finally{try{i=t.call(r)}catch(o){a=o}}if(a)throw a;return void 0===i?n:i}:function(e,t,r){var n,i;r=r||this;try{n=e.call(r)}finally{i=t.call(r)}return void 0===i?n:i};var B;B=H?function(e,t,r,n){var i,a,o;n=n||this;try{i=e.call(n)}catch(s){i=t.call(n,s)}finally{try{a=r.call(n)}catch(l){o=l}}if(o)throw o;return void 0===a?i:a}:function(e,t,r,n){var i,a;n=n||this;try{i=e.call(n)}catch(o){i=t.call(n,o)}finally{a=r.call(n)}return void 0===a?i:a};var F={},z="Boolean Number String Function Array Date RegExp Object".split(" ");C.call(z,function(e){F["[object "+e+"]"]=e.toLowerCase()});var U,q=Object.prototype.toString;y.generateGuid=e,y.GUID_KEY=N,y.GUID_PREFIX=E,y.guidFor=r,y.META_DESC=R,y.EMPTY_META=j,y.META_KEY=k,y.meta=a,y.getMeta=o,y.setMeta=s,y.metaPath=l,y.inspect=d,y.typeOf=p,y.tryCatchFinally=B,y.isArray=c,y.makeArray=h,y.canInvoke=m,y.tryInvoke=f,y.tryFinally=L,y.wrap=u,y.applyStr=v,y.apply=g}),e("backburner",["backburner/utils","backburner/deferred_action_queues","exports"],function(){function e(e){return _(e)||C.test(e)}function t(e,t){this.queueNames=e,this.options=t||{},this.options.defaultQueue||(this.options.defaultQueue=e[0]),this.instanceStack=[],this._debouncees=[],this._throttlers=[]}function r(e){return function(){try{return e.apply(this,arguments)}catch(t){throw t}}}function n(e){return e.onError||e.onErrorTarget&&e.onErrorTarget[e.onErrorMethod]}function i(e){e.begin(),e._autorun=x.setTimeout(function(){e._autorun=null,e.end()})}function a(e,t,r){(!e._laterTimer||t<e._laterTimerExpiresAt)&&(e._laterTimer=x.setTimeout(function(){e._laterTimer=null,e._laterTimerExpiresAt=null,o(e)},r),e._laterTimerExpiresAt=t)}function o(e){var t,r,n,i=+new Date;e.run(function(){for(r=c(i,w),t=w.splice(0,r),r=1,n=t.length;n>r;r+=2)e.schedule(e.options.defaultQueue,null,t[r])}),w.length&&a(e,w[0],w[0]-i)}function s(e,t,r){return u(e,t,r)}function l(e,t,r){return u(e,t,r)}function u(e,t,r){for(var n,i=-1,a=0,o=r.length;o>a;a++)if(n=r[a],n[0]===e&&n[1]===t){i=a;break}return i}function c(e,t){for(var r,n,i=0,a=t.length-2;a>i;)n=(a-i)/2,r=i+n-n%2,e>=t[r]?i=r+2:a=r;return e>=t[i]?i+2:i}var h=arguments,m=h[h.length-1],f=h[0]["default"],p=h[1].DeferredActionQueues,d=[].slice,g=[].pop,v=f.each,b=f.isString,y=f.isFunction,_=f.isNumber,w=[],x=this,C=/\d+/,E=function(e,t){try{t()}catch(e){}return!!e}();if(t.prototype={queueNames:null,options:null,currentInstance:null,instanceStack:null,begin:function(){var e=this.options,t=e&&e.onBegin,r=this.currentInstance;r&&this.instanceStack.push(r),this.currentInstance=new p(this.queueNames,e),t&&t(this.currentInstance,r)},end:function(){var e=this.options,t=e&&e.onEnd,r=this.currentInstance,n=null,i=!1;try{r.flush()}finally{i||(i=!0,this.currentInstance=null,this.instanceStack.length&&(n=this.instanceStack.pop(),this.currentInstance=n),t&&t(r,n))}},run:function(e,t){var r=n(this.options);this.begin(),t||(t=e,e=null),b(t)&&(t=e[t]);var i=d.call(arguments,2),a=!1;if(r)try{return t.apply(e,i)}catch(o){r(o)}finally{a||(a=!0,this.end())}else try{return t.apply(e,i)}finally{a||(a=!0,this.end())}},defer:function(e,t,r){r||(r=t,t=null),b(r)&&(r=t[r]);var n=this.DEBUG?new Error:void 0,a=arguments.length>3?d.call(arguments,3):void 0;return this.currentInstance||i(this),this.currentInstance.schedule(e,t,r,a,!1,n)},deferOnce:function(e,t,r){r||(r=t,t=null),b(r)&&(r=t[r]);var n=this.DEBUG?new Error:void 0,a=arguments.length>3?d.call(arguments,3):void 0;return this.currentInstance||i(this),this.currentInstance.schedule(e,t,r,a,!0,n)},setTimeout:function(){function t(){if(g)try{r.apply(o,h)}catch(e){g(e)}else r.apply(o,h)}var r,i,o,s,l,u,h=d.call(arguments),m=h.length;if(0!==m){if(1===m)r=h.shift(),i=0;else if(2===m)s=h[0],l=h[1],y(l)||y(s[l])?(o=h.shift(),r=h.shift(),i=0):e(l)?(r=h.shift(),i=h.shift()):(r=h.shift(),i=0);else{var f=h[h.length-1];i=e(f)?h.pop():0,s=h[0],u=h[1],y(u)||b(u)&&null!==s&&u in s?(o=h.shift(),r=h.shift()):r=h.shift()}var p=+new Date+parseInt(i,10);b(r)&&(r=o[r]);var g=n(this.options),v=c(p,w);return w.splice(v,0,p,t),a(this,p,i),t}},throttle:function(e,t){var r,n,i,a,o=this,s=arguments,u=g.call(s);return _(u)||b(u)?(r=u,u=!0):r=g.call(s),r=parseInt(r,10),i=l(e,t,this._throttlers),i>-1?this._throttlers[i]:(a=x.setTimeout(function(){u||o.run.apply(o,s);var r=l(e,t,o._throttlers);r>-1&&o._throttlers.splice(r,1)},r),u&&o.run.apply(o,s),n=[e,t,a],this._throttlers.push(n),n)},debounce:function(e,t){var r,n,i,a,o=this,l=arguments,u=g.call(l);return _(u)||b(u)?(r=u,u=!1):r=g.call(l),r=parseInt(r,10),n=s(e,t,this._debouncees),n>-1&&(i=this._debouncees[n],this._debouncees.splice(n,1),clearTimeout(i[2])),a=x.setTimeout(function(){u||o.run.apply(o,l);var r=s(e,t,o._debouncees);r>-1&&o._debouncees.splice(r,1)},r),u&&-1===n&&o.run.apply(o,l),i=[e,t,a],o._debouncees.push(i),i},cancelTimers:function(){var e=function(e){clearTimeout(e[2])};v(this._throttlers,e),this._throttlers=[],v(this._debouncees,e),this._debouncees=[],this._laterTimer&&(clearTimeout(this._laterTimer),this._laterTimer=null),w=[],this._autorun&&(clearTimeout(this._autorun),this._autorun=null)},hasTimers:function(){return!!w.length||!!this._debouncees.length||!!this._throttlers.length||this._autorun},cancel:function(e){var t=typeof e;if(e&&"object"===t&&e.queue&&e.method)return e.queue.cancel(e);if("function"!==t)return"[object Array]"===Object.prototype.toString.call(e)?this._cancelItem(l,this._throttlers,e)||this._cancelItem(s,this._debouncees,e):void 0;for(var r=0,n=w.length;n>r;r+=2)if(w[r+1]===e)return w.splice(r,2),!0},_cancelItem:function(e,t,r){var n,i;return r.length<3?!1:(i=e(r[0],r[1],t),i>-1&&(n=t[i],n[2]===r[2])?(t.splice(i,1),clearTimeout(r[2]),!0):!1)}},t.prototype.schedule=t.prototype.defer,t.prototype.scheduleOnce=t.prototype.deferOnce,t.prototype.later=t.prototype.setTimeout,E){var O=t.prototype.run;t.prototype.run=r(O);var P=t.prototype.end;t.prototype.end=r(P)}m.Backburner=t}),e("backburner/deferred_action_queues",["backburner/utils","backburner/queue","exports"],function(){function e(e,t){var r=this.queues={};this.queueNames=e=e||[],this.options=t,o(e,function(e){r[e]=new a(this,e,t)})}function t(e,t){for(var r,n,i=0,a=t;a>=i;i++)if(r=e.queueNames[i],n=e.queues[r],n._queue.length)return i;return-1}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1].Queue,o=i.each,s=i.isString;e.prototype={queueNames:null,queues:null,options:null,schedule:function(e,t,r,n,i,a){var o=this.queues,s=o[e];if(!s)throw new Error("You attempted to schedule an action in a queue ("+e+") that doesn't exist");return i?s.pushUnique(t,r,n,a):s.push(t,r,n,a)},invoke:function(e,t,r){r&&r.length>0?t.apply(e,r):t.call(e)},invokeWithOnError:function(e,t,r,n){try{r&&r.length>0?t.apply(e,r):t.call(e)}catch(i){n(i)}},flush:function(){for(var e,r,n,i,a=this.queues,o=this.queueNames,l=0,u=o.length,c=this.options,h=c.onError||c.onErrorTarget&&c.onErrorTarget[c.onErrorMethod],m=h?this.invokeWithOnError:this.invoke;u>l;){e=o[l],r=a[e],n=r._queueBeingFlushed=r._queue.slice(),r._queue=[];var f,p,d,g,v=r.options,b=v&&v.before,y=v&&v.after,_=0,w=n.length;for(w&&b&&b();w>_;)f=n[_],p=n[_+1],d=n[_+2],g=n[_+3],s(p)&&(p=f[p]),p&&m(f,p,d,h),_+=4;r._queueBeingFlushed=null,w&&y&&y(),-1===(i=t(this,l))?l++:l=i}}},n.DeferredActionQueues=e}),e("backburner/queue",["exports"],function(){function e(e,t,r){this.daq=e,this.name=t,this.globalOptions=r,this.options=r[t],this._queue=[]}var t=arguments,r=t[t.length-1];e.prototype={daq:null,name:null,options:null,onError:null,_queue:null,push:function(e,t,r,n){var i=this._queue;return i.push(e,t,r,n),{queue:this,target:e,method:t}},pushUnique:function(e,t,r,n){var i,a,o,s,l=this._queue;for(o=0,s=l.length;s>o;o+=4)if(i=l[o],a=l[o+1],i===e&&a===t)return l[o+2]=r,l[o+3]=n,{queue:this,target:e,method:t};return l.push(e,t,r,n),{queue:this,target:e,method:t}},flush:function(){var e,t,r,n,i,a=this._queue,o=this.globalOptions,s=this.options,l=s&&s.before,u=s&&s.after,c=o.onError||o.onErrorTarget&&o.onErrorTarget[o.onErrorMethod],h=a.length;for(h&&l&&l(),i=0;h>i;i+=4)if(e=a[i],t=a[i+1],r=a[i+2],n=a[i+3],r&&r.length>0)if(c)try{t.apply(e,r)}catch(m){c(m)}else t.apply(e,r);else if(c)try{t.call(e)}catch(m){c(m)}else t.call(e);h&&u&&u(),a.length>h?(this._queue=a.slice(h),this.flush()):this._queue.length=0},cancel:function(e){var t,r,n,i,a=this._queue;for(n=0,i=a.length;i>n;n+=4)if(t=a[n],r=a[n+1],t===e.target&&r===e.method)return a.splice(n,4),!0;if(a=this._queueBeingFlushed)for(n=0,i=a.length;i>n;n+=4)if(t=a[n],r=a[n+1],t===e.target&&r===e.method)return a[n+1]=null,!0}},r.Queue=e}),e("backburner/utils",["exports"],function(){var e=arguments,t=e[e.length-1];t["default"]={each:function(e,t){for(var r=0;r<e.length;r++)t(e[r])},isString:function(e){return"string"==typeof e},isFunction:function(e){return"function"==typeof e},isNumber:function(e){return"number"==typeof e}}}),e("ember-metal/watch_key",["ember-metal/core","ember-metal/utils","ember-metal/platform","exports"],function(){function e(e,t,r){if("length"!==t||"array"!==o(e)){var n=r||l(e),a=n.watching;a[t]?a[t]=(a[t]||0)+1:(a[t]=1,"function"==typeof e.willWatchProperty&&e.willWatchProperty(t),u&&t in e&&(n.values[t]=e[t],c(e,t,{configurable:!0,enumerable:e.propertyIsEnumerable(t),set:i.MANDATORY_SETTER_FUNCTION,get:i.DEFAULT_GETTER_FUNCTION(t)})))}}function t(e,t,r){var n=r||l(e),a=n.watching;1===a[t]?(a[t]=0,"function"==typeof e.didUnwatchProperty&&e.didUnwatchProperty(t),u&&t in e&&c(e,t,{configurable:!0,enumerable:e.propertyIsEnumerable(t),set:function(r){c(e,t,{configurable:!0,writable:!0,enumerable:!0,value:r}),delete n.values[t]},get:i.DEFAULT_GETTER_FUNCTION(t)})):a[t]>1&&a[t]--}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1].meta,o=r[1].typeOf,s=r[2].platform,l=a,u=i.ENV.MANDATORY_SETTER,c=s.defineProperty;n.watchKey=e,n.unwatchKey=t}),e("ember-metal/watch_path",["ember-metal/utils","ember-metal/chains","exports"],function(){function e(e,t){var r=t||l(e),n=r.chains;return n?n.value()!==e&&(n=r.chains=n.copy(e)):n=r.chains=new s(null,null,e),n}function t(t,r,n){if("length"!==r||"array"!==o(t)){var i=n||l(t),a=i.watching;a[r]?a[r]=(a[r]||0)+1:(a[r]=1,e(t,i).add(r))}}function r(t,r,n){var i=n||l(t),a=i.watching;1===a[r]?(a[r]=0,e(t,i).remove(r)):a[r]>1&&a[r]--}var n=arguments,i=n[n.length-1],a=n[0].meta,o=n[0].typeOf,s=n[1].ChainNode,l=a;i.watchPath=t,i.unwatchPath=r}),e("ember-metal/watching",["ember-metal/utils","ember-metal/chains","ember-metal/watch_key","ember-metal/watch_path","exports"],function(){function e(e){return-1===e.indexOf(".")}function t(t,r,n){("length"!==r||"array"!==c(t))&&(e(r)?p(t,r,n):g(t,r,n))}function r(e,t){var r=e[l];return(r&&r.watching[t])>0}function n(t,r,n){("length"!==r||"array"!==c(t))&&(e(r)?d(t,r,n):v(t,r,n))}function i(e){var t=e[l],r=t&&t.chains;u in e&&!e.hasOwnProperty(u)&&h(e),r&&r.value()!==e&&(t.chains=r.copy(e))}function a(e){var t,r,n,i,a=e[l];if(a&&(e[l]=null,t=a.chains))for(b.push(t);b.length>0;){if(t=b.pop(),r=t._chains)for(n in r)r.hasOwnProperty(n)&&b.push(r[n]);t._watching&&(i=t._object,i&&m(i,t._key,t))}}var o=arguments,s=o[o.length-1],l=(o[0].meta,o[0].META_KEY),u=o[0].GUID_KEY,c=o[0].typeOf,h=o[0].generateGuid,m=o[1].removeChainWatcher,f=o[1].flushPendingChains,p=o[2].watchKey,d=o[2].unwatchKey,g=o[3].watchPath,v=o[3].unwatchPath;t.flushPending=f;var b=[];s.watch=t,s.isWatching=r,s.unwatch=n,s.rewatch=i,s.destroy=a})}(),function(){e("rsvp/all",["./promise","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"];t["default"]=function(e,t){return r.all(e,t)}}),e("rsvp/all_settled",["./promise","./utils","exports"],function(){function e(e){return{state:"fulfilled",value:e}}function t(e){return{state:"rejected",reason:e}}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1].isArray,o=r[1].isNonThenable;n["default"]=function(r,n){return new i(function(n){function s(t){return function(r){u(t,e(r))}}function l(e){return function(r){u(e,t(r))}}function u(e,t){m[e]=t,0===--h&&n(m)}if(!a(r))throw new TypeError("You must pass an array to allSettled.");var c,h=r.length;if(0===h)return n([]),void 0;for(var m=new Array(h),f=0;f<r.length;f++)c=r[f],o(c)?u(f,e(c)):i.cast(c).then(s(f),l(f))},n)}}),e("rsvp/config",["./events","exports"],function(){function e(e,t){return"onerror"===e?(i.on("error",t),void 0):2!==arguments.length?i[e]:(i[e]=t,void 0)}var t=arguments,r=t[t.length-1],n=t[0]["default"],i={instrument:!1};n.mixin(i),r.config=i,r.configure=e}),e("rsvp/defer",["./promise","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"];t["default"]=function(e){var t={};return t.promise=new r(function(e,r){t.resolve=e,t.reject=r},e),t}}),e("rsvp/events",["exports"],function(){var e=arguments,t=e[e.length-1],r=function(e,t){for(var r=0,n=e.length;n>r;r++)if(e[r]===t)return r;return-1},n=function(e){var t=e._promiseCallbacks;return t||(t=e._promiseCallbacks={}),t};t["default"]={mixin:function(e){return e.on=this.on,e.off=this.off,e.trigger=this.trigger,e._promiseCallbacks=void 0,e},on:function(e,t){var i,a=n(this);i=a[e],i||(i=a[e]=[]),-1===r(i,t)&&i.push(t)},off:function(e,t){var i,a,o=n(this);return t?(i=o[e],a=r(i,t),-1!==a&&i.splice(a,1),void 0):(o[e]=[],void 0)},trigger:function(e,t){var r,i,a=n(this);if(r=a[e])for(var o=0;o<r.length;o++)(i=r[o])(t)}}}),e("rsvp/filter",["./all","./map","./utils","exports"],function(){function e(e,t,r){return n(e,r).then(function(n){if(!o(e))throw new TypeError("You must pass an array to filter.");if(!a(t))throw new TypeError("You must pass a function to filter's second argument.");return i(e,t,r).then(function(e){var t,r=n.length,i=[];for(t=0;r>t;t++)e[t]&&i.push(n[t]);return i})})}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=t[1]["default"],a=t[2].isFunction,o=t[2].isArray;r["default"]=e}),e("rsvp/hash",["./promise","./utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].isNonThenable,i=e[1].keysOf;t["default"]=function(e){return new r(function(t,a){function o(e){return function(r){c[e]=r,0===--m&&t(c)}}function s(e){m=0,a(e)}var l,u,c={},h=i(e),m=h.length;if(0===m)return t(c),void 0;for(var f=0;f<h.length;f++)u=h[f],l=e[u],n(l)?(c[u]=l,0===--m&&t(c)):r.cast(l).then(o(u),s)})}}),e("rsvp/instrument",["./config","./utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].config,n=e[1].now;t["default"]=function(e,t,i){try{r.trigger(e,{guid:t._guidKey+t._id,eventName:e,detail:t._detail,childGuid:i&&t._guidKey+i._id,label:t._label,timeStamp:n(),stack:new Error(t._label).stack})}catch(a){setTimeout(function(){throw a},0)
}}}),e("rsvp/map",["./promise","./all","./utils","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1]["default"]),n=e[2].isArray,i=e[2].isFunction;t["default"]=function(e,t,a){return r(e,a).then(function(o){if(!n(e))throw new TypeError("You must pass an array to map.");if(!i(t))throw new TypeError("You must pass a function to map's second argument.");var s,l=o.length,u=[];for(s=0;l>s;s++)u.push(t(o[s]));return r(u,a)})}}),e("rsvp/node",["./promise","exports"],function(){function e(e,t){return function(r,n){r?t(r):arguments.length>2?e(i.call(arguments,1)):e(n)}}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=Array.prototype.slice;r["default"]=function(t,r){return function(){var a=i.call(arguments),o=this||r;return new n(function(r,i){n.all(a).then(function(n){try{n.push(e(r,i)),t.apply(o,n)}catch(a){i(a)}})})}}}),e("rsvp/promise",["./config","./events","./instrument","./utils","./promise/cast","./promise/all","./promise/race","./promise/resolve","./promise/reject","exports"],function(){function e(){}function t(n,i){if(!v(n))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof t))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._id=O++,this._label=i,this._subscribers=[],p.instrument&&d("created",this),e!==n&&r(n,this)}function r(e,t){function r(e){s(t,e)}function n(e){u(t,e)}try{e(r,n)}catch(i){n(i)}}function n(e,t,r,n){var i=e._subscribers,a=i.length;i[a]=t,i[a+T]=r,i[a+S]=n}function i(e,t){var r,n,i=e._subscribers,o=e._detail;p.instrument&&d(t===T?"fulfilled":"rejected",e);for(var s=0;s<i.length;s+=3)r=i[s],n=i[s+t],a(t,r,n,o);e._subscribers=null}function a(e,t,r,n){var i,a,l,c,h=v(r);if(h)try{i=r(n),l=!0}catch(m){c=!0,a=m}else i=n,l=!0;o(t,i)||(h&&l?s(t,i):c?u(t,a):e===T?s(t,i):e===S&&u(t,i))}function o(e,t){var r,n=null;try{if(e===t)throw new TypeError("A promises callback cannot return that same promise.");if(g(t)&&(n=t.then,v(n)))return n.call(t,function(n){return r?!0:(r=!0,t!==n?s(e,n):l(e,n),void 0)},function(t){return r?!0:(r=!0,u(e,t),void 0)},"derived from: "+(e._label||" unknown promise")),!0}catch(i){return r?!0:(u(e,i),!0)}return!1}function s(e,t){e===t?l(e,t):o(e,t)||l(e,t)}function l(e,t){e._state===P&&(e._state=A,e._detail=t,p.async(c,e))}function u(e,t){e._state===P&&(e._state=A,e._detail=t,p.async(h,e))}function c(e){i(e,e._state=T)}function h(e){e._onerror&&e._onerror(e._detail),i(e,e._state=S)}var m=arguments,f=m[m.length-1],p=m[0].config,d=(m[1]["default"],m[2]["default"]),g=m[3].objectOrFunction,v=m[3].isFunction,b=m[3].now,y=m[4]["default"],_=m[5]["default"],w=m[6]["default"],x=m[7]["default"],C=m[8]["default"],E="rsvp_"+b()+"-",O=0;f["default"]=t,t.cast=y,t.all=_,t.race=w,t.resolve=x,t.reject=C;var P=void 0,A=0,T=1,S=2;t.prototype={constructor:t,_id:void 0,_guidKey:E,_label:void 0,_state:void 0,_detail:void 0,_subscribers:void 0,_onerror:function(e){p.trigger("error",e)},then:function(t,r,i){var o=this;this._onerror=null;var s=new this.constructor(e,i);if(this._state){var l=arguments;p.async(function(){a(o._state,s,l[o._state-1],o._detail)})}else n(this,s,t,r);return p.instrument&&d("chained",o,s),s},"catch":function(e,t){return this.then(null,e,t)},"finally":function(e,t){var r=this.constructor;return this.then(function(t){return r.cast(e()).then(function(){return t})},function(t){return r.cast(e()).then(function(){throw t})},t)}}}),e("rsvp/promise/all",["../utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].isArray,n=e[0].isNonThenable;t["default"]=function(e,t){var i=this;return new i(function(t,a){function o(e){return function(r){c[e]=r,0===--u&&t(c)}}function s(e){u=0,a(e)}if(!r(e))throw new TypeError("You must pass an array to all.");var l,u=e.length,c=new Array(u);if(0===u)return t(c),void 0;for(var h=0;h<e.length;h++)l=e[h],n(l)?(c[h]=l,0===--u&&t(c)):i.cast(l).then(o(h),s)},t)}}),e("rsvp/promise/cast",["exports"],function(){var e=arguments,t=e[e.length-1];t["default"]=function(e,t){var r=this;return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)},t)}}),e("rsvp/promise/race",["../utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].isArray,n=(e[0].isFunction,e[0].isNonThenable);t["default"]=function(e,t){var i,a=this;return new a(function(t,o){function s(e){u&&(u=!1,t(e))}function l(e){u&&(u=!1,o(e))}if(!r(e))throw new TypeError("You must pass an array to race.");for(var u=!0,c=0;c<e.length;c++){if(i=e[c],n(i))return u=!1,t(i),void 0;a.cast(i).then(s,l)}},t)}}),e("rsvp/promise/reject",["exports"],function(){var e=arguments,t=e[e.length-1];t["default"]=function(e,t){var r=this;return new r(function(t,r){r(e)},t)}}),e("rsvp/promise/resolve",["exports"],function(){var e=arguments,t=e[e.length-1];t["default"]=function(e,t){var r=this;return new r(function(t){t(e)},t)}}),e("rsvp/race",["./promise","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"];t["default"]=function(e,t){return r.race(e,t)}}),e("rsvp/reject",["./promise","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"];t["default"]=function(e,t){return r.reject(e,t)}}),e("rsvp/resolve",["./promise","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"];t["default"]=function(e,t){return r.resolve(e,t)}}),e("rsvp/rethrow",["exports"],function(){var e=arguments,t=e[e.length-1];t["default"]=function(e){throw setTimeout(function(){throw e}),e}}),e("rsvp/utils",["exports"],function(){function e(e){return"function"==typeof e||"object"==typeof e&&null!==e}function t(e){return"function"==typeof e}function r(t){return!e(t)}function n(e){return"[object Array]"===Object.prototype.toString.call(e)}var i=arguments,a=i[i.length-1];a.objectOrFunction=e,a.isFunction=t,a.isNonThenable=r,a.isArray=n;var o=Date.now||function(){return(new Date).getTime()};a.now=o;var s=Object.keys||function(e){var t=[];for(var r in e)t.push(r);return t};a.keysOf=s}),e("rsvp",["./rsvp/promise","./rsvp/events","./rsvp/node","./rsvp/all","./rsvp/all_settled","./rsvp/race","./rsvp/hash","./rsvp/rethrow","./rsvp/defer","./rsvp/config","./rsvp/map","./rsvp/resolve","./rsvp/reject","./rsvp/filter","exports"],function(){function e(e,t){p.async(e,t)}function t(){p.on.apply(p,arguments)}function r(){p.off.apply(p,arguments)}var n=arguments,i=n[n.length-1],a=n[0]["default"],o=n[1]["default"],s=n[2]["default"],l=n[3]["default"],u=n[4]["default"],c=n[5]["default"],h=n[6]["default"],m=n[7]["default"],f=n[8]["default"],p=n[9].config,d=n[9].configure,g=n[10]["default"],v=n[11]["default"],b=n[12]["default"],y=n[13]["default"];if("undefined"!=typeof window&&"object"==typeof window.__PROMISE_INSTRUMENTATION__){var _=window.__PROMISE_INSTRUMENTATION__;d("instrument",!0);for(var w in _)_.hasOwnProperty(w)&&t(w,_[w])}i.Promise=a,i.EventTarget=o,i.all=l,i.allSettled=u,i.race=c,i.hash=h,i.rethrow=m,i.defer=f,i.denodeify=s,i.configure=d,i.on=t,i.off=r,i.resolve=v,i.reject=b,i.async=e,i.map=g,i.filter=y})}(),function(){e("container/container",["container/inheriting_dict","exports"],function(){function e(e){this.parent=e,this.children=[],this.resolver=e&&e.resolver||function(){},this.registry=new y(e&&e.registry),this.cache=new y(e&&e.cache),this.factoryCache=new y(e&&e.factoryCache),this.resolveCache=new y(e&&e.resolveCache),this.typeInjections=new y(e&&e.typeInjections),this.injections={},this.factoryTypeInjections=new y(e&&e.factoryTypeInjections),this.factoryInjections={},this._options=new y(e&&e._options),this._typeOptions=new y(e&&e._typeOptions)}function t(e,t){return e.cache.has(t)?!0:!!e.resolve(t)}function r(e,t,r){if(r=r||{},e.cache.has(t)&&r.singleton!==!1)return e.cache.get(t);var n=h(e,t);return void 0!==n?(a(e,t)&&r.singleton!==!1&&e.cache.set(t,n),n):void 0}function n(e){throw new Error(e+" is not currently supported on child containers")}function a(e,t){var r=s(e,t,"singleton");return r!==!1}function o(e,t){var n={};if(!t)return n;for(var i,a,o=0,s=t.length;s>o;o++){if(i=t[o],a=r(e,i.fullName),void 0===a)throw new Error("Attempting to inject an unknown injection: `"+i.fullName+"`");n[i.property]=a}return n}function s(e,t,r){var n=e._options.get(t);if(n&&void 0!==n[r])return n[r];var i=t.split(":")[0];return n=e._typeOptions.get(i),n?n[r]:void 0}function l(e,t){var r,n=t,a=e.resolve(n),o=e.factoryCache,s=t.split(":")[0];if(void 0!==a){if(o.has(t))return o.get(t);if(!a||"function"!=typeof a.extend||!i.MODEL_FACTORY_INJECTIONS&&"model"===s)return a;var l=u(e,t),h=c(e,t);return h._toString=e.makeToString(a,t),r=a.extend(l),r.reopenClass(h),o.set(t,r),r}}function u(e,t){var r=t.split(":"),n=r[0],i=[];return i=i.concat(e.typeInjections.get(n)||[]),i=i.concat(e.injections[t]||[]),i=o(e,i),i._debugContainerKey=t,i.container=e,i}function c(e,t){var r=t.split(":"),n=r[0],i=[];return i=i.concat(e.factoryTypeInjections.get(n)||[]),i=i.concat(e.factoryInjections[t]||[]),i=o(e,i),i._debugContainerKey=t,i}function h(e,t){var r=l(e,t);return s(e,t,"instantiate")===!1?r:r?"function"==typeof r.extend?r.create():r.create(u(e,t)):void 0}function m(e,t){e.cache.eachLocal(function(r,n){s(e,r,"instantiate")!==!1&&t(n)})}function f(e){e.cache.eachLocal(function(t,r){s(e,t,"instantiate")!==!1&&r.destroy()}),e.cache.dict={}}function p(e,t,r,n){var i=e.get(t);i||(i=[],e.set(t,i)),i.push({property:r,fullName:n})}function d(e){if(!_.test(e))throw new TypeError("Invalid Fullname, expected: `type:name` got: "+e)}function g(e,t,r,n){var i=e[t]=e[t]||[];i.push({property:r,fullName:n})}var v=arguments,b=v[v.length-1],y=v[0]["default"];e.prototype={parent:null,children:null,resolver:null,registry:null,cache:null,typeInjections:null,injections:null,_options:null,_typeOptions:null,child:function(){var t=new e(this);return this.children.push(t),t},set:function(e,t,r){e[t]=r},register:function(e,t,r){if(d(e),void 0===t)throw new TypeError("Attempting to register an unknown factory: `"+e+"`");var n=this.normalize(e);if(this.cache.has(n))throw new Error("Cannot re-register: `"+e+"`, as it has already been looked up.");this.registry.set(n,t),this._options.set(n,r||{})},unregister:function(e){d(e);var t=this.normalize(e);this.registry.remove(t),this.cache.remove(t),this.factoryCache.remove(t),this.resolveCache.remove(t),this._options.remove(t)},resolve:function(e){d(e);var t=this.normalize(e),r=this.resolveCache.get(t);if(r)return r;var n=this.resolver(t)||this.registry.get(t);return this.resolveCache.set(t,n),n},describe:function(e){return e},normalize:function(e){return e},makeToString:function(e){return e.toString()},lookup:function(e,t){return d(e),r(this,this.normalize(e),t)},lookupFactory:function(e){return d(e),l(this,this.normalize(e))},has:function(e){return d(e),t(this,this.normalize(e))},optionsForType:function(e,t){this.parent&&n("optionsForType"),this._typeOptions.set(e,t)},options:function(e,t){this.optionsForType(e,t)},typeInjection:function(e,t,r){d(r),this.parent&&n("typeInjection");var i=r.split(":")[0];if(i===e)throw new Error("Cannot inject a `"+r+"` on other "+e+"(s). Register the `"+r+"` as a different type and perform the typeInjection.");p(this.typeInjections,e,t,r)},injection:function(e,t,r){this.parent&&n("injection"),d(r);var i=this.normalize(r);if(-1===e.indexOf(":"))return this.typeInjection(e,t,i);d(e);var a=this.normalize(e);g(this.injections,a,t,i)},factoryTypeInjection:function(e,t,r){this.parent&&n("factoryTypeInjection"),p(this.factoryTypeInjections,e,t,this.normalize(r))},factoryInjection:function(e,t,r){this.parent&&n("injection");var i=this.normalize(e),a=this.normalize(r);return d(r),-1===e.indexOf(":")?this.factoryTypeInjection(i,t,a):(d(e),g(this.factoryInjections,i,t,a),void 0)},destroy:function(){for(var e=0,t=this.children.length;t>e;e++)this.children[e].destroy();this.children=[],m(this,function(e){e.destroy()}),this.parent=void 0,this.isDestroyed=!0},reset:function(){for(var e=0,t=this.children.length;t>e;e++)f(this.children[e]);f(this)}};var _=/^[^:]+.+:[^:]+$/;b["default"]=e}),e("container/inheriting_dict",["exports"],function(){function e(e){this.parent=e,this.dict={}}var t=arguments,r=t[t.length-1];e.prototype={parent:null,dict:null,get:function(e){var t=this.dict;return t.hasOwnProperty(e)?t[e]:this.parent?this.parent.get(e):void 0},set:function(e,t){this.dict[e]=t},remove:function(e){delete this.dict[e]},has:function(e){var t=this.dict;return t.hasOwnProperty(e)?!0:this.parent?this.parent.has(e):!1},eachLocal:function(e,t){var r=this.dict;for(var n in r)r.hasOwnProperty(n)&&e.call(t,n,r[n])}},r["default"]=e}),e("container",["container/container","exports"],function(){var e=arguments,t=e[e.length-1];i.MODEL_FACTORY_INJECTIONS=!1,i.ENV&&"undefined"!=typeof i.ENV.MODEL_FACTORY_INJECTIONS&&(i.MODEL_FACTORY_INJECTIONS=!!i.ENV.MODEL_FACTORY_INJECTIONS);var r=e[0]["default"];t["default"]=r})}(),function(){e("ember-runtime/compare",["ember-metal/core","ember-metal/utils","ember-runtime/mixins/comparable","exports"],function(){function e(t,r){if(t===r)return 0;var o=i(t),s=i(r);if(a){if("instance"===o&&a.detect(t.constructor))return t.constructor.compare(t,r);if("instance"===s&&a.detect(r.constructor))return 1-r.constructor.compare(r,t)}var l=n.ORDER_DEFINITION_MAPPING;if(!l){var u=n.ORDER_DEFINITION;l=n.ORDER_DEFINITION_MAPPING={};var c,h;for(c=0,h=u.length;h>c;++c)l[u[c]]=c;delete n.ORDER_DEFINITION}var m=l[o],f=l[s];if(f>m)return-1;if(m>f)return 1;switch(o){case"boolean":case"number":return r>t?-1:t>r?1:0;case"string":var p=t.localeCompare(r);return 0>p?-1:p>0?1:0;case"array":for(var d=t.length,g=r.length,v=Math.min(d,g),b=0,y=0;0===b&&v>y;)b=e(t[y],r[y]),y++;return 0!==b?b:g>d?-1:d>g?1:0;case"instance":return a&&a.detect(t)?t.compare(t,r):0;case"date":var _=t.getTime(),w=r.getTime();return w>_?-1:_>w?1:0;default:return 0}}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=t[1].typeOf,a=t[2]["default"];n.ORDER_DEFINITION=n.ENV.ORDER_DEFINITION||["undefined","null","boolean","number","string","array","object","instance","function","class","date"],r["default"]=e}),e("ember-runtime/computed/array_computed",["ember-metal/core","ember-runtime/computed/reduce_computed","ember-metal/enumerable_utils","ember-metal/platform","ember-metal/observer","ember-metal/error","exports"],function(){function e(){var e=this;return a.apply(this,arguments),this.func=function(t){return function(r){return e._hasInstanceMeta(this,r)||m(e._dependentKeys,function(t){l(this,t,function(){e.recomputeOnce.call(this,r)})},this),t.apply(this,arguments)}}(this.func),this}function t(t){var r;if(arguments.length>1&&(r=c.call(arguments,0,-1),t=c.call(arguments,-1)[0]),"object"!=typeof t)throw new u("Array Computed Property declared without an options hash");var n=new e(t);return r&&n.property.apply(n,r),n}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=(r[1].reduceComputed,r[1].ReduceComputedProperty),o=r[2]["default"],s=r[3].create,l=r[4].addObserver,u=r[5]["default"],c=[].slice,h=s,m=o.forEach;e.prototype=h(a.prototype),e.prototype.initialValue=function(){return i.A()},e.prototype.resetValue=function(e){return e.clear(),e},e.prototype.didChange=function(){},n.arrayComputed=t,n.ArrayComputedProperty=e}),e("ember-runtime/computed/reduce_computed",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/error","ember-metal/property_events","ember-metal/expand_properties","ember-metal/observer","ember-metal/computed","ember-metal/platform","ember-metal/enumerable_utils","ember-runtime/system/tracked_array","ember-runtime/mixins/array","ember-metal/run_loop","ember-runtime/system/set","exports"],function(){function e(e,t){return"@this"===t?e:d(e,t)}function t(e,t,r){this.callbacks=e,this.cp=t,this.instanceMeta=r,this.dependentKeysByGuid={},this.trackedArraysByGuid={},this.suspended=!1,this.changedItems={}}function r(e,t,r){this.dependentArray=e,this.index=t,this.item=e.objectAt(t),this.trackedArray=r,this.beforeObserver=null,this.observer=null,this.destroyed=!1}function n(e,t,r){return 0>e?Math.max(0,t+e):t>e?e:Math.min(t-r,e)}function i(e,t,r){return Math.min(r,t-e)}function a(e,t,r,n,i,a){var o={arrayChanged:e,index:r,item:t,propertyName:n,property:i};return a&&(o.previousValues=a),o}function o(e,t,r,n,i){H(e,function(o,s){i.setValue(t.addedItem.call(this,i.getValue(),o,a(e,o,s,n,r),i.sugarMeta))},this)}function s(e,t){{var r;e._callbacks()}e._hasInstanceMeta(this,t)?(r=e._instanceMeta(this,t),r.setValue(e.resetValue(r.getValue()))):r=e._instanceMeta(this,t),e.options.initialize&&e.options.initialize.call(this,r.getValue(),{property:e,propertyName:t},r.sugarMeta)}function l(t,r){if(z.test(r))return!1;var n=e(t,r);return N.detect(n)}function u(e,t,r){this.context=e,this.propertyName=t,this.cache=v(e).cache,this.dependentArrays={},this.sugarMeta={},this.initialValue=r}function c(t){var r=this;this.options=t,this._dependentKeys=null,this._itemPropertyKeys={},this._previousItemPropertyKeys={},this.readOnly(),this.cacheable(),this.recomputeOnce=function(e){V.once(this,n,e)};var n=function(t){var n=(r._dependentKeys,r._instanceMeta(this,t)),i=r._callbacks();s.call(this,r,t),n.dependentArraysObserver.suspendArrayObservers(function(){H(r._dependentKeys,function(t){if(l(this,t)){var i=e(this,t),a=n.dependentArrays[t];i===a?r._previousItemPropertyKeys[t]&&(delete r._previousItemPropertyKeys[t],n.dependentArraysObserver.setupPropertyObservers(t,r._itemPropertyKeys[t])):(n.dependentArrays[t]=i,a&&n.dependentArraysObserver.teardownObservers(a,t),i&&n.dependentArraysObserver.setupObservers(i,t))}},this)},this),H(r._dependentKeys,function(a){if(l(this,a)){var s=e(this,a);s&&o.call(this,s,i,r,t,n)}},this)};this.func=function(e){return n.call(this,e),r._instanceMeta(this,e).getValue()}}function h(e){return e}function m(e){var t;if(arguments.length>1&&(t=M.call(arguments,0,-1),e=M.call(arguments,-1)[0]),"object"!=typeof e)throw new b("Reduce Computed Property declared without an options hash");if(!("initialValue"in e))throw new b("Reduce Computed Property declared without an initial value");var r=new c(e);return t&&r.property.apply(r,t),r}var f=arguments,p=f[f.length-1],d=(f[0]["default"],f[1].get),g=(f[2].set,f[3].guidFor),v=f[3].meta,b=f[4]["default"],y=f[5].propertyWillChange,_=f[5].propertyDidChange,w=f[6]["default"],x=f[7].addObserver,C=(f[7].observersFor,f[7].removeObserver),E=f[7].addBeforeObserver,O=f[7].removeBeforeObserver,P=f[8].ComputedProperty,A=f[8].cacheFor,T=f[9].create,S=f[10]["default"],I=f[11]["default"],N=f[12]["default"],V=f[13]["default"],R=f[14]["default"],k=(f[3].isArray,A.set),D=A.get,j=A.remove,M=[].slice,L=T,H=S.forEach,B=/^(.*)\.@each\.(.*)/,F=/(.*\.@each){2,}/,z=/\.\[\]$/;t.prototype={setValue:function(e){this.instanceMeta.setValue(e,!0)},getValue:function(){return this.instanceMeta.getValue()},setupObservers:function(e,t){this.dependentKeysByGuid[g(e)]=t,e.addArrayObserver(this,{willChange:"dependentArrayWillChange",didChange:"dependentArrayDidChange"}),this.cp._itemPropertyKeys[t]&&this.setupPropertyObservers(t,this.cp._itemPropertyKeys[t])},teardownObservers:function(e,t){var r=this.cp._itemPropertyKeys[t]||[];delete this.dependentKeysByGuid[g(e)],this.teardownPropertyObservers(t,r),e.removeArrayObserver(this,{willChange:"dependentArrayWillChange",didChange:"dependentArrayDidChange"})},suspendArrayObservers:function(e,t){var r=this.suspended;this.suspended=!0,e.call(t),this.suspended=r},setupPropertyObservers:function(t,r){var n=e(this.instanceMeta.context,t),i=e(n,"length"),a=new Array(i);this.resetTransformations(t,a),H(n,function(e,i){var o=this.createPropertyObserverContext(n,i,this.trackedArraysByGuid[t]);a[i]=o,H(r,function(t){E(e,t,this,o.beforeObserver),x(e,t,this,o.observer)},this)},this)},teardownPropertyObservers:function(e,t){var r,n,i,a=this,o=this.trackedArraysByGuid[e];o&&o.apply(function(e,o,s){s!==I.DELETE&&H(e,function(e){e.destroyed=!0,r=e.beforeObserver,n=e.observer,i=e.item,H(t,function(e){O(i,e,a,r),C(i,e,a,n)})})})},createPropertyObserverContext:function(e,t,n){var i=new r(e,t,n);return this.createPropertyObserver(i),i},createPropertyObserver:function(e){var t=this;e.beforeObserver=function(r,n){return t.itemPropertyWillChange(r,n,e.dependentArray,e)},e.observer=function(r,n){return t.itemPropertyDidChange(r,n,e.dependentArray,e)}},resetTransformations:function(e,t){this.trackedArraysByGuid[e]=new I(t)},trackAdd:function(e,t,r){var n=this.trackedArraysByGuid[e];n&&n.addItems(t,r)},trackRemove:function(e,t,r){var n=this.trackedArraysByGuid[e];return n?n.removeItems(t,r):[]},updateIndexes:function(t,r){var n=e(r,"length");t.apply(function(e,t,r,i){r!==I.DELETE&&(0!==i||r!==I.RETAIN||e.length!==n||0!==t)&&H(e,function(e,r){e.index=r+t})})},dependentArrayWillChange:function(t,r,o){function s(e){m[h].destroyed=!0,O(u,e,this,m[h].beforeObserver),C(u,e,this,m[h].observer)}if(!this.suspended){var l,u,c,h,m,f=this.callbacks.removedItem,p=g(t),d=this.dependentKeysByGuid[p],v=this.cp._itemPropertyKeys[d]||[],b=e(t,"length"),y=n(r,b,0),_=i(y,b,o);for(m=this.trackRemove(d,y,_),h=_-1;h>=0&&(c=y+h,!(c>=b));--h)u=t.objectAt(c),H(v,s,this),l=a(t,u,c,this.instanceMeta.propertyName,this.cp),this.setValue(f.call(this.instanceMeta.context,this.getValue(),u,l,this.instanceMeta.sugarMeta))}},dependentArrayDidChange:function(t,r,i,o){if(!this.suspended){var s,l,u=this.callbacks.addedItem,c=g(t),h=this.dependentKeysByGuid[c],m=new Array(o),f=this.cp._itemPropertyKeys[h],p=e(t,"length"),d=n(r,p,o);H(t.slice(d,d+o),function(e,r){f&&(l=m[r]=this.createPropertyObserverContext(t,d+r,this.trackedArraysByGuid[h]),H(f,function(t){E(e,t,this,l.beforeObserver),x(e,t,this,l.observer)},this)),s=a(t,e,d+r,this.instanceMeta.propertyName,this.cp),this.setValue(u.call(this.instanceMeta.context,this.getValue(),e,s,this.instanceMeta.sugarMeta))},this),this.trackAdd(h,d,m)}},itemPropertyWillChange:function(t,r,n,i){var a=g(t);this.changedItems[a]||(this.changedItems[a]={array:n,observerContext:i,obj:t,previousValues:{}}),this.changedItems[a].previousValues[r]=e(t,r)},itemPropertyDidChange:function(){this.flushChanges()},flushChanges:function(){var e,t,r,n=this.changedItems;for(e in n)t=n[e],t.observerContext.destroyed||(this.updateIndexes(t.observerContext.trackedArray,t.observerContext.dependentArray),r=a(t.array,t.obj,t.observerContext.index,this.instanceMeta.propertyName,this.cp,t.previousValues),this.setValue(this.callbacks.removedItem.call(this.instanceMeta.context,this.getValue(),t.obj,r,this.instanceMeta.sugarMeta)),this.setValue(this.callbacks.addedItem.call(this.instanceMeta.context,this.getValue(),t.obj,r,this.instanceMeta.sugarMeta)));this.changedItems={}}},u.prototype={getValue:function(){var e=D(this.cache,this.propertyName);return void 0!==e?e:this.initialValue},setValue:function(e,t){e!==D(this.cache,this.propertyName)&&(t&&y(this.context,this.propertyName),void 0===e?j(this.cache,this.propertyName):k(this.cache,this.propertyName,e),t&&_(this.context,this.propertyName))}},c.prototype=L(P.prototype),c.prototype._callbacks=function(){if(!this.callbacks){var e=this.options;this.callbacks={removedItem:e.removedItem||h,addedItem:e.addedItem||h}}return this.callbacks},c.prototype._hasInstanceMeta=function(e,t){return!!v(e).cacheMeta[t]},c.prototype._instanceMeta=function(e,r){var n=v(e).cacheMeta,i=n[r];return i||(i=n[r]=new u(e,r,this.initialValue()),i.dependentArraysObserver=new t(this._callbacks(),this,i,e,r,i.sugarMeta)),i},c.prototype.initialValue=function(){return"function"==typeof this.options.initialValue?this.options.initialValue():this.options.initialValue},c.prototype.resetValue=function(){return this.initialValue()},c.prototype.itemPropertyKey=function(e,t){this._itemPropertyKeys[e]=this._itemPropertyKeys[e]||[],this._itemPropertyKeys[e].push(t)},c.prototype.clearItemPropertyKeys=function(e){this._itemPropertyKeys[e]&&(this._previousItemPropertyKeys[e]=this._itemPropertyKeys[e],this._itemPropertyKeys[e]=[])},c.prototype.property=function(){var e,t,r=this,n=M.call(arguments),i=new R;return H(n,function(n){if(F.test(n))throw new b("Nested @each properties not supported: "+n);if(e=B.exec(n)){t=e[1];var a=e[2],o=function(e){r.itemPropertyKey(t,e)};w(a,o),i.add(t)}else i.add(n)}),P.prototype.property.apply(this,i.toArray())},p.reduceComputed=m,p.ReduceComputedProperty=c}),e("ember-runtime/computed/reduce_computed_macros",["ember-metal/core","ember-metal/merge","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/error","ember-metal/enumerable_utils","ember-metal/run_loop","ember-metal/observer","ember-runtime/computed/array_computed","ember-runtime/computed/reduce_computed","ember-runtime/system/object_proxy","ember-runtime/system/subarray","ember-runtime/keys","ember-runtime/compare","exports"],function(){function e(e){return C(e,{initialValue:0,addedItem:function(e,t){return e+t},removedItem:function(e,t){return e-t}})}function t(e){return C(e,{initialValue:-1/0,addedItem:function(e,t){return Math.max(e,t)},removedItem:function(e,t){return e>t?e:void 0}})}function r(e){return C(e,{initialValue:1/0,addedItem:function(e,t){return Math.min(e,t)},removedItem:function(e,t){return t>e?e:void 0}})}function n(e,t){var r={addedItem:function(e,r,n){var i=t.call(this,r);return e.insertAt(n.index,i),e},removedItem:function(e,t,r){return e.removeAt(r.index,1),e}};return x(e,r)}function i(e,t){var r=function(e){return g(e,t)};return n(e+".@each."+t,r)}function a(e,t){var r={initialize:function(e,t,r){r.filteredArrayIndexes=new O},addedItem:function(e,r,n,i){var a=!!t.call(this,r),o=i.filteredArrayIndexes.addItem(n.index,a);return a&&e.insertAt(o,r),e},removedItem:function(e,t,r,n){var i=n.filteredArrayIndexes.removeItem(r.index);return i>-1&&e.removeAt(i),e}};return x(e,r)}function o(e,t,r){var n;return n=2===arguments.length?function(e){return g(e,t)}:function(e){return g(e,t)===r},a(e+".@each."+t,n)}function s(){var e=T.call(arguments);return e.push({initialize:function(e,t,r){r.itemCounts={}},addedItem:function(e,t,r,n){var i=v(t);return n.itemCounts[i]?++n.itemCounts[i]:n.itemCounts[i]=1,e.addObject(t),e},removedItem:function(e,t,r,n){var i=v(t),a=n.itemCounts;return 0===--a[i]&&e.removeObject(t),e}}),x.apply(null,e)}function l(){var e=function(e){return y.map(e.property._dependentKeys,function(e){return v(e)})},t=T.call(arguments);return t.push({initialize:function(e,t,r){r.itemCounts={}},addedItem:function(t,r,n,i){var a=v(r),o=(e(n),v(n.arrayChanged)),s=n.property._dependentKeys.length,l=i.itemCounts;return l[a]||(l[a]={}),void 0===l[a][o]&&(l[a][o]=0),1===++l[a][o]&&s===P(l[a]).length&&t.addObject(r),t},removedItem:function(t,r,n,i){var a,o=v(r),s=(e(n),v(n.arrayChanged)),l=(n.property._dependentKeys.length,i.itemCounts);return void 0===l[o][s]&&(l[o][s]=0),0===--l[o][s]&&(delete l[o][s],a=P(l[o]).length,0===a&&delete l[o],t.removeObject(r)),t}}),x.apply(null,t)}function u(e,t){if(2!==arguments.length)throw new b("setDiff requires exactly two dependent arrays.");return x(e,t,{addedItem:function(r,n,i){var a=g(this,e),o=g(this,t);return i.arrayChanged===a?o.contains(n)||r.addObject(n):r.removeObject(n),r},removedItem:function(r,n,i){var a=g(this,e),o=g(this,t);return i.arrayChanged===o?a.contains(n)&&r.addObject(n):r.removeObject(n),r}})}function c(e,t,r,n){function i(e){return m.detectInstance(e)?v(g(e,"content")):v(e)}var a,o,s,l,u;return arguments.length<4&&(n=g(e,"length")),arguments.length<3&&(r=0),r===n?r:(a=r+Math.floor((n-r)/2),o=e.objectAt(a),l=i(o),u=i(t),l===u?a:(s=this.order(o,t),0===s&&(s=u>l?-1:1),0>s?this.binarySearch(e,t,a+1,n):s>0?this.binarySearch(e,t,r,a):a))}function h(e,t){var r,n;return"function"==typeof t?r=function(e,r,n){n.order=t,n.binarySearch=c}:(n=t,r=function(t,r,i){function a(){var t,a,s,l=g(this,n),u=i.sortProperties=[],c=i.sortPropertyAscending={};r.property.clearItemPropertyKeys(e),S(l,function(n){-1!==(a=n.indexOf(":"))?(t=n.substring(0,a),s="desc"!==n.substring(a+1).toLowerCase()):(t=n,s=!0),u.push(t),c[t]=s,r.property.itemPropertyKey(e,t)}),l.addObserver("@each",this,o)}function o(){_.once(this,s,r.propertyName)}function s(e){a.call(this),r.property.recomputeOnce.call(this,e)}w(this,n,o),a.call(this),i.order=function(e,t){for(var r,n,i,a=t instanceof m,o=0;o<this.sortProperties.length;++o)if(r=this.sortProperties[o],n=A(g(e,r),a?t[r]:g(t,r)),0!==n)return i=this.sortPropertyAscending[r],i?n:-1*n;return 0},i.binarySearch=c}),x(e,{initialize:r,addedItem:function(e,t,r,n){var i=n.binarySearch(e,t);return e.insertAt(i,t),e},removedItem:function(e,t,r,n){var i,a,o;return r.previousValues?(i=d({content:t},r.previousValues),o=m.create(i)):o=t,a=n.binarySearch(e,o),e.removeAt(a),e}})}var m,f=arguments,p=f[f.length-1],d=(f[0]["default"],f[1]["default"]),g=f[2].get,v=(f[3].set,f[4].isArray,f[4].guidFor),b=f[5]["default"],y=f[6]["default"],_=f[7]["default"],w=f[8].addObserver,x=f[9].arrayComputed,C=f[10].reduceComputed,E=f[11]["default"],O=f[12]["default"],P=f[13]["default"],A=f[14]["default"],T=[].slice,S=y.forEach,I=i,N=o,V=s,m=E.extend();p.sum=e,p.min=r,p.max=t,p.map=n,p.sort=h,p.setDiff=u,p.mapBy=i,p.mapProperty=I,p.filter=a,p.filterBy=o,p.filterProperty=N,p.uniq=s,p.union=V,p.intersect=l}),e("ember-runtime/controllers/array_controller",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/enumerable_utils","ember-runtime/system/array_proxy","ember-runtime/mixins/sortable","ember-runtime/controllers/controller","ember-metal/computed","ember-metal/error","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=(e[2].set,e[3]["default"]),a=e[4]["default"],o=e[5]["default"],s=e[6].ControllerMixin,l=e[7].computed,u=e[8]["default"],c=i.forEach,h=i.replace,m=a.extend(s,o,{itemController:null,lookupItemController:function(){return n(this,"itemController")},objectAtContent:function(e){var t=n(this,"length"),r=n(this,"arrangedContent"),i=r&&r.objectAt(e);if(e>=0&&t>e){var a=this.lookupItemController(i);if(a)return this.controllerAt(e,i,a)}return i},arrangedContentDidChange:function(){this._super(),this._resetSubControllers()},arrayContentDidChange:function(e,t,r){var i=n(this,"_subControllers"),a=i.slice(e,e+t);c(a,function(e){e&&e.destroy()}),h(i,e,t,new Array(r)),this._super(e,t,r)},init:function(){this._super(),this.set("_subControllers",[])},content:l(function(){return r.A()}),_isVirtual:!1,controllerAt:function(e,t,r){var i,a=n(this,"container"),o=n(this,"_subControllers"),s=o[e];if(s)return s;if(i="controller:"+r,!a.has(i))throw new u('Could not resolve itemController: "'+r+'"');var l;return this._isVirtual&&(l=n(this,"parentController")),l=l||this,s=a.lookupFactory(i).create({target:this,parentController:l,content:t}),o[e]=s,s},_subControllers:null,_resetSubControllers:function(){var e,t=n(this,"_subControllers");if(t.length){for(var r=0,i=t.length;i>r;r++)e=t[r],e&&e.destroy();t.length=0}},willDestroy:function(){this._resetSubControllers(),this._super()}});t["default"]=m}),e("ember-runtime/controllers/controller",["ember-metal/core","ember-metal/property_get","ember-runtime/system/object","ember-metal/mixin","ember-metal/computed","ember-runtime/mixins/action_handler","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get,e[2]["default"]),n=e[3].Mixin,i=e[4].computed,a=e[5]["default"],o=n.create(a,{isController:!0,target:null,container:null,parentController:null,store:null,model:i.alias("content"),deprecatedSendHandles:function(e){return!!this[e]},deprecatedSend:function(e){var t=[].slice.call(arguments,1);this[e].apply(this,t)}}),s=r.extend(o);t.Controller=s,t.ControllerMixin=o}),e("ember-runtime/controllers/object_controller",["ember-runtime/controllers/controller","ember-runtime/system/object_proxy","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].ControllerMixin,n=e[1]["default"],i=n.extend(r);t["default"]=i}),e("ember-runtime/copy",["ember-metal/enumerable_utils","ember-metal/utils","ember-runtime/system/object","ember-runtime/mixins/copyable","ember-metal/platform","exports"],function(){function e(t,r,n,i){var l,u,c;if("object"!=typeof t||null===t)return t;if(r&&(u=s(n,t))>=0)return i[u];if("array"===a(t)){if(l=t.slice(),r)for(u=l.length;--u>=0;)l[u]=e(l[u],r,n,i)}else if(o&&o.detect(t))l=t.copy(r,n,i);else if(t instanceof Date)l=new Date(t.getTime());else{l={};for(c in t)t.hasOwnProperty(c)&&"__"!==c.substring(0,2)&&(l[c]=r?e(t[c],r,n,i):t[c])}return r&&(n.push(t),i.push(l)),l}function t(t,r){return"object"!=typeof t||null===t?t:o&&o.detect(t)?t.copy(r):e(t,r,r?[]:null,r?[]:null)}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1].typeOf,o=(r[2]["default"],r[3]["default"]),s=(r[4].create,i.indexOf);n["default"]=t}),e("ember-runtime/core",["exports"],function(){function e(e,t){return e&&"function"==typeof e.isEqual?e.isEqual(t):e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():e===t
}var t=arguments,r=t[t.length-1];r.isEqual=e}),e("ember-runtime/ext/function",["ember-metal/core","ember-metal/expand_properties","ember-metal/computed"],function(){var e=arguments,t=(e[e.length-1],e[0]["default"]),r=e[1]["default"],n=e[2].computed,i=Array.prototype.slice,a=Function.prototype;(t.EXTEND_PROTOTYPES===!0||t.EXTEND_PROTOTYPES.Function)&&(a.property=function(){var e=n(this);return e.property.apply(e,arguments)},a.observes=function(){for(var e=function(e){t.push(e)},t=[],n=0;n<arguments.length;++n)r(arguments[n],e);return this.__ember_observes__=t,this},a.observesImmediately=function(){for(var e=0,t=arguments.length;t>e;e++){arguments[e]}return this.observes.apply(this,arguments)},a.observesBefore=function(){for(var e=function(e){t.push(e)},t=[],n=0;n<arguments.length;++n)r(arguments[n],e);return this.__ember_observesBefore__=t,this},a.on=function(){var e=i.call(arguments);return this.__ember_listens__=e,this})}),e("ember-runtime/ext/rsvp",["ember-metal/core","ember-metal/logger","exports"],function(){var e,r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1]["default"],o=t("rsvp"),s="ember-testing/test";o.onerrorDefault=function(r){if(r instanceof Error)if(i.testing){if(!e&&i.__loader.registry[s]&&(e=t(s)["default"]),!e||!e.adapter)throw r;e.adapter.exception(r)}else i.onerror?i.onerror(r):a.error(r.stack)},o.on("error",o.onerrorDefault),n["default"]=o}),e("ember-runtime/ext/string",["ember-metal/core","ember-runtime/system/string"],function(){var e=arguments,t=(e[e.length-1],e[0]["default"]),r=e[1].fmt,n=e[1].w,i=e[1].loc,a=e[1].camelize,o=e[1].decamelize,s=e[1].dasherize,l=e[1].underscore,u=e[1].capitalize,c=e[1].classify,h=String.prototype;(t.EXTEND_PROTOTYPES===!0||t.EXTEND_PROTOTYPES.String)&&(h.fmt=function(){return r(this,arguments)},h.w=function(){return n(this)},h.loc=function(){return i(this,arguments)},h.camelize=function(){return a(this)},h.decamelize=function(){return o(this)},h.dasherize=function(){return s(this)},h.underscore=function(){return l(this)},h.classify=function(){return c(this)},h.capitalize=function(){return u(this)})}),e("ember-runtime/keys",["ember-metal/enumerable_utils","ember-metal/platform","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].create,i=Object.keys;if(!i||n.isSimulated){var a=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","valueOf","toLocaleString","toString"],o=function(e,t,n){"__"!==n.substring(0,2)&&"_super"!==n&&(r.indexOf(t,n)>=0||("function"!=typeof e.hasOwnProperty||e.hasOwnProperty(n))&&t.push(n))};i=function(e){var t,r=[];for(t in e)o(e,r,t);for(var n=0,i=a.length;i>n;n++)t=a[n],o(e,r,t);return r}}t["default"]=i}),e("ember-runtime",["ember-metal","ember-runtime/core","ember-runtime/keys","ember-runtime/compare","ember-runtime/copy","ember-runtime/system/namespace","ember-runtime/system/object","ember-runtime/system/tracked_array","ember-runtime/system/subarray","ember-runtime/system/container","ember-runtime/system/application","ember-runtime/system/array_proxy","ember-runtime/system/object_proxy","ember-runtime/system/core_object","ember-runtime/system/each_proxy","ember-runtime/system/native_array","ember-runtime/system/set","ember-runtime/system/string","ember-runtime/system/deferred","ember-runtime/system/lazy_load","ember-runtime/mixins/array","ember-runtime/mixins/comparable","ember-runtime/mixins/copyable","ember-runtime/mixins/enumerable","ember-runtime/mixins/freezable","ember-runtime/mixins/observable","ember-runtime/mixins/action_handler","ember-runtime/mixins/deferred","ember-runtime/mixins/mutable_enumerable","ember-runtime/mixins/mutable_array","ember-runtime/mixins/target_action_support","ember-runtime/mixins/evented","ember-runtime/mixins/promise_proxy","ember-runtime/mixins/sortable","ember-runtime/computed/array_computed","ember-runtime/computed/reduce_computed","ember-runtime/computed/reduce_computed_macros","ember-runtime/controllers/array_controller","ember-runtime/controllers/object_controller","ember-runtime/controllers/controller","ember-runtime/ext/rsvp","ember-runtime/ext/string","ember-runtime/ext/function","exports"],function(){var e=arguments,t=e[e.length-1];i.compare=e[3]["default"],i.copy=e[4]["default"],i.isEqual=e[1].isEqual,i.keys=e[2]["default"],i.Array=e[20]["default"],i.Comparable=e[21]["default"],i.Copyable=e[22]["default"],i.SortableMixin=e[33]["default"],i.Freezable=e[24].Freezable,i.FROZEN_ERROR=e[24].FROZEN_ERROR,i.DeferredMixin=e[27]["default"],i.MutableEnumerable=e[28]["default"],i.MutableArray=e[29]["default"],i.TargetActionSupport=e[30]["default"],i.Evented=e[31]["default"],i.PromiseProxyMixin=e[32]["default"],i.Observable=e[25]["default"],i.arrayComputed=e[34].arrayComputed,i.ArrayComputedProperty=e[34].ArrayComputedProperty,i.reduceComputed=e[35].reduceComputed,i.ReduceComputedProperty=e[35].ReduceComputedProperty;var r=i.computed;r.sum=e[36].sum,r.min=e[36].min,r.max=e[36].max,r.map=e[36].map,r.sort=e[36].sort,r.setDiff=e[36].setDiff,r.mapBy=e[36].mapBy,r.mapProperty=e[36].mapProperty,r.filter=e[36].filter,r.filterBy=e[36].filterBy,r.filterProperty=e[36].filterProperty,r.uniq=e[36].uniq,r.union=e[36].union,r.intersect=e[36].intersect,i.String=e[17]["default"],i.Object=e[6]["default"],i.TrackedArray=e[7]["default"],i.SubArray=e[8]["default"],i.Container=e[9]["default"],i.Namespace=e[5]["default"],i.Application=e[10]["default"],i.Enumerable=e[23]["default"],i.ArrayProxy=e[11]["default"],i.ObjectProxy=e[12]["default"],i.ActionHandler=e[26]["default"],i.CoreObject=e[13]["default"],i.EachArray=e[14].EachArray,i.EachProxy=e[14].EachProxy,i.NativeArray=e[15]["default"],i.Set=e[16]["default"],i.Deferred=e[18]["default"],i.onLoad=e[19].onLoad,i.runLoadHooks=e[19].runLoadHooks,i.ArrayController=e[37]["default"],i.ObjectController=e[38]["default"],i.Controller=e[39].Controller,i.ControllerMixin=e[39].ControllerMixin,i.RSVP=e[40]["default"],t["default"]=i}),e("ember-runtime/mixins/action_handler",["ember-metal/merge","ember-metal/mixin","ember-metal/property_get","ember-metal/utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].Mixin,a=e[2].get,o=e[3].typeOf,s=n.create({mergedProperties:["_actions"],willMergeMixin:function(e){var t;e._actions||("object"===o(e.actions)?t="actions":"object"===o(e.events)&&(t="events"),t&&(e._actions=r(e._actions||{},e[t])),delete e[t])},send:function(e){var t,r=[].slice.call(arguments,1);if(this._actions&&this._actions[e]){if(this._actions[e].apply(this,r)!==!0)return}else if(!i.FEATURES.isEnabled("ember-routing-drop-deprecated-action-style")&&this.deprecatedSend&&this.deprecatedSendHandles&&this.deprecatedSendHandles(e)&&this.deprecatedSend.apply(this,[].slice.call(arguments))!==!0)return;(t=a(this,"target"))&&t.send.apply(t,arguments)}});t["default"]=s}),e("ember-runtime/mixins/array",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/computed","ember-metal/is_none","ember-runtime/mixins/enumerable","ember-metal/enumerable_utils","ember-metal/mixin","ember-metal/property_events","ember-metal/events","ember-metal/watching","exports"],function(){var e=arguments,r=e[e.length-1],n=e[0]["default"],i=e[1].get,a=(e[2].set,e[3].computed),o=e[3].cacheFor,s=e[4].isNone,l=(e[4].none,e[5]["default"]),u=e[6]["default"],c=e[7].Mixin,h=e[7].required,m=e[8].propertyWillChange,f=e[8].propertyDidChange,p=e[9].addListener,d=e[9].removeListener,g=e[9].sendEvent,v=e[9].hasListeners,b=e[10].isWatching,y=u.map,_=c.create(l,{length:h(),objectAt:function(e){return 0>e||e>=i(this,"length")?void 0:i(this,e)},objectsAt:function(e){var t=this;return y(e,function(e){return t.objectAt(e)})},nextObject:function(e){return this.objectAt(e)},"[]":a(function(e,t){return void 0!==t&&this.replace(0,i(this,"length"),t),this}),firstObject:a(function(){return this.objectAt(0)}),lastObject:a(function(){return this.objectAt(i(this,"length")-1)}),contains:function(e){return this.indexOf(e)>=0},slice:function(e,t){var r=n.A(),a=i(this,"length");for(s(e)&&(e=0),(s(t)||t>a)&&(t=a),0>e&&(e=a+e),0>t&&(t=a+t);t>e;)r[r.length]=this.objectAt(e++);return r},indexOf:function(e,t){var r,n=i(this,"length");for(void 0===t&&(t=0),0>t&&(t+=n),r=t;n>r;r++)if(this.objectAt(r)===e)return r;return-1},lastIndexOf:function(e,t){var r,n=i(this,"length");for((void 0===t||t>=n)&&(t=n-1),0>t&&(t+=n),r=t;r>=0;r--)if(this.objectAt(r)===e)return r;return-1},addArrayObserver:function(e,t){var r=t&&t.willChange||"arrayWillChange",n=t&&t.didChange||"arrayDidChange",a=i(this,"hasArrayObservers");return a||m(this,"hasArrayObservers"),p(this,"@array:before",e,r),p(this,"@array:change",e,n),a||f(this,"hasArrayObservers"),this},removeArrayObserver:function(e,t){var r=t&&t.willChange||"arrayWillChange",n=t&&t.didChange||"arrayDidChange",a=i(this,"hasArrayObservers");return a&&m(this,"hasArrayObservers"),d(this,"@array:before",e,r),d(this,"@array:change",e,n),a&&f(this,"hasArrayObservers"),this},hasArrayObservers:a(function(){return v(this,"@array:change")||v(this,"@array:before")}),arrayContentWillChange:function(e,t,r){void 0===e?(e=0,t=r=-1):(void 0===t&&(t=-1),void 0===r&&(r=-1)),b(this,"@each")&&i(this,"@each"),g(this,"@array:before",[this,e,t,r]);var n,a;if(e>=0&&t>=0&&i(this,"hasEnumerableObservers")){n=[],a=e+t;for(var o=e;a>o;o++)n.push(this.objectAt(o))}else n=t;return this.enumerableContentWillChange(n,r),this},arrayContentDidChange:function(e,t,r){void 0===e?(e=0,t=r=-1):(void 0===t&&(t=-1),void 0===r&&(r=-1));var n,a;if(e>=0&&r>=0&&i(this,"hasEnumerableObservers")){n=[],a=e+r;for(var s=e;a>s;s++)n.push(this.objectAt(s))}else n=r;this.enumerableContentDidChange(t,n),g(this,"@array:change",[this,e,t,r]);var l=i(this,"length"),u=o(this,"firstObject"),c=o(this,"lastObject");return this.objectAt(0)!==u&&(m(this,"firstObject"),f(this,"firstObject")),this.objectAt(l-1)!==c&&(m(this,"lastObject"),f(this,"lastObject")),this},"@each":a(function(){if(!this.__each){var e=t("ember-runtime/system/each_proxy").EachProxy;this.__each=new e(this)}return this.__each})});r["default"]=_}),e("ember-runtime/mixins/comparable",["ember-metal/mixin","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].Mixin,n=e[0].required,i=r.create({compare:n(Function)});t["default"]=i}),e("ember-runtime/mixins/copyable",["ember-metal/property_get","ember-metal/property_set","ember-metal/mixin","ember-runtime/mixins/freezable","ember-runtime/system/string","ember-metal/error","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].get,n=(e[1].set,e[2].required),i=e[3].Freezable,a=e[2].Mixin,o=e[4].fmt,s=e[5]["default"],l=a.create({copy:n(Function),frozenCopy:function(){if(i&&i.detect(this))return r(this,"isFrozen")?this:this.copy().freeze();throw new s(o("%@ does not support freezing",[this]))}});t["default"]=l}),e("ember-runtime/mixins/deferred",["ember-metal/core","ember-metal/property_get","ember-metal/mixin","ember-metal/computed","ember-metal/run_loop","ember-runtime/ext/rsvp","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=e[2].Mixin,a=e[3].computed,o=e[4]["default"],s=e[5]["default"];if(r.FEATURES["ember-runtime-test-friendly-promises"]){var l=function(){r.Test&&r.Test.adapter&&r.Test.adapter.asyncStart()},u=function(){r.Test&&r.Test.adapter&&r.Test.adapter.asyncEnd()};s.configure("async",function(e,t){var n=!o.currentRunLoop;r.testing&&n&&l(),o.backburner.schedule("actions",function(){r.testing&&n&&u(),e(t)})})}else s.configure("async",function(e,t){o.backburner.schedule("actions",function(){e(t)})});s.Promise.prototype.fail=function(e,t){return this["catch"](e,t)};var c=i.create({then:function(e,t,r){function i(t){return t===o?e(s):e(t)}var a,o,s;return s=this,a=n(this,"_deferred"),o=a.promise,o.then(e&&i,t,r)},resolve:function(e){var t,r;t=n(this,"_deferred"),r=t.promise,e===this?t.resolve(r):t.resolve(e)},reject:function(e){n(this,"_deferred").reject(e)},_deferred:a(function(){return s.defer("Ember: DeferredMixin - "+this)})});t["default"]=c}),e("ember-runtime/mixins/enumerable",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/mixin","ember-metal/enumerable_utils","ember-metal/computed","ember-metal/property_events","ember-metal/events","ember-runtime/compare","exports"],function(){function e(){return 0===C.length?{}:C.pop()}function t(e){return C.push(e),null}function r(e,t){function r(r){var i=o(r,e);return n?t===i:!!i}var n=2===arguments.length;return r}var n=arguments,i=n[n.length-1],a=n[0]["default"],o=n[1].get,s=n[2].set,l=n[3].apply,u=n[4].Mixin,c=n[4].required,h=n[4].aliasMethod,m=n[5]["default"],f=n[6].computed,p=n[7].propertyWillChange,d=n[7].propertyDidChange,g=n[8].addListener,v=n[8].removeListener,b=n[8].sendEvent,y=n[8].hasListeners,_=n[9]["default"],w=Array.prototype.slice,x=m.indexOf,C=[],E=u.create({nextObject:c(Function),firstObject:f(function(){if(0===o(this,"length"))return void 0;var r,n=e();return r=this.nextObject(0,null,n),t(n),r}).property("[]"),lastObject:f(function(){var r=o(this,"length");if(0===r)return void 0;var n,i=e(),a=0,s=null;do s=n,n=this.nextObject(a++,s,i);while(void 0!==n);return t(i),s}).property("[]"),contains:function(e){return void 0!==this.find(function(t){return t===e})},forEach:function(r,n){if("function"!=typeof r)throw new TypeError;var i=o(this,"length"),a=null,s=e();void 0===n&&(n=null);for(var l=0;i>l;l++){var u=this.nextObject(l,a,s);r.call(n,u,l,this),a=u}return a=null,s=t(s),this},getEach:function(e){return this.mapBy(e)},setEach:function(e,t){return this.forEach(function(r){s(r,e,t)})},map:function(e,t){var r=a.A();return this.forEach(function(n,i,a){r[i]=e.call(t,n,i,a)}),r},mapBy:function(e){return this.map(function(t){return o(t,e)})},mapProperty:h("mapBy"),filter:function(e,t){var r=a.A();return this.forEach(function(n,i,a){e.call(t,n,i,a)&&r.push(n)}),r},reject:function(e,t){return this.filter(function(){return!l(t,e,arguments)})},filterBy:function(){return this.filter(l(this,r,arguments))},filterProperty:h("filterBy"),rejectBy:function(e,t){var r=function(r){return o(r,e)===t},n=function(t){return!!o(t,e)},i=2===arguments.length?r:n;return this.reject(i)},rejectProperty:h("rejectBy"),find:function(r,n){var i=o(this,"length");void 0===n&&(n=null);for(var a,s,l=null,u=!1,c=e(),h=0;i>h&&!u;h++)a=this.nextObject(h,l,c),(u=r.call(n,a,h,this))&&(s=a),l=a;return a=l=null,c=t(c),s},findBy:function(){return this.find(l(this,r,arguments))},findProperty:h("findBy"),every:function(e,t){return!this.find(function(r,n,i){return!e.call(t,r,n,i)})},everyBy:h("isEvery"),everyProperty:h("isEvery"),isEvery:function(){return this.every(l(this,r,arguments))},any:function(r,n){var i,a,s=o(this,"length"),l=e(),u=!1,c=null;for(void 0===n&&(n=null),a=0;s>a&&!u;a++)i=this.nextObject(a,c,l),u=r.call(n,i,a,this),c=i;return i=c=null,l=t(l),u},some:h("any"),isAny:function(){return this.any(l(this,r,arguments))},anyBy:h("isAny"),someProperty:h("isAny"),reduce:function(e,t,r){if("function"!=typeof e)throw new TypeError;var n=t;return this.forEach(function(t,i){n=e(n,t,i,this,r)},this),n},invoke:function(e){var t,r=a.A();return arguments.length>1&&(t=w.call(arguments,1)),this.forEach(function(n,i){var a=n&&n[e];"function"==typeof a&&(r[i]=t?l(n,a,t):n[e]())},this),r},toArray:function(){var e=a.A();return this.forEach(function(t,r){e[r]=t}),e},compact:function(){return this.filter(function(e){return null!=e})},without:function(e){if(!this.contains(e))return this;var t=a.A();return this.forEach(function(r){r!==e&&(t[t.length]=r)}),t},uniq:function(){var e=a.A();return this.forEach(function(t){x(e,t)<0&&e.push(t)}),e},"[]":f(function(){return this}),addEnumerableObserver:function(e,t){var r=t&&t.willChange||"enumerableWillChange",n=t&&t.didChange||"enumerableDidChange",i=o(this,"hasEnumerableObservers");return i||p(this,"hasEnumerableObservers"),g(this,"@enumerable:before",e,r),g(this,"@enumerable:change",e,n),i||d(this,"hasEnumerableObservers"),this},removeEnumerableObserver:function(e,t){var r=t&&t.willChange||"enumerableWillChange",n=t&&t.didChange||"enumerableDidChange",i=o(this,"hasEnumerableObservers");return i&&p(this,"hasEnumerableObservers"),v(this,"@enumerable:before",e,r),v(this,"@enumerable:change",e,n),i&&d(this,"hasEnumerableObservers"),this},hasEnumerableObservers:f(function(){return y(this,"@enumerable:change")||y(this,"@enumerable:before")}),enumerableContentWillChange:function(e,t){var r,n,i;return r="number"==typeof e?e:e?o(e,"length"):e=-1,n="number"==typeof t?t:t?o(t,"length"):t=-1,i=0>n||0>r||n-r!==0,-1===e&&(e=null),-1===t&&(t=null),p(this,"[]"),i&&p(this,"length"),b(this,"@enumerable:before",[this,e,t]),this},enumerableContentDidChange:function(e,t){var r,n,i;return r="number"==typeof e?e:e?o(e,"length"):e=-1,n="number"==typeof t?t:t?o(t,"length"):t=-1,i=0>n||0>r||n-r!==0,-1===e&&(e=null),-1===t&&(t=null),b(this,"@enumerable:change",[this,e,t]),i&&d(this,"length"),d(this,"[]"),this},sortBy:function(){var e=arguments;return this.toArray().sort(function(t,r){for(var n=0;n<e.length;n++){var i=e[n],a=o(t,i),s=o(r,i),l=_(a,s);if(l)return l}return 0})}});i["default"]=E}),e("ember-runtime/mixins/evented",["ember-metal/mixin","ember-metal/events","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].Mixin,n=e[1].addListener,i=e[1].removeListener,a=e[1].hasListeners,o=e[1].sendEvent,s=r.create({on:function(e,t,r){return n(this,e,t,r),this},one:function(e,t,r){return r||(r=t,t=null),n(this,e,t,r,!0),this},trigger:function(e){var t,r,n=[];for(t=1,r=arguments.length;r>t;t++)n.push(arguments[t]);o(this,e,n)},off:function(e,t,r){return i(this,e,t,r),this},has:function(e){return a(this,e)}});t["default"]=s}),e("ember-runtime/mixins/freezable",["ember-metal/mixin","ember-metal/property_get","ember-metal/property_set","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].Mixin,n=e[1].get,i=e[2].set,a=r.create({isFrozen:!1,freeze:function(){return n(this,"isFrozen")?this:(i(this,"isFrozen",!0),this)}}),o="Frozen object cannot be modified.";t.Freezable=a,t.FROZEN_ERROR=o}),e("ember-runtime/mixins/mutable_array",["ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/error","ember-metal/mixin","ember-runtime/mixins/array","ember-runtime/mixins/mutable_enumerable","ember-runtime/mixins/enumerable","exports"],function(){var e=arguments,t=e[e.length-1],r="Index out of range",n=[],i=e[0].get,a=(e[1].set,e[2].isArray),o=e[3]["default"],s=e[4].Mixin,l=e[4].required,u=e[5]["default"],c=e[6]["default"],h=e[7]["default"],m=s.create(u,c,{replace:l(),clear:function(){var e=i(this,"length");return 0===e?this:(this.replace(0,e,n),this)},insertAt:function(e,t){if(e>i(this,"length"))throw new o(r);return this.replace(e,0,[t]),this},removeAt:function(e,t){if("number"==typeof e){if(0>e||e>=i(this,"length"))throw new o(r);void 0===t&&(t=1),this.replace(e,t,n)}return this},pushObject:function(e){return this.insertAt(i(this,"length"),e),e},pushObjects:function(e){if(!h.detect(e)&&!a(e))throw new TypeError("Must pass Ember.Enumerable to Ember.MutableArray#pushObjects");return this.replace(i(this,"length"),0,e),this},popObject:function(){var e=i(this,"length");if(0===e)return null;var t=this.objectAt(e-1);return this.removeAt(e-1,1),t},shiftObject:function(){if(0===i(this,"length"))return null;var e=this.objectAt(0);return this.removeAt(0),e},unshiftObject:function(e){return this.insertAt(0,e),e},unshiftObjects:function(e){return this.replace(0,0,e),this},reverseObjects:function(){var e=i(this,"length");if(0===e)return this;var t=this.toArray().reverse();return this.replace(0,e,t),this},setObjects:function(e){if(0===e.length)return this.clear();var t=i(this,"length");return this.replace(0,t,e),this},removeObject:function(e){for(var t=i(this,"length")||0;--t>=0;){var r=this.objectAt(t);r===e&&this.removeAt(t)}return this},addObject:function(e){return this.contains(e)||this.pushObject(e),this}});t["default"]=m}),e("ember-runtime/mixins/mutable_enumerable",["ember-metal/enumerable_utils","ember-runtime/mixins/enumerable","ember-metal/mixin","ember-metal/property_events","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],i=e[2].Mixin,a=e[2].required,o=e[3].beginPropertyChanges,s=e[3].endPropertyChanges,l=r.forEach,u=i.create(n,{addObject:a(Function),addObjects:function(e){return o(this),l(e,function(e){this.addObject(e)},this),s(this),this},removeObject:a(Function),removeObjects:function(e){o(this);for(var t=e.length-1;t>=0;t--)this.removeObject(e[t]);return s(this),this}});t["default"]=u}),e("ember-runtime/mixins/observable",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/get_properties","ember-metal/set_properties","ember-metal/mixin","ember-metal/events","ember-metal/property_events","ember-metal/observer","ember-metal/computed","ember-metal/is_none","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get),n=e[1].getWithDefault,i=e[2].set,a=e[3].apply,o=e[4]["default"],s=e[5]["default"],l=e[6].Mixin,u=e[7].hasListeners,c=e[8].beginPropertyChanges,h=e[8].propertyWillChange,m=e[8].propertyDidChange,f=e[8].endPropertyChanges,p=e[9].addObserver,d=e[9].addBeforeObserver,g=e[9].removeObserver,v=e[9].observersFor,b=e[10].cacheFor,y=e[11].isNone,_=Array.prototype.slice,w=l.create({get:function(e){return r(this,e)},getProperties:function(){return a(null,o,[this].concat(_.call(arguments)))},set:function(e,t){return i(this,e,t),this},setProperties:function(e){return s(this,e)},beginPropertyChanges:function(){return c(),this},endPropertyChanges:function(){return f(),this},propertyWillChange:function(e){return h(this,e),this},propertyDidChange:function(e){return m(this,e),this},notifyPropertyChange:function(e){return this.propertyWillChange(e),this.propertyDidChange(e),this},addBeforeObserver:function(e,t,r){d(this,e,t,r)},addObserver:function(e,t,r){p(this,e,t,r)},removeObserver:function(e,t,r){g(this,e,t,r)},hasObserverFor:function(e){return u(this,e+":change")},getWithDefault:function(e,t){return n(this,e,t)},incrementProperty:function(e,t){return y(t)&&(t=1),i(this,e,(parseFloat(r(this,e))||0)+t),r(this,e)},decrementProperty:function(e,t){return y(t)&&(t=1),i(this,e,(r(this,e)||0)-t),r(this,e)},toggleProperty:function(e){return i(this,e,!r(this,e)),r(this,e)},cacheFor:function(e){return b(this,e)},observersForKey:function(e){return v(this,e)}});t["default"]=w}),e("ember-runtime/mixins/promise_proxy",["ember-metal/property_get","ember-metal/property_set","ember-metal/computed","ember-metal/mixin","ember-metal/error","exports"],function(){function e(e,t){return a(e,"isFulfilled",!1),a(e,"isRejected",!1),t.then(function(t){return a(e,"isFulfilled",!0),a(e,"content",t),t},function(t){throw a(e,"isRejected",!0),a(e,"reason",t),t},"Ember: PromiseProxy")}function t(e){return function(){var t=i(this,"promise");return t[e].apply(t,arguments)}}var r=arguments,n=r[r.length-1],i=r[0].get,a=r[1].set,o=r[2].computed,s=r[3].Mixin,l=r[4]["default"],u=o.not,c=o.or,h=s.create({reason:null,isPending:u("isSettled").readOnly(),isSettled:c("isRejected","isFulfilled").readOnly(),isRejected:!1,isFulfilled:!1,promise:o(function(t,r){if(2===arguments.length)return e(this,r);throw new l("PromiseProxy's promise must be set")}),then:t("then"),"catch":t("catch"),"finally":t("finally")});n["default"]=h}),e("ember-runtime/mixins/sortable",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/enumerable_utils","ember-metal/mixin","ember-runtime/mixins/mutable_enumerable","ember-runtime/compare","ember-metal/observer","ember-metal/computed","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=(e[2].set,e[3]["default"]),a=e[4].Mixin,o=e[5]["default"],s=e[6]["default"],l=e[7].addObserver,u=e[7].removeObserver,c=e[8].computed,h=e[4].beforeObserver,m=e[4].observer,f=i.forEach,p=a.create(o,{sortProperties:null,sortAscending:!0,sortFunction:s,orderBy:function(e,t){var r=0,i=n(this,"sortProperties"),a=n(this,"sortAscending"),o=n(this,"sortFunction");return f(i,function(i){0===r&&(r=o.call(this,n(e,i),n(t,i)),0===r||a||(r=-1*r))},this),r},destroy:function(){var e=n(this,"content"),t=n(this,"sortProperties");return e&&t&&f(e,function(e){f(t,function(t){u(e,t,this,"contentItemSortPropertyDidChange")},this)},this),this._super()},isSorted:c.bool("sortProperties"),arrangedContent:c("content","sortProperties.@each",function(){var e=n(this,"content"),t=n(this,"isSorted"),i=n(this,"sortProperties"),a=this;return e&&t?(e=e.slice(),e.sort(function(e,t){return a.orderBy(e,t)}),f(e,function(e){f(i,function(t){l(e,t,this,"contentItemSortPropertyDidChange")},this)},this),r.A(e)):e}),_contentWillChange:h("content",function(){var e=n(this,"content"),t=n(this,"sortProperties");e&&t&&f(e,function(e){f(t,function(t){u(e,t,this,"contentItemSortPropertyDidChange")},this)},this),this._super()}),sortPropertiesWillChange:h("sortProperties",function(){this._lastSortAscending=void 0}),sortPropertiesDidChange:m("sortProperties",function(){this._lastSortAscending=void 0}),sortAscendingWillChange:h("sortAscending",function(){this._lastSortAscending=n(this,"sortAscending")}),sortAscendingDidChange:m("sortAscending",function(){if(void 0!==this._lastSortAscending&&n(this,"sortAscending")!==this._lastSortAscending){var e=n(this,"arrangedContent");e.reverseObjects()}}),contentArrayWillChange:function(e,t,r,i){var a=n(this,"isSorted");if(a){var o=n(this,"arrangedContent"),s=e.slice(t,t+r),l=n(this,"sortProperties");f(s,function(e){o.removeObject(e),f(l,function(t){u(e,t,this,"contentItemSortPropertyDidChange")},this)},this)}return this._super(e,t,r,i)},contentArrayDidChange:function(e,t,r,i){var a=n(this,"isSorted"),o=n(this,"sortProperties");if(a){var s=e.slice(t,t+i);f(s,function(e){this.insertItemSorted(e),f(o,function(t){l(e,t,this,"contentItemSortPropertyDidChange")},this)},this)}return this._super(e,t,r,i)},insertItemSorted:function(e){var t=n(this,"arrangedContent"),r=n(t,"length"),i=this._binarySearch(e,0,r);t.insertAt(i,e)},contentItemSortPropertyDidChange:function(e){var t=n(this,"arrangedContent"),r=t.indexOf(e),i=t.objectAt(r-1),a=t.objectAt(r+1),o=i&&this.orderBy(e,i),s=a&&this.orderBy(e,a);(0>o||s>0)&&(t.removeObject(e),this.insertItemSorted(e))},_binarySearch:function(e,t,r){var i,a,o,s;return t===r?t:(s=n(this,"arrangedContent"),i=t+Math.floor((r-t)/2),a=s.objectAt(i),o=this.orderBy(a,e),0>o?this._binarySearch(e,i+1,r):o>0?this._binarySearch(e,t,i):i)}});t["default"]=p}),e("ember-runtime/mixins/target_action_support",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/mixin","ember-metal/computed","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=(e[2].set,e[3].typeOf),a=e[4].Mixin,o=e[5].computed,s=a.create({target:null,action:null,actionContext:null,targetObject:o(function(){var e=n(this,"target");if("string"===i(e)){var t=n(this,e);return void 0===t&&(t=n(r.lookup,e)),t}return e}).property("target"),actionContextObject:o(function(){var e=n(this,"actionContext");if("string"===i(e)){var t=n(this,e);return void 0===t&&(t=n(r.lookup,e)),t}return e}).property("actionContext"),triggerAction:function(e){function t(e,t){var r=[];return t&&r.push(t),r.concat(e)}e=e||{};var r=e.action||n(this,"action"),i=e.target||n(this,"targetObject"),a=e.actionContext;if("undefined"==typeof a&&(a=n(this,"actionContextObject")||this),i&&r){var o;return o=i.send?i.send.apply(i,t(a,r)):i[r].apply(i,t(a)),o!==!1&&(o=!0),o}return!1}});t["default"]=s}),e("ember-runtime/system/application",["ember-runtime/system/namespace","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=r.extend();t["default"]=n}),e("ember-runtime/system/array_proxy",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/computed","ember-metal/mixin","ember-metal/property_events","ember-metal/error","ember-runtime/system/object","ember-runtime/mixins/mutable_array","ember-runtime/mixins/enumerable","ember-runtime/system/string","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=(e[2].set,e[3].isArray),a=e[3].apply,o=e[4].computed,s=e[5].beforeObserver,l=e[5].observer,u=e[6].beginPropertyChanges,c=e[6].endPropertyChanges,h=e[7]["default"],m=e[8]["default"],f=e[9]["default"],p=e[10]["default"],d=(e[11].fmt,"Index out of range"),g=[],v=o.alias,b=r.K,y=m.extend(f,{content:null,arrangedContent:v("content"),objectAtContent:function(e){return n(this,"arrangedContent").objectAt(e)},replaceContent:function(e,t,r){n(this,"content").replace(e,t,r)},_contentWillChange:s("content",function(){this._teardownContent()}),_teardownContent:function(){var e=n(this,"content");e&&e.removeArrayObserver(this,{willChange:"contentArrayWillChange",didChange:"contentArrayDidChange"})},contentArrayWillChange:b,contentArrayDidChange:b,_contentDidChange:l("content",function(){n(this,"content");this._setupContent()}),_setupContent:function(){var e=n(this,"content");e&&e.addArrayObserver(this,{willChange:"contentArrayWillChange",didChange:"contentArrayDidChange"})},_arrangedContentWillChange:s("arrangedContent",function(){var e=n(this,"arrangedContent"),t=e?n(e,"length"):0;this.arrangedContentArrayWillChange(this,0,t,void 0),this.arrangedContentWillChange(this),this._teardownArrangedContent(e)}),_arrangedContentDidChange:l("arrangedContent",function(){var e=n(this,"arrangedContent"),t=e?n(e,"length"):0;this._setupArrangedContent(),this.arrangedContentDidChange(this),this.arrangedContentArrayDidChange(this,0,void 0,t)}),_setupArrangedContent:function(){var e=n(this,"arrangedContent");e&&e.addArrayObserver(this,{willChange:"arrangedContentArrayWillChange",didChange:"arrangedContentArrayDidChange"})},_teardownArrangedContent:function(){var e=n(this,"arrangedContent");e&&e.removeArrayObserver(this,{willChange:"arrangedContentArrayWillChange",didChange:"arrangedContentArrayDidChange"})},arrangedContentWillChange:b,arrangedContentDidChange:b,objectAt:function(e){return n(this,"content")&&this.objectAtContent(e)},length:o(function(){var e=n(this,"arrangedContent");return e?n(e,"length"):0}),_replace:function(e,t,r){var i=n(this,"content");return i&&this.replaceContent(e,t,r),this},replace:function(){if(n(this,"arrangedContent")!==n(this,"content"))throw new h("Using replace on an arranged ArrayProxy is not allowed.");a(this,this._replace,arguments)},_insertAt:function(e,t){if(e>n(this,"content.length"))throw new h(d);return this._replace(e,0,[t]),this},insertAt:function(e,t){if(n(this,"arrangedContent")===n(this,"content"))return this._insertAt(e,t);throw new h("Using insertAt on an arranged ArrayProxy is not allowed.")},removeAt:function(e,t){if("number"==typeof e){var r,i=n(this,"content"),a=n(this,"arrangedContent"),o=[];if(0>e||e>=n(this,"length"))throw new h(d);for(void 0===t&&(t=1),r=e;e+t>r;r++)o.push(i.indexOf(a.objectAt(r)));for(o.sort(function(e,t){return t-e}),u(),r=0;r<o.length;r++)this._replace(o[r],1,g);c()}return this},pushObject:function(e){return this._insertAt(n(this,"content.length"),e),e},pushObjects:function(e){if(!p.detect(e)&&!i(e))throw new TypeError("Must pass Ember.Enumerable to Ember.MutableArray#pushObjects");return this._replace(n(this,"length"),0,e),this},setObjects:function(e){if(0===e.length)return this.clear();var t=n(this,"length");return this._replace(0,t,e),this},unshiftObject:function(e){return this._insertAt(0,e),e},unshiftObjects:function(e){return this._replace(0,0,e),this},slice:function(){var e=this.toArray();return e.slice.apply(e,arguments)},arrangedContentArrayWillChange:function(e,t,r,n){this.arrayContentWillChange(t,r,n)},arrangedContentArrayDidChange:function(e,t,r,n){this.arrayContentDidChange(t,r,n)},init:function(){this._super(),this._setupContent(),this._setupArrangedContent()},willDestroy:function(){this._teardownArrangedContent(),this._teardownContent()}});t["default"]=y}),e("ember-runtime/system/container",["ember-metal/property_set","exports"],function(){var e=arguments,r=e[e.length-1],n=e[0]["default"],i=t("container")["default"];i.set=n,r["default"]=i}),e("ember-runtime/system/core_object",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/platform","ember-metal/watching","ember-metal/chains","ember-metal/events","ember-metal/mixin","ember-metal/enumerable_utils","ember-metal/error","ember-runtime/keys","ember-runtime/mixins/action_handler","ember-metal/properties","ember-metal/binding","ember-metal/computed","ember-metal/run_loop","exports"],function(){function e(){var e,t,r=!1,n=function(){r||n.proto(),S(this,u,L),S(this,"__nextSuper",M);var i=c(this),a=i.proto;if(i.proto=this,e){var s=e;e=null,o(this,this.reopen,s)
}if(t){var l=t;t=null;for(var h=this.concatenatedProperties,f=0,v=l.length;v>f;f++){var b=l[f];if("object"!=typeof b&&void 0!==b)throw new _("Ember.Object.create only accepts objects.");if(b)for(var y=x(b),w=0,E=y.length;E>w;w++){var O=y[w];if(b.hasOwnProperty(O)){var P=b[O];if(g.test(O)){var A=i.bindings;A?i.hasOwnProperty("bindings")||(A=i.bindings=T(i.bindings)):A=i.bindings={},A[O]=P}var I=i.descs[O];if(h&&D(h,O)>=0){var N=this[O];P=N?"function"==typeof N.concat?N.concat(P):m(N).concat(P):m(P)}I?I.set(this,O,P):"function"!=typeof this.setUnknownProperty||O in this?k?C(this,O,null,P):this[O]=P:this.setUnknownProperty(O,P)}}}}V(this,i),o(this,this.init,arguments),i.proto=a,p(this),d(this,"init")};return n.toString=v.prototype.toString,n.willReopen=function(){r&&(n.PrototypeMixin=v.create(n.PrototypeMixin)),r=!1},n._initMixins=function(t){e=t},n._initProperties=function(e){t=e},n.proto=function(){var e=n.superclass;return e&&e.proto(),r||(r=!0,n.PrototypeMixin.applyPartial(n.prototype),f(n.prototype)),this.prototype},n}function t(e){return function(){return e}}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=(r[1].get,r[2].set,r[3].guidFor),o=r[3].apply,s=r[4].create,l=r[3].generateGuid,u=r[3].GUID_KEY,c=r[3].meta,h=r[3].META_KEY,m=r[3].makeArray,f=r[5].rewatch,p=r[6].finishChains,d=r[7].sendEvent,g=r[8].IS_BINDING,v=r[8].Mixin,b=r[8].required,y=r[9]["default"],_=r[10]["default"],w=r[4].platform,x=r[11]["default"],C=(r[12]["default"],r[13].defineProperty),E=r[14].Binding,O=r[15].ComputedProperty,P=r[16]["default"],A=r[5].destroy,T=s,S=w.defineProperty,I=P.schedule,N=v._apply,V=v.finishPartial,R=v.prototype.reopen,k=i.ENV.MANDATORY_SETTER,D=y.indexOf,j=i.K,M={configurable:!0,writable:!0,enumerable:!1,value:void 0},L={configurable:!0,writable:!0,enumerable:!1,value:null},H=e();H.toString=function(){return"Ember.CoreObject"},H.PrototypeMixin=v.create({reopen:function(){return N(this,arguments,!0),this},init:function(){},concatenatedProperties:null,isDestroyed:!1,isDestroying:!1,destroy:function(){return this.isDestroying?void 0:(this.isDestroying=!0,I("actions",this,this.willDestroy),I("destroy",this,this._scheduledDestroy),this)},willDestroy:j,_scheduledDestroy:function(){this.isDestroyed||(A(this),this.isDestroyed=!0)},bind:function(e,t){return t instanceof E||(t=E.from(t)),t.to(e).connect(this),t},toString:function(){var e="function"==typeof this.toStringExtension,r=e?":"+this.toStringExtension():"",n="<"+this.constructor.toString()+":"+a(this)+r+">";return this.toString=t(n),n}}),H.PrototypeMixin.ownerConstructor=H,i.config.overridePrototypeMixin&&i.config.overridePrototypeMixin(H.PrototypeMixin),H.__super__=null;var B=v.create({ClassMixin:b(),PrototypeMixin:b(),isClass:!0,isMethod:!1,extend:function(){var t,r=e();return r.ClassMixin=v.create(this.ClassMixin),r.PrototypeMixin=v.create(this.PrototypeMixin),r.ClassMixin.ownerConstructor=r,r.PrototypeMixin.ownerConstructor=r,R.apply(r.PrototypeMixin,arguments),r.superclass=this,r.__super__=this.prototype,t=r.prototype=T(this.prototype),t.constructor=r,l(t),c(t).proto=t,r.ClassMixin.apply(r),r},createWithMixins:function(){var e=this;return arguments.length>0&&this._initMixins(arguments),new e},create:function(){var e=this;return arguments.length>0&&this._initProperties(arguments),new e},reopen:function(){return this.willReopen(),o(this.PrototypeMixin,R,arguments),this},reopenClass:function(){return o(this.ClassMixin,R,arguments),N(this,arguments,!1),this},detect:function(e){if("function"!=typeof e)return!1;for(;e;){if(e===this)return!0;e=e.superclass}return!1},detectInstance:function(e){return e instanceof this},metaForProperty:function(e){var t=this.proto()[h],r=t&&t.descs[e];return r._meta||{}},eachComputedProperty:function(e,t){var r,n=this.proto(),i=c(n).descs,a={};for(var o in i)r=i[o],r instanceof O&&e.call(t||this,o,r._meta||a)}});B.ownerConstructor=H,i.config.overrideClassMixin&&i.config.overrideClassMixin(B),H.ClassMixin=B,B.apply(H),n["default"]=H}),e("ember-runtime/system/deferred",["ember-runtime/mixins/deferred","ember-metal/property_get","ember-runtime/system/object","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=(e[1].get,e[2]["default"]),i=n.extend(r);i.reopenClass({promise:function(e,t){var r=i.create();return e.call(t,r),r}}),t["default"]=i}),e("ember-runtime/system/each_proxy",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/enumerable_utils","ember-metal/array","ember-runtime/mixins/array","ember-runtime/system/object","ember-metal/computed","ember-metal/observer","ember-metal/events","ember-metal/properties","ember-metal/property_events","exports"],function(){function e(e,t,r,n,i){var o,s=r._objects;for(s||(s=r._objects={});--i>=n;){var l=e.objectAt(i);l&&(m(l,t,r,"contentKeyWillChange"),h(l,t,r,"contentKeyDidChange"),o=a(l),s[o]||(s[o]=[]),s[o].push(i))}}function t(e,t,r,n,i){var o=r._objects;o||(o=r._objects={});for(var l,u;--i>=n;){var c=e.objectAt(i);c&&(f(c,t,r,"contentKeyWillChange"),p(c,t,r,"contentKeyDidChange"),u=a(c),l=o[u],l[s.call(l,i)]=null)}}var r=arguments,n=r[r.length-1],i=(r[0]["default"],r[1].get),a=(r[2].set,r[3].guidFor),o=r[4]["default"],s=r[5].indexOf,l=r[6]["default"],u=r[7]["default"],c=r[8].computed,h=r[9].addObserver,m=r[9].addBeforeObserver,f=r[9].removeBeforeObserver,p=r[9].removeObserver,d=(r[3].typeOf,r[10].watchedEvents),g=r[11].defineProperty,v=r[12].beginPropertyChanges,b=r[12].propertyDidChange,y=r[12].propertyWillChange,_=r[12].endPropertyChanges,w=r[12].changeProperties,x=o.forEach,C=u.extend(l,{init:function(e,t,r){this._super(),this._keyName=t,this._owner=r,this._content=e},objectAt:function(e){var t=this._content.objectAt(e);return t&&i(t,this._keyName)},length:c(function(){var e=this._content;return e?i(e,"length"):0})}),E=/^.+:(before|change)$/,O=u.extend({init:function(e){this._super(),this._content=e,e.addArrayObserver(this),x(d(this),function(e){this.didAddListener(e)},this)},unknownProperty:function(e){var t;return t=new C(this._content,e,this),g(this,e,null,t),this.beginObservingContentKey(e),t},arrayWillChange:function(e,r,n){var i,a,o=this._keys;a=n>0?r+n:-1,v(this);for(i in o)o.hasOwnProperty(i)&&(a>0&&t(e,i,this,r,a),y(this,i));y(this._content,"@each"),_(this)},arrayDidChange:function(t,r,n,i){var a,o=this._keys;a=i>0?r+i:-1,w(function(){for(var n in o)o.hasOwnProperty(n)&&(a>0&&e(t,n,this,r,a),b(this,n));b(this._content,"@each")},this)},didAddListener:function(e){E.test(e)&&this.beginObservingContentKey(e.slice(0,-7))},didRemoveListener:function(e){E.test(e)&&this.stopObservingContentKey(e.slice(0,-7))},beginObservingContentKey:function(t){var r=this._keys;if(r||(r=this._keys={}),r[t])r[t]++;else{r[t]=1;var n=this._content,a=i(n,"length");e(n,t,this,0,a)}},stopObservingContentKey:function(e){var r=this._keys;if(r&&r[e]>0&&--r[e]<=0){var n=this._content,a=i(n,"length");t(n,e,this,0,a)}},contentKeyWillChange:function(e,t){y(this,t)},contentKeyDidChange:function(e,t){b(this,t)}});n.EachArray=C,n.EachProxy=O}),e("ember-runtime/system/lazy_load",["ember-metal/core","ember-metal/array","ember-runtime/system/native_array","exports"],function(){function e(e,t){var r;o[e]=o[e]||i.A(),o[e].pushObject(t),(r=s[e])&&t(r)}function t(e,t){if(s[e]=t,"object"==typeof window&&"function"==typeof window.dispatchEvent&&"function"==typeof CustomEvent){var r=new CustomEvent(e,{detail:t,name:e});window.dispatchEvent(r)}o[e]&&a.call(o[e],function(e){e(t)})}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1].forEach,o=i.ENV.EMBER_LOAD_HOOKS||{},s={};n.onLoad=e,n.runLoadHooks=t}),e("ember-runtime/system/namespace",["ember-metal/core","ember-metal/property_get","ember-metal/array","ember-metal/utils","ember-metal/mixin","ember-runtime/system/object","exports"],function(){function e(t,r,i){var o=t.length;g[t.join(".")]=r;for(var s in r)if(v.call(r,s)){var l=r[s];if(t[o]=s,l&&l.toString===n)l.toString=a(t.join(".")),l[y]=t.join(".");else if(l&&l.isNamespace){if(i[m(l)])continue;i[m(l)]=!0,e(t,l,i)}}t.length=o}function t(){var e,t,r=l.lookup;if(!d.PROCESSED)for(var n in r)if(b.test(n)&&(!r.hasOwnProperty||r.hasOwnProperty(n))){try{e=r[n],t=e&&e.isNamespace}catch(i){continue}t&&(e[y]=n)}}function r(e){var t=e.superclass;return t?t[y]?t[y]:r(t):void 0}function n(){l.BOOTED||this[y]||i();var e;if(this[y])e=this[y];else if(this._toString)e=this._toString;else{var t=r(this);e=t?"(subclass of "+t+")":"(unknown mixin)",this.toString=a(e)}return e}function i(){var r=!d.PROCESSED,n=l.anyUnprocessedMixins;if(r&&(t(),d.PROCESSED=!0),r||n){for(var i,a=d.NAMESPACES,o=0,s=a.length;s>o;o++)i=a[o],e([i.toString()],i,{});l.anyUnprocessedMixins=!1}}function a(e){return function(){return e}}var o=arguments,s=o[o.length-1],l=o[0]["default"],u=o[1].get,c=o[2].indexOf,h=o[3].GUID_KEY,m=o[3].guidFor,f=o[4].Mixin,p=o[5]["default"],d=p.extend({isNamespace:!0,init:function(){d.NAMESPACES.push(this),d.PROCESSED=!1},toString:function(){var e=u(this,"name");return e?e:(t(),this[y])},nameClasses:function(){e([this.toString()],this,{})},destroy:function(){var e=d.NAMESPACES,t=this.toString();t&&(l.lookup[t]=void 0,delete d.NAMESPACES_BY_ID[t]),e.splice(c.call(e,this),1),this._super()}});d.reopenClass({NAMESPACES:[l],NAMESPACES_BY_ID:{},PROCESSED:!1,processAll:i,byName:function(e){return l.BOOTED||i(),g[e]}});var g=d.NAMESPACES_BY_ID,v={}.hasOwnProperty,b=/^[A-Z]/,y=l.NAME_KEY=h+"_name";f.prototype.toString=n,s["default"]=d}),e("ember-runtime/system/native_array",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/enumerable_utils","ember-metal/mixin","ember-runtime/mixins/array","ember-runtime/mixins/mutable_array","ember-runtime/mixins/observable","ember-runtime/mixins/copyable","ember-runtime/mixins/freezable","ember-runtime/copy","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=(e[2].set,e[3]["default"]),a=e[4].Mixin,o=e[5]["default"],s=e[6]["default"],l=e[7]["default"],u=e[8]["default"],c=e[9].FROZEN_ERROR,h=e[10]["default"],m=i._replace,f=i.forEach,p=a.create(s,l,u,{get:function(e){return"length"===e?this.length:"number"==typeof e?this[e]:this._super(e)},objectAt:function(e){return this[e]},replace:function(e,t,r){if(this.isFrozen)throw c;var i=r?n(r,"length"):0;return this.arrayContentWillChange(e,t,i),0===i?this.splice(e,t):m(this,e,t,r),this.arrayContentDidChange(e,t,i),this},unknownProperty:function(e,t){var r;return void 0!==t&&void 0===r&&(r=this[e]=t),r},indexOf:function(e,t){var r,n=this.length;for(t=void 0===t?0:0>t?Math.ceil(t):Math.floor(t),0>t&&(t+=n),r=t;n>r;r++)if(this[r]===e)return r;return-1},lastIndexOf:function(e,t){var r,n=this.length;for(t=void 0===t?n-1:0>t?Math.ceil(t):Math.floor(t),0>t&&(t+=n),r=t;r>=0;r--)if(this[r]===e)return r;return-1},copy:function(e){return e?this.map(function(e){return h(e,!0)}):this.slice()}}),d=["length"];f(p.keys(),function(e){Array.prototype[e]&&d.push(e)}),d.length>0&&(p=p.without.apply(p,d));var g=function(e){return void 0===e&&(e=[]),o.detect(e)?e:p.apply(e)};p.activate=function(){p.apply(Array.prototype),g=function(e){return e||[]}},(r.EXTEND_PROTOTYPES===!0||r.EXTEND_PROTOTYPES.Array)&&p.activate(),r.A=g,t.A=g,t.NativeArray=p,t["default"]=p}),e("ember-runtime/system/object",["ember-runtime/system/core_object","ember-runtime/mixins/observable","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],i=r.extend(n);i.toString=function(){return"Ember.Object"},t["default"]=i}),e("ember-runtime/system/object_proxy",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/observer","ember-metal/property_events","ember-metal/computed","ember-metal/properties","ember-metal/mixin","ember-runtime/system/string","ember-runtime/system/object","exports"],function(){function e(e,t){var r=t.slice(8);r in this||h(this,r)}function t(e,t){var r=t.slice(8);r in this||m(this,r)}var r=arguments,n=r[r.length-1],i=(r[0]["default"],r[1].get),a=r[2].set,o=r[3].meta,s=r[4].addObserver,l=r[4].removeObserver,u=r[4].addBeforeObserver,c=r[4].removeBeforeObserver,h=r[5].propertyWillChange,m=r[5].propertyDidChange,f=r[6].computed,p=r[7].defineProperty,d=r[8].observer,g=(r[9].fmt,r[10]["default"]),v=g.extend({content:null,_contentDidChange:d("content",function(){}),isTruthy:f.bool("content"),_debugContainerKey:null,willWatchProperty:function(r){var n="content."+r;u(this,n,null,e),s(this,n,null,t)},didUnwatchProperty:function(r){var n="content."+r;c(this,n,null,e),l(this,n,null,t)},unknownProperty:function(e){var t=i(this,"content");return t?i(t,e):void 0},setUnknownProperty:function(e,t){var r=o(this);if(r.proto===this)return p(this,e,null,t),t;var n=i(this,"content");return a(n,e,t)}});n["default"]=v}),e("ember-runtime/system/set",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-metal/is_none","ember-runtime/system/string","ember-runtime/system/core_object","ember-runtime/mixins/mutable_enumerable","ember-runtime/mixins/enumerable","ember-runtime/mixins/copyable","ember-runtime/mixins/freezable","ember-metal/error","ember-metal/property_events","ember-metal/mixin","ember-metal/computed","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get),n=e[2].set,i=e[3].guidFor,a=e[4].isNone,o=e[5].fmt,s=e[6]["default"],l=e[7]["default"],u=e[8]["default"],c=e[9]["default"],h=e[10].Freezable,m=e[10].FROZEN_ERROR,f=e[11]["default"],p=e[12].propertyWillChange,d=e[12].propertyDidChange,g=e[13].aliasMethod,v=e[14].computed,b=s.extend(l,c,h,{length:0,clear:function(){if(this.isFrozen)throw new f(m);var e=r(this,"length");if(0===e)return this;var t;this.enumerableContentWillChange(e,0),p(this,"firstObject"),p(this,"lastObject");for(var a=0;e>a;a++)t=i(this[a]),delete this[t],delete this[a];return n(this,"length",0),d(this,"firstObject"),d(this,"lastObject"),this.enumerableContentDidChange(e,0),this},isEqual:function(e){if(!u.detect(e))return!1;var t=r(this,"length");if(r(e,"length")!==t)return!1;for(;--t>=0;)if(!e.contains(this[t]))return!1;return!0},add:g("addObject"),remove:g("removeObject"),pop:function(){if(r(this,"isFrozen"))throw new f(m);var e=this.length>0?this[this.length-1]:null;return this.remove(e),e},push:g("addObject"),shift:g("pop"),unshift:g("push"),addEach:g("addObjects"),removeEach:g("removeObjects"),init:function(e){this._super(),e&&this.addObjects(e)},nextObject:function(e){return this[e]},firstObject:v(function(){return this.length>0?this[0]:void 0}),lastObject:v(function(){return this.length>0?this[this.length-1]:void 0}),addObject:function(e){if(r(this,"isFrozen"))throw new f(m);if(a(e))return this;var t,o=i(e),s=this[o],l=r(this,"length");return s>=0&&l>s&&this[s]===e?this:(t=[e],this.enumerableContentWillChange(null,t),p(this,"lastObject"),l=r(this,"length"),this[o]=l,this[l]=e,n(this,"length",l+1),d(this,"lastObject"),this.enumerableContentDidChange(null,t),this)},removeObject:function(e){if(r(this,"isFrozen"))throw new f(m);if(a(e))return this;var t,o,s=i(e),l=this[s],u=r(this,"length"),c=0===l,h=l===u-1;return l>=0&&u>l&&this[l]===e&&(o=[e],this.enumerableContentWillChange(o,null),c&&p(this,"firstObject"),h&&p(this,"lastObject"),u-1>l&&(t=this[u-1],this[l]=t,this[i(t)]=l),delete this[s],delete this[u-1],n(this,"length",u-1),c&&d(this,"firstObject"),h&&d(this,"lastObject"),this.enumerableContentDidChange(o,null)),this},contains:function(e){return this[i(e)]>=0},copy:function(){var e=this.constructor,t=new e,a=r(this,"length");for(n(t,"length",a);--a>=0;)t[a]=this[a],t[i(this[a])]=a;return t},toString:function(){var e,t=this.length,r=[];for(e=0;t>e;e++)r[e]=this[e];return o("Ember.Set<%@>",[r.join(",")])}});t["default"]=b}),e("ember-runtime/system/string",["ember-metal/core","ember-metal/utils","exports"],function(){function e(e,t){var r=0;return e.replace(/%@([0-9]+)?/g,function(e,n){return n=n?parseInt(n,10)-1:r++,e=t[n],null===e?"(null)":void 0===e?"":m(e)})}function t(t,r){return t=h.STRINGS[t]||t,e(t,r)}function r(e){return e.split(/\s+/)}function n(e){return e.replace(d,"$1_$2").toLowerCase()}function i(e){var t,r=p,i=r.hasOwnProperty(e);return i?r[e]:(t=n(e).replace(f,"-"),r[e]=t,t)}function a(e){return e.replace(g,function(e,t,r){return r?r.toUpperCase():""}).replace(/^([A-Z])/,function(e){return e.toLowerCase()})}function o(e){for(var t=e.split("."),r=[],n=0,i=t.length;i>n;n++){var o=a(t[n]);r.push(o.charAt(0).toUpperCase()+o.substr(1))}return r.join(".")}function s(e){return e.replace(v,"$1_$2").replace(b,"_").toLowerCase()}function l(e){return e.charAt(0).toUpperCase()+e.substr(1)}var u=arguments,c=u[u.length-1],h=u[0]["default"],m=u[1].inspect,f=/[ _]/g,p={},d=/([a-z\d])([A-Z])/g,g=/(\-|_|\.|\s)+(.)?/g,v=/([a-z\d])([A-Z]+)/g,b=/\-|\s+/g;h.STRINGS={};var y={fmt:e,loc:t,w:r,decamelize:n,dasherize:i,camelize:a,classify:o,underscore:s,capitalize:l};c["default"]=y,c.fmt=e,c.loc=t,c.w=r,c.decamelize=n,c.dasherize=i,c.camelize=a,c.classify=o,c.underscore=s,c.capitalize=l}),e("ember-runtime/system/subarray",["ember-metal/property_get","ember-metal/error","ember-metal/enumerable_utils","exports"],function(){function e(e,t){this.type=e,this.count=t}function t(t){arguments.length<1&&(t=0),this._operations=t>0?[new e(a,t)]:[]}var r=arguments,n=r[r.length-1],i=(r[0].get,r[1]["default"]),a=(r[2]["default"],"r"),o="f";t.prototype={addItem:function(t,r){var n=-1,i=r?a:o,s=this;return this._findOperation(t,function(o,l,u,c,h){var m,f;i===o.type?++o.count:t===u?s._operations.splice(l,0,new e(i,1)):(m=new e(i,1),f=new e(o.type,c-t+1),o.count=t-u,s._operations.splice(l+1,0,m,f)),r&&(n=o.type===a?h+(t-u):h),s._composeAt(l)},function(t){s._operations.push(new e(i,1)),r&&(n=t),s._composeAt(s._operations.length-1)}),n},removeItem:function(e){var t=-1,r=this;return this._findOperation(e,function(n,i,o,s,l){n.type===a&&(t=l+(e-o)),n.count>1?--n.count:(r._operations.splice(i,1),r._composeAt(i))},function(){throw new i("Can't remove an item that has never been added.")}),t},_findOperation:function(e,t,r){var n,i,o,s,l,u=0;for(n=s=0,i=this._operations.length;i>n;s=l+1,++n){if(o=this._operations[n],l=s+o.count-1,e>=s&&l>=e)return t(o,n,s,l,u),void 0;o.type===a&&(u+=o.count)}r(u)},_composeAt:function(e){var t,r=this._operations[e];r&&(e>0&&(t=this._operations[e-1],t.type===r.type&&(r.count+=t.count,this._operations.splice(e-1,1),--e)),e<this._operations.length-1&&(t=this._operations[e+1],t.type===r.type&&(r.count+=t.count,this._operations.splice(e+1,1))))},toString:function(){var e="";return forEach(this._operations,function(t){e+=" "+t.type+":"+t.count}),e.substring(1)}},n["default"]=t}),e("ember-runtime/system/tracked_array",["ember-metal/property_get","ember-metal/enumerable_utils","exports"],function(){function e(e){arguments.length<1&&(e=[]);var r=a(e,"length");this._operations=r?[new t(l,r,e)]:[]}function t(e,t,r){this.type=e,this.count=t,this.items=r}function r(e,t,r,n){this.operation=e,this.index=t,this.split=r,this.rangeStart=n}var n=arguments,i=n[n.length-1],a=n[0].get,o=n[1]["default"],s=o.forEach,l="r",u="i",c="d";e.RETAIN=l,e.INSERT=u,e.DELETE=c,e.prototype={addItems:function(e,r){var n=a(r,"length");if(!(1>n)){var i,o,s=this._findArrayOperation(e),l=s.operation,c=s.index,h=s.rangeStart;o=new t(u,n,r),l?s.split?(this._split(c,e-h,o),i=c+1):(this._operations.splice(c,0,o),i=c):(this._operations.push(o),i=c),this._composeInsert(i)}},removeItems:function(e,r){if(!(1>r)){var n,i,a=this._findArrayOperation(e),o=(a.operation,a.index),s=a.rangeStart;return n=new t(c,r),a.split?(this._split(o,e-s,n),i=o+1):(this._operations.splice(o,0,n),i=o),this._composeDelete(i)}},apply:function(e){var r=[],n=0;s(this._operations,function(t,i){e(t.items,n,t.type,i),t.type!==c&&(n+=t.count,r=r.concat(t.items))}),this._operations=[new t(l,r.length,r)]},_findArrayOperation:function(e){var t,n,i,a,o,s=!1;for(t=a=0,n=this._operations.length;n>t;++t)if(i=this._operations[t],i.type!==c){if(o=a+i.count-1,e===a)break;if(e>a&&o>=e){s=!0;break}a=o+1}return new r(i,t,s,a)},_split:function(e,r,n){var i=this._operations[e],a=i.items.slice(r),o=new t(i.type,a.length,a);i.count=r,i.items=i.items.slice(0,r),this._operations.splice(e+1,0,n,o)},_composeInsert:function(e){var t=this._operations[e],r=this._operations[e-1],n=this._operations[e+1],i=r&&r.type,a=n&&n.type;i===u?(r.count+=t.count,r.items=r.items.concat(t.items),a===u?(r.count+=n.count,r.items=r.items.concat(n.items),this._operations.splice(e,2)):this._operations.splice(e,1)):a===u&&(t.count+=n.count,t.items=t.items.concat(n.items),this._operations.splice(e+1,1))},_composeDelete:function(e){var t,r,n,i=this._operations[e],a=i.count,o=this._operations[e-1],s=o&&o.type,l=!1,h=[];s===c&&(i=o,e-=1);for(var m=e+1;a>0;++m)t=this._operations[m],r=t.type,n=t.count,r!==c?(n>a?(h=h.concat(t.items.splice(0,a)),t.count-=a,m-=1,n=a,a=0):(n===a&&(l=!0),h=h.concat(t.items),a-=n),r===u&&(i.count-=n)):i.count+=n;return i.count>0?this._operations.splice(e+1,m-1-e):this._operations.splice(e,l?2:1),h},toString:function(){var e="";return s(this._operations,function(t){e+=" "+t.type+":"+t.count}),e.substring(1)}},i["default"]=e})}(),function(){e("ember-views",["ember-runtime","ember-views/system/jquery","ember-views/system/utils","ember-views/system/render_buffer","ember-views/system/ext","ember-views/views/states","ember-views/views/view","ember-views/views/container_view","ember-views/views/collection_view","ember-views/views/component","ember-views/system/event_dispatcher","ember-views/mixins/view_target_action_support","exports"],function(){var e=arguments,t=e[e.length-1];i.$=e[1]["default"],i.ViewTargetActionSupport=e[11]["default"],i.RenderBuffer=e[3]["default"];var r=i.ViewUtils={};r.setInnerHTML=e[2].setInnerHTML,r.isSimpleClick=e[2].isSimpleClick,i.CoreView=e[6].CoreView,i.View=e[6].View,i.View.states=e[5].states,i.View.cloneStates=e[5].cloneStates,i._ViewCollection=e[6].ViewCollection,i.ContainerView=e[7]["default"],i.CollectionView=e[8]["default"],i.Component=e[9]["default"],i.EventDispatcher=e[10]["default"],t["default"]=i}),e("ember-views/mixins/component_template_deprecation",["ember-metal/core","ember-metal/property_get","ember-metal/mixin","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get),n=e[2].Mixin,i=n.create({willMergeMixin:function(e){this._super.apply(this,arguments);var t,n,i=e.layoutName||e.layout||r(this,"layoutName");e.templateName&&!i&&(t="templateName",n="layoutName",e.layoutName=e.templateName,delete e.templateName),e.template&&!i&&(t="template",n="layout",e.layout=e.template,delete e.template)}});t["default"]=i}),e("ember-views/mixins/view_target_action_support",["ember-metal/mixin","ember-runtime/mixins/target_action_support","ember-metal/computed","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].Mixin,n=e[1]["default"],i=e[2].computed,a=i.alias,o=r.create(n,{target:a("controller"),actionContext:a("context")});t["default"]=o}),e("ember-views/system/event_dispatcher",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/is_none","ember-metal/run_loop","ember-metal/utils","ember-runtime/system/string","ember-runtime/system/object","ember-views/system/jquery","ember-views/views/view","exports"],function(){var e,r=arguments,n=r[r.length-1],i=(r[0]["default"],r[1].get),a=r[2].set,o=r[3].isNone,s=r[4]["default"],l=r[5].typeOf,u=(r[6].fmt,r[7]["default"]),c=r[8]["default"],h=r[9].View,m=u.extend({events:{touchstart:"touchStart",touchmove:"touchMove",touchend:"touchEnd",touchcancel:"touchCancel",keydown:"keyDown",keyup:"keyUp",keypress:"keyPress",mousedown:"mouseDown",mouseup:"mouseUp",contextmenu:"contextMenu",click:"click",dblclick:"doubleClick",mousemove:"mouseMove",focusin:"focusIn",focusout:"focusOut",mouseenter:"mouseEnter",mouseleave:"mouseLeave",submit:"submit",input:"input",change:"change",dragstart:"dragStart",drag:"drag",dragenter:"dragEnter",dragleave:"dragLeave",dragover:"dragOver",drop:"drop",dragend:"dragEnd"},rootElement:"body",setup:function(e,t){var r,n=i(this,"events");c.extend(n,e||{}),o(t)||a(this,"rootElement",t),t=c(i(this,"rootElement")),t.addClass("ember-application");for(r in n)n.hasOwnProperty(r)&&this.setupHandler(t,r,n[r])},setupHandler:function(r,n,i){var a=this;r.on(n+".ember",".ember-view",function(e,t){var r=h.views[this.id],n=!0,o=null;return o=a._findNearestEventManager(r,i),o&&o!==t?n=a._dispatchEvent(o,e,i,r):r?n=a._bubbleEvent(r,e,i):e.stopPropagation(),n}),r.on(n+".ember","[data-ember-action]",function(r){e||(e=t("ember-routing/helpers/action").ActionHelper);var n=c(r.currentTarget).attr("data-ember-action"),a=e.registeredActions[n];return a&&a.eventName===i?a.handler(r):void 0})},_findNearestEventManager:function(e,t){for(var r=null;e&&(r=i(e,"eventManager"),!r||!r[t]);)e=i(e,"parentView");return r},_dispatchEvent:function(e,t,r,n){var i=!0,a=e[r];return"function"===l(a)?(i=s(e,a,t,n),t.stopPropagation()):i=this._bubbleEvent(n,t,r),i},_bubbleEvent:function(e,t,r){return s(e,e.handleEvent,r,t)},destroy:function(){var e=i(this,"rootElement");return c(e).off(".ember","**").removeClass("ember-application"),this._super()}});n["default"]=m}),e("ember-views/system/ext",["ember-metal/run_loop"],function(){{var e=arguments,t=(e[e.length-1],e[0]["default"]);t.queues}t._addQueue("render","actions"),t._addQueue("afterRender","render")}),e("ember-views/system/jquery",["ember-metal/core","ember-runtime/system/string","ember-metal/enumerable_utils","exports"],function(){var e=arguments,t=e[e.length-1],n=e[0]["default"],i=e[1].w,a=e[2]["default"],o=a.forEach,s=n.imports&&n.imports.jQuery||this&&this.jQuery;if(s||"function"!=typeof r||(s=r("jquery")),s){var l=i("dragstart drag dragenter dragleave dragover drop dragend");o(l,function(e){s.event.fixHooks[e]={props:["dataTransfer"]}})}t["default"]=s}),e("ember-views/system/render_buffer",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-views/system/utils","ember-views/system/jquery","exports"],function(){function e(){this.seen={},this.list=[]}function t(e){return e?s.test(e)?e.replace(l,""):e:e}function r(e){var t={"<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},r=function(e){return t[e]||"&amp;"},n=e.toString();return c.test(n)?n.replace(u,r):n}var n=arguments,i=n[n.length-1],a=(n[0]["default"],n[1].get,n[2].set,n[3].setInnerHTML),o=n[4]["default"];e.prototype={add:function(e){e in this.seen||(this.seen[e]=!0,this.list.push(e))},toDOM:function(){return this.list.join(" ")}};var s=/[^a-zA-Z0-9\-]/,l=/[^a-zA-Z0-9\-]/g,u=/&(?!\w+;)|[<>"'`]/g,c=/[&<>"'`]/,h=function(){var e=document.createElement("div"),t=document.createElement("input");return t.setAttribute("name","foo"),e.appendChild(t),!!e.innerHTML.match("foo")}(),m=function(e){return new f(e)},f=function(e){this.tagNames=[e||null],this.buffer=""};f.prototype={_element:null,_hasElement:!0,elementClasses:null,classes:null,elementId:null,elementAttributes:null,elementProperties:null,elementTag:null,elementStyle:null,parentBuffer:null,push:function(e){return this.buffer+=e,this},addClass:function(t){return this.elementClasses=this.elementClasses||new e,this.elementClasses.add(t),this.classes=this.elementClasses.list,this},setClasses:function(e){this.elementClasses=null;var t,r=e.length;for(t=0;r>t;t++)this.addClass(e[t])},id:function(e){return this.elementId=e,this},attr:function(e,t){var r=this.elementAttributes=this.elementAttributes||{};return 1===arguments.length?r[e]:(r[e]=t,this)},removeAttr:function(e){var t=this.elementAttributes;return t&&delete t[e],this},prop:function(e,t){var r=this.elementProperties=this.elementProperties||{};return 1===arguments.length?r[e]:(r[e]=t,this)},removeProp:function(e){var t=this.elementProperties;return t&&delete t[e],this},style:function(e,t){return this.elementStyle=this.elementStyle||{},this.elementStyle[e]=t,this},begin:function(e){return this.tagNames.push(e||null),this},pushOpeningTag:function(){var e=this.currentTagName();if(e){if(this._hasElement&&!this._element&&0===this.buffer.length)return this._element=this.generateElement(),void 0;var n,i,a=this.buffer,o=this.elementId,s=this.classes,l=this.elementAttributes,u=this.elementProperties,c=this.elementStyle;if(a+="<"+t(e),o&&(a+=' id="'+r(o)+'"',this.elementId=null),s&&(a+=' class="'+r(s.join(" "))+'"',this.classes=null,this.elementClasses=null),c){a+=' style="';for(i in c)c.hasOwnProperty(i)&&(a+=i+":"+r(c[i])+";");a+='"',this.elementStyle=null}if(l){for(n in l)l.hasOwnProperty(n)&&(a+=" "+n+'="'+r(l[n])+'"');this.elementAttributes=null}if(u){for(i in u)if(u.hasOwnProperty(i)){var h=u[i];(h||"number"==typeof h)&&(a+=h===!0?" "+i+'="'+i+'"':" "+i+'="'+r(u[i])+'"')}this.elementProperties=null}a+=">",this.buffer=a}},pushClosingTag:function(){var e=this.tagNames.pop();e&&(this.buffer+="</"+t(e)+">")},currentTagName:function(){return this.tagNames[this.tagNames.length-1]},generateElement:function(){var e,n,i,a=this.tagNames.pop(),s=this.elementId,l=this.classes,u=this.elementAttributes,c=this.elementProperties,m=this.elementStyle,f="";i=u&&u.name&&!h?"<"+t(a)+' name="'+r(u.name)+'">':a;var p=document.createElement(i),d=o(p);if(s&&(d.attr("id",s),this.elementId=null),l&&(d.attr("class",l.join(" ")),this.classes=null,this.elementClasses=null),m){for(n in m)m.hasOwnProperty(n)&&(f+=n+":"+m[n]+";");d.attr("style",f),this.elementStyle=null}if(u){for(e in u)u.hasOwnProperty(e)&&d.attr(e,u[e]);this.elementAttributes=null}if(c){for(n in c)c.hasOwnProperty(n)&&d.prop(n,c[n]);this.elementProperties=null}return p},element:function(){var e=this.innerString();return e&&(this._element=a(this._element,e)),this._element},string:function(){if(this._hasElement&&this._element){var e=this.element(),t=e.outerHTML;return"undefined"==typeof t?o("<div/>").append(e).html():t}return this.innerString()},innerString:function(){return this.buffer}},i["default"]=m}),e("ember-views/system/utils",["ember-metal/core","exports"],function(){function e(e){var t=e.shiftKey||e.metaKey||e.altKey||e.ctrlKey,r=e.which>1;return!t&&!r}var t=arguments,r=t[t.length-1],n=(t[0]["default"],"undefined"!=typeof document&&function(){var e=document.createElement("div");return e.innerHTML="<div></div>",e.firstChild.innerHTML="<script></script>",""===e.firstChild.innerHTML}()),i="undefined"!=typeof document&&function(){var e=document.createElement("div");return e.innerHTML="Test: <script type='text/x-placeholder'></script>Value","Test:"===e.childNodes[0].nodeValue&&" Value"===e.childNodes[2].nodeValue}(),a=function(e,t){if(e.getAttribute("id")===t)return e;var r,n,i,o=e.childNodes.length;for(r=0;o>r;r++)if(n=e.childNodes[r],i=1===n.nodeType&&a(n,t))return i},o=function(e,t){n&&(t="&shy;"+t);var r=[];if(i&&(t=t.replace(/(\s+)(<script id='([^']+)')/g,function(e,t,n,i){return r.push([i,t]),n})),e.innerHTML=t,r.length>0){var o,s=r.length;for(o=0;s>o;o++){var l=a(e,r[o][0]),u=document.createTextNode(r[o][1]);l.parentNode.insertBefore(u,l)}}if(n){for(var c=e.firstChild;1===c.nodeType&&!c.nodeName;)c=c.firstChild;3===c.nodeType&&"Â­"===c.nodeValue.charAt(0)&&(c.nodeValue=c.nodeValue.slice(1))}},s={},l=function(e){if(void 0!==s[e])return s[e];var t=!0;if("select"===e.toLowerCase()){var r=document.createElement("select");o(r,'<option value="test">Test</option>'),t=1===r.options.length}return s[e]=t,t},u=function(e,t){var r=e.tagName;if(l(r))o(e,t);else{var n=e.outerHTML||(new XMLSerializer).serializeToString(e),i=n.match(new RegExp("<"+r+"([^>]*)>","i"))[0],a="</"+r+">",s=document.createElement("div");for(o(s,i+t+a),e=s.firstChild;e.tagName!==r;)e=e.nextSibling}return e};r.setInnerHTML=u,r.isSimpleClick=e}),e("ember-views/views/collection_view",["ember-metal/core","ember-metal/platform","ember-metal/merge","ember-metal/property_get","ember-metal/property_set","ember-runtime/system/string","ember-views/views/container_view","ember-views/views/view","ember-metal/mixin","ember-runtime/mixins/array","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].create,e[2]["default"],e[3].get),n=e[4].set,i=(e[5].fmt,e[6]["default"]),a=e[7].CoreView,o=e[7].View,s=e[8].observer,l=e[8].beforeObserver,u=(e[9]["default"],i.extend({content:null,emptyViewClass:o,emptyView:null,itemViewClass:o,init:function(){var e=this._super();return this._contentDidChange(),e},_contentWillChange:l("content",function(){var e=this.get("content");e&&e.removeArrayObserver(this);var t=e?r(e,"length"):0;this.arrayWillChange(e,0,t)}),_contentDidChange:s("content",function(){var e=r(this,"content");e&&(this._assertArrayLike(e),e.addArrayObserver(this));var t=e?r(e,"length"):0;this.arrayDidChange(e,0,null,t)}),_assertArrayLike:function(){},destroy:function(){if(this._super()){var e=r(this,"content");return e&&e.removeArrayObserver(this),this._createdEmptyView&&this._createdEmptyView.destroy(),this
}},arrayWillChange:function(e,t,n){var i=r(this,"emptyView");i&&i instanceof o&&i.removeFromParent();var a,s,l,u=this._childViews;l=this._childViews.length;var c=n===l;for(c&&(this.currentState.empty(this),this.invokeRecursively(function(e){e.removedFromDOM=!0},!1)),s=t+n-1;s>=t;s--)a=u[s],a.destroy()},arrayDidChange:function(e,t,i,o){var s,l,u,c,h,m,f=[];if(c=e?r(e,"length"):0)for(h=r(this,"itemViewClass"),"string"==typeof h&&(h=r(h)||h),u=t;t+o>u;u++)l=e.objectAt(u),s=this.createChildView(h,{content:l,contentIndex:u}),f.push(s);else{if(m=r(this,"emptyView"),!m)return;"string"==typeof m&&(m=r(m)||m),m=this.createChildView(m),f.push(m),n(this,"emptyView",m),a.detect(m)&&(this._createdEmptyView=m)}this.replace(t,0,f)},createChildView:function(e,t){e=this._super(e,t);var i=r(e,"tagName");return(null===i||void 0===i)&&(i=u.CONTAINER_MAP[r(this,"tagName")],n(e,"tagName",i)),e}}));u.CONTAINER_MAP={ul:"li",ol:"li",table:"tr",thead:"tr",tbody:"tr",tfoot:"tr",tr:"td",select:"option"},t["default"]=u}),e("ember-views/views/component",["ember-metal/core","ember-views/mixins/component_template_deprecation","ember-runtime/mixins/target_action_support","ember-views/views/view","ember-metal/property_get","ember-metal/property_set","ember-metal/is_none","ember-metal/computed","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],i=e[2]["default"],a=e[3].View,o=e[4].get,s=e[5].set,l=(e[6].isNone,e[7].computed),u=Array.prototype.slice,c=a.extend(i,n,{init:function(){this._super(),s(this,"context",this),s(this,"controller",this)},defaultLayout:function(e,t){r.Handlebars.helpers.yield.call(e,t)},template:l(function(e,t){if(void 0!==t)return t;var r=o(this,"templateName"),n=this.templateForName(r,"template");return n||o(this,"defaultTemplate")}).property("templateName"),templateName:null,cloneKeywords:function(){return{view:this,controller:this}},_yield:function(e,t){var r=t.data.view,n=this._parentView,i=o(this,"template");i&&r.appendChild(a,{isVirtual:!0,tagName:"",_contextView:n,template:i,context:o(n,"context"),controller:o(n,"controller"),templateData:{keywords:n.cloneKeywords()}})},targetObject:l(function(){var e=o(this,"_parentView");return e?o(e,"controller"):null}).property("_parentView"),sendAction:function(e){var t,r=u.call(arguments,1);t=void 0===e?o(this,"action"):o(this,e),void 0!==t&&this.triggerAction({action:t,actionContext:r})}});t["default"]=c}),e("ember-views/views/container_view",["ember-metal/core","ember-metal/merge","ember-runtime/mixins/mutable_array","ember-metal/property_get","ember-metal/property_set","ember-views/views/view","ember-views/views/states","ember-metal/error","ember-metal/enumerable_utils","ember-metal/computed","ember-metal/run_loop","ember-metal/properties","ember-views/system/render_buffer","ember-metal/mixin","ember-runtime/system/native_array","exports"],function(){function e(e,t,r,n){t.triggerRecursively("willInsertElement"),r?r.domManager.after(r,n.string()):e.domManager.prepend(e,n.string()),t.forEach(function(e){e.transitionTo("inDOM"),e.propertyDidChange("element"),e.triggerRecursively("didInsertElement")})}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=t[1]["default"],a=t[2]["default"],o=t[3].get,s=t[4].set,l=t[5].View,u=t[5].ViewCollection,c=t[6].cloneStates,h=t[6].states,m=t[7]["default"],f=t[8]["default"],p=f.forEach,d=t[9].computed,g=t[10]["default"],v=t[11].defineProperty,b=t[12]["default"],y=t[13].observer,_=t[13].beforeObserver,w=(t[14].A,c(h)),x=l.extend(a,{states:w,init:function(){this._super();var e=o(this,"childViews");v(this,"childViews",l.childViewsProperty);var t=this._childViews;p(e,function(e,r){var n;"string"==typeof e?(n=o(this,e),n=this.createChildView(n),s(this,e,n)):n=this.createChildView(e),t[r]=n},this);var r=o(this,"currentView");r&&(t.length||(t=this._childViews=this._childViews.slice()),t.push(this.createChildView(r)))},replace:function(e,t,r){var n=r?o(r,"length"):0;if(this.arrayContentWillChange(e,t,n),this.childViewsWillChange(this._childViews,e,t),0===n)this._childViews.splice(e,t);else{var i=[e,t].concat(r);r.length&&!this._childViews.length&&(this._childViews=this._childViews.slice()),this._childViews.splice.apply(this._childViews,i)}return this.arrayContentDidChange(e,t,n),this.childViewsDidChange(this._childViews,e,t,n),this},objectAt:function(e){return this._childViews[e]},length:d(function(){return this._childViews.length}).volatile(),render:function(e){this.forEachChildView(function(t){t.renderToBuffer(e)})},instrumentName:"container",childViewsWillChange:function(e,t,r){if(this.propertyWillChange("childViews"),r>0){var n=e.slice(t,t+r);this.currentState.childViewsWillChange(this,e,t,r),this.initializeViews(n,null,null)}},removeChild:function(e){return this.removeObject(e),this},childViewsDidChange:function(e,t,r,n){if(n>0){var i=e.slice(t,t+n);this.initializeViews(i,this,o(this,"templateData")),this.currentState.childViewsDidChange(this,e,t,n)}this.propertyDidChange("childViews")},initializeViews:function(e,t,r){p(e,function(e){s(e,"_parentView",t),!e.container&&t&&s(e,"container",t.container),o(e,"templateData")||s(e,"templateData",r)})},currentView:null,_currentViewWillChange:_("currentView",function(){var e=o(this,"currentView");e&&e.destroy()}),_currentViewDidChange:y("currentView",function(){var e=o(this,"currentView");e&&this.pushObject(e)}),_ensureChildrenAreInDOM:function(){this.currentState.ensureChildrenAreInDOM(this)}});i(w._default,{childViewsWillChange:n.K,childViewsDidChange:n.K,ensureChildrenAreInDOM:n.K}),i(w.inBuffer,{childViewsDidChange:function(){throw new m("You cannot modify child views while in the inBuffer state")}}),i(w.hasElement,{childViewsWillChange:function(e,t,r,n){for(var i=r;r+n>i;i++)t[i].remove()},childViewsDidChange:function(e){g.scheduleOnce("render",e,"_ensureChildrenAreInDOM")},ensureChildrenAreInDOM:function(t){var r,n,i,a,o,s=t._childViews,l=new u;for(r=0,n=s.length;n>r;r++)i=s[r],o||(o=b(),o._hasElement=!1),i.renderToBufferIfNeeded(o)?l.push(i):l.length?(e(t,l,a,o),o=null,a=i,l.clear()):a=i;l.length&&e(t,l,a,o)}}),r["default"]=x}),e("ember-views/views/states",["ember-metal/platform","ember-metal/merge","ember-views/views/states/default","ember-views/views/states/pre_render","ember-views/views/states/in_buffer","ember-views/views/states/has_element","ember-views/views/states/in_dom","ember-views/views/states/destroying","exports"],function(){function e(e){var t={};t._default={},t.preRender=n(t._default),t.destroying=n(t._default),t.inBuffer=n(t._default),t.hasElement=n(t._default),t.inDOM=n(t.hasElement);for(var r in e)e.hasOwnProperty(r)&&i(t[r],e[r]);return t}var t=arguments,r=t[t.length-1],n=t[0].create,i=t[1]["default"],a=t[2]["default"],o=t[3]["default"],s=t[4]["default"],l=t[5]["default"],u=t[6]["default"],c=t[7]["default"],h={_default:a,preRender:o,inDOM:u,inBuffer:s,hasElement:l,destroying:c};r.cloneStates=e,r.states=h}),e("ember-views/views/states/default",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/run_loop","ember-metal/error","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=(e[1].get,e[2].set),i=e[3]["default"],a=e[4]["default"],o={appendChild:function(){throw new a("You can't use appendChild outside of the rendering process")},$:function(){return void 0},getElement:function(){return null},handleEvent:function(){return!0},destroyElement:function(e){return n(e,"element",null),e._scheduledInsert&&(i.cancel(e._scheduledInsert),e._scheduledInsert=null),e},renderToBufferIfNeeded:function(){return!1},rerender:r.K,invokeObserver:r.K};t["default"]=o}),e("ember-views/views/states/destroying",["ember-metal/merge","ember-metal/platform","ember-runtime/system/string","ember-views/views/states/default","ember-metal/error","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].create,a=e[2].fmt,o=e[3]["default"],s=e[4]["default"],l="You can't call %@ on a view being destroyed",u=n(o);r(u,{appendChild:function(){throw new s(a(l,["appendChild"]))},rerender:function(){throw new s(a(l,["rerender"]))},destroyElement:function(){throw new s(a(l,["destroyElement"]))},empty:function(){throw new s(a(l,["empty"]))},setElement:function(){throw new s(a(l,["set('element', ...)"]))},renderToBufferIfNeeded:function(){return!1},insertElement:i.K}),t["default"]=u}),e("ember-views/views/states/has_element",["ember-views/views/states/default","ember-metal/run_loop","ember-metal/merge","ember-metal/platform","ember-views/system/jquery","ember-metal/error","ember-metal/property_get","ember-metal/property_set","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],i=e[2]["default"],a=e[3].create,o=e[4]["default"],s=e[5]["default"],l=e[6].get,u=e[7].set,c=a(r);i(c,{$:function(e,t){var r=l(e,"element");return t?o(t,r):o(r)},getElement:function(e){var t=l(e,"parentView");return t&&(t=l(t,"element")),t?e.findElementInParentElement(t):o("#"+l(e,"elementId"))[0]},setElement:function(e,t){if(null!==t)throw new s("You cannot set an element to a non-null value when the element is already in the DOM.");return e.transitionTo("preRender"),t},rerender:function(e){return e.triggerRecursively("willClearRender"),e.clearRenderedChildren(),e.domManager.replace(e),e},destroyElement:function(e){return e._notifyWillDestroyElement(),e.domManager.remove(e),u(e,"element",null),e._scheduledInsert&&(n.cancel(e._scheduledInsert),e._scheduledInsert=null),e},empty:function(e){var t,r,n=e._childViews;if(n)for(t=n.length,r=0;t>r;r++)n[r]._notifyWillDestroyElement();e.domManager.empty(e)},handleEvent:function(e,t,r){return e.has(t)?e.trigger(t,r):!0},invokeObserver:function(e,t){t.call(e)}}),t["default"]=c}),e("ember-views/views/states/in_buffer",["ember-views/views/states/default","ember-metal/error","ember-metal/core","ember-metal/platform","ember-metal/merge","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],i=e[2]["default"],a=e[3].create,o=e[4]["default"],s=a(r);o(s,{$:function(e){return e.rerender(),i.$()},rerender:function(){throw new n("Something you did caused a view to re-render after it rendered but before it was inserted into the DOM.")},appendChild:function(e,t,r){var n=e.buffer,i=e._childViews;return t=e.createChildView(t,r),i.length||(i=e._childViews=i.slice()),i.push(t),t.renderToBuffer(n),e.propertyDidChange("childViews"),t},destroyElement:function(e){e.clearBuffer();var t=e._notifyWillDestroyElement();return t.transitionTo("preRender",!1),e},empty:function(){},renderToBufferIfNeeded:function(){return!1},insertElement:function(){throw new n("You can't insert an element that has already been rendered")},setElement:function(e,t){return null===t?e.transitionTo("preRender"):(e.clearBuffer(),e.transitionTo("hasElement")),t},invokeObserver:function(e,t){t.call(e)}}),t["default"]=s}),e("ember-views/views/states/in_dom",["ember-metal/core","ember-metal/platform","ember-metal/merge","ember-metal/error","ember-views/views/states/has_element","exports"],function(){var e,r=arguments,n=r[r.length-1],i=(r[0]["default"],r[1].create),a=r[2]["default"],o=r[3]["default"],s=r[4]["default"],l=i(s);a(l,{enter:function(r){e||(e=t("ember-views/views/view").View),r.isVirtual||(e.views[r.elementId]=r),r.addBeforeObserver("elementId",function(){throw new o("Changing a view's elementId after creation is not allowed")})},exit:function(r){e||(e=t("ember-views/views/view").View),this.isVirtual||delete e.views[r.elementId]},insertElement:function(){throw new o("You can't insert an element into the DOM that has already been inserted")}}),n["default"]=l}),e("ember-views/views/states/pre_render",["ember-views/views/states/default","ember-metal/platform","ember-metal/merge","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].create,a=e[2]["default"],o=n(r);a(o,{insertElement:function(e,t){e.createElement();var r=e.viewHierarchyCollection();r.trigger("willInsertElement"),t.call(e);var n=e.get("element");document.body.contains(n)&&(r.transitionTo("inDOM",!1),r.trigger("didInsertElement"))},renderToBufferIfNeeded:function(e,t){return e.renderToBuffer(t),!0},empty:i.K,setElement:function(e,t){return null!==t&&e.transitionTo("hasElement"),t}}),t["default"]=o}),e("ember-views/views/view",["ember-metal/core","ember-metal/error","ember-runtime/system/object","ember-runtime/mixins/evented","ember-runtime/mixins/action_handler","ember-views/system/render_buffer","ember-metal/property_get","ember-metal/property_set","ember-metal/set_properties","ember-metal/run_loop","ember-metal/observer","ember-metal/properties","ember-metal/utils","ember-metal/computed","ember-metal/mixin","ember-metal/is_none","container/container","ember-runtime/system/native_array","ember-metal/instrumentation","ember-runtime/system/string","ember-metal/enumerable_utils","ember-runtime/copy","ember-metal/binding","ember-metal/property_events","ember-views/views/states","ember-views/system/jquery","ember-views/system/ext","exports"],function(){function e(e){e.buffer=null}function r(e){w(e).cache.element=void 0}function n(){g.once(Y,"notifyMutationListeners")}var i,a=arguments,o=a[a.length-1],s=a[0]["default"],l=a[1]["default"],u=a[2]["default"],c=a[3]["default"],h=a[4]["default"],m=a[5]["default"],f=a[6].get,p=a[7].set,d=a[8]["default"],g=a[9]["default"],v=a[10].addObserver,b=a[10].removeObserver,y=a[11].defineProperty,_=a[12].guidFor,w=a[12].meta,x=a[13].computed,C=a[14].observer,E=a[12].typeOf,O=a[12].isArray,P=a[15].isNone,A=a[14].Mixin,T=a[16]["default"],S=a[17].A,I=a[18].instrument,N=a[19].dasherize,V=a[20]["default"],R=V.forEach,k=V.addObject,D=V.removeObject,j=a[14].beforeObserver,M=a[21]["default"],L=a[22].isGlobalPath,H=a[23].propertyWillChange,B=a[23].propertyDidChange,F=a[24].cloneStates,z=a[24].states,U=a[25]["default"],q=x(function(){var e=this._childViews,r=S(),n=this;return R(e,function(e){var t;e.isVirtual?(t=f(e,"childViews"))&&r.pushObjects(t):r.push(e)}),r.replace=function(e,r,a){if(i||(i=t("ember-views/views/container_view")["default"]),n instanceof i)return n.replace(e,r,a);throw new l("childViews is immutable")},r});s.TEMPLATES={};var K=u.extend(c,h,{isView:!0,states:F(z),init:function(){this._super(),this.transitionTo("preRender"),this._isVisible=f(this,"isVisible")},parentView:x("_parentView",function(){var e=this._parentView;return e&&e.isVirtual?f(e,"parentView"):e}),state:null,_parentView:null,concreteView:x("parentView",function(){return this.isVirtual?f(this,"parentView.concreteView"):this}),instrumentName:"core_view",instrumentDetails:function(e){e.object=this.toString()},renderToBuffer:function(e,t){var r="render."+this.instrumentName,n={};return this.instrumentDetails(n),I(r,n,function(){return this._renderToBuffer(e,t)},this)},_renderToBuffer:function(e){var t=this.tagName;(null===t||void 0===t)&&(t="div");var r=this.buffer=e&&e.begin(t)||m(t);return this.transitionTo("inBuffer",!1),this.beforeRender(r),this.render(r),this.afterRender(r),r},trigger:function(e){this._super.apply(this,arguments);var t=this[e];if(t){var r,n,i=[];for(r=1,n=arguments.length;n>r;r++)i.push(arguments[r]);return t.apply(this,i)}},deprecatedSendHandles:function(e){return!!this[e]},deprecatedSend:function(e){var t=[].slice.call(arguments,1);this[e].apply(this,t)},has:function(e){return"function"===E(this[e])||this._super(e)},destroy:function(){var e=this._parentView;if(this._super())return this.removedFromDOM||this.destroyElement(),e&&e.removeChild(this),this.transitionTo("destroying",!1),this},clearRenderedChildren:s.K,triggerRecursively:s.K,invokeRecursively:s.K,transitionTo:s.K,destroyElement:s.K}),W=function(e){var t=this.views=e||[];this.length=t.length};W.prototype={length:0,trigger:function(e){for(var t,r=this.views,n=0,i=r.length;i>n;n++)t=r[n],t.trigger&&t.trigger(e)},triggerRecursively:function(e){for(var t=this.views,r=0,n=t.length;n>r;r++)t[r].triggerRecursively(e)},invokeRecursively:function(e){for(var t,r=this.views,n=0,i=r.length;i>n;n++)t=r[n],e(t)},transitionTo:function(e,t){for(var r=this.views,n=0,i=r.length;i>n;n++)r[n].transitionTo(e,t)},push:function(){this.length+=arguments.length;var e=this.views;return e.push.apply(e,arguments)},objectAt:function(e){return this.views[e]},forEach:function(e){var t=this.views;return R(t,e)},clear:function(){this.length=0,this.views.length=0}};var G=[],Y=K.extend({concatenatedProperties:["classNames","classNameBindings","attributeBindings"],isView:!0,templateName:null,layoutName:null,template:x("templateName",function(e,t){if(void 0!==t)return t;var r=f(this,"templateName"),n=this.templateForName(r,"template");return n||f(this,"defaultTemplate")}),controller:x("_parentView",function(){var e=f(this,"_parentView");return e?f(e,"controller"):null}),layout:x(function(){var e=f(this,"layoutName"),t=this.templateForName(e,"layout");return t||f(this,"defaultLayout")}).property("layoutName"),_yield:function(e,t){var r=f(this,"template");r&&r(e,t)},templateForName:function(e){if(e){var t=this.container||T&&T.defaultContainer;return t&&t.lookup("template:"+e)}},context:x(function(e,t){return 2===arguments.length?(p(this,"_context",t),t):f(this,"_context")}).volatile(),_context:x(function(){var e,t;return(t=f(this,"controller"))?t:(e=this._parentView,e?f(e,"_context"):null)}),_contextDidChange:C("context",function(){this.rerender()}),isVisible:!0,childViews:q,_childViews:G,_childViewsWillChange:j("childViews",function(){if(this.isVirtual){var e=f(this,"parentView");e&&H(e,"childViews")}}),_childViewsDidChange:C("childViews",function(){if(this.isVirtual){var e=f(this,"parentView");e&&B(e,"childViews")}}),nearestInstanceOf:function(e){for(var t=f(this,"parentView");t;){if(t instanceof e)return t;t=f(t,"parentView")}},nearestOfType:function(e){for(var t=f(this,"parentView"),r=e instanceof A?function(t){return e.detect(t)}:function(t){return e.detect(t.constructor)};t;){if(r(t))return t;t=f(t,"parentView")}},nearestWithProperty:function(e){for(var t=f(this,"parentView");t;){if(e in t)return t;t=f(t,"parentView")}},nearestChildOf:function(e){for(var t=f(this,"parentView");t;){if(f(t,"parentView")instanceof e)return t;t=f(t,"parentView")}},_parentViewDidChange:C("_parentView",function(){this.isDestroying||(this.trigger("parentViewDidChange"),f(this,"parentView.controller")&&!f(this,"controller")&&this.notifyPropertyChange("controller"))}),_controllerDidChange:C("controller",function(){this.isDestroying||(this.rerender(),this.forEachChildView(function(e){e.propertyDidChange("controller")}))}),cloneKeywords:function(){var e=f(this,"templateData"),t=e?M(e.keywords):{};return p(t,"view",f(this,"concreteView")),p(t,"_view",this),p(t,"controller",f(this,"controller")),t},render:function(e){var t=f(this,"layout")||f(this,"template");if(t){var r,n=f(this,"context"),i=this.cloneKeywords(),a={view:this,buffer:e,isRenderData:!0,keywords:i,insideGroup:f(this,"templateData.insideGroup")};r=t(n,{data:a}),void 0!==r&&e.push(r)}},rerender:function(){return this.currentState.rerender(this)},clearRenderedChildren:function(){for(var e=this.lengthBeforeRender,t=this.lengthAfterRender,r=this._childViews,n=t-1;n>=e;n--)r[n]&&r[n].destroy()},_applyClassNameBindings:function(e){var t,r,n,i=this.classNames;R(e,function(e){var a,o=Y._parsePropertyPath(e),s=function(){r=this._classStringForProperty(e),t=this.$(),a&&(t.removeClass(a),i.removeObject(a)),r?(t.addClass(r),a=r):a=null};n=this._classStringForProperty(e),n&&(k(i,n),a=n),this.registerObserver(this,o.path,s),this.one("willClearRender",function(){a&&(i.removeObject(a),a=null)})},this)},_unspecifiedAttributeBindings:null,_applyAttributeBindings:function(e,t){var r,n=this._unspecifiedAttributeBindings=this._unspecifiedAttributeBindings||{};R(t,function(t){var i=t.split(":"),a=i[0],o=i[1]||a;a in this?(this._setupAttributeBindingObservation(a,o),r=f(this,a),Y.applyAttributeBindings(e,o,r)):n[a]=o},this),this.setUnknownProperty=this._setUnknownProperty},_setupAttributeBindingObservation:function(e,t){var r,n,i=function(){n=this.$(),r=f(this,e),Y.applyAttributeBindings(n,t,r)};this.registerObserver(this,e,i)},setUnknownProperty:null,_setUnknownProperty:function(e,t){var r=this._unspecifiedAttributeBindings&&this._unspecifiedAttributeBindings[e];return r&&this._setupAttributeBindingObservation(e,r),y(this,e),p(this,e,t)},_classStringForProperty:function(e){var t=Y._parsePropertyPath(e),r=t.path,n=f(this,r);return void 0===n&&L(r)&&(n=f(s.lookup,r)),Y._classStringForValue(r,n,t.className,t.falsyClassName)},element:x("_parentView",function(e,t){return void 0!==t?this.currentState.setElement(this,t):this.currentState.getElement(this)}),$:function(e){return this.currentState.$(this,e)},mutateChildViews:function(e){for(var t,r=this._childViews,n=r.length;--n>=0;)t=r[n],e(this,t,n);return this},forEachChildView:function(e){var t=this._childViews;if(!t)return this;var r,n,i=t.length;for(n=0;i>n;n++)r=t[n],e(r);return this},appendTo:function(e){return this._insertElementLater(function(){this.$().appendTo(e)}),this},replaceIn:function(e){return this._insertElementLater(function(){U(e).empty(),this.$().appendTo(e)}),this},_insertElementLater:function(e){this._scheduledInsert=g.scheduleOnce("render",this,"_insertElement",e)},_insertElement:function(e){this._scheduledInsert=null,this.currentState.insertElement(this,e)},append:function(){return this.appendTo(document.body)},remove:function(){this.removedFromDOM||this.destroyElement(),this.invokeRecursively(function(e){e.clearRenderedChildren&&e.clearRenderedChildren()})},elementId:null,findElementInParentElement:function(e){var t="#"+this.elementId;return U(t)[0]||U(t,e)[0]},createElement:function(){if(f(this,"element"))return this;var e=this.renderToBuffer();return p(this,"element",e.element()),this},willInsertElement:s.K,didInsertElement:s.K,willClearRender:s.K,invokeRecursively:function(e,t){for(var r,n,i,a=t===!1?this._childViews:[this];a.length;){r=a.slice(),a=[];for(var o=0,s=r.length;s>o;o++)n=r[o],i=n._childViews?n._childViews.slice(0):null,e(n),i&&a.push.apply(a,i)}},triggerRecursively:function(e){for(var t,r,n,i=[this];i.length;){t=i.slice(),i=[];for(var a=0,o=t.length;o>a;a++)r=t[a],n=r._childViews?r._childViews.slice(0):null,r.trigger&&r.trigger(e),n&&i.push.apply(i,n)}},viewHierarchyCollection:function(){for(var e,t=new W([this]),r=0;r<t.length;r++)e=t.objectAt(r),e._childViews&&t.push.apply(t,e._childViews);return t},destroyElement:function(){return this.currentState.destroyElement(this)},willDestroyElement:s.K,_notifyWillDestroyElement:function(){var e=this.viewHierarchyCollection();return e.trigger("willClearRender"),e.trigger("willDestroyElement"),e},_elementDidChange:C("element",function(){this.forEachChildView(r)}),parentViewDidChange:s.K,instrumentName:"view",instrumentDetails:function(e){e.template=f(this,"templateName"),this._super(e)},_renderToBuffer:function(e,t){this.lengthBeforeRender=this._childViews.length;var r=this._super(e,t);return this.lengthAfterRender=this._childViews.length,r},renderToBufferIfNeeded:function(e){return this.currentState.renderToBufferIfNeeded(this,e)},beforeRender:function(e){this.applyAttributesToBuffer(e),e.pushOpeningTag()},afterRender:function(e){e.pushClosingTag()},applyAttributesToBuffer:function(e){var t=f(this,"classNameBindings");t.length&&this._applyClassNameBindings(t);var r=f(this,"attributeBindings");r.length&&this._applyAttributeBindings(e,r),e.setClasses(this.classNames),e.id(this.elementId);var n=f(this,"ariaRole");n&&e.attr("role",n),f(this,"isVisible")===!1&&e.style("display","none")},tagName:null,ariaRole:null,classNames:["ember-view"],classNameBindings:G,attributeBindings:G,init:function(){this.elementId=this.elementId||_(this),this._super(),this._childViews=this._childViews.slice(),this.classNameBindings=S(this.classNameBindings.slice()),this.classNames=S(this.classNames.slice())},appendChild:function(e,t){return this.currentState.appendChild(this,e,t)},removeChild:function(e){if(!this.isDestroying){p(e,"_parentView",null);var t=this._childViews;return D(t,e),this.propertyDidChange("childViews"),this}},removeAllChildren:function(){return this.mutateChildViews(function(e,t){e.removeChild(t)})},destroyAllChildren:function(){return this.mutateChildViews(function(e,t){t.destroy()})},removeFromParent:function(){var e=this._parentView;return this.remove(),e&&e.removeChild(this),this},destroy:function(){var e,t,r=this._childViews,n=f(this,"parentView"),i=this.viewName;if(this._super()){for(e=r.length,t=e-1;t>=0;t--)r[t].removedFromDOM=!0;for(i&&n&&n.set(i,null),e=r.length,t=e-1;t>=0;t--)r[t].destroy();return this}},createChildView:function(e,t){if(!e)throw new TypeError("createChildViews first argument must exist");if(e.isView&&e._parentView===this&&e.container===this.container)return e;if(t=t||{},t._parentView=this,K.detect(e))t.templateData=t.templateData||f(this,"templateData"),t.container=this.container,e=e.create(t),e.viewName&&p(f(this,"concreteView"),e.viewName,e);else if("string"==typeof e){var r="view:"+e,n=this.container.lookupFactory(r);t.templateData=f(this,"templateData"),e=n.create(t)}else t.container=this.container,f(e,"templateData")||(t.templateData=f(this,"templateData")),d(e,t);return e},becameVisible:s.K,becameHidden:s.K,_isVisibleDidChange:C("isVisible",function(){this._isVisible!==f(this,"isVisible")&&g.scheduleOnce("render",this,this._toggleVisibility)}),_toggleVisibility:function(){var e=this.$();if(e){var t=f(this,"isVisible");this._isVisible!==t&&(e.toggle(t),this._isVisible=t,this._isAncestorHidden()||(t?this._notifyBecameVisible():this._notifyBecameHidden()))}},_notifyBecameVisible:function(){this.trigger("becameVisible"),this.forEachChildView(function(e){var t=f(e,"isVisible");(t||null===t)&&e._notifyBecameVisible()})},_notifyBecameHidden:function(){this.trigger("becameHidden"),this.forEachChildView(function(e){var t=f(e,"isVisible");(t||null===t)&&e._notifyBecameHidden()})},_isAncestorHidden:function(){for(var e=f(this,"parentView");e;){if(f(e,"isVisible")===!1)return!0;e=f(e,"parentView")}return!1},clearBuffer:function(){this.invokeRecursively(e)},transitionTo:function(e,t){var r=this.currentState,n=this.currentState=this.states[e];this.state=e,r&&r.exit&&r.exit(this),n.enter&&n.enter(this),"inDOM"===e&&(w(this).cache.element=void 0),t!==!1&&this.forEachChildView(function(t){t.transitionTo(e)})},handleEvent:function(e,t){return this.currentState.handleEvent(this,e,t)},registerObserver:function(e,t,r,n){if(n||"function"!=typeof r||(n=r,r=null),e&&"object"==typeof e){var i=this,a=function(){i.currentState.invokeObserver(this,n)},o=function(){g.scheduleOnce("render",this,a)};v(e,t,r,o),this.one("willClearRender",function(){b(e,t,r,o)})}}}),$={prepend:function(e,t){e.$().prepend(t),n()},after:function(e,t){e.$().after(t),n()},html:function(e,t){e.$().html(t),n()},replace:function(e){var t=f(e,"element");p(e,"element",null),e._insertElementLater(function(){U(t).replaceWith(f(e,"element")),n()})},remove:function(e){e.$().remove(),n()},empty:function(e){e.$().empty(),n()}};Y.reopen({domManager:$}),Y.reopenClass({_parsePropertyPath:function(e){var t,r,n=e.split(":"),i=n[0],a="";return n.length>1&&(t=n[1],3===n.length&&(r=n[2]),a=":"+t,r&&(a+=":"+r)),{path:i,classNames:a,className:""===t?void 0:t,falsyClassName:r}},_classStringForValue:function(e,t,r,n){if(O(t)&&(t=0!==f(t,"length")),r||n)return r&&t?r:n&&!t?n:null;if(t===!0){var i=e.split(".");return N(i[i.length-1])}return t!==!1&&null!=t?t:null}});var Q=u.extend(c).create();Y.addMutationListener=function(e){Q.on("change",e)},Y.removeMutationListener=function(e){Q.off("change",e)},Y.notifyMutationListeners=function(){Q.trigger("change")},Y.views={},Y.childViewsProperty=q,Y.applyAttributeBindings=function(e,t,r){var n=E(r);"value"===t||"string"!==n&&("number"!==n||isNaN(r))?"value"===t||"boolean"===n?P(r)||r===!1?(e.removeAttr(t),e.prop(t,"")):r!==e.prop(t)&&e.prop(t,r):r||e.removeAttr(t):r!==e.attr(t)&&e.attr(t,r)},o.CoreView=K,o.View=Y,o.ViewCollection=W})}(),function(){e("metamorph",[],function(){// Copyright: Â©2014 Tilde, Inc. All rights reserved.
var e=function(){},t=0,r=function(){return"undefined"!=typeof MetamorphENV?MetamorphENV.DISABLE_RANGE_API:"undefined"!==ENV?ENV.DISABLE_RANGE_API:!1}(),n=!r&&"undefined"!=typeof document&&"createRange"in document&&"undefined"!=typeof Range&&Range.prototype.createContextualFragment,i="undefined"!=typeof document&&function(){var e=document.createElement("div");return e.innerHTML="<div></div>",e.firstChild.innerHTML="<script></script>",""===e.firstChild.innerHTML}(),a=document&&function(){var e=document.createElement("div");return e.innerHTML="Test: <script type='text/x-placeholder'></script>Value","Test:"===e.childNodes[0].nodeValue&&" Value"===e.childNodes[2].nodeValue}(),o=function(r){var n;n=this instanceof o?this:new e,n.innerHTML=r;var i="metamorph-"+t++;return n.start=i+"-start",n.end=i+"-end",n};e.prototype=o.prototype;var s,l,u,c,h,m,f,p,d;if(c=function(){return this.startTag()+this.innerHTML+this.endTag()},p=function(){return"<script id='"+this.start+"' type='text/x-placeholder'></script>"},d=function(){return"<script id='"+this.end+"' type='text/x-placeholder'></script>"},n)s=function(e,t){var r=document.createRange(),n=document.getElementById(e.start),i=document.getElementById(e.end);return t?(r.setStartBefore(n),r.setEndAfter(i)):(r.setStartAfter(n),r.setEndBefore(i)),r},l=function(e,t){var r=s(this,t);r.deleteContents();var n=r.createContextualFragment(e);r.insertNode(n)},u=function(){var e=s(this,!0);e.deleteContents()},h=function(e){var t=document.createRange();t.setStart(e),t.collapse(!1);var r=t.createContextualFragment(this.outerHTML());e.appendChild(r)},m=function(e){var t=document.createRange(),r=document.getElementById(this.end);t.setStartAfter(r),t.setEndAfter(r);var n=t.createContextualFragment(e);t.insertNode(n)},f=function(e){var t=document.createRange(),r=document.getElementById(this.start);t.setStartAfter(r),t.setEndAfter(r);var n=t.createContextualFragment(e);t.insertNode(n)};else{var g={select:[1,"<select multiple='multiple'>","</select>"],fieldset:[1,"<fieldset>","</fieldset>"],table:[1,"<table>","</table>"],tbody:[2,"<table><tbody>","</tbody></table>"],tr:[3,"<table><tbody><tr>","</tr></tbody></table>"],colgroup:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],map:[1,"<map>","</map>"],_default:[0,"",""]},v=function(e,t){if(e.getAttribute("id")===t)return e;var r,n,i,a=e.childNodes.length;for(r=0;a>r;r++)if(n=e.childNodes[r],i=1===n.nodeType&&v(n,t))return i},b=function(e,t){var r=[];if(a&&(t=t.replace(/(\s+)(<script id='([^']+)')/g,function(e,t,n,i){return r.push([i,t]),n})),e.innerHTML=t,r.length>0){var n,i=r.length;for(n=0;i>n;n++){var o=v(e,r[n][0]),s=document.createTextNode(r[n][1]);o.parentNode.insertBefore(s,o)}}},y=function(e,t){var r=g[e.tagName.toLowerCase()]||g._default,n=r[0],a=r[1],o=r[2];i&&(t="&shy;"+t);var s=document.createElement("div");b(s,a+t+o);for(var l=0;n>=l;l++)s=s.firstChild;if(i){for(var u=s;1===u.nodeType&&!u.nodeName;)u=u.firstChild;3===u.nodeType&&"Â­"===u.nodeValue.charAt(0)&&(u.nodeValue=u.nodeValue.slice(1))}return s},_=function(e){for(;""===e.parentNode.tagName;)e=e.parentNode;return e},w=function(e,t){e.parentNode!==t.parentNode&&t.parentNode.insertBefore(e,t.parentNode.firstChild)};l=function(e,t){var r,n,i,a=_(document.getElementById(this.start)),o=document.getElementById(this.end),s=o.parentNode;for(w(a,o),r=a.nextSibling;r;){if(n=r.nextSibling,i=r===o){if(!t)break;o=r.nextSibling}if(r.parentNode.removeChild(r),i)break;r=n}for(r=y(a.parentNode,e),t&&a.parentNode.removeChild(a);r;)n=r.nextSibling,s.insertBefore(r,o),r=n},u=function(){var e=_(document.getElementById(this.start)),t=document.getElementById(this.end);this.html(""),e.parentNode.removeChild(e),t.parentNode.removeChild(t)},h=function(e){for(var t,r=y(e,this.outerHTML());r;)t=r.nextSibling,e.appendChild(r),r=t},m=function(e){var t,r,n=document.getElementById(this.end),i=n.nextSibling,a=n.parentNode;for(r=y(a,e);r;)t=r.nextSibling,a.insertBefore(r,i),r=t},f=function(e){var t,r,n=document.getElementById(this.start),i=n.parentNode;r=y(i,e);for(var a=n.nextSibling;r;)t=r.nextSibling,i.insertBefore(r,a),r=t}}return o.prototype.html=function(e){return this.checkRemoved(),void 0===e?this.innerHTML:(l.call(this,e),this.innerHTML=e,void 0)},o.prototype.replaceWith=function(e){this.checkRemoved(),l.call(this,e,!0)},o.prototype.remove=u,o.prototype.outerHTML=c,o.prototype.appendTo=h,o.prototype.after=m,o.prototype.prepend=f,o.prototype.startTag=p,o.prototype.endTag=d,o.prototype.isRemoved=function(){var e=document.getElementById(this.start),t=document.getElementById(this.end);return!e||!t},o.prototype.checkRemoved=function(){if(this.isRemoved())throw new Error("Cannot perform operations on a Metamorph that is not in the DOM.")},o})}(),function(){e("ember-handlebars-compiler",["ember-metal/core","exports"],function(){var e=arguments,n=e[e.length-1],i=e[0]["default"];"undefined"==typeof i.assert&&(i.assert=function(){}),"undefined"==typeof i.FEATURES&&(i.FEATURES={isEnabled:function(){}});var a,o,s=Object.create||function(e){function t(){}return t.prototype=e,new t},l=i.imports&&i.imports.Handlebars||this&&this.Handlebars;l||"function"!=typeof r||(l=r("handlebars"));var u=i.Handlebars=s(l);u.helper=function(e,r){a||(a=t("ember-views/views/view").View),o||(o=t("ember-views/views/component")["default"]),a.detect(r)?u.registerHelper(e,u.makeViewHelper(r)):u.registerBoundHelper.apply(null,arguments)},u.makeViewHelper=function(e){return function(t){return u.helpers.view.call(this,e,t)}},u.helpers=s(l.helpers),u.Compiler=function(){},l.Compiler&&(u.Compiler.prototype=s(l.Compiler.prototype)),u.Compiler.prototype.compiler=u.Compiler,u.JavaScriptCompiler=function(){},l.JavaScriptCompiler&&(u.JavaScriptCompiler.prototype=s(l.JavaScriptCompiler.prototype),u.JavaScriptCompiler.prototype.compiler=u.JavaScriptCompiler),u.JavaScriptCompiler.prototype.namespace="Ember.Handlebars",u.JavaScriptCompiler.prototype.initializeBuffer=function(){return"''"},u.JavaScriptCompiler.prototype.appendToBuffer=function(e){return"data.buffer.push("+e+");"};var c=/helpers\.(.*?)\)/,h=/helpers\['(.*?)'/,m=/(.*blockHelperMissing\.call\(.*)(stack[0-9]+)(,.*)/;u.JavaScriptCompiler.stringifyLastBlockHelperMissingInvocation=function(e){var t=e[e.length-1],r=(c.exec(t)||h.exec(t))[1],n=m.exec(t);e[e.length-1]=n[1]+"'"+r+"'"+n[3]};var f=u.JavaScriptCompiler.stringifyLastBlockHelperMissingInvocation,p=u.JavaScriptCompiler.prototype.blockValue;u.JavaScriptCompiler.prototype.blockValue=function(){p.apply(this,arguments),f(this.source)};var d=u.JavaScriptCompiler.prototype.ambiguousBlockValue;u.JavaScriptCompiler.prototype.ambiguousBlockValue=function(){d.apply(this,arguments),f(this.source)},u.Compiler.prototype.mustache=function(e){if(!e.params.length&&!e.hash){var t=new l.AST.IdNode([{part:"_triageMustache"}]);e.escaped||(e.hash=e.hash||new l.AST.HashNode([]),e.hash.pairs.push(["unescaped",new l.AST.StringNode("true")])),e=new l.AST.MustacheNode([t].concat([e.id]),e.hash,!e.escaped)}return l.Compiler.prototype.mustache.call(this,e)},u.precompile=function(e,t){var r=l.parse(e),n={knownHelpers:{action:!0,unbound:!0,"bind-attr":!0,template:!0,view:!0,_triageMustache:!0},data:!0,stringParams:!0};t=void 0===t?!0:t;var i=(new u.Compiler).compile(r,n);return(new u.JavaScriptCompiler).compile(i,n,void 0,t)},l.compile&&(u.compile=function(e){var t=l.parse(e),r={data:!0,stringParams:!0},n=(new u.Compiler).compile(t,r),i=(new u.JavaScriptCompiler).compile(n,r,void 0,!0),a=u.template(i);return a.isMethod=!1,a}),n["default"]=u})}(),function(){e("ember-handlebars/component_lookup",["ember-runtime/system/object","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=r.extend({lookupFactory:function(e,t){t=t||this.container;var r="component:"+e,n="template:components/"+e,a=t&&t.has(n);a&&t.injection(r,"layout",n);var o=t.lookupFactory(r);return a||o?(o||(t.register(r,i.Component),o=t.lookupFactory(r)),o):void 0}});t["default"]=n}),e("ember-handlebars/controls",["ember-handlebars/controls/checkbox","ember-handlebars/controls/text_field","ember-handlebars/controls/text_area","ember-metal/core","ember-handlebars-compiler","exports"],function(){function e(e){var t=e.hash,r=(e.hashTypes,t.type),n=t.on;return delete t.type,delete t.on,"checkbox"===r?l.view.call(this,i,e):(r&&(t.type=r),t.onEvent=n||"enter",l.view.call(this,a,e))}function t(e){e.hash,e.hashTypes;return l.view.call(this,o,e)}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1]["default"],o=r[2]["default"],s=(r[3]["default"],r[4]["default"]),l=s.helpers;n.inputHelper=e,n.textareaHelper=t}),e("ember-handlebars/controls/checkbox",["ember-metal/property_get","ember-metal/property_set","ember-views/views/view","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].get,n=e[1].set,i=e[2].View,a=i.extend({classNames:["ember-checkbox"],tagName:"input",attributeBindings:["type","checked","indeterminate","disabled","tabindex","name","autofocus","required","form"],type:"checkbox",checked:!1,disabled:!1,indeterminate:!1,init:function(){this._super(),this.on("change",this,this._updateElementValue)},didInsertElement:function(){this._super(),r(this,"element").indeterminate=!!r(this,"indeterminate")},_updateElementValue:function(){n(this,"checked",this.$().prop("checked"))}});t["default"]=a}),e("ember-handlebars/controls/select",["ember-handlebars-compiler","ember-metal/enumerable_utils","ember-metal/property_get","ember-metal/property_set","ember-views/views/view","ember-views/views/collection_view","ember-metal/utils","ember-metal/is_none","ember-metal/computed","ember-runtime/system/native_array","ember-metal/mixin","ember-metal/properties","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],a=e[2].get,o=e[3].set,s=e[4].View,l=e[5]["default"],u=e[6].isArray,c=e[7]["default"],h=e[8].computed,m=e[9].A,f=e[10].observer,p=e[11].defineProperty,d=n.indexOf,g=n.indexesOf,v=n.forEach,b=n.replace,y=(r.compile,s.extend({tagName:"option",attributeBindings:["value","selected"],defaultTemplate:function(e,t){t={data:t.data,hash:{}},r.helpers.bind.call(e,"view.label",t)},init:function(){this.labelPathDidChange(),this.valuePathDidChange(),this._super()},selected:h(function(){var e=a(this,"content"),t=a(this,"parentView.selection");return a(this,"parentView.multiple")?t&&d(t,e.valueOf())>-1:e==t}).property("content","parentView.selection"),labelPathDidChange:f("parentView.optionLabelPath",function(){var e=a(this,"parentView.optionLabelPath");e&&p(this,"label",h(function(){return a(this,e)}).property(e))}),valuePathDidChange:f("parentView.optionValuePath",function(){var e=a(this,"parentView.optionValuePath");e&&p(this,"value",h(function(){return a(this,e)}).property(e))})})),_=l.extend({tagName:"optgroup",attributeBindings:["label"],selectionBinding:"parentView.selection",multipleBinding:"parentView.multiple",optionLabelPathBinding:"parentView.optionLabelPath",optionValuePathBinding:"parentView.optionValuePath",itemViewClassBinding:"parentView.optionView"}),w=s.extend({tagName:"select",classNames:["ember-select"],defaultTemplate:i.Handlebars.template(function(e,t,r,n,a){function o(e,t){var n,i="";return t.buffer.push('<option value="">'),n=r._triageMustache.call(e,"view.prompt",{hash:{},hashTypes:{},hashContexts:{},contexts:[e],types:["ID"],data:t}),(n||0===n)&&t.buffer.push(n),t.buffer.push("</option>"),i}function s(e,t){var n;n=r.each.call(e,"view.groupedContent",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(4,l,t),contexts:[e],types:["ID"],data:t}),n||0===n?t.buffer.push(n):t.buffer.push("")}function l(e,t){t.buffer.push(f(r.view.call(e,"view.groupView",{hash:{content:"content",label:"label"},hashTypes:{content:"ID",label:"ID"},hashContexts:{content:e,label:e},contexts:[e],types:["ID"],data:t})))}function u(e,t){var n;n=r.each.call(e,"view.content",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(7,c,t),contexts:[e],types:["ID"],data:t}),n||0===n?t.buffer.push(n):t.buffer.push("")}function c(e,t){t.buffer.push(f(r.view.call(e,"view.optionView",{hash:{content:""},hashTypes:{content:"ID"},hashContexts:{content:e},contexts:[e],types:["ID"],data:t})))}this.compilerInfo=[4,">= 1.0.0"],r=this.merge(r,i.Handlebars.helpers),a=a||{};var h,m="",f=this.escapeExpression,p=this;return h=r["if"].call(t,"view.prompt",{hash:{},hashTypes:{},hashContexts:{},inverse:p.noop,fn:p.program(1,o,a),contexts:[t],types:["ID"],data:a}),(h||0===h)&&a.buffer.push(h),h=r["if"].call(t,"view.optionGroupPath",{hash:{},hashTypes:{},hashContexts:{},inverse:p.program(6,u,a),fn:p.program(3,s,a),contexts:[t],types:["ID"],data:a}),(h||0===h)&&a.buffer.push(h),m}),attributeBindings:["multiple","disabled","tabindex","name","required","autofocus","form","size"],multiple:!1,disabled:!1,required:!1,content:null,selection:null,value:h(function(e,t){if(2===arguments.length)return t;var r=a(this,"optionValuePath").replace(/^content\.?/,"");return r?a(this,"selection."+r):a(this,"selection")}).property("selection"),prompt:null,optionLabelPath:"content",optionValuePath:"content",optionGroupPath:null,groupView:_,groupedContent:h(function(){var e=a(this,"optionGroupPath"),t=m(),r=a(this,"content")||[];return v(r,function(r){var n=a(r,e);a(t,"lastObject.label")!==n&&t.pushObject({label:n,content:m()}),a(t,"lastObject.content").push(r)}),t}).property("optionGroupPath","content.@each"),optionView:y,_change:function(){a(this,"multiple")?this._changeMultiple():this._changeSingle()},selectionDidChange:f("selection.@each",function(){var e=a(this,"selection");if(a(this,"multiple")){if(!u(e))return o(this,"selection",m([e])),void 0;this._selectionDidChangeMultiple()}else this._selectionDidChangeSingle()}),valueDidChange:f("value",function(){var e,t=a(this,"content"),r=a(this,"value"),n=a(this,"optionValuePath").replace(/^content\.?/,""),i=n?a(this,"selection."+n):a(this,"selection");r!==i&&(e=t?t.find(function(e){return r===(n?a(e,n):e)}):null,this.set("selection",e))}),_triggerChange:function(){var e=a(this,"selection"),t=a(this,"value");c(e)||this.selectionDidChange(),c(t)||this.valueDidChange(),this._change()},_changeSingle:function(){var e=this.$()[0].selectedIndex,t=a(this,"content"),r=a(this,"prompt");if(t&&a(t,"length")){if(r&&0===e)return o(this,"selection",null),void 0;r&&(e-=1),o(this,"selection",t.objectAt(e))}},_changeMultiple:function(){var e=this.$("option:selected"),t=a(this,"prompt"),r=t?1:0,n=a(this,"content"),i=a(this,"selection");if(n&&e){var s=e.map(function(){return this.index-r}).toArray(),l=n.objectsAt(s);u(i)?b(i,0,a(i,"length"),l):o(this,"selection",l)}},_selectionDidChangeSingle:function(){var e=this.get("element");if(e){var t=a(this,"content"),r=a(this,"selection"),n=t?d(t,r):-1,i=a(this,"prompt");i&&(n+=1),e&&(e.selectedIndex=n)}},_selectionDidChangeMultiple:function(){var e,t=a(this,"content"),r=a(this,"selection"),n=t?g(t,r):[-1],i=a(this,"prompt"),o=i?1:0,s=this.$("option");s&&s.each(function(){e=this.index>-1?this.index-o:-1,this.selected=d(n,e)>-1})},init:function(){this._super(),this.on("didInsertElement",this,this._triggerChange),this.on("change",this,this._change)}});t["default"]=w,t.Select=w,t.SelectOption=y,t.SelectOptgroup=_}),e("ember-handlebars/controls/text_area",["ember-metal/property_get","ember-views/views/component","ember-handlebars/controls/text_support","ember-metal/mixin","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].get,n=e[1]["default"],i=e[2]["default"],a=e[3].observer,o=n.extend(i,{classNames:["ember-text-area"],tagName:"textarea",attributeBindings:["rows","cols","name","selectionEnd","selectionStart","wrap"],rows:null,cols:null,_updateElementValue:a("value",function(){var e=r(this,"value"),t=this.$();t&&e!==t.val()&&t.val(e)}),init:function(){this._super(),this.on("didInsertElement",this,this._updateElementValue)}});t["default"]=o}),e("ember-handlebars/controls/text_field",["ember-metal/property_get","ember-metal/property_set","ember-views/views/component","ember-handlebars/controls/text_support","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0].get,e[1].set,e[2]["default"]),n=e[3]["default"],i=r.extend(n,{classNames:["ember-text-field"],tagName:"input",attributeBindings:["type","value","size","pattern","name","min","max","accept","autocomplete","autosave","formaction","formenctype","formmethod","formnovalidate","formtarget","height","inputmode","list","multiple","pattern","step","width"],value:"",type:"text",size:null,pattern:null,min:null,max:null});t["default"]=i}),e("ember-handlebars/controls/text_support",["ember-metal/property_get","ember-metal/property_set","ember-metal/mixin","ember-runtime/mixins/target_action_support","exports"],function(){function e(e,t,r){var i=n(t,e),a=n(t,"onEvent"),o=n(t,"value");(a===e||"keyPress"===a&&"key-press"===e)&&t.sendAction("action",o),t.sendAction(e,o),(i||a===e)&&(n(t,"bubbles")||r.stopPropagation())}var t=arguments,r=t[t.length-1],n=t[0].get,i=t[1].set,a=t[2].Mixin,o=t[3]["default"],s=a.create(o,{value:"",attributeBindings:["placeholder","disabled","maxlength","tabindex","readonly","autofocus","form","selectionDirection","spellcheck","required","title","autocapitalize","autocorrect"],placeholder:null,disabled:!1,maxlength:null,init:function(){this._super(),this.on("focusOut",this,this._elementValueDidChange),this.on("change",this,this._elementValueDidChange),this.on("paste",this,this._elementValueDidChange),this.on("cut",this,this._elementValueDidChange),this.on("input",this,this._elementValueDidChange),this.on("keyUp",this,this.interpretKeyEvents)},action:null,onEvent:"enter",bubbles:!1,interpretKeyEvents:function(e){var t=s.KEY_EVENTS,r=t[e.keyCode];return this._elementValueDidChange(),r?this[r](e):void 0},_elementValueDidChange:function(){i(this,"value",this.$().val())},insertNewline:function(t){e("enter",this,t),e("insert-newline",this,t)},cancel:function(t){e("escape-press",this,t)},focusIn:function(t){e("focus-in",this,t)},focusOut:function(t){e("focus-out",this,t)},keyPress:function(t){e("key-press",this,t)}});s.KEY_EVENTS={13:"insertNewline",27:"cancel"},r["default"]=s}),e("ember-handlebars/ext",["ember-metal/core","ember-runtime/system/string","ember-handlebars-compiler","ember-metal/property_get","ember-metal/binding","ember-metal/error","ember-metal/mixin","ember-metal/is_empty","exports"],function(){function e(e,t,r){var n,i,a=r&&r.keywords||{};return n=t.split(".",1)[0],a.hasOwnProperty(n)&&(e=a[n],i=!0,t=t===n?"":t.substr(n.length+1)),{root:e,path:t,isKeyword:i}}function r(t,r,n){var i,a=n&&n.data,o=e(t,r,a);return t=o.root,r=o.path,i=_(t,r),void 0===i&&t!==g.lookup&&w(r)&&(i=_(g.lookup,r)),i}function n(e,t,n){var i=r(e,t,n);return null===i||void 0===i?i="":i instanceof Handlebars.SafeString||(i=String(i)),n.hash.unescaped||(i=Handlebars.Utils.escapeExpression(i)),i}function i(e,t,n){for(var i,a,o=[],s=n.types,l=0,u=t.length;u>l;l++)i=t[l],a=s[l],"ID"===a?o.push(r(e,i,n)):o.push(i);return o}function a(e,t,n){var i,a={},o=n.hashTypes;for(var s in t)t.hasOwnProperty(s)&&(i=o[s],a[s]="ID"===i?r(e,t[s],n):t[s]);return a}function o(e){m||(m=t("ember-handlebars/helpers/binding").resolveHelper);var r,n="",i=arguments[arguments.length-1],a=m(i.data.view.container,e);if(a)return a.apply(this,O.call(arguments,1));throw r="%@ Handlebars error: Could not find property '%@' on object %@.",i.data&&(n=i.data.view),new x(v(r,[n,e,this]))}function s(e){m||(m=t("ember-handlebars/helpers/binding").resolveHelper);var r=arguments[arguments.length-1],n=m(r.data.view.container,e);return n?n.apply(this,O.call(arguments,1)):y.helperMissing.call(this,e)}function l(e){var t=O.call(arguments,1),r=u.apply(this,t);b.registerHelper(e,r)}function u(r){function n(){var t,n,a,o,s,l=O.call(arguments,0,-1),u=l.length,h=arguments[arguments.length-1],m=[],p=h.data,d=p.isUnbound?O.call(h.types,1):h.types,g=h.hash,v=p.view,b=h.contexts,y=b&&b.length?b[0]:this,_="",w=f.prototype.normalizedValue,x=g.boundOptions={};for(a in g)C.test(a)&&(x[a.slice(0,-7)]=g[a]);var P=[];for(p.properties=[],t=0;u>t;++t)if(p.properties.push(l[t]),"ID"===d[t]){var A=e(y,l[t],p);m.push(A),P.push(A)}else p.isUnbound?m.push({path:l[t]}):m.push(null);if(p.isUnbound)return c(this,r,m,h);var T=new f(null,null,!h.hash.unescaped,h.data);T.normalizedValue=function(){var n,i=[];for(n in x)x.hasOwnProperty(n)&&(s=e(y,x[n],p),T.path=s.path,T.pathRoot=s.root,g[n]=w.call(T));for(t=0;u>t;++t)s=m[t],s?(T.path=s.path,T.pathRoot=s.root,i.push(w.call(T))):i.push(l[t]);return i.push(h),r.apply(y,i)},v.appendChild(T);for(o in x)x.hasOwnProperty(o)&&P.push(e(y,x[o],p));for(t=0,n=P.length;n>t;++t)s=P[t],v.registerObserver(s.root,s.path,T,T.rerender);if("ID"===d[0]&&0!==m.length){var S=m[0],I=S.root,N=S.path;E(N)||(_=N+".");for(var V=0,R=i.length;R>V;V++)v.registerObserver(I,_+i[V],T,T.rerender)}}f||(f=t("ember-handlebars/views/handlebars_bound_view").SimpleHandlebarsView);var i=O.call(arguments,1);return n._rawFunction=r,n}function c(e,t,n,i){var a,o,s,l,u,c=[],h=i.hash,m=h.boundOptions,f=O.call(i.types,1);for(u in m)m.hasOwnProperty(u)&&(h[u]=r(e,m[u],i));for(a=0,o=n.length;o>a;++a)s=n[a],l=f[a],"ID"===l?c.push(r(s.root,s.path,i)):c.push(s.path);return c.push(i),t.apply(e,c)}function h(e){var t=P(e);return t.isTop=!0,t}var m,f,p=arguments,d=p[p.length-1],g=p[0]["default"],v=p[1].fmt,b=p[2]["default"],y=b.helpers,_=p[3].get,w=p[4].isGlobalPath,x=p[5]["default"],C=p[6].IS_BINDING,E=p[7]["default"],O=[].slice,P=b.template;d.normalizePath=e,d.template=h,d.makeBoundHelper=u,d.registerBoundHelper=l,d.resolveHash=a,d.resolveParams=i,d.handlebarsGet=r,d.getEscaped=n,d.evaluateUnboundHelper=c,d.helperMissingHelper=o,d.blockHelperMissingHelper=s}),e("ember-handlebars/helpers/binding",["ember-metal/core","ember-handlebars-compiler","ember-metal/property_get","ember-metal/property_set","ember-runtime/system/string","ember-metal/utils","ember-metal/platform","ember-metal/is_none","ember-metal/enumerable_utils","ember-metal/array","ember-views/views/view","ember-metal/run_loop","ember-handlebars/views/handlebars_bound_view","ember-metal/observer","ember-metal/binding","ember-views/system/jquery","ember-handlebars/ext","ember-runtime/keys","exports"],function(){function e(e){return!E(e)}function t(e,t,r,n,i,a){var o,s,l,u=t.data,c=t.fn,h=t.inverse,m=u.view,f=this||window;if(o=M(f,e,u),"object"==typeof this){if(u.insideGroup){s=function(){A.once(m,"rerender")};var p,d,g=L(f,e,t);g=i?i(g):g,d=r?f:g,n(g)?p=c:h&&(p=h),p(d,{data:t.data})}else{var v=T,b={preserveContext:r,shouldDisplayFunc:n,valueNormalizerFunc:i,displayTemplate:c,inverseTemplate:h,path:e,pathRoot:f,previousContext:f,isEscaped:!t.hash.unescaped,templateData:t.data,templateHash:t.hash};"with"===t.helperName&&(v=F);var y=m.createChildView(v,b);m.appendChild(y),s=function(){A.scheduleOnce("render",y,"rerenderIfNeeded")}}if(""!==o.path&&(m.registerObserver(o.root,o.path,s),a))for(l=0;l<a.length;l++)m.registerObserver(o.root,o.path+"."+a[l],s)}else u.buffer.push(H(f,e,t))}function r(e,t,r){var n,i,a,o,s=r.data,l=s.view;if(n=M(e,t,s),a=n.root,a&&"object"==typeof a){if(s.insideGroup)i=function(){A.once(l,"rerender")},o=H(e,t,r),s.buffer.push(o);else{var u=new S(t,e,!r.hash.unescaped,r.data);u._parentView=l,l.appendChild(u),i=function(){A.scheduleOnce("render",u,"rerender")}}""!==n.path&&l.registerObserver(n.root,n.path,i)}else o=H(e,t,r),s.buffer.push(o)}function n(e){var t=e&&w(e,"isTruthy");return"boolean"==typeof t?t:j(e)?0!==w(e,"length"):!!e}function i(e,t){var r=b.resolveHelper(t.data.view.container,e);return r?r.call(this,t):y.bind.call(this,e,t)}function a(e,t){if(y[t])return y[t];if(e&&-1!==t.indexOf("-")){var r=e.lookup("helper:"+t);if(!r){var n=e.lookup("component-lookup:main"),i=n.lookupFactory(t,e);i&&(r=b.makeViewHelper(i),e.register("helper:"+t,r))}return r}}function o(n,i){var a=i.contexts&&i.contexts.length?i.contexts[0]:this;return i.fn?t.call(a,n,i,!1,e):r(a,n,i)}function s(e,r){var i=r.contexts&&r.contexts.length?r.contexts[0]:this;return t.call(i,e,r,!0,n,n,["isTruthy","length"])}function l(e,t){var r,i,a=t.contexts&&t.contexts.length?t.contexts[0]:this,o=t.data,s=t.fn,l=t.inverse;r=M(a,e,o),i=L(a,e,t),n(i)||(s=l),s(a,{data:o})}function u(r,n){var i,a;if(4===arguments.length){var o,s,l,u,c;n=arguments[3],o=arguments[2],s=arguments[0];var h=C(n);if(h.data=C(n.data),h.data.keywords=C(n.data.keywords||{}),N(s))c=s;else{u=M(this,s,n.data),s=u.path,l=u.root;var m=D.expando+R(l);h.data.keywords[m]=l,c=s?m+"."+s:m}h.hash.keywordName=o,h.hash.keywordPath=c,i=this,r=s,n=h,a=!0}else i=n.contexts[0],a=!1;return n.helperName="with",t.call(i,r,n,a,e)}function c(e,t){return t.data.isUnbound?y.unboundIf.call(t.contexts[0],e,t):y.boundIf.call(t.contexts[0],e,t)}function h(e,t){var r=t.fn,n=t.inverse;return t.fn=n,t.inverse=r,t.data.isUnbound?y.unboundIf.call(t.contexts[0],e,t):y.boundIf.call(t.contexts[0],e,t)}function m(e){var t=e.hash,r=e.data.view,n=[],i=this||window,a=++v.uuid,o=t["class"];if(null!=o){var s=p(i,o,r,a,e);n.push('class="'+Handlebars.Utils.escapeExpression(s.join(" "))+'"'),delete t["class"]}var l=B(t);return O.call(l,function(o){var s,l=t[o];s=M(i,l,e.data);var u,c,h="this"===l?s.root:L(i,l,e),m=k(h);u=function(){var t=L(i,l,e),n=r.$("[data-bindattr-"+a+"='"+a+"']");return n&&0!==n.length?(P.applyAttributeBindings(n,o,t),void 0):(I(s.root,s.path,c),void 0)},"this"===l||s.isKeyword&&""===s.path||r.registerObserver(s.root,s.path,u),"string"===m||"number"===m&&!isNaN(h)?n.push(o+'="'+Handlebars.Utils.escapeExpression(h)+'"'):h&&"boolean"===m&&n.push(o+'="'+o+'"')},this),n.push("data-bindattr-"+a+'="'+a+'"'),new _(n.join(" "))}function f(){return y["bind-attr"].apply(this,arguments)}function p(e,t,r,n,i){var a,o,s,l=[],u=function(e,t,r){var n,i=t.path;return n="this"===i?e:""===i?!0:L(e,i,r),P._classStringForValue(i,n,t.className,t.falsyClassName)};return O.call(t.split(" "),function(t){var c,h,m,f,p=P._parsePropertyPath(t),d=p.path,g=e;""!==d&&"this"!==d&&(f=M(e,d,i.data),g=f.root,d=f.path),h=function(){a=u(e,p,i),s=n?r.$("[data-bindattr-"+n+"='"+n+"']"):r.$(),s&&0!==s.length?(c&&s.removeClass(c),a?(s.addClass(a),c=a):c=null):I(g,d,m)},""!==d&&"this"!==d&&r.registerObserver(g,d,h),o=u(e,p,i),o&&(l.push(o),c=o)}),l}var d=arguments,g=d[d.length-1],v=d[0]["default"],b=d[1]["default"],y=b.helpers,_=b.SafeString,w=d[2].get,x=(d[3].set,d[4].fmt,d[5].apply),C=d[6].create,E=d[7]["default"],O=(d[8]["default"],d[9].forEach),P=d[10].View,A=d[11]["default"],T=d[12]._HandlebarsBoundView,S=d[12].SimpleHandlebarsView,I=d[13].removeObserver,N=d[14].isGlobalPath,V=d[14].bind,R=d[5].guidFor,k=d[5].typeOf,D=d[15]["default"],j=d[5].isArray,M=d[16].normalizePath,L=d[16].handlebarsGet,H=(d[16].getEscaped,d[16].getEscaped),B=d[17]["default"],F=T.extend({init:function(){var e;x(this,this._super,arguments);var t=this.templateData.keywords,r=this.templateHash.keywordName,n=this.templateHash.keywordPath,i=this.templateHash.controller,a=this.preserveContext;if(i){var o=this.previousContext;if(e=this.container.lookupFactory("controller:"+i).create({parentController:o,target:o}),this._generatedController=e,a){var s=D.expando+R(e);t[s]=e,V(t,s+".model",n),n=s}else this.set("controller",e),this.valueNormalizerFunc=function(t){return e.set("model",t),e}}a&&V(t,r,n)},willDestroy:function(){this._super(),this._generatedController&&this._generatedController.destroy()}});g.bind=t,g._triageMustacheHelper=i,g.resolveHelper=a,g.bindHelper=o,g.boundIfHelper=s,g.unboundIfHelper=l,g.withHelper=u,g.ifHelper=c,g.unlessHelper=h,g.bindAttrHelper=m,g.bindAttrHelperDeprecated=f,g.bindClasses=p}),e("ember-handlebars/helpers/collection",["ember-metal/core","ember-metal/utils","ember-handlebars-compiler","ember-runtime/system/string","ember-metal/property_get","ember-handlebars/ext","ember-handlebars/helpers/view","ember-metal/computed","ember-views/views/collection_view","exports"],function(){function e(e,t){e&&e.data&&e.data.isRenderData&&(t=e,e=void 0);{var r,l,h,m=t.fn,f=t.data,p=t.inverse;t.data.view}e?(r=f.keywords.controller,l=r&&r.container,h=o(this,e,t)||l.lookupFactory("view:"+e)):h=u;var d,g,v=t.hash,b={},y=h.proto();v.itemView?(r=f.keywords.controller,l=r.container,g=l.lookupFactory("view:"+v.itemView)):g=v.itemViewClass?o(y,v.itemViewClass,t):y.itemViewClass,delete v.itemViewClass,delete v.itemView;for(var _ in v)v.hasOwnProperty(_)&&(d=_.match(/^item(.)(.*)$/),d&&"itemController"!==_&&(b[d[1].toLowerCase()+d[2]]=v[_],delete v[_]));m&&(b.template=m,delete t.fn);var w;p&&p!==n.VM.noop?(w=a(y,"emptyViewClass"),w=w.extend({template:p,tagName:b.tagName})):v.emptyViewClass&&(w=o(this,v.emptyViewClass,t)),w&&(v.emptyView=w),b._context=v.keyword?this:c("content");var x=s.propertiesFromHTMLOptions({data:f,hash:b},this);return v.itemViewClass=g.extend(x),i.view.call(this,h,t)}var t=arguments,r=t[t.length-1],n=(t[0]["default"],t[1].inspect,t[2]["default"]),i=n.helpers,a=(t[3].fmt,t[4].get),o=t[5].handlebarsGet,s=t[6].ViewHelper,l=t[7].computed,u=t[8]["default"],c=l.alias;r["default"]=e}),e("ember-handlebars/helpers/debug",["ember-metal/core","ember-metal/utils","ember-metal/logger","ember-metal/property_get","ember-handlebars/ext","exports"],function(){function e(){for(var e=l.call(arguments,0,-1),t=arguments[arguments.length-1],r=a.log,n=[],i=!0,u=0;u<e.length;u++){var c=t.types[u];if("ID"!==c&&i)n.push(e[u]);else{var h=t.contexts&&t.contexts[u]||this,m=o(h,e[u],t.data);"this"===m.path?n.push(m.root):n.push(s(m.root,m.path,t))}}r.apply(r,n)}function t(){{var e=this;i(e)}}var r=arguments,n=r[r.length-1],i=(r[0]["default"],r[1].inspect),a=r[2]["default"],o=(r[3].get,r[4].normalizePath),s=r[4].handlebarsGet,l=[].slice;n.logHelper=e,n.debuggerHelper=t}),e("ember-handlebars/helpers/each",["ember-metal/core","ember-handlebars-compiler","ember-runtime/system/string","ember-metal/property_get","ember-metal/property_set","ember-handlebars/views/metamorph_view","ember-views/views/collection_view","ember-metal/binding","ember-runtime/controllers/controller","ember-runtime/controllers/array_controller","ember-runtime/mixins/array","ember-runtime/copy","ember-metal/run_loop","ember-metal/observer","ember-metal/events","ember-handlebars/ext","exports"],function(){function e(e,t){var r;if(4===arguments.length){var n=arguments[0];t=arguments[3],e=arguments[2],""===e&&(e="this"),t.hash.keyword=n}return 1===arguments.length&&(t=e,e="this"),t.hash.dataSourceBinding=e,r=this||window,!t.data.insideGroup||t.hash.groupedRows||t.hash.itemViewClass?o.collection.call(r,"Ember.Handlebars.EachView",t):(new w(r,e,t).render(),void 0)}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=n.K,a=t[1]["default"],o=a.helpers,s=(t[2].fmt,t[3].get),l=t[4].set,u=t[5]._Metamorph,c=t[5]._MetamorphView,h=t[6]["default"],m=t[7].Binding,f=(t[8].ControllerMixin,t[9]["default"],t[10]["default"],t[11]["default"]),p=t[12]["default"],d=t[13].addObserver,g=t[13].removeObserver,v=t[13].addBeforeObserver,b=t[13].removeBeforeObserver,y=(t[14].on,t[15].handlebarsGet),_=h.extend(u,{init:function(){var e,t=s(this,"itemController");if(t){var r=s(this,"controller.container").lookupFactory("controller:array").create({_isVirtual:!0,parentController:s(this,"controller"),itemController:t,target:s(this,"controller"),_eachView:this});this.disableContentObservers(function(){l(this,"content",r),e=new m("content","_eachView.dataSource").oneWay(),e.connect(r)}),l(this,"_arrayController",r)}else this.disableContentObservers(function(){e=new m("content","dataSource").oneWay(),e.connect(this)});return this._super()},_assertArrayLike:function(){},disableContentObservers:function(e){b(this,"content",null,"_contentWillChange"),g(this,"content",null,"_contentDidChange"),e.call(this),v(this,"content",null,"_contentWillChange"),d(this,"content",null,"_contentDidChange")},itemViewClass:c,emptyViewClass:c,createChildView:function(e,t){e=this._super(e,t);var r=s(this,"keyword"),n=s(e,"content");if(r){var i=s(e,"templateData");i=f(i),i.keywords=e.cloneKeywords(),l(e,"templateData",i),i.keywords[r]=n}return n&&n.isController&&l(e,"controller",n),e},destroy:function(){if(this._super()){var e=s(this,"_arrayController");return e&&e.destroy(),this}}}),w=a.GroupedEach=function(e,t,r){var n=this,i=a.normalizePath(e,t,r.data);this.context=e,this.path=t,this.options=r,this.template=r.fn,this.containingView=r.data.view,this.normalizedRoot=i.root,this.normalizedPath=i.path,this.content=this.lookupContent(),this.addContentObservers(),this.addArrayObservers(),this.containingView.on("willClearRender",function(){n.destroy()})};w.prototype={contentWillChange:function(){this.removeArrayObservers()},contentDidChange:function(){this.content=this.lookupContent(),this.addArrayObservers(),this.rerenderContainingView()},contentArrayWillChange:i,contentArrayDidChange:function(){this.rerenderContainingView()},lookupContent:function(){return y(this.normalizedRoot,this.normalizedPath,this.options)
},addArrayObservers:function(){this.content&&this.content.addArrayObserver(this,{willChange:"contentArrayWillChange",didChange:"contentArrayDidChange"})},removeArrayObservers:function(){this.content&&this.content.removeArrayObserver(this,{willChange:"contentArrayWillChange",didChange:"contentArrayDidChange"})},addContentObservers:function(){v(this.normalizedRoot,this.normalizedPath,this,this.contentWillChange),d(this.normalizedRoot,this.normalizedPath,this,this.contentDidChange)},removeContentObservers:function(){b(this.normalizedRoot,this.normalizedPath,this.contentWillChange),g(this.normalizedRoot,this.normalizedPath,this.contentDidChange)},render:function(){if(this.content){var e=this.content,t=s(e,"length"),r=this.options.data,n=this.template;r.insideEach=!0;for(var i=0;t>i;i++)n(e.objectAt(i),{data:r})}},rerenderContainingView:function(){var e=this;p.scheduleOnce("render",this,function(){e.destroyed||e.containingView.rerender()})},destroy:function(){this.removeContentObservers(),this.content&&this.removeArrayObservers(),this.destroyed=!0}},r.EachView=_,r.GroupedEach=w,r.eachHelper=e}),e("ember-handlebars/helpers/loc",["ember-runtime/system/string","exports"],function(){function e(e){return n(e)}var t=arguments,r=t[t.length-1],n=t[0].loc;r["default"]=e}),e("ember-handlebars/helpers/partial",["ember-metal/core","ember-metal/is_none","ember-handlebars/ext","ember-handlebars/helpers/binding","exports"],function(){function e(e,n){var i=n.contexts&&n.contexts.length?n.contexts[0]:this;return"ID"===n.types[0]?(n.fn=function(t,n){var i=o(t,e,n);r(t,i,n)},s.call(i,e,n,!0,t)):(r(i,e,n),void 0)}function t(e){return!a(e)}function r(e,t,r){var n=t.split("/"),i=n[n.length-1];n[n.length-1]="_"+i;var a=r.data.view,o=n.join("/"),s=a.templateForName(o),l=!s&&a.templateForName(t);(s=s||l)(e,{data:r.data})}var n=arguments,i=n[n.length-1],a=(n[0]["default"],n[1].isNone),o=n[2].handlebarsGet,s=n[3].bind;i["default"]=e}),e("ember-handlebars/helpers/shared",["ember-handlebars/ext","exports"],function(){function e(e){for(var t=[],r=e.contexts,i=e.roots,a=e.data,o=0,s=r.length;s>o;o++)t.push(n(i[o],r[o],{data:a}));return t}var t=arguments,r=t[t.length-1],n=t[0].handlebarsGet;r["default"]=e}),e("ember-handlebars/helpers/template",["ember-metal/core","ember-handlebars-compiler","exports"],function(){function e(){return i.partial.apply(this,arguments)}var t=arguments,r=t[t.length-1],n=(t[0]["default"],t[1]["default"]),i=n.helpers;r["default"]=e}),e("ember-handlebars/helpers/unbound",["ember-handlebars-compiler","ember-handlebars/helpers/binding","ember-handlebars/ext","exports"],function(){function e(e,t){var r,n,l,u,c=arguments[arguments.length-1],h=c.data.view.container;return u=this,arguments.length>2?(c.data.isUnbound=!0,r=a(h,e)||i.helperMissing,l=r.apply(u,s.call(arguments,1)),delete c.data.isUnbound,l):(n=t.contexts&&t.contexts.length?t.contexts[0]:u,o(n,e,t))}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=n.helpers,a=t[1].resolveHelper,o=t[2].handlebarsGet,s=[].slice;r["default"]=e}),e("ember-handlebars/helpers/view",["ember-metal/core","ember-runtime/system/object","ember-metal/property_get","ember-metal/property_set","ember-metal/mixin","ember-views/system/jquery","ember-views/views/view","ember-metal/binding","ember-handlebars/ext","ember-runtime/system/string","exports"],function(){function e(e,t){var r=t.hash,n=t.hashTypes;for(var i in r)if("ID"===n[i]){var o=r[i];a.test(i)||(r[i+"Binding"]=o,n[i+"Binding"]="STRING",delete r[i],delete n[i])}r.hasOwnProperty("idBinding")&&(r.id=c(e,r.idBinding,t),n.id="STRING",delete r.idBinding,delete n.idBinding)}function t(e,t){return e&&e.data&&e.data.isRenderData&&(t=e,e="Ember.View"),f.helper(this,e,t)}var r=arguments,n=r[r.length-1],i=(r[0]["default"],r[1]["default"]),a=(r[2].get,r[3].set,r[4].IS_BINDING),o=r[5]["default"],s=r[6].View,l=r[7].isGlobalPath,u=r[8].normalizePath,c=r[8].handlebarsGet,h=(r[9]["default"],/^[a-z]/),m=/^view\./,f=i.create({propertiesFromHTMLOptions:function(e){var t=e.hash,r=e.data,n={},i=t["class"],l=!1;t.id&&(n.elementId=t.id,l=!0),t.tag&&(n.tagName=t.tag,l=!0),i&&(i=i.split(" "),n.classNames=i,l=!0),t.classBinding&&(n.classNameBindings=t.classBinding.split(" "),l=!0),t.classNameBindings&&(void 0===n.classNameBindings&&(n.classNameBindings=[]),n.classNameBindings=n.classNameBindings.concat(t.classNameBindings.split(" ")),l=!0),t.attributeBindings&&(n.attributeBindings=null,l=!0),l&&(t=o.extend({},t),delete t.id,delete t.tag,delete t["class"],delete t.classBinding);var u;for(var c in t)t.hasOwnProperty(c)&&a.test(c)&&"string"==typeof t[c]&&(u=this.contextualizeBindingPath(t[c],r),u&&(t[c]=u));if(n.classNameBindings)for(var h in n.classNameBindings){var m=n.classNameBindings[h];if("string"==typeof m){var f=s._parsePropertyPath(m);u=this.contextualizeBindingPath(f.path,r),u&&(n.classNameBindings[h]=u+f.classNames)}}return o.extend(t,n)},contextualizeBindingPath:function(e,t){var r=u(null,e,t);return r.isKeyword?"templateData.keywords."+e:l(e)?null:"this"===e||""===e?"_parentView.context":"_parentView.context."+e},helper:function(t,r,n){var i,a=n.data,o=n.fn;e(t,n),i="string"==typeof r?"STRING"===n.types[0]&&h.test(r)&&!m.test(r)?a.view.container.lookupFactory("view:"+r):c(t,r,n):r;var s=this.propertiesFromHTMLOptions(n,t),l=a.view;s.templateData=a;var u=i.proto?i.proto():i;o&&(s.template=o),u.controller||u.controllerBinding||s.controller||s.controllerBinding||(s._context=t),l.appendChild(i,s)}});n.ViewHelper=f,n.viewHelper=t}),e("ember-handlebars/helpers/yield",["ember-metal/core","ember-metal/property_get","exports"],function(){function e(e){for(var t=e.data.view;t&&!n(t,"layout");)t=t._contextView?t._contextView:n(t,"_parentView");t._yield(this,e)}var t=arguments,r=t[t.length-1],n=(t[0]["default"],t[1].get);r["default"]=e}),e("ember-handlebars/loader",["ember-handlebars/component_lookup","ember-views/system/jquery","ember-metal/error","ember-runtime/system/lazy_load","ember-handlebars-compiler","exports"],function(){function e(e){var t='script[type="text/x-handlebars"], script[type="text/x-raw-handlebars"]';s(t,e).each(function(){var e=s(this),t="text/x-raw-handlebars"===e.attr("type")?s.proxy(Handlebars.compile,Handlebars):s.proxy(c.compile,c),r=e.attr("data-template-name")||e.attr("id")||"application",n=t(e.html());if(void 0!==i.TEMPLATES[r])throw new l('Template named "'+r+'" already exists.');i.TEMPLATES[r]=n,e.remove()})}function t(){e(s(document))}function r(e){e.register("component-lookup:main",o)}var n=arguments,a=n[n.length-1],o=n[0]["default"],s=n[1]["default"],l=n[2]["default"],u=n[3].onLoad,c=n[4]["default"];u("Ember.Application",function(e){e.initializer({name:"domTemplates",initialize:t}),e.initializer({name:"registerComponentLookup",after:"domTemplates",initialize:r})}),a["default"]=e}),e("ember-handlebars",["ember-handlebars-compiler","ember-metal/core","ember-runtime/system/lazy_load","ember-handlebars/loader","ember-handlebars/ext","ember-handlebars/string","ember-handlebars/helpers/shared","ember-handlebars/helpers/binding","ember-handlebars/helpers/collection","ember-handlebars/helpers/view","ember-handlebars/helpers/unbound","ember-handlebars/helpers/debug","ember-handlebars/helpers/each","ember-handlebars/helpers/template","ember-handlebars/helpers/partial","ember-handlebars/helpers/yield","ember-handlebars/helpers/loc","ember-handlebars/controls/checkbox","ember-handlebars/controls/select","ember-handlebars/controls/text_area","ember-handlebars/controls/text_field","ember-handlebars/controls/text_support","ember-handlebars/controls","ember-handlebars/component_lookup","ember-handlebars/views/handlebars_bound_view","ember-handlebars/views/metamorph_view","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],i=e[2].runLoadHooks,a=e[3]["default"],o=e[4].normalizePath,s=e[4].template,l=e[4].makeBoundHelper,u=e[4].registerBoundHelper,c=e[4].resolveHash,h=e[4].resolveParams,m=e[4].getEscaped,f=e[4].handlebarsGet,p=e[4].evaluateUnboundHelper,d=e[4].helperMissingHelper,g=e[4].blockHelperMissingHelper,v=e[6]["default"],b=e[7].bind,y=e[7]._triageMustacheHelper,_=e[7].resolveHelper,w=e[7].bindHelper,x=e[7].boundIfHelper,C=e[7].unboundIfHelper,E=e[7].withHelper,O=e[7].ifHelper,P=e[7].unlessHelper,A=e[7].bindAttrHelper,T=e[7].bindAttrHelperDeprecated,S=e[7].bindClasses,I=e[8]["default"],N=e[9].ViewHelper,V=e[9].viewHelper,R=e[10]["default"],k=e[11].logHelper,D=e[11].debuggerHelper,j=e[12].EachView,M=e[12].GroupedEach,L=e[12].eachHelper,H=e[13]["default"],B=e[14]["default"],F=e[15]["default"],z=e[16]["default"],U=e[17]["default"],q=e[18].Select,K=e[18].SelectOption,W=e[18].SelectOptgroup,G=e[19]["default"],Y=e[20]["default"],$=e[21]["default"],$=e[21]["default"],Q=e[22].inputHelper,J=e[22].textareaHelper,X=e[23]["default"],Z=e[24]._HandlebarsBoundView,et=e[24].SimpleHandlebarsView,tt=e[25]._SimpleMetamorphView,rt=e[25]._MetamorphView,nt=e[25]._Metamorph;r.bootstrap=a,r.template=s,r.makeBoundHelper=l,r.registerBoundHelper=u,r.resolveHash=c,r.resolveParams=h,r.resolveHelper=_,r.get=f,r.getEscaped=m,r.evaluateUnboundHelper=p,r.bind=b,r.bindClasses=S,r.EachView=j,r.GroupedEach=M,r.resolvePaths=v,r.ViewHelper=N,r.normalizePath=o,n.Handlebars=r,n.ComponentLookup=X,n._SimpleHandlebarsView=et,n._HandlebarsBoundView=Z,n._SimpleMetamorphView=tt,n._MetamorphView=rt,n._Metamorph=nt,n.TextSupport=$,n.Checkbox=U,n.Select=q,n.SelectOption=K,n.SelectOptgroup=W,n.TextArea=G,n.TextField=Y,n.TextSupport=$,r.registerHelper("helperMissing",d),r.registerHelper("blockHelperMissing",g),r.registerHelper("bind",w),r.registerHelper("boundIf",x),r.registerHelper("_triageMustache",y),r.registerHelper("unboundIf",C),r.registerHelper("with",E),r.registerHelper("if",O),r.registerHelper("unless",P),r.registerHelper("bind-attr",A),r.registerHelper("bindAttr",T),r.registerHelper("collection",I),r.registerHelper("log",k),r.registerHelper("debugger",D),r.registerHelper("each",L),r.registerHelper("loc",z),r.registerHelper("partial",B),r.registerHelper("template",H),r.registerHelper("yield",F),r.registerHelper("view",V),r.registerHelper("unbound",R),r.registerHelper("input",Q),r.registerHelper("textarea",J),i("Ember.Handlebars",r),t["default"]=r}),e("ember-handlebars/string",["ember-runtime/system/string","exports"],function(){function e(e){return new Handlebars.SafeString(e)}var t=arguments,r=t[t.length-1],n=t[0]["default"];n.htmlSafe=e,(i.EXTEND_PROTOTYPES===!0||i.EXTEND_PROTOTYPES.String)&&(String.prototype.htmlSafe=function(){return e(this)}),r["default"]=e}),e("ember-handlebars/views/handlebars_bound_view",["ember-handlebars-compiler","ember-metal/core","ember-metal/error","ember-metal/property_get","ember-metal/property_set","ember-metal/merge","ember-metal/run_loop","ember-views/views/view","ember-views/views/states","ember-handlebars/views/metamorph_view","ember-handlebars/ext","exports"],function(){function e(e,t,r,n){this.path=e,this.pathRoot=t,this.isEscaped=r,this.templateData=n,this.morph=l(),this.state="preRender",this.updateId=null,this._parentView=null,this.buffer=null}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=i.SafeString,o=r[1]["default"],s=o.K,l=t("metamorph"),u=r[2]["default"],c=r[3].get,h=r[4].set,m=r[5]["default"],f=r[6]["default"],p=(r[7].View,r[8].cloneStates),d=r[8].states,g=d,v=r[9]._MetamorphView,b=r[10].handlebarsGet;e.prototype={isVirtual:!0,isView:!0,destroy:function(){this.updateId&&(f.cancel(this.updateId),this.updateId=null),this._parentView&&this._parentView.removeChild(this),this.morph=null,this.state="destroyed"},propertyWillChange:s,propertyDidChange:s,normalizedValue:function(){var e,t,r=this.path,n=this.pathRoot;return""===r?e=n:(t=this.templateData,e=b(n,r,{data:t})),e},renderToBuffer:function(e){var t="";t+=this.morph.startTag(),t+=this.render(),t+=this.morph.endTag(),e.push(t)},render:function(){var e=this.isEscaped,t=this.normalizedValue();return null===t||void 0===t?t="":t instanceof a||(t=String(t)),e&&(t=Handlebars.Utils.escapeExpression(t)),t},rerender:function(){switch(this.state){case"preRender":case"destroyed":break;case"inBuffer":throw new u("Something you did tried to replace an {{expression}} before it was inserted into the DOM.");case"hasElement":case"inDOM":this.updateId=f.scheduleOnce("render",this,"update")}return this},update:function(){this.updateId=null,this.morph.html(this.render())},transitionTo:function(e){this.state=e}};var d=p(g);m(d._default,{rerenderIfNeeded:s}),m(d.inDOM,{rerenderIfNeeded:function(e){e.normalizedValue()!==e._lastNormalizedValue&&e.rerender()}});var y=v.extend({instrumentName:"boundHandlebars",states:d,shouldDisplayFunc:null,preserveContext:!1,previousContext:null,displayTemplate:null,inverseTemplate:null,path:null,pathRoot:null,normalizedValue:function(){var e,t,r=c(this,"path"),n=c(this,"pathRoot"),i=c(this,"valueNormalizerFunc");return""===r?e=n:(t=c(this,"templateData"),e=b(n,r,{data:t})),i?i(e):e},rerenderIfNeeded:function(){this.currentState.rerenderIfNeeded(this)},render:function(e){var t=c(this,"isEscaped"),r=c(this,"shouldDisplayFunc"),n=c(this,"preserveContext"),i=c(this,"previousContext"),o=c(this,"inverseTemplate"),s=c(this,"displayTemplate"),l=this.normalizedValue();if(this._lastNormalizedValue=l,r(l))if(h(this,"template",s),n)h(this,"_context",i);else{if(!s)return null===l||void 0===l?l="":l instanceof a||(l=String(l)),t&&(l=Handlebars.Utils.escapeExpression(l)),e.push(l),void 0;h(this,"_context",l)}else o?(h(this,"template",o),n?h(this,"_context",i):h(this,"_context",l)):h(this,"template",function(){return""});return this._super(e)}});n._HandlebarsBoundView=y,n.SimpleHandlebarsView=e}),e("ember-handlebars/views/metamorph_view",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-views/views/view","ember-metal/mixin","ember-metal/run_loop","exports"],function(){function e(){s.once(a,"notifyMutationListeners")}var r=arguments,n=r[r.length-1],i=(r[0]["default"],r[1].get,r[2]["default"],r[3].CoreView),a=r[3].View,o=r[4].Mixin,s=r[5]["default"],l=t("metamorph"),u={remove:function(t){t.morph.remove(),e()},prepend:function(t,r){t.morph.prepend(r),e()},after:function(t,r){t.morph.after(r),e()},html:function(t,r){t.morph.html(r),e()},replace:function(t){var r=t.morph;t.transitionTo("preRender"),s.schedule("render",this,function(){if(!t.isDestroying){t.clearRenderedChildren();var n=t.renderToBuffer();t.invokeRecursively(function(e){e.propertyWillChange("element")}),t.triggerRecursively("willInsertElement"),r.replaceWith(n.string()),t.transitionTo("inDOM"),t.invokeRecursively(function(e){e.propertyDidChange("element")}),t.triggerRecursively("didInsertElement"),e()}})},empty:function(t){t.morph.html(""),e()}},c=o.create({isVirtual:!0,tagName:"",instrumentName:"metamorph",init:function(){this._super(),this.morph=l()},beforeRender:function(e){e.push(this.morph.startTag()),e.pushOpeningTag()},afterRender:function(e){e.pushClosingTag(),e.push(this.morph.endTag())},createElement:function(){var e=this.renderToBuffer();this.outerHTML=e.string(),this.clearBuffer()},domManager:u}),h=a.extend(c),m=i.extend(c);n._SimpleMetamorphView=m,n._MetamorphView=h,n._Metamorph=c})}(),function(){e("ember-routing/ext/controller",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/enumerable_utils","ember-runtime/controllers/controller","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get),n=(e[2].set,e[3]["default"]),i=(n.map,e[4].ControllerMixin);i.reopen({transitionToRoute:function(){var e=r(this,"target"),t=e.transitionToRoute||e.transitionTo;return t.apply(e,arguments)},transitionTo:function(){return this.transitionToRoute.apply(this,arguments)},replaceRoute:function(){var e=r(this,"target"),t=e.replaceRoute||e.replaceWith;return t.apply(e,arguments)},replaceWith:function(){return this.replaceRoute.apply(this,arguments)}}),t["default"]=i}),e("ember-routing/ext/run_loop",["ember-metal/run_loop"],function(){{var e=arguments,t=(e[e.length-1],e[0]["default"]);t.queues}t._addQueue("routerTransitions","actions")}),e("ember-routing/ext/view",["ember-metal/property_get","ember-metal/property_set","ember-metal/run_loop","ember-views/views/view","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].get,n=e[1].set,i=e[2]["default"],a=e[3].View;a.reopen({init:function(){n(this,"_outlets",{}),this._super()},connectOutlet:function(e,t){if(this._pendingDisconnections&&delete this._pendingDisconnections[e],this._hasEquivalentView(e,t))return t.destroy(),void 0;var i=r(this,"_outlets"),a=r(this,"container"),o=a&&a.lookup("router:main"),s=r(t,"renderedName");n(i,e,t),o&&s&&o._connectActiveView(s,t)},_hasEquivalentView:function(e,t){var n=r(this,"_outlets."+e);return n&&n.constructor===t.constructor&&n.get("template")===t.get("template")&&n.get("context")===t.get("context")},disconnectOutlet:function(e){this._pendingDisconnections||(this._pendingDisconnections={}),this._pendingDisconnections[e]=!0,i.once(this,"_finishDisconnections")},_finishDisconnections:function(){if(!this.isDestroyed){var e=r(this,"_outlets"),t=this._pendingDisconnections;this._pendingDisconnections=null;for(var i in t)n(e,i,null)}}}),t["default"]=a}),e("ember-routing/helpers/action",["ember-metal/core","ember-metal/property_get","ember-metal/array","ember-metal/run_loop","ember-views/system/utils","ember-handlebars","ember-routing/system/router","ember-handlebars/ext","ember-handlebars/helpers/view","ember-routing/helpers/shared","exports"],function(){function e(e,t){var r=[];t&&r.push(t);var n=e.options.types.slice(1),i=e.options.data;return r.concat(c(e.context,e.params,{types:n,data:i}))}function t(e){var t=arguments[arguments.length-1],r=m.call(arguments,1,-1),n=t.hash,i=t.data.keywords.controller,a={eventName:n.on||"click",parameters:{context:this,options:t,params:r},view:t.data.view,bubbles:n.bubbles,preventDefault:n.preventDefault,target:{options:t},boundProperty:"ID"===t.types[0]};n.target?(a.target.root=this,a.target.target=n.target):i&&(a.target.root=i);var o=f.registerAction(e,a,n.allowedKeys);return new h('data-ember-action="'+o+'"')}var r=arguments,n=r[r.length-1],i=r[0]["default"],a=(r[1].get,r[2].forEach),o=r[3]["default"],s=r[4].isSimpleClick,l=r[5]["default"],l=(r[6]["default"],r[5]["default"]),u=r[7].handlebarsGet,c=(r[8].viewHelper,r[9].resolveParams),h=(r[9].resolvePath,l.SafeString),m=Array.prototype.slice,f={registeredActions:{}},p=["alt","shift","meta","ctrl"],d=/^click|mouse|touch/,g=function(e,t){if("undefined"==typeof t){if(d.test(e.type))return s(e);t=""}if(t.indexOf("any")>=0)return!0;var r=!0;return a.call(p,function(n){e[n+"Key"]&&-1===t.indexOf(n)&&(r=!1)}),r};f.registerAction=function(t,r,n){var a=++i.uuid;return f.registeredActions[a]={eventName:r.eventName,handler:function(i){if(!g(i,n))return!0;r.preventDefault!==!1&&i.preventDefault(),r.bubbles===!1&&i.stopPropagation();var a,s=r.target,l=r.parameters;s=s.target?u(s.root,s.target,s.options):s.root,r.boundProperty&&(a=c(l.context,[t],{types:["ID"],data:l.options.data})[0],("undefined"==typeof a||"function"==typeof a)&&(a=t)),a||(a=t),o(function(){s.send?s.send.apply(s,e(l,a)):s[a].apply(s,e(l))})}},r.view.on("willClearRender",function(){delete f.registeredActions[a]}),a},n.ActionHelper=f,n.actionHelper=t}),e("ember-routing/helpers/link_to",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/merge","ember-metal/run_loop","ember-metal/computed","ember-runtime/system/lazy_load","ember-runtime/system/string","ember-runtime/system/object","ember-runtime/keys","ember-views/system/utils","ember-views/views/view","ember-handlebars","ember-handlebars/helpers/view","ember-routing/system/router","ember-routing/helpers/shared","exports"],function(){function e(e,t){var r=e.parameters,n=u(e,"queryParamsObject"),i={};n&&c(i,n.values);for(var a=u(e,"resolvedParams"),o=u(e,"router"),s=a[0],l=o._queryParamsFor(s),h=l.qps,m={},f=0,p=h.length;p>f;++f){var d,v=h[f],b=null;if(v.prop in i?(d=i[v.prop],b=n.types[v.prop],delete i[v.prop]):v.urlKey in i&&(d=i[v.urlKey],b=n.types[v.urlKey],delete i[v.urlKey]),b){if("ID"===b){var y=g.normalizePath(r.context,d,r.options.data);d=g.get(y.root,y.path,r.options)}d=v.route.serializeQueryParam(d,v.urlKey,v.type)}else d=v.svalue;t&&d===v.sdef||(m[v.urlKey]=d)}return m}function r(t){var r=t.get("routeArgs");return r[r.length-1].queryParams?(r=r.slice(),r[r.length-1]={queryParams:e(t,!0)},r):r}function n(e){var t=e.options.types,r=e.options.data;return y(e.context,e.params,{types:t,data:r})}function i(){var e=_.call(arguments,-1)[0],t=_.call(arguments,0,-1),r=e.hash;if(t[t.length-1]instanceof x&&(r.queryParamsObject=t.pop()),r.disabledBinding=r.disabledWhen,!e.fn){var n=t.shift(),i=e.types.shift(),a=this;"ID"===i?(e.linkTextPath=n,e.fn=function(){return g.getEscaped(a,n,e)}):e.fn=function(){return n}}return r.parameters={context:this,options:e,params:t},v.call(this,C,e)}function a(){return i.apply(this,arguments)}var o=arguments,s=o[o.length-1],l=o[0]["default"],u=o[1].get,c=(o[2].set,o[3]["default"]),h=o[4]["default"],m=o[5].computed,f=(o[6].onLoad,o[7].fmt,o[8]["default"]),p=(o[9]["default"],o[10].isSimpleClick),d=o[11].View,g=o[12]["default"],v=o[13].viewHelper,b=(o[14]["default"],o[15].resolveParams),y=o[15].resolvePaths,_=[].slice;t("ember-handlebars");var w=function(e,t){for(var r=0,n=0,i=t.length;i>n&&(r+=t[n].names.length,t[n].handler!==e);n++);return r},x=f.extend({values:null}),C=l.LinkView=d.extend({tagName:"a",currentWhen:null,title:null,rel:null,activeClass:"active",loadingClass:"loading",disabledClass:"disabled",_isDisabled:!1,replace:!1,attributeBindings:["href","title","rel"],classNameBindings:["active","loading","disabled"],eventName:"click",init:function(){this._super.apply(this,arguments);var e=u(this,"eventName");this.on(e,this,this._invoke)},_paramsChanged:function(){this.notifyPropertyChange("resolvedParams")},_setupPathObservers:function(){var e,t,r,i=this.parameters,a=i.options.linkTextPath,o=n(i),s=o.length;for(a&&(r=g.normalizePath(i.context,a,i.options.data),this.registerObserver(r.root,r.path,this,this.rerender)),t=0;s>t;t++)e=o[t],null!==e&&(r=g.normalizePath(i.context,e,i.options.data),this.registerObserver(r.root,r.path,this,this._paramsChanged));var l=this.queryParamsObject;if(l){var u=l.values;for(var c in u)u.hasOwnProperty(c)&&"ID"===l.types[c]&&(r=g.normalizePath(i.context,u[c],i.options.data),this.registerObserver(r.root,r.path,this,this._paramsChanged))}},afterRender:function(){this._super.apply(this,arguments),this._setupPathObservers()},concreteView:m(function(){return u(this,"parentView")}).property("parentView"),disabled:m(function(e,t){return void 0!==t&&this.set("_isDisabled",t),t?u(this,"disabledClass"):!1}),active:m(function(){if(u(this,"loading"))return!1;var e=u(this,"router"),t=u(this,"routeArgs"),r=t.slice(1),n=(u(this,"resolvedParams"),this.currentWhen||t[0]),i=w(n,e.router.recognizer.handlersFor(n));r.length>i&&(n=t[0]);var a=e.isActive.apply(e,[n].concat(r));return a?u(this,"activeClass"):void 0}).property("resolvedParams","routeArgs"),loading:m(function(){return u(this,"routeArgs")?void 0:u(this,"loadingClass")}).property("routeArgs"),router:m(function(){return u(this,"controller").container.lookup("router:main")}),_invoke:function(e){if(!p(e))return!0;if(this.preventDefault!==!1&&e.preventDefault(),this.bubbles===!1&&e.stopPropagation(),u(this,"_isDisabled"))return!1;if(u(this,"loading"))return l.Logger.warn("This link-to is in an inactive loading state because at least one of its parameters presently has a null/undefined value, or the provided route name is invalid."),!1;var t,n=u(this,"router"),i=u(this,"routeArgs");t=u(this,"replace")?n.replaceWith.apply(n,i):n.transitionTo.apply(n,i);var a=n.router.generate.apply(n.router,r(this));h.scheduleOnce("routerTransitions",this,this._eagerUpdateUrl,t,a)},_eagerUpdateUrl:function(e,t){if(e.isActive&&e.urlMethod){0===t.indexOf("#")&&(t=t.slice(1));var r=u(this,"router.router");"update"===e.urlMethod?r.updateURL(t):"replace"===e.urlMethod&&r.replaceURL(t),e.method(null)}},resolvedParams:m(function(){var e=this.parameters,t=e.options,r=t.types,n=t.data;if(0===e.params.length){var i=this.container.lookup("controller:application");return[u(i,"currentRouteName")]}return b(e.context,e.params,{types:r,data:n})}).property("router.url"),routeArgs:m(function(){var e=u(this,"resolvedParams").slice(0),t=u(this,"router"),r=e[0];if(r){var n=t.router.recognizer.handlersFor(r),i=n[n.length-1].handler;r!==i&&(this.currentWhen||this.set("currentWhen",r),r=n[n.length-1].handler,e[0]=r);for(var a=1,o=e.length;o>a;++a){var s=e[a];if(null===s||"undefined"==typeof s)return}return e}}).property("resolvedParams","queryParams"),queryParamsObject:null,queryParams:m(function(){return e(this,!1)}).property("resolvedParams.[]"),href:m(function(){if("a"===u(this,"tagName")){var e=u(this,"router"),t=u(this,"routeArgs");return t?e.generate.apply(e,t):u(this,"loadingHref")}}).property("routeArgs"),loadingHref:"#"});C.toString=function(){return"LinkView"},s.LinkView=C,s.deprecatedLinkToHelper=a,s.linkToHelper=i}),e("ember-routing/helpers/outlet",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-runtime/system/lazy_load","ember-views/views/container_view","ember-handlebars/views/metamorph_view","ember-handlebars/helpers/view","exports"],function(){function e(e,t){var r,n,i,s,l;for(e&&e.data&&e.data.isRenderData&&(t=e,e="main"),n=t.data.view.container,r=t.data.view;!r.get("template.isTop");)r=r.get("_parentView");return i=t.hash.view,i&&(l="view:"+i),s=i?n.lookupFactory(l):t.hash.viewClass||o,t.data.view.set("outletSource",r),t.hash.currentViewBinding="_view.outletSource._outlets."+e,a.call(this,s,t)}var t=arguments,r=t[t.length-1],n=(t[0]["default"],t[1].get,t[2].set,t[3].onLoad,t[4]["default"]),i=t[5]._Metamorph,a=t[6].viewHelper,o=n.extend(i);r.outletHelper=e,r.OutletView=o}),e("ember-routing/helpers/render",["ember-metal/core","ember-metal/error","ember-metal/property_get","ember-metal/property_set","ember-runtime/system/string","ember-routing/system/controller_for","ember-handlebars/ext","ember-handlebars/helpers/view","exports"],function(){function e(e,t,r){var u,c,h,m,f,p=arguments.length;if(u=(r||t).data.keywords.controller.container,c=u.lookup("router:main"),2===p)r=t,t=void 0;else{if(3!==p)throw n("You must pass a templateName to render");f=s(r.contexts[1],t,r)}e=e.replace(/\//g,"."),m=u.lookup("view:"+e)||u.lookup("view:default");var d=r.hash.controller||e,g="controller:"+d;r.hash.controller;var v=r.data.keywords.controller;if(p>2){var b=u.lookupFactory(g)||a(u,d,f);h=b.create({model:f,parentController:v,target:v}),m.one("willDestroyElement",function(){h.destroy()})}else h=u.lookup(g)||o(u,d),h.setProperties({target:v,parentController:v});var y=r.contexts[1];y&&m.registerObserver(y,t,function(){h.set("model",s(y,t,r))}),r.hash.viewName=i(e);var _="template:"+e;r.hash.template=u.lookup(_),r.hash.controller=h,c&&!f&&c._connectActiveView(e,m),l.call(this,m,r)}var t=arguments,r=t[t.length-1],n=(t[0]["default"],t[1]["default"]),i=(t[2].get,t[3].set,t[4].camelize),a=t[5].generateControllerFactory,o=t[5].generateController,s=t[6].handlebarsGet,l=t[7].viewHelper;r["default"]=e}),e("ember-routing/helpers/shared",["ember-metal/property_get","ember-metal/array","ember-runtime/system/lazy_load","ember-runtime/controllers/controller","ember-routing/system/router","ember-handlebars/ext","exports"],function(){function e(e,r,n){return a.call(t(e,r,n),function(t,i){return null===t?r[i]:l(e,t,n)})}function t(e,t,r){function n(e,t){return"controller"===t?t:o.detect(e)?n(i(e,"model"),t?t+".model":"model"):t}var l=s(e,t,r),u=r.types;return a.call(l,function(e,r){return"ID"===u[r]?n(e,t[r]):null})}var r=arguments,n=r[r.length-1],i=r[0].get,a=r[1].map,o=(r[2].onLoad,r[3].ControllerMixin),s=(r[4]["default"],r[5].resolveParams),l=r[5].handlebarsGet;n.resolveParams=e,n.resolvePaths=t}),e("ember-routing/location/api",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get,e[2].set,{create:function(e){var t=e&&e.implementation,r=this.implementations[t];return r.create.apply(r,arguments)},registerImplementation:function(e,t){this.implementations[e]=t},implementations:{},_location:window.location,_getHash:function(){var e=(this._location||this.location).href,t=e.indexOf("#");return-1===t?"":e.substr(t)}});t["default"]=r}),e("ember-routing/location/auto_location",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-routing/location/api","ember-routing/location/history_location","ember-routing/location/hash_location","ember-routing/location/none_location","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get,e[2].set),n=e[3]["default"],i=e[4]["default"],a=e[5]["default"],o=e[6]["default"],s={cancelRouterSetup:!1,rootURL:"/",_window:window,_location:window.location,_history:window.history,_HistoryLocation:i,_HashLocation:a,_NoneLocation:o,_getOrigin:function(){var e=this._location,t=e.origin;return t||(t=e.protocol+"//"+e.hostname,e.port&&(t+=":"+e.port)),t},_getSupportsHistory:function(){var e=this._window.navigator.userAgent;return-1!==e.indexOf("Android 2")&&-1!==e.indexOf("Mobile Safari")&&-1===e.indexOf("Chrome")?!1:!!(this._history&&"pushState"in this._history)},_getSupportsHashChange:function(){var e=this._window,t=e.document.documentMode;return"onhashchange"in e&&(void 0===t||t>7)},_replacePath:function(e){this._location.replace(this._getOrigin()+e)},_getRootURL:function(){return this.rootURL},_getPath:function(){var e=this._location.pathname;return"/"!==e.charAt(0)&&(e="/"+e),e},_getHash:n._getHash,_getQuery:function(){return this._location.search},_getFullPath:function(){return this._getPath()+this._getQuery()+this._getHash()},_getHistoryPath:function(){{var e,t,r=this._getRootURL(),n=this._getPath(),i=this._getHash(),a=this._getQuery();n.indexOf(r)}return"#/"===i.substr(0,2)?(t=i.substr(1).split("#"),e=t.shift(),"/"===n.slice(-1)&&(e=e.substr(1)),n+=e,n+=a,t.length&&(n+="#"+t.join("#"))):(n+=a,n+=i),n},_getHashPath:function(){var e=this._getRootURL(),t=e,r=this._getHistoryPath(),n=r.substr(e.length);return""!==n&&("/"!==n.charAt(0)&&(n="/"+n),t+="#"+n),t},create:function(e){e&&e.rootURL&&(this.rootURL=e.rootURL);var t,n,i=!1,a=this._NoneLocation,o=this._getFullPath();this._getSupportsHistory()?(t=this._getHistoryPath(),o===t?a=this._HistoryLocation:(i=!0,this._replacePath(t))):this._getSupportsHashChange()&&(n=this._getHashPath(),o===n||"/"===o&&"/#/"===n?a=this._HashLocation:(i=!0,this._replacePath(n)));var s=a.create.apply(a,arguments);return i&&r(s,"cancelRouterSetup",!0),s}};t["default"]=s}),e("ember-routing/location/hash_location",["ember-metal/property_get","ember-metal/property_set","ember-metal/run_loop","ember-metal/utils","ember-runtime/system/object","ember-routing/location/api","ember-views/system/jquery","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].get,n=e[1].set,i=e[2]["default"],a=e[3].guidFor,o=e[4]["default"],s=e[5]["default"],l=e[6]["default"],u=o.extend({implementation:"hash",init:function(){n(this,"location",r(this,"_location")||window.location)},getHash:s._getHash,getURL:function(){return this.getHash().substr(1)},setURL:function(e){r(this,"location").hash=e,n(this,"lastSetURL",e)},replaceURL:function(e){r(this,"location").replace("#"+e),n(this,"lastSetURL",e)},onUpdateURL:function(e){var t=this,o=a(this);l(window).on("hashchange.ember-location-"+o,function(){i(function(){var i=t.getURL();r(t,"lastSetURL")!==i&&(n(t,"lastSetURL",null),e(i))})})},formatURL:function(e){return"#"+e},willDestroy:function(){var e=a(this);l(window).off("hashchange.ember-location-"+e)}});t["default"]=u}),e("ember-routing/location/history_location",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/utils","ember-runtime/system/object","ember-views/system/jquery","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get),n=e[2].set,i=e[3].guidFor,a=e[4]["default"],o=e[5]["default"],s=!1,l=window.history&&"state"in window.history,u=a.extend({implementation:"history",init:function(){n(this,"location",r(this,"location")||window.location),n(this,"baseURL",o("base").attr("href")||"")},initState:function(){n(this,"history",r(this,"history")||window.history),this.replaceState(this.formatURL(this.getURL()))},rootURL:"/",getURL:function(){var e=r(this,"rootURL"),t=r(this,"location"),n=t.pathname,i=r(this,"baseURL");e=e.replace(/\/$/,""),i=i.replace(/\/$/,"");var a=n.replace(i,"").replace(e,"");return a},setURL:function(e){var t=this.getState();e=this.formatURL(e),t&&t.path===e||this.pushState(e)},replaceURL:function(e){var t=this.getState();
e=this.formatURL(e),t&&t.path===e||this.replaceState(e)},getState:function(){return l?r(this,"history").state:this._historyState},pushState:function(e){var t={path:e};r(this,"history").pushState(t,null,e),l||(this._historyState=t),this._previousURL=this.getURL()},replaceState:function(e){var t={path:e};r(this,"history").replaceState(t,null,e),l||(this._historyState=t),this._previousURL=this.getURL()},onUpdateURL:function(e){var t=i(this),r=this;o(window).on("popstate.ember-location-"+t,function(){(s||(s=!0,r.getURL()!==r._previousURL))&&e(r.getURL())})},formatURL:function(e){var t=r(this,"rootURL"),n=r(this,"baseURL");return""!==e?(t=t.replace(/\/$/,""),n=n.replace(/\/$/,"")):n.match(/^\//)&&t.match(/^\//)&&(n=n.replace(/\/$/,"")),n+t+e},willDestroy:function(){var e=i(this);o(window).off("popstate.ember-location-"+e)}});t["default"]=u}),e("ember-routing/location/none_location",["ember-metal/property_get","ember-metal/property_set","ember-runtime/system/object","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0].get,n=e[1].set,i=e[2]["default"],a=i.extend({implementation:"none",path:"",getURL:function(){return r(this,"path")},setURL:function(e){n(this,"path",e)},onUpdateURL:function(e){this.updateCallback=e},handleURL:function(e){n(this,"path",e),this.updateCallback(e)},formatURL:function(e){return e}});t["default"]=a}),e("ember-routing",["ember-handlebars","ember-metal/core","ember-routing/ext/run_loop","ember-routing/ext/controller","ember-routing/ext/view","ember-routing/helpers/shared","ember-routing/helpers/link_to","ember-routing/location/api","ember-routing/location/none_location","ember-routing/location/hash_location","ember-routing/location/history_location","ember-routing/location/auto_location","ember-routing/system/controller_for","ember-routing/system/dsl","ember-routing/system/router","ember-routing/system/route","ember-routing/helpers/outlet","ember-routing/helpers/render","ember-routing/helpers/action","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],i=e[5].resolvePaths,a=e[5].resolveParams,o=e[6].deprecatedLinkToHelper,s=e[6].linkToHelper,l=e[6].LinkView,u=e[7]["default"],c=e[8]["default"],h=e[9]["default"],m=e[10]["default"],f=e[11]["default"],p=e[12].controllerFor,d=e[12].generateControllerFactory,g=e[12].generateController,v=e[13]["default"],b=e[14]["default"],y=e[15]["default"],_=e[16].outletHelper,w=e[16].OutletView,x=e[17]["default"],C=e[18].ActionHelper,E=e[18].actionHelper;n.Location=u,n.AutoLocation=f,n.HashLocation=h,n.HistoryLocation=m,n.NoneLocation=c,n.controllerFor=p,n.generateControllerFactory=d,n.generateController=g,n.RouterDSL=v,n.Router=b,n.Route=y,n.LinkView=l,b.resolveParams=a,b.resolvePaths=i,r.ActionHelper=C,r.OutletView=w,r.registerHelper("render",x),r.registerHelper("action",E),r.registerHelper("outlet",_),r.registerHelper("link-to",s),r.registerHelper("linkTo",o),t["default"]=n}),e("ember-routing/system/controller_for",["ember-metal/core","ember-metal/property_get","ember-metal/utils","exports"],function(){var e=arguments,t=e[e.length-1],r=(e[0]["default"],e[1].get),n=e[2].isArray,i=function(e,t,r){return e.lookup("controller:"+t,r)},a=function(e,t,r){var i,a,o,s;return s=r&&n(r)?"array":r?"object":"basic",o="controller:"+s,i=e.lookupFactory(o).extend({isGenerated:!0,toString:function(){return"(generated "+t+" controller)"}}),a="controller:"+t,e.register(a,i),i},o=function(e,t,n){a(e,t,n);var i="controller:"+t,o=e.lookup(i);return r(o,"namespace.LOG_ACTIVE_GENERATION"),o};t.controllerFor=i,t.generateControllerFactory=a,t.generateController=o}),e("ember-routing/system/dsl",["ember-metal/core","exports"],function(){function e(e){this.parent=e,this.matches=[]}function t(e,t,r){r=r||{},"string"!=typeof r.path&&(r.path="/"+t),e.parent&&"application"!==e.parent&&(t=e.parent+"."+t),e.push(r.path,t,null)}{var r=arguments,n=r[r.length-1];r[0]["default"]}e.prototype={resource:function(r,n,i){if(2===arguments.length&&"function"==typeof n&&(i=n,n={}),1===arguments.length&&(n={}),"string"!=typeof n.path&&(n.path="/"+r),i){var a=new e(r);t(a,"loading"),t(a,"error",{path:"/_unused_dummy_error_path_route_"+r+"/:error"}),i.call(a),this.push(n.path,r,a.generate())}else this.push(n.path,r,null)},push:function(e,t,r){var n=t.split(".");(""===e||"/"===e||"index"===n[n.length-1])&&(this.explicitIndex=!0),this.matches.push([e,t,r])},route:function(e,r){t(this,e,r)},generate:function(){var e=this.matches;return this.explicitIndex||this.route("index",{path:"/"}),function(t){for(var r=0,n=e.length;n>r;r++){var i=e[r];t(i[0]).to(i[1],i[2])}}}},e.map=function(t){var r=new e;return t.call(r),r},n["default"]=e}),e("ember-routing/system/route",["ember-metal/core","ember-metal/error","ember-metal/property_get","ember-metal/property_set","ember-metal/get_properties","ember-metal/enumerable_utils","ember-metal/is_none","ember-metal/computed","ember-metal/utils","ember-metal/run_loop","ember-runtime/keys","ember-runtime/copy","ember-runtime/system/string","ember-runtime/system/object","ember-runtime/mixins/action_handler","ember-routing/system/controller_for","exports"],function(){function e(e){var t=e.router.router.state.handlerInfos;if(t)for(var r,n,i=0,a=t.length;a>i;i++){if(n=t[i].handler,n===e)return r;r=n}}function t(r){var n,i=e(r);if(i)return(n=i.lastRenderedTemplate)?n:t(i)}function r(e,r,n,i){i=i||{},i.into=i.into?i.into.replace(/\//g,"."):t(e),i.outlet=i.outlet||"main",i.name=r,i.template=n,i.LOG_VIEW_LOOKUPS=h(e.router,"namespace.LOG_VIEW_LOOKUPS");var a,o=i.controller,s=i.model;if(o=i.controller?i.controller:(a=e.container.lookup("controller:"+r))?a:e.controllerName||e.routeName,"string"==typeof o){var l=o;if(o=e.container.lookup("controller:"+l),!o)throw new c("You passed `controller: '"+l+"'` into the `render` method, but no such controller could be found.")}return s&&o.set("model",s),i.controller=o,i}function n(e,t,r){if(e)r.LOG_VIEW_LOOKUPS;else{var n=r.into?"view:default":"view:toplevel";e=t.lookup(n),r.LOG_VIEW_LOOKUPS}return h(e,"templateName")||(m(e,"template",r.template),m(e,"_debugTemplateName",r.name)),m(e,"renderedName",r.name),m(e,"controller",r.controller),e}function i(e,t,r){if(r.into){var n=e.router._lookupActiveView(r.into),i=o(n,r.outlet);e.teardownOutletViews||(e.teardownOutletViews=[]),w(e.teardownOutletViews,0,0,[i]),n.connectOutlet(r.outlet,t)}else{var s=h(e,"router.namespace.rootElement");e.teardownTopLevelView&&e.teardownTopLevelView(),e.router._connectActiveView(r.name,t),e.teardownTopLevelView=a(t),t.appendTo(s)}}function a(e){return function(){e.destroy()}}function o(e,t){return function(){e.disconnectOutlet(t)}}var s=arguments,l=s[s.length-1],u=s[0]["default"],c=s[1]["default"],h=s[2].get,m=s[3].set,f=s[4]["default"],p=s[5]["default"],d=(s[6].isNone,s[7].computed),g=(s[8].typeOf,s[9]["default"],s[10]["default"],s[11]["default"]),v=(s[12].classify,s[12].fmt,s[13]["default"]),b=s[14]["default"],y=s[15].generateController,_=p.forEach,w=p.replace,x=v.extend(b,{exit:function(){this.deactivate(),this.teardownViews()},enter:function(){this.activate()},viewName:null,templateName:null,controllerName:null,_actions:{queryParamsDidChange:function(){},finalizeQueryParamChange:function(){}},events:null,mergedProperties:["events"],deactivate:u.K,activate:u.K,transitionTo:function(){var e=this.router;return e.transitionTo.apply(e,arguments)},intermediateTransitionTo:function(){var e=this.router;e.intermediateTransitionTo.apply(e,arguments)},refresh:function(){return this.router.router.refresh(this)},replaceWith:function(){var e=this.router;return e.replaceWith.apply(e,arguments)},send:function(){return this.router.send.apply(this.router,arguments)},setup:function(e){var t=this.controllerName||this.routeName,r=this.controllerFor(t,!0);r||(r=this.generateController(t,e)),this.controller=r,this.setupControllers?this.setupControllers(r,e):this.setupController(r,e),this.renderTemplates?this.renderTemplates(e):this.renderTemplate(r,e)},beforeModel:u.K,afterModel:u.K,redirect:u.K,contextDidChange:function(){this.currentModel=this.context},model:function(e,t){var r,n,i,a;for(var o in e)"queryParams"!==o&&((r=o.match(/^(.*)_id$/))&&(n=r[1],a=e[o]),i=!0);if(!n&&i)return g(e);if(!n){if(t.resolveIndex!==t.state.handlerInfos.length-1)return;var s=t.state.handlerInfos[t.resolveIndex-1].context;return s}return this.findModel(n,a)},deserialize:function(e,t){return this.model(e,t)},findModel:function(){var e=h(this,"store");return e.find.apply(e,arguments)},store:d(function(){{var e=this.container;this.routeName,h(this,"router.namespace")}return{find:function(t,r){var n=e.lookupFactory("model:"+t);if(n)return n.find(r)}}}),serialize:function(e,t){if(!(t.length<1)&&e){var r=t[0],n={};return/_id$/.test(r)&&1===t.length?n[r]=h(e,"id"):n=f(e,t),n}},setupController:function(e,t){e&&void 0!==t&&m(e,"model",t)},controllerFor:function(e){var t,r=this.container,n=r.lookup("route:"+e);return n&&n.controllerName&&(e=n.controllerName),t=r.lookup("controller:"+e)},generateController:function(e,t){var r=this.container;return t=t||this.modelFor(e),y(r,e,t)},modelFor:function(e){var t=this.container.lookup("route:"+e),r=this.router.router.activeTransition;if(r){var n=t&&t.routeName||e;if(r.resolvedModels.hasOwnProperty(n))return r.resolvedModels[n]}return t&&t.currentModel},renderTemplate:function(){this.render()},render:function(e,t){var a="string"==typeof e&&!!e;"object"!=typeof e||t||(t=e,e=this.routeName),t=t||{};var o;e?(e=e.replace(/\//g,"."),o=e):(e=this.routeName,o=this.templateName||e);var s=t.view||a&&e||this.viewName||e,l=this.container,u=l.lookup("view:"+s),c=u?u.get("template"):null;return c||(c=l.lookup("template:"+o)),u||c?(t=r(this,e,c,t),u=n(u,l,t),"main"===t.outlet&&(this.lastRenderedTemplate=e),i(this,u,t),void 0):(h(this.router,"namespace.LOG_VIEW_LOOKUPS"),void 0)},disconnectOutlet:function(e){if(!e||"string"==typeof e){var r=e;e={},e.outlet=r}e.parentView=e.parentView?e.parentView.replace(/\//g,"."):t(this),e.outlet=e.outlet||"main";var n=this.router._lookupActiveView(e.parentView);n&&n.disconnectOutlet(e.outlet)},willDestroy:function(){this.teardownViews()},teardownViews:function(){this.teardownTopLevelView&&this.teardownTopLevelView();var e=this.teardownOutletViews||[];_(e,function(e){e()}),delete this.teardownTopLevelView,delete this.teardownOutletViews,delete this.lastRenderedTemplate}});l["default"]=x}),e("ember-routing/system/router",["ember-metal/core","ember-metal/error","ember-metal/property_get","ember-metal/property_set","ember-metal/array","ember-metal/properties","ember-metal/computed","ember-metal/merge","ember-metal/run_loop","ember-metal/enumerable_utils","ember-runtime/system/string","ember-runtime/system/object","ember-runtime/mixins/evented","ember-routing/system/dsl","ember-views/views/view","ember-routing/location/api","ember-handlebars/views/metamorph_view","exports"],function(){function e(e,t,r){for(var n=t.state.handlerInfos,i=!1,a=n.length-1;a>=0;--a){var o=n[a],s=o.handler;if(i){if(r(s,n[a+1].handler)!==!0)return!1}else e===s&&(i=!0)}return!0}function r(e,t,r){var i,a=e.router,o=(t.routeName.split(".").pop(),"application"===e.routeName?"":e.routeName+".");return i=o+r,n(a,i)?i:void 0}function n(e,t){var r=e.container;return e.hasRoute(t)&&(r.has("template:"+t)||r.has("route:"+t))}function i(e,t,r){var n=r.shift();if(!e){if(t)return;throw new u("Can't trigger action '"+n+"' because your app hasn't finished transitioning into its first route. To trigger an action on destination routes during a transition, you can call `.send()` on the `Transition` object passed to the `model/beforeModel/afterModel` hooks.")}for(var i=!1,a=e.length-1;a>=0;a--){var o=e[a],s=o.handler;if(s._actions&&s._actions[n]){if(s._actions[n].apply(s,r)!==!0)return;i=!0}}if(A[n])return A[n].apply(null,r),void 0;if(!i&&!t)throw new u("Nothing handled the action '"+n+"'. If you did handle the action, this error can be caused by returning true from an action handler in a controller, causing the action to bubble.")}function a(e){var t=e.container.lookup("controller:application");if(t){var r=e.router.currentHandlerInfos,n=P._routePath(r);"currentPath"in t||m(t,"currentPath"),h(t,"currentPath",n),"currentRouteName"in t||m(t,"currentRouteName"),h(t,"currentRouteName",r[r.length-1].name)}}var o=arguments,s=o[o.length-1],l=o[0]["default"],u=o[1]["default"],c=o[2].get,h=o[3].set,m=(o[4].forEach,o[5].defineProperty),f=o[6].computed,p=o[7]["default"],d=o[8]["default"],g=o[9]["default"],v=(o[10].fmt,o[11]["default"]),b=o[12]["default"],y=o[13]["default"],_=o[14].View,w=o[15]["default"],x=o[16]._MetamorphView,C=t("router")["default"],E=(t("router/transition").Transition,[].slice),O=(g.forEach,x),P=v.extend(b,{location:"hash",rootURL:"/",init:function(){this.router=this.constructor.router||this.constructor.map(l.K),this._activeViews={},this._setupLocation(),this._qpCache={},this._queuedQPChanges={},c(this,"namespace.LOG_TRANSITIONS_INTERNAL")&&(this.router.log=l.Logger.debug)},url:f(function(){return c(this,"location").getURL()}),startRouting:function(){this.router=this.router||this.constructor.map(l.K);var e=this.router,t=c(this,"location"),r=this.container,n=this,i=c(this,"initialURL");c(t,"cancelRouterSetup")||(this._setupRouter(e,t),r.register("view:default",O),r.register("view:toplevel",_.extend()),t.onUpdateURL(function(e){n.handleURL(e)}),"undefined"==typeof i&&(i=t.getURL()),this.handleURL(i))},didTransition:function(e){a(this),this._cancelLoadingEvent(),this.notifyPropertyChange("url"),d.once(this,this.trigger,"didTransition"),c(this,"namespace").LOG_TRANSITIONS&&l.Logger.log("Transitioned into '"+P._routePath(e)+"'")},handleURL:function(e){return this._doTransition("handleURL",[e])},transitionTo:function(){return this._doTransition("transitionTo",arguments)},intermediateTransitionTo:function(){this.router.intermediateTransitionTo.apply(this.router,arguments),a(this);var e=this.router.currentHandlerInfos;c(this,"namespace").LOG_TRANSITIONS&&l.Logger.log("Intermediate-transitioned into '"+P._routePath(e)+"'")},replaceWith:function(){return this._doTransition("replaceWith",arguments)},generate:function(){var e=this.router.generate.apply(this.router,arguments);return this.location.formatURL(e)},isActive:function(){var e=this.router;return e.isActive.apply(e,arguments)},send:function(){this.router.trigger.apply(this.router,arguments)},hasRoute:function(e){return this.router.hasRoute(e)},reset:function(){this.router.reset()},_lookupActiveView:function(e){var t=this._activeViews[e];return t&&t[0]},_connectActiveView:function(e,t){function r(){delete this._activeViews[e]}var n=this._activeViews[e];n&&n[0].off("willDestroyElement",this,n[1]),this._activeViews[e]=[t,r],t.one("willDestroyElement",this,r)},_setupLocation:function(){var e=c(this,"location"),t=c(this,"rootURL");if(t&&!this.container.has("-location-setting:root-url")&&this.container.register("-location-setting:root-url",t,{instantiate:!1}),"string"==typeof e&&this.container){var r=this.container.lookup("location:"+e);if("undefined"!=typeof r)e=h(this,"location",r);else{var n={implementation:e};e=h(this,"location",w.create(n))}}t&&"string"==typeof t&&(e.rootURL=t),"function"==typeof e.initState&&e.initState()},_getHandlerFunction:function(){var e={},t=this.container,r=t.lookupFactory("route:basic"),n=this;return function(i){var a="route:"+i,o=t.lookup(a);return e[i]?o:(e[i]=!0,o||(t.register(a,r.extend()),o=t.lookup(a),c(n,"namespace.LOG_ACTIVE_GENERATION")),o.routeName=i,o)}},_setupRouter:function(e,t){var r,n=this;e.getHandler=this._getHandlerFunction();var i=function(){t.setURL(r)};if(e.updateURL=function(e){r=e,d.once(i)},t.replaceURL){var a=function(){t.replaceURL(r)};e.replaceURL=function(e){r=e,d.once(a)}}e.didTransition=function(e){n.didTransition(e)}},_doTransition:function(e,t){t=E.call(t),t[0]=t[0]||"/";var r,n=t[0],i=!1;if(!i&&"/"!==n.charAt(0),r){if(!n){var a=this.router.activeTransition?this.router.activeTransition.state.handlerInfos:this.router.state.handlerInfos;n=a[a.length-1].name,t.unshift(n)}var o=this._queryParamsFor(n),s=(o.qps,{});for(var l in r)if(r.hasOwnProperty(l)){var c=r[l],h=o.map[l];if(!h)throw new u("Unrecognized query param "+l+" provided as transition argument");s[h.urlKey]=h.route.serializeQueryParam(c,h.urlKey,h.type)}t[t.length-1].queryParams=s}var m=this.router[e].apply(this.router,t);return m.then(null,function(e){e&&"UnrecognizedURLError"===e.name},"Ember: Check for Router unrecognized URL error"),m},_queryParamsFor:function(e){if(this._qpCache[e])return this._qpCache[e];for(var t={},r=[],n=(this._qpCache[e]={map:t,qps:r},this.router),i=n.recognizer.handlersFor(e),a=0,o=i.length;o>a;++a){var s=i[a],l=n.getHandler(s.handler),u=c(l,"_qp");u&&(p(t,u.map),r.push.apply(r,u.qps))}return{qps:r,map:t}},_scheduleLoadingEvent:function(e,t){this._cancelLoadingEvent(),this._loadingStateTimer=d.scheduleOnce("routerTransitions",this,"_fireLoadingEvent",e,t)},_fireLoadingEvent:function(e,t){this.router.activeTransition&&e.trigger(!0,"loading",e,t)},_cancelLoadingEvent:function(){this._loadingStateTimer&&d.cancel(this._loadingStateTimer),this._loadingStateTimer=null}}),A={willResolveModel:function(e,t){t.router._scheduleLoadingEvent(e,t)},error:function(t,i,a){var o=a.router,s=e(a,i,function(e,n){var i=r(e,n,"error");return i?(o.intermediateTransitionTo(i,t),void 0):!0});if(s){if(n(a.router,"application_error"))return o.intermediateTransitionTo("application_error",t),void 0;var u=["Error while loading route: "+i.targetName];t&&(t.message&&u.push(t.message),t.stack&&u.push(t.stack),"string"==typeof t&&u.push(t)),l.Logger.error.apply(this,u)}},loading:function(t,i){var a=i.router,o=e(i,t,function(e,n){var i=r(e,n,"loading");return i?(a.intermediateTransitionTo(i),void 0):t.pivotHandler!==e?!0:void 0});return o&&n(i.router,"application_loading")?(a.intermediateTransitionTo("application_loading"),void 0):void 0}};P.reopenClass({router:null,map:function(e){var t=this.router;t||(t=new C,t.callbacks=[],t.triggerEvent=i,this.reopenClass({router:t}));var r=y.map(function(){this.resource("application",{path:"/"},function(){for(var r=0;r<t.callbacks.length;r++)t.callbacks[r].call(this);e.call(this)})});return t.callbacks.push(e),t.map(r.generate()),t},_routePath:function(e){function t(e,t){for(var r=0,n=e.length;n>r;++r)if(e[r]!==t[r])return!1;return!0}for(var r=[],n=1,i=e.length;i>n;n++){for(var a=e[n].name,o=a.split("."),s=E.call(r);s.length&&!t(s,o);)s.shift();r.push.apply(r,o.slice(s.length))}return r.join(".")}}),s["default"]=P}),e("route-recognizer",["exports"],function(){function e(e){return"[object Array]"===Object.prototype.toString.call(e)}function t(e){this.string=e}function r(e){this.name=e}function n(e){this.name=e}function i(){}function a(e,a,o){"/"===e.charAt(0)&&(e=e.substr(1));for(var s=e.split("/"),l=[],u=0,c=s.length;c>u;u++){var h,m=s[u];(h=m.match(/^:([^\/]+)$/))?(l.push(new r(h[1])),a.push(h[1]),o.dynamics++):(h=m.match(/^\*([^\/]+)$/))?(l.push(new n(h[1])),a.push(h[1]),o.stars++):""===m?l.push(new i):(l.push(new t(m)),o.statics++)}return l}function o(e){this.charSpec=e,this.nextStates=[]}function s(e){return e.sort(function(e,t){if(e.types.stars!==t.types.stars)return e.types.stars-t.types.stars;if(e.types.stars){if(e.types.statics!==t.types.statics)return t.types.statics-e.types.statics;if(e.types.dynamics!==t.types.dynamics)return t.types.dynamics-e.types.dynamics}return e.types.dynamics!==t.types.dynamics?e.types.dynamics-t.types.dynamics:e.types.statics!==t.types.statics?t.types.statics-e.types.statics:0})}function l(e,t){for(var r=[],n=0,i=e.length;i>n;n++){var a=e[n];r=r.concat(a.match(t))}return r}function u(e){this.queryParams=e||{}}function c(e,t,r){for(var n=e.handlers,i=e.regex,a=t.match(i),o=1,s=new u(r),l=0,c=n.length;c>l;l++){for(var h=n[l],m=h.names,f={},p=0,d=m.length;d>p;p++)f[m[p]]=a[o++];s.push({handler:h.handler,params:f,isDynamic:!!m.length})}return s}function h(e,t){return t.eachChar(function(t){e=e.put(t)}),e}function m(e,t,r){this.path=e,this.matcher=t,this.delegate=r}function f(e){this.routes={},this.children={},this.target=e}function p(e,t,r){return function(n,i){var a=e+n;return i?(i(p(a,t,r)),void 0):new m(e+n,t,r)}}function d(e,t,r){for(var n=0,i=0,a=e.length;a>i;i++)n+=e[i].path.length;t=t.substr(n);var o={path:t,handler:r};e.push(o)}function g(e,t,r,n){var i=t.routes;for(var a in i)if(i.hasOwnProperty(a)){var o=e.slice();d(o,a,i[a]),t.children[a]?g(o,t.children[a],r,n):r.call(n,o)}}var v=arguments,b=v[v.length-1],y=["/",".","*","+","?","|","(",")","[","]","{","}","\\"],_=new RegExp("(\\"+y.join("|\\")+")","g");t.prototype={eachChar:function(e){for(var t,r=this.string,n=0,i=r.length;i>n;n++)t=r.charAt(n),e({validChars:t})},regex:function(){return this.string.replace(_,"\\$1")},generate:function(){return this.string}},r.prototype={eachChar:function(e){e({invalidChars:"/",repeat:!0})},regex:function(){return"([^/]+)"},generate:function(e){return e[this.name]}},n.prototype={eachChar:function(e){e({invalidChars:"",repeat:!0})},regex:function(){return"(.+)"},generate:function(e){return e[this.name]}},i.prototype={eachChar:function(){},regex:function(){return""},generate:function(){return""}},o.prototype={get:function(e){for(var t=this.nextStates,r=0,n=t.length;n>r;r++){var i=t[r],a=i.charSpec.validChars===e.validChars;if(a=a&&i.charSpec.invalidChars===e.invalidChars)return i}},put:function(e){var t;return(t=this.get(e))?t:(t=new o(e),this.nextStates.push(t),e.repeat&&t.nextStates.push(t),t)},match:function(e){for(var t,r,n,i=this.nextStates,a=[],o=0,s=i.length;s>o;o++)t=i[o],r=t.charSpec,"undefined"!=typeof(n=r.validChars)?-1!==n.indexOf(e)&&a.push(t):"undefined"!=typeof(n=r.invalidChars)&&-1===n.indexOf(e)&&a.push(t);return a}};var w=Object.create||function(e){function t(){}return t.prototype=e,new t};u.prototype=w({splice:Array.prototype.splice,slice:Array.prototype.slice,push:Array.prototype.push,length:0,queryParams:null});var x=function(){this.rootState=new o,this.names={}};x.prototype={add:function(e,t){for(var r,n=this.rootState,o="^",s={statics:0,dynamics:0,stars:0},l=[],u=[],c=!0,m=0,f=e.length;f>m;m++){var p=e[m],d=[],g=a(p.path,d,s);u=u.concat(g);for(var v=0,b=g.length;b>v;v++){var y=g[v];y instanceof i||(c=!1,n=n.put({validChars:"/"}),o+="/",n=h(n,y),o+=y.regex())}var _={handler:p.handler,names:d};l.push(_)}c&&(n=n.put({validChars:"/"}),o+="/"),n.handlers=l,n.regex=new RegExp(o+"$"),n.types=s,(r=t&&t.as)&&(this.names[r]={segments:u,handlers:l})},handlersFor:function(e){var t=this.names[e],r=[];if(!t)throw new Error("There is no route named "+e);for(var n=0,i=t.handlers.length;i>n;n++)r.push(t.handlers[n]);return r},hasRoute:function(e){return!!this.names[e]},generate:function(e,t){var r=this.names[e],n="";if(!r)throw new Error("There is no route named "+e);for(var a=r.segments,o=0,s=a.length;s>o;o++){var l=a[o];l instanceof i||(n+="/",n+=l.generate(t))}return"/"!==n.charAt(0)&&(n="/"+n),t&&t.queryParams&&(n+=this.generateQueryString(t.queryParams,r.handlers)),n},generateQueryString:function(t){var r=[],n=[];for(var i in t)t.hasOwnProperty(i)&&n.push(i);n.sort();for(var a=0,o=n.length;o>a;a++){i=n[a];var s=t[i];if(null!=s){var l=i;if(e(s))for(var u=0,c=s.length;c>u;u++){var h=i+"[]="+encodeURIComponent(s[u]);r.push(h)}else l+="="+encodeURIComponent(s),r.push(l)}}return 0===r.length?"":"?"+r.join("&")},parseQueryString:function(e){for(var t=e.split("&"),r={},n=0;n<t.length;n++){var i,a=t[n].split("="),o=decodeURIComponent(a[0]),s=o.length,l=!1;1===a.length?i="true":(s>2&&"[]"===o.slice(s-2)&&(l=!0,o=o.slice(0,s-2),r[o]||(r[o]=[])),i=a[1]?decodeURIComponent(a[1]):""),l?r[o].push(i):r[o]=decodeURIComponent(i)}return r},recognize:function(e){var t,r,n,i,a=[this.rootState],o={},u=!1;if(e=decodeURI(e),i=e.indexOf("?"),-1!==i){var h=e.substr(i+1,e.length);e=e.substr(0,i),o=this.parseQueryString(h)}for("/"!==e.charAt(0)&&(e="/"+e),t=e.length,t>1&&"/"===e.charAt(t-1)&&(e=e.substr(0,t-1),u=!0),r=0,n=e.length;n>r&&(a=l(a,e.charAt(r)),a.length);r++);var m=[];for(r=0,n=a.length;n>r;r++)a[r].handlers&&m.push(a[r]);a=s(m);var f=m[0];return f&&f.handlers?(u&&"(.+)$"===f.regex.source.slice(-5)&&(e+="/"),c(f,e,o)):void 0}},b["default"]=x,m.prototype={to:function(e,t){var r=this.delegate;if(r&&r.willAddRoute&&(e=r.willAddRoute(this.matcher.target,e)),this.matcher.add(this.path,e),t){if(0===t.length)throw new Error("You must have an argument in the function passed to `to`");this.matcher.addChild(this.path,e,t,this.delegate)}return this}},f.prototype={add:function(e,t){this.routes[e]=t},addChild:function(e,t,r,n){var i=new f(t);this.children[e]=i;var a=p(e,i,n);n&&n.contextEntered&&n.contextEntered(t,a),r(a)}},x.prototype.map=function(e,t){var r=new f;e(p("",r,this.delegate)),g([],r,function(e){t?t(this,e):this.add(e)},this)}}),e("router/handler-info",["./utils","rsvp/promise","exports"],function(){function e(e){var t=e||{};a(this,t),this.initialize(t)}function t(e,t){if(!e^!t)return!1;if(!e)return!0;for(var r in e)if(e.hasOwnProperty(r)&&e[r]!==t[r])return!1;return!0}var r=arguments,n=r[r.length-1],i=r[0].bind,a=r[0].merge,o=(r[0].serialize,r[0].promiseLabel),s=r[1]["default"];e.prototype={name:null,handler:null,params:null,context:null,factory:null,initialize:function(){},log:function(e,t){e.log&&e.log(this.name+": "+t)},promiseLabel:function(e){return o("'"+this.name+"' "+e)},getUnresolved:function(){return this},serialize:function(){return this.params||{}},resolve:function(e,t){var r=i(this,this.checkForAbort,e),n=i(this,this.runBeforeModelHook,t),a=i(this,this.getModel,t),o=i(this,this.runAfterModelHook,t),l=i(this,this.becomeResolved,t);return s.resolve(void 0,this.promiseLabel("Start handler")).then(r,null,this.promiseLabel("Check for abort")).then(n,null,this.promiseLabel("Before model")).then(r,null,this.promiseLabel("Check if aborted during 'beforeModel' hook")).then(a,null,this.promiseLabel("Model")).then(r,null,this.promiseLabel("Check if aborted in 'model' hook")).then(o,null,this.promiseLabel("After model")).then(r,null,this.promiseLabel("Check if aborted in 'afterModel' hook")).then(l,null,this.promiseLabel("Become resolved"))},runBeforeModelHook:function(e){return e.trigger&&e.trigger(!0,"willResolveModel",e,this.handler),this.runSharedModelHook(e,"beforeModel",[])},runAfterModelHook:function(e,t){var r=this.name;return this.stashResolvedModel(e,t),this.runSharedModelHook(e,"afterModel",[t]).then(function(){return e.resolvedModels[r]},null,this.promiseLabel("Ignore fulfillment value and return model value"))},runSharedModelHook:function(e,t,r){this.log(e,"calling "+t+" hook"),this.queryParams&&r.push(this.queryParams),r.push(e);var n=this.handler,i=n[t]&&n[t].apply(n,r);return i&&i.isTransition&&(i=null),s.resolve(i,null,this.promiseLabel("Resolve value returned from one of the model hooks"))},getModel:null,checkForAbort:function(e,t){return s.resolve(e(),this.promiseLabel("Check for abort")).then(function(){return t},null,this.promiseLabel("Ignore fulfillment value and continue"))},stashResolvedModel:function(e,t){e.resolvedModels=e.resolvedModels||{},e.resolvedModels[this.name]=t},becomeResolved:function(e,t){var r=this.serialize(t);return e&&(this.stashResolvedModel(e,t),e.params=e.params||{},e.params[this.name]=r),this.factory("resolved",{context:t,name:this.name,handler:this.handler,params:r})},shouldSupercede:function(e){if(!e)return!0;var r=e.context===this.context;return e.name!==this.name||this.hasOwnProperty("context")&&!r||this.hasOwnProperty("params")&&!t(this.params,e.params)}},n["default"]=e}),e("router/handler-info/factory",["router/handler-info/resolved-handler-info","router/handler-info/unresolved-handler-info-by-object","router/handler-info/unresolved-handler-info-by-param","exports"],function(){function e(t,r){var n=e.klasses[t],i=new n(r||{});return i.factory=e,i}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=t[1]["default"],a=t[2]["default"];e.klasses={resolved:n,param:a,object:i},r["default"]=e}),e("router/handler-info/resolved-handler-info",["../handler-info","router/utils","rsvp/promise","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].subclass,i=(e[1].promiseLabel,e[2]["default"]),a=n(r,{resolve:function(e,t){return t&&t.resolvedModels&&(t.resolvedModels[this.name]=this.context),i.resolve(this,this.promiseLabel("Resolve"))},getUnresolved:function(){return this.factory("param",{name:this.name,handler:this.handler,params:this.params})},isResolved:!0});t["default"]=a}),e("router/handler-info/unresolved-handler-info-by-object",["../handler-info","router/utils","rsvp/promise","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=(e[1].merge,e[1].subclass),i=(e[1].promiseLabel,e[1].isParam),a=e[2]["default"],o=n(r,{getModel:function(e){return this.log(e,this.name+": resolving provided model"),a.resolve(this.context)},initialize:function(e){this.names=e.names||[],this.context=e.context},serialize:function(e){var t=e||this.context,r=this.names,n=this.handler,a={};if(i(t))return a[r[0]]=t,a;if(n.serialize)return n.serialize(t,r);if(1===r.length){var o=r[0];return a[o]=/_id$/.test(o)?t.id:t,a}}});t["default"]=o}),e("router/handler-info/unresolved-handler-info-by-param",["../handler-info","router/utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].merge,i=e[1].subclass,a=(e[1].promiseLabel,i(r,{initialize:function(e){this.params=e.params||{}},getModel:function(e){var t=this.params;e&&e.queryParams&&(t={},n(t,this.params),t.queryParams=e.queryParams);var r="function"==typeof this.handler.deserialize?"deserialize":"model";return this.runSharedModelHook(e,r,[t])}}));t["default"]=a}),e("router/router",["route-recognizer","rsvp/promise","./utils","./transition-state","./transition","./transition-intent/named-transition-intent","./transition-intent/url-transition-intent","exports"],function(){function e(){this.recognizer=new h,this.reset()}function t(e,t,i){var a=n(e.state,t);g(a.exited,function(e){var t=e.handler;delete t.context,t.exit&&t.exit()});var o=e.oldState=e.state;e.state=t;var s=e.currentHandlerInfos=a.unchanged.slice();try{g(a.updatedContext,function(e){return r(s,e,!1,i)}),g(a.entered,function(e){return r(s,e,!0,i)})}catch(u){throw e.state=o,e.currentHandlerInfos=o.handlerInfos,u}e.state.queryParams=l(e,s,t.queryParams,i)}function r(e,t,r,n){var i=t.handler,a=t.context;if(r&&i.enter&&i.enter(n),n&&n.isAborted)throw new E;if(i.context=a,i.contextDidChange&&i.contextDidChange(),i.setup&&i.setup(a,n),n&&n.isAborted)throw new E;return e.push(t),!0}function n(e,t){var r,n,i,a,o,s=e.handlerInfos,l=t.handlerInfos,u={updatedContext:[],exited:[],entered:[],unchanged:[]};for(a=0,o=l.length;o>a;a++){var c=s[a],h=l[a];c&&c.handler===h.handler||(r=!0),r?(u.entered.push(h),c&&u.exited.unshift(c)):n||c.context!==h.context||i?(n=!0,u.updatedContext.push(h)):u.unchanged.push(c)}for(a=l.length,o=s.length;o>a;a++)u.exited.unshift(s[a]);return u}function i(e,t){var r=e.urlMethod;if(r){for(var n=e.router,i=t.handlerInfos,a=i[i.length-1].name,o={},s=i.length-1;s>=0;--s){var l=i[s];v(o,l.params),l.handler.inaccessibleByURL&&(r=null)}if(r){o.queryParams=e._visibleQueryParams||t.queryParams;var u=n.recognizer.generate(a,o);"replace"===r?n.replaceURL(u):n.updateURL(u)}}}function a(e,r){try{p(e.router,e.sequence,"Resolved all models on destination route; finalizing transition.");{var n=e.router,a=r.handlerInfos;e.sequence}return t(n,r,e),e.isAborted?(n.state.handlerInfos=n.currentHandlerInfos,m.reject(x(e))):(i(e,r,e.intent.url),e.isActive=!1,n.activeTransition=null,f(n,n.currentHandlerInfos,!0,["didTransition"]),n.didTransition&&n.didTransition(n.currentHandlerInfos),p(n,e.sequence,"TRANSITION COMPLETE."),a[a.length-1].handler)}catch(o){if(!(o instanceof E)){var s=e.state.handlerInfos;e.trigger(!0,"error",o,e,s[s.length-1].handler),e.abort()}throw o}}function o(e,t,r){var n=t[0]||"/",i=t[t.length-1],a={};i&&i.hasOwnProperty("queryParams")&&(a=A.call(t).queryParams);var o;if(0===t.length){p(e,"Updating query params");var s=e.state.handlerInfos;o=new O({name:s[s.length-1].name,contexts:[],queryParams:a})}else"/"===n.charAt(0)?(p(e,"Attempting URL transition to "+n),o=new P({url:n})):(p(e,"Attempting transition to "+n),o=new O({name:t[0],contexts:d.call(t,1),queryParams:a}));return e.transitionByIntent(o,r)}function s(e,t){if(e.length!==t.length)return!1;for(var r=0,n=e.length;n>r;++r)if(e[r]!==t[r])return!1;return!0}function l(e,t,r,n){for(var i in r)r.hasOwnProperty(i)&&null===r[i]&&delete r[i];var a=[];f(e,t,!0,["finalizeQueryParamChange",r,a,n]),n&&(n._visibleQueryParams={});for(var o={},s=0,l=a.length;l>s;++s){var u=a[s];o[u.key]=u.value,n&&u.visible!==!1&&(n._visibleQueryParams[u.key]=u.value)}return o}var u=arguments,c=u[u.length-1],h=u[0]["default"],m=u[1]["default"],f=u[2].trigger,p=u[2].log,d=u[2].slice,g=u[2].forEach,v=u[2].merge,b=(u[2].serialize,u[2].extractQueryParams),y=u[2].getChangelist,_=u[2].promiseLabel,w=u[3]["default"],x=u[4].logAbort,C=u[4].Transition,E=u[4].TransitionAborted,O=u[5]["default"],P=u[6]["default"],A=Array.prototype.pop;
e.prototype={map:function(e){this.recognizer.delegate=this.delegate,this.recognizer.map(e,function(e,t){for(var r=t.length-1,n=!0;r>=0&&n;--r){var i=t[r];e.add(t,{as:i.handler}),n="/"===i.path||""===i.path||".index"===i.handler.slice(-6)}})},hasRoute:function(e){return this.recognizer.hasRoute(e)},transitionByIntent:function(e,r){var n,o=!!this.activeTransition,u=o?this.activeTransition.state:this.state,c=this;try{var h=e.applyToState(u,this.recognizer,this.getHandler,r);if(s(h.handlerInfos,u.handlerInfos)){var m=y(u.queryParams,h.queryParams);if(m){this._changedQueryParams=m.changed;for(var p in m.removed)m.removed.hasOwnProperty(p)&&(this._changedQueryParams[p]=null);return f(this,h.handlerInfos,!0,["queryParamsDidChange",m.changed,m.all,m.removed]),this._changedQueryParams=null,!o&&this.activeTransition?this.activeTransition:(n=new C(this),u.queryParams=l(this,h.handlerInfos,h.queryParams,n),n.promise=n.promise.then(function(e){return i(n,u,!0),c.didTransition&&c.didTransition(c.currentHandlerInfos),e},null,_("Transition complete")),n)}return new C(this)}return r?(t(this,h),void 0):(n=new C(this,e,h),this.activeTransition&&this.activeTransition.abort(),this.activeTransition=n,n.promise=n.promise.then(function(e){return a(n,e.state)},null,_("Settle transition promise when transition is finalized")),o||f(this,this.state.handlerInfos,!0,["willTransition",n]),n)}catch(d){return new C(this,e,null,d)}},reset:function(){this.state&&g(this.state.handlerInfos,function(e){var t=e.handler;t.exit&&t.exit()}),this.state=new w,this.currentHandlerInfos=null},activeTransition:null,handleURL:function(e){var t=d.call(arguments);return"/"!==e.charAt(0)&&(t[0]="/"+e),o(this,t).method(null)},updateURL:function(){throw new Error("updateURL is not implemented")},replaceURL:function(e){this.updateURL(e)},transitionTo:function(){return o(this,arguments)},intermediateTransitionTo:function(){o(this,arguments,!0)},refresh:function(e){for(var t=this.activeTransition?this.activeTransition.state:this.state,r=t.handlerInfos,n={},i=0,a=r.length;a>i;++i){var o=r[i];n[o.name]=o.params||{}}p(this,"Starting a refresh transition");var s=new O({name:r[r.length-1].name,pivotHandler:e||r[0].handler,contexts:[],queryParams:this._changedQueryParams||t.queryParams||{}});return this.transitionByIntent(s,!1)},replaceWith:function(){return o(this,arguments).method("replace")},generate:function(e){for(var t=b(d.call(arguments,1)),r=t[0],n=t[1],i=new O({name:e,contexts:r}),a=i.applyToState(this.state,this.recognizer,this.getHandler),o={},s=0,l=a.handlerInfos.length;l>s;++s){var u=a.handlerInfos[s],c=u.serialize();v(o,c)}return o.queryParams=n,this.recognizer.generate(e,o)},isActive:function(e){var t,r,n=b(d.call(arguments,1)),i=n[0],a=n[1],o=this.state.queryParams,l=this.state.handlerInfos;if(!l.length)return!1;var u=l[l.length-1].name,c=this.recognizer.handlersFor(u),h=0;for(r=c.length;r>h&&(t=l[h],t.name!==e);++h);if(h===c.length)return!1;var m=new w;m.handlerInfos=l.slice(0,h+1),c=c.slice(0,h+1);var f=new O({name:u,contexts:i}),p=f.applyToHandlers(m,c,this.getHandler,u,!0,!0),g={};v(g,a);for(var _ in o)o.hasOwnProperty(_)&&g.hasOwnProperty(_)&&(g[_]=o[_]);return s(p.handlerInfos,m.handlerInfos)&&!y(g,a)},trigger:function(){var e=d.call(arguments);f(this,this.currentHandlerInfos,!1,e)},log:null},c["default"]=e}),e("router/transition-intent",["./utils","exports"],function(){function e(e){this.initialize(e),this.data=this.data||{}}{var t=arguments,r=t[t.length-1];t[0].merge}e.prototype={initialize:null,applyToState:null},r["default"]=e}),e("router/transition-intent/named-transition-intent",["../transition-intent","../transition-state","../handler-info/factory","../utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1]["default"],i=e[2]["default"],a=e[3].isParam,o=e[3].extractQueryParams,s=e[3].merge,l=e[3].subclass;t["default"]=l(r,{name:null,pivotHandler:null,contexts:null,queryParams:null,initialize:function(e){this.name=e.name,this.pivotHandler=e.pivotHandler,this.contexts=e.contexts||[],this.queryParams=e.queryParams},applyToState:function(e,t,r,n){var i=o([this.name].concat(this.contexts)),a=i[0],s=(i[1],t.handlersFor(a[0])),l=s[s.length-1].handler;return this.applyToHandlers(e,s,r,l,n)},applyToHandlers:function(e,t,r,i,a,o){var l,u=new n,c=this.contexts.slice(0),h=t.length;if(this.pivotHandler)for(l=0;l<t.length;++l)if(r(t[l].handler)===this.pivotHandler){h=l;break}!this.pivotHandler;for(l=t.length-1;l>=0;--l){var m=t[l],f=m.handler,p=r(f),d=e.handlerInfos[l],g=null;if(g=m.names.length>0?l>=h?this.createParamHandlerInfo(f,p,m.names,c,d):this.getHandlerInfoForDynamicSegment(f,p,m.names,c,d,i,l):this.createParamHandlerInfo(f,p,m.names,c,d),o){g=g.becomeResolved(null,g.context);var v=d&&d.context;m.names.length>0&&g.context===v&&(g.params=d&&d.params),g.context=v}var b=d;(l>=h||g.shouldSupercede(d))&&(h=Math.min(l,h),b=g),a&&!o&&(b=b.becomeResolved(null,b.context)),u.handlerInfos.unshift(b)}if(c.length>0)throw new Error("More context objects were passed than there are dynamic segments for the route: "+i);return a||this.invalidateChildren(u.handlerInfos,h),s(u.queryParams,e.queryParams),s(u.queryParams,this.queryParams||{}),u},invalidateChildren:function(e,t){for(var r=t,n=e.length;n>r;++r){{e[r]}e[r]=e[r].getUnresolved()}},getHandlerInfoForDynamicSegment:function(e,t,r,n,o,s,l){{var u;r.length}if(n.length>0){if(u=n[n.length-1],a(u))return this.createParamHandlerInfo(e,t,r,n,o);n.pop()}else{if(o&&o.name===e)return o;if(!this.preTransitionState)return o;var c=this.preTransitionState.handlerInfos[l];u=c&&c.context}return i("object",{name:e,handler:t,context:u,names:r})},createParamHandlerInfo:function(e,t,r,n,o){for(var s={},l=r.length;l--;){var u=o&&e===o.name&&o.params||{},c=n[n.length-1],h=r[l];if(a(c))s[h]=""+n.pop();else{if(!u.hasOwnProperty(h))throw new Error("You didn't provide enough string/numeric parameters to satisfy all of the dynamic segments for route "+e);s[h]=u[h]}}return i("param",{name:e,handler:t,params:s})}})}),e("router/transition-intent/url-transition-intent",["../transition-intent","../transition-state","../handler-info/factory","../utils","exports"],function(){function e(e){this.message=e||"UnrecognizedURLError",this.name="UnrecognizedURLError"}var t=arguments,r=t[t.length-1],n=t[0]["default"],i=t[1]["default"],a=t[2]["default"],o=(t[3].oCreate,t[3].merge),s=t[3].subclass;r["default"]=s(n,{url:null,initialize:function(e){this.url=e.url},applyToState:function(t,r,n){var s,l,u=new i,c=r.recognize(this.url);if(!c)throw new e(this.url);var h=!1;for(s=0,l=c.length;l>s;++s){var m=c[s],f=m.handler,p=n(f);if(p.inaccessibleByURL)throw new e(this.url);var d=a("param",{name:f,handler:p,params:m.params}),g=t.handlerInfos[s];h||d.shouldSupercede(g)?(h=!0,u.handlerInfos[s]=d):u.handlerInfos[s]=g}return o(u.queryParams,c.queryParams),u}})}),e("router/transition-state",["./handler-info","./utils","rsvp/promise","exports"],function(){function e(){this.handlerInfos=[],this.queryParams={},this.params={}}var t=arguments,r=t[t.length-1],n=(t[0].ResolvedHandlerInfo,t[1].forEach),i=t[1].promiseLabel,a=t[2]["default"];e.prototype={handlerInfos:null,queryParams:null,params:null,promiseLabel:function(e){var t="";return n(this.handlerInfos,function(e){""!==t&&(t+="."),t+=e.name}),i("'"+t+"': "+e)},resolve:function(e,t){function r(){return a.resolve(e(),i("Check if should continue"))["catch"](function(e){return h=!0,a.reject(e)},i("Handle abort"))}function o(e){var r=c.handlerInfos,n=t.resolveIndex>=r.length?r.length-1:t.resolveIndex;return a.reject({error:e,handlerWithError:c.handlerInfos[n].handler,wasAborted:h,state:c})}function s(e){var n=c.handlerInfos[t.resolveIndex].isResolved;if(c.handlerInfos[t.resolveIndex++]=e,!n){var a=e.handler;a&&a.redirect&&a.redirect(e.context,t)}return r().then(l,null,i("Resolve handler"))}function l(){if(t.resolveIndex===c.handlerInfos.length)return{error:null,state:c};var e=c.handlerInfos[t.resolveIndex];return e.resolve(r,t).then(s,null,i("Proceed"))}var u=this.params;n(this.handlerInfos,function(e){u[e.name]=e.params||{}}),t=t||{},t.resolveIndex=0;var c=this,h=!1;return a.resolve(null,this.promiseLabel("Start transition")).then(l,null,this.promiseLabel("Resolve handler"))["catch"](o,this.promiseLabel("Handle error"))}},r["default"]=e}),e("router/transition",["rsvp/promise","./handler-info","./utils","exports"],function(){function e(r,n,i,o){function s(){return l.isAborted?a.reject(void 0,u("Transition aborted - reject")):void 0}var l=this;if(this.state=i||r.state,this.intent=n,this.router=r,this.data=this.intent&&this.intent.data||{},this.resolvedModels={},this.queryParams={},o)return this.promise=a.reject(o),void 0;if(i){this.params=i.params,this.queryParams=i.queryParams;var c=i.handlerInfos.length;c&&(this.targetName=i.handlerInfos[i.handlerInfos.length-1].name);for(var h=0;c>h;++h){var m=i.handlerInfos[h];if(!m.isResolved)break;this.pivotHandler=m.handler}this.sequence=e.currentSequence++,this.promise=i.resolve(s,this)["catch"](function(e){return e.wasAborted||l.isAborted?a.reject(t(l)):(l.trigger("error",e.error,l,e.handlerWithError),l.abort(),a.reject(e.error))},u("Handle Abort"))}else this.promise=a.resolve(this.state),this.params={}}function t(e){return l(e.router,e.sequence,"detected abort."),new r}function r(e){this.message=e||"TransitionAborted",this.name="TransitionAborted"}var n=arguments,i=n[n.length-1],a=n[0]["default"],o=(n[1].ResolvedHandlerInfo,n[2].trigger),s=n[2].slice,l=n[2].log,u=n[2].promiseLabel;e.currentSequence=0,e.prototype={targetName:null,urlMethod:"update",intent:null,params:null,pivotHandler:null,resolveIndex:0,handlerInfos:null,resolvedModels:null,isActive:!0,state:null,isTransition:!0,promise:null,data:null,then:function(e,t){return this.promise.then(e,t)},abort:function(){return this.isAborted?this:(l(this.router,this.sequence,this.targetName+": transition was aborted"),this.intent.preTransitionState=this.router.state,this.isAborted=!0,this.isActive=!1,this.router.activeTransition=null,this)},retry:function(){return this.abort(),this.router.transitionByIntent(this.intent,!1)},method:function(e){return this.urlMethod=e,this},trigger:function(e){var t=s.call(arguments);"boolean"==typeof e?t.shift():e=!1,o(this.router,this.state.handlerInfos.slice(0,this.resolveIndex+1),e,t)},followRedirects:function(){var e=this.router;return this.promise["catch"](function(t){return e.activeTransition?e.activeTransition.followRedirects():a.reject(t)})},toString:function(){return"Transition (sequence "+this.sequence+")"},log:function(e){l(this.router,this.sequence,e)}},e.prototype.send=e.prototype.trigger,i.Transition=e,i.logAbort=t,i.TransitionAborted=r}),e("router/utils",["exports"],function(){function e(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])}function t(e){var t,r,n=e&&e.length;return n&&n>0&&e[n-1]&&e[n-1].hasOwnProperty("queryParams")?(r=e[n-1].queryParams,t=p.call(e,0,n-1),[t,r]):[e,null]}function r(e){for(var t in e)if("number"==typeof e[t])e[t]=""+e[t];else if(d(e[t]))for(var r=0,n=e[t].length;n>r;r++)e[t][r]=""+e[t][r]}function n(e,t,r){e.log&&(3===arguments.length?e.log("Transition #"+t+": "+r):(r=t,e.log(r)))}function i(e,t){var r=arguments;return function(n){var i=p.call(r,2);return i.push(n),t.apply(e,i)}}function a(e){return"string"==typeof e||e instanceof String||"number"==typeof e||e instanceof Number}function o(e,t){for(var r=0,n=e.length;n>r&&!1!==t(e[r]);r++);}function s(e,t,r,n){if(e.triggerEvent)return e.triggerEvent(t,r,n),void 0;var i=n.shift();if(!t){if(r)return;throw new Error("Could not trigger event '"+i+"'. There are no active handlers")}for(var a=!1,o=t.length-1;o>=0;o--){var s=t[o],l=s.handler;if(l.events&&l.events[i]){if(l.events[i].apply(l,n)!==!0)return;a=!0}}if(!a&&!r)throw new Error("Nothing handled the event '"+i+"'.")}function l(t,n){var i,a={all:{},changed:{},removed:{}};e(a.all,n);var o=!1;r(t),r(n);for(i in t)t.hasOwnProperty(i)&&(n.hasOwnProperty(i)||(o=!0,a.removed[i]=t[i]));for(i in n)if(n.hasOwnProperty(i))if(d(t[i])&&d(n[i]))if(t[i].length!==n[i].length)a.changed[i]=n[i],o=!0;else for(var s=0,l=t[i].length;l>s;s++)t[i][s]!==n[i][s]&&(a.changed[i]=n[i],o=!0);else t[i]!==n[i]&&(a.changed[i]=n[i],o=!0);return o&&a}function u(e){return"Router: "+e}function c(t,r){function n(e){t.call(this,e||{})}return n.prototype=g(t.prototype),e(n.prototype,r),n}var h,m=arguments,f=m[m.length-1],p=Array.prototype.slice;h=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var d=h;f.isArray=d;var g=Object.create||function(e){function t(){}return t.prototype=e,new t};f.oCreate=g,f.extractQueryParams=t,f.log=n,f.bind=i,f.forEach=o,f.trigger=s,f.getChangelist=l,f.promiseLabel=u,f.subclass=c,f.merge=e,f.slice=p,f.isParam=a,f.coerceQueryParamsToString=r}),e("router",["./router/router","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"];t["default"]=r})}(),function(){e("ember-application/ext/controller",["ember-metal/core","ember-metal/property_get","ember-metal/property_set","ember-metal/error","ember-metal/utils","ember-metal/computed","ember-runtime/controllers/controller","ember-routing/system/controller_for","exports"],function(){function e(e,t,r){var n,o,s,l=[];for(o=0,s=r.length;s>o;o++)n=r[o],-1===n.indexOf(":")&&(n="controller:"+n),t.has(n)||l.push(n);if(l.length)throw new i(a(e)+" needs [ "+l.join(", ")+" ] but "+(l.length>1?"they":"it")+" could not be found")}var t=arguments,r=t[t.length-1],n=(t[0]["default"],t[1].get),i=(t[2].set,t[3]["default"]),a=t[4].inspect,o=t[5].computed,s=t[6].ControllerMixin,l=(t[4].meta,t[7].controllerFor),u=(t[4].meta,o(function(){var e=this;return{needs:n(e,"needs"),container:n(e,"container"),unknownProperty:function(t){var r,n,i,o=this.needs;for(n=0,i=o.length;i>n;n++)if(r=o[n],r===t)return this.container.lookup("controller:"+t);var s=a(e)+"#needs does not include `"+t+"`. To access the "+t+" controller from "+a(e)+", "+a(e)+" should have a `needs` property that is an array of the controllers it has access to.";throw new ReferenceError(s)},setUnknownProperty:function(t){throw new Error("You cannot overwrite the value of `controllers."+t+"` of "+a(e))}}}));s.reopen({concatenatedProperties:["needs"],needs:[],init:function(){var t=n(this,"needs"),r=n(t,"length");r>0&&(this.container&&e(this,this.container,t),n(this,"controllers")),this._super.apply(this,arguments)},controllerFor:function(e){return l(n(this,"container"),e)},controllers:u}),r["default"]=s}),e("ember-application",["ember-metal/core","ember-runtime/system/lazy_load","ember-application/system/dag","ember-application/system/resolver","ember-application/system/application","ember-application/ext/controller"],function(){var e=arguments,t=(e[e.length-1],e[0]["default"]),r=e[1].runLoadHooks,n=e[2]["default"],i=e[3].Resolver,a=e[3].DefaultResolver,o=e[4]["default"];t.Application=o,t.DAG=n,t.Resolver=i,t.DefaultResolver=a,r("Ember.Application",o)}),e("ember-application/system/application",["ember-metal","ember-metal/property_get","ember-metal/property_set","ember-runtime/system/lazy_load","ember-application/system/dag","ember-runtime/system/namespace","ember-runtime/mixins/deferred","ember-application/system/resolver","ember-metal/platform","ember-metal/run_loop","ember-metal/utils","container/container","ember-runtime/controllers/controller","ember-metal/enumerable_utils","ember-runtime/controllers/object_controller","ember-runtime/controllers/array_controller","ember-views/system/event_dispatcher","ember-extension-support/container_debug_adapter","ember-views/system/jquery","ember-routing/system/route","ember-routing/system/router","ember-routing/location/hash_location","ember-routing/location/history_location","ember-routing/location/auto_location","ember-routing/location/none_location","ember-handlebars-compiler","exports"],function(){function e(e){this._container=e}function r(e){function t(e){return n.resolve(e)}e.get("resolver");var r=e.get("resolver")||e.get("Resolver")||m,n=r.create({namespace:e});return t.describe=function(e){return n.lookupDescription(e)},t.makeToString=function(e,t){return n.makeToString(e,t)},t.normalize=function(e){return n.normalize?n.normalize(e):e},t.__resolver__=n,t}var n=arguments,i=n[n.length-1],a=n[0]["default"],o=n[1].get,s=n[2].set,l=n[3].runLoadHooks,u=n[4]["default"],c=n[5]["default"],h=n[6]["default"],m=n[7].DefaultResolver,f=n[8].create,p=n[9]["default"],d=(n[10].canInvoke,n[11]["default"]),g=n[12].Controller,v=n[13]["default"],b=n[14]["default"],y=n[15]["default"],_=n[16]["default"],w=n[17]["default"],x=n[18]["default"],C=n[19]["default"],E=n[20]["default"],O=n[21]["default"],P=n[22]["default"],A=n[23]["default"],T=n[24]["default"],S=n[25]["default"],I=a.K;e.deprecate=function(e){return function(){var t=this._container;return t[e].apply(t,arguments)}},e.prototype={_container:null,lookup:e.deprecate("lookup"),resolve:e.deprecate("resolve"),register:e.deprecate("register")};var N=c.extend(h,{rootElement:"body",eventDispatcher:null,customEvents:null,_readinessDeferrals:1,init:function(){if(this.$||(this.$=x),this.__container__=this.buildContainer(),this.Router=this.defaultRouter(),this._super(),this.scheduleInitialize(),a.libraries.registerCoreLibrary("Handlebars",S.VERSION),a.libraries.registerCoreLibrary("jQuery",x().jquery),a.LOG_VERSION){a.LOG_VERSION=!1;var e=v.map(a.libraries,function(e){return o(e,"name.length")}),t=Math.max.apply(this,e);a.libraries.each(function(e){new Array(t-e.length+1).join(" ")})}},buildContainer:function(){var e=this.__container__=N.buildContainer(this);return e},defaultRouter:function(){if(this.Router!==!1){var e=this.__container__;return this.Router&&(e.unregister("router:main"),e.register("router:main",this.Router)),e.lookupFactory("router:main")}},scheduleInitialize:function(){var e=this;!this.$||this.$.isReady?p.schedule("actions",e,"_initialize"):this.$().ready(function(){p(e,"_initialize")})},deferReadiness:function(){this._readinessDeferrals++},advanceReadiness:function(){this._readinessDeferrals--,0===this._readinessDeferrals&&p.once(this,this.didBecomeReady)},register:function(){var e=this.__container__;e.register.apply(e,arguments)},inject:function(){var e=this.__container__;e.injection.apply(e,arguments)},initialize:function(){},_initialize:function(){if(!this.isDestroyed){if(this.Router){var e=this.__container__;e.unregister("router:main"),e.register("router:main",this.Router)}return this.runInitializers(),l("application",this),this.advanceReadiness(),this}},reset:function(){function e(){var e=this.__container__.lookup("router:main");e.reset(),p(this.__container__,"destroy"),this.buildContainer(),p.schedule("actions",this,function(){this._initialize()})}this._readinessDeferrals=1,p.join(this,e)},runInitializers:function(){var e,t,r=o(this.constructor,"initializers"),n=this.__container__,i=new u,a=this;for(e in r)t=r[e],i.addEdges(t.name,t.initialize,t.before,t.after);i.topsort(function(e){var t=e.value;t(n,a)})},didBecomeReady:function(){this.setupEventDispatcher(),this.ready(),this.startRouting(),a.testing||(a.Namespace.processAll(),a.BOOTED=!0),this.resolve(this)},setupEventDispatcher:function(){var e=o(this,"customEvents"),t=o(this,"rootElement"),r=this.__container__.lookup("event_dispatcher:main");s(this,"eventDispatcher",r),r.setup(e,t)},startRouting:function(){var e=this.__container__.lookup("router:main");e&&e.startRouting()},handleURL:function(e){var t=this.__container__.lookup("router:main");t.handleURL(e)},ready:I,resolver:null,Resolver:null,willDestroy:function(){a.BOOTED=!1,this.__container__.lookup("router:main").reset(),this.__container__.destroy()},initializer:function(e){this.constructor.initializer(e)}});N.reopenClass({initializers:{},initializer:function(e){void 0!==this.superclass.initializers&&this.superclass.initializers===this.initializers&&this.reopenClass({initializers:f(this.initializers)}),this.initializers[e.name]=e},buildContainer:function(n){var i=new d;return d.defaultContainer=new e(i),i.set=s,i.resolver=r(n),i.normalize=i.resolver.normalize,i.describe=i.resolver.describe,i.makeToString=i.resolver.makeToString,i.optionsForType("component",{singleton:!1}),i.optionsForType("view",{singleton:!1}),i.optionsForType("template",{instantiate:!1}),i.optionsForType("helper",{instantiate:!1}),i.register("application:main",n,{instantiate:!1}),i.register("controller:basic",g,{instantiate:!1}),i.register("controller:object",b,{instantiate:!1}),i.register("controller:array",y,{instantiate:!1}),i.register("route:basic",C,{instantiate:!1}),i.register("event_dispatcher:main",_),i.register("router:main",E),i.injection("router:main","namespace","application:main"),i.register("location:auto",A),i.register("location:hash",O),i.register("location:history",P),i.register("location:none",T),i.injection("controller","target","router:main"),i.injection("controller","namespace","application:main"),i.injection("route","router","router:main"),i.injection("location","rootURL","-location-setting:root-url"),i.register("resolver-for-debugging:main",i.resolver.__resolver__,{instantiate:!1}),i.injection("container-debug-adapter:main","resolver","resolver-for-debugging:main"),i.injection("data-adapter:main","containerDebugAdapter","container-debug-adapter:main"),t("ember-extension-support"),i.register("container-debug-adapter:main",w),i}}),i["default"]=N}),e("ember-application/system/dag",["exports"],function(){function e(t,r,n,i){var a,o=t.name,s=t.incoming,l=t.incomingNames,u=l.length;if(n||(n={}),i||(i=[]),!n.hasOwnProperty(o)){for(i.push(o),n[o]=!0,a=0;u>a;a++)e(s[l[a]],r,n,i);r(t,i),i.pop()}}function t(){this.names=[],this.vertices={}}var r=arguments,n=r[r.length-1];t.prototype.add=function(e){if(e){if(this.vertices.hasOwnProperty(e))return this.vertices[e];var t={name:e,incoming:{},incomingNames:[],hasOutgoing:!1,value:null};return this.vertices[e]=t,this.names.push(e),t}},t.prototype.map=function(e,t){this.add(e).value=t},t.prototype.addEdge=function(t,r){function n(e,t){if(e.name===r)throw new EmberError("cycle detected: "+r+" <- "+t.join(" <- "))}if(t&&r&&t!==r){var i=this.add(t),a=this.add(r);a.incoming.hasOwnProperty(t)||(e(i,n),i.hasOutgoing=!0,a.incoming[t]=i,a.incomingNames.push(t))}},t.prototype.topsort=function(t){var r,n,i={},a=this.vertices,o=this.names,s=o.length;for(r=0;s>r;r++)n=a[o[r]],n.hasOutgoing||e(n,t,i)},t.prototype.addEdges=function(e,t,r,n){var i;if(this.map(e,t),r)if("string"==typeof r)this.addEdge(e,r);else for(i=0;i<r.length;i++)this.addEdge(e,r[i]);if(n)if("string"==typeof n)this.addEdge(n,e);else for(i=0;i<n.length;i++)this.addEdge(n[i],e)},n["default"]=t}),e("ember-application/system/resolver",["ember-metal/core","ember-metal/property_get","ember-metal/logger","ember-runtime/system/string","ember-runtime/system/object","ember-runtime/system/namespace","ember-handlebars","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=e[2]["default"],a=e[3].classify,o=e[3].capitalize,s=e[3].decamelize,l=e[4]["default"],u=e[5]["default"],c=e[6]["default"],h=l.extend({namespace:null,normalize:function(){throw new Error("Invalid call to `resolver.normalize(fullName)`. Please override the 'normalize' method in subclass of `Ember.Resolver` to prevent falling through to this error.")},resolve:function(){throw new Error("Invalid call to `resolver.resolve(parsedName)`. Please override the 'resolve' method in subclass of `Ember.Resolver` to prevent falling through to this error.")},parseName:function(){throw new Error("Invalid call to `resolver.resolveByType(parsedName)`. Please override the 'resolveByType' method in subclass of `Ember.Resolver` to prevent falling through to this error.")},lookupDescription:function(){throw new Error("Invalid call to `resolver.lookupDescription(fullName)`. Please override the 'lookupDescription' method in subclass of `Ember.Resolver` to prevent falling through to this error.")},makeToString:function(){throw new Error("Invalid call to `resolver.makeToString(factory, fullName)`. Please override the 'makeToString' method in subclass of `Ember.Resolver` to prevent falling through to this error.")},resolveOther:function(){throw new Error("Invalid call to `resolver.resolveOther(parsedName)`. Please override the 'resolveOther' method in subclass of `Ember.Resolver` to prevent falling through to this error.")},_logLookup:function(){throw new Error("Invalid call to `resolver._logLookup(found, parsedName)`. Please override the '_logLookup' method in subclass of `Ember.Resolver` to prevent falling through to this error.")}}),m=l.extend({namespace:null,normalize:function(e){var t=e.split(":",2),r=t[0],n=t[1];if("template"!==r){var i=n;return i.indexOf(".")>-1&&(i=i.replace(/\.(.)/g,function(e){return e.charAt(1).toUpperCase()})),n.indexOf("_")>-1&&(i=i.replace(/_(.)/g,function(e){return e.charAt(1).toUpperCase()})),r+":"+i}return e},resolve:function(e){var t,r=this.parseName(e),n=r.resolveMethodName;if(!r.name||!r.type)throw new TypeError("Invalid fullName: `"+e+"`, must be of the form `type:name` ");return this[n]&&(t=this[n](r)),t||(t=this.resolveOther(r)),r.root.LOG_RESOLVER&&this._logLookup(t,r),t},parseName:function(e){var t=e.split(":"),r=t[0],i=t[1],s=i,l=n(this,"namespace"),c=l;if("template"!==r&&-1!==s.indexOf("/")){var h=s.split("/");s=h[h.length-1];var m=o(h.slice(0,-1).join("."));c=u.byName(m)}return{fullName:e,type:r,fullNameWithoutType:i,name:s,root:c,resolveMethodName:"resolve"+a(r)}},lookupDescription:function(e){var t=this.parseName(e);if("template"===t.type)return"template at "+t.fullNameWithoutType.replace(/\./g,"/");var r=t.root+"."+a(t.name);return"model"!==t.type&&(r+=a(t.type)),r},makeToString:function(e){return e.toString()},useRouterNaming:function(e){e.name=e.name.replace(/\./g,"_"),"basic"===e.name&&(e.name="")},resolveTemplate:function(e){var t=e.fullNameWithoutType.replace(/\./g,"/");return r.TEMPLATES[t]?r.TEMPLATES[t]:(t=s(t),r.TEMPLATES[t]?r.TEMPLATES[t]:void 0)},resolveView:function(e){return this.useRouterNaming(e),this.resolveOther(e)},resolveController:function(e){return this.useRouterNaming(e),this.resolveOther(e)},resolveRoute:function(e){return this.useRouterNaming(e),this.resolveOther(e)},resolveModel:function(e){var t=a(e.name),r=n(e.root,t);return r?r:void 0},resolveHelper:function(e){return this.resolveOther(e)||c.helpers[e.fullNameWithoutType]},resolveOther:function(e){var t=a(e.name)+a(e.type),r=n(e.root,t);return r?r:void 0},_logLookup:function(e,t){var r,n;r=e?"[âœ“]":"[ ]",n=t.fullName.length>60?".":new Array(60-t.fullName.length).join("."),i.info(r,t.fullName,n,this.lookupDescription(t.fullName))}});t.Resolver=h,t.DefaultResolver=m})}(),function(){e("ember-extension-support/container_debug_adapter",["ember-metal/core","ember-metal/utils","ember-runtime/system/string","ember-runtime/system/namespace","ember-runtime/system/object","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].typeOf,i=e[2].dasherize,a=e[2].classify,o=e[3]["default"],s=e[4]["default"],l=s.extend({container:null,resolver:null,canCatalogEntriesByType:function(e){return"model"===e||"template"===e?!1:!0},catalogEntriesByType:function(e){var t=r.A(o.NAMESPACES),s=r.A(),l=new RegExp(a(e)+"$");return t.forEach(function(e){if(e!==r)for(var t in e)if(e.hasOwnProperty(t)&&l.test(t)){var a=e[t];"class"===n(a)&&s.push(i(t.replace(l,"")))}}),s}});t["default"]=l}),e("ember-extension-support/data_adapter",["ember-metal/core","ember-metal/property_get","ember-metal/run_loop","ember-runtime/system/string","ember-runtime/system/namespace","ember-runtime/system/object","ember-runtime/system/native_array","ember-application/system/application","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].get,i=e[2]["default"],a=e[3].dasherize,o=e[4]["default"],s=e[5]["default"],l=e[6].A,u=e[7]["default"],c=s.extend({init:function(){this._super(),this.releaseMethods=l()},container:null,containerDebugAdapter:void 0,attributeLimit:3,releaseMethods:l(),getFilters:function(){return l()},watchModelTypes:function(e,t){var r,n=this.getModelTypes(),i=this,a=l();r=n.map(function(e){var r=e.klass,n=i.wrapModelType(r,e.name);return a.push(i.observeModelType(r,t)),n}),e(r);var o=function(){a.forEach(function(e){e()}),i.releaseMethods.removeObject(o)};return this.releaseMethods.pushObject(o),o},_nameToClass:function(e){return"string"==typeof e&&(e=this.container.lookupFactory("model:"+e)),e},watchRecords:function(e,t,n,i){var a,o=this,s=l(),u=this.getRecords(e),c=function(e){n([e])},h=u.map(function(e){return s.push(o.observeRecord(e,c)),o.wrapRecord(e)}),m=function(e,r,n,a){for(var l=r;r+a>l;l++){var u=e.objectAt(l),h=o.wrapRecord(u);s.push(o.observeRecord(u,c)),t([h])}n&&i(r,n)},f={didChange:m,willChange:r.K};return u.addArrayObserver(o,f),a=function(){s.forEach(function(e){e()}),u.removeArrayObserver(o,f),o.releaseMethods.removeObject(a)},t(h),this.releaseMethods.pushObject(a),a},willDestroy:function(){this._super(),this.releaseMethods.forEach(function(e){e()})},detect:function(){return!1},columnsForType:function(){return l()},observeModelType:function(e,t){var n=this,a=this.getRecords(e),o=function(){t([n.wrapModelType(e)])},s={didChange:function(){i.scheduleOnce("actions",this,o)},willChange:r.K};a.addArrayObserver(this,s);var l=function(){a.removeArrayObserver(n,s)};return l},wrapModelType:function(e,t){var r,i=this.getRecords(e);return r={name:t||e.toString(),count:n(i,"length"),columns:this.columnsForType(e),object:e}},getModelTypes:function(){var e,t=this,r=this.get("containerDebugAdapter");return e=r.canCatalogEntriesByType("model")?r.catalogEntriesByType("model"):this._getObjectsOnNamespaces(),e.map(function(e){return{klass:t._nameToClass(e),name:e}}).filter(function(e){return t.detect(e.klass)})},_getObjectsOnNamespaces:function(){var e=l(o.NAMESPACES),t=l();return e.forEach(function(e){for(var r in e)if(e.hasOwnProperty(r)){var n=a(r);e instanceof u||!e.toString()||(n=e+"/"+n),t.push(n)}}),t},getRecords:function(){return l()},wrapRecord:function(e){var t={object:e};return t.columnValues=this.getRecordColumnValues(e),t.searchKeywords=this.getRecordKeywords(e),t.filterValues=this.getRecordFilterValues(e),t.color=this.getRecordColor(e),t},getRecordColumnValues:function(){return{}},getRecordKeywords:function(){return l()},getRecordFilterValues:function(){return{}},getRecordColor:function(){return null},observeRecord:function(){return function(){}}});t["default"]=c}),e("ember-extension-support/initializers",[],function(){}),e("ember-extension-support",["ember-metal/core","ember-extension-support/data_adapter","ember-extension-support/container_debug_adapter"],function(){var e=arguments,t=(e[e.length-1],e[0]["default"]),r=e[1]["default"],n=e[2]["default"];t.DataAdapter=r,t.ContainerDebugAdapter=n})}(),function(){e("ember-testing/adapters/adapter",["ember-metal/core","ember-metal/utils","ember-runtime/system/object","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=(e[1].inspect,e[2]["default"]),i=n.extend({asyncStart:r.K,asyncEnd:r.K,exception:function(e){throw e}});t["default"]=i}),e("ember-testing/adapters/qunit",["ember-testing/adapters/adapter","ember-metal/utils","exports"],function(){var e=arguments,t=e[e.length-1],r=e[0]["default"],n=e[1].inspect,i=r.extend({asyncStart:function(){QUnit.stop()},asyncEnd:function(){QUnit.start()},exception:function(e){ok(!1,n(e))}});t["default"]=i}),e("ember-testing/helpers",["ember-metal/property_get","ember-metal/error","ember-metal/run_loop","ember-views/system/jquery","ember-testing/test"],function(){function e(e){var t=e.__container__.lookup("controller:application");return f(t,"currentRouteName")}function t(e){var t=e.__container__.lookup("controller:application");return f(t,"currentPath")}function r(e){var t=e.__container__.lookup("router:main");return f(t,"location").getURL()}function n(e,t){var r=e.__container__.lookup("router:main");return r.location.setURL(t),e._readinessDeferrals>0?(r.initialURL=t,d(e,"advanceReadiness"),delete r.initialURL):d(e,e.handleURL,t),h(e)}function i(e,t,r){var n=l(e,t,r);if(d(n,"mousedown"),n.is(":input")){var i=n.prop("type");"checkbox"!==i&&"radio"!==i&&"hidden"!==i&&d(n,function(){!document.hasFocus||document.hasFocus()?this.focus():this.trigger("focusin")})}return d(n,"mouseup"),d(n,"click"),h(e)}function a(e,t,r,n,i){3===arguments.length&&(n=r,r=null),"undefined"==typeof i&&(i={});var a=l(e,t,r),o=g.Event(n,i);return d(a,"trigger",o),h(e)}function o(e,t,r,n,i){return"undefined"==typeof i&&(i=n,n=r,r=null),a(e,t,r,n,{keyCode:i,which:i})}function s(e,t,r,n){var i;return"undefined"==typeof n&&(n=r,r=null),i=l(e,t,r),d(function(){i.val(n).change()}),h(e)}function l(e,t,r){var n=u(e,t,r);if(0===n.length)throw new p("Element "+t+" not found.");
return n}function u(e,t,r){var n;return r=r||f(e,"rootElement"),n=e.$(t,r)}function c(e,t){return h(e,t(e))}function h(e,t){return v.promise(function(r){1===++_&&v.adapter.asyncStart();var n=setInterval(function(){var i=!!e.__container__.lookup("router:main").router.activeTransition;i||v.pendingAjaxRequests||d.hasScheduledTimers()||d.currentRunLoop||v.waiters&&v.waiters.any(function(e){var t=e[0],r=e[1];return!r.call(t)})||(clearInterval(n),0===--_&&v.adapter.asyncEnd(),d(null,r,t))},10)})}var m=arguments,f=(m[m.length-1],m[0].get),p=m[1]["default"],d=m[2]["default"],g=m[3]["default"],v=m[4]["default"],b=v.registerHelper,y=v.registerAsyncHelper,_=0;y("visit",n),y("click",i),y("keyEvent",o),y("fillIn",s),b("find",u),b("findWithAssert",l),y("wait",h),y("andThen",c),b("currentRouteName",e),b("currentPath",t),b("currentURL",r),y("triggerEvent",a)}),e("ember-testing/initializers",["ember-runtime/system/lazy_load"],function(){var e=arguments,t=(e[e.length-1],e[0].onLoad),r="deferReadiness in `testing` mode";t("Ember.Application",function(e){e.initializers[r]||e.initializer({name:r,initialize:function(e,t){t.testing&&t.deferReadiness()}})})}),e("ember-testing",["ember-metal/core","ember-testing/initializers","ember-testing/support","ember-testing/setup_for_testing","ember-testing/test","ember-testing/adapters/adapter","ember-testing/adapters/qunit","ember-testing/helpers"],function(){var e=arguments,t=(e[e.length-1],e[0]["default"]),r=e[3]["default"],n=e[4]["default"],i=e[5]["default"],a=e[6]["default"];t.Test=n,t.Test.Adapter=i,t.Test.QUnitAdapter=a,t.setupForTesting=r}),e("ember-testing/setup_for_testing",["ember-metal/core","ember-testing/adapters/qunit","ember-views/system/jquery","exports"],function(){function e(){i.pendingAjaxRequests++}function r(){i.pendingAjaxRequests--}function n(){i||(i=t("ember-testing/test")["default"]),s.testing=!0,i.adapter||(i.adapter=l.create()),i.pendingAjaxRequests||(i.pendingAjaxRequests=0),u(document).off("ajaxSend",e),u(document).off("ajaxComplete",r),u(document).on("ajaxSend",e),u(document).on("ajaxComplete",r)}var i,a=arguments,o=a[a.length-1],s=a[0]["default"],l=a[1]["default"],u=a[2]["default"];o["default"]=n}),e("ember-testing/support",["ember-metal/core","ember-views/system/jquery"],function(){function e(e){n('<input type="checkbox">').css({position:"absolute",left:"-1000px",top:"-1000px"}).appendTo("body").on("click",e).trigger("click").remove()}var t=arguments,r=(t[t.length-1],t[0]["default"],t[1]["default"]),n=r;n(function(){e(function(){this.checked||n.event.special.click||(n.event.special.click={trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0}})}),e(function(){})})}),e("ember-testing/test",["ember-metal/core","ember-metal/run_loop","ember-metal/platform","ember-runtime/compare","ember-runtime/ext/rsvp","ember-testing/setup_for_testing","ember-application/system/application","exports"],function(){function e(e,r){var n=p[r].method,i=p[r].meta;return function(){var r=f.call(arguments),a=g.lastPromise;return r.unshift(e),i.wait?(a?t(function(){a=g.resolve(a).then(function(){return n.apply(e,r)})}):a=n.apply(e,r),a):n.apply(e,r)}}function t(e){s.currentRunLoop?e():s(e)}function r(e,t,r,n){e[t]=function(){var e=arguments;return n?r.apply(this,e):this.then(function(){return r.apply(this,e)})}}function n(e,r){var n,i;return g.lastPromise=null,n=e(r),i=g.lastPromise,n&&n instanceof g.Promise||!i?n:(t(function(){i=g.resolve(i).then(function(){return n})}),i)}var i=arguments,a=i[i.length-1],o=i[0]["default"],s=i[1]["default"],l=i[2].create,u=i[3]["default"],c=i[4]["default"],h=i[5]["default"],m=i[6]["default"],f=[].slice,p={},d=[],g={registerHelper:function(e,t){p[e]={method:t,meta:{wait:!1}}},registerAsyncHelper:function(e,t){p[e]={method:t,meta:{wait:!0}}},unregisterHelper:function(e){delete p[e],delete g.Promise.prototype[e]},onInjectHelpers:function(e){d.push(e)},promise:function(e){return new g.Promise(e)},adapter:null,resolve:function(e){return g.promise(function(t){return t(e)})},registerWaiter:function(e,t){1===arguments.length&&(t=e,e=null),this.waiters||(this.waiters=o.A()),this.waiters.push([e,t])},unregisterWaiter:function(e,t){var r;this.waiters&&(1===arguments.length&&(t=e,e=null),r=[e,t],this.waiters=o.A(this.waiters.filter(function(e){return 0!==u(e,r)})))}};m.reopen({testHelpers:{},originalMethods:{},testing:!1,setupForTesting:function(){h(),this.testing=!0,this.Router.reopen({location:"none"})},helperContainer:window,injectTestHelpers:function(t){t&&(this.helperContainer=t),this.testHelpers={};for(var n in p)this.originalMethods[n]=this.helperContainer[n],this.testHelpers[n]=this.helperContainer[n]=e(this,n),r(g.Promise.prototype,n,e(this,n),p[n].meta.wait);for(var i=0,a=d.length;a>i;i++)d[i](this)},removeTestHelpers:function(){for(var e in p)this.helperContainer[e]=this.originalMethods[e],delete this.testHelpers[e],delete this.originalMethods[e]}}),g.Promise=function(){c.Promise.apply(this,arguments),g.lastPromise=this},g.Promise.prototype=l(c.Promise.prototype),g.Promise.prototype.constructor=g.Promise;var v=c.Promise.prototype.then;g.Promise.prototype.then=function(e,t){return v.call(this,function(t){return n(e,t)},t)},a["default"]=g})}(),e("container/container",["container/inheriting_dict","exports"],function(){function e(e){this.parent=e,this.children=[],this.resolver=e&&e.resolver||function(){},this.registry=new y(e&&e.registry),this.cache=new y(e&&e.cache),this.factoryCache=new y(e&&e.factoryCache),this.resolveCache=new y(e&&e.resolveCache),this.typeInjections=new y(e&&e.typeInjections),this.injections={},this.factoryTypeInjections=new y(e&&e.factoryTypeInjections),this.factoryInjections={},this._options=new y(e&&e._options),this._typeOptions=new y(e&&e._typeOptions)}function t(e,t){return e.cache.has(t)?!0:!!e.resolve(t)}function r(e,t,r){if(r=r||{},e.cache.has(t)&&r.singleton!==!1)return e.cache.get(t);var n=h(e,t);return void 0!==n?(a(e,t)&&r.singleton!==!1&&e.cache.set(t,n),n):void 0}function n(e){throw new Error(e+" is not currently supported on child containers")}function a(e,t){var r=s(e,t,"singleton");return r!==!1}function o(e,t){var n={};if(!t)return n;for(var i,a,o=0,s=t.length;s>o;o++){if(i=t[o],a=r(e,i.fullName),void 0===a)throw new Error("Attempting to inject an unknown injection: `"+i.fullName+"`");n[i.property]=a}return n}function s(e,t,r){var n=e._options.get(t);if(n&&void 0!==n[r])return n[r];var i=t.split(":")[0];return n=e._typeOptions.get(i),n?n[r]:void 0}function l(e,t){var r,n=t,a=e.resolve(n),o=e.factoryCache,s=t.split(":")[0];if(void 0!==a){if(o.has(t))return o.get(t);if(!a||"function"!=typeof a.extend||!i.MODEL_FACTORY_INJECTIONS&&"model"===s)return a;var l=u(e,t),h=c(e,t);return h._toString=e.makeToString(a,t),r=a.extend(l),r.reopenClass(h),o.set(t,r),r}}function u(e,t){var r=t.split(":"),n=r[0],i=[];return i=i.concat(e.typeInjections.get(n)||[]),i=i.concat(e.injections[t]||[]),i=o(e,i),i._debugContainerKey=t,i.container=e,i}function c(e,t){var r=t.split(":"),n=r[0],i=[];return i=i.concat(e.factoryTypeInjections.get(n)||[]),i=i.concat(e.factoryInjections[t]||[]),i=o(e,i),i._debugContainerKey=t,i}function h(e,t){var r=l(e,t);return s(e,t,"instantiate")===!1?r:r?"function"==typeof r.extend?r.create():r.create(u(e,t)):void 0}function m(e,t){e.cache.eachLocal(function(r,n){s(e,r,"instantiate")!==!1&&t(n)})}function f(e){e.cache.eachLocal(function(t,r){s(e,t,"instantiate")!==!1&&r.destroy()}),e.cache.dict={}}function p(e,t,r,n){var i=e.get(t);i||(i=[],e.set(t,i)),i.push({property:r,fullName:n})}function d(e){if(!_.test(e))throw new TypeError("Invalid Fullname, expected: `type:name` got: "+e)}function g(e,t,r,n){var i=e[t]=e[t]||[];i.push({property:r,fullName:n})}var v=arguments,b=v[v.length-1],y=v[0]["default"];e.prototype={parent:null,children:null,resolver:null,registry:null,cache:null,typeInjections:null,injections:null,_options:null,_typeOptions:null,child:function(){var t=new e(this);return this.children.push(t),t},set:function(e,t,r){e[t]=r},register:function(e,t,r){if(d(e),void 0===t)throw new TypeError("Attempting to register an unknown factory: `"+e+"`");var n=this.normalize(e);if(this.cache.has(n))throw new Error("Cannot re-register: `"+e+"`, as it has already been looked up.");this.registry.set(n,t),this._options.set(n,r||{})},unregister:function(e){d(e);var t=this.normalize(e);this.registry.remove(t),this.cache.remove(t),this.factoryCache.remove(t),this.resolveCache.remove(t),this._options.remove(t)},resolve:function(e){d(e);var t=this.normalize(e),r=this.resolveCache.get(t);if(r)return r;var n=this.resolver(t)||this.registry.get(t);return this.resolveCache.set(t,n),n},describe:function(e){return e},normalize:function(e){return e},makeToString:function(e){return e.toString()},lookup:function(e,t){return d(e),r(this,this.normalize(e),t)},lookupFactory:function(e){return d(e),l(this,this.normalize(e))},has:function(e){return d(e),t(this,this.normalize(e))},optionsForType:function(e,t){this.parent&&n("optionsForType"),this._typeOptions.set(e,t)},options:function(e,t){this.optionsForType(e,t)},typeInjection:function(e,t,r){d(r),this.parent&&n("typeInjection");var i=r.split(":")[0];if(i===e)throw new Error("Cannot inject a `"+r+"` on other "+e+"(s). Register the `"+r+"` as a different type and perform the typeInjection.");p(this.typeInjections,e,t,r)},injection:function(e,t,r){this.parent&&n("injection"),d(r);var i=this.normalize(r);if(-1===e.indexOf(":"))return this.typeInjection(e,t,i);d(e);var a=this.normalize(e);g(this.injections,a,t,i)},factoryTypeInjection:function(e,t,r){this.parent&&n("factoryTypeInjection"),p(this.factoryTypeInjections,e,t,this.normalize(r))},factoryInjection:function(e,t,r){this.parent&&n("injection");var i=this.normalize(e),a=this.normalize(r);return d(r),-1===e.indexOf(":")?this.factoryTypeInjection(i,t,a):(d(e),g(this.factoryInjections,i,t,a),void 0)},destroy:function(){for(var e=0,t=this.children.length;t>e;e++)this.children[e].destroy();this.children=[],m(this,function(e){e.destroy()}),this.parent=void 0,this.isDestroyed=!0},reset:function(){for(var e=0,t=this.children.length;t>e;e++)f(this.children[e]);f(this)}};var _=/^[^:]+.+:[^:]+$/;b["default"]=e}),e("ember-runtime/ext/rsvp",["ember-metal/core","ember-metal/logger","exports"],function(){var e,r=arguments,n=r[r.length-1],i=r[0]["default"],a=r[1]["default"],o=t("rsvp"),s="ember-testing/test";o.onerrorDefault=function(r){if(r instanceof Error)if(i.testing){if(!e&&i.__loader.registry[s]&&(e=t(s)["default"]),!e||!e.adapter)throw r;e.adapter.exception(r)}else i.onerror?i.onerror(r):a.error(r.stack)},o.on("error",o.onerrorDefault),n["default"]=o}),e("ember-runtime/system/container",["ember-metal/property_set","exports"],function(){var e=arguments,r=e[e.length-1],n=e[0]["default"],i=t("container")["default"];i.set=n,r["default"]=i}),function(){function e(e){return function(){throw new i.Error(e)}}function r(t){var r=" has been moved into a plugin: https://github.com/emberjs/ember-states";return{extend:e(t+r),create:e(t+r)}}t("ember-metal"),t("ember-runtime"),t("ember-handlebars"),t("ember-views"),t("ember-routing"),t("ember-application"),t("ember-extension-support"),i.__loader.registry["ember-testing"]&&t("ember-testing"),i.StateManager=r("Ember.StateManager"),i.State=r("Ember.State")}()}(),"undefined"==typeof location||"localhost"!==location.hostname&&"127.0.0.1"!==location.hostname||Ember.Logger.warn("You are running a production build of Ember on localhost and won't receive detailed error messages. If you want full error messages please use the non-minified build provided on the Ember website.");
/*!
 * @overview  Ember Data
 * @copyright Copyright 2011-2014 Tilde Inc. and contributors.
 *            Portions Copyright 2011 LivingSocial Inc.
 * @license   Licensed under MIT license (see license.js)
 * @version   1.0.0-beta.8+canary.2e8c5723
 */

!function(a){var b,c,d,e;!function(){var a={},f={};b=function(b,c,d){a[b]={deps:c,callback:d}},e=d=c=function(b){function d(a){if("."!==a.charAt(0))return a;for(var c=a.split("/"),d=b.split("/").slice(0,-1),e=0,f=c.length;f>e;e++){var g=c[e];if(".."===g)d.pop();else{if("."===g)continue;d.push(g)}}return d.join("/")}if(e._eak_seen=a,f[b])return f[b];if(f[b]={},!a[b])throw new Error("Could not find module "+b);for(var g,h=a[b],i=h.deps,j=h.callback,k=[],l=0,m=i.length;m>l;l++)k.push("exports"===i[l]?g={}:c(d(i[l])));var n=j.apply(this,k);return f[b]=g||n}}(),b("activemodel-adapter/lib/main",["./system","exports"],function(a,b){"use strict";var c=a.ActiveModelAdapter,d=a.ActiveModelSerializer,e=a.EmbeddedRecordsMixin;b.ActiveModelAdapter=c,b.ActiveModelSerializer=d,b.EmbeddedRecordsMixin=e}),b("activemodel-adapter/lib/setup-container",["../../ember-data/lib/system/container_proxy","./system/active_model_serializer","./system/active_model_adapter","exports"],function(a,b,c,d){"use strict";var e=a["default"],f=b["default"],g=c["default"];d["default"]=function(a){var b=new e(a);b.registerDeprecations([{deprecated:"serializer:_ams",valid:"serializer:-active-model"},{deprecated:"adapter:_ams",valid:"adapter:-active-model"}]),a.register("serializer:-active-model",f),a.register("adapter:-active-model",g)}}),b("activemodel-adapter/lib/system",["./system/embedded_records_mixin","./system/active_model_adapter","./system/active_model_serializer","exports"],function(a,b,c,d){"use strict";var e=a["default"],f=b["default"],g=c["default"];d.EmbeddedRecordsMixin=e,d.ActiveModelAdapter=f,d.ActiveModelSerializer=g}),b("activemodel-adapter/lib/system/active_model_adapter",["../../../ember-data/lib/adapters","../../../ember-data/lib/system/adapter","../../../ember-inflector/lib/main","./active_model_serializer","./embedded_records_mixin","exports"],function(a,b,c,d,e,f){"use strict";var g=a.RESTAdapter,h=b.InvalidError,i=c.pluralize,j=(d["default"],e["default"],Ember.EnumerableUtils.forEach),k=Ember.String.decamelize,l=Ember.String.underscore,m=g.extend({defaultSerializer:"-active-model",pathForType:function(a){var b=k(a),c=l(b);return i(c)},ajaxError:function(a){var b=this._super(a);if(a&&422===a.status){var c=Ember.$.parseJSON(a.responseText),d={};if(void 0!==c.errors){var e=c.errors;j(Ember.keys(e),function(a){d[Ember.String.camelize(a)]=e[a]})}return new h(d)}return b}});f["default"]=m}),b("activemodel-adapter/lib/system/active_model_serializer",["../../../ember-inflector/lib/main","../../../ember-data/lib/serializers/rest_serializer","exports"],function(a,b,c){"use strict";var d=a.singularize,e=b["default"],f=Ember.get,g=Ember.EnumerableUtils.forEach,h=Ember.String.camelize,i=Ember.String.capitalize,j=Ember.String.decamelize,k=Ember.String.underscore,l=e.extend({keyForAttribute:function(a){return j(a)},keyForRelationship:function(a,b){return a=j(a),"belongsTo"===b?a+"_id":"hasMany"===b?d(a)+"_ids":a},serializeHasMany:Ember.K,serializeIntoHash:function(a,b,c,d){var e=k(j(b.typeKey));a[e]=this.serialize(c,d)},serializePolymorphicType:function(a,b,c){var d=c.key,e=f(a,d);e&&(d=this.keyForAttribute(d),b[d+"_type"]=i(e.constructor.typeKey))},normalize:function(a,b,c){return this.normalizeLinks(b),this._super(a,b,c)},normalizeLinks:function(a){if(a.links){var b=a.links;for(var c in b){var d=h(c);d!==c&&(b[d]=b[c],delete b[c])}}},normalizeRelationships:function(a,b){var c,d;this.keyForRelationship&&a.eachRelationship(function(a,e){if(e.options.polymorphic){if(c=this.keyForAttribute(a),d=b[c],d&&d.type)d.type=this.typeForRoot(d.type);else if(d&&"hasMany"===e.kind){var f=this;g(d,function(a){a.type=f.typeForRoot(a.type)})}}else c=this.keyForRelationship(a,e.kind),d=b[c];b[a]=d,a!==c&&delete b[c]},this)}});c["default"]=l}),b("activemodel-adapter/lib/system/embedded_records_mixin",["../../../ember-inflector/lib/main","exports"],function(a,b){"use strict";function c(a,b){var c=h(a,b);return c&&"always"===c.embedded}function d(a,b){var d=c(a,b),e=h(a,b);return d||e&&"records"===e.serialize}function e(a,b){var c=h(a,b);return c&&("ids"===c.serialize||"id"===c.serialize)}function f(a,b){{var c=h(a,b);d(a,b),e(a,b)}return!(c&&(c.serialize||c.embedded))}function g(a,b){var d=c(a,b),e=h(a,b),f=e&&(e.deserialize||e.serialize);return d||f}function h(a,b){return a&&(a[Ember.String.camelize(b)]||a[b])}function i(a,b,c,d,e){var f=l(a,"attrs");f&&c.eachRelationship(function(c,h){g(f,c)&&("hasMany"===h.kind&&j(a,b,c,h,d,e),"belongsTo"===h.kind&&k(a,b,c,h,d,e))})}function j(a,b,c,d,e,f){var g=b.serializerFor(d.type.typeKey),h=l(a,"primaryKey"),j=d.type.typeKey,k="_"+a.typeForRoot(d.type.typeKey),n=a.keyForRelationship(c,d.kind),o=a.keyForAttribute(c),p=[];f[o]&&(e[k]=e[k]||[],m(f[o],function(a){var c=b.modelFor(j);i(g,b,c,e,a),p.push(a[h]),e[k].push(a)}),f[n]=p,delete f[o])}function k(a,b,c,d,e,f){var h=a.get("attrs");if(h&&(g(h,Ember.String.camelize(c))||g(h,c))){var j=d.type.typeKey,k=b.serializerFor(d.type.typeKey),m=(l(k,"primaryKey"),Ember.String.pluralize(j)),n=k.keyForRelationship(c,d.kind),o=k.keyForAttribute(c);if(f[o]){e[m]=e[m]||[];var p=b.modelFor(d.type.typeKey);i(k,b,p,e,f[o]),f[n]=f[o].id,e[m].push(f[o]),f[o][d.parentType.typeKey+"_id"]=f.id,delete f[o]}}}var l=Ember.get,m=Ember.EnumerableUtils.forEach,n=(Ember.String.camelize,a.pluralize),o=Ember.Mixin.create({serializeBelongsTo:function(a,b,c){var g=c.key,h=this.get("attrs"),i=e(h,g)||f(h,g),j=d(h,g),k=a.get(g);if(i)m=this.keyForRelationship(g,c.kind),b[m]=k?l(k,"id"):null;else if(j){var m=this.keyForRelationship(g);k?(b[m]=k.serialize({includeId:!0}),this.removeEmbeddedForeignKey(a,k,c,b[m])):b[m]=null}},serializeHasMany:function(a,b,c){var f,g=c.key,h=this.get("attrs"),i=e(h,g),j=d(h,g);i?(f=this.keyForRelationship(g,c.kind),b[f]=l(a,g).mapBy("id")):j&&(f=this.keyForAttribute(g),b[f]=l(a,g).map(function(b){var d=b.serialize({includeId:!0});return this.removeEmbeddedForeignKey(a,b,c,d),d},this))},removeEmbeddedForeignKey:function(a,b,c,d){if("hasMany"!==c.kind&&"belongsTo"===c.kind){var e=a.constructor.inverseFor(c.key);if(e){var f=e.name,g=this.store.serializerFor(b.constructor),h=g.keyForRelationship(f,e.kind);h&&delete d[h]}}},extractSingle:function(a,b,c,d){var e=this.keyForAttribute(b.typeKey),f=c[e];return i(this,a,b,c,f),this._super(a,b,c,d)},extractArray:function(a,b,c){var d=this.keyForAttribute(b.typeKey),e=c[n(d)];return m(e,function(d){i(this,a,b,c,d)},this),this._super(a,b,c)}});b["default"]=o}),b("ember-data/lib/adapters",["./adapters/fixture_adapter","./adapters/rest_adapter","exports"],function(a,b,c){"use strict";var d=a["default"],e=b["default"];c.RESTAdapter=e,c.FixtureAdapter=d}),b("ember-data/lib/adapters/fixture_adapter",["../system/adapter","exports"],function(a,b){"use strict";var c=Ember.get,d=Ember.String.fmt,e=Ember.EnumerableUtils.indexOf,f=0,g=a["default"],h=g.extend({serializer:null,simulateRemoteResponse:!0,latency:50,fixturesForType:function(a){if(a.FIXTURES){var b=Ember.A(a.FIXTURES);return b.map(function(a){var b=typeof a.id;if("number"!==b&&"string"!==b)throw new Error(d("the id property must be defined as a number or string for fixture %@",[a]));return a.id=a.id+"",a})}return null},queryFixtures:function(){},updateFixtures:function(a,b){a.FIXTURES||(a.FIXTURES=[]);var c=a.FIXTURES;this.deleteLoadedFixture(a,b),c.push(b)},mockJSON:function(a,b,c){return a.serializerFor(b).serialize(c,{includeId:!0})},generateIdForRecord:function(){return"fixture-"+f++},find:function(a,b,c){var d,e=this.fixturesForType(b);return e&&(d=Ember.A(e).findProperty("id",c)),d?this.simulateRemoteCall(function(){return d},this):void 0},findMany:function(a,b,c){var d=this.fixturesForType(b);return d&&(d=d.filter(function(a){return-1!==e(c,a.id)})),d?this.simulateRemoteCall(function(){return d},this):void 0},findAll:function(a,b){var c=this.fixturesForType(b);return this.simulateRemoteCall(function(){return c},this)},findQuery:function(a,b,c){var d=this.fixturesForType(b);return d=this.queryFixtures(d,c,b),d?this.simulateRemoteCall(function(){return d},this):void 0},createRecord:function(a,b,c){var d=this.mockJSON(a,b,c);return this.updateFixtures(b,d),this.simulateRemoteCall(function(){return d},this)},updateRecord:function(a,b,c){var d=this.mockJSON(a,b,c);return this.updateFixtures(b,d),this.simulateRemoteCall(function(){return d},this)},deleteRecord:function(a,b,c){var d=this.mockJSON(a,b,c);return this.deleteLoadedFixture(b,d),this.simulateRemoteCall(function(){return null})},deleteLoadedFixture:function(a,b){var c=this.findExistingFixture(a,b);if(c){var d=e(a.FIXTURES,c);return a.FIXTURES.splice(d,1),!0}},findExistingFixture:function(a,b){var d=this.fixturesForType(a),e=c(b,"id");return this.findFixtureById(d,e)},findFixtureById:function(a,b){return Ember.A(a).find(function(a){return""+c(a,"id")==""+b?!0:!1})},simulateRemoteCall:function(a,b){var d=this;return new Ember.RSVP.Promise(function(e){c(d,"simulateRemoteResponse")?Ember.run.later(function(){e(a.call(b))},c(d,"latency")):Ember.run.schedule("actions",null,function(){e(a.call(b))})},"DS: FixtureAdapter#simulateRemoteCall")}});b["default"]=h}),b("ember-data/lib/adapters/rest_adapter",["../system/adapter","exports"],function(a,b){"use strict";var c=a["default"],d=Ember.get,e=(Ember.set,Ember.ArrayPolyfills.forEach),f=c.extend({defaultSerializer:"-rest",find:function(a,b,c){return this.ajax(this.buildURL(b.typeKey,c),"GET")},findAll:function(a,b,c){var d;return c&&(d={since:c}),this.ajax(this.buildURL(b.typeKey),"GET",{data:d})},findQuery:function(a,b,c){return this.ajax(this.buildURL(b.typeKey),"GET",{data:c})},findMany:function(a,b,c){return this.ajax(this.buildURL(b.typeKey),"GET",{data:{ids:c}})},findHasMany:function(a,b,c){var e=d(this,"host"),f=d(b,"id"),g=b.constructor.typeKey;return e&&"/"===c.charAt(0)&&"/"!==c.charAt(1)&&(c=e+c),this.ajax(this.urlPrefix(c,this.buildURL(g,f)),"GET")},findBelongsTo:function(a,b,c){var e=d(b,"id"),f=b.constructor.typeKey;return this.ajax(this.urlPrefix(c,this.buildURL(f,e)),"GET")},createRecord:function(a,b,c){var d={},e=a.serializerFor(b.typeKey);return e.serializeIntoHash(d,b,c,{includeId:!0}),this.ajax(this.buildURL(b.typeKey),"POST",{data:d})},updateRecord:function(a,b,c){var e={},f=a.serializerFor(b.typeKey);f.serializeIntoHash(e,b,c);var g=d(c,"id");return this.ajax(this.buildURL(b.typeKey,g),"PUT",{data:e})},deleteRecord:function(a,b,c){var e=d(c,"id");return this.ajax(this.buildURL(b.typeKey,e),"DELETE")},buildURL:function(a,b){var c=[],e=d(this,"host"),f=this.urlPrefix();return a&&c.push(this.pathForType(a)),b&&c.push(b),f&&c.unshift(f),c=c.join("/"),!e&&c&&(c="/"+c),c},urlPrefix:function(a,b){var c=d(this,"host"),e=d(this,"namespace"),f=[];return a?"/"===a.charAt(0)?c&&(a=a.slice(1),f.push(c)):/^http(s)?:\/\//.test(a)||f.push(b):(c&&f.push(c),e&&f.push(e)),a&&f.push(a),f.join("/")},pathForType:function(a){var b=Ember.String.camelize(a);return Ember.String.pluralize(b)},ajaxError:function(a){return a&&"object"==typeof a&&(a.then=null),a},ajax:function(a,b,c){var d=this;return new Ember.RSVP.Promise(function(e,f){c=d.ajaxOptions(a,b,c),c.success=function(a){Ember.run(null,e,a)},c.error=function(a){Ember.run(null,f,d.ajaxError(a))},Ember.$.ajax(c)},"DS: RestAdapter#ajax "+b+" to "+a)},ajaxOptions:function(a,b,c){c=c||{},c.url=a,c.type=b,c.dataType="json",c.context=this,c.data&&"GET"!==b&&(c.contentType="application/json; charset=utf-8",c.data=JSON.stringify(c.data));var f=d(this,"headers");return void 0!==f&&(c.beforeSend=function(a){e.call(Ember.keys(f),function(b){a.setRequestHeader(b,f[b])})}),c}});b["default"]=f}),b("ember-data/lib/core",["exports"],function(a){"use strict";var b;"undefined"==typeof b&&(b=Ember.Namespace.create({VERSION:"1.0.0-beta.8+canary.2e8c5723"}),Ember.libraries&&Ember.libraries.registerCoreLibrary("Ember Data",b.VERSION)),a["default"]=b}),b("ember-data/lib/ember-initializer",["./setup-container"],function(a){"use strict";var b=a["default"],c=Ember.K;Ember.onLoad("Ember.Application",function(a){a.initializer({name:"ember-data",initialize:b}),a.initializer({name:"store",after:"ember-data",initialize:c}),a.initializer({name:"activeModelAdapter",before:"store",initialize:c}),a.initializer({name:"transforms",before:"store",initialize:c}),a.initializer({name:"data-adapter",before:"store",initialize:c}),a.initializer({name:"injectStore",before:"store",initialize:c})})}),b("ember-data/lib/ext/date",[],function(){"use strict";Ember.Date=Ember.Date||{};var a=Date.parse,b=[1,4,5,6,7,10,11];Ember.Date.parse=function(c){var d,e,f=0;if(e=/^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(c)){for(var g,h=0;g=b[h];++h)e[g]=+e[g]||0;e[2]=(+e[2]||1)-1,e[3]=+e[3]||1,"Z"!==e[8]&&void 0!==e[9]&&(f=60*e[10]+e[11],"+"===e[9]&&(f=0-f)),d=Date.UTC(e[1],e[2],e[3],e[4],e[5]+f,e[6],e[7])}else d=a?a(c):0/0;return d},(Ember.EXTEND_PROTOTYPES===!0||Ember.EXTEND_PROTOTYPES.Date)&&(Date.parse=Ember.Date.parse)}),b("ember-data/lib/initializers/data_adapter",["../system/debug/debug_adapter","exports"],function(a,b){"use strict";var c=a["default"];b["default"]=function(a){a.register("data-adapter:main",c)}}),b("ember-data/lib/initializers/store",["../serializers","../adapters","../system/container_proxy","../system/store","exports"],function(a,b,c,d,e){"use strict";var f=a.JSONSerializer,g=a.RESTSerializer,h=b.RESTAdapter,i=c["default"],j=d["default"];e["default"]=function(a,b){a.register("store:main",a.lookupFactory("store:application")||b&&b.Store||j);var c=new i(a);c.registerDeprecations([{deprecated:"serializer:_default",valid:"serializer:-default"},{deprecated:"serializer:_rest",valid:"serializer:-rest"},{deprecated:"adapter:_rest",valid:"adapter:-rest"}]),a.register("serializer:-default",f),a.register("serializer:-rest",g),a.register("adapter:-rest",h),a.lookup("store:main")}}),b("ember-data/lib/initializers/store_injections",["exports"],function(a){"use strict";a["default"]=function(a){a.injection("controller","store","store:main"),a.injection("route","store","store:main"),a.injection("serializer","store","store:main"),a.injection("data-adapter","store","store:main")}}),b("ember-data/lib/initializers/transforms",["../transforms","exports"],function(a,b){"use strict";var c=a.BooleanTransform,d=a.DateTransform,e=a.StringTransform,f=a.NumberTransform;b["default"]=function(a){a.register("transform:boolean",c),a.register("transform:date",d),a.register("transform:number",f),a.register("transform:string",e)}}),b("ember-data/lib/main",["./core","./ext/date","./system/store","./system/model","./system/changes","./system/adapter","./system/debug","./system/record_arrays","./system/record_array_manager","./adapters","./serializers/json_serializer","./serializers/rest_serializer","../../ember-inflector/lib/main","../../activemodel-adapter/lib/main","./transforms","./system/relationships","./ember-initializer","./setup-container","./system/container_proxy","exports"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t){"use strict";Ember.RSVP.Promise.cast=Ember.RSVP.Promise.cast||Ember.RSVP.resolve;var u=a["default"],v=c.Store,w=c.PromiseArray,x=c.PromiseObject,y=d.Model,z=d.Errors,A=d.RootState,B=d.attr,C=e.AttributeChange,D=e.RelationshipChange,E=e.RelationshipChangeAdd,F=(e.RelationshipChangeRemove,e.OneToManyChange),G=(e.ManyToNoneChange,e.OneToOneChange),H=e.ManyToManyChange,I=f.InvalidError,J=f.Adapter,K=g["default"],L=h.RecordArray,M=h.FilteredRecordArray,N=h.AdapterPopulatedRecordArray,O=h.ManyArray,P=i["default"],Q=j.RESTAdapter,R=j.FixtureAdapter,S=k["default"],T=l["default"],U=n.ActiveModelAdapter,V=n.ActiveModelSerializer,W=n.EmbeddedRecordsMixin,X=o.Transform,Y=o.DateTransform,Z=o.NumberTransform,$=o.StringTransform,_=o.BooleanTransform,ab=p.hasMany,bb=p.belongsTo,cb=r["default"],db=s["default"];u.Store=v,u.PromiseArray=w,u.PromiseObject=x,u.Model=y,u.RootState=A,u.attr=B,u.Errors=z,u.AttributeChange=C,u.RelationshipChange=D,u.RelationshipChangeAdd=E,u.OneToManyChange=F,u.ManyToNoneChange=F,u.OneToOneChange=G,u.ManyToManyChange=H,u.Adapter=J,u.InvalidError=I,u.DebugAdapter=K,u.RecordArray=L,u.FilteredRecordArray=M,u.AdapterPopulatedRecordArray=N,u.ManyArray=O,u.RecordArrayManager=P,u.RESTAdapter=Q,u.FixtureAdapter=R,u.RESTSerializer=T,u.JSONSerializer=S,u.Transform=X,u.DateTransform=Y,u.StringTransform=$,u.NumberTransform=Z,u.BooleanTransform=_,u.ActiveModelAdapter=U,u.ActiveModelSerializer=V,u.EmbeddedRecordsMixin=W,u.belongsTo=bb,u.hasMany=ab,u.ContainerProxy=db,u._setupContainer=cb,Ember.lookup.DS=u,t["default"]=u}),b("ember-data/lib/serializers",["./serializers/json_serializer","./serializers/rest_serializer","exports"],function(a,b,c){"use strict";var d=a["default"],e=b["default"];c.JSONSerializer=d,c.RESTSerializer=e}),b("ember-data/lib/serializers/json_serializer",["../system/changes","exports"],function(a,b){"use strict";var c=a.RelationshipChange,d=Ember.get,e=(Ember.set,Ember.isNone),f=Ember.ArrayPolyfills.map,g=Ember.Object.extend({primaryKey:"id",applyTransforms:function(a,b){return a.eachTransformedAttribute(function(a,c){var d=this.transformFor(c);b[a]=d.deserialize(b[a])},this),b},normalize:function(a,b){return b?(this.normalizeId(b),this.normalizeUsingDeclaredMapping(a,b),this.applyTransforms(a,b),b):b},normalizeUsingDeclaredMapping:function(a,b){var c,e,f=d(this,"attrs");if(f)for(e in f)c=f[e],c&&c.key&&(c=c.key),"string"==typeof c&&(b[e]=b[c],delete b[c])},normalizeId:function(a){var b=d(this,"primaryKey");"id"!==b&&(a.id=a[b],delete a[b])},serialize:function(a,b){var c={};if(b&&b.includeId){var e=d(a,"id");e&&(c[d(this,"primaryKey")]=e)}return a.eachAttribute(function(b,d){this.serializeAttribute(a,c,b,d)},this),a.eachRelationship(function(b,d){"belongsTo"===d.kind?this.serializeBelongsTo(a,c,d):"hasMany"===d.kind&&this.serializeHasMany(a,c,d)},this),c},serializeAttribute:function(a,b,c,e){var f=d(this,"attrs"),g=d(a,c),h=e.type;if(h){var i=this.transformFor(h);g=i.serialize(g)}c=f&&f[c]||(this.keyForAttribute?this.keyForAttribute(c):c),b[c]=g},serializeBelongsTo:function(a,b,c){var f=c.key,g=d(a,f);f=this.keyForRelationship?this.keyForRelationship(f,"belongsTo"):f,b[f]=e(g)?g:d(g,"id"),c.options.polymorphic&&this.serializePolymorphicType(a,b,c)},serializeHasMany:function(a,b,e){var f=e.key,g=this.keyForRelationship?this.keyForRelationship(f,"hasMany"):f,h=c.determineRelationshipType(a.constructor,e);("manyToNone"===h||"manyToMany"===h)&&(b[g]=d(a,f).mapBy("id"))},serializePolymorphicType:Ember.K,extract:function(a,b,c,d,e){this.extractMeta(a,b,c);var f="extract"+e.charAt(0).toUpperCase()+e.substr(1);return this[f](a,b,c,d,e)},extractFindAll:function(a,b,c){return this.extractArray(a,b,c)},extractFindQuery:function(a,b,c){return this.extractArray(a,b,c)},extractFindMany:function(a,b,c){return this.extractArray(a,b,c)},extractFindHasMany:function(a,b,c){return this.extractArray(a,b,c)},extractCreateRecord:function(a,b,c){return this.extractSave(a,b,c)},extractUpdateRecord:function(a,b,c){return this.extractSave(a,b,c)},extractDeleteRecord:function(a,b,c){return this.extractSave(a,b,c)},extractFind:function(a,b,c){return this.extractSingle(a,b,c)},extractFindBelongsTo:function(a,b,c){return this.extractSingle(a,b,c)},extractSave:function(a,b,c){return this.extractSingle(a,b,c)},extractSingle:function(a,b,c){return this.normalize(b,c)},extractArray:function(a,b,c){var d=this;return f.call(c,function(a){return d.normalize(b,a)})},extractMeta:function(a,b,c){c&&c.meta&&(a.metaForType(b,c.meta),delete c.meta)},transformFor:function(a){var b=this.container.lookup("transform:"+a);return b}});b["default"]=g}),b("ember-data/lib/serializers/rest_serializer",["./json_serializer","ember-inflector/lib/system/string","exports"],function(a,b,c){"use strict";function d(a){return null==a?null:a+""}var e=a["default"],f=Ember.get,g=(Ember.set,Ember.ArrayPolyfills.forEach),h=Ember.ArrayPolyfills.map,i=b.singularize,j=Ember.String.camelize,k=e.extend({normalize:function(a,b,c){return this.normalizeId(b),this.normalizeAttributes(a,b),this.normalizeRelationships(a,b),this.normalizeUsingDeclaredMapping(a,b),this.normalizeHash&&this.normalizeHash[c]&&this.normalizeHash[c](b),this.applyTransforms(a,b),b},normalizePayload:function(a){return a},normalizeAttributes:function(a,b){var c;this.keyForAttribute&&a.eachAttribute(function(a){c=this.keyForAttribute(a),a!==c&&(b[a]=b[c],delete b[c])},this)},normalizeRelationships:function(a,b){var c;this.keyForRelationship&&a.eachRelationship(function(a,d){c=this.keyForRelationship(a,d.kind),a!==c&&(b[a]=b[c],delete b[c])},this)},extractSingle:function(a,b,c,e){c=this.normalizePayload(c);var f,h=b.typeKey;for(var i in c){var j=this.typeForRoot(i),k=a.modelFor(j),l=k.typeKey===h;l&&"array"!==Ember.typeOf(c[i])?f=this.normalize(b,c[i],i):g.call(c[i],function(b){var c=this.typeForRoot(i),g=a.modelFor(c),h=a.serializerFor(g);b=h.normalize(g,b,i);var j=l&&!e&&!f,k=l&&d(b.id)===e;j||k?f=b:a.push(c,b)},this)}return f},extractArray:function(a,b,c){c=this.normalizePayload(c);var d,e=b.typeKey;for(var f in c){var g=f,i=!1;"_"===f.charAt(0)&&(i=!0,g=f.substr(1));var j=this.typeForRoot(g),k=a.modelFor(j),l=a.serializerFor(k),m=!i&&k.typeKey===e,n=h.call(c[f],function(a){return l.normalize(k,a,f)},this);m?d=n:a.pushMany(j,n)}return d},pushPayload:function(a,b){b=this.normalizePayload(b);for(var c in b){var d=this.typeForRoot(c),e=a.modelFor(d),f=a.serializerFor(e),g=h.call(Ember.makeArray(b[c]),function(a){return f.normalize(e,a,c)},this);a.pushMany(d,g)}},typeForRoot:function(a){return j(i(a))},serialize:function(){return this._super.apply(this,arguments)},serializeIntoHash:function(a,b,c,d){a[b.typeKey]=this.serialize(c,d)},serializePolymorphicType:function(a,b,c){var d=c.key,e=f(a,d);d=this.keyForAttribute?this.keyForAttribute(d):d,b[d+"Type"]=e.constructor.typeKey}});c["default"]=k}),b("ember-data/lib/setup-container",["./initializers/store","./initializers/transforms","./initializers/store_injections","./initializers/data_adapter","../../../activemodel-adapter/lib/setup-container","exports"],function(a,b,c,d,e,f){"use strict";var g=a["default"],h=b["default"],i=c["default"],j=d["default"],k=e["default"];f["default"]=function(a,b){j(a,b),h(a,b),i(a,b),g(a,b),k(a,b)}}),b("ember-data/lib/system/adapter",["exports"],function(a){"use strict";var b=Ember.get,c=(Ember.set,Ember.ArrayPolyfills.map),d=["description","fileName","lineNumber","message","name","number","stack"],e=function(a){var b=Error.prototype.constructor.call(this,"The backend rejected the commit because it was invalid: "+Ember.inspect(a));this.errors=a;for(var c=0,e=d.length;e>c;c++)this[d[c]]=b[d[c]]};e.prototype=Ember.create(Error.prototype);var f=Ember.Object.extend({find:Ember.required(Function),findAll:null,findQuery:null,generateIdForRecord:null,serialize:function(a,c){return b(a,"store").serializerFor(a.constructor.typeKey).serialize(a,c)},createRecord:Ember.required(Function),updateRecord:Ember.required(Function),deleteRecord:Ember.required(Function),findMany:function(a,b,d){var e=c.call(d,function(c){return this.find(a,b,c)},this);return Ember.RSVP.all(e)}});a.InvalidError=e,a.Adapter=f,a["default"]=f}),b("ember-data/lib/system/changes",["./changes/attribute_change","./changes/relationship_change","exports"],function(a,b,c){"use strict";var d=a["default"],e=b.RelationshipChange,f=b.RelationshipChangeAdd,g=b.RelationshipChangeRemove,h=b.OneToManyChange,i=b.ManyToNoneChange,j=b.OneToOneChange,k=b.ManyToManyChange;c.AttributeChange=d,c.RelationshipChange=e,c.RelationshipChangeAdd=f,c.RelationshipChangeRemove=g,c.OneToManyChange=h,c.ManyToNoneChange=i,c.OneToOneChange=j,c.ManyToManyChange=k}),b("ember-data/lib/system/changes/attribute_change",["exports"],function(a){"use strict";function b(a){this.record=a.record,this.store=a.store,this.name=a.name,this.value=a.value,this.oldValue=a.oldValue}b.createChange=function(a){return new b(a)},b.prototype={sync:function(){this.value!==this.oldValue&&(this.record.send("becomeDirty"),this.record.updateRecordArraysLater()),this.destroy()},destroy:function(){delete this.record._changesToSync[this.name]}},a["default"]=b}),b("ember-data/lib/system/changes/relationship_change",["../model","exports"],function(a,b){"use strict";function c(a){return"object"==typeof a&&(!a.then||"function"!=typeof a.then)}var d=a.Model,e=Ember.get,f=Ember.set,g=Ember.EnumerableUtils.forEach,h=function(a){this.parentRecord=a.parentRecord,this.childRecord=a.childRecord,this.firstRecord=a.firstRecord,this.firstRecordKind=a.firstRecordKind,this.firstRecordName=a.firstRecordName,this.secondRecord=a.secondRecord,this.secondRecordKind=a.secondRecordKind,this.secondRecordName=a.secondRecordName,this.changeType=a.changeType,this.store=a.store,this.committed={}},i=function(a){h.call(this,a)},j=function(a){h.call(this,a)};h.create=function(a){return new h(a)},i.create=function(a){return new i(a)},j.create=function(a){return new j(a)};var k={},l={},m={},n={},o={};h._createChange=function(a){return"add"===a.changeType?i.create(a):"remove"===a.changeType?j.create(a):void 0},h.determineRelationshipType=function(a,b){var c,d,e=b.key,f=b.kind,g=a.inverseFor(e);return g&&(c=g.name,d=g.kind),g?"belongsTo"===d?"belongsTo"===f?"oneToOne":"manyToOne":"belongsTo"===f?"oneToMany":"manyToMany":"belongsTo"===f?"oneToNone":"manyToNone"},h.createChange=function(a,b,c,d){var e,f=a.constructor;return e=h.determineRelationshipType(f,d),"oneToMany"===e?k.createChange(a,b,c,d):"manyToOne"===e?k.createChange(b,a,c,d):"oneToNone"===e?l.createChange(a,b,c,d):"manyToNone"===e?m.createChange(a,b,c,d):"oneToOne"===e?n.createChange(a,b,c,d):"manyToMany"===e?o.createChange(a,b,c,d):void 0},l.createChange=function(a,b,c,d){var e=d.key,f=h._createChange({parentRecord:b,childRecord:a,firstRecord:a,store:c,changeType:d.changeType,firstRecordName:e,firstRecordKind:"belongsTo"});return c.addRelationshipChangeFor(a,e,b,null,f),f},m.createChange=function(a,b,c,d){var e=d.key,f=h._createChange({parentRecord:a,childRecord:b,secondRecord:a,store:c,changeType:d.changeType,secondRecordName:d.key,secondRecordKind:"hasMany"});return c.addRelationshipChangeFor(a,e,b,null,f),f},o.createChange=function(a,b,c,d){var e=d.key,f=h._createChange({parentRecord:b,childRecord:a,firstRecord:a,secondRecord:b,firstRecordKind:"hasMany",secondRecordKind:"hasMany",store:c,changeType:d.changeType,firstRecordName:e});return c.addRelationshipChangeFor(a,e,b,null,f),f},n.createChange=function(a,b,c,d){var e;d.parentType?e=d.parentType.inverseFor(d.key).name:d.key&&(e=d.key);var f=h._createChange({parentRecord:b,childRecord:a,firstRecord:a,secondRecord:b,firstRecordKind:"belongsTo",secondRecordKind:"belongsTo",store:c,changeType:d.changeType,firstRecordName:e});return c.addRelationshipChangeFor(a,e,b,null,f),f},n.maintainInvariant=function(a,b,c,d){if("add"===a.changeType&&b.recordIsMaterialized(c)){var f=e(c,d);if(f){var g=n.createChange(c,f,b,{parentType:a.parentType,hasManyName:a.hasManyName,changeType:"remove",key:a.key});b.addRelationshipChangeFor(c,d,a.parentRecord,null,g),g.sync()}}},k.createChange=function(a,b,c,d){var e;d.parentType?(e=d.parentType.inverseFor(d.key).name,k.maintainInvariant(d,c,a,e)):d.key&&(e=d.key);var f=h._createChange({parentRecord:b,childRecord:a,firstRecord:a,secondRecord:b,firstRecordKind:"belongsTo",secondRecordKind:"hasMany",store:c,changeType:d.changeType,firstRecordName:e});return c.addRelationshipChangeFor(a,e,b,f.getSecondRecordName(),f),f},k.maintainInvariant=function(a,b,c,d){if("add"===a.changeType&&c){var f=e(c,d);if(f){var g=k.createChange(c,f,b,{parentType:a.parentType,hasManyName:a.hasManyName,changeType:"remove",key:a.key});b.addRelationshipChangeFor(c,d,a.parentRecord,g.getSecondRecordName(),g),g.sync()}}},h.prototype={getSecondRecordName:function(){var a,b=this.secondRecordName;if(!b){if(a=this.secondRecord,!a)return;var c=this.firstRecord.constructor,d=c.inverseFor(this.firstRecordName);this.secondRecordName=d.name}return this.secondRecordName},getFirstRecordName:function(){var a=this.firstRecordName;return a},destroy:function(){var a=this.childRecord,b=this.getFirstRecordName(),c=this.getSecondRecordName(),d=this.store;d.removeRelationshipChangeFor(a,b,this.parentRecord,c,this.changeType)},getSecondRecord:function(){return this.secondRecord},getFirstRecord:function(){return this.firstRecord},coalesce:function(){var a=this.store.relationshipChangePairsFor(this.firstRecord);g(a,function(a){var b=a.add,c=a.remove;b&&c&&(b.destroy(),c.destroy())})}},i.prototype=Ember.create(h.create({})),j.prototype=Ember.create(h.create({})),i.prototype.changeType="add",i.prototype.sync=function(){var a=this.getSecondRecordName(),b=this.getFirstRecordName(),g=this.getFirstRecord(),h=this.getSecondRecord();h instanceof d&&g instanceof d&&("belongsTo"===this.secondRecordKind?h.suspendRelationshipObservers(function(){f(h,a,g)}):"hasMany"===this.secondRecordKind&&h.suspendRelationshipObservers(function(){var b=e(h,a);c(b)&&b.addObject(g)})),g instanceof d&&h instanceof d&&e(g,b)!==h&&("belongsTo"===this.firstRecordKind?g.suspendRelationshipObservers(function(){f(g,b,h)}):"hasMany"===this.firstRecordKind&&g.suspendRelationshipObservers(function(){var a=e(g,b);c(a)&&a.addObject(h)})),this.coalesce()},j.prototype.changeType="remove",j.prototype.sync=function(){var a=this.getSecondRecordName(),b=this.getFirstRecordName(),g=this.getFirstRecord(),h=this.getSecondRecord();h instanceof d&&g instanceof d&&("belongsTo"===this.secondRecordKind?h.suspendRelationshipObservers(function(){f(h,a,null)}):"hasMany"===this.secondRecordKind&&h.suspendRelationshipObservers(function(){var b=e(h,a);c(b)&&b.removeObject(g)})),g instanceof d&&e(g,b)&&("belongsTo"===this.firstRecordKind?g.suspendRelationshipObservers(function(){f(g,b,null)}):"hasMany"===this.firstRecordKind&&g.suspendRelationshipObservers(function(){var a=e(g,b);c(a)&&a.removeObject(h)})),this.coalesce()},b.RelationshipChange=h,b.RelationshipChangeAdd=i,b.RelationshipChangeRemove=j,b.OneToManyChange=k,b.ManyToNoneChange=m,b.OneToOneChange=n,b.ManyToManyChange=o}),b("ember-data/lib/system/container_proxy",["exports"],function(a){"use strict";var b=function(a){this.container=a};b.prototype.aliasedFactory=function(a,b){var c=this;return{create:function(){return b&&b(),c.container.lookup(a)}}},b.prototype.registerAlias=function(a,b,c){var d=this.aliasedFactory(b,c);return this.container.register(a,d)},b.prototype.registerDeprecation=function(a,b){var c=function(){};return this.registerAlias(a,b,c)},b.prototype.registerDeprecations=function(a){for(var b=a.length;b>0;b--){var c=a[b-1],d=c.deprecated,e=c.valid;this.registerDeprecation(d,e)}},a["default"]=b}),b("ember-data/lib/system/debug",["./debug/debug_info","./debug/debug_adapter","exports"],function(a,b,c){"use strict";var d=b["default"];c["default"]=d}),b("ember-data/lib/system/debug/debug_adapter",["../model","exports"],function(a,b){"use strict";var c=a.Model,d=Ember.get,e=Ember.String.capitalize,f=Ember.String.underscore,g=Ember.DataAdapter.extend({getFilters:function(){return[{name:"isNew",desc:"New"},{name:"isModified",desc:"Modified"},{name:"isClean",desc:"Clean"}]},detect:function(a){return a!==c&&c.detect(a)},columnsForType:function(a){var b=[{name:"id",desc:"Id"}],c=0,g=this;return d(a,"attributes").forEach(function(a){if(c++>g.attributeLimit)return!1;var d=e(f(a).replace("_"," "));b.push({name:a,desc:d})}),b},getRecords:function(a){return this.get("store").all(a)},getRecordColumnValues:function(a){var b=this,c=0,e={id:d(a,"id")};return a.eachAttribute(function(f){if(c++>b.attributeLimit)return!1;var g=d(a,f);e[f]=g}),e},getRecordKeywords:function(a){var b=[],c=Ember.A(["id"]);return a.eachAttribute(function(a){c.push(a)}),c.forEach(function(c){b.push(d(a,c))}),b},getRecordFilterValues:function(a){return{isNew:a.get("isNew"),isModified:a.get("isDirty")&&!a.get("isNew"),isClean:!a.get("isDirty")}},getRecordColor:function(a){var b="black";return a.get("isNew")?b="green":a.get("isDirty")&&(b="blue"),b},observeRecord:function(a,b){var c=Ember.A(),d=this,e=Ember.A(["id","isNew","isDirty"]);
a.eachAttribute(function(a){e.push(a)}),e.forEach(function(e){var f=function(){b(d.wrapRecord(a))};Ember.addObserver(a,e,f),c.push(function(){Ember.removeObserver(a,e,f)})});var f=function(){c.forEach(function(a){a()})};return f}});b["default"]=g}),b("ember-data/lib/system/debug/debug_info",["../model","exports"],function(a,b){"use strict";var c=a.Model;c.reopen({_debugInfo:function(){var a=["id"],b={belongsTo:[],hasMany:[]},c=[];this.eachAttribute(function(b){a.push(b)},this),this.eachRelationship(function(a,d){b[d.kind].push(a),c.push(a)});var d=[{name:"Attributes",properties:a,expand:!0},{name:"Belongs To",properties:b.belongsTo,expand:!0},{name:"Has Many",properties:b.hasMany,expand:!0},{name:"Flags",properties:["isLoaded","isDirty","isSaving","isDeleted","isError","isNew","isValid"]}];return{propertyInfo:{includeOtherProperties:!0,groups:d,expensiveProperties:c}}}}),b["default"]=c}),b("ember-data/lib/system/model",["./model/model","./model/attributes","./model/states","./model/errors","exports"],function(a,b,c,d,e){"use strict";var f=a["default"],g=b["default"],h=c["default"],i=d["default"];e.Model=f,e.RootState=h,e.attr=g,e.Errors=i}),b("ember-data/lib/system/model/attributes",["./model","exports"],function(a,b){"use strict";function c(a,b){return"function"==typeof b.defaultValue?b.defaultValue.apply(null,arguments):b.defaultValue}function d(a,b){return a._attributes.hasOwnProperty(b)||a._inFlightAttributes.hasOwnProperty(b)||a._data.hasOwnProperty(b)}function e(a,b){return a._attributes.hasOwnProperty(b)?a._attributes[b]:a._inFlightAttributes.hasOwnProperty(b)?a._inFlightAttributes[b]:a._data[b]}function f(a,b){b=b||{};var f={type:a,isAttribute:!0,options:b};return Ember.computed("data",function(a,f){if(arguments.length>1){var g=e(this,a);return f!==g&&(this._attributes[a]=f,this.send("didSetProperty",{name:a,oldValue:g,originalValue:this._data[a],value:f})),f}return d(this,a)?e(this,a):c(this,b,a)}).meta(f)}var g=a["default"],h=Ember.get;g.reopenClass({attributes:Ember.computed(function(){var a=Ember.Map.create();return this.eachComputedProperty(function(b,c){c.isAttribute&&(c.name=b,a.set(b,c))}),a}),transformedAttributes:Ember.computed(function(){var a=Ember.Map.create();return this.eachAttribute(function(b,c){c.type&&a.set(b,c.type)}),a}),eachAttribute:function(a,b){h(this,"attributes").forEach(function(c,d){a.call(b,c,d)},b)},eachTransformedAttribute:function(a,b){h(this,"transformedAttributes").forEach(function(c,d){a.call(b,c,d)})}}),g.reopen({eachAttribute:function(a,b){this.constructor.eachAttribute(a,b)}}),b["default"]=f}),b("ember-data/lib/system/model/errors",["exports"],function(a){"use strict";var b=Ember.get,c=Ember.isEmpty,d=Ember.Object.extend(Ember.Enumerable,Ember.Evented,{registerHandlers:function(a,b,c){this.on("becameInvalid",a,b),this.on("becameValid",a,c)},errorsByAttributeName:Ember.reduceComputed("content",{initialValue:function(){return Ember.MapWithDefault.create({defaultValue:function(){return Ember.A()}})},addedItem:function(a,b){return a.get(b.attribute).pushObject(b),a},removedItem:function(a,b){return a.get(b.attribute).removeObject(b),a}}),errorsFor:function(a){return b(this,"errorsByAttributeName").get(a)},messages:Ember.computed.mapBy("content","message"),content:Ember.computed(function(){return Ember.A()}),unknownProperty:function(a){var b=this.errorsFor(a);return c(b)?null:b},nextObject:function(a){return b(this,"content").objectAt(a)},length:Ember.computed.oneWay("content.length").readOnly(),isEmpty:Ember.computed.not("length").readOnly(),add:function(a,c){var d=b(this,"isEmpty");c=this._findOrCreateMessages(a,c),b(this,"content").addObjects(c),this.notifyPropertyChange(a),this.enumerableContentDidChange(),d&&!b(this,"isEmpty")&&this.trigger("becameInvalid")},_findOrCreateMessages:function(a,b){var c=this.errorsFor(a);return Ember.makeArray(b).map(function(b){return c.findBy("message",b)||{attribute:a,message:b}})},remove:function(a){if(!b(this,"isEmpty")){var c=b(this,"content").rejectBy("attribute",a);b(this,"content").setObjects(c),this.notifyPropertyChange(a),this.enumerableContentDidChange(),b(this,"isEmpty")&&this.trigger("becameValid")}},clear:function(){b(this,"isEmpty")||(b(this,"content").clear(),this.enumerableContentDidChange(),this.trigger("becameValid"))},has:function(a){return!c(this.errorsFor(a))}});a["default"]=d}),b("ember-data/lib/system/model/model",["./states","./errors","../store","exports"],function(a,b,d,e){"use strict";var f,g=a["default"],h=b["default"],i=d.PromiseObject,j=Ember.get,k=Ember.set,l=Ember.merge,m=Ember.RSVP.Promise,n=Ember.computed("currentState",function(a){return j(j(this,"currentState"),a)}).readOnly(),o=Ember.Object.extend(Ember.Evented,{_recordArrays:void 0,_relationships:void 0,_loadingRecordArrays:void 0,isEmpty:n,isLoading:n,isLoaded:n,isDirty:n,isSaving:n,isDeleted:n,isNew:n,isValid:n,dirtyType:n,isError:!1,isReloading:!1,clientId:null,id:null,currentState:g.empty,errors:Ember.computed(function(){var a=h.create();return a.registerHandlers(this,function(){this.send("becameInvalid")},function(){this.send("becameValid")}),a}).readOnly(),serialize:function(a){var b=j(this,"store");return b.serialize(this,a)},toJSON:function(a){f||(f=c("ember-data/lib/serializers/json_serializer")["default"]);var b=f.create({container:this.container});return b.serialize(this,a)},didLoad:Ember.K,didUpdate:Ember.K,didCreate:Ember.K,didDelete:Ember.K,becameInvalid:Ember.K,becameError:Ember.K,data:Ember.computed(function(){return this._data=this._data||{},this._data}).readOnly(),_data:null,init:function(){this._super(),this._setup()},_setup:function(){this._changesToSync={},this._deferredTriggers=[],this._data={},this._attributes={},this._inFlightAttributes={},this._relationships={}},send:function(a,b){var c=j(this,"currentState");return c[a]||this._unhandledEvent(c,a,b),c[a](this,b)},transitionTo:function(a){var b=a.split(".",1),c=j(this,"currentState"),d=c;do d.exit&&d.exit(this),d=d.parentState;while(!d.hasOwnProperty(b));var e,f,g=a.split("."),h=[],i=[];for(e=0,f=g.length;f>e;e++)d=d[g[e]],d.enter&&i.push(d),d.setup&&h.push(d);for(e=0,f=i.length;f>e;e++)i[e].enter(this);for(k(this,"currentState",d),e=0,f=h.length;f>e;e++)h[e].setup(this);this.updateRecordArraysLater()},_unhandledEvent:function(a,b,c){var d="Attempted to handle event `"+b+"` ";throw d+="on "+String(this)+" while in state ",d+=a.stateName+". ",void 0!==c&&(d+="Called with "+Ember.inspect(c)+"."),new Ember.Error(d)},withTransaction:function(a){var b=j(this,"transaction");b&&a(b)},loadingData:function(a){this.send("loadingData",a)},loadedData:function(){this.send("loadedData")},notFound:function(){this.send("notFound")},pushedData:function(){this.send("pushedData")},deleteRecord:function(){this.send("deleteRecord")},destroyRecord:function(){return this.deleteRecord(),this.save()},unloadRecord:function(){this.isDestroyed||this.send("unloadRecord")},clearRelationships:function(){this.eachRelationship(function(a,b){if("belongsTo"===b.kind)k(this,a,null);else if("hasMany"===b.kind){var c=this._relationships[a];c&&c.destroy()}},this)},updateRecordArrays:function(){this._updatingRecordArraysLater=!1,j(this,"store").dataWasUpdated(this.constructor,this)},changedAttributes:function(){var a,b=j(this,"_data"),c=j(this,"_attributes"),d={};for(a in c)d[a]=[b[a],c[a]];return d},adapterWillCommit:function(){this.send("willCommit")},adapterDidCommit:function(a){k(this,"isError",!1),a?this._data=a:Ember.mixin(this._data,this._inFlightAttributes),this._inFlightAttributes={},this.send("didCommit"),this.updateRecordArraysLater(),a&&this.suspendRelationshipObservers(function(){this.notifyPropertyChange("data")})},adapterDidDirty:function(){this.send("becomeDirty"),this.updateRecordArraysLater()},dataDidChange:Ember.observer(function(){this.reloadHasManys()},"data"),reloadHasManys:function(){var a=j(this.constructor,"relationshipsByName");this.updateRecordArraysLater(),a.forEach(function(a,b){this._data.links&&this._data.links[a]||"hasMany"===b.kind&&this.hasManyDidChange(b.key)},this)},hasManyDidChange:function(a){var b=this._relationships[a];if(b){var c=this._data[a]||[];k(b,"content",Ember.A(c)),k(b,"isLoaded",!0),b.trigger("didLoad")}},updateRecordArraysLater:function(){this._updatingRecordArraysLater||(this._updatingRecordArraysLater=!0,Ember.run.schedule("actions",this,this.updateRecordArrays))},setupData:function(a,b){b?Ember.merge(this._data,a):this._data=a;var c=this._relationships;this.eachRelationship(function(b,d){a.links&&a.links[b]||d.options.async&&(c[b]=null)}),a&&this.pushedData(),this.suspendRelationshipObservers(function(){this.notifyPropertyChange("data")})},materializeId:function(a){k(this,"id",a)},materializeAttributes:function(a){l(this._data,a)},materializeAttribute:function(a,b){this._data[a]=b},updateHasMany:function(a,b){this._data[a]=b,this.hasManyDidChange(a)},updateBelongsTo:function(a,b){this._data[a]=b},rollback:function(){this._attributes={},j(this,"isError")&&(this._inFlightAttributes={},k(this,"isError",!1)),j(this,"isValid")||(this._inFlightAttributes={}),this.send("rolledBack"),this.suspendRelationshipObservers(function(){this.notifyPropertyChange("data")})},toStringExtension:function(){return j(this,"id")},suspendRelationshipObservers:function(a,b){var c=j(this.constructor,"relationshipNames").belongsTo,d=this;try{this._suspendedRelationships=!0,Ember._suspendObservers(d,c,null,"belongsToDidChange",function(){Ember._suspendBeforeObservers(d,c,null,"belongsToWillChange",function(){a.call(b||d)})})}finally{this._suspendedRelationships=!1}},save:function(){var a="DS: Model#save "+this,b=Ember.RSVP.defer(a);return this.get("store").scheduleSave(this,b),this._inFlightAttributes=this._attributes,this._attributes={},i.create({promise:b.promise})},reload:function(){k(this,"isReloading",!0);var a=this,b="DS: Model#reload of "+this,c=new m(function(b){a.send("reloadRecord",b)},b).then(function(){return a.set("isReloading",!1),a.set("isError",!1),a},function(b){throw a.set("isError",!0),b},"DS: Model#reload complete, update flags");return i.create({promise:c})},adapterDidUpdateAttribute:function(a,b){void 0!==b?(this._data[a]=b,this.notifyPropertyChange(a)):this._data[a]=this._inFlightAttributes[a],this.updateRecordArraysLater()},adapterDidInvalidate:function(a){function b(b){a[b]&&c.add(b,a[b])}var c=j(this,"errors");this.eachAttribute(b),this.eachRelationship(b)},adapterDidError:function(){this.send("becameError"),k(this,"isError",!0)},trigger:function(a){Ember.tryInvoke(this,a,[].slice.call(arguments,1)),this._super.apply(this,arguments)},triggerLater:function(){1===this._deferredTriggers.push(arguments)&&Ember.run.schedule("actions",this,"_triggerDeferredTriggers")},_triggerDeferredTriggers:function(){for(var a=0,b=this._deferredTriggers.length;b>a;a++)this.trigger.apply(this,this._deferredTriggers[a]);this._deferredTriggers.length=0},willDestroy:function(){this._super(),this.clearRelationships()}});o.reopenClass({_create:o.create,create:function(){throw new Ember.Error("You should not call `create` on a model. Instead, call `store.createRecord` with the attributes you would like to set.")}}),e["default"]=o}),b("ember-data/lib/system/model/states",["exports"],function(a){"use strict";function b(a,b){b.value===b.originalValue?(delete a._attributes[b.name],a.send("propertyWasReset",b.name)):b.value!==b.oldValue&&a.send("becomeDirty"),a.updateRecordArraysLater()}function c(a){var b,d={};for(var e in a)b=a[e],d[e]=b&&"object"==typeof b?c(b):b;return d}function d(a,b){for(var c in b)a[c]=b[c];return a}function e(a){var b=c(j);return d(b,a)}function f(){}function g(a,b,c){a=d(b?Ember.create(b):{},a),a.parentState=b,a.stateName=c;for(var e in a)a.hasOwnProperty(e)&&"parentState"!==e&&"stateName"!==e&&"object"==typeof a[e]&&(a[e]=g(a[e],a,c+"."+e));return a}var h=Ember.get,i=Ember.set,j={initialState:"uncommitted",isDirty:!0,uncommitted:{didSetProperty:b,propertyWasReset:function(a){var b=!1;for(var c in a._attributes){b=!0;break}b||a.send("rolledBack")},pushedData:Ember.K,becomeDirty:Ember.K,willCommit:function(a){a.transitionTo("inFlight")},reloadRecord:function(a,b){b(h(a,"store").reloadRecord(a))},rolledBack:function(a){a.transitionTo("loaded.saved")},becameInvalid:function(a){a.transitionTo("invalid")},rollback:function(a){a.rollback()}},inFlight:{isSaving:!0,didSetProperty:b,becomeDirty:Ember.K,pushedData:Ember.K,unloadRecord:function(){},willCommit:Ember.K,didCommit:function(a){var b=h(this,"dirtyType");a.transitionTo("saved"),a.send("invokeLifecycleCallbacks",b)},becameInvalid:function(a){a.transitionTo("invalid"),a.send("invokeLifecycleCallbacks")},becameError:function(a){a.transitionTo("uncommitted"),a.triggerLater("becameError",a)}},invalid:{isValid:!1,deleteRecord:function(a){a.transitionTo("deleted.uncommitted"),a.clearRelationships()},didSetProperty:function(a,c){h(a,"errors").remove(c.name),b(a,c)},becomeDirty:Ember.K,willCommit:function(a){h(a,"errors").clear(),a.transitionTo("inFlight")},rolledBack:function(a){h(a,"errors").clear()},becameValid:function(a){a.transitionTo("uncommitted")},invokeLifecycleCallbacks:function(a){a.triggerLater("becameInvalid",a)},exit:function(a){a._inFlightAttributes={}}}},k=e({dirtyType:"created",isNew:!0});k.uncommitted.rolledBack=function(a){a.transitionTo("deleted.saved")};var l=e({dirtyType:"updated"});k.uncommitted.deleteRecord=function(a){a.clearRelationships(),a.transitionTo("deleted.saved")},k.uncommitted.rollback=function(a){j.uncommitted.rollback.apply(this,arguments),a.transitionTo("deleted.saved")},k.uncommitted.propertyWasReset=Ember.K,l.inFlight.unloadRecord=f,l.uncommitted.deleteRecord=function(a){a.transitionTo("deleted.uncommitted"),a.clearRelationships()};var m={isEmpty:!1,isLoading:!1,isLoaded:!1,isDirty:!1,isSaving:!1,isDeleted:!1,isNew:!1,isValid:!0,rolledBack:Ember.K,unloadRecord:function(a){a.clearRelationships(),a.transitionTo("deleted.saved")},propertyWasReset:Ember.K,empty:{isEmpty:!0,loadingData:function(a,b){a._loadingPromise=b,a.transitionTo("loading")},loadedData:function(a){a.transitionTo("loaded.created.uncommitted"),a.suspendRelationshipObservers(function(){a.notifyPropertyChange("data")})},pushedData:function(a){a.transitionTo("loaded.saved"),a.triggerLater("didLoad")}},loading:{isLoading:!0,exit:function(a){a._loadingPromise=null},pushedData:function(a){a.transitionTo("loaded.saved"),a.triggerLater("didLoad"),i(a,"isError",!1)},becameError:function(a){a.triggerLater("becameError",a)},notFound:function(a){a.transitionTo("empty")}},loaded:{initialState:"saved",isLoaded:!0,saved:{setup:function(a){var b=a._attributes,c=!1;for(var d in b)if(b.hasOwnProperty(d)){c=!0;break}c&&a.adapterDidDirty()},didSetProperty:b,pushedData:Ember.K,becomeDirty:function(a){a.transitionTo("updated.uncommitted")},willCommit:function(a){a.transitionTo("updated.inFlight")},reloadRecord:function(a,b){b(h(a,"store").reloadRecord(a))},deleteRecord:function(a){a.transitionTo("deleted.uncommitted"),a.clearRelationships()},unloadRecord:function(a){a.clearRelationships(),a.transitionTo("deleted.saved")},didCommit:function(a){a.send("invokeLifecycleCallbacks",h(a,"lastDirtyType"))},notFound:Ember.K},created:k,updated:l},deleted:{initialState:"uncommitted",dirtyType:"deleted",isDeleted:!0,isLoaded:!0,isDirty:!0,setup:function(a){a.updateRecordArrays()},uncommitted:{willCommit:function(a){a.transitionTo("inFlight")},rollback:function(a){a.rollback()},becomeDirty:Ember.K,deleteRecord:Ember.K,rolledBack:function(a){a.transitionTo("loaded.saved")}},inFlight:{isSaving:!0,unloadRecord:f,willCommit:Ember.K,didCommit:function(a){a.transitionTo("saved"),a.send("invokeLifecycleCallbacks")},becameError:function(a){a.transitionTo("uncommitted"),a.triggerLater("becameError",a)}},saved:{isDirty:!1,setup:function(a){var b=h(a,"store");b.dematerializeRecord(a)},invokeLifecycleCallbacks:function(a){a.triggerLater("didDelete",a),a.triggerLater("didCommit",a)},willCommit:Ember.K,didCommit:Ember.K}},invokeLifecycleCallbacks:function(a,b){"created"===b?a.triggerLater("didCreate",a):a.triggerLater("didUpdate",a),a.triggerLater("didCommit",a)}};m=g(m,null,"root"),a["default"]=m}),b("ember-data/lib/system/record_array_manager",["./record_arrays","exports"],function(a,b){"use strict";function c(a){for(var b=[],c=Ember.keys(a),d=0;d<c.length;d++)b.push(a[c[d]]);return b}function d(a){a.destroy()}function e(a){for(var b=a.length,c=Ember.A(),d=0;b>d;d++)c=c.concat(a[d]);return c}var f=a.RecordArray,g=a.FilteredRecordArray,h=a.AdapterPopulatedRecordArray,i=a.ManyArray,j=Ember.get,k=(Ember.set,Ember.EnumerableUtils.forEach),l=Ember.Object.extend({init:function(){this.filteredRecordArrays=Ember.MapWithDefault.create({defaultValue:function(){return[]}}),this.changedRecords=[],this._adapterPopulatedRecordArrays=[]},recordDidChange:function(a){1===this.changedRecords.push(a)&&Ember.run.schedule("actions",this,this.updateRecordArrays)},recordArraysForRecord:function(a){return a._recordArrays=a._recordArrays||Ember.OrderedSet.create(),a._recordArrays},updateRecordArrays:function(){k(this.changedRecords,function(a){j(a,"isDeleted")?this._recordWasDeleted(a):this._recordWasChanged(a)},this),this.changedRecords.length=0},_recordWasDeleted:function(a){var b=a._recordArrays;b&&k(b,function(b){b.removeRecord(a)})},_recordWasChanged:function(a){var b,c=a.constructor,d=this.filteredRecordArrays.get(c);k(d,function(d){b=j(d,"filterFunction"),this.updateRecordArray(d,b,c,a)},this);var e=a._loadingRecordArrays;if(e){for(var f=0,g=e.length;g>f;f++)e[f].loadedRecord();a._loadingRecordArrays=[]}},updateRecordArray:function(a,b,c,d){var e;e=b?b(d):!0;var f=this.recordArraysForRecord(d);e?(f.add(a),a.addRecord(d)):e||(f.remove(a),a.removeRecord(d))},updateFilter:function(a,b,c){for(var d,e=this.store.typeMapFor(b),f=e.records,g=0,h=f.length;h>g;g++)d=f[g],j(d,"isDeleted")||j(d,"isEmpty")||this.updateRecordArray(a,c,b,d)},createManyArray:function(a,b){var c=i.create({type:a,content:b,store:this.store});return k(b,function(a){var b=this.recordArraysForRecord(a);b.add(c)},this),c},createRecordArray:function(a){var b=f.create({type:a,content:Ember.A(),store:this.store,isLoaded:!0});return this.registerFilteredRecordArray(b,a),b},createFilteredRecordArray:function(a,b,c){var d=g.create({query:c,type:a,content:Ember.A(),store:this.store,manager:this,filterFunction:b});return this.registerFilteredRecordArray(d,a,b),d},createAdapterPopulatedRecordArray:function(a,b){var c=h.create({type:a,query:b,content:Ember.A(),store:this.store,manager:this});return this._adapterPopulatedRecordArrays.push(c),c},registerFilteredRecordArray:function(a,b,c){var d=this.filteredRecordArrays.get(b);d.push(a),this.updateFilter(a,b,c)},registerWaitingRecordArray:function(a,b){var c=a._loadingRecordArrays||[];c.push(b),a._loadingRecordArrays=c},willDestroy:function(){this._super(),e(c(this.filteredRecordArrays.values)).forEach(d),this._adapterPopulatedRecordArrays.forEach(d)}});b["default"]=l}),b("ember-data/lib/system/record_arrays",["./record_arrays/record_array","./record_arrays/filtered_record_array","./record_arrays/adapter_populated_record_array","./record_arrays/many_array","exports"],function(a,b,c,d,e){"use strict";var f=a["default"],g=b["default"],h=c["default"],i=d["default"];e.RecordArray=f,e.FilteredRecordArray=g,e.AdapterPopulatedRecordArray=h,e.ManyArray=i}),b("ember-data/lib/system/record_arrays/adapter_populated_record_array",["./record_array","exports"],function(a,b){"use strict";var c=a["default"],d=Ember.get,e=(Ember.set,c.extend({query:null,replace:function(){var a=d(this,"type").toString();throw new Error("The result of a server query (on "+a+") is immutable.")},load:function(a){var b=d(this,"store"),c=d(this,"type"),e=b.pushMany(c,a),f=b.metadataFor(c);this.setProperties({content:Ember.A(e),isLoaded:!0,meta:Ember.copy(f)}),e.forEach(function(a){this.manager.recordArraysForRecord(a).add(this)},this),Ember.run.once(this,"trigger","didLoad")}}));b["default"]=e}),b("ember-data/lib/system/record_arrays/filtered_record_array",["./record_array","exports"],function(a,b){"use strict";var c=a["default"],d=Ember.get,e=c.extend({filterFunction:null,isLoaded:!0,replace:function(){var a=d(this,"type").toString();throw new Error("The result of a client-side filter (on "+a+") is immutable.")},_updateFilter:function(){var a=d(this,"manager");a.updateFilter(this,d(this,"type"),d(this,"filterFunction"))},updateFilter:Ember.observer(function(){Ember.run.once(this,this._updateFilter)},"filterFunction")});b["default"]=e}),b("ember-data/lib/system/record_arrays/many_array",["./record_array","../changes","exports"],function(a,b,c){"use strict";function d(a){a.sync()}var e=a["default"],f=b.RelationshipChange,g=Ember.get,h=Ember.set,i=Ember.EnumerableUtils.map,j=e.extend({init:function(){this._super.apply(this,arguments),this._changesToSync=Ember.OrderedSet.create()},name:null,owner:null,isPolymorphic:!1,isLoaded:!1,promise:null,loadingRecordsCount:function(a){this.loadingRecordsCount=a},loadedRecord:function(){this.loadingRecordsCount--,0===this.loadingRecordsCount&&(h(this,"isLoaded",!0),this.trigger("didLoad"))},fetch:function(){var a=g(this,"content"),b=g(this,"store"),c=g(this,"owner"),d=a.filterProperty("isEmpty",!0);b.fetchMany(d,c)},replaceContent:function(a,b,c){c=i(c,function(a){return a},this),this._super(a,b,c)},arrangedContentDidChange:function(){Ember.run.once(this,"fetch")},arrayContentWillChange:function(a,b){var c=g(this,"owner"),d=g(this,"name");if(!c._suspendedRelationships)for(var e=a;a+b>e;e++){var h=g(this,"content").objectAt(e),i=f.createChange(c,h,g(this,"store"),{parentType:c.constructor,changeType:"remove",kind:"hasMany",key:d});this._changesToSync.add(i)}return this._super.apply(this,arguments)},arrayContentDidChange:function(a,b,c){this._super.apply(this,arguments);var e=g(this,"owner"),h=g(this,"name"),i=g(this,"store");if(!e._suspendedRelationships){for(var j=a;a+c>j;j++){var k=g(this,"content").objectAt(j),l=f.createChange(e,k,i,{parentType:e.constructor,changeType:"add",kind:"hasMany",key:h});l.hasManyName=h,this._changesToSync.add(l)}this._changesToSync.forEach(d),this._changesToSync.clear()}},createRecord:function(a){var b,c=g(this,"owner"),d=g(c,"store"),e=g(this,"type");return b=d.createRecord.call(d,e,a),this.pushObject(b),b}});c["default"]=j}),b("ember-data/lib/system/record_arrays/record_array",["../store","exports"],function(a,b){"use strict";var c=a.PromiseArray,d=Ember.get,e=(Ember.set,Ember.ArrayProxy.extend(Ember.Evented,{type:null,content:null,isLoaded:!1,isUpdating:!1,store:null,objectAtContent:function(a){var b=d(this,"content");return b.objectAt(a)},update:function(){if(!d(this,"isUpdating")){var a=d(this,"store"),b=d(this,"type");return a.fetchAll(b,this)}},addRecord:function(a){d(this,"content").addObject(a)},removeRecord:function(a){d(this,"content").removeObject(a)},save:function(){var a="DS: RecordArray#save "+d(this,"type"),b=Ember.RSVP.all(this.invoke("save"),a).then(function(a){return Ember.A(a)},null,"DS: RecordArray#save apply Ember.NativeArray");return c.create({promise:b})},_dissociateFromOwnRecords:function(){var a=this;this.forEach(function(b){var c=b._recordArrays;c&&c.remove(a)})},willDestroy:function(){this._dissociateFromOwnRecords(),this._super()}}));b["default"]=e}),b("ember-data/lib/system/relationship-meta",["../../../ember-inflector/lib/system","exports"],function(a,b){"use strict";function c(a,b){var c,d;return c=b.type||b.key,"string"==typeof c?("hasMany"===b.kind&&(c=e(c)),d=a.modelFor(c)):d=b.type,d}function d(a,b){return{key:b.key,kind:b.kind,type:c(a,b),options:b.options,parentType:b.parentType,isRelationship:!0}}var e=a.singularize;b.typeForRelationshipMeta=c,b.relationshipFromMeta=d}),b("ember-data/lib/system/relationships",["./relationships/belongs_to","./relationships/has_many","../system/relationships/ext","exports"],function(a,b,c,d){"use strict";var e=a["default"],f=b["default"];d.belongsTo=e,d.hasMany=f}),b("ember-data/lib/system/relationships/belongs_to",["../model","../store","../changes","../relationship-meta","exports"],function(a,b,c,d,e){"use strict";function f(a,b,c){return Ember.computed("data",function(a,b){var d,e=h(this,"data"),f=h(this,"store"),g="DS: Async belongsTo "+this+" : "+a;if(c.key=a,2===arguments.length)return void 0===b?null:l.create({promise:j.cast(b,g)});var k=e.links&&e.links[a],m=e[a];return i(m)?k?(d=f.findBelongsTo(this,k,n(f,c)),l.create({promise:d})):null:(d=f.fetchRecord(m)||j.cast(m,g),l.create({promise:d}))}).meta(c)}function g(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c={type:a,isRelationship:!0,options:b,kind:"belongsTo",key:null};return b.async?f(a,b,c):Ember.computed("data",function(b,c){var d,e,f=h(this,"data"),g=h(this,"store");return e="string"==typeof a?g.modelFor(a):a,2===arguments.length?void 0===c?null:c:(d=f[b],i(d)?null:(g.fetchRecord(d),d))}).meta(c)}{var h=Ember.get,i=(Ember.set,Ember.isNone),j=Ember.RSVP.Promise,k=a.Model,l=b.PromiseObject,m=c.RelationshipChange,n=d.relationshipFromMeta;d.typeForRelationshipMeta}k.reopen({belongsToWillChange:Ember.beforeObserver(function(a,b){if(h(a,"isLoaded")){var c=h(a,b);if(c){var d=h(a,"store"),e=m.createChange(a,c,d,{key:b,kind:"belongsTo",changeType:"remove"});e.sync(),this._changesToSync[b]=e}}}),belongsToDidChange:Ember.immediateObserver(function(a,b){if(h(a,"isLoaded")){var c=h(a,b);if(c){var d=h(a,"store"),e=m.createChange(a,c,d,{key:b,kind:"belongsTo",changeType:"add"});e.sync()}}delete this._changesToSync[b]})}),e["default"]=g}),b("ember-data/lib/system/relationships/ext",["../../../../ember-inflector/lib/system","../relationship-meta","../model"],function(a,b,c){"use strict";{var d=(a.singularize,b.typeForRelationshipMeta),e=b.relationshipFromMeta,f=c.Model,g=Ember.get;Ember.set}f.reopen({didDefineProperty:function(a,b,c){if(c instanceof Ember.Descriptor){var d=c.meta();d.isRelationship&&"belongsTo"===d.kind&&(Ember.addObserver(a,b,null,"belongsToDidChange"),Ember.addBeforeObserver(a,b,null,"belongsToWillChange")),d.parentType=a.constructor}}}),f.reopenClass({typeForRelationship:function(a){var b=g(this,"relationshipsByName").get(a);return b&&b.type},inverseFor:function(a){function b(a,c,d){d=d||[];var e=g(c,"relationships");if(e){var f=e.get(a);return f&&d.push.apply(d,e.get(a)),a.superclass&&b(a.superclass,c,d),d}}var c=this.typeForRelationship(a);if(!c)return null;var d=this.metaForProperty(a).options;if(null===d.inverse)return null;var e,f;if(d.inverse)e=d.inverse,f=Ember.get(c,"relationshipsByName").get(e).kind;else{var h=b(this,c);if(0===h.length)return null;e=h[0].name,f=h[0].kind}return{type:c,name:e,kind:f}},relationships:Ember.computed(function(){var a=new Ember.MapWithDefault({defaultValue:function(){return[]}});return this.eachComputedProperty(function(b,c){if(c.isRelationship){c.key=b;var e=a.get(d(this.store,c));e.push({name:b,kind:c.kind})}}),a}).cacheable(!1),relationshipNames:Ember.computed(function(){var a={hasMany:[],belongsTo:[]};return this.eachComputedProperty(function(b,c){c.isRelationship&&a[c.kind].push(b)}),a}),relatedTypes:Ember.computed(function(){var a,b=Ember.A();return this.eachComputedProperty(function(c,e){e.isRelationship&&(e.key=c,a=d(this.store,e),b.contains(a)||b.push(a))}),b}).cacheable(!1),relationshipsByName:Ember.computed(function(){var a=Ember.Map.create();return this.eachComputedProperty(function(b,c){if(c.isRelationship){c.key=b;var f=e(this.store,c);f.type=d(this.store,c),a.set(b,f)}}),a}).cacheable(!1),fields:Ember.computed(function(){var a=Ember.Map.create();return this.eachComputedProperty(function(b,c){c.isRelationship?a.set(b,c.kind):c.isAttribute&&a.set(b,"attribute")}),a}),eachRelationship:function(a,b){g(this,"relationshipsByName").forEach(function(c,d){a.call(b,c,d)})},eachRelatedType:function(a,b){g(this,"relatedTypes").forEach(function(c){a.call(b,c)})}}),f.reopen({eachRelationship:function(a,b){this.constructor.eachRelationship(a,b)}})}),b("ember-data/lib/system/relationships/has_many",["../store","../relationship-meta","exports"],function(a,b,c){"use strict";function d(a,b,c){return Ember.computed("data",function(a){var d=this._relationships[a],f="DS: Async hasMany "+this+" : "+a;if(c.key=a,!d){var g=Ember.RSVP.defer(f);d=e(this,a,b,function(b,d){var e,f=d.links&&d.links[a];return e=f?b.findHasMany(this,f,l(b,c),g):b.findMany(this,d[a],m(b,c),g),j(e,"promise",g.promise),e})}var i=d.get("promise").then(function(){return d},null,"DS: Async hasMany records received");return h.create({promise:i})}).meta(c).readOnly()}function e(a,b,c,d){var e=a._relationships;if(e[b])return e[b];var f=i(a,"data"),g=i(a,"store"),h=e[b]=d.call(a,g,f);return k(h,{owner:a,name:b,isPolymorphic:c.polymorphic})}function f(a,b){b=b||{};var c={type:a,isRelationship:!0,options:b,kind:"hasMany",key:null};return b.async?d(a,b,c):Ember.computed("data",function(a){return e(this,a,b,function(b,d){d[a];return b.findMany(this,d[a],m(b,c))})}).meta(c).readOnly()}function g(a,b){return"object"==typeof a&&(b=a,a=void 0),f(a,b)}var h=a.PromiseArray,i=Ember.get,j=Ember.set,k=Ember.setProperties,l=b.relationshipFromMeta,m=b.typeForRelationshipMeta;c["default"]=g}),b("ember-data/lib/system/store",["./adapter","ember-inflector/lib/system/string","exports"],function(a,b,d){"use strict";function e(a){return null==a?null:a+""}function f(a,b,c,d){return b.eachRelationship(function(b,e){if(c.links&&c.links[b])return void(d&&e.options.async&&(d._relationships[b]=null));var f=e.kind,h=c[b];null!=h&&("belongsTo"===f?g(a,c,b,e,h):"hasMany"===f&&(i(a,c,b,e,h),j(d,b,h)))}),c}function g(a,b,d,e,f){if(A||(A=c("ember-data/lib/system/model").Model),!(G(f)||f instanceof A)){var g;"number"==typeof f||"string"==typeof f?(g=h(e,d,b),b[d]=a.recordForId(g,f)):"object"==typeof f&&(b[d]=a.recordForId(f.type,f.id))}}function h(a,b,c){return a.options.polymorphic?c[b+"Type"]:a.type}function i(a,b,c,d,e){for(var f=0,h=e.length;h>f;f++)g(a,e,f,d,e[f])}function j(a,b,c){a&&Ember.A(c).pushObjects(a.get(b).filterBy("isNew"))}function k(a,b){return x.create({promise:K.cast(a,b)})}function l(a,b){return y.create({promise:K.cast(a,b)})}function m(a,b,c){return a.lookup("serializer:"+b)||a.lookup("serializer:application")||a.lookup("serializer:"+c)||a.lookup("serializer:-default")}function n(a){return a.lookup("serializer:application")||a.lookup("serializer:-default")}function o(a,b){var c=a.serializer,d=a.defaultSerializer,e=a.container;return e&&void 0===c&&(c=m(e,b.typeKey,d)),(null===c||void 0===c)&&(c={extract:function(a,b,c){return c}}),c}function p(a,b,c,d){var e=a.find(b,c,d),f=o(a,c),g="DS: Handle Adapter#find of "+c+" with id: "+d;return K.cast(e,g).then(function(a){var e=f.extract(b,c,a,d,"find");return b.push(c,e)},function(a){var e=b.getById(c,d);throw e.notFound(),a},"DS: Extract payload of '"+c+"'")}function q(a,b,c,d,e){var f=a.findMany(b,c,d,e),g=o(a,c),h="DS: Handle Adapter#findMany of "+c;return K.cast(f,h).then(function(a){var d=g.extract(b,c,a,null,"findMany");b.pushMany(c,d)},null,"DS: Extract payload of "+c)}function r(a,b,c,d,e){var f=a.findHasMany(b,c,d,e),g=o(a,e.type),h="DS: Handle Adapter#findHasMany of "+c+" : "+e.type;return K.cast(f,h).then(function(a){var d=g.extract(b,e.type,a,null,"findHasMany"),f=b.pushMany(e.type,d);c.updateHasMany(e.key,f)},null,"DS: Extract payload of "+c+" : hasMany "+e.type)}function s(a,b,c,d,e){var f=a.findBelongsTo(b,c,d,e),g=o(a,e.type),h="DS: Handle Adapter#findBelongsTo of "+c+" : "+e.type;return K.cast(f,h).then(function(a){var c=g.extract(b,e.type,a,null,"findBelongsTo"),d=b.push(e.type,c);return d.updateBelongsTo(e.key,d),d},null,"DS: Extract payload of "+c+" : "+e.type)}function t(a,b,c,d){var e=a.findAll(b,c,d),f=o(a,c),g="DS: Handle Adapter#findAll of "+c;return K.cast(e,g).then(function(a){var d=f.extract(b,c,a,null,"findAll");return b.pushMany(c,d),b.didUpdateAll(c),b.all(c)},null,"DS: Extract payload of findAll "+c)}function u(a,b,c,d,e){var f=a.findQuery(b,c,d,e),g=o(a,c),h="DS: Handle Adapter#findQuery of "+c;return K.cast(f,h).then(function(a){var d=g.extract(b,c,a,null,"findQuery");
return e.load(d),e},null,"DS: Extract payload of findQuery "+c)}function v(a,b,c,d){var e=d.constructor,f=a[c](b,e,d),g=o(a,e),h="DS: Extract and notify about "+c+" completion of "+d;return f.then(function(a){var f;return f=a?g.extract(b,e,a,D(d,"id"),c):a,b.didSaveRecord(d,f),d},function(a){throw a instanceof B?b.recordWasInvalid(d,a.errors):b.recordWasError(d,a),a},h)}var w,x,y,z,A,B=a.InvalidError,C=(a.Adapter,b.singularize),D=Ember.get,E=Ember.set,F=Ember.run.once,G=Ember.isNone,H=Ember.EnumerableUtils.forEach,I=Ember.EnumerableUtils.indexOf,J=Ember.EnumerableUtils.map,K=Ember.RSVP.Promise,L=Ember.copy,M=Ember.String.camelize;w=Ember.Object.extend({init:function(){z||(z=c("ember-data/lib/system/record_array_manager")["default"]),this.typeMaps={},this.recordArrayManager=z.create({store:this}),this._relationshipChanges={},this._pendingSave=[]},adapter:"-rest",serialize:function(a,b){return this.serializerFor(a.constructor.typeKey).serialize(a,b)},defaultAdapter:Ember.computed("adapter",function(){var a=D(this,"adapter");return"string"==typeof a&&(a=this.container.lookup("adapter:"+a)||this.container.lookup("adapter:application")||this.container.lookup("adapter:-rest")),DS.Adapter.detect(a)&&(a=a.create({container:this.container})),a}),createRecord:function(a,b){a=this.modelFor(a),b=L(b)||{},G(b.id)&&(b.id=this._generateId(a)),b.id=e(b.id);var c=this.buildRecord(a,b.id);return c.loadedData(),c.setProperties(b),c},_generateId:function(a){var b=this.adapterFor(a);return b&&b.generateIdForRecord?b.generateIdForRecord(this):null},deleteRecord:function(a){a.deleteRecord()},unloadRecord:function(a){a.unloadRecord()},find:function(a,b){return 1===arguments.length?this.findAll(a):"object"===Ember.typeOf(b)?this.findQuery(a,b):this.findById(a,e(b))},findById:function(a,b){a=this.modelFor(a);var c=this.recordForId(a,b),d=this.fetchRecord(c);return k(d||c,"DS: Store#findById "+a+" with id: "+b)},findByIds:function(a,b){var c=this;return l(Ember.RSVP.all(J(b,function(b){return c.findById(a,b)})).then(Ember.A,null,"DS: Store#findByIds of "+a+" complete"))},fetchRecord:function(a){if(G(a))return null;if(a._loadingPromise)return a._loadingPromise;if(!D(a,"isEmpty"))return null;var b=a.constructor,c=D(a,"id"),d=this.adapterFor(b),e=p(d,this,b,c);return a.loadingData(e),e},getById:function(a,b){return this.hasRecordForId(a,b)?this.recordForId(a,b):null},reloadRecord:function(a){var b=a.constructor,c=this.adapterFor(b),d=D(a,"id");return p(c,this,b,d)},fetchMany:function(a,b){if(!a.length)return Ember.RSVP.resolve(a);var c=Ember.MapWithDefault.create({defaultValue:function(){return Ember.A()}});H(a,function(a){c.get(a.constructor).push(a)});var d=[];return H(c,function(a,c){var e=c.mapProperty("id"),f=this.adapterFor(a);d.push(q(f,this,a,e,b))},this),Ember.RSVP.all(d)},hasRecordForId:function(a,b){return b=e(b),a=this.modelFor(a),!!this.typeMapFor(a).idToRecord[b]},recordForId:function(a,b){a=this.modelFor(a),b=e(b);var c=this.typeMapFor(a).idToRecord[b];return c||(c=this.buildRecord(a,b)),c},findMany:function(a,b,c,d){c=this.modelFor(c),b=Ember.A(b);var e=b.filterProperty("isEmpty",!0),f=this.recordArrayManager.createManyArray(c,b);return H(e,function(a){a.loadingData()}),f.loadingRecordsCount=e.length,e.length?(H(e,function(a){this.recordArrayManager.registerWaitingRecordArray(a,f)},this),d.resolve(this.fetchMany(e,a))):(d&&d.resolve(),f.set("isLoaded",!0),F(f,"trigger","didLoad")),f},findHasMany:function(a,b,c,d){var e=this.adapterFor(a.constructor),f=this.recordArrayManager.createManyArray(c.type,Ember.A([]));return d.resolve(r(e,this,a,b,c)),f},findBelongsTo:function(a,b,c){var d=this.adapterFor(a.constructor);return s(d,this,a,b,c)},findQuery:function(a,b){a=this.modelFor(a);var c=this.recordArrayManager.createAdapterPopulatedRecordArray(a,b),d=this.adapterFor(a);return l(u(d,this,a,b,c))},findAll:function(a){return a=this.modelFor(a),this.fetchAll(a,this.all(a))},fetchAll:function(a,b){var c=this.adapterFor(a),d=this.typeMapFor(a).metadata.since;return E(b,"isUpdating",!0),l(t(c,this,a,d))},didUpdateAll:function(a){var b=this.typeMapFor(a).findAllCache;E(b,"isUpdating",!1)},all:function(a){a=this.modelFor(a);var b=this.typeMapFor(a),c=b.findAllCache;if(c)return c;var d=this.recordArrayManager.createRecordArray(a);return b.findAllCache=d,d},unloadAll:function(a){for(var b,c=this.modelFor(a),d=this.typeMapFor(c),e=d.records.slice(),f=0;f<e.length;f++)b=e[f],b.unloadRecord(),b.destroy();d.findAllCache=null},filter:function(a,b,c){var d,e,f=arguments.length,g=3===f;return g?d=this.findQuery(a,b):2===arguments.length&&(c=b),a=this.modelFor(a),e=g?this.recordArrayManager.createFilteredRecordArray(a,c,b):this.recordArrayManager.createFilteredRecordArray(a,c),d=d||K.cast(e),l(d.then(function(){return e},null,"DS: Store#filter of "+a))},recordIsLoaded:function(a,b){return this.hasRecordForId(a,b)?!D(this.recordForId(a,b),"isEmpty"):!1},metadataFor:function(a){return a=this.modelFor(a),this.typeMapFor(a).metadata},dataWasUpdated:function(a,b){this.recordArrayManager.recordDidChange(b)},scheduleSave:function(a,b){a.adapterWillCommit(),this._pendingSave.push([a,b]),F(this,"flushPendingSave")},flushPendingSave:function(){var a=this._pendingSave.slice();this._pendingSave=[],H(a,function(a){var b,c=a[0],d=a[1],e=this.adapterFor(c.constructor);return"root.deleted.saved"===D(c,"currentState.stateName")?d.resolve(c):(b=D(c,"isNew")?"createRecord":D(c,"isDeleted")?"deleteRecord":"updateRecord",void d.resolve(v(e,this,b,c)))},this)},didSaveRecord:function(a,b){b&&(b=f(this,a.constructor,b,a),this.updateId(a,b)),a.adapterDidCommit(b)},recordWasInvalid:function(a,b){a.adapterDidInvalidate(b)},recordWasError:function(a){a.adapterDidError()},updateId:function(a,b){var c=(D(a,"id"),e(b.id));this.typeMapFor(a.constructor).idToRecord[c]=a,E(a,"id",c)},typeMapFor:function(a){var b,c=D(this,"typeMaps"),d=Ember.guidFor(a);return(b=c[d])?b:(b={idToRecord:{},records:[],metadata:{},type:a},c[d]=b,b)},_load:function(a,b,c){var d=e(b.id),f=this.recordForId(a,d);return f.setupData(b,c),this.recordArrayManager.recordDidChange(f),f},modelFor:function(a){var b;if("string"==typeof a){var c=this.container.normalize("model:"+a);if(b=this.container.lookupFactory(c),!b)throw new Ember.Error("No model was found for '"+a+"'");b.typeKey=this._normalizeTypeKey(c.split(":",2)[1])}else b=a,b.typeKey&&(b.typeKey=this._normalizeTypeKey(b.typeKey));return b.store=this,b},push:function(a,b,c){return a=this.modelFor(a),b=f(this,a,b),this._load(a,b,c),this.recordForId(a,b.id)},pushPayload:function(a,b){var c;b?c=this.serializerFor(a):(b=a,c=n(this.container)),c.pushPayload(this,b)},update:function(a,b){return this.push(a,b,!0)},pushMany:function(a,b){return J(b,function(b){return this.push(a,b)},this)},metaForType:function(a,b){a=this.modelFor(a),Ember.merge(this.typeMapFor(a).metadata,b)},buildRecord:function(a,b,c){var d=this.typeMapFor(a),e=d.idToRecord,f=a._create({id:b,store:this,container:this.container});return c&&f.setupData(c),b&&(e[b]=f),d.records.push(f),f},dematerializeRecord:function(a){var b=a.constructor,c=this.typeMapFor(b),d=D(a,"id");a.updateRecordArrays(),d&&delete c.idToRecord[d];var e=I(c.records,a);c.records.splice(e,1)},addRelationshipChangeFor:function(a,b,c,d,e){var f=a.clientId,g=c?c:c,h=b+d,i=this._relationshipChanges;f in i||(i[f]={}),g in i[f]||(i[f][g]={}),h in i[f][g]||(i[f][g][h]={}),i[f][g][h][e.changeType]=e},removeRelationshipChangeFor:function(a,b,c,d,e){var f=a.clientId,g=c?c.clientId:c,h=this._relationshipChanges,i=b+d;f in h&&g in h[f]&&i in h[f][g]&&delete h[f][g][i][e]},relationshipChangePairsFor:function(a){var b=[];if(!a)return b;var c=this._relationshipChanges[a.clientId];for(var d in c)if(c.hasOwnProperty(d))for(var e in c[d])c[d].hasOwnProperty(e)&&b.push(c[d][e]);return b},adapterFor:function(a){var b,c=this.container;return c&&(b=c.lookup("adapter:"+a.typeKey)||c.lookup("adapter:application")),b||D(this,"defaultAdapter")},serializerFor:function(a){a=this.modelFor(a);var b=this.adapterFor(a);return m(this.container,a.typeKey,b&&b.defaultSerializer)},willDestroy:function(){function a(a){return b[a].type}var b=this.typeMaps,c=Ember.keys(b),d=c.map(a);this.recordArrayManager.destroy(),d.forEach(this.unloadAll,this)},_normalizeTypeKey:function(a){return M(C(a))}}),y=Ember.ArrayProxy.extend(Ember.PromiseProxyMixin),x=Ember.ObjectProxy.extend(Ember.PromiseProxyMixin),d.Store=w,d.PromiseArray=y,d.PromiseObject=x,d["default"]=w}),b("ember-data/lib/transforms",["./transforms/base","./transforms/number","./transforms/date","./transforms/string","./transforms/boolean","exports"],function(a,b,c,d,e,f){"use strict";var g=a["default"],h=b["default"],i=c["default"],j=d["default"],k=e["default"];f.Transform=g,f.NumberTransform=h,f.DateTransform=i,f.StringTransform=j,f.BooleanTransform=k}),b("ember-data/lib/transforms/base",["exports"],function(a){"use strict";var b=Ember.Object.extend({serialize:Ember.required(),deserialize:Ember.required()});a["default"]=b}),b("ember-data/lib/transforms/boolean",["./base","exports"],function(a,b){"use strict";var c=a["default"],d=c.extend({deserialize:function(a){var b=typeof a;return"boolean"===b?a:"string"===b?null!==a.match(/^true$|^t$|^1$/i):"number"===b?1===a:!1},serialize:function(a){return Boolean(a)}});b["default"]=d}),b("ember-data/lib/transforms/date",["./base","exports"],function(a,b){"use strict";var c=a["default"],d=c.extend({deserialize:function(a){var b=typeof a;return"string"===b?new Date(Ember.Date.parse(a)):"number"===b?new Date(a):null===a||void 0===a?a:null},serialize:function(a){if(a instanceof Date){var b=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],d=function(a){return 10>a?"0"+a:""+a},e=a.getUTCFullYear(),f=a.getUTCMonth(),g=a.getUTCDate(),h=a.getUTCDay(),i=a.getUTCHours(),j=a.getUTCMinutes(),k=a.getUTCSeconds(),l=b[h],m=d(g),n=c[f];return l+", "+m+" "+n+" "+e+" "+d(i)+":"+d(j)+":"+d(k)+" GMT"}return null}});b["default"]=d}),b("ember-data/lib/transforms/number",["./base","exports"],function(a,b){"use strict";var c=a["default"],d=Ember.isEmpty,e=c.extend({deserialize:function(a){return d(a)?null:Number(a)},serialize:function(a){return d(a)?null:Number(a)}});b["default"]=e}),b("ember-data/lib/transforms/string",["./base","exports"],function(a,b){"use strict";var c=a["default"],d=Ember.isNone,e=c.extend({deserialize:function(a){return d(a)?null:String(a)},serialize:function(a){return d(a)?null:String(a)}});b["default"]=e}),b("ember-inflector/lib/ext/string",["../system/string"],function(a){"use strict";var b=a.pluralize,c=a.singularize;(Ember.EXTEND_PROTOTYPES===!0||Ember.EXTEND_PROTOTYPES.String)&&(String.prototype.pluralize=function(){return b(this)},String.prototype.singularize=function(){return c(this)})}),b("ember-inflector/lib/main",["./system","./ext/string","exports"],function(a,b,c){"use strict";var d=a.Inflector,e=a.defaultRules,f=a.pluralize,g=a.singularize;d.defaultRules=e,Ember.Inflector=d,Ember.String.pluralize=f,Ember.String.singularize=g,c["default"]=d,c.pluralize=f,c.singularize=g}),b("ember-inflector/lib/system",["./system/inflector","./system/string","./system/inflections","exports"],function(a,b,c,d){"use strict";var e=a["default"],f=b.pluralize,g=b.singularize,h=c["default"];e.inflector=new e(h),d.Inflector=e,d.singularize=g,d.pluralize=f,d.defaultRules=h}),b("ember-inflector/lib/system/inflections",["exports"],function(a){"use strict";var b={plurals:[[/$/,"s"],[/s$/i,"s"],[/^(ax|test)is$/i,"$1es"],[/(octop|vir)us$/i,"$1i"],[/(octop|vir)i$/i,"$1i"],[/(alias|status)$/i,"$1es"],[/(bu)s$/i,"$1ses"],[/(buffal|tomat)o$/i,"$1oes"],[/([ti])um$/i,"$1a"],[/([ti])a$/i,"$1a"],[/sis$/i,"ses"],[/(?:([^f])fe|([lr])f)$/i,"$1$2ves"],[/(hive)$/i,"$1s"],[/([^aeiouy]|qu)y$/i,"$1ies"],[/(x|ch|ss|sh)$/i,"$1es"],[/(matr|vert|ind)(?:ix|ex)$/i,"$1ices"],[/^(m|l)ouse$/i,"$1ice"],[/^(m|l)ice$/i,"$1ice"],[/^(ox)$/i,"$1en"],[/^(oxen)$/i,"$1"],[/(quiz)$/i,"$1zes"]],singular:[[/s$/i,""],[/(ss)$/i,"$1"],[/(n)ews$/i,"$1ews"],[/([ti])a$/i,"$1um"],[/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)(sis|ses)$/i,"$1sis"],[/(^analy)(sis|ses)$/i,"$1sis"],[/([^f])ves$/i,"$1fe"],[/(hive)s$/i,"$1"],[/(tive)s$/i,"$1"],[/([lr])ves$/i,"$1f"],[/([^aeiouy]|qu)ies$/i,"$1y"],[/(s)eries$/i,"$1eries"],[/(m)ovies$/i,"$1ovie"],[/(x|ch|ss|sh)es$/i,"$1"],[/^(m|l)ice$/i,"$1ouse"],[/(bus)(es)?$/i,"$1"],[/(o)es$/i,"$1"],[/(shoe)s$/i,"$1"],[/(cris|test)(is|es)$/i,"$1is"],[/^(a)x[ie]s$/i,"$1xis"],[/(octop|vir)(us|i)$/i,"$1us"],[/(alias|status)(es)?$/i,"$1"],[/^(ox)en/i,"$1"],[/(vert|ind)ices$/i,"$1ex"],[/(matr)ices$/i,"$1ix"],[/(quiz)zes$/i,"$1"],[/(database)s$/i,"$1"]],irregularPairs:[["person","people"],["man","men"],["child","children"],["sex","sexes"],["move","moves"],["cow","kine"],["zombie","zombies"]],uncountable:["equipment","information","rice","money","species","series","fish","sheep","jeans","police"]};a["default"]=b}),b("ember-inflector/lib/system/inflector",["exports"],function(a){"use strict";function b(a,b){for(var c=0,d=b.length;d>c;c++)a.uncountable[b[c].toLowerCase()]=!0}function c(a,b){for(var c,d=0,e=b.length;e>d;d++)c=b[d],a.irregular[c[0].toLowerCase()]=c[1],a.irregularInverse[c[1].toLowerCase()]=c[0]}function d(a){a=a||{},a.uncountable=a.uncountable||{},a.irregularPairs=a.irregularPairs||{};var d=this.rules={plurals:a.plurals||[],singular:a.singular||[],irregular:{},irregularInverse:{},uncountable:{}};b(d,a.uncountable),c(d,a.irregularPairs)}var e=/^\s*$/;d.prototype={plural:function(a,b){this.rules.plurals.push([a,b.toLowerCase()])},singular:function(a,b){this.rules.singular.push([a,b.toLowerCase()])},uncountable:function(a){b(this.rules,[a.toLowerCase()])},irregular:function(a,b){c(this.rules,[[a,b]])},pluralize:function(a){return this.inflect(a,this.rules.plurals,this.rules.irregular)},singularize:function(a){return this.inflect(a,this.rules.singular,this.rules.irregularInverse)},inflect:function(a,b,c){var d,f,g,h,i,j,k,l;if(i=e.test(a))return a;if(h=a.toLowerCase(),j=this.rules.uncountable[h])return a;if(k=c&&c[h])return k;for(var m=b.length,n=0;m>n&&(d=b[m-1],l=d[0],!l.test(a));m--);return d=d||[],l=d[0],f=d[1],g=a.replace(l,f)}},a["default"]=d}),b("ember-inflector/lib/system/string",["./inflector","exports"],function(a,b){"use strict";var c=a["default"],d=function(a){return c.inflector.pluralize(a)},e=function(a){return c.inflector.singularize(a)};b.pluralize=d,b.singularize=e}),a.DS=c("ember-data/lib/main")["default"]}(Ember.lookup);
(function() {
  window.Oli = Ember.Application.create({
    LOG_TRANSITIONS: true,
    customEvents: {
      hoverIntent: 'hoverIntent',
      'hover': 'hover'
    }
  });

}).call(this);
/*!
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license.
 * Copyright 2007, 2013 Brian Cherne
 */

(function(e){e.fn.hoverIntent=function(t,n,r){var i={interval:100,sensitivity:7,timeout:0};if(typeof t==="object"){i=e.extend(i,t)}else if(e.isFunction(n)){i=e.extend(i,{over:t,out:n,selector:r})}else{i=e.extend(i,{over:t,out:t,selector:n})}var s,o,u,a;var f=function(e){s=e.pageX;o=e.pageY};var l=function(t,n){n.hoverIntent_t=clearTimeout(n.hoverIntent_t);if(Math.abs(u-s)+Math.abs(a-o)<i.sensitivity){e(n).off("mousemove.hoverIntent",f);n.hoverIntent_s=1;return i.over.apply(n,[t])}else{u=s;a=o;n.hoverIntent_t=setTimeout(function(){l(t,n)},i.interval)}};var c=function(e,t){t.hoverIntent_t=clearTimeout(t.hoverIntent_t);t.hoverIntent_s=0;return i.out.apply(t,[e])};var h=function(t){var n=jQuery.extend({},t);var r=this;if(r.hoverIntent_t){r.hoverIntent_t=clearTimeout(r.hoverIntent_t)}if(t.type=="mouseenter"){u=n.pageX;a=n.pageY;e(r).on("mousemove.hoverIntent",f);if(r.hoverIntent_s!=1){r.hoverIntent_t=setTimeout(function(){l(n,r)},i.interval)}}else{e(r).off("mousemove.hoverIntent",f);if(r.hoverIntent_s==1){r.hoverIntent_t=setTimeout(function(){c(n,r)},i.timeout)}}};return this.on({"mouseenter.hoverIntent":h,"mouseleave.hoverIntent":h},i.selector)}})(jQuery)
;
(function() {


}).call(this);
(function() {
  Oli.Activity = DS.Model.extend({
    name: DS.attr('string'),
    section: DS.belongsTo('section', {
      async: true
    })
  });

}).call(this);
(function() {
  Oli.Course = DS.Model.extend({
    name: DS.attr('string'),
    topics: DS.hasMany('topic', {
      async: true
    })
  });

}).call(this);
(function() {
  Oli.NavBar = DS.Model.extend({
    topics: DS.hasMany('topic')
  });

}).call(this);
(function() {
  Oli.Section = DS.Model.extend({
    name: DS.attr('string'),
    topic: DS.belongsTo('topic', {
      async: true
    }),
    activities: DS.hasMany('activity', {
      async: true
    })
  });

}).call(this);
(function() {
  Oli.ThinBar = Ember.Object.extend({
    numBoxes: function(num) {}
  });

}).call(this);
(function() {
  Oli.Topic = DS.Model.extend({
    name: DS.attr('string'),
    course: DS.belongsTo('course', {
      async: true
    }),
    sections: DS.hasMany('section', {
      async: true
    })
  });

}).call(this);
(function() {
  Oli.ActivitiesController = Ember.ObjectController.extend(Ember.Evented, {
    needs: ['sections'],
    hash: function() {
      var hash;
      return hash = {};
    },
    activities: (function(model, obj) {
      return this.get('controllers.sections').get('activities');
    }).property('name'),
    actions: {
      moveArrow: function(element) {
        console.log("MOVE ARROW");
        console.log(this.content.get("name"));
        this.set('hovering', this.content.get("name"));
        return this.trigger('delegate.clickedBox', this);
      },
      goHere: function(act) {
        console.log("TRANS: " + act);
        if (act !== void 0) {
          return this.transitionToRoute('activities', act);
        }
      },
      hover: function(item) {
        console.log("HOVER: " + item);
        return this.set('hovering', item.get('name'));
      },
      click: function(item) {
        console.log("CLICK: " + item);
        return this.set('hovering', item.get('name'));
      }
    }
  });

}).call(this);
(function() {
  Oli.CourseController = Ember.ObjectController.extend({
    test: "TEST",
    course: (function(model, obj) {
      return this.get('content');
    }).property('name'),
    sections: (function(model, obj) {}).property('name')
  });

}).call(this);
(function() {
  Oli.NavController = Ember.ObjectController.extend({});

}).call(this);
(function() {
  Oli.SectionsController = Ember.ObjectController.extend(Ember.Evented, {
    needs: "topics",
    actions: {
      moveArrow: function(element) {
        return this.trigger('delegate.clickedBox', this);
      },
      goHere: function(act) {
        return this.transitionToRoute('activities', act);
      },
      hover: function(item) {
        return this.set('hovering', item);
      },
      click: function(item) {
        alert("TEST");
        return this.set('clicking', item);
      }
    },
    activities: (function(model, obj) {
      return this.content.get('activities');
    }).property('name')
  });

}).call(this);
(function() {
  Oli.TopicsController = Ember.ObjectController.extend({
    needs: 'course',
    test: "TEST",
    disableLink: (function() {
      return false;
    })(),
    sections: (function(model, obj) {
      if (this.content) {
        return this.content.get('sections');
      } else {
        return this.store.getById('topic', 1).get('sections');
      }
    }).property('name')
  });

  Oli.TopicController = Ember.ObjectController.extend({});

}).call(this);
(function() {
  Oli.BarView = Em.View.extend({
    didInsertElement: function() {},
    click: function() {
      console.log(this.get('controller').get('name'));
      return this.get('controller').send('moveArrow', this);
    },
    children: function() {
      return this.$().children();
    },
    mouseLeave: function() {
      return $(this.children()[0]).stop().fadeOut("fast");
    }
  });

  Oli.NotchView = Em.View.extend({
    classNameBindings: ['notchEmber'],
    notchEmber: true,
    didInsertElement: function() {
      return this.$().hoverIntent(((function(_this) {
        return function() {
          var oBox, oNotch;
          oBox = _this.hoverBox().offset();
          oNotch = _this.$().offset();
          if (_this.hoverBox().is(":hidden")) {
            _this.hoverBox().stop().fadeIn("fast");
            _this.hoverBox().offset({
              top: oNotch.top,
              left: oNotch.left
            });
          } else {
            _this.hoverBox().animate({
              top: oBox.top,
              left: oNotch.left
            });
          }
          return _this.get('controller').send('hover', _this.get('context'));
        };
      })(this)), function() {});
    },
    click: function() {
      return this.get('controller').send('goHere', this.get('context').get('name'));
    },
    hoverBox: function() {
      return $('#hover-box');
    }
  });

  Oli.TriangleView = Em.View.extend({
    classNameBindings: ['thinBarArrow'],
    thinBarArrow: true,
    didInsertElement: function() {
      return this.get('controller').on('delegate.clickedBox', this, this.delegate.clickedBox);
    },
    delegate: {
      clickedBox: function(t) {
        return t.get('activities').then((function(_this) {
          return function(acts) {
            var a, bar, hash, hoverBox, i, index, notchLength, oThin, oTri, thinBar, triangle, _i, _len, _ref;
            hash = {};
            _ref = acts.toArray();
            for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
              a = _ref[i];
              hash[a.get('name')] = i + 1;
            }
            index;
            triangle = _this.$();
            oTri = triangle.offset();
            console.log(hash[t.get('name')]);
            index = hash[t.get('name')];
            thinBar = $('#thin-bar');
            oThin = thinBar.offset();
            hoverBox = $('#hover-box');
            bar = $('#thin-bar');
            notchLength = bar.children('.notch-ember').eq(0).width();
            return triangle.animate({
              top: oTri.top - oThin.top,
              left: (index - 1) * notchLength
            });
          };
        })(this));
      }
    }
  });

}).call(this);
Ember.TEMPLATES["application"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "nav", options) : helperMissing.call(depth0, "outlet", "nav", options))));
  data.buffer.push("\n");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "levels", options) : helperMissing.call(depth0, "outlet", "levels", options))));
  data.buffer.push("\n");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "bar", options) : helperMissing.call(depth0, "outlet", "bar", options))));
  data.buffer.push("\n");
  data.buffer.push(escapeExpression((helper = helpers.outlet || (depth0 && depth0.outlet),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data},helper ? helper.call(depth0, "course", options) : helperMissing.call(depth0, "outlet", "course", options))));
  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["bar"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var stack1;
  stack1 = helpers.view.call(depth0, "Oli.NotchView", {hash:{
    'contextBinding': ("item")
  },hashTypes:{'contextBinding': "STRING"},hashContexts:{'contextBinding': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }
function program2(depth0,data) {
  
  
  data.buffer.push("\n    <div class=\"notch\"></div>\n    ");
  }

function program4(depth0,data) {
  
  var buffer = '';
  return buffer;
  }

  data.buffer.push("  <div id=\"hover-box\" class=\"test-hover\" ");
  data.buffer.push(escapeExpression(helpers.action.call(depth0, "goHere", "hovering", {hash:{
    'on': ("click")
  },hashTypes:{'on': "STRING"},hashContexts:{'on': depth0},contexts:[depth0,depth0],types:["STRING","ID"],data:data})));
  data.buffer.push(">\n    ");
  stack1 = helpers._triageMustache.call(depth0, "hovering", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div>\n\n  <div class=\"thin-bar-wrapper\" id=\"thin-bar\">\n    ");
  stack1 = helpers.each.call(depth0, "item", "in", "controller.activities", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0,depth0,depth0],types:["ID","ID","ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n    ");
  stack1 = helpers.view.call(depth0, "Oli.TriangleView", {hash:{
    'id': ("triangle")
  },hashTypes:{'id': "STRING"},hashContexts:{'id': depth0},inverse:self.noop,fn:self.program(4, program4, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n  </div> <!-- /.thin-bar-wrapper -->\n");
  return buffer;
  
});
Ember.TEMPLATES["course"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '';


  data.buffer.push("\n");
  return buffer;
  
});
Ember.TEMPLATES["levels"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n      <div class=\"start-items col-lg-2\">\n        ");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{
    'disabledWhen': ("controller.disableLink")
  },hashTypes:{'disabledWhen': "ID"},hashContexts:{'disabledWhen': depth0},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "sections", "name", options) : helperMissing.call(depth0, "link-to", "sections", "name", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push(" \n      </div>\n      ");
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

  data.buffer.push("<div class=\"section-wrapper\">\n  <br><br><br><br>\n  <div class=\"sections-row-oli row\">\n    <div class=\"sections-row-ball\"></div>\n\n    ");
  stack1 = helpers.each.call(depth0, "controller.sections", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n  </div> <!-- /.row -->\n</div> <!-- /.section-wrapper -->\n");
  return buffer;
  
});
Ember.TEMPLATES["nav"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', helper, options, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  data.buffer.push("<nav class=\"navbar navbar-default navbar-fixed-top navbar-oli\" role=\"navigation\">\n  <div class=\"container-fluid\">\n    <!-- Brand and toggle get grouped for better mobile display -->\n   \n    <div class=\"navbar-header\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n        <span class=\"sr-only\">Toggle navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n    </div>\n    <!-- Collect the nav links, forms, and other content for toggling -->\n    <div class=\"collapse navbar-collapse  navbar-text\" id=\"bs-example-navbar-collapse-1\">\n      <ul class=\"nav navbar-nav \">\n        \n        ");
  data.buffer.push(escapeExpression((helper = helpers.partial || (depth0 && depth0.partial),options={hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["STRING"],data:data},helper ? helper.call(depth0, "navContents", options) : helperMissing.call(depth0, "partial", "navContents", options))));
  data.buffer.push("\n      </ul>\n    </div><!-- /.navbar-collapse -->\n  </div><!-- /.container-fluid -->\n</nav>\n\n<div class=\"navbar-border navbar-fixed-top\"></div>\n\n  <div class=\".col-md-3\"> </div>\n</div> <!-- /.row --> \n");
  return buffer;
  
});
Ember.TEMPLATES["nav_contents"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
  var buffer = '', stack1, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = '', stack1, helper, options;
  data.buffer.push("\n<li>");
  stack1 = (helper = helpers['link-to'] || (depth0 && depth0['link-to']),options={hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(2, program2, data),contexts:[depth0,depth0],types:["STRING","ID"],data:data},helper ? helper.call(depth0, "topics", "name", options) : helperMissing.call(depth0, "link-to", "topics", "name", options));
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("</li>\n");
  return buffer;
  }
function program2(depth0,data) {
  
  var stack1;
  stack1 = helpers._triageMustache.call(depth0, "name", {hash:{},hashTypes:{},hashContexts:{},contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  else { data.buffer.push(''); }
  }

  stack1 = helpers.each.call(depth0, "controller.topics", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
  data.buffer.push("\n\n\n");
  return buffer;
  
});
(function() {
  Oli.ActivitiesRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      return controller.set('content', model);
    },
    model: function(params) {
      var section;
      section = this.modelFor('sections');
      return section.get('activities').then(function(activities) {
        var a, _i, _len, _ref;
        _ref = activities.toArray();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          a = _ref[_i];
          if (a.get('name') === params.activity) {
            return a;
          }
        }
      });
    }
  });

}).call(this);
(function() {
  Oli.ApplicationRoute = Ember.Route.extend({
    model: function(param) {}
  });

}).call(this);
(function() {
  Oli.CourseRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      console.log("MODEL: " + model);
      controller.set('content', model);
      return this.store.findById('topic', 1).then(function(t) {
        return t.get('sections').then(function() {});
      });
    },
    renderTemplate: function() {
      var activitiesController, courseController, navController, sectionsController, topicsController;
      navController = this.controllerFor('topics');
      sectionsController = this.controllerFor('sections');
      activitiesController = this.controllerFor('activities');
      topicsController = this.controllerFor('topics');
      courseController = this.controllerFor('course');
      this.render('nav', {
        outlet: 'nav',
        controller: courseController
      });
      this.render('levels', {
        outlet: 'levels',
        controller: topicsController
      });
      this.render('bar', {
        outlet: 'bar',
        controller: activitiesController
      });
      return this.render('course', {
        outlet: 'course',
        controller: courseController
      });
    },
    afterModel: function(course, transition) {
      if (transition.targetName === "course.index") {
        return this.transitionTo("activities", "LifeStyle", "Level 1", "Start");
      }
    },
    model: function(params) {
      var course;
      return course = this.store.find('course', params.id);
    }
  });

}).call(this);
(function() {
  Oli.NavRoute = Ember.Route.extend({
    setupController: function(controller, model) {}
  });

}).call(this);
(function() {
  Oli.SectionsRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      return controller.set('content', model);
    },
    afterModel: function(topic, transition) {
      console.log("TRANS: " + transition);
      if (transition.targetName === "sections.index") {
        return this.transitionTo("activities", "Start");
      }
    },
    model: function(params) {
      var topic;
      topic = this.modelFor('topics');
      return topic.get('sections').then(function(sections) {
        var s, _i, _len, _ref;
        _ref = sections.toArray();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          if (s.get('name') === params.section) {
            return s;
          }
        }
      });
    }
  });

  Oli.SectionsIndexRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      return controller.set('content', model);
    },
    afterModel: function(topic, transition) {
      console.log("TRANS: " + transition);
      if (transition.targetName === "sections.index") {
        return this.transitionTo("activities", "Start");
      }
    },
    model: function(params) {
      var topic;
      topic = this.modelFor('topics');
      return topic.get('sections').then(function(sections) {
        var s, _i, _len, _ref;
        _ref = sections.toArray();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          s = _ref[_i];
          if (s.get('name') === params.section) {
            return s;
          }
        }
      });
    }
  });

}).call(this);
(function() {
  Oli.TopicsRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      console.log("DONE");
      return controller.set('content', model);
    },
    model: function(params) {
      var course;
      course = this.modelFor('course');
      return course.get('topics').then(function(topics) {
        var t, _i, _len, _ref;
        _ref = topics.toArray();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          if (t.get('name') === params.topic) {
            return t;
          }
        }
      });
    },
    afterModel: function(topic, transition) {
      if (transition.targetName === "topics.index") {
        return this.transitionTo("activities", "Level 1", "Exercise 1");
      }
    }
  });

  Oli.TopicsIndexRoute = Ember.Route.extend({
    setupController: function(controller, model) {
      console.log("DONE");
      return controller.set('content', model);
    },
    model: function(params) {
      var course;
      course = this.modelFor('course');
      return course.get('topics').then(function(topics) {
        var t, _i, _len, _ref;
        _ref = topics.toArray();
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          t = _ref[_i];
          if (t.get('name') === params.topic) {
            return t;
          }
        }
      });
    },
    afterModel: function(topic, transition) {
      if (transition.targetName === "topics.index") {
        return this.transitionTo("activities", "Level 1", "Exercise 1");
      }
    }
  });

}).call(this);
(function() {
  Oli.Router.map(function() {
    this.route('course', {
      path: "/courses/*wildcard"
    });
    return this.resource('course', {
      path: "/courses/:id"
    }, function() {
      return this.resource('topics', {
        path: "/topics/:topic"
      }, function() {
        return this.resource('sections', {
          path: "/sections/:section"
        }, function() {
          return this.resource('activities', {
            path: "/activities/:activity"
          });
        });
      });
    });
  });

  Oli.Router.reopen({
    location: 'history',
    rootURL: '/'
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
