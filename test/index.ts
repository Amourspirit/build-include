import { FancyLogger } from "./fancy.logger";

import { MatchBracketInclude } from "../src/matches/MatchBracketInclude";
import { MatchBracketIncludeMulti } from "../src/matches/MatchBracketIncludeMulti";
import { MatchBuildInclude } from "../src/matches/MatchBuildInclude";
import { IMatchOpt } from "../src/interface/projectInterfaces";
import { MatchBuildIncludeHtml } from "../src/matches/MatchBuildIncludeHtml";
import { MatchBuildIncludePound } from "../src/matches/MatchBuildIncludePound";
import { MatchBuildIncludeSlash } from "../src/matches/MatchBuildIncludeSlash";
import { MatchBuildIncludeQuote } from "../src/matches/MatchBuildIncludeQuote";
const logger = new FancyLogger();

// logger.log.write('.');
// logger.log.write('.');
// logger.log.write('.');
// logger.log.emptyln();
logger.log.writeln('Getting info');

const logKeyValue = <T extends object = object>(obj:T) => {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const el = obj[key];
      logger.log.write("  ");
      logger.log.write('Key: ');
      logger.log.write(key.padEnd(12));
      logger.log.write(' Value: ');
      logger.log.write(new String(el).toString());
      logger.log.emptyln();
      
    }
  }
}
const logRegex = (optMatch: IMatchOpt) => {
  let mOpt: string = optMatch.options;
  // multi line is required to check for start of line ^
  if (mOpt) {
    mOpt = mOpt.toLowerCase();
    if (mOpt.indexOf('m') === -1) {
      mOpt += 'm';
    }
  } else {
    mOpt = 'm';
  }
  logger.log.writeln(`Regex Match in: /${optMatch.prefix}${optMatch.name}${optMatch.fileName}${optMatch.parameters}${optMatch.suffix}/${optMatch.options}`);
  logKeyValue(optMatch);
  // logger.log.writeln(`Regex Full: /${reStr}/${mOpt}`);
}
logger.log.writeln('Format of regex for IMatchOpt class is: prefix, name, fileName, parameters, suffix, options');
logger.log.writeln('  indexFile is the  one based index of the regex capture group that contains file such as ./fixtures/style.min.css');
logger.log.writeln('  indexParam is the one based index of the regex capture group that contains options sucs as asjsstring,breakstring?width=80')
logger.log.writeln('Info for "%s" class', "MatchBracketInclude");
logRegex(new MatchBracketInclude());

logger.log.writeln('Info for "%s" class', "MatchBracketIncludeMulti");
logRegex(new MatchBracketIncludeMulti());

logger.log.writeln('Info for "%s" class', "MatchBuildInclude");
logRegex(new MatchBuildInclude());

logger.log.writeln('Info for "%s" class', "MatchBuildIncludeHtml");
logRegex(new MatchBuildIncludeHtml());

logger.log.writeln('Info for "%s" class', "MatchBuildIncludePound");
logRegex(new MatchBuildIncludePound());

logger.log.writeln('Info for "%s" class', "MatchBuildIncludeSlash");
logRegex(new MatchBuildIncludeSlash());

logger.log.writeln('Info for "%s" class', "MatchBuildIncludeQuote");
logRegex(new MatchBuildIncludeQuote());