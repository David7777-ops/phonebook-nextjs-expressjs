# Phonebook Full-Stack App

Phonebook full-stack web app using NodeJS (Express) with Prisma for ORM and PostgreSQL for database (hosted on Supabase, alongside storage), and NextJS with Tailwind for the frontend.🚀


<a href="https://www.typescriptlang.org/community" target="_blank"><img align="left" alt="TS" width="26px" src="https://iconape.com/wp-content/png_logo_vector/typescript.png" /></a>
<a href="https://nextjs.org/" target="_blank"><img align="left" alt="Next" width="26px" src="https://miro.medium.com/v2/resize:fit:1258/1*okiCUvTUJLtOqJv1dMzwpA.png" /></a>
<a href="https://tailwindcss.com/" target="_blank"><img align="left" alt="Tailwind" width="26px" src="https://adware-technologies.s3.amazonaws.com/uploads/technology/thumbnail/31/tailwind.png" /></a>
<a href="https://expressjs.com/" target="_blank"><img align="left" alt="Express" width="26px" src="https://w7.pngwing.com/pngs/925/447/png-transparent-express-js-node-js-javascript-mongodb-node-js-text-trademark-logo.png" /></a>
<a href="https://www.prisma.io/" target="_blank"><img align="left" alt="Prisma" width="26px" src="https://cdn-1.webcatalog.io/catalog/prisma-data-platform/prisma-data-platform-icon-filled-256.png?v=1675593236933" /></a>
<a href="https://www.postgresql.org/" target="_blank"><img align="left" alt="PSQL" width="26px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/993px-Postgresql_elephant.svg.png" /></a>
<a href="https://supabase.com/" target="_blank"><img align="left" alt="supa" width="26px" src="https://miro.medium.com/v2/resize:fit:1358/0*QzPzYLTNRX7p5Rsl" /></a>
<br/>

## Structure

| Codebase         |     Description      |
| :--------------- | :------------------: |
| [app](app)       |      NextJS App      |
| [server](server) | NodeJS (Express) API |

This project is deployed on Vercel (NextJS App) and Render (NodeJS Express API). The database I'm using is PostgreSQL and is hosted on Supabase, alongside the storage.

## Branches

- main -> used this branch for everything

## What this project is

This project was made as a side project to showcase my current skills with this stack. It is built with the guidance of the following designed Figma pages:

1. Sign Up
   ![screen 1](/docs/images/Desktop%20-%206.png)
1. Login
   ![screen 2](/docs/images/Desktop%20-%202.png)
1. Home
   ![screen 3](/docs/images/Desktop%20-%203.png)
1. Edit
   ![screen 4](/docs/images/Desktop%20-%204.png)
1. New
   ![screen 5](/docs/images/Desktop%20-%205.png)

So this is what I did!

## Discussion

For the technical decisions I made, I used JWT Cookie authentication for simplicity, however, this would vary based on the nature of the project i.e. the scale, the use case and the architecture. Also, for fetching data from the client, login and other multiple interactions between the client and the server could be improved, but I went with the simplest solutions to keep things easy.

The project is missing so much functionality, like skeletons for loading for example. I also didn't go crazy with the design system in Tailwind config because colors were all over the place in the Figma design. I did what I could do best.

The project is also not responsive; the provided design was only for desktop, so, you get it.

Also, contacts pagination is not supported, probably after loading 10 contacts the logic will break.

Feel free to go through the README.md for each of the directories to understand how to use. Thanks and good luck!

## TODO:

- [x] Move jwt validation to the backend
- [ ] Add skeletons for loading state
- [ ] Make the design responsive
- [ ] Pagination

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Omar Adel - [@omarxadel](https://twitter.com/omarxadel) - omarxadel21@gmail.com

Project Link: [https://github.com/omarxadel/phonebook-app](https://github.com/omarxadel/phonebook-app)
