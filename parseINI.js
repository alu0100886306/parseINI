const WHITES = /(\s|[#;].*|\/\*(.|\n)*?\*\/)+/y;
const ATTR = /(\w+)=/y;
const SECTION   = /\[(\w+)\]/y;
const REST = /\s*(.*)\s*/y;
const tokens = [WHITES,ATTR,SECTION];

let parseINI = function(string){
  let result = {};
  let amb_act = "";
  let lastIndex = 0;
  let match;
  if (!string)
	throw new Error("Cadena de entrada vacía");
  while (lastIndex < string.length){
    tokens.forEach(function(t){ t.lastIndex = lastIndex});
    if (match = WHITES.exec(string)){
	lastIndex += match[0].length;
    }
    else
    if (match = ATTR.exec(string)){
	lastIndex += match[0].length;
	REST.lastIndex = lastIndex;
	let match2 = REST.exec(string);

	if(match2)
	  lastIndex += match2[0].length;
	else match2 = ["",""]
	if (!amb_act)
	    result[match[1]] = match2[1];
	else 
	    result[amb_act][match[1]] = match2[1];
	
    }else
    if (match = SECTION.exec(string)){
	lastIndex += match[0].length;
	result[match[1]] = {};
	amb_act = match[1];
    }else
      throw new SyntaxError('Unexpect syntax');
  }
  return JSON.stringify(result);
}

module.exports = parseINI;
