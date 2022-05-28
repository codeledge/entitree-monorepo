# Entitree Helper

> Super awesome helper function for Entitree projects. But anyone can use them.

[![npm version](https://badge.fury.io/js/@entitree%2Fhelper.svg)](https://badge.fury.io/js/@entitree%2Fhelper)

Source Code:

https://github.com/codeledge/entitree-monorepo/tree/main/packages/entitree-helper

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.

please use either:

```sh
$ npm install @entitree/helper
```

or

```sh
$ yarn add @entitree/helper
```

## Table of contents

- [Project Name](#project-name)
  - [Prerequisites](#prerequisites)
  - [Table of contents](#table-of-contents)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Usage

### useBasicFetch

```ts
import { getWikidataSparql } from "@entitree/helper";
let query = await getWikidataSparql(`#Goats
SELECT ?item ?itemLabel 
WHERE 
{
  ?item wdt:P31 wd:Q2934.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}`);
console.log(query);
```

### getSimplifiedWikidataEntities

```ts
let query = await getSimplifiedWikidataEntities(["Q110903311"]));
console.log(query);
```

### use constants instead of Wikidata IDS and properties

use WD_POSITION_HELD instead of "P39" to make your code look cleaner.

just type WD\_ in your code editor to get suggestions.

### getWikipediaArticle

```ts
let artice = getWikipediaArticle("Germany", "en");
console.log(artice);
```

## Notes

How to sort by Wikidata ID

```
ORDER BY (xsd:integer(substr(str(?item),33)))
```

Any better idea?

Recreate constantsfile:

```
cd packages/entitree-helper/src/wikidata/scripts
ts-node-transpile-only createConstantsFile.ts
```

## Contributing

<!-- Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us. -->

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Credits

## Versioning

## Authors

Martin and Orlando

## License

MIT License
