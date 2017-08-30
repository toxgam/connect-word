'use strict';

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {DOMParser} from 'xmldom'
var root = 'https://www.spellingcity.com';

// kindergarten
// const xs = [
//  '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386559&group_ids%5B%5D=390989&title=Journeys+Kindergarten+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=383617&title=Dolch+Words+Kindergarten+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=380436&title=Sample+Kindergarten+Practice+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780231&title=Academic+Vocabulary+Kindergarten+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386841&title=Heteronymns+Elementary+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386801&title=Homonymns+K-2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=246729&title=Informational+Text+K-1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386257&title=Synonyms+%26+Antonyms+K-2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=97546&title=Literature+Kindergarten+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=28506&group_ids%5B%5D=397864&group_ids%5B%5D=397865&group_ids%5B%5D=397863&group_ids%5B%5D=397862&title=Math+Kindergarten+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387041&group_ids%5B%5D=22719&group_ids%5B%5D=387731&group_ids%5B%5D=22723&group_ids%5B%5D=22300&group_ids%5B%5D=22722&group_ids%5B%5D=22721&group_ids%5B%5D=22720&title=Science+Kindergarten+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=49993&title=Social+Studies+Kindergarten+Lists'
// ]

//Grade 1
// const xs = [
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=375257&group_ids%5B%5D=384028&title=Evan-Moor+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=213656&group_ids%5B%5D=213657&group_ids%5B%5D=213658&group_ids%5B%5D=213645&group_ids%5B%5D=213646&title=Journeys+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=216251&group_ids%5B%5D=213688&group_ids%5B%5D=216252&group_ids%5B%5D=213678&title=Reading+Street+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=221150&group_ids%5B%5D=221151&group_ids%5B%5D=213978&group_ids%5B%5D=213938&title=Wonders+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=383636&title=Dolch+Words+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386209&title=Compound+Words+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=3939&title=Contractions+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=3864&title=Beginning+Spelling+Curriculum+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=371552&title=Sample+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780227&title=Academic+Vocabulary+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386841&title=Heteronymns+Elementary+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386801&title=Homonymns+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386835&title=Homophones+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=246729&title=Informational+Text+K-1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386257&title=Synonyms+%26+Antonyms+K-2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=97547&title=Literature+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=393138&group_ids%5B%5D=28511&group_ids%5B%5D=28564&group_ids%5B%5D=28695&title=Math+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387032&group_ids%5B%5D=22746&group_ids%5B%5D=22743&group_ids%5B%5D=22742&group_ids%5B%5D=22744&group_ids%5B%5D=22745&group_ids%5B%5D=22741&group_ids%5B%5D=22301&title=Science+1st+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=49781&title=Social+Studies+1st+Grade+Lists'
// ]

//Grade 2
// const xs = [
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=380239&group_ids%5B%5D=385174&group_ids%5B%5D=385123&title=Evan-Moor+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=213659&group_ids%5B%5D=213839&group_ids%5B%5D=213660&group_ids%5B%5D=213661&group_ids%5B%5D=213838&group_ids%5B%5D=213647&group_ids%5B%5D=213649&title=Journeys+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=213659&group_ids%5B%5D=213839&group_ids%5B%5D=213660&group_ids%5B%5D=213661&group_ids%5B%5D=213838&group_ids%5B%5D=213647&group_ids%5B%5D=213649&title=Reading+Street+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=213967&group_ids%5B%5D=213968&group_ids%5B%5D=219153&group_ids%5B%5D=213966&group_ids%5B%5D=213698&title=Wonders+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=383652&title=Dolch+Words+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386209&title=Compound+Words+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=3939&title=Contractions+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=3864&title=Beginning+Spelling+Curriculum+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=371550&title=Sample+2nd+Grade+Practice+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780233&title=Academic+Vocabulary+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386841&title=Heteronymns+Elementary+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386801&title=Homonymns+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386835&title=Homophones+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=246778&title=Informational+Text+2nd-3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386257&title=Synonyms+%26+Antonyms+K-2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=97548&title=Literature+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=393110&group_ids%5B%5D=28526&group_ids%5B%5D=28566&group_ids%5B%5D=28741&title=Math+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387033&group_ids%5B%5D=22302&group_ids%5B%5D=387044&group_ids%5B%5D=387043&group_ids%5B%5D=387045&group_ids%5B%5D=22740&group_ids%5B%5D=22738&group_ids%5B%5D=22739&title=Science+2nd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=49994&title=Social+Studies+2nd+Grade+Lists'
// ]

