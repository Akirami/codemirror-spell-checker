se strict mode (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";


// Requires
var Typo = require("typo-js");


// Create function
function CodeMirrorSpellChecker(options) {
	// Initialize
	options = options || {};

	// Verify
	if(typeof options.codeMirrorInstance !== "function" || typeof options.codeMirrorInstance.defineMode !== "function") {
		console.log("CodeMirror Spell Checker: You must provide an instance of CodeMirror via the option `codeMirrorInstance`");
		return;
	}


	// Because some browsers don't support this functionality yet
	if(!String.prototype.includes) {
		String.prototype.includes = function() {
			"use strict";
			return String.prototype.indexOf.apply(this, arguments) !== -1;
		};
	}


	// Define the new mode
	options.codeMirrorInstance.defineMode("spell-checker", function(config) {
		// Load AFF/DIC data
		if(!CodeMirrorSpellChecker.aff_loading) {
			CodeMirrorSpellChecker.aff_loading = true;
			var xhr_aff = new XMLHttpRequest();
			var affUrl;
			if(options.customDict === undefined) {
				affUrl = "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff";
			} else {
				affUrl = options.customDict.aff;
			}
			xhr_aff.open("GET", affUrl, true);
			xhr_aff.onload = function() {
				if(xhr_aff.readyState === 4 && xhr_aff.status === 200) {
					CodeMirrorSpellChecker.aff_data = xhr_aff.responseText;
					CodeMirrorSpellChecker.num_loaded++;

					if(CodeMirrorSpellChecker.num_loaded == 2) {
						CodeMirrorSpellChecker.typo = new Typo("en_US", CodeMirrorSpellChecker.aff_data, CodeMirrorSpellChecker.dic_data, {
							platform: "any"
						});
					}
				}
			};
			xhr_aff.send(null);
		}

		if(!CodeMirrorSpellChecker.dic_loading) {
			CodeMirrorSpellChecker.dic_loading = true;
			var xhr_dic = new XMLHttpRequest();
			var dicUrl;
			if(options.customDict === undefined) {
				dicUrl = "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic";
			} else {
				dicUrl = options.customDict.dic;
			}
			xhr_dic.open("GET", dicUrl, true);
			xhr_dic.onload = function() {
				if(xhr_dic.readyState === 4 && xhr_dic.status === 200) {
					CodeMirrorSpellChecker.dic_data = xhr_dic.responseText;
					CodeMirrorSpellChecker.num_loaded++;

					if(CodeMirrorSpellChecker.num_loaded == 2) {
						CodeMirrorSpellChecker.typo = new Typo("en_US", CodeMirrorSpellChecker.aff_data, CodeMirrorSpellChecker.dic_data, {
							platform: "any"
						});
					}
				}
			};
			xhr_dic.addEventListener("progress", function() {
				if(xhr_dic.status === 200) {
					var sommaireWrapper = document.getElementById("sommaireWrapper");
					if(sommaireWrapper) {
						sommaireWrapper.style.display = "block";
					}
				}
			}, false);
			xhr_dic.addEventListener("load", function() {
				if(xhr_dic.status === 200) {
					var sommaireWrapper = document.getElementById("sommaireWrapper");
					if(sommaireWrapper) {
						sommaireWrapper.style.display = "none";
					}
				}
			}, false);
			xhr_dic.send(null);
		}


		// Define what separates a word
		var rx_word = /^[^!\"#$%&()’'*+,\-./:;<=>?@\[\\\]^_`{|}~\s]+/;

		// Ignore words that are just numbers
		var rx_ignore = /^[0-9]+$/;

		// Get array of custom words
		var customWords;
		if(options.customWords && options.customWords instanceof Array) {
			customWords = options.customWords || [];
		}

		// Create the overlay and such
		var overlay = {
			token: function(stream) {
				var isCodeBlock = stream.lineOracle.state.base.overlay.codeBlock;
				if(options.ignoreCodeBlocks && isCodeBlock) {
					stream.next();
					return null;
				}
				var word = stream.match(rx_word, true);
				if(word) {
					word = word[0]; // regex match body
					if(!word.match(rx_ignore) && CodeMirrorSpellChecker.typo && !CodeMirrorSpellChecker.typo.check(word) && !~customWords.indexOf(word))
						return "spell-error"; // CSS class: cm-spell-error
				} else {
					stream.next(); // skip non-word character
				}
				return null;
			}
		};

		var mode = options.codeMirrorInstance.getMode(
			config, config.backdrop || "text/plain"
		);

		return options.codeMirrorInstance.overlayMode(mode, overlay, true);
	});
}


// Initialize data globally to reduce memory consumption
CodeMirrorSpellChecker.num_loaded = 0;
CodeMirrorSpellChecker.aff_loading = false;
CodeMirrorSpellChecker.dic_loading = false;
CodeMirrorSpellChecker.aff_data = "";
CodeMirrorSpellChecker.dic_data = "";
CodeMirrorSpellChecker.typo;


// Export
module.exports = CodeMirrorSpellChecker;
