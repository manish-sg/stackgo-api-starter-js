## StackGo API Starter Kit

The StackGo API starter kit is a code repository that is aimed at helping developers wanting to get started with StackGo's `Managed Authentication` capability.

This starter kit has been developed to be used to develop apps that would like to connect with the `Hubspot` accounts for their users.

### Getting Started

0. Sign up for an account on `https://app.stackgo.io`
1. Follow this resource to generate your Hubspot OAuth credentials `https://docs.stackgo.io/docs/stackgo-docs/docs/GettingStarted-Hubspot.md`
1. Clone this repo
1. Add the following `development.env` files to help you get started. The details of the `client id`, `client secret` and `app slug` will be available from your StackGo account under `settings`

```
CLIENT_ID=<your-client-id>
CLIENT_SECRET=<your-client-secret>
APP_SLUG=<app-slug>
```

3. Run `npm install`
4. Open `http://localhost:3000/api/users/all` in the browser to get a list of dummy users
5. Open `http://localhost:3000/api/sg/install?userForeignIdentifier=<YOUR_USER_ID>` to get the install link
6. Click on the link and follow through the prompts to grant access to StackGo
7. Send a `POST` request `http://localhost:3000/api/hubspot/proxy` with this body:

```
userForeignIdentifier: <YOUR_USER_ID>,
method: `GET`
url: `/forms/v2/forms`

Note: `url` just requires the path and not the base
```