//Grade 3
// const xs = [
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=380242&group_ids%5B%5D=385327&group_ids%5B%5D=385149&title=Evan-Moor+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=213662&group_ids%5B%5D=213663&group_ids%5B%5D=213664&group_ids%5B%5D=213650&group_ids%5B%5D=213651&title=Journeys+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=216285&group_ids%5B%5D=213682&group_ids%5B%5D=213690&group_ids%5B%5D=215912&group_ids%5B%5D=213683&title=Reading+Street+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=220630&group_ids%5B%5D=215770&group_ids%5B%5D=213699&group_ids%5B%5D=213700&title=Wonders+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=383794&title=Dolch+Words+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386680&title=Compound+Words+3rd-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=3939&title=Contractions+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=581640&title=Beginning+Spelling+Curriculum+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=371548&title=Sample+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780234&title=Academic+Vocabulary+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386841&title=Heteronyms+Elementary+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386802&title=Homonyms+3rd-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386836&title=Homophones+3rd-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=246778&title=Informational+Text+2nd-3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386260&title=Synonyms+%26+Antonyms+3rd-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=97549&title=Literature+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=393137&group_ids%5B%5D=394673&group_ids%5B%5D=436444&group_ids%5B%5D=28580&group_ids%5B%5D=31685&title=Math+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387034&group_ids%5B%5D=387112&group_ids%5B%5D=387103&group_ids%5B%5D=387101&group_ids%5B%5D=387106&group_ids%5B%5D=387099&group_ids%5B%5D=22736&group_ids%5B%5D=22306&title=Science+3rd+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=49996&title=Social+Studies+3rd+Grade+Lists'
// ]

//Grade 4
// const xs = [
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=380259&group_ids%5B%5D=385970&group_ids%5B%5D=385142&title=Evan-Moor+4th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=213665&group_ids%5B%5D=213666&group_ids%5B%5D=213667&group_ids%5B%5D=213652&group_ids%5B%5D=213653&title=Journeys+4th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=219433&group_ids%5B%5D=213684&group_ids%5B%5D=213691&group_ids%5B%5D=215922&group_ids%5B%5D=213685&title=Reading+Street+4th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=219174&group_ids%5B%5D=214327&group_ids%5B%5D=215211&group_ids%5B%5D=213702&title=Wonders+4th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386680&title=Compound+Words+3rd-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=371543&title=Fourth+Grade+Practice+Spelling+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780229&title=Academic+Vocabulary+4th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386841&title=Heteronyms+Elementary+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386802&title=Homonyms+3th-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386836&title=Homophones+3th-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=246813&title=Informational+Text+4th-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386260&title=Synonyms+%26+Antonyms+3rd-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=97551&title=Literature+4th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=393136&group_ids%5B%5D=395138&group_ids%5B%5D=395140&group_ids%5B%5D=28638&group_ids%5B%5D=32020&title=Math+4th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387035&group_ids%5B%5D=387130&group_ids%5B%5D=387133&group_ids%5B%5D=387138&group_ids%5B%5D=387136&group_ids%5B%5D=387129&group_ids%5B%5D=22735&group_ids%5B%5D=22307&title=Science+4th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=49997&title=Social+Studies+4th+Grade+Lists'
// ]

//Grade 5
// const xs = [
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=380328&group_ids%5B%5D=385889&group_ids%5B%5D=385168&title=Evan-Moor+5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=289716&group_ids%5B%5D=213668&group_ids%5B%5D=213669&group_ids%5B%5D=213654&group_ids%5B%5D=213655&title=Journeys+5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=220845&group_ids%5B%5D=213686&group_ids%5B%5D=213692&group_ids%5B%5D=215929&group_ids%5B%5D=213687&title=Reading+Street+5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=215246&group_ids%5B%5D=215343&group_ids%5B%5D=213703&group_ids%5B%5D=213704&title=Wonders+5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386680&title=Compound+Words+3rd-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=371541&title=Fifth+Grade+Practice+Spelling+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780226&title=Academic+Vocabulary+5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386841&title=Heteronyms+Elementary+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386802&title=Homonyms+3th-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386836&title=Homophones+3th-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=246813&title=Informational+Text+4th-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386260&title=Synonyms+%26+Antonyms+3rd-5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=97552&title=Literature+5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=393135&group_ids%5B%5D=393133&group_ids%5B%5D=393134&group_ids%5B%5D=28642&group_ids%5B%5D=32022&title=Math+5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387036&group_ids%5B%5D=387154&group_ids%5B%5D=22734&group_ids%5B%5D=22730&group_ids%5B%5D=387148&group_ids%5B%5D=22312&group_ids%5B%5D=22729&group_ids%5B%5D=22733&title=Science+5th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=49998&title=Social+Studies+5th+Grade+Lists'
// ]

//Grade 6
// const xs = [
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=380424&group_ids%5B%5D=386124&group_ids%5B%5D=385156&title=Evan-Moor+6th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=231067&group_ids%5B%5D=229662&group_ids%5B%5D=230496&group_ids%5B%5D=229661&group_ids%5B%5D=230492&title=Journeys+6th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=234821&group_ids%5B%5D=229783&group_ids%5B%5D=231047&group_ids%5B%5D=229782&group_ids%5B%5D=231046&title=Reading+Street+6th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=237757&group_ids%5B%5D=237758&group_ids%5B%5D=228895&group_ids%5B%5D=230366&title=Wonders+6th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386212&title=Compound+Words+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=371539&title=Sixth+Grade+Practice+Spelling+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780232&title=Academic+Vocabulary+Middle+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386842&title=Heteronyms+Middle+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386803&title=Homonyms+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386837&title=Homophones+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=247280&title=Informational+Text+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386261&title=Synonyms+%26+Antonyms+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=97553&title=Literature+6th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=397825&group_ids%5B%5D=397826&group_ids%5B%5D=397827&group_ids%5B%5D=397828&group_ids%5B%5D=393140&title=Math+6th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387037&group_ids%5B%5D=387188&group_ids%5B%5D=387185&group_ids%5B%5D=387187&group_ids%5B%5D=387184&group_ids%5B%5D=387181&group_ids%5B%5D=387183&group_ids%5B%5D=387182&title=Science+6th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=50113&group_ids%5B%5D=50112&group_ids%5B%5D=50109&group_ids%5B%5D=50111&title=Social+Studies+Middle+School+Lists'
// ]

