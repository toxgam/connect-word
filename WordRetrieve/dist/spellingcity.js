'use strict';

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = 'https://www.spellingcity.com'; // import {DOMParser} from 'xmldom'


var xs = ['/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386559&group_ids%5B%5D=390989&title=Journeys+Kindergarten+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=383617&title=Dolch+Words+Kindergarten+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=380436&title=Sample+Kindergarten+Practice+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780231&title=Academic+Vocabulary+Kindergarten+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386841&title=Heteronymns+Elementary+School+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386801&title=Homonymns+K-2nd+Grade+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=246729&title=Informational+Text+K-1st+Grade+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386257&title=Synonyms+%26+Antonyms+K-2nd+Grade+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=97546&title=Literature+Kindergarten+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=28506&group_ids%5B%5D=397864&group_ids%5B%5D=397865&group_ids%5B%5D=397863&group_ids%5B%5D=397862&title=Math+Kindergarten+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387041&group_ids%5B%5D=22719&group_ids%5B%5D=387731&group_ids%5B%5D=22723&group_ids%5B%5D=22300&group_ids%5B%5D=22722&group_ids%5B%5D=22721&group_ids%5B%5D=22720&title=Science+Kindergarten+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=49993&title=Social+Studies+Kindergarten+Lists'];

var pattern = [{
  pattern: /"(\/view-spelling-list.html\?listId=(.*?))"/g,
  position: 1,
  inject: function inject(template, arr) {
    return arr.map(function (e) {
      return template.substr(e, pattern.length + 40);
    });
  }
}, {
  pattern: /vsctip.*?>(.+?)</g,
  position: 1,
  inject: function inject(template, arr) {
    return arr.map(function (e) {
      return template.substring(57 + e, template.indexOf("<", 57 + e));
    });
  }
}];

var outputname = "wordList.txt";

// searchstring: pattern string (smaller string)
// str: container string (larger string)
var getIndicesOfZFunction = function getIndicesOfZFunction(searchStr, str) {
  var s = searchStr + "" + str; //  is the non-appearing character in str
  var l = 0,
      r = 0;
  var z = [-1];
  var result = [];

  for (var i = 1; i < s.length; i++) {
    if (i >= r) {
      l = r = i;
      z.push(0);
    } else {
      if (i + z[i - l] > r) {
        z.push(r - i + 1);
      } else {
        z.push(z[i - l]);
      }
    }

    while (i + z[i] < s.length && s[z[i]] === s[i + z[i] + 1]) {
      z[i]++;
    }

    if (i + z[i] > r) {
      l = i;
      r = i + z[i];
    }

    if (z[i] === searchStr.length) {
      result.push(i - searchStr.length);
    }
  }

  return result;
};

var crawl = function crawl(array, idx, pattern, level, src, callback) {
  // Recursion stop condition for this level
  if (idx === array.length) {
    if (callback) {
      callback();
    }
    return;
  }

  // Overall recursion stop condition
  if (level === pattern.length) {
    if (idx === 0) {
      _fs2.default.writeFile(src + "/" + outputname, "");
    }

    _fs2.default.appendFile(src + "/" + outputname, array[idx] + "\n");
    crawl(array, idx + 1, pattern, level, src, callback);

    return;
  }

  _https2.default.get(root + array[idx], function (res) {
    var doc = "";

    res.on('data', function (d) {
      doc += d.toString('utf8');
    });

    res.on('end', function () {
      // if (level === 1) {
      //   const filename = "./WordList/o.html"
      //   console.log(root + array[idx])
      //   fs.writeFile(filename, doc)
      // }

      var result = [];
      var tmp = void 0;
      while (tmp = pattern[level].pattern.exec(doc)) {
        result.push(tmp[pattern[level].position]);
      }
      console.log(src + "/" + idx);

      try {
        _fs2.default.mkdirSync(src + "/" + idx);
      } catch (err) {}

      var thisCallback = function thisCallback() {
        crawl(array, idx + 1, pattern, level, src, callback);
      };
      crawl(result, 0, pattern, level + 1, src + "/" + idx, thisCallback);
    });
  });
};

// Initialize blank output file
_fs2.default.writeFile(outputname, "");

crawl(xs, 0, pattern, 0, "./WordList", undefined);