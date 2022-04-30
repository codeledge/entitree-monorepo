## Proof of Concept

### Usage

The aim of this tool is to display charts of existing data. The only data source at the moment is Wikidata.org

![Image missing](/img/marketcap.png)

Please select an indicator/property and then select the Items you want to display.

The query for this example can [checked here](https://query.wikidata.org/#SELECT%20?search%20?searchLabel%20?value%20?time%0AWHERE%20%0A%7B%0A%20%20VALUES%20?search%20%7Bwd:Q478214%20wd:Q20800404%20wd:Q312%7D.%0A%20%20%0A%20%20?search%20p:P2226%20?statement.%0A%20%20?statement%20ps:P2226%20?value;%0A%20%20%20%20%20%20%20%20%20%20%20%20%20pq:P585%20?time.%0A%20%20SERVICE%20wikibase:label%20%7B%20bd:serviceParam%20wikibase:language%20%22%5BAUTO_LANGUAGE%5D,en%22.%20%7D%0A%7D%0A%0A). To change values or see its references please click on the item on Wikidata.org.

This tool was developed using next.js and TypeScript. NextJs was chosen as an easy implementation of a server based projects with routes. For the charts "Recharts" was chose an easy way to visualize data in a (interactive) chart.

### Can it be built into a feasible product

Charts are very popular in social media as well as academia. Websites like Statista & Worldbank are visited by millions. Their scope is wide however always limited on their own curated data. This tool would open the possibility to display charts from Wikidata which has tens of thousands of active users and is an open collaborative database for everyone. With a further possibility to enable this tool to have custom queries, charts regarding much wider ideas.

Development is not excepted to take long. The demo, although simple, may already be used a MVP. A sophisticated framework (NextJs) and advanced Charting libraries (ReCharts or HighCharts) and no backend, can accelerate production.

### What kind of queries are possible

Implemented and working:

- Monthly published episodes of the Joe Rogan podcast.
- Comparison of Apple's and Alphabet's market cap over time

Theoretically possible

- Age difference between male and female candidates of elections in a given country (say every 5 years) by political party.
- Number of LGBT fictional characters in American movies over time. (biased on input)

### Limitations

The scope of the source for charts is limited to Wikidata, due its use of Sparql, a query language it will be easily adaptable to other Wikibase instances or projects with a public SPARQL endpoint.

It is further limited to the data provided by Wikidata which can widely range.

Complex queries can timeout and fail, it is also dependant on the availibility of Wikimedia servers.

Data may not have high accuracy and may also be incorrect. This is due to Wikidata's collaborative nature. Comparisons with a minimum sample size are better than total numbers. (I.e. total number of movies may go up over time, but older movies are more likely not be inputted/recorded.)

## Getting Started

First, install deps and then run the development server:

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Live demo

A live demo can be found here https://wikidata-charts.vercel.app/
and https://wikidata-charts.vercel.app/charts

## Development

This project was developed as part of Digital Toolkits course by Christopher Handy
https://github.com/handyc
