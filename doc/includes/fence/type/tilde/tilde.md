## Fence Type Tilde

Matches the pattern of:

````text
~~~
fenced text
~~~
````

--or--

````text
~~~text
fenced text
~~~
````

Will not match <code>&#126;&#126;&#126;</code> if not at the start of line.  
Will not match <code>&#126;&#126;&#126;   text</code> due to space after <code>&#126;&#126;&#126;</code> and before `text`.

See Also: [TildeFence](/build-include/classes/src_fences.tildefence.html)  