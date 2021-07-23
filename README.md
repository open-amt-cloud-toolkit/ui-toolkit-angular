# Angular UI Components

## Prerequisites

To succesfully deploy the UI Toolkit using Angular, the following software must be installed on your development system:

- [Node.js* LTS 14.x.x or newer](https://nodejs.org/en/)
- [git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/) or any other IDE of choice
- [Angular CLI](https://angular.io/cli)


## Create a New Angular App

The Angular app can be created in any preferred development directory. The MPS can continue to run while creating and running the app.

1. In a Command Prompt or Terminal, go to your preferred development directory. 

2. Run the following commands to create sample Angular app named `my-app`.

    ``` bash
    ng new my-app && cd my-app
    ```

## Add Angular UI Toolkit

1. Run the following command to add the Angular UI Toolkit and install the required dependencies:

    ``` bash
    npm install @open-amt-cloud-toolkit/ui-toolkit-angular
    ```

2. Run the following commands to start the web UI locally:

    ``` bash
    ng serve
    ```

3. By default, Angular apps run on port `4200`. If port `4200` is already used you'll be prompted to use another port. If this happens, enter 'Y'.

    Sample Output:

    ```
    You can now view my-app in the browser.
    Local: http://localhost:4200
    On Your Network: http://172.16.17.4:3000
    ```
