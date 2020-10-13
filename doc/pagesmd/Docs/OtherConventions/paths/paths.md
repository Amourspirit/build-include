## Build Include Paths

Any path starting with `/` is considered an absolute path.


`build_include(/src/includes/fancy.js)` would be treated as the root of your project folder.

If your project folder is `/home/fancydev/Documents/Projects/build-include` then
the include from above would resolve to `/home/fancydev/Documents/Projects/build-include/src/includes/fancy.js`

All relative paths are consider to be relative to project root.

```text
build-include
-src
--classes
---workers
----web
----node
-----include
```
