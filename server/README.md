# Phonebook Server App

This server is made with love ♥ and also NodeJS, Express and TypeScript. I used pnpm for a package manager, so you will have to deal with its ease and greatness -instead of npm. Sorry for improving the quality of your life..

## Usage

In order to be able to use this app, you will have to follow these steps:

1. `pnpm i`
2. `touch .env` or create the `.env` file
3. Add the values from `.env.example` file
4. `pnpm dlx prisma generate`
5. `pnpm dlx prisma db seed`
6. `pnpm dev`

Hopefully this does it, if not, let me know.

## API Routes

| Endpoint          | Method | Response                        |
| ----------------- | ------ | ------------------------------- |
| /api              | GET    | `"This is route api version 1"` |
| /docs             | GET    | Swagger Docs                    |
| /api/auth/signUp  | POST   |                                 |
| /api/auth/login   | POST   |                                 |
| /api/auth/logout  | POST   |                                 |
| /api/contacts     | GET    |                                 |
| /api/contacts     | POST   |                                 |
| /api/contacts/:id | GET    |                                 |
| /api/contacts/:id | PUT    |                                 |
| /api/contacts/:id | DELETE |                                 |

## Error Handling

I did my best with the given time for error handling. I handled most of the expected Prisma Errors and other common errors, however, this was not my best job handling errors from the backend.

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
