##### Comment Padleft
`{comment: { padleft: 4}}` or inline `comment?padleft=num`  
Where as `num` is any whole number number, pads the left side of each line before comment character(s) with a number of spaces equal to the value of `num`.  
--or--  
`comment?padleft=text` where as `text` is a string value, pads the left side of each line before comment character(s).  
Spaces at the end of `text` are valid. \t (tab) is also acceptable such as `comment?padleft=\t\t`, would add two tabs as left padding.  
If `padleft` is a string value then be aware some string require escaping.  
See: [Escaping Parameters](/build-include/pages/Docs/misc/EscapingParameters.html)  