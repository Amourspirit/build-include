## Verbose

`{verbose: true}` or inline `verbose=true`  

Boolean value that determins if logging should be done in a verbose mannor.
If `true` then verbose logging will be turned on; Otherwise, normal logging.  
When verbse is turned on inline it will turn verbose logging for the current file and any recursive files.  
Once current file and any recursive file it included are processed then verbose logging will defatult to that options
passed into [buildinclude](/build-include/classes/src.buildprocess.html#buildinclude)