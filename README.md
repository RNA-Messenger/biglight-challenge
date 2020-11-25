#How to run the app
I will assume you have node and npm install.
Clone the github repo with
>

Open the terminal and make sure you are at the root of the project, where the gulpfile.js is, and run 
> npm install

This will download all dependencies needed to run the app.
Create a copy of the .env.example file and name it _.env_
You'll define here:
* the type of environment you wish to run. _development_
* the port in which you wish to run the server
* the **SHEETS_ID** to connect to the correct google sheets file.
* the **API_KEY** you need to allow external sources to make request to the google api and retrieve the data in your file.

I added a task runner as requested in the cjallenge. I decided to use Gulp for it's scalability and power. It really covers a lot of the dev requirements that you usually need. By creating tasks you get to create bundle functions and run the server!
Start by running the server with
> gulp serve

In a different terminal tab but in the same directory's location type
> gulp

I have set it up to watch the changes in the project and build the changes observed. At the moment, I'm only building css and js files. TODO: compile all hbs files to 3 html pages.

#The structure of your project

#GatsbyJS questions

##Can you explain what GatsbyJS is and what the benefits of using it are?
Unlike the SPAs that make API requests as you run the app, Gatsby does all the data fetching, including data sourcing from local files, during build time. All this data is then used to generate static HTML, JavaScript, and CSS files. This static rendering is what makes things work faster.
There is no complex server setup with databases, maintenance, and don’t have any scaling issues so far.
Rather than relying on servers to generate pages dynamically, pre-render all of them on build and use CDNs for faster and smoother experience. Reduces initial load times.
Gatsby takes the required data to display from the source and nothing more.
Gatsby does static rendering. Which makes content available as HTML, and search engine optimized. The last one is a very big plus considering not all developers takes search engines optimization seriously.
Also, Gatsby Cloud supports integration with a number of different services including CMS offerings, Hosting solutions, and other technologies.
And they support a lot of the most used CMS out there.

```
These Content Management Systems (CMS) are first-class integrations with Gatsby Cloud. First-class integrations are vetted to provide the fastest Builds and Previews so your content editors are never left waiting!

    Agility CMS
    Contentful
    Contentstack
    Cosmic
    DatoCMS
    Drupal
    Flotiq
    Kontent
    Sanity.io
    Strapi
    WordPress
```
##Can you explain how you would get the data from WordPress to GatsbyJS?
Now, I know this is mostly a copy-paste of Gatsby's guides but it's very straight forward and I had no reason not to rely on most of their explanations. I did try to summarize this in one guide.

###Install the Gatsby CLI
[Quick Setup](https://www.gatsbyjs.com/docs/quick-start/)
>npm install -g gatsby-cli
The above command installs Gatsby CLI globally on your machine.

###Create a new site

>gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world

###Change directories into site folder

>cd gatsby-site

###Start development server

>gatsby develop
Gatsby will start a hot-reloading development environment accessible by default at http://localhost:8000.
Try editing the home page in src/pages/index.js. Saved changes will live reload in the browser.

###Create a production build

>gatsby build
Gatsby will perform an optimized production build for your site, generating static HTML and per-route JavaScript code bundles.

###Serve the production build locally

>gatsby serve
Gatsby starts a local HTML server for testing your built site. Remember to build your site using gatsby build before using this command.

###gatsby-config.js
Two things defined here initially (in the starter) are siteMetadata and plugins you can add to enable new functionalities on your site.

###Gatsby Plugin: gatsby-source-wordpress-experimental
 _gatsby-source-wordpress-experimental_ is Gatsby’s plugin for sourcing data from WordPress sites using the WPGraphQL API.
 >npm install gatsby-source-wordpress-experimental
 ```
 module.exports = {
  ...
  plugins: [
    ...,
    {
      resolve: `gatsby-source-wordpress-experimental`,
      options: {
        url:
        // allows a fallback url if WPGRAPHQL_URL is not set in the env, this may be a local or remote WP instance.
          process.env.WPGRAPHQL_URL ||
          `https://localhost/graphql`,
        schema: {
          //Prefixes all WP Types with "Wp" so "Post and allPost" become "WpPost and allWpPost".
          typePrefix: `Wp`,
        },
        develop: {
          //caches media files outside of Gatsby's default cache an thus allows them to persist through a cache reset.
          hardCacheMediaFiles: true,
        },
        type: {
          Post: {
            limit:
              process.env.NODE_ENV === `development`
                ? // Lets just pull 50 posts in development to make it easy on ourselves (aka. faster).
                  50
                : // and we don't actually need more than 5000 in production for this particular site
                  5000,
          },
        },
      },
    },
  ]
}
```

### IMPORTANT!! auth: Object

```
{
  resolve: `gatsby-source-wordpress-experimental`,
  options: {
    auth: {

    },
  },
},
```
Options related to authentication goes in here.

###Using WordPress data

Once your source plugin is pulling data, you can construct your site pages by implementing the createPages API in gatsby-node.js. When this is called, your data has already been fetched and is available to query with GraphQL. Gatsby uses that data to ”automatically infer a GraphQL schema” that you can query against.

###Configuring the plugin
In the gatsby-config.js file that we mentioned before add your WordPress site’s url

_All other config is optional but recommended._

##Can you describe why GatsbyJS makes a site secure?
>When you ship everything to the browser, the user can access everything.
With server-side rendering, the client browser never needs to directly access them.
The entire front end is prebuilt into static pages and assets during a build process reducing costs and risks.
The biggest security struggle with client-side sites is securing those APIs.
Because Gatsby deliver static pages, our data an app are fully secure in the server which can be exploited. It only takes the required data to display from the source and the private or secured data is not even present in the final build. This is the safest it can possibly get for now.

By taking advantage of the benefits of static content, Gatsby inherits several security principles.
[Jamstack](https://jamstack.org/)

##What is a PRPL?
```
  PRPL stands for:
  **P**ush critical resources for the initial URL route using <link preload> and HTTP/2.
  **R**ender initial route.
  **P**re-cache remaining routes.
  **L**azy-load and create remaining routes on demand.
```
  Gatsby follows the PRPL architectural pattern. Gatsby sites render a static HTML version of the initial route and then load the code bundle for the page. Then immediately starts pre-caching resources for pages linked to from the initial route. When a user clicks on a link, Gatsby creates the new page on demand on the client.
  Gatsby's site refers you to a great articule [about PRPL](https://web.dev/apply-instant-loading-with-prpl/).