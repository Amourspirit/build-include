##### Fence Type Escape

`type=escape` Apply escape fencing options.  

Matches the pattern of:

~~~text
````
fenced text
````
~~~

--or--

~~~text
````text
fenced text
````
~~~

Will not match <code>&#96;&#96;&#96;&#96;</code> if not at the start of line.  
Will not match <code>&#96;&#96;&#96;&#96;   text</code> due to space after <code>&#96;&#96;&#96;&#96;</code> and before `text`.

See Also: [EscapeFence](/classes/src_fences.escapefence.html)  