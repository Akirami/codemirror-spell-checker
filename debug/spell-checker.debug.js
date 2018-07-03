/**
 * codemirror-spell-checker-inkdrop v1.2.0
 * Copyright Next Step Webs, Inc.
 * @link https://github.com/inkdropapp/codemirror-spell-checker/tree/inkdrop
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.CodeMirrorSpellChecker = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Use strict mode (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)
"use strict";

var Typo = window.Typo;

// Check if the string is in alphabets
// Borrowed from: https://stackoverflow.com/a/17056233/1217590
function isAlpha(string) {
	var patt = /^[a-zA-Z\u00C6\u00D0\u018E\u018F\u0190\u0194\u0132\u014A\u0152\u1E9E\u00DE\u01F7\u021C\u00E6\u00F0\u01DD\u0259\u025B\u0263\u0133\u014B\u0153\u0138\u017F\u00DF\u00FE\u01BF\u021D\u0104\u0181\u00C7\u0110\u018A\u0118\u0126\u012E\u0198\u0141\u00D8\u01A0\u015E\u0218\u0162\u021A\u0166\u0172\u01AFY\u0328\u01B3\u0105\u0253\u00E7\u0111\u0257\u0119\u0127\u012F\u0199\u0142\u00F8\u01A1\u015F\u0219\u0163\u021B\u0167\u0173\u01B0y\u0328\u01B4\u00C1\u00C0\u00C2\u00C4\u01CD\u0102\u0100\u00C3\u00C5\u01FA\u0104\u00C6\u01FC\u01E2\u0181\u0106\u010A\u0108\u010C\u00C7\u010E\u1E0C\u0110\u018A\u00D0\u00C9\u00C8\u0116\u00CA\u00CB\u011A\u0114\u0112\u0118\u1EB8\u018E\u018F\u0190\u0120\u011C\u01E6\u011E\u0122\u0194\u00E1\u00E0\u00E2\u00E4\u01CE\u0103\u0101\u00E3\u00E5\u01FB\u0105\u00E6\u01FD\u01E3\u0253\u0107\u010B\u0109\u010D\u00E7\u010F\u1E0D\u0111\u0257\u00F0\u00E9\u00E8\u0117\u00EA\u00EB\u011B\u0115\u0113\u0119\u1EB9\u01DD\u0259\u025B\u0121\u011D\u01E7\u011F\u0123\u0263\u0124\u1E24\u0126I\u00CD\u00CC\u0130\u00CE\u00CF\u01CF\u012C\u012A\u0128\u012E\u1ECA\u0132\u0134\u0136\u0198\u0139\u013B\u0141\u013D\u013F\u02BCN\u0143N\u0308\u0147\u00D1\u0145\u014A\u00D3\u00D2\u00D4\u00D6\u01D1\u014E\u014C\u00D5\u0150\u1ECC\u00D8\u01FE\u01A0\u0152\u0125\u1E25\u0127\u0131\u00ED\u00ECi\u00EE\u00EF\u01D0\u012D\u012B\u0129\u012F\u1ECB\u0133\u0135\u0137\u0199\u0138\u013A\u013C\u0142\u013E\u0140\u0149\u0144n\u0308\u0148\u00F1\u0146\u014B\u00F3\u00F2\u00F4\u00F6\u01D2\u014F\u014D\u00F5\u0151\u1ECD\u00F8\u01FF\u01A1\u0153\u0154\u0158\u0156\u015A\u015C\u0160\u015E\u0218\u1E62\u1E9E\u0164\u0162\u1E6C\u0166\u00DE\u00DA\u00D9\u00DB\u00DC\u01D3\u016C\u016A\u0168\u0170\u016E\u0172\u1EE4\u01AF\u1E82\u1E80\u0174\u1E84\u01F7\u00DD\u1EF2\u0176\u0178\u0232\u1EF8\u01B3\u0179\u017B\u017D\u1E92\u0155\u0159\u0157\u017F\u015B\u015D\u0161\u015F\u0219\u1E63\u00DF\u0165\u0163\u1E6D\u0167\u00FE\u00FA\u00F9\u00FB\u00FC\u01D4\u016D\u016B\u0169\u0171\u016F\u0173\u1EE5\u01B0\u1E83\u1E81\u0175\u1E85\u01BF\u00FD\u1EF3\u0177\u00FF\u0233\u1EF9\u01B4\u017A\u017C\u017E\u1E93]+$/;
	return patt.test(string);
}

// Create function
function CodeMirrorSpellChecker(options) {
	// Initialize
	options = options || {};
	var language = options.language || "en_US";
	var remoteLanguageUrl = options.remoteLanguageUrl || "https://cdn.jsdelivr.net/codemirror.spell-checker/latest/";


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

	var loadRemoteDic = function(type) {
		return function() {
			if(this.readyState === 4 && this.status === 200) {
				CodeMirrorSpellChecker[type] = this.responseText;
				CodeMirrorSpellChecker.num_loaded++;

				if(CodeMirrorSpellChecker.num_loaded == 2) {
					CodeMirrorSpellChecker.typo = new Typo(language, CodeMirrorSpellChecker.aff_data, CodeMirrorSpellChecker.dic_data, {
						platform: "any"
					});
				}
			}
		};
	};

	var loadRemote = function() {
		// Load AFF/DIC data
		if(!CodeMirrorSpellChecker.aff_loading) {
			CodeMirrorSpellChecker.aff_loading = true;
			var xhr_aff = new XMLHttpRequest();
			xhr_aff.open("GET", remoteLanguageUrl + language + ".aff", true);
			xhr_aff.onload = loadRemoteDic("aff_data");
			xhr_aff.send(null);
		}

		if(!CodeMirrorSpellChecker.dic_loading) {
			CodeMirrorSpellChecker.dic_loading = true;
			var xhr_dic = new XMLHttpRequest();
			xhr_dic.open("GET", remoteLanguageUrl + language + ".dic", true);
			xhr_dic.onload = loadRemoteDic("dic_data");
			xhr_dic.send(null);
		}
	};

	// Define the new mode
	options.codeMirrorInstance.defineMode("spell-checker", function(config) {

		loadRemote();

		// Create the overlay and such
		var overlay = {
			token: function(stream) {
				var ch = stream.peek();
				var word = "";

				// var isCodeBlock = stream.lineOracle.state.base.overlay.codeBlock;
				// if(options.ignoreCodeBlocks && isCodeBlock) {
				// 	stream.next();
				// 	return null;
				// }

				if(!isAlpha(ch)) {
					stream.next();
					return null;
				}

				while((ch = stream.peek()) != null && isAlpha(ch)) {
					word += ch;
					stream.next();
				}

				if(CodeMirrorSpellChecker.typo && !CodeMirrorSpellChecker.typo.check(word))
					return "spell-error"; // CSS class: cm-spell-error

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
CodeMirrorSpellChecker.languages = [];
},{}]},{},[1])(1)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvc3BlbGwtY2hlY2tlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFVzZSBzdHJpY3QgbW9kZSAoaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvU3RyaWN0X21vZGUpXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFR5cG8gPSB3aW5kb3cuVHlwbztcblxuLy8gQ2hlY2sgaWYgdGhlIHN0cmluZyBpcyBpbiBhbHBoYWJldHNcbi8vIEJvcnJvd2VkIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNzA1NjIzMy8xMjE3NTkwXG5mdW5jdGlvbiBpc0FscGhhKHN0cmluZykge1xuXHR2YXIgcGF0dCA9IC9eW2EtekEtWlxcdTAwQzZcXHUwMEQwXFx1MDE4RVxcdTAxOEZcXHUwMTkwXFx1MDE5NFxcdTAxMzJcXHUwMTRBXFx1MDE1MlxcdTFFOUVcXHUwMERFXFx1MDFGN1xcdTAyMUNcXHUwMEU2XFx1MDBGMFxcdTAxRERcXHUwMjU5XFx1MDI1QlxcdTAyNjNcXHUwMTMzXFx1MDE0QlxcdTAxNTNcXHUwMTM4XFx1MDE3RlxcdTAwREZcXHUwMEZFXFx1MDFCRlxcdTAyMURcXHUwMTA0XFx1MDE4MVxcdTAwQzdcXHUwMTEwXFx1MDE4QVxcdTAxMThcXHUwMTI2XFx1MDEyRVxcdTAxOThcXHUwMTQxXFx1MDBEOFxcdTAxQTBcXHUwMTVFXFx1MDIxOFxcdTAxNjJcXHUwMjFBXFx1MDE2NlxcdTAxNzJcXHUwMUFGWVxcdTAzMjhcXHUwMUIzXFx1MDEwNVxcdTAyNTNcXHUwMEU3XFx1MDExMVxcdTAyNTdcXHUwMTE5XFx1MDEyN1xcdTAxMkZcXHUwMTk5XFx1MDE0MlxcdTAwRjhcXHUwMUExXFx1MDE1RlxcdTAyMTlcXHUwMTYzXFx1MDIxQlxcdTAxNjdcXHUwMTczXFx1MDFCMHlcXHUwMzI4XFx1MDFCNFxcdTAwQzFcXHUwMEMwXFx1MDBDMlxcdTAwQzRcXHUwMUNEXFx1MDEwMlxcdTAxMDBcXHUwMEMzXFx1MDBDNVxcdTAxRkFcXHUwMTA0XFx1MDBDNlxcdTAxRkNcXHUwMUUyXFx1MDE4MVxcdTAxMDZcXHUwMTBBXFx1MDEwOFxcdTAxMENcXHUwMEM3XFx1MDEwRVxcdTFFMENcXHUwMTEwXFx1MDE4QVxcdTAwRDBcXHUwMEM5XFx1MDBDOFxcdTAxMTZcXHUwMENBXFx1MDBDQlxcdTAxMUFcXHUwMTE0XFx1MDExMlxcdTAxMThcXHUxRUI4XFx1MDE4RVxcdTAxOEZcXHUwMTkwXFx1MDEyMFxcdTAxMUNcXHUwMUU2XFx1MDExRVxcdTAxMjJcXHUwMTk0XFx1MDBFMVxcdTAwRTBcXHUwMEUyXFx1MDBFNFxcdTAxQ0VcXHUwMTAzXFx1MDEwMVxcdTAwRTNcXHUwMEU1XFx1MDFGQlxcdTAxMDVcXHUwMEU2XFx1MDFGRFxcdTAxRTNcXHUwMjUzXFx1MDEwN1xcdTAxMEJcXHUwMTA5XFx1MDEwRFxcdTAwRTdcXHUwMTBGXFx1MUUwRFxcdTAxMTFcXHUwMjU3XFx1MDBGMFxcdTAwRTlcXHUwMEU4XFx1MDExN1xcdTAwRUFcXHUwMEVCXFx1MDExQlxcdTAxMTVcXHUwMTEzXFx1MDExOVxcdTFFQjlcXHUwMUREXFx1MDI1OVxcdTAyNUJcXHUwMTIxXFx1MDExRFxcdTAxRTdcXHUwMTFGXFx1MDEyM1xcdTAyNjNcXHUwMTI0XFx1MUUyNFxcdTAxMjZJXFx1MDBDRFxcdTAwQ0NcXHUwMTMwXFx1MDBDRVxcdTAwQ0ZcXHUwMUNGXFx1MDEyQ1xcdTAxMkFcXHUwMTI4XFx1MDEyRVxcdTFFQ0FcXHUwMTMyXFx1MDEzNFxcdTAxMzZcXHUwMTk4XFx1MDEzOVxcdTAxM0JcXHUwMTQxXFx1MDEzRFxcdTAxM0ZcXHUwMkJDTlxcdTAxNDNOXFx1MDMwOFxcdTAxNDdcXHUwMEQxXFx1MDE0NVxcdTAxNEFcXHUwMEQzXFx1MDBEMlxcdTAwRDRcXHUwMEQ2XFx1MDFEMVxcdTAxNEVcXHUwMTRDXFx1MDBENVxcdTAxNTBcXHUxRUNDXFx1MDBEOFxcdTAxRkVcXHUwMUEwXFx1MDE1MlxcdTAxMjVcXHUxRTI1XFx1MDEyN1xcdTAxMzFcXHUwMEVEXFx1MDBFQ2lcXHUwMEVFXFx1MDBFRlxcdTAxRDBcXHUwMTJEXFx1MDEyQlxcdTAxMjlcXHUwMTJGXFx1MUVDQlxcdTAxMzNcXHUwMTM1XFx1MDEzN1xcdTAxOTlcXHUwMTM4XFx1MDEzQVxcdTAxM0NcXHUwMTQyXFx1MDEzRVxcdTAxNDBcXHUwMTQ5XFx1MDE0NG5cXHUwMzA4XFx1MDE0OFxcdTAwRjFcXHUwMTQ2XFx1MDE0QlxcdTAwRjNcXHUwMEYyXFx1MDBGNFxcdTAwRjZcXHUwMUQyXFx1MDE0RlxcdTAxNERcXHUwMEY1XFx1MDE1MVxcdTFFQ0RcXHUwMEY4XFx1MDFGRlxcdTAxQTFcXHUwMTUzXFx1MDE1NFxcdTAxNThcXHUwMTU2XFx1MDE1QVxcdTAxNUNcXHUwMTYwXFx1MDE1RVxcdTAyMThcXHUxRTYyXFx1MUU5RVxcdTAxNjRcXHUwMTYyXFx1MUU2Q1xcdTAxNjZcXHUwMERFXFx1MDBEQVxcdTAwRDlcXHUwMERCXFx1MDBEQ1xcdTAxRDNcXHUwMTZDXFx1MDE2QVxcdTAxNjhcXHUwMTcwXFx1MDE2RVxcdTAxNzJcXHUxRUU0XFx1MDFBRlxcdTFFODJcXHUxRTgwXFx1MDE3NFxcdTFFODRcXHUwMUY3XFx1MDBERFxcdTFFRjJcXHUwMTc2XFx1MDE3OFxcdTAyMzJcXHUxRUY4XFx1MDFCM1xcdTAxNzlcXHUwMTdCXFx1MDE3RFxcdTFFOTJcXHUwMTU1XFx1MDE1OVxcdTAxNTdcXHUwMTdGXFx1MDE1QlxcdTAxNURcXHUwMTYxXFx1MDE1RlxcdTAyMTlcXHUxRTYzXFx1MDBERlxcdTAxNjVcXHUwMTYzXFx1MUU2RFxcdTAxNjdcXHUwMEZFXFx1MDBGQVxcdTAwRjlcXHUwMEZCXFx1MDBGQ1xcdTAxRDRcXHUwMTZEXFx1MDE2QlxcdTAxNjlcXHUwMTcxXFx1MDE2RlxcdTAxNzNcXHUxRUU1XFx1MDFCMFxcdTFFODNcXHUxRTgxXFx1MDE3NVxcdTFFODVcXHUwMUJGXFx1MDBGRFxcdTFFRjNcXHUwMTc3XFx1MDBGRlxcdTAyMzNcXHUxRUY5XFx1MDFCNFxcdTAxN0FcXHUwMTdDXFx1MDE3RVxcdTFFOTNdKyQvO1xuXHRyZXR1cm4gcGF0dC50ZXN0KHN0cmluZyk7XG59XG5cbi8vIENyZWF0ZSBmdW5jdGlvblxuZnVuY3Rpb24gQ29kZU1pcnJvclNwZWxsQ2hlY2tlcihvcHRpb25zKSB7XG5cdC8vIEluaXRpYWxpemVcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cdHZhciBsYW5ndWFnZSA9IG9wdGlvbnMubGFuZ3VhZ2UgfHwgXCJlbl9VU1wiO1xuXHR2YXIgcmVtb3RlTGFuZ3VhZ2VVcmwgPSBvcHRpb25zLnJlbW90ZUxhbmd1YWdlVXJsIHx8IFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2NvZGVtaXJyb3Iuc3BlbGwtY2hlY2tlci9sYXRlc3QvXCI7XG5cblxuXHQvLyBWZXJpZnlcblx0aWYodHlwZW9mIG9wdGlvbnMuY29kZU1pcnJvckluc3RhbmNlICE9PSBcImZ1bmN0aW9uXCIgfHwgdHlwZW9mIG9wdGlvbnMuY29kZU1pcnJvckluc3RhbmNlLmRlZmluZU1vZGUgIT09IFwiZnVuY3Rpb25cIikge1xuXHRcdGNvbnNvbGUubG9nKFwiQ29kZU1pcnJvciBTcGVsbCBDaGVja2VyOiBZb3UgbXVzdCBwcm92aWRlIGFuIGluc3RhbmNlIG9mIENvZGVNaXJyb3IgdmlhIHRoZSBvcHRpb24gYGNvZGVNaXJyb3JJbnN0YW5jZWBcIik7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblxuXHQvLyBCZWNhdXNlIHNvbWUgYnJvd3NlcnMgZG9uJ3Qgc3VwcG9ydCB0aGlzIGZ1bmN0aW9uYWxpdHkgeWV0XG5cdGlmKCFTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzKSB7XG5cdFx0U3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XCJ1c2Ugc3RyaWN0XCI7XG5cdFx0XHRyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS5pbmRleE9mLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgIT09IC0xO1xuXHRcdH07XG5cdH1cblxuXHR2YXIgbG9hZFJlbW90ZURpYyA9IGZ1bmN0aW9uKHR5cGUpIHtcblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRpZih0aGlzLnJlYWR5U3RhdGUgPT09IDQgJiYgdGhpcy5zdGF0dXMgPT09IDIwMCkge1xuXHRcdFx0XHRDb2RlTWlycm9yU3BlbGxDaGVja2VyW3R5cGVdID0gdGhpcy5yZXNwb25zZVRleHQ7XG5cdFx0XHRcdENvZGVNaXJyb3JTcGVsbENoZWNrZXIubnVtX2xvYWRlZCsrO1xuXG5cdFx0XHRcdGlmKENvZGVNaXJyb3JTcGVsbENoZWNrZXIubnVtX2xvYWRlZCA9PSAyKSB7XG5cdFx0XHRcdFx0Q29kZU1pcnJvclNwZWxsQ2hlY2tlci50eXBvID0gbmV3IFR5cG8obGFuZ3VhZ2UsIENvZGVNaXJyb3JTcGVsbENoZWNrZXIuYWZmX2RhdGEsIENvZGVNaXJyb3JTcGVsbENoZWNrZXIuZGljX2RhdGEsIHtcblx0XHRcdFx0XHRcdHBsYXRmb3JtOiBcImFueVwiXG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXG5cdHZhciBsb2FkUmVtb3RlID0gZnVuY3Rpb24oKSB7XG5cdFx0Ly8gTG9hZCBBRkYvRElDIGRhdGFcblx0XHRpZighQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfbG9hZGluZykge1xuXHRcdFx0Q29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfbG9hZGluZyA9IHRydWU7XG5cdFx0XHR2YXIgeGhyX2FmZiA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyX2FmZi5vcGVuKFwiR0VUXCIsIHJlbW90ZUxhbmd1YWdlVXJsICsgbGFuZ3VhZ2UgKyBcIi5hZmZcIiwgdHJ1ZSk7XG5cdFx0XHR4aHJfYWZmLm9ubG9hZCA9IGxvYWRSZW1vdGVEaWMoXCJhZmZfZGF0YVwiKTtcblx0XHRcdHhocl9hZmYuc2VuZChudWxsKTtcblx0XHR9XG5cblx0XHRpZighQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5kaWNfbG9hZGluZykge1xuXHRcdFx0Q29kZU1pcnJvclNwZWxsQ2hlY2tlci5kaWNfbG9hZGluZyA9IHRydWU7XG5cdFx0XHR2YXIgeGhyX2RpYyA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHRcdFx0eGhyX2RpYy5vcGVuKFwiR0VUXCIsIHJlbW90ZUxhbmd1YWdlVXJsICsgbGFuZ3VhZ2UgKyBcIi5kaWNcIiwgdHJ1ZSk7XG5cdFx0XHR4aHJfZGljLm9ubG9hZCA9IGxvYWRSZW1vdGVEaWMoXCJkaWNfZGF0YVwiKTtcblx0XHRcdHhocl9kaWMuc2VuZChudWxsKTtcblx0XHR9XG5cdH07XG5cblx0Ly8gRGVmaW5lIHRoZSBuZXcgbW9kZVxuXHRvcHRpb25zLmNvZGVNaXJyb3JJbnN0YW5jZS5kZWZpbmVNb2RlKFwic3BlbGwtY2hlY2tlclwiLCBmdW5jdGlvbihjb25maWcpIHtcblxuXHRcdGxvYWRSZW1vdGUoKTtcblxuXHRcdC8vIENyZWF0ZSB0aGUgb3ZlcmxheSBhbmQgc3VjaFxuXHRcdHZhciBvdmVybGF5ID0ge1xuXHRcdFx0dG9rZW46IGZ1bmN0aW9uKHN0cmVhbSkge1xuXHRcdFx0XHR2YXIgY2ggPSBzdHJlYW0ucGVlaygpO1xuXHRcdFx0XHR2YXIgd29yZCA9IFwiXCI7XG5cblx0XHRcdFx0Ly8gdmFyIGlzQ29kZUJsb2NrID0gc3RyZWFtLmxpbmVPcmFjbGUuc3RhdGUuYmFzZS5vdmVybGF5LmNvZGVCbG9jaztcblx0XHRcdFx0Ly8gaWYob3B0aW9ucy5pZ25vcmVDb2RlQmxvY2tzICYmIGlzQ29kZUJsb2NrKSB7XG5cdFx0XHRcdC8vIFx0c3RyZWFtLm5leHQoKTtcblx0XHRcdFx0Ly8gXHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0Ly8gfVxuXG5cdFx0XHRcdGlmKCFpc0FscGhhKGNoKSkge1xuXHRcdFx0XHRcdHN0cmVhbS5uZXh0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR3aGlsZSgoY2ggPSBzdHJlYW0ucGVlaygpKSAhPSBudWxsICYmIGlzQWxwaGEoY2gpKSB7XG5cdFx0XHRcdFx0d29yZCArPSBjaDtcblx0XHRcdFx0XHRzdHJlYW0ubmV4dCgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoQ29kZU1pcnJvclNwZWxsQ2hlY2tlci50eXBvICYmICFDb2RlTWlycm9yU3BlbGxDaGVja2VyLnR5cG8uY2hlY2sod29yZCkpXG5cdFx0XHRcdFx0cmV0dXJuIFwic3BlbGwtZXJyb3JcIjsgLy8gQ1NTIGNsYXNzOiBjbS1zcGVsbC1lcnJvclxuXG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHR2YXIgbW9kZSA9IG9wdGlvbnMuY29kZU1pcnJvckluc3RhbmNlLmdldE1vZGUoXG5cdFx0XHRjb25maWcsIGNvbmZpZy5iYWNrZHJvcCB8fCBcInRleHQvcGxhaW5cIlxuXHRcdCk7XG5cblx0XHRyZXR1cm4gb3B0aW9ucy5jb2RlTWlycm9ySW5zdGFuY2Uub3ZlcmxheU1vZGUobW9kZSwgb3ZlcmxheSwgdHJ1ZSk7XG5cdH0pO1xufVxuXG5cbi8vIEluaXRpYWxpemUgZGF0YSBnbG9iYWxseSB0byByZWR1Y2UgbWVtb3J5IGNvbnN1bXB0aW9uXG5Db2RlTWlycm9yU3BlbGxDaGVja2VyLm51bV9sb2FkZWQgPSAwO1xuQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfbG9hZGluZyA9IGZhbHNlO1xuQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5kaWNfbG9hZGluZyA9IGZhbHNlO1xuQ29kZU1pcnJvclNwZWxsQ2hlY2tlci5hZmZfZGF0YSA9IFwiXCI7XG5Db2RlTWlycm9yU3BlbGxDaGVja2VyLmRpY19kYXRhID0gXCJcIjtcbkNvZGVNaXJyb3JTcGVsbENoZWNrZXIudHlwbztcbkNvZGVNaXJyb3JTcGVsbENoZWNrZXIubGFuZ3VhZ2VzID0gW107Il19