//Grade 7
// const xs = [
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386212&title=Compound+Words+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=371537&title=Seventh+Grade+Practice+Spelling+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780232&title=Academic+Vocabulary+Middle+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386842&title=Heteronyms+Middle+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386803&title=Homonyms+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386837&title=Homophones+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=247280&title=Informational+Text+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386261&title=Synonyms+%26+Antonyms+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=108383&title=Literature+7th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=397844&group_ids%5B%5D=397846&group_ids%5B%5D=397847&group_ids%5B%5D=397849&group_ids%5B%5D=393141&title=Math+7th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387038&group_ids%5B%5D=387212&group_ids%5B%5D=387214&group_ids%5B%5D=387221&group_ids%5B%5D=387205&group_ids%5B%5D=387210&group_ids%5B%5D=387218&group_ids%5B%5D=387215&title=Science+7th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=50113&group_ids%5B%5D=50112&group_ids%5B%5D=50109&group_ids%5B%5D=50111&title=Social+Studies+Middle+School+Lists'
// ]

//Grade 8
// const xs = [
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386212&title=Compound+Words+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=371535&title=Eighth+Grade+Spelling+Practice+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780232&title=Academic+Vocabulary+Middle+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386842&title=Heteronyms+Middle+School+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386803&title=Homonyms+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386837&title=Homophones+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=247280&title=Informational+Text+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386261&title=Synonyms+%26+Antonyms+6th-8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=108386&title=Literature+8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=397857&group_ids%5B%5D=397859&group_ids%5B%5D=397860&group_ids%5B%5D=397861&group_ids%5B%5D=393142&title=Math+8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387039&group_ids%5B%5D=387673&group_ids%5B%5D=387675&group_ids%5B%5D=387676&group_ids%5B%5D=387677&group_ids%5B%5D=387681&group_ids%5B%5D=387685&group_ids%5B%5D=387688&title=Science+8th+Grade+Lists',
//   '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=50113&group_ids%5B%5D=50112&group_ids%5B%5D=50109&group_ids%5B%5D=50111&title=Social+Studies+Middle+School+Lists'
// ]

//High School
var xs = ['/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386213&title=Compound+Words+9th-10th+Grade+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=780230&title=Academic+Vocabulary+High+School+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386843&title=Heteronyms+High+School+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386804&title=Homonyms+9th-12th+Grade+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386838&title=Homophones+9th-12th+Grade+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=247820&title=Informational+Text+9th-12th+Grade+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=386262&title=Synonyms+%26+Antonyms+9th-12th+Grade+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=108387&group_ids%5B%5D=108388&group_ids%5B%5D=108390&group_ids%5B%5D=393403&title=Literature+High+School+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=393147&group_ids%5B%5D=393174&group_ids%5B%5D=32023&group_ids%5B%5D=393165&group_ids%5B%5D=393170&group_ids%5B%5D=393167&title=Math+High+School+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=387040&group_ids%5B%5D=387712&group_ids%5B%5D=387693&group_ids%5B%5D=387706&group_ids%5B%5D=387703&group_ids%5B%5D=387708&group_ids%5B%5D=387710&group_ids%5B%5D=387700&title=Science+High+School+Lists', '/index.php?pa=get_teaching_resources_word_lists_module&group_ids%5B%5D=54055&group_ids%5B%5D=54058&group_ids%5B%5D=54056&group_ids%5B%5D=54057&group_ids%5B%5D=55216&title=Social+Studies+High+School+Lists'];

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

var outputname = "wordListHighSchool.txt";

var crawl = function crawl(array, idx, pattern, level, callback) {
  // Recursion stop condition for this level
  if (idx === array.length) {
    if (callback) {
      callback();
    }
    return;
  }

  // Overall recursion stop condition
  if (level === pattern.length) {
    _fs2.default.appendFile(outputname, array[idx] + "\n");
    crawl(array, idx + 1, pattern, level, callback);

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
      console.log(idx, level);
      var thisCallback = function thisCallback() {
        crawl(array, idx + 1, pattern, level, callback);
      };
      crawl(result, 0, pattern, level + 1, thisCallback);
    });
  });
};

// Initialize blank output file
_fs2.default.writeFile(outputname, "");

crawl(xs, 0, pattern, 0, undefined);